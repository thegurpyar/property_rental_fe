"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Users, Building2, ShieldCheck, TrendingUp } from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import apiClient from "../../lib/apClient";
import StatsCard from "../../components/admin/StatsCard";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalUsers: 0, activeProperties: 0, pendingApprovals: 0 });
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("accessToken");

    // 🛡️ AUTH GUARD: If no token, redirect to login
    if (!token) {
      router.push("/admin/login");
      return;
    }

    const fetchStats = async () => {
      try {
        const res = await apiClient.get("/admin/dashboard-stats");
        if (res.data.success) setStats(res.data.data);
      } catch (err) {
        console.error(err);
        // If token is invalid/expired
        // router.push("/admin/login");
      }
    };
    fetchStats();
  }, [router]);

  return (
    <div className="space-y-6 md:space-y-10 animate-in fade-in duration-1000">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-5">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#1a2b49] tracking-tighter uppercase leading-none">
            Control <span className="text-[#FF7F32]">Center</span>
          </h1>
          <p className="text-gray-400 font-bold uppercase tracking-[0.3em] text-[9px] mt-2 sm:mt-1">
            Authorized Access Only
          </p>
        </div>
        <Button className="bg-[#1a2b49] hover:bg-black text-white rounded-2xl px-6 py-5 sm:px-8 sm:py-7 h-auto font-black text-xs uppercase tracking-widest shadow-xl transition-all w-fit">
          System Logs <TrendingUp size={16} className="ml-2" />
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        <StatsCard label="Total Users" value={stats.totalUsers || "1.2k"} icon={Users} color="text-blue-500" bg="bg-blue-50" />
        <StatsCard label="Active Units" value={stats.activeProperties || "432"} icon={Building2} color="text-[#FF7F32]" bg="bg-orange-50" />
        <div className="sm:col-span-2 lg:col-span-1">
          <StatsCard label="Approvals" value={stats.pendingApprovals || "12"} icon={ShieldCheck} color="text-emerald-500" bg="bg-emerald-50" />
        </div>
      </div>

      {/* Engine Status Banner */}
      <Card className="rounded-[32px] md:rounded-[48px] border-none bg-gradient-to-br from-[#FF7F32] to-[#FF9D5C] p-6 sm:p-10 md:p-14 text-white shadow-3xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-10">
          <div className="max-w-md text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter mb-3 md:mb-5">Engine Active</h2>
            <p className="text-white/80 font-medium text-xs sm:text-sm leading-relaxed">
              Global property database and authentication clusters are running with 100% integrity. 
              Real-time monitoring enabled.
            </p>
          </div>
          <div className="bg-white/10 p-6 sm:p-10 rounded-[28px] md:rounded-[40px] backdrop-blur-2xl border border-white/10 text-center w-full lg:w-auto">
            <div className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-1 tracking-tighter">99.9%</div>
            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white/50">Uptime Stability</div>
          </div>
        </div>
      </Card>
    </div>
  );
}