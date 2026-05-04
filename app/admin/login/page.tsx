"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { ShieldCheck, Lock, Loader2, Mail } from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import apiClient from "../../../lib/apClient";

export default function AdminLoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const router = useRouter();

  //   const handleAdminLogin = async () => {
  //     if (!credentials.email || !credentials.password) return alert("Enter credentials");
  //     setIsLoading(true);
  //     try {
  //       const response = await apiClient.post("/admin/login", credentials);
  //       if (response.data.success) {
  //         Cookies.set("adminToken", response.data.data.token, { expires: 1 });
  //         router.push("/admin");
  //       }
  //     } catch (error: any) {
  //       alert(error.response?.data?.message || "Invalid Admin Credentials");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  const handleAdminLogin = async () => {
    if (!credentials.email || !credentials.password) {
      return alert("Enter credentials");
    }

    setIsLoading(true);

    try {
      const response = await apiClient.post("/auth/login", credentials);

      if (response.data.success) {
        const { accessToken, refreshToken } = response.data.data.tokens;

        // ✅ Store tokens
        Cookies.set("accessToken", accessToken, { expires: 1 });
        Cookies.set("refreshToken", refreshToken, { expires: 30 });


        router.push("/admin");
      }
    } catch (error: any) {
      alert(error.response?.data?.message || "Invalid Admin Credentials");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    // 🎯 Fixed: Removed extra p-4 to ensure perfect centering
    <div className="h-screen w-full bg-[#fffbf9] flex items-center justify-center relative overflow-hidden">

      {/* Background Mesh (Absolute positioning ensures they don't affect flow) */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-100/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white rounded-full blur-[100px] pointer-events-none border border-orange-50" />

      <Card className="w-full max-w-[450px] rounded-[48px] border-orange-100 shadow-[0_32px_64px_-16px_rgba(255,127,50,0.15)] bg-white/80 backdrop-blur-xl overflow-hidden relative z-10 m-4">
        <CardContent className="p-8 md:p-12 text-center">

          {/* 🚀 Logo Fix: Standardized height to h-24 for clean proportions */}
          <div className="mb-6 inline-flex items-center justify-center p-4 bg-white rounded-[32px] ">
            <img src="/logo.jpeg" alt="logo" className="h-24 w-auto object-contain" />
          </div>

          <div className="mb-10">
            <h1 className="text-3xl font-black text-[#1a2b49] tracking-tighter uppercase">
              Admin <span className="text-[#FF7F32]">Portal</span>
            </h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-2">
              Management System Entrance
            </p>
          </div>

          <div className="space-y-5 text-left">
            <div className="space-y-2 group">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Admin Email</Label>
              <div className="relative">
                <Input
                  type="email"
                  className="bg-orange-50/20 border-orange-100 rounded-2xl py-7 pl-14 focus:ring-4 focus:ring-orange-500/5 focus:border-[#FF7F32] transition-all outline-none"
                  value={credentials.email}
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                />
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-orange-300" size={18} />
              </div>
            </div>

            <div className="space-y-2 group">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Security Key</Label>
              <div className="relative">
                <Input
                  type="password"
                  className="bg-orange-50/20 border-orange-100 rounded-2xl py-7 pl-14 focus:ring-4 focus:ring-orange-500/5 focus:border-[#FF7F32] transition-all outline-none"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                />
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-orange-300" size={18} />
              </div>
            </div>

            <Button
              onClick={handleAdminLogin}
              disabled={isLoading}
              className="w-full bg-[#FF7F32] hover:bg-[#e66a1f] text-white h-auto py-6 rounded-full font-black text-lg shadow-xl shadow-orange-500/20 flex items-center justify-center gap-2 mt-4 transition-all active:scale-95"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : "Unlock Dashboard"}
              {!isLoading && <ShieldCheck size={20} />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}