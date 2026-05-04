"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, Loader2, Search, MapPin, Tag, Home, Armchair, IndianRupee, Layers, SlidersHorizontal, Info } from "lucide-react";
import { Button } from "../ui/button";
import PropertyCard from "../property/propertycard";
import { EnquiryModal } from "../property/EnquiryModal";
import apiClient from "@/lib/apClient";
import { Input } from "../ui/input";
import { CITIES, TRICITY_MAP } from "@/lib/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function LatestProperties() {
  return (
    <Suspense fallback={<div className="py-20 text-center">Loading search params...</div>}>
      <LatestPropertiesContent />
    </Suspense>
  );
}

function LatestPropertiesContent() {
  const searchParams = useSearchParams();
  const urlSector = searchParams.get("sector") || "";
  const urlCity = searchParams.get("city") || "";

  const [properties, setProperties] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 1,
  });
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryForm, setEnquiryForm] = useState({ name: "", phone: "" });

  // 🧪 Integrated Filter States
  const [filters, setFilters] = useState({
    title: "",
    city: urlCity,
    sector: urlSector,
    purpose: "all",
    category: "all",
    status: "all",
    furnishing: "all",
    bhk: "all",
    minPrice: "",
    maxPrice: "",
  });

  const sectionRef = useRef<HTMLElement>(null);

  const fetchProperties = async (currentPage: number) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("page", currentPage.toString());
      params.append("limit", "4");

      if (filters.title) params.append("title", filters.title);
      if (filters.city) params.append("city", filters.city);
      if (filters.sector) params.append("sector", filters.sector.replace("Sector ", "")); // Send number or string as expected by backend
      if (filters.purpose !== "all") params.append("purpose", filters.purpose);
      if (filters.category !== "all") params.append("category", filters.category);
      if (filters.status !== "all") params.append("status", filters.status);
      if (filters.furnishing !== "all") params.append("furnishing", filters.furnishing);
      if (filters.bhk !== "all") params.append("bhk", filters.bhk);
      if (filters.minPrice) params.append("minPrice", filters.minPrice);
      if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);

      const res = await apiClient.get(`/property/user/public?${params.toString()}`);
      if (res.data.success) {
        const mappedProperties = res.data.data.properties.map((prop: any) => {
          const rawUrl = prop.images?.[0]?.url || "";
          let fullImgUrl = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070";
          if (rawUrl) {
            if (rawUrl.startsWith("http")) fullImgUrl = rawUrl;
            else fullImgUrl = `https://module-project-tx70.onrender.com/uploads/${rawUrl.split('/').pop()}`;
          }
          return {
            image: fullImgUrl,
            title: prop.title,
            location: `${prop.locality || ""}, ${prop.city || ""}`,
            price: prop.price,
            beds: prop.bhk || 0,
            baths: prop.bathrooms || 0,
            sqft: prop.totalArea || 0,
            postedAt: new Date(prop.createdAt).toLocaleDateString(),
            slug: prop.slug,
            status: prop.status || "available"
          };
        });
        setProperties(mappedProperties);
        setPagination({
          total: res.data.data.pagination.total,
          totalPages: res.data.data.pagination.totalPages,
        });
      }
    } catch (error) {
      console.error("Failed to fetch public properties:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties(page);
  }, [page, filters]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => {
      const newFilters = { ...prev, [key]: value };
      if (key === "city") newFilters.sector = "";
      return newFilters;
    });
    setPage(1);
  };

  const handleNext = () => {
    if (page < pagination.totalPages) setPage(prev => prev + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage(prev => prev - 1);
  };

  const handleEnquiryClick = (e: React.MouseEvent, prop: any) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedProperty(prop);
    setIsEnquiryOpen(true);
  };

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 px-6 sm:px-10 md:px-20 bg-slate-50/20">
      <div className="max-w-7xl mx-auto">

        {/* --- 🚀 UNIFIED ELITE HEADER --- */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-[2px] bg-[#FF7F32]" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#FF7F32]">Exclusive Listings</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-[#1a2b49] leading-[0.95] tracking-tighter mb-6">
            Latest <span className="text-[#FF7F32]">Properties</span>
          </h2>
          <p className="text-slate-400 font-bold text-lg max-w-md leading-relaxed">
            Curating the world's most impressive residential inventories.
          </p>
        </div>

        {/* --- 🏗️ PRO PORTAL LAYOUT --- */}
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* --- 🛡️ FILTER SIDEBAR --- */}
          <aside className="w-full lg:w-80 flex-shrink-0 lg:sticky lg:top-24 space-y-6">
            <div className="bg-white rounded-[40px] p-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.06)] border border-slate-100">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-sm font-black uppercase tracking-widest text-[#1a2b49] flex items-center gap-2">
                   <SlidersHorizontal size={18} className="text-[#FF7F32]" /> Filters
                </h3>
                <Button variant="ghost" size="sm" className="text-[10px] font-bold text-slate-300 hover:text-[#FF7F32]" onClick={() => setFilters({
                  title: "", city: "", sector: "", purpose: "all", category: "all", status: "all", furnishing: "all", bhk: "all", minPrice: "", maxPrice: "",
                })}>Reset</Button>
              </div>

              <div className="space-y-8">
                {/* Search */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Search</label>
                  <div className="relative">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                    <input
                      placeholder="Title or keyword..."
                      className="h-12 w-full pl-12 pr-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-[#FF7F32]/20 font-bold text-xs outline-none"
                      value={filters.title}
                      onChange={(e) => handleFilterChange("title", e.target.value)}
                    />
                  </div>
                </div>

                {/* City */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">City</label>
                  <Select onValueChange={(v) => handleFilterChange("city", v)} value={filters.city}>
                    <SelectTrigger className="h-12 w-full rounded-2xl bg-slate-50 border-none hover:bg-slate-100 focus:ring-0 font-bold text-xs text-[#1a2b49] px-6 group transition-all">
                      <div className="flex items-center gap-3">
                        <MapPin size={16} className="text-[#FF7F32]" />
                        <SelectValue placeholder="Select City" />
                      </div>
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-slate-100 shadow-2xl p-1 bg-white z-[100]">
                      <SelectItem value="all" className="rounded-xl font-bold py-3 focus:bg-orange-50 focus:text-[#FF7F32]">All Cities</SelectItem>
                      {CITIES.map(city => (
                        <SelectItem key={city.id} value={city.id} className="rounded-xl font-bold py-3 focus:bg-orange-50 focus:text-[#FF7F32]">{city.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Sector */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Sector</label>
                  <Select onValueChange={(v) => handleFilterChange("sector", v)} value={filters.sector}>
                    <SelectTrigger className="h-12 w-full rounded-2xl bg-slate-50 border-none hover:bg-slate-100 focus:ring-0 font-bold text-xs text-[#1a2b49] px-6 group transition-all disabled:opacity-50">
                      <div className="flex items-center gap-3">
                        <Tag size={16} className="text-[#FF7F32]" />
                        <SelectValue placeholder="Select Sector" />
                      </div>
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-slate-100 shadow-2xl p-1 bg-white z-[100]">
                      <SelectItem value="all" className="rounded-xl font-bold py-3 focus:bg-orange-50 focus:text-[#FF7F32]">All Sectors</SelectItem>
                      {filters.city && filters.city !== "all" && TRICITY_MAP[filters.city as keyof typeof TRICITY_MAP]?.sectors.map((s: any) => {
                        const sectorVal = typeof s === 'number' ? `Sector ${s}` : s;
                        return (
                          <SelectItem key={sectorVal} value={sectorVal} className="rounded-xl font-bold py-3 focus:bg-orange-50 focus:text-[#FF7F32]">{sectorVal}</SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>

                {/* Category */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Property Type</label>
                  <Select onValueChange={(v) => handleFilterChange("category", v)} value={filters.category}>
                    <SelectTrigger className="h-12 w-full rounded-2xl bg-slate-50 border-none hover:bg-slate-100 focus:ring-0 font-bold text-xs text-[#1a2b49] px-6 group transition-all">
                      <div className="flex items-center gap-3">
                        <Home size={16} className="text-[#FF7F32]" />
                        <SelectValue placeholder="Type" />
                      </div>
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-slate-100 shadow-2xl p-1 bg-white z-[100]">
                      <SelectItem value="all" className="rounded-xl font-bold py-3 focus:bg-orange-50 focus:text-[#FF7F32]">All Types</SelectItem>
                      {["flat", "apartment", "house", "villa", "studio", "pg", "shop", "office", "plot", "warehouse"].map(cat => (
                        <SelectItem key={cat} value={cat} className="rounded-xl font-bold py-3 focus:bg-orange-50 focus:text-[#FF7F32] capitalize">{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Purpose */}
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Contract</label>
                  <div className="grid grid-cols-1 gap-2">
                    {["all", "rent", "sale"].map((p) => (
                      <button
                        key={p}
                        onClick={() => handleFilterChange("purpose", p)}
                        className={`w-full py-3 px-6 rounded-xl text-[11px] font-black uppercase tracking-widest text-left transition-all flex items-center justify-between group ${filters.purpose === p ? "bg-[#1a2b49] text-white shadow-lg shadow-[#1a2b49]/20" : "bg-slate-50 text-slate-400 hover:bg-slate-100"}`}
                      >
                        {p}
                        {filters.purpose === p && <div className="w-1.5 h-1.5 bg-[#FF7F32] rounded-full" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* BHK */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Configuration</label>
                  <div className="grid grid-cols-3 gap-2">
                    {["all", "1", "2", "3", "4", "5"].map(b => (
                      <button
                        key={b}
                        onClick={() => handleFilterChange("bhk", b)}
                        className={`h-10 rounded-xl text-[10px] font-black transition-all border-2 ${filters.bhk === b ? "border-[#FF7F32] bg-orange-50 text-[#FF7F32]" : "border-slate-50 bg-white text-slate-400 hover:border-slate-200"}`}
                      >
                        {b === "all" ? "ANY" : `${b}BHK`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="space-y-4">
                   <div className="flex items-center justify-between ml-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Budget (₹)</label>
                      <IndianRupee size={12} className="text-[#FF7F32]" />
                   </div>
                   <div className="grid grid-cols-2 gap-3 items-center">
                    <input
                      type="number"
                      placeholder="Min"
                      className="h-12 w-full px-4 rounded-xl bg-slate-50 border-none font-bold text-xs text-[#1a2b49] outline-none focus:ring-2 focus:ring-[#FF7F32]/20"
                      value={filters.minPrice}
                      onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      className="h-12 w-full px-4 rounded-xl bg-slate-50 border-none font-bold text-xs text-[#1a2b49] outline-none focus:ring-2 focus:ring-[#FF7F32]/20"
                      value={filters.maxPrice}
                      onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                    />
                   </div>
                </div>

                <Button 
                   onClick={() => fetchProperties(1)}
                   className="w-full h-14 rounded-2xl bg-[#1a2b49] text-white hover:bg-[#FF7F32] transition-all shadow-xl shadow-[#1a2b49]/20 font-black uppercase tracking-widest text-[11px] mt-4"
                >
                  Show Assets
                </Button>
              </div>
            </div>
          </aside>

          {/* --- 🏡 PROPERTIES FLOW --- */}
          <main className="flex-grow">
            <div className="relative">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-40">
                  <Loader2 className="w-16 h-16 text-[#FF7F32] animate-spin mb-6" />
                  <p className="text-[#1a2b49] font-black uppercase tracking-[0.3em] text-xs">Loading properties...</p>
                </div>
              ) : properties.length === 0 ? (
                <div className="bg-white rounded-[60px] py-40 border border-dashed border-slate-200 text-center flex flex-col items-center">
                  <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                    <Home className="text-slate-200" size={40} />
                  </div>
                  <h3 className="text-3xl font-black text-[#1a2b49] tracking-tighter mb-2">No Matching Assets</h3>
                  <p className="text-slate-400 font-bold max-w-xs mx-auto">Adjust your parameters to discover other high-value opportunities.</p>
                  <Button variant="ghost" className="mt-8 text-[#FF7F32] font-black uppercase tracking-widest text-[10px]" onClick={() => setFilters({
                    title: "", city: "", sector: "", purpose: "all", category: "all", status: "all", furnishing: "all", bhk: "all", minPrice: "", maxPrice: "",
                  })}>Clear Filters</Button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10">
                    {properties.map((property: any, index: number) => (
                      <div
                        key={property.slug || index}
                        className="animate-fade-in-up"
                        style={{ animationDelay: `${(index + 1) * 100}ms` }}
                      >
                        <PropertyCard property={property} onEnquiry={handleEnquiryClick} />
                      </div>
                    ))}
                  </div>

                  {/* --- ELITE PAGINATION CONTROLS (Floating / Inline) --- */}
                  <div className="mt-20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-[1px] bg-slate-100" />
                      <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">Page {page}</span>
                    </div>

                    <div className="flex items-center gap-6">
                      <Button
                        variant="outline"
                        size="icon"
                        disabled={page === 1 || isLoading}
                        onClick={handlePrev}
                        className="w-14 h-14 border-slate-100 rounded-full hover:bg-[#1a2b49] hover:text-white transition-all shadow-xl shadow-slate-900/5 active:scale-90"
                      >
                        <ArrowLeft size={18} />
                      </Button>
                      <div className="flex flex-col items-center">
                        <span className="text-2xl font-black text-[#1a2b49]">{page.toString().padStart(2, '0')}</span>
                        <div className="w-1 h-1 bg-[#FF7F32] rounded-full mt-1" />
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        disabled={page === pagination.totalPages || isLoading}
                        onClick={handleNext}
                        className="w-14 h-14 border-slate-100 rounded-full hover:bg-[#1a2b49] hover:text-white transition-all shadow-xl shadow-slate-900/5 active:scale-90"
                      >
                        <ArrowRight size={18} />
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </main>
        </div>
      </div>

      <EnquiryModal 
        isOpen={isEnquiryOpen} 
        onClose={() => setIsEnquiryOpen(false)} 
        property={selectedProperty} 
      />
    </section>
  );
}