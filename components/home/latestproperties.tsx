"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Loader2, Search, MapPin, Tag, Home, Armchair, IndianRupee, Layers, SlidersHorizontal, Info } from "lucide-react";
import { Button } from "../ui/button";
import PropertyCard from "../property/propertycard";
import apiClient from "@/lib/apClient";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function LatestProperties() {
  const [properties, setProperties] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 1,
    limit: 4
  });
  
  // 🧪 Integrated Filter States
  const [filters, setFilters] = useState({
    title: "",
    city: "",
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
            slug: prop.slug
          };
        });
        setProperties(mappedProperties);
        setPagination({
          total: res.data.data.pagination.total,
          totalPages: res.data.data.pagination.totalPages,
          limit: res.data.data.pagination.limit
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
    setFilters(prev => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const handleNext = () => {
    if (page < pagination.totalPages) setPage(prev => prev + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage(prev => prev - 1);
  };

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 px-6 sm:px-10 md:px-20 bg-slate-50/20">
      <div className="max-w-7xl mx-auto">

        {/* --- 🚀 UNIFIED ELITE DASHBOARD HEADER --- */}
        <div className="mb-20">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 mb-16">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <div className="w-12 h-[2px] bg-[#FF7F32]" />
                 <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#FF7F32]">Exclusive Listings</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-[#1a2b49] leading-[0.95] tracking-tighter">
                Latest <br />
                <span className="text-[#FF7F32]">Propert</span>ies
              </h2>
              <p className="text-slate-400 font-bold text-lg max-w-md leading-relaxed">
                Curating the world's most impressive residential inventories.
              </p>
            </div>

            {/* --- INTEGRATED FILTER BAR (Compact & Professional) --- */}
            <div className="bg-white rounded-[40px] p-2 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-slate-100 flex flex-col sm:flex-row items-center gap-2">
               <div className="relative w-full sm:w-80">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input 
                    placeholder="Search by location, title..." 
                    className="h-16 w-full pl-14 border-none bg-transparent focus:ring-0 font-bold text-sm outline-none"
                    value={filters.title}
                    onChange={(e) => handleFilterChange("title", e.target.value)}
                  />
               </div>
               <div className="h-10 w-[1px] bg-slate-100 hidden sm:block" />
               <div className="w-full sm:w-auto px-2">
                  <Select onValueChange={(v) => handleFilterChange("category", v)} value={filters.category}>
                    <SelectTrigger className="h-12 sm:h-14 rounded-2xl bg-slate-50/50 border-none hover:bg-slate-100/50 focus:ring-0 font-black text-[10px] uppercase tracking-widest text-[#1a2b49] px-6 w-full sm:w-48 group transition-all">
                      <div className="flex items-center gap-3">
                        <Home size={16} className="text-[#FF7F32] group-hover:scale-110 transition-transform" />
                        <SelectValue placeholder="Category" />
                      </div>
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-slate-100 shadow-2xl p-1 bg-white/95 backdrop-blur-xl z-[100]">
                       <SelectItem value="all" className="rounded-xl font-bold py-3 focus:bg-orange-50 focus:text-[#FF7F32]">All Types</SelectItem>
                       {["flat", "apartment", "house", "villa", "studio", "pg", "shop", "office", "plot", "warehouse"].map(cat => (
                          <SelectItem key={cat} value={cat} className="rounded-xl font-bold py-3 focus:bg-orange-50 focus:text-[#FF7F32] capitalize">{cat}</SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
               </div>
               <Button className="h-12 w-full sm:w-14 sm:h-14 rounded-2xl sm:rounded-[28px] bg-[#1a2b49] text-white p-0 hover:bg-[#FF7F32] transition-all shadow-lg shadow-slate-900/10">
                  <Search size={22} />
               </Button>
            </div>
          </div>

          {/* --- SECONDARY ELITE FILTERS (Horizontal Scrollable/Flex) --- */}
          <div className="flex flex-wrap items-center gap-4 mb-16 animate-fade-in-up">
             
             {/* Purpose Toggle */}
             <div className="flex gap-1 bg-white p-1.5 rounded-full border border-slate-100 shadow-sm">
                {["all", "rent", "sale"].map((p) => (
                  <button 
                    key={p}
                    onClick={() => handleFilterChange("purpose", p)}
                    className={`px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${filters.purpose === p ? "bg-[#1a2b49] text-white shadow-lg shadow-[#1a2b49]/20" : "text-slate-400 hover:text-[#1a2b49]"}`}
                  >
                    {p}
                  </button>
                ))}
             </div>

             {/* Config Select */}
             <Select onValueChange={(v) => handleFilterChange("bhk", v)} value={filters.bhk}>
                <SelectTrigger className="w-auto h-12 px-8 rounded-2xl bg-white border border-slate-100 shadow-sm text-[11px] font-black uppercase tracking-[0.2em] text-[#1a2b49] hover:bg-slate-50 hover:border-orange-300 transition-all duration-300 group">
                   <div className="flex items-center gap-3">
                      <Layers size={16} className="text-[#FF7F32] group-hover:scale-110 transition-transform" />
                      <SelectValue placeholder="BHK" />
                   </div>
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-slate-100 shadow-2xl p-1 bg-white/95 backdrop-blur-xl z-[100]">
                    <SelectItem value="all" className="rounded-xl font-bold py-3 focus:bg-orange-50 focus:text-[#FF7F32]">Any BHK</SelectItem>
                    {[1,2,3,4,5].map(b => (
                      <SelectItem key={b} value={b.toString()} className="rounded-xl font-bold py-3 focus:bg-orange-50 focus:text-[#FF7F32]">{b} BHK</SelectItem>
                    ))}
                </SelectContent>
             </Select>

             {/* Price Range Summary */}
             <div className="flex items-center gap-4 bg-white px-8 py-2.5 rounded-full border border-slate-100 shadow-sm ml-auto h-12">
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Price ₹</span>
                <input 
                  type="number" 
                  placeholder="Min" 
                  className="w-16 bg-transparent border-none text-[12px] font-black text-[#1a2b49] focus:outline-none placeholder:text-slate-200"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                />
                <div className="w-4 h-[1px] bg-slate-100" />
                <input 
                  type="number" 
                  placeholder="Max" 
                  className="w-16 bg-transparent border-none text-[12px] font-black text-[#1a2b49] focus:outline-none placeholder:text-slate-200"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                />
             </div>
          </div>
        </div>

        {/* --- 🏡 PROPERTIES FLOW --- */}
        <div className="relative">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-40">
              <Loader2 className="w-16 h-16 text-[#FF7F32] animate-spin mb-6" />
              <p className="text-[#1a2b49] font-black uppercase tracking-[0.3em] text-xs">Loading properties...</p>
            </div>
          ) : properties.length === 0 ? (
            <div className="bg-white rounded-[60px] py-40 border border-dashed border-slate-200 text-center">
               <Home className="mx-auto mb-6 text-slate-200" size={60} />
               <h3 className="text-3xl font-black text-[#1a2b49] tracking-tighter mb-2">No Matching Assets</h3>
               <p className="text-slate-400 font-bold max-w-xs mx-auto">Adjust your parameters to discover other high-value opportunities.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                {properties.map((property: any, index: number) => (
                  <div
                    key={property.slug || index}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${(index + 1) * 100}ms` }}
                  >
                    <PropertyCard property={property} />
                  </div>
                ))}
              </div>

              {/* --- ELITE PAGINATION CONTROLS (Floating / Inline) --- */}
              <div className="mt-20 flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <div className="w-20 h-[1px] bg-slate-100" />
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">End of Page {page}</span>
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
      </div>
    </section>
  );
}