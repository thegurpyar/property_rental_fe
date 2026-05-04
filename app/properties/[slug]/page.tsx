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
  ShieldCheck,
  Video
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EnquiryModal } from "@/components/property/EnquiryModal";
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
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

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

  const media = property.images?.map((imgObj: any) => {
    const rawUrl = imgObj.url || "";
    if (rawUrl.startsWith("http")) return rawUrl;
    const fileName = rawUrl.split('/').pop();
    if (!fileName) return "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80";
    return `https://module-project-tx70.onrender.com/uploads/${fileName}`;
  }) || [];

  const isVideo = (url: string) => {
    return url.toLowerCase().match(/\.(mp4|webm|ogg|mov|m4v)$/) || url.includes("video/");
  };

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

      {/* 📸 REALTOR.CA STYLE LAYOUT */}
      
      {/* Top Action Bar */}
      <div className="sticky top-0 z-50 bg-white border-b border-slate-100 px-6 py-4 flex justify-between items-center">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-600 hover:text-[#1a2b49] transition-colors"
        >
          <ChevronLeft size={20} />
          <span className="text-sm font-bold">Back</span>
        </button>
        <div className="flex gap-4">
          <button className="text-slate-400 hover:text-rose-500 transition-colors">
            <Heart size={24} />
          </button>
          <button className="text-slate-400 hover:text-[#FF7F32] transition-colors">
            <Share2 size={24} />
          </button>
          {isOwner && (
            <button 
              onClick={() => setIsEditModalOpen(true)}
              className="text-[#FF7F32] hover:text-orange-600 transition-colors"
            >
              <Pencil size={24} />
            </button>
          )}
        </div>
      </div>

      {/* Image Gallery Viewer */}
      <section className="relative w-full aspect-[4/3] md:aspect-video bg-black overflow-hidden">
        {isVideo(media[activeImage]) ? (
          <video 
            src={media[activeImage]} 
            className="w-full h-full object-contain" 
            controls 
            autoPlay 
            muted 
            loop
          />
        ) : (
          <img 
            src={media[activeImage] || "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80"}
            className="w-full h-full object-cover"
            alt={property.title}
            onError={handleImageError}
          />
        )}
        
        {/* Image Navigation Arrows (Hidden if only 1 image) */}
        {media.length > 1 && (
          <>
            <button 
              onClick={() => setActiveImage(prev => (prev > 0 ? prev - 1 : media.length - 1))}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all z-10"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={() => setActiveImage(prev => (prev < media.length - 1 ? prev + 1 : 0))}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all z-10"
            >
              <ChevronLeft size={24} className="rotate-180" />
            </button>
          </>
        )}

        {/* Image Counter */}
        <div className="absolute bottom-6 right-6 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-lg text-white text-xs font-black tracking-widest z-10">
          {activeImage + 1} / {media.length}
        </div>
      </section>

      {/* 🖼️ Thumbnail Strip (Moved to Top) */}
      {media.length > 1 && (
        <div className="max-w-7xl mx-auto px-6 md:px-16 flex gap-3 overflow-x-auto pb-4 scrollbar-hide pt-4 bg-white">
          {media.map((item: string, i: number) => (
            <button 
              key={i} 
              onClick={() => setActiveImage(i)}
              className={`relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden transition-all border-2 ${activeImage === i ? 'border-[#FF7F32]' : 'border-transparent opacity-60 hover:opacity-100'}`}
            >
              {isVideo(item) ? (
                <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                  <Video size={20} className="text-slate-400" />
                </div>
              ) : (
                <img src={item} className="w-full h-full object-cover" alt="" onError={handleImageError} />
              )}
            </button>
          ))}
        </div>
      )}

      {/* 📄 PROPERTY CORE DETAILS (REALTOR.CA STYLE) */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 pt-12 pb-16 bg-white border-b border-slate-50">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* 1. Primary Details */}
          <div className="flex-1 space-y-10">
            <div className="space-y-4">
              <Badge className="bg-slate-100 text-slate-500 border-none px-3 py-1 rounded text-[10px] uppercase font-bold tracking-widest">
                {new Date(property.createdAt || Date.now()).toLocaleDateString()} • {property.status || "Active"}
              </Badge>
              
              <div className="space-y-1">
                <h2 className="text-5xl md:text-6xl font-black text-[#1a2b49] tracking-tight">
                  ₹{property.price.toLocaleString()}
                </h2>
                <div className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">
                  Total Investment Commitment
                </div>
              </div>

              <div className="space-y-2">
                <h1 className="text-2xl md:text-4xl font-black text-[#1a2b49] leading-tight tracking-tighter">
                  {property.title}
                </h1>
                <p className="text-slate-400 font-bold text-lg flex items-center gap-2">
                  <MapPin size={20} className="text-[#FF7F32]" />
                  {property.fullAddress || `${property.sector}, ${property.city}`}
                </p>
              </div>
            </div>

            {/* Elite Stats Bar */}
            <div className="grid grid-cols-3 gap-8 py-10 border-y border-slate-50">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-[#FF7F32] shadow-sm">
                  <Bed size={24} />
                </div>
                <div>
                  <div className="text-xl font-black text-[#1a2b49]">{property.bhk}</div>
                  <div className="text-[9px] font-black uppercase text-slate-300 tracking-widest">Bedrooms</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-[#FF7F32] shadow-sm">
                  <Bath size={24} />
                </div>
                <div>
                  <div className="text-xl font-black text-[#1a2b49]">{property.bathrooms}</div>
                  <div className="text-[9px] font-black uppercase text-slate-300 tracking-widest">Bathrooms</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-[#FF7F32] shadow-sm">
                  <Maximize size={24} />
                </div>
                <div>
                  <div className="text-xl font-black text-[#1a2b49]">{property.totalArea}</div>
                  <div className="text-[9px] font-black uppercase text-slate-300 tracking-widest">{property.areaUnit}</div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Interactive Inquiry Card (High Visibility) */}
          <div className="w-full lg:w-[420px] shrink-0 sticky top-24">
            <div className="bg-white rounded-[48px] p-10 border border-slate-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.06)] space-y-8 overflow-hidden relative group transition-all hover:shadow-[0_48px_80px_-16px_rgba(0,0,0,0.1)]">
              <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/5 rounded-full blur-[60px] -mr-20 -mt-20 group-hover:bg-orange-500/10 transition-all duration-700" />
              
              <div className="relative z-10 space-y-8">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 bg-emerald-50 rounded-[24px] flex items-center justify-center text-emerald-500 shadow-sm border border-emerald-100/50">
                    <MessageCircle size={32} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-[#1a2b49] tracking-tighter">Interested?</h3>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Direct Connect Engine</p>
                  </div>
                </div>

                <p className="text-sm font-medium text-slate-500 leading-relaxed italic">
                  "Get exclusive insights, schedule a private tour, or discuss the valuation directly with the listing manager."
                </p>

                <div className="space-y-4">
                  <Button 
                    onClick={() => setIsEnquiryOpen(true)}
                    className="w-full h-16 rounded-[24px] bg-[#1a2b49] hover:bg-[#FF7F32] text-white font-black text-lg gap-3 shadow-2xl shadow-slate-900/10 transition-all duration-500 active:scale-95 group border-none"
                  >
                    <ShieldCheck size={20} className="group-hover:rotate-12 transition-transform" /> 
                    Start Quick Inquiry
                  </Button>
                  
                  <div className="flex flex-col gap-2 pt-2">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 text-center mb-1">Listing Reference</p>
                    <div className="text-center font-black text-[#1a2b49] text-sm uppercase tracking-widest bg-slate-50 py-3 rounded-2xl">
                      #{property._id.slice(-8).toUpperCase()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 🏡 CONTENT GRID */}
      <main className="max-w-7xl mx-auto px-6 md:px-16 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 border-t border-slate-100 pt-12">
          
          {/* LEFT: Details */}
          <div className="lg:col-span-8 space-y-16">
            
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

          {/* RIGHT: Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="sticky top-24 space-y-8">

              {/* Owner Dashboard (Only if isOwner) */}
              {isOwner && (
                <div className="bg-[#1a2b49] rounded-[48px] p-10 text-white shadow-2xl shadow-slate-900/20 relative overflow-hidden group">
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-500/10 rounded-full blur-[60px] -ml-16 -mb-16" />
                  <div className="relative z-10 space-y-6 text-center">
                    <div className="w-16 h-16 bg-white/10 rounded-[24px] border border-white/20 flex items-center justify-center text-[#FF7F32] mx-auto mb-2">
                      <Pencil size={28} />
                    </div>
                    <div>
                      <h4 className="text-xl font-black tracking-tight">Owner Control</h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Manage Your Asset</p>
                    </div>
                    <Button 
                      onClick={() => setIsEditModalOpen(true)}
                      className="w-full h-14 rounded-2xl bg-[#FF7F32] hover:bg-orange-600 text-white font-black text-sm gap-3 shadow-xl shadow-orange-500/20 transition-all border-none"
                    >
                      Edit Property Listing
                    </Button>
                  </div>
                </div>
              )}
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

      {/* 📥 ENQUIRY MODAL */}
      <EnquiryModal 
        isOpen={isEnquiryOpen} 
        onClose={() => setIsEnquiryOpen(false)} 
        property={property} 
      />
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
