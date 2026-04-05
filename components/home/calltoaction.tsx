"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Phone, Home } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";


export default function CallToAction() {
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 px-6 md:px-16 bg-white overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-7xl mx-auto">

        {/* ── Left Card (Slides in from Left) ── */}
        <div className={`reveal-on-scroll ${isVisible ? 'animate-slide-left' : ''}`}>
          <Card className="group relative bg-[#0a1629] border-none rounded-[40px] overflow-visible shadow-2xl transition-all duration-500 hover:scale-[1.02]">
            <CardContent className="p-10 pb-20 flex items-start gap-8">
              <div className="relative w-24 h-24 rounded-3xl overflow-hidden flex-shrink-0 border-2 border-white/10 group-hover:border-[#FF7F32]/50 transition-colors">
                <Image
                  src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200"
                  alt="Support"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="flex-1 pt-2">
                <h3 className="text-3xl font-extrabold text-white mb-4 tracking-tight">You need a house</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-medium">
                  Tell us your needs, we will give you thousands of suggestions for the dream home.
                </p>
              </div>

              {/* Floating Button */}
              <Button className={`absolute -bottom-7 left-1/2 bg-[#FF7F32] hover:bg-orange-600 text-white h-auto px-10 py-5 rounded-2xl font-black text-base flex items-center gap-3 shadow-[0_20px_40px_-10px_rgba(255,127,50,0.5)] border-none transition-all active:scale-95 ${isVisible ? 'animate-cta-float' : '-translate-x-1/2'}`}>
                <Phone size={20} fill="currentColor" /> Contact Seller
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* ── Right Card (Slides in from Right) ── */}
        <div className={`reveal-on-scroll ${isVisible ? 'animate-slide-right delay-200' : ''}`}>
          <Card className="group relative bg-[#0a1629] border-none rounded-[40px] overflow-visible shadow-2xl transition-all duration-500 hover:scale-[1.02]">
            <CardContent className="p-10 pb-20 flex items-start gap-8">
              <div className="relative w-24 h-24 rounded-3xl overflow-hidden flex-shrink-0 border-2 border-white/10 group-hover:border-[#FF7F32]/50 transition-colors">
                <Image
                  src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=200"
                  alt="House"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="flex-1 pt-2">
                <h3 className="text-3xl font-extrabold text-white mb-4 tracking-tight">Sell your house</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-medium">
                  We will connect you to thousands of people who need to buy a home.
                </p>
              </div>

              {/* Floating Button */}
              <Button className={`absolute -bottom-7 left-1/2 bg-[#FF7F32] hover:bg-orange-600 text-white h-auto px-10 py-5 rounded-2xl font-black text-base flex items-center gap-3 shadow-[0_20px_40px_-10px_rgba(255,127,50,0.5)] border-none transition-all active:scale-95 ${isVisible ? 'animate-cta-float' : '-translate-x-1/2'}`}>
                <Home size={20} fill="currentColor" /> Sell Property
              </Button>
            </CardContent>
          </Card>
        </div>

      </div>
    </section>
  );
}