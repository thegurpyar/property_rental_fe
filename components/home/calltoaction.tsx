"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Phone, Home } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";


export default function CallToAction() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="py-16 sm:py-24 md:py-32 px-4 sm:px-8 md:px-16 bg-white overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 sm:gap-14 md:gap-12 max-w-7xl mx-auto">

        {/* ── Left Card (Slides in from Left) ── */}
        <div className="animate-slide-left">
          <Card className="group relative bg-[#0a1629] border-none rounded-[32px] sm:rounded-[40px] overflow-visible shadow-2xl transition-all duration-500 hover:scale-[1.02]">
            <CardContent className="p-6 sm:p-8 md:p-10 pb-20 sm:pb-24 flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-8 text-center sm:text-left">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl sm:rounded-3xl overflow-hidden flex-shrink-0 border-2 border-white/10 group-hover:border-[#FF7F32]/50 transition-colors">
                <Image
                  src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200"
                  alt="Support"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="flex-1 pt-0 sm:pt-2">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-2 sm:mb-4 tracking-tighter">You need a house</h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-medium">
                  Tell us your needs, we will give you thousands of suggestions for the dream home.
                </p>
              </div>

              {/* Floating Button */}
              <Button className="absolute -bottom-6 sm:-bottom-7 left-1/2 -translate-x-1/2 bg-[#FF7F32] hover:bg-orange-600 text-white h-auto px-6 sm:px-10 py-3.5 sm:py-5 rounded-xl sm:rounded-2xl font-black text-sm sm:text-base flex items-center gap-2 sm:gap-3 shadow-[0_20px_40px_-10px_rgba(255,127,50,0.5)] border-none transition-all active:scale-95 animate-cta-float">
                <Phone size={18} className="sm:w-5 sm:h-5" fill="currentColor" /> Contact Seller
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* ── Right Card (Slides in from Right) ── */}
        <div className="animate-slide-right delay-100">
          <Card className="group relative bg-[#0a1629] border-none rounded-[32px] sm:rounded-[40px] overflow-visible shadow-2xl transition-all duration-500 hover:scale-[1.02]">
            <CardContent className="p-6 sm:p-8 md:p-10 pb-20 sm:pb-24 flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-8 text-center sm:text-left">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl sm:rounded-3xl overflow-hidden flex-shrink-0 border-2 border-white/10 group-hover:border-[#FF7F32]/50 transition-colors">
                <Image
                  src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=200"
                  alt="House"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="flex-1 pt-0 sm:pt-2">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-2 sm:mb-4 tracking-tighter">Sell your house</h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-medium">
                  We will connect you to thousands of people who need to buy a home.
                </p>
              </div>

              {/* Floating Button */}
              <Button className="absolute -bottom-6 sm:-bottom-7 left-1/2 -translate-x-1/2 bg-[#FF7F32] hover:bg-orange-600 text-white h-auto px-6 sm:px-10 py-3.5 sm:py-5 rounded-xl sm:rounded-2xl font-black text-sm sm:text-base flex items-center gap-2 sm:gap-3 shadow-[0_20px_40px_-10px_rgba(255,127,50,0.5)] border-none transition-all active:scale-95 animate-cta-float">
                <Home size={18} className="sm:w-5 sm:h-5" fill="currentColor" /> Sell Property
              </Button>
            </CardContent>
          </Card>
        </div>

      </div>
    </section>
  );
}