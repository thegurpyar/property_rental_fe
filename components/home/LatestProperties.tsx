"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import PropertyCard from "../property/PropertyCard";

const SAMPLE_PROPERTIES = [
  {
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070",
    title: "Spacious & Luxurious in Dubai",
    location: "Downtown, Dubai, UAE",
    price: 7500,
    beds: 4,
    baths: 2,
    sqft: 1150,
    postedAt: "6 months ago"
  },
  {
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070",
    title: "Modern Villa with Pool",
    location: "Downtown, Dubai, UAE",
    price: 12000,
    beds: 5,
    baths: 3,
    sqft: 2100,
    postedAt: "1 year ago"
  },
  {
    image: "https://images.unsplash.com/photo-1600607687940-c52af0b4396b?q=80&w=2070",
    title: "Sky High Penthouse",
    location: "Downtown, Dubai, UAE",
    price: 9800,
    beds: 3,
    baths: 2,
    sqft: 1450,
    postedAt: "1 month ago"
  },
  {
    image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=2070",
    title: "Minimalist Urban Loft",
    location: "Downtown, Dubai, UAE",
    price: 5200,
    beds: 2,
    baths: 1,
    sqft: 950,
    postedAt: "1 month ago"
  }
];

export default function LatestProperties() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Trigger only when the section enters the view
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Stop observing once the animation is triggered
          if (sectionRef.current) observer.unobserve(sectionRef.current);
        }
      },
      { 
        threshold: 0.15, // Trigger when 15% of the section is visible
        rootMargin: "0px 0px -50px 0px" 
      }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-6 md:px-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* --- Header Section --- */}
        <div className={`flex justify-between items-end mb-16 reveal-on-scroll ${isVisible ? 'animate-active' : ''}`}>
          <div className="max-w-xl">
            <h2 className="text-[48px] font-bold text-[#1a2b49] leading-tight mb-4 tracking-tighter">
              Latest <span className="text-[#FF7F32]">properties</span>
            </h2>
            <p className="text-gray-400 text-base leading-relaxed max-w-md font-medium">
              We have completed several housing, villa and property orders with our professional team, at costs that suit you.
            </p>
          </div>
          
          {/* Navigation Buttons (Shadcn) */}
          <div className="hidden md:flex items-center gap-6 pb-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="w-14 h-14 border-gray-100 rounded-full hover:bg-[#1a2b49] hover:text-white transition-all shadow-none active:scale-90"
            >
              <ArrowLeft size={20}/>
            </Button>
            
            <span className="font-black text-[#1a2b49] text-xs tracking-[0.3em]">01/03</span>
            
            <Button 
              variant="outline" 
              size="icon" 
              className="w-14 h-14 border-gray-100 rounded-full hover:bg-[#1a2b49] hover:text-white transition-all shadow-none active:scale-90"
            >
              <ArrowRight size={20}/>
            </Button>
          </div>
        </div>
        
        {/* --- Properties Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SAMPLE_PROPERTIES.map((property, index) => (
            <div 
              key={index} 
              className={`reveal-on-scroll ${isVisible ? 'animate-active' : ''} hover:-translate-y-3 transition-transform duration-500`}
              style={{ 
                // Creating the Waterfall effect: Each card waits a bit longer
                animationDelay: isVisible ? `${(index + 1) * 150}ms` : '0ms' 
              }}
            >
              <PropertyCard property={property} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}