"use client";

import { useState, useRef, useEffect } from "react";
import { 
  Home, Upload, CheckCircle2, MapPin, Info, 
  LayoutDashboard, Phone, User, Camera, ShieldCheck 
} from "lucide-react";
import { Button } from "../ui/Button";
import { Card, CardContent } from "../ui/Card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { 
  Select, SelectContent, SelectItem, 
  SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export default function AddPropertyForm() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // ── Animation Logic ──
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  // ── Style Helpers ──
  const inputBase = "bg-gray-50 border-gray-200 rounded-xl px-4 py-6 text-sm text-[#1a2b49] placeholder:text-gray-400 focus:bg-white focus:ring-4 focus:ring-orange-500/5 focus:border-[#FF7F32] transition-all outline-none w-full relative z-10";
  const sectionHeader = "flex items-center gap-2 text-[#1a2b49] font-black text-sm uppercase tracking-widest mb-8 border-b border-gray-100 pb-3";

  return (
    <Card 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`group rounded-[48px] border border-gray-100 bg-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.06)] relative overflow-visible reveal-on-scroll ${isVisible ? 'animate-active' : ''}`}
    >
      {/* 🚀 Interactive Shine Effect */}
      <div 
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 opacity-0 group-hover:opacity-100 rounded-[48px]"
        style={{ background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,127,50,0.04), transparent 40%)` }}
      />

      {/* --- Card Header --- */}
      <div className="bg-white p-10 pb-6 border-b border-gray-50 rounded-t-[48px]">
        <div className="flex items-center gap-4">
          <div className="bg-[#FF7F32] p-3 rounded-2xl shadow-lg shadow-orange-500/20 text-white">
            <Home size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-black text-[#1a2b49] tracking-tighter">List Your Property</h3>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Verified Tricity Real Estate Engine</p>
          </div>
        </div>
      </div>

      <CardContent className="p-8 md:p-12 space-y-20 bg-white relative z-10 rounded-b-[48px]">
        <form className="space-y-16">

          {/* 📍 SECTION 1: BASIC DETAILS [Row Wise Layout] */}
          <div className="space-y-8">
            <h4 className={sectionHeader}><Info size={18} className="text-[#FF7F32]" /> Basic Property Details</h4>
            
            {/* Title, Category, Purpose (2-column logic) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-6 space-y-2">
                <Label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 ml-1">Property Title</Label>
                <Input placeholder="e.g. 3BHK Flat in Sector 70 Mohali" className={inputBase} />
              </div>
              <div className="lg:col-span-3 space-y-2">
                <Label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 ml-1">Category</Label>
                <Select>
                  <SelectTrigger className={inputBase}><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent className="bg-white z-[100] shadow-2xl">
                    {["Apartment", "Independent House", "Builder Floor", "Plot/Land", "Commercial"].map(cat => (
                      <SelectItem key={cat} value={cat.toLowerCase()} className="py-3">{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="lg:col-span-3 space-y-2">
                <Label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 ml-1">Purpose</Label>
                <Select>
                  <SelectTrigger className={inputBase}><SelectValue placeholder="Rent / Sale" /></SelectTrigger>
                  <SelectContent className="bg-white z-[100] shadow-2xl">
                    <SelectItem value="rent" className="py-3">For Rent</SelectItem>
                    <SelectItem value="sale" className="py-3">For Sale</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Price, BHK, Baths, Size (4-column logic) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="space-y-2">
                <Label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 ml-1">Price (₹)</Label>
                <Input type="number" placeholder="Total / Monthly" className={inputBase} />
              </div>
              <div className="space-y-2">
                <Label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 ml-1">BHK</Label>
                <Input type="number" placeholder="Beds" className={inputBase} />
              </div>
              <div className="space-y-2">
                <Label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 ml-1">Bathrooms</Label>
                <Input type="number" placeholder="Baths" className={inputBase} />
              </div>
              <div className="space-y-2">
                <Label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 ml-1">Total Area</Label>
                <div className="flex gap-2">
                  <Input placeholder="Size" className="bg-gray-50 border-gray-200 rounded-xl px-4 py-6 text-sm flex-1 focus:bg-white transition-all outline-none" />
                  <Select>
                    <SelectTrigger className="w-[110px] bg-gray-100 border-none rounded-xl h-[52px] text-xs font-bold"><SelectValue placeholder="Unit" /></SelectTrigger>
                    <SelectContent className="bg-white shadow-xl">
                      <SelectItem value="sqft">Sq Ft</SelectItem>
                      <SelectItem value="sqyd">Sq Yd</SelectItem>
                      <SelectItem value="marla">Marla</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* 🗺️ SECTION 2: LOCATION (TRICITY SPECIFIC) */}
          <div className="space-y-8">
            <h4 className={sectionHeader}><MapPin size={18} className="text-[#FF7F32]" /> Location (Tricity)</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <Label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 ml-1">City</Label>
                <Select>
                  <SelectTrigger className={inputBase}><SelectValue placeholder="Select City" /></SelectTrigger>
                  <SelectContent className="bg-white shadow-xl">
                    {["Chandigarh", "Mohali", "Kharar", "Zirakpur", "Panchkula", "New Chandigarh"].map(city => (
                      <SelectItem key={city} value={city.toLowerCase()} className="py-3">{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 ml-1">Sector / Area / Landmark</Label>
                <Input placeholder="e.g. Sector 70 or Sunny Enclave" className={inputBase} />
              </div>
            </div>
          </div>

          {/* 🛋️ SECTION 3: FEATURES & AMENITIES */}
          <div className="space-y-10">
            <h4 className={sectionHeader}><LayoutDashboard size={18} className="text-[#FF7F32]" /> Features & Amenities</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="space-y-2">
                <Label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 ml-1">Furnishing</Label>
                <Select>
                  <SelectTrigger className={inputBase}><SelectValue placeholder="Status" /></SelectTrigger>
                  <SelectContent className="bg-white shadow-xl">
                    {["Furnished", "Semi-Furnished", "Unfurnished"].map(f => (
                      <SelectItem key={f} value={f.toLowerCase()} className="py-3">{f}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 ml-1">Parking</Label>
                <Select>
                  <SelectTrigger className={inputBase}><SelectValue placeholder="Select Type" /></SelectTrigger>
                  <SelectContent className="bg-white shadow-xl">
                    <SelectItem value="open" className="py-3">Open Parking</SelectItem>
                    <SelectItem value="covered" className="py-3">Covered Parking</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 ml-1">Age (Years)</Label>
                <Input placeholder="e.g. 2 years" className={inputBase} />
              </div>
            </div>

            {/* Amenities Checklist */}
            <div className="bg-gray-50/50 p-8 rounded-[40px] border border-gray-100">
              <Label className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FF7F32] mb-8 block">Select Available Amenities</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6">
                {["Lift", "Power Backup", "Security", "Park", "Gym", "Swimming Pool", "Clubhouse", "Near Market"].map(item => (
                  <div key={item} className="flex items-center gap-3">
                    <input type="checkbox" className="w-5 h-5 accent-[#FF7F32] rounded-md cursor-pointer" />
                    <span className="text-sm font-bold text-[#1a2b49] opacity-80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 📸 SECTION 4: MEDIA & DESCRIPTION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-2">
              <Label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 ml-1">Description</Label>
              <Textarea 
                placeholder="Mention nearby landmarks, road connectivity, condition, etc." 
                className="bg-gray-50 border-gray-200 rounded-[32px] p-6 min-h-[260px] text-sm text-[#1a2b49] focus:bg-white transition-all outline-none resize-none shadow-sm" 
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 ml-1">Property Images</Label>
              <div className="border-2 border-dashed border-gray-100 rounded-[40px] h-[260px] flex flex-col items-center justify-center text-center group/upload hover:border-[#FF7F32]/40 hover:bg-orange-50/20 transition-all cursor-pointer bg-gray-50/30 relative">
                <div className="bg-white p-5 rounded-2xl mb-4 shadow-sm group-hover/upload:scale-110 transition-transform">
                  <Camera className="text-[#FF7F32] w-8 h-8" />
                </div>
                <p className="text-sm font-black text-[#1a2b49]">Upload Minimum 3 Photos</p>
                <p className="text-[10px] text-gray-400 mt-2 font-bold uppercase tracking-widest">Drag & Drop Supported (Max 10MB)</p>
              </div>
            </div>
          </div>

{/* 👤 SECTION 5: SELLER CONTACT (Light SaaS Theme) */}
<div className="bg-gray-50/50 p-8 md:p-12 rounded-[48px] border border-gray-100 shadow-sm relative overflow-hidden group/contact">
  {/* Subtle Background Decoration */}
  <div className="absolute -right-12 -bottom-12 text-gray-200/20 group-hover/contact:text-[#FF7F32]/5 transition-colors duration-700">
    <ShieldCheck size={240} />
  </div>

  <div className="relative z-10">
    <h4 className="flex items-center gap-3 text-[#1a2b49] font-black text-sm uppercase tracking-[0.2em] mb-10">
      <div className="bg-[#FF7F32] p-2 rounded-lg text-white shadow-lg shadow-orange-500/20">
        <User size={18} />
      </div>
      Seller Contact Info
    </h4>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
      {/* Full Name */}
      <div className="space-y-3">
        <Label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 ml-1">Full Name</Label>
        <Input 
          placeholder="Enter your name" 
          className="bg-white border-gray-200 text-[#1a2b49] rounded-2xl py-7 shadow-sm focus:ring-[#FF7F32]/10 focus:border-[#FF7F32] transition-all" 
        />
      </div>

      {/* Phone Number */}
      <div className="space-y-3">
        <Label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 ml-1">Phone Number</Label>
        <Input 
          placeholder="+91 XXXXX XXXXX" 
          className="bg-white border-gray-200 text-[#1a2b49] rounded-2xl py-7 shadow-sm focus:ring-[#FF7F32]/10 focus:border-[#FF7F32] transition-all" 
        />
      </div>

      {/* WhatsApp Alert Toggle */}
      <div className="flex items-center justify-between bg-white border border-gray-200 p-5 rounded-2xl h-[60px] shadow-sm hover:border-green-100 transition-colors">
        <div className="flex items-center gap-3">
          <div className="bg-green-50 p-2 rounded-full">
            <Phone size={16} className="text-green-500" />
          </div>
          <span className="text-[11px] font-black text-[#1a2b49] uppercase tracking-wider">WhatsApp Alert</span>
        </div>
        <Switch className="data-[state=checked]:bg-green-500" />
      </div>
    </div>
  </div>
</div>

          {/* CTA BUTTON */}
          <Button className="w-full bg-[#FF7F32] hover:bg-orange-600 text-white h-auto py-7 rounded-3xl font-black text-xl shadow-2xl shadow-orange-500/30 transition-all active:scale-[0.98] border-none group">
            Publish Property Listing
            <CheckCircle2 size={24} className="ml-2 group-hover:rotate-12 transition-transform" />
          </Button>

          <p className="text-center text-[11px] text-gray-400 flex items-center justify-center gap-2 font-bold uppercase tracking-[0.2em]">
            Verified by Mr. Tolet Network 2026
          </p>
        </form>
      </CardContent>
    </Card>
  );
}