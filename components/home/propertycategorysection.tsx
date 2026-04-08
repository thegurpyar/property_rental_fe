"use client";

import { useEffect, useRef, useState } from "react";
import PropertyCard from "../property/propertycard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CATEGORY_PROPERTIES = [
  { image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070", title: "Spacious & Luxurious in Dubai", location: "Downtown, Dubai, UAE", price: 7500, beds: 4, baths: 2, sqft: 1150, postedAt: "6 months ago", category: "House" },
  { image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070", title: "Spacious & Luxurious in Dubai", location: "Downtown, Dubai, UAE", price: 7500, beds: 4, baths: 2, sqft: 1150, postedAt: "1 years ago", category: "Villa" },
  { image: "https://images.unsplash.com/photo-1600607687940-c52af0b4396b?q=80&w=2070", title: "Spacious & Luxurious in Dubai", location: "Downtown, Dubai, UAE", price: 7500, beds: 4, baths: 2, sqft: 1150, postedAt: "1 months ago", category: "Apartment" },
  { image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=2070", title: "Spacious & Luxurious in Dubai", location: "Downtown, Dubai, UAE", price: 7500, beds: 4, baths: 2, sqft: 1150, postedAt: "1 months ago", category: "House" },
  { image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070", title: "Spacious & Luxurious in Dubai", location: "Downtown, Dubai, UAE", price: 7500, beds: 4, baths: 2, sqft: 1150, postedAt: "6 months ago", category: "House" },
  { image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070", title: "Spacious & Luxurious in Dubai", location: "Downtown, Dubai, UAE", price: 7500, beds: 4, baths: 2, sqft: 1150, postedAt: "1 years ago", category: "Villa" },
  { image: "https://images.unsplash.com/photo-1600607687940-c52af0b4396b?q=80&w=2070", title: "Spacious & Luxurious in Dubai", location: "Downtown, Dubai, UAE", price: 7500, beds: 4, baths: 2, sqft: 1150, postedAt: "1 months ago", category: "Apartment" },
  { image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=2070", title: "Spacious & Luxurious in Dubai", location: "Downtown, Dubai, UAE", price: 7500, beds: 4, baths: 2, sqft: 1150, postedAt: "1 months ago", category: "House" },
];

export default function PropertyCategorySection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const categories: Array<"House" | "Villa" | "Apartment"> = [
    "House",
    "Villa",
    "Apartment",
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (sectionRef.current) observer.unobserve(sectionRef.current);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-20 bg-white overflow-hidden">
      <Tabs defaultValue="House" className="flex flex-col w-full gap-0">

        {/* ── ROW 1: Header (Animated) ── */}
        <div className={`flex flex-col md:flex-row md:items-start md:justify-between w-full gap-6 mb-10 sm:mb-12 md:mb-16 reveal-on-scroll ${isVisible ? 'animate-active' : ''}`}>
          <div className="max-w-xl">
            <h2 className="text-[28px] sm:text-[36px] md:text-[44px] font-extrabold text-[#1a2b49] leading-tight tracking-tighter mb-3 md:mb-4">
              Property Category
            </h2>
            <p className="text-[13px] sm:text-[14px] text-gray-400 leading-relaxed max-w-md font-medium">
              Explore our diverse range of properties tailored to fit every lifestyle and preference.
            </p>
          </div>

          {/* Right: Pill Tabs */}
          <TabsList className="flex flex-wrap items-center rounded-full bg-white border border-gray-100 shadow-sm px-1.5 py-1.5 gap-1 h-auto w-fit">
            {categories.map((cat) => (
              <TabsTrigger
                key={cat}
                value={cat}
                className="px-5 py-2 sm:px-8 sm:py-2.5 rounded-full text-[12px] sm:text-[13px] font-bold text-gray-400 transition-all
                           data-[state=active]:bg-[#1a2b49]
                           data-[state=active]:text-white
                           data-[state=active]:shadow-lg"
              >
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* ── ROW 2: Cards Grid (Animated Waterfall) ── */}
        <div className="w-full">
          {categories.map((cat) => (
            <TabsContent
              key={cat}
              value={cat}
              className="mt-0 data-[state=inactive]:hidden focus-visible:outline-none"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-6 sm:gap-y-8 md:gap-y-10">
                {CATEGORY_PROPERTIES.filter((p) => p.category === cat).map(
                  (property, idx) => (
                    <div 
                      key={`${cat}-${idx}`}
                      className={`reveal-on-scroll ${isVisible ? 'animate-active' : ''} hover:-translate-y-3 transition-transform duration-500`}
                      style={{ 
                        animationDelay: isVisible ? `${(idx + 1) * 150}ms` : '0ms' 
                      }}
                    >
                      <PropertyCard property={property} />
                    </div>
                  )
                )}
              </div>
            </TabsContent>
          ))}
        </div>

      </Tabs>
    </section>
  );
}