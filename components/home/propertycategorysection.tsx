"use client";

import { useEffect, useRef, useState } from "react";
import PropertyCard from "../property/propertycard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import apiClient from "@/lib/apClient";
import { Loader2, Home } from "lucide-react";



export default function PropertyCategorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [properties, setProperties] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("House");

  const categories: Array<"House" | "Villa" | "Apartment"> = [
    "House",
    "Villa",
    "Apartment",
  ];

  const fetchProperties = async (cat: string) => {
    setIsLoading(true);
    try {
      const res = await apiClient.get(`/property/user/public?page=1&limit=4&category=${cat.toLowerCase()}`);
      if (res.data.success) {
        const mapped = res.data.data.properties.map((prop: any) => {
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
            category: cat
          };
        });
        setProperties(mapped);
      }
    } catch (error) {
      console.error("Failed to fetch category properties:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties(activeTab);
  }, [activeTab]);
  

  return (
    <section ref={sectionRef} className="py-12 sm:py-20 md:py-28 px-4 sm:px-8 lg:px-20 bg-white overflow-hidden">
      <Tabs defaultValue="House" onValueChange={setActiveTab} className="flex flex-col w-full gap-0">

        {/* ── ROW 1: Header (Animated) ── */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between w-full gap-6 mb-10 sm:mb-12 md:mb-16 animate-fade-in-up">
          <div className="max-w-xl">
            <h2 className="text-[28px] sm:text-[40px] md:text-[52px] font-black text-[#1a2b49] leading-[1.1] tracking-tighter mb-2 sm:mb-4">
              Property Category
            </h2>
            <p className="text-[12px] sm:text-[14px] text-gray-400 leading-relaxed max-w-md font-medium">
              Explore our diverse range of properties tailored to fit every lifestyle and preference.
            </p>
          </div>

          {/* Right: Pill Tabs (Scrollable on mobile) */}
          <div className="overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
            <TabsList className="flex items-center rounded-full bg-white border border-gray-100 shadow-sm px-1.5 py-1.5 gap-1 h-auto w-fit whitespace-nowrap">
              {categories.map((cat) => (
                <TabsTrigger
                  key={cat}
                  value={cat}
                  className="px-5 py-2 sm:px-8 sm:py-2.5 rounded-full text-[11px] sm:text-[13px] font-bold text-gray-400 transition-all
                             data-[state=active]:bg-[#1a2b49]
                             data-[state=active]:text-white
                             data-[state=active]:shadow-lg"
                >
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </div>

        {/* ── ROW 2: Cards Grid (Animated Waterfall) ── */}
        <div className="w-full min-h-[400px] relative">
          {isLoading ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center py-20 bg-white/50 backdrop-blur-sm z-10">
              <Loader2 className="w-12 h-12 text-[#FF7F32] animate-spin mb-4" />
              <p className="text-[#1a2b49] font-black uppercase tracking-[0.3em] text-xs">Loading Properties...</p>
            </div>
          ) : properties.length === 0 ? (
            <div className="py-20 text-center animate-fade-in">
              <Home className="mx-auto mb-6 text-slate-200" size={60} />
              <h3 className="text-2xl font-black text-[#1a2b49] tracking-tighter mb-2">No {activeTab}s Found</h3>
              <p className="text-slate-400 font-bold max-w-xs mx-auto">We couldn't find any listings in this category at the moment.</p>
            </div>
          ) : (
            categories.map((cat) => (
              <TabsContent
                key={cat}
                value={cat}
                className="mt-0 data-[state=inactive]:hidden focus-visible:outline-none"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-6 sm:gap-y-8 md:gap-y-10">
                  {properties.map((property, idx) => (
                    <div 
                      key={property.slug || idx}
                      className="animate-fade-in-up hover:-translate-y-3 transition-transform duration-500"
                      style={{ 
                        animationDelay: `${(idx + 1) * 100}ms` 
                      }}
                    >
                      <PropertyCard property={property} />
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))
          )}
        </div>

      </Tabs>
    </section>
  );
}