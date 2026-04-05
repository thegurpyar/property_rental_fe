"use client";

import { ShieldCheck, Zap, BarChart3, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BENEFITS = [
  { 
    icon: <Zap className="text-[#FF7F32] w-6 h-6" />, 
    title: "Instant Visibility", 
    desc: "Your property goes live to 50k+ active buyers immediately." 
  },
  { 
    icon: <ShieldCheck className="text-[#FF7F32] w-6 h-6" />, 
    title: "Secure Transactions", 
    desc: "We handle the paperwork and verification for your peace of mind." 
  },
  { 
    icon: <BarChart3 className="text-[#FF7F32] w-6 h-6" />, 
    title: "Smart Analytics", 
    desc: "Track how many people view and save your property in real-time." 
  },
  { 
    icon: <Users className="text-[#FF7F32] w-6 h-6" />, 
    title: "Expert Support", 
    desc: "Our dedicated agents are available 24/7 to help you close the deal." 
  },
];

export default function BenefitsSection() {
  return (
    <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {BENEFITS.map((benefit, i) => (
          <Card 
            key={i} 
            className="group border-none bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-2 rounded-[32px] overflow-hidden"
          >
            <CardHeader className="pt-8 px-8 pb-4">
              {/* Icon Container */}
              <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#FF7F32]/10 transition-colors duration-300">
                {benefit.icon}
              </div>
              <CardTitle className="text-xl font-bold text-[#1a2b49] tracking-tight">
                {benefit.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-8 pb-10">
              <p className="text-gray-500 text-sm leading-relaxed font-medium opacity-80">
                {benefit.desc}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}