"use client";

import { useState } from "react";
import AddPropertyForm from "@/components/property/addpropertyform";
import BenefitsSection from "@/components/property/benefitssection";
import HowItWorks from "@/components/property/howitworks";
import FAQSection from "@/components/property/faqsection";

export default function PropertyPage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <main 
      onMouseMove={handleMouseMove}
      className="bg-white min-h-screen relative overflow-hidden text-[#1a2b49]"
    >
      {/* 🎯 ULTRA-SUBTLE AMBIENT GLOWS (Tinted for white theme) */}
      <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-blue-50/50 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[10%] right-[-5%] w-[600px] h-[600px] bg-orange-50/50 rounded-full blur-[120px] pointer-events-none" />

      {/* 1. HERO & FORM SECTION */}
      <section className="relative z-10 pt-24 pb-32 px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h4 className="text-[#FF7F32] font-bold text-xs uppercase tracking-[0.5em] mb-5">Partner with us</h4>
            <h1 className="text-[56px] md:text-[80px] font-extrabold tracking-tighter leading-[1.05] mb-8 text-[#1a2b49]">
              List Faster. <br />
              <span className="text-[#FF7F32]">Sell Higher.</span>
            </h1>
            <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
              Join 5,000+ owners using our elite property management engine to reach global buyers.
            </p>
          </div>
          
          <AddPropertyForm />
        </div>
      </section>



        <div className="relative z-40">
          <BenefitsSection />
          <HowItWorks />
          <FAQSection />
        </div>
    
    </main>
  );
}