"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";
import { Home, UserCircle2, ChevronDown, User, Phone, Loader2, Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import apiClient from "@/lib/apClient";

export default function Navbar() {
  const pathname = usePathname();
  const [userData, setUserData] = useState<{ name: string; phone: string } | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const token = Cookies.get("accessToken");
    setIsLoggedIn(!!token);

    if (token) {
      const fetchUser = async () => {
        try {
          const res = await apiClient.get("/auth/me");
          if (res.data.success) {
            const user = res.data.data;
            setUserData({
              name: user.full_name,
              phone: user.number,
            });
          }
        } catch (error) {
          console.error("Navbar: Failed to fetch user:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchUser();
    } else {
      setLoading(false);
    }
    // Close menu on route change
    setIsMenuOpen(false);
  }, [pathname]); // Refresh on route change

  const isExcluded = pathname.startsWith("/admin") || pathname === "/login";
  if (isExcluded) return null;

  // 🧭 Navigation Items Array
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Property", href: "/property" },
    { name: "Approvals", href: "/admin/approvals" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="fixed w-full bg-white backdrop-blur-md top-0 z-[100] transition-all duration-300">
      <div className="flex items-center justify-between px-4 sm:px-8 md:px-16 py-2 transition-all duration-300">
        
        {/* 🚀 Brand Logo Section (Animated) */}
        <Link href="/" className="flex items-center group">
          <div className="flex items-center gap-3">
            <div className="animate-float hover:[animation-play-state:paused] w-auto h-14 sm:h-20 bg-white rounded-2xl flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:scale-105">
              <img src="/logo.jpeg" alt="logo" className="w-full h-full object-contain p-1" />
            </div>
          </div>
        </Link>

        {/* 🧭 Nav Links with Active Indicator (Desktop) */}
        <div className="hidden lg:flex items-center gap-10 text-[14px] font-bold text-[#1a2b49]/80">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`transition-colors relative group/link ${isActive ? "text-[#FF7F32]" : "hover:text-[#FF7F32]"}`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#FF7F32] transition-all duration-300 group-hover/link:w-full ${isActive ? "w-full" : "w-0"}`} />
              </Link>
            );
          })}
        </div>

        {/* 🔥 Action Group */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* 👤 Profile Pill (Dynamic) */}
          {isLoggedIn ? (
            <Link href="/profile" className="hidden sm:block">
              <div className="flex items-center gap-3   p-1.5 pl-4 rounded-[22px] cursor-pointer hover:bg-orange-100/50 transition-all group shadow-sm">
                <div className="flex flex-col items-end pr-1">
                  <span className="text-[13px] font-black text-[#1a2b49] leading-none">
                    {userData?.name || (loading ? "Loading..." : "User")}
                  </span>
                  <span className="text-[9px] font-bold text-slate-400 mt-1 flex items-center gap-1">
                    {userData?.phone || (loading ? "..." : "")}
                  </span>
                </div>
                
                <div className="relative">
                  <div className="w-10 h-10 bg-[#FF7F32] rounded-[16px] flex items-center justify-center text-white shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
                    <User size={20} strokeWidth={2.5} />
                  </div>
                </div>
                <ChevronDown size={14} className="text-[#FF7F32] mr-1 group-hover:translate-y-0.5 transition-transform" />
              </div>
            </Link>
          ) : (
            /* 🔐 Login Button (Only shown when logged out) */
            <Link href="/login" className="hidden sm:block">
              <Button variant="ghost" className="text-[#1a2b49] hover:text-[#FF7F32] hover:bg-orange-50 rounded-full px-5 py-2 text-sm font-black uppercase tracking-widest transition-all flex items-center gap-2">
                <UserCircle2 size={18} strokeWidth={2.5} />
                Login
              </Button>
            </Link>
          )}

          {/* 🏠 Primary Action Button */}
          <Button className="bg-[#FF7F32] hover:bg-[#e66a1f] text-white h-auto px-4 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3.5 rounded-full text-xs sm:text-sm font-black flex items-center gap-2 border-none transition-all shadow-lg shadow-orange-500/20 active:scale-95 group">
            <span className="bg-white/20 p-1 sm:p-1.5 rounded-full group-hover:rotate-12 transition-transform duration-300">
              <Home size={14} fill="currentColor" />
            </span>
            <span className="hidden md:inline">List Property</span>
          </Button>

          {/* 🍔 Hamburger Menu Button (Mobile Only) */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-[#1a2b49] hover:bg-orange-50 rounded-xl transition-all"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* 📱 Mobile Menu Dropdown */}
      <div className={`lg:hidden transition-all duration-500 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-[500px] border-t border-gray-100 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-6 py-8 flex flex-col gap-6 bg-white shadow-2xl">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMenuOpen(false)}
                className={`text-lg font-black tracking-tight ${isActive ? "text-[#FF7F32]" : "text-[#1a2b49]"}`}
              >
                {link.name}
              </Link>
            );
          })}
          
          <div className="pt-6 border-t border-gray-50 flex flex-col gap-4">
            {!isLoggedIn ? (
              <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full justify-start bg-orange-50 text-[#FF7F32] hover:bg-orange-100 rounded-2xl py-6 font-black text-sm uppercase tracking-widest gap-3">
                  <UserCircle2 size={20} /> Login / Sign Up
                </Button>
              </Link>
            ) : (
              <Link href="/profile" onClick={() => setIsMenuOpen(false)}>
                <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-2xl">
                  <div className="w-12 h-12 bg-[#FF7F32] rounded-xl flex items-center justify-center text-white">
                    <User size={24} />
                  </div>
                  <div>
                    <div className="font-black text-[#1a2b49]">{userData?.name || "User"}</div>
                    <div className="text-[10px] font-bold text-slate-400">{userData?.phone || ""}</div>
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
