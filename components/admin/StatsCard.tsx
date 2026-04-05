"use client";
import { LucideIcon, ArrowUpRight } from "lucide-react";
import { Card } from "../../components/ui/card";

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  bg: string;
  trend?: string;
}

export default function StatsCard({ label, value, icon: Icon, color, bg, trend = "+12%" }: StatsCardProps) {
  return (
    <Card className="p-8 rounded-[32px] border-white/40 bg-white/70 backdrop-blur-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group cursor-pointer">
      <div className="flex justify-between items-start">
        <div className={`${bg} ${color} p-4 rounded-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
          <Icon size={24} strokeWidth={2.5} />
        </div>
        <div className="flex items-center gap-1 text-green-500 font-black text-[10px] bg-green-50 px-2 py-1 rounded-lg">
          {trend} <ArrowUpRight size={12} />
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-gray-400 font-black uppercase text-[10px] tracking-[0.2em]">{label}</h3>
        <p className="text-4xl font-black text-[#1a2b49] mt-2 tabular-nums tracking-tighter">{value}</p>
      </div>
    </Card>
  );
}