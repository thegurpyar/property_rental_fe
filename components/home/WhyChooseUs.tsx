"use client";

import { useEffect, useRef, useState } from "react";
import { Headphones, Timer, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const FEATURES = [
  {
    title: "Expert Support",
    address: "2972 Westheimer Rd. Santa Ana",
    icon: <Headphones className="w-8 h-8 text-[#1a2b49] group-hover:scale-110 transition-transform duration-500" />,
  },
  {
    title: "Quick Process",
    address: "2972 Westheimer Rd. Santa Ana",
    icon: <Timer className="w-8 h-8 text-[#1a2b49] group-hover:scale-110 transition-transform duration-500" />,
  },
  {
    title: "Verified Properties",
    address: "2972 Westheimer Rd. Santa Ana",
    icon: <ShieldCheck className="w-8 h-8 text-[#1a2b49] group-hover:scale-110 transition-transform duration-500" />,
  },
];

export default function WhyChooseUs() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (sectionRef.current) observer.unobserve(sectionRef.current);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 px-6 md:px-16 bg-[#F5F7FA] overflow-hidden">
      {/* ── Header Section ── */}
      <div className={`text-center mb-20 reveal-hidden ${isVisible ? 'animate-spring' : ''}`}>
        <p className="text-[#FF7F32] font-black text-[10px] uppercase tracking-[0.4em] mb-4">
          Why PropertyPro
        </p>
        <h2 className="text-[44px] md:text-[56px] font-extrabold text-[#1a2b49] leading-none tracking-tighter">
          Built for Rent & Owners
        </h2>
      </div>

      {/* ── Features Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {FEATURES.map((feature, idx) => (
          <div 
            key={idx}
            className={`reveal-hidden ${isVisible ? 'animate-spring' : ''}`}
            style={{ animationDelay: isVisible ? `${(idx + 1) * 200}ms` : '0ms' }}
          >
            <Card 
              className="group border-none rounded-[48px] bg-white shadow-sm hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 hover:-translate-y-4 hover:rotate-1"
            >
              <CardContent className="p-16 flex flex-col items-center text-center">
                {/* Icon Wrapper with Glow */}
                <div className="w-20 h-20 rounded-[28px] bg-[#F5F7FA] flex items-center justify-center mb-10 group-hover:bg-[#FF7F32] transition-colors duration-500 relative">
                  <div className="relative z-10 group-hover:text-white transition-colors">
                    {feature.icon}
                  </div>
                  {/* Subtle pulsing ring on hover */}
                  <div className="absolute inset-0 rounded-[28px] bg-[#FF7F32] opacity-0 group-hover:animate-ping group-hover:opacity-20 transition-all" />
                </div>
                
                <h3 className="text-2xl font-bold text-[#1a2b49] mb-4 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest opacity-60">
                  {feature.address}
                </p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
}