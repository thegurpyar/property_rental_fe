"use client";

import { useEffect, useState } from "react";
import {
  User,
  Phone,
  Edit3,
  Building2,
  Clock,
  Plus,
  ChevronRight,
  Trash2
} from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import Link from "next/link";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../components/ui/alert-dialog";

import apiClient from "../../lib/apClient"

export default function ProfilePage() {
  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    listingsCount: 0
  });
  const [properties, setProperties] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [propertyIdToDelete, setPropertyIdToDelete] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await apiClient.get("/auth/me");
        if (res.data.success) {
          const user = res.data.data;
          setUserData((prev) => ({
            ...prev,
            name: user.full_name,
            phone: user.number,
          }));
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    const fetchProperties = async () => {
      try {
        const res = await apiClient.get("/property/user");
        console.log("Profile Properties API Response:", res.data);
        
        if (res.data.success) {
          // 📦 Extracting from the nested structure you provided: data.properties
          const fetchedData = res.data.data?.properties || [];
          const totalCount = res.data.data?.pagination?.total || fetchedData.length;
          
          setProperties(fetchedData);
          setUserData((prev) => ({
            ...prev,
            listingsCount: totalCount
          }));
        }
      } catch (error) {
        console.error("Failed to fetch properties:", error);
        setProperties([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
    fetchProperties();
  }, []);

  const initiateDelete = (id: string) => {
    setPropertyIdToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const executeDelete = async () => {
    if (!propertyIdToDelete) return;

    try {
      const res = await apiClient.delete(`/property/user/${propertyIdToDelete}`);
      if (res.data.success) {
        setProperties((prev) => prev.filter((p) => p._id !== propertyIdToDelete));
        setUserData((prev) => ({
          ...prev,
          listingsCount: Math.max(0, prev.listingsCount - 1)
        }));
        toast.success("Deleted successfully", {
          description: "Your listing has been removed from the Mr. Tolet network."
        });
      }
    } catch (error) {
      console.error("Failed to delete property:", error);
      toast.error("Failed to delete property. Please try again.");
    } finally {
      setIsDeleteDialogOpen(false);
      setPropertyIdToDelete(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#fffbf9] pb-20">
      {/* 🚀 Header Hero */}
      <div className="bg-white border-b border-orange-100 pt-32 pb-16 px-8 md:px-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
          {/* Large Avatar */}
          <div className="relative group">
            <div className="w-40 h-40 bg-[#FF7F32] rounded-[48px] shadow-2xl shadow-orange-500/20 flex items-center justify-center text-white transition-transform group-hover:scale-105 duration-500">
              <User size={80} strokeWidth={1.5} />
            </div>
            <button className="absolute bottom-2 right-2 bg-white p-3 rounded-2xl shadow-lg border border-orange-50 text-[#FF7F32] hover:bg-orange-50 transition-all">
              <Edit3 size={20} />
            </button>
          </div>

          {/* User Info */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
              <h1 className="text-5xl font-black text-[#1a2b49] tracking-tighter uppercase">{userData.name || "User"}</h1>
              <span className="bg-orange-100 text-[#FF7F32] text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">Premium Member</span>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-3 text-slate-500 font-bold text-sm">
              <Phone size={18} className="text-[#FF7F32]" /> {userData.phone}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex gap-4">
            <Card className="rounded-[32px] border-orange-50 shadow-sm bg-white p-6 text-center min-w-[120px]">
              <div className="text-3xl font-black text-[#FF7F32]">{userData.listingsCount}</div>
              <div className="text-[9px] font-black uppercase text-slate-400 tracking-widest mt-1">Listings</div>
            </Card>
            <Card className="rounded-[32px] border-orange-50 shadow-sm bg-white p-6 text-center min-w-[120px]">
              <div className="text-3xl font-black text-[#1a2b49]">0</div>
              <div className="text-[9px] font-black uppercase text-slate-400 tracking-widest mt-1">Inquiries</div>
            </Card>
          </div>
        </div>
      </div>

      {/* 🏡 Content Grid */}
      <div className="max-w-7xl mx-auto px-8 md:px-16 mt-16">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-black text-[#1a2b49] tracking-tight flex items-center gap-3">
            <Building2 className="text-[#FF7F32]" /> My Active Listings
          </h2>
          <Button 
            onClick={() => window.location.href = "/property"}
            className="bg-[#FF7F32] hover:bg-[#e66a1f] text-white rounded-2xl px-6 py-6 h-auto font-black text-xs uppercase tracking-widest shadow-xl shadow-orange-500/20 transition-all flex items-center gap-2"
          >
            <Plus size={18} /> New Listing
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-20 text-slate-400 font-bold">Loading your properties...</div>
        ) : properties.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[40px] border border-dashed border-gray-200">
            <Building2 size={48} className="mx-auto text-gray-200 mb-4" />
            <p className="text-slate-400 font-bold">No properties listed yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((prop) => (
              <Link href={`/properties/${prop.slug}`} key={prop._id}>
                <Card className="rounded-[40px] border-none shadow-xl shadow-orange-900/5 bg-white group overflow-hidden cursor-pointer transition-all hover:-translate-y-2 h-full flex flex-col">
                  {/* 🖼️ Horizontal Image Gallery */}
                  <div className="relative h-64 flex overflow-x-auto snap-x snap-mandatory scrollbar-hide bg-gray-50">
                    {prop.images && prop.images.length > 0 ? (
                      prop.images.map((imgObj: any, idx: number) => {
                        const rawUrl = imgObj.url || "";
                        let fullImgUrl = "";
                        if (rawUrl.startsWith("http") && !rawUrl.includes("localhost") && !rawUrl.includes("ngrok")) {
                          fullImgUrl = rawUrl;
                        } else {
                          const fileName = rawUrl.split('/').pop();
                          fullImgUrl = `https://module-project-tx70.onrender.com/uploads/${fileName}`;
                        }

                        const isVideo = fullImgUrl.toLowerCase().match(/\.(mp4|webm|ogg|mov|m4v)$/) || fullImgUrl.includes("video/");

                        return (
                          <div key={imgObj._id || idx} className="min-w-full h-full snap-center relative bg-black">
                            {isVideo ? (
                              <video 
                                src={fullImgUrl} 
                                className="w-full h-full object-cover" 
                                muted 
                                autoPlay 
                                loop 
                                playsInline
                              />
                            ) : (
                              <img 
                                src={fullImgUrl} 
                                alt={`property-${idx}`} 
                                className="w-full h-full object-cover" 
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80";
                                }}
                              />
                            )}
                            {/* Image Counter Overlay */}
                            <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md text-[10px] text-white font-black px-2 py-1 rounded-lg">
                              {idx + 1} / {prop.images.length}
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300">
                        <Building2 size={48} />
                      </div>
                    )}

                    {/* Status Tag Overlay */}
                    <div className="absolute top-5 left-5 z-20">
                      <span className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20 backdrop-blur-md text-white ${prop.status === 'available' ? 'bg-emerald-500/80' : 'bg-orange-500/80'}`}>
                        {prop.status}
                      </span>
                    </div>
                  </div>

                   <CardContent className="p-8 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-black text-[#1a2b49] leading-tight group-hover:text-[#FF7F32] transition-colors">{prop.title}</h3>
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            initiateDelete(prop._id);
                          }}
                          className="p-3 rounded-2xl bg-slate-50 text-slate-300 hover:bg-rose-50 hover:text-rose-500 transition-all z-30"
                          title="Delete Property"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <div className="text-2xl font-black text-[#FF7F32]">₹{prop.price.toLocaleString()}</div>
                      <div className="mt-6 pt-6 border-t border-orange-50 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-tighter">
                          <Clock size={14} /> Posted {new Date(prop.createdAt).toLocaleDateString()}
                        </div>
                        <ChevronRight className="text-orange-200 group-hover:text-[#FF7F32] group-hover:translate-x-1 transition-all" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        )}
      </div>

      {/* 🛡️ Professional Delete Confirmation Modal */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="rounded-[40px] border-none shadow-2xl bg-white overflow-hidden p-0">
          <div className="p-10 pb-0">
            <AlertDialogHeader className="space-y-4">
              <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 m-0">
                <Trash2 size={32} />
              </div>
              <AlertDialogTitle className="text-3xl font-black text-[#1a2b49] tracking-tighter leading-tight">
                Confirm Property Deletion?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-slate-500 font-bold text-base italic leading-relaxed">
                "This action is permanent. All images and details for this listing will be irrevocably removed from the Mr. Tolet network."
              </AlertDialogDescription>
            </AlertDialogHeader>
          </div>
          <AlertDialogFooter className="mt-8 bg-slate-50/50 p-8 flex flex-col sm:flex-row gap-3 border-t border-slate-100">
            <AlertDialogCancel className="flex-1 border-none bg-white hover:bg-slate-100 text-[#1a2b49] h-14 rounded-2x font-black uppercase tracking-widest text-[10px]">
              Keep Listing
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={executeDelete}
              className="flex-1 bg-rose-500 hover:bg-rose-600 text-white h-14 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-rose-200"
            >
              Delete Permanently
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}