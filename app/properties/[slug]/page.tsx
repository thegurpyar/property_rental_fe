"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  MapPin, 
  Bed, 
  Bath, 
  Maximize, 
  Clock, 
  ChevronLeft, 
  Heart,
  Share2,
  Phone,
  MessageCircle,
  Calendar,
  Layers,
  Home,
  CheckCircle2,
  ArrowRight,
  Info,
  Dumbbell,
  Waves,
  Shield,
  Zap,
  Users,
  Trees,
  ShoppingBag,
  ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import apiClient from "@/lib/apClient";
import EditPropertyModal from "@/components/property/editpropertymodal";
import { Pencil } from "lucide-react";

export default function PropertyDetailsPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [property, setProperty] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchProperty = async () => {
    try {
      const res = await apiClient.get(`/property/user/public/${slug}`);
      if (res.data.success) {
        setProperty(res.data.data.property);
      }
    } catch (error) {
      console.error("Failed to fetch property details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await apiClient.get("/auth/me");
        if (res.data.success) {
          setCurrentUser(res.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
    if (slug) fetchProperty();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#FF7F32] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-3xl font-black text-[#1a2b49] mb-4 tracking-tighter">Property Not Found</h2>
        <Button onClick={() => router.back()} variant="outline" className="rounded-full px-8">Return to Listings</Button>
      </div>
    );
  }

  console.log("💎 FULL PROPERTY DATA:", property);

  const ownerId = property.owner || property.userId || property.user?._id || property.user || property.createdBy;
  
  const isOwner = currentUser && (
    typeof ownerId === 'string' 
      ? currentUser._id === ownerId 
      : currentUser._id === ownerId?._id
  );

  console.log("🛡️ SECURITY CHECK:", {
    propertyId: property._id,
    currentUserId: currentUser?._id,
    ownerId: typeof ownerId === 'string' ? ownerId : ownerId?._id,
    isMatch: isOwner
  });

  const images = property.images?.map((imgObj: any) => {
    const rawUrl = imgObj.url || "";
    if (rawUrl.startsWith("http")) return rawUrl;
    const fileName = rawUrl.split('/').pop();
    if (!fileName) return "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80";
    return `https://module-project-tx70.onrender.com/uploads/${fileName}`;
  }) || [];

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80";
  };

  return (
    <div className="bg-white min-h-screen text-[#1a2b49]">
      
      {/* 📝 EDIT MODAL (Owner Only) */}
      {isOwner && (
        <EditPropertyModal 
          property={property} 
          isOpen={isEditModalOpen} 
          onClose={() => setIsEditModalOpen(false)}
          onUpdate={fetchProperty}
        />
      )}

      {/* 📸 ULTRA MODERN IMAGE HERO */}
      <section className="relative h-[70vh] md:h-[85vh] w-full overflow-hidden">
        <img 
          src={images[activeImage] || "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80"}
          className="w-full h-full object-cover animate-slow-zoom"
          alt={property.title}
          onError={handleImageError}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent z-10 h-64" />
        
        {/* Floating Actions inside Hero */}
        <div className="absolute inset-x-0 top-24 md:top-28 p-6 md:px-16 flex justify-between items-center z-20">
          <button 
            onClick={() => router.back()}
            className="group flex items-center gap-3 bg-black/40 backdrop-blur-3xl px-6 py-3 rounded-2xl border border-white/20 text-white hover:bg-[#FF7F32] hover:border-[#FF7F32] transition-all duration-300 shadow-2xl"
          >
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform"/> 
            <span className="text-[11px] font-black uppercase tracking-widest">Back to Search</span>
          </button>
          
          <div className="flex gap-3">
             {isOwner && (
               <button 
                onClick={() => setIsEditModalOpen(true)}
                className="flex items-center gap-3 bg-[#FF7F32] px-6 py-3 rounded-2xl text-white font-black hover:bg-orange-600 transition-all shadow-2xl transform active:scale-95"
               >
                 <Pencil size={18} />
                 <span className="text-[11px] uppercase tracking-widest">Edit Listing</span>
               </button>
             )}
             <button className="w-12 h-12 bg-black/40 backdrop-blur-3xl rounded-2xl flex items-center justify-center text-white hover:bg-rose-500 hover:border-rose-500 transition-all border border-white/20 shadow-2xl">
              <Heart size={20} />
            </button>
            <button className="w-12 h-12 bg-black/40 backdrop-blur-3xl rounded-2xl flex items-center justify-center text-white hover:bg-[#FF7F32] hover:border-[#FF7F32] transition-all border border-white/20 shadow-2xl">
              <Share2 size={20} />
            </button>
          </div>
        </div>

        {/* Title & Price Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-8 md:p-16 text-white z-10 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/20 to-transparent">
          <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row md:items-end justify-between gap-12">
            <div className="space-y-6 flex-1">
              <Badge className="bg-[#FF7F32] hover:bg-orange-600 text-white border-none px-5 py-2 rounded-full text-[10px] uppercase font-black tracking-widest shadow-lg">
                {property.purpose} - {property.category}
              </Badge>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] max-w-4xl drop-shadow-2xl">
                {property.title}
              </h1>
              <div className="flex items-center gap-3 text-white/80 font-bold">
                <MapPin size={24} className="text-[#FF7F32]" />
                <span className="text-xl md:text-2xl">{property.fullAddress || `${property.sector}, ${property.city}`}</span>
              </div>

              {/* 🖼️ ULTRA SIMPLE THUMBNAILS */}
              {images.length > 1 && (
                <div className="flex gap-3 pb-2 overflow-x-auto scrollbar-hide pt-6">
                  {images.map((img: string, i: number) => (
                    <button 
                      key={i} 
                      onClick={() => setActiveImage(i)}
                      className={`relative w-14 h-14 rounded-2xl overflow-hidden transition-all duration-300 ${activeImage === i ? 'scale-110 shadow-2xl opacity-100 border-2 border-[#FF7F32]' : 'opacity-40 hover:opacity-100 hover:scale-105'}`}
                    >
                      <img src={img} className="w-full h-full object-cover" alt="" onError={handleImageError} />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <div className="bg-white/10 backdrop-blur-2xl rounded-[48px] p-10 md:p-12 border border-white/20 text-center min-w-[320px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] transform hover:scale-105 transition-transform duration-500">
              <div className="text-[11px] font-black uppercase tracking-[0.4em] text-orange-400 mb-2">Asking Price</div>
              <div className="text-6xl font-black tracking-tighter leading-none">₹{property.price.toLocaleString()}</div>
              <div className="text-xs font-bold text-white/50 uppercase tracking-[0.2em] mt-3">{property.priceType} Commitment</div>
            </div>
          </div>
        </div>
      </section>

      {/* 🏡 CONTENT GRID */}
      <main className="max-w-7xl mx-auto px-8 md:px-16 pt-16 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* LEFT: Details */}
          <div className="lg:col-span-8 space-y-20">
            
            {/* Quick Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: "Bedrooms", val: property.bhk, icon: <Bed size={24}/> },
                { label: "Bathrooms", val: property.bathrooms, icon: <Bath size={24}/> },
                { label: "Living Area", val: `${property.totalArea} ${property.areaUnit}`, icon: <Maximize size={24}/> },
                { label: "Property Age", val: `${property.age} Yrs`, icon: <Clock size={24}/> }
              ].map((m, i) => (
                <div key={i} className="group p-8 rounded-[40px] bg-slate-50 border border-slate-100 hover:bg-white hover:border-[#FF7F32]/20 hover:shadow-2xl transition-all duration-500">
                  <div className="text-[#FF7F32] mb-4 group-hover:scale-110 transition-transform duration-500">{m.icon}</div>
                  <div className="text-2xl font-black text-[#1a2b49] tracking-tighter">{m.val}</div>
                  <div className="text-[10px] font-bold uppercase text-slate-400 tracking-widest mt-1">{m.label}</div>
                </div>
              ))}
            </div>

            {/* About Section */}
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-[2px] bg-[#FF7F32]" />
                <h3 className="text-xs font-black uppercase tracking-[0.4em] text-orange-500">Property Description</h3>
              </div>
              <p className="text-xl md:text-2xl font-medium text-slate-500 leading-[1.6]">
                {property.description}
              </p>
            </div>

            {/* Interior & Features */}
            <div className="space-y-10">
               <h3 className="text-3xl font-black tracking-tighter">Premium Features</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                 {[
                   { label: "Furnishing", val: property.furnishing },
                   { label: "Parking Space", val: property.parking },
                   { label: "Property Type", val: property.category },
                   { label: "Building Status", val: property.status }
                 ].map((detail, idx) => (
                   <div key={idx} className="flex items-center justify-between py-6 border-b border-slate-100 group">
                     <span className="text-slate-400 font-bold uppercase text-[11px] tracking-widest">{detail.label}</span>
                     <span className="text-[#1a2b49] font-black capitalize group-hover:text-[#FF7F32] transition-colors">{detail.val}</span>
                   </div>
                 ))}
               </div>
            </div>

            {/* Amenities Grid */}
            {property.amenities?.length > 0 && (
              <div className="space-y-10">
                <h3 className="text-3xl font-black tracking-tighter">Amenities & Utilities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {property.amenities.map((item: string) => {
                    const iconMap: Record<string, any> = {
                      lift: <Maximize size={22} />,
                      gym: <Dumbbell size={22} />,
                      swimming_pool: <Waves size={22} />,
                      security: <Shield size={22} />,
                      power_backup: <Zap size={22} />,
                      clubhouse: <Users size={22} />,
                      park: <Trees size={22} />,
                      near_market: <ShoppingBag size={22} />
                    };
                    return (
                      <div key={item} className="flex flex-col gap-4 p-8 rounded-[40px] bg-white border border-slate-100 hover:border-[#FF7F32]/30 hover:bg-orange-50/30 transition-all duration-300 group">
                        <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-[#FF7F32] group-hover:bg-[#FF7F32] group-hover:text-white transition-all duration-500 shadow-sm">
                          {iconMap[item.toLowerCase()] || <CheckCircle2 size={22} />}
                        </div>
                        <span className="font-extrabold text-[#1a2b49] capitalize tracking-tight">{item.replace(/_/g, ' ')}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Agent/Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Contact Card */}
            <div className="sticky top-12 bg-[#1a2b49] rounded-[48px] p-10 md:p-12 text-white shadow-2xl shadow-slate-900/40 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/20 rounded-full blur-[60px] -mr-20 -mt-20" />
               
               <div className="relative z-10 space-y-10">
                  <div className="flex items-center gap-5">
                    <div className="w-20 h-20 bg-white/10 rounded-[28px] border border-white/20 flex items-center justify-center text-white">
                      <ShieldCheck size={40} strokeWidth={1} />
                    </div>
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-orange-400">Verified Listing</div>
                      <div className="text-2xl font-black tracking-tighter leading-none mt-1">ProperyPro <br/> Agent Team</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {isOwner && (
                      <Button 
                        onClick={() => setIsEditModalOpen(true)}
                        className="w-full h-16 rounded-3xl bg-white text-[#1a2b49] hover:bg-orange-50 font-black text-lg gap-3 border-2 border-dashed border-orange-500/30 transition-all hover:border-[#FF7F32]"
                      >
                        <Pencil size={20} /> Edit Listing Details
                      </Button>
                    )}
                    <Button className="w-full h-16 rounded-3xl bg-[#FF7F32] hover:bg-orange-600 text-white font-black text-lg gap-3 shadow-xl shadow-orange-500/20">
                      <Phone size={20} fill="currentColor"/> Call Now
                    </Button>
                    <Button variant="outline" className="w-full h-16 rounded-3xl bg-white/5 hover:bg-white/10 text-white border-white/10 font-black text-lg gap-3 backdrop-blur-md">
                      <MessageCircle size={20} fill="currentColor"/> WhatsApp
                    </Button>
                  </div>

                  <div className="pt-8 border-t border-white/10 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 font-bold text-xs">Listing ID</span>
                      <span className="font-black text-xs uppercase tracking-widest">#{property._id.slice(-8).toUpperCase()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 font-bold text-xs">Neighborhood</span>
                      <span className="font-black text-xs uppercase tracking-widest">{property.locality || "Tricity"}</span>
                    </div>
                  </div>

                  <div className="p-6 rounded-[32px] bg-white/5 border border-white/10 flex items-start gap-4">
                    <Info size={24} className="text-[#FF7F32] shrink-0" />
                    <p className="text-[11px] font-medium text-slate-400 leading-relaxed italic">
                      "Professional guidance for the best market value properties in Chandigarh Capital Region."
                    </p>
                  </div>
               </div>
            </div>

            {/* Neighborhood Insights */}
            <div className="bg-slate-50 rounded-[48px] p-10 border border-slate-100 space-y-8">
               <h4 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400">Location Insights</h4>
               <div className="space-y-6">
                 <div className="flex gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#FF7F32]">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <div className="font-black text-[#1a2b49] tracking-tight">{property.sector} Area</div>
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{property.city} Region</div>
                    </div>
                 </div>
                 {property.landmark && (
                   <div className="flex gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#FF7F32]">
                      <Building2 size={20} className="w-5 h-5"/>
                    </div>
                    <div>
                      <div className="font-black text-[#1a2b49] tracking-tight">Near {property.landmark}</div>
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Primary Landmark</div>
                    </div>
                   </div>
                 )}
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Fixed Lucide Building2 import name
const Building2 = ({ className, size }: { className?: string, size?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size || 24} 
    height={size || 24} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/>
  </svg>
);
