"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, UserCircle2, ChevronDown, User, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const pathname = usePathname();
  
  // ── 🛡️ Auth Check: Mocking Login State ──
  const isLoggedIn = true; 

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
    <nav className="flex items-center justify-between px-8 md:px-16 py-2 bg-white backdrop-blur-md sticky top-0 z-50 transition-all duration-300">
      
      {/* 🚀 Brand Logo Section (Animated) */}
      <Link href="/" className="flex items-center group">
        <div className="flex items-center gap-3">
          {/* 🎯 ADDED: animate-float and hover:pause logic here */}
          <div className="animate-float hover:[animation-play-state:paused] w-auto h-20 bg-white rounded-2xl flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:scale-105">
            <img 
              src="/logo.jpeg" 
              alt="logo" 
              className="w-full h-full object-contain p-1"
            />
          </div>
        </div>
      </Link>

      {/* 🧭 Nav Links with Active Indicator */}
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
      <div className="flex items-center gap-4">
        
        {/* 👤 Profile Pill */}
        {isLoggedIn && (
          <Link href="/profile">
            <div className="flex items-center gap-3 bg-orange-50/50 border border-orange-100 p-1.5 pl-4 rounded-[22px] cursor-pointer hover:bg-orange-100/50 transition-all group shadow-sm">
              <div className="flex flex-col items-end pr-1">
                <span className="text-[13px] font-black text-[#1a2b49] leading-none">Ujjwal Nagpal</span>
                <span className="text-[9px] font-bold text-slate-400 mt-1 flex items-center gap-1">
                  +91 98785 43210
                </span>
              </div>
              
              <div className="relative">
                <div className="w-10 h-10 bg-[#FF7F32] rounded-[16px] flex items-center justify-center text-white shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
                  <User size={20} strokeWidth={2.5} />
                </div>
                <div className="absolute -top-1.5 -right-1.5 bg-[#1a2b49] text-white text-[8px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                  3
                </div>
              </div>
              <ChevronDown size={14} className="text-[#FF7F32] mr-1 group-hover:translate-y-0.5 transition-transform" />
            </div>
          </Link>
        )}

        {/* 🔐 Login Button */}
        <Link href="/login">
          <Button variant="ghost" className="text-[#1a2b49] hover:text-[#FF7F32] hover:bg-orange-50 rounded-full px-5 py-2 text-sm font-black uppercase tracking-widest transition-all flex items-center gap-2">
            <UserCircle2 size={18} strokeWidth={2.5} />
            Login
          </Button>
        </Link>

        {/* 🏠 Primary Action Button */}
        <Button className="bg-[#FF7F32] hover:bg-[#e66a1f] text-white h-auto px-6 py-2.5 md:px-8 md:py-3.5 rounded-full text-sm font-black flex items-center gap-2 border-none transition-all shadow-lg shadow-orange-500/20 active:scale-95 group">
          <span className="bg-white/20 p-1.5 rounded-full group-hover:rotate-12 transition-transform duration-300">
            <Home size={14} fill="currentColor" />
          </span>
          <span className="hidden sm:inline">List Property</span>
        </Button>
      </div>
    </nav>
  );
}