"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { LayoutDashboard, Users, Building2, ShieldCheck, LogOut, Home } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Properties", href: "/admin/properties", icon: Building2 },
    { name: "Approvals", href: "/admin/approvals", icon: ShieldCheck },
  ];

  // ── 🚪 Logout Logic ──
  const handleLogout = () => {
    Cookies.remove("adminToken");
    router.push("/admin/login");
  };

  return (
    <aside className="w-72 bg-white h-screen fixed left-0 top-0 p-6 flex flex-col z-50 ">
      
      {/* 🚀 Hero Logo Header (Animated) */}
      <div className="mb-12 px-1">
        {/* 🎯 Added: animate-float and hover:pause logic */}
        <div className="animate-float hover:[animation-play-state:paused] w-full bg-white rounded-[24px] p-4 flex items-center justify-center group hover:shadow-[0_12px_40px_-10px_rgba(255,127,50,0.22)] transition-all duration-500 overflow-hidden ">
          <img 
            src="/logo.jpeg" 
            alt="PropertyPro Admin" 
            className="w-full h-24 object-contain transition-transform duration-500 group-hover:scale-105" 
          />
        </div>
      </div>

      {/* 🧭 Navigation */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={`flex items-center gap-4 px-5 py-4 rounded-[20px] font-bold text-sm transition-all duration-300 group ${
                isActive 
                ? "bg-[#FF7F32] text-white shadow-lg shadow-orange-500/30" 
                : "text-slate-500 hover:bg-orange-50 hover:text-[#FF7F32]"
              }`}
            >
              <item.icon 
                size={20} 
                className={`transition-all duration-300 ${
                  isActive ? "scale-110" : "group-hover:scale-110 group-hover:rotate-3"
                }`} 
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* 🚪 Bottom Section */}
      <div className="pt-6 border-t border-orange-50 space-y-1">
        <Link href="/" className="flex items-center gap-4 px-5 py-4 text-slate-400 hover:text-[#FF7F32] transition-all text-sm font-bold group">
          <Home size={18} className="group-hover:-translate-y-0.5 transition-transform" />
          Back to Site
        </Link>
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-5 py-4 text-rose-500/70 hover:bg-rose-50 rounded-[20px] transition-all text-sm font-bold group"
        >
          <LogOut size={18} className="group-hover:translate-x-0.5 transition-transform" />
          Logout
        </button>
      </div>
    </aside>
  );
}