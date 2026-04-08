"use client";

import { useEffect, useRef, useState } from "react";
import { Headphones, Timer, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "../ui/card";

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
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="py-16 sm:py-24 md:py-32 px-4 sm:px-8 md:px-16 bg-[#F5F7FA] overflow-hidden">
      {/* ── Header Section ── */}
      <div className="text-center mb-10 sm:mb-14 md:mb-20 animate-spring">
        <p className="text-[#FF7F32] font-black text-[10px] uppercase tracking-[0.4em] mb-3 md:mb-4">
          Why PropertyPro
        </p>
        <h2 className="text-[28px] sm:text-[40px] md:text-[56px] font-black text-[#1a2b49] leading-[1.1] tracking-tighter">
          Built for Rent &amp; Owners
        </h2>
      </div>

      {/* ── Features Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-7 md:gap-10 max-w-7xl mx-auto">
        {FEATURES.map((feature, idx) => (
          <div
            key={idx}
            className="animate-spring"
            style={{ animationDelay: `${(idx + 1) * 100}ms` }}
          >
            <Card
              className="group border-none rounded-[32px] sm:rounded-[40px] md:rounded-[48px] bg-white shadow-sm hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 hover:-translate-y-4 hover:rotate-1"
            >
              <CardContent className="p-8 sm:p-10 md:p-16 flex flex-col items-center text-center">
                {/* Icon Wrapper with Glow */}
                <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-[20px] sm:rounded-[24px] md:rounded-[28px] bg-[#F5F7FA] flex items-center justify-center mb-6 sm:mb-8 md:mb-10 group-hover:bg-[#FF7F32] transition-colors duration-500 relative">
                  <div className="relative z-10 group-hover:text-white transition-colors">
                    {feature.icon}
                  </div>
                  {/* Subtle pulsing ring on hover */}
                  <div className="absolute inset-0 rounded-[28px] bg-[#FF7F32] opacity-0 group-hover:animate-ping group-hover:opacity-20 transition-all" />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#1a2b49] mb-3 md:mb-4 tracking-tight">
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