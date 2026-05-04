"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { LayoutDashboard, Users, Building2, ShieldCheck, LogOut, Home, Menu, X } from "lucide-react";
import { useState } from "react";

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

export default function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Properties", href: "/admin/properties", icon: Building2 },
    { name: "Approvals", href: "/admin/approvals", icon: ShieldCheck },
  ];

  // ── 🚪 Logout Logic ──
  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    router.push("/admin/login");
  };

  const SidebarContent = ({ isMobile = false }: { isMobile?: boolean }) => {
    const isActuallyCollapsed = !isMobile && isCollapsed;

    return (
      <aside className={`${isActuallyCollapsed ? 'w-24' : 'w-72'} bg-white h-screen flex flex-col p-6 transition-all duration-500 relative border-r border-orange-50`}>
        {/* ── Mobile close button ── */}
        <button
          onClick={() => setMobileOpen(false)}
          className="md:hidden self-end mb-2 p-2 rounded-xl text-slate-400 hover:bg-orange-50 hover:text-[#FF7F32] transition-all"
          aria-label="Close menu"
        >
          <X size={22} />
        </button>

        {/* 🚀 Collapse Toggle (Desktop) */}
        {!isMobile && (
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute -right-3 top-12 w-7 h-7 bg-[#FF7F32] text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all z-[100] border-2 border-white"
          >
            <Menu size={14} className={`transition-transform duration-500 ${isActuallyCollapsed ? 'rotate-180' : ''}`} />
          </button>
        )}

        {/* 🚀 Logo */}
        <div className={`mb-8 md:mb-12 transition-all duration-500 ${isActuallyCollapsed ? 'px-0' : 'px-1'}`}>
          <div className={`w-full bg-white rounded-[24px] flex items-center justify-center group transition-all duration-500 overflow-hidden ${isActuallyCollapsed ? 'p-2 h-12' : 'p-4 h-28'}`}>
            <img
              src="/logo.jpeg"
              alt="PropertyPro Admin"
              className={`object-contain transition-all duration-500 ${isActuallyCollapsed ? 'w-8 h-8' : 'w-full h-full group-hover:scale-105'}`}
            />
          </div>
        </div>

        {/* 🧭 Navigation */}
        <nav className="flex-1 space-y-2 overflow-hidden">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                title={isActuallyCollapsed ? item.name : ""}
                className={`flex items-center gap-4 px-5 py-4 rounded-[20px] font-bold text-sm transition-all duration-300 group ${isActive
                  ? "bg-[#FF7F32] text-white shadow-lg shadow-orange-500/30"
                  : "text-slate-500 hover:bg-orange-50 hover:text-[#FF7F32]"
                  } ${isActuallyCollapsed ? 'justify-center px-0' : ''}`}
              >
                <item.icon
                  size={20}
                  className={`transition-all duration-300 flex-shrink-0 ${isActive ? "scale-110" : "group-hover:scale-110 group-hover:rotate-3"
                    }`}
                />
                {!isActuallyCollapsed && <span className="animate-in fade-in slide-in-from-left-2 duration-300 whitespace-nowrap">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* 🚪 Bottom Section */}
        <div className={`pt-6 border-t border-orange-50 space-y-1 ${isActuallyCollapsed ? 'flex flex-col items-center' : ''}`}>
          <Link
            href="/"
            title={isActuallyCollapsed ? "Back to Site" : ""}
            className={`flex items-center gap-4 px-5 py-4 text-slate-400 hover:text-[#FF7F32] transition-all text-sm font-bold group ${isActuallyCollapsed ? 'justify-center px-0' : ''}`}
          >
            <Home size={18} className="group-hover:-translate-y-0.5 transition-transform flex-shrink-0" />
            {!isActuallyCollapsed && <span className="animate-in fade-in slide-in-from-left-2 duration-300 whitespace-nowrap">Back to Site</span>}
          </Link>
          <button
            onClick={handleLogout}
            title={isActuallyCollapsed ? "Logout" : ""}
            className={`w-full flex items-center gap-4 px-5 py-4 text-rose-500/70 hover:bg-rose-50 rounded-[20px] transition-all text-sm font-bold group ${isActuallyCollapsed ? 'justify-center px-0' : ''}`}
          >
            <LogOut size={18} className="group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
            {!isActuallyCollapsed && <span className="animate-in fade-in slide-in-from-left-2 duration-300 whitespace-nowrap">Logout</span>}
          </button>
        </div>
      </aside>
    );
  };

  return (
    <>
      {/* ── Desktop sidebar (fixed) ── */}
      <div className={`hidden md:block fixed left-0 top-0 h-screen z-50 transition-all duration-500 ${isCollapsed ? 'w-24' : 'w-72'}`}>
        <SidebarContent />
      </div>

      {/* ── Mobile: Hamburger trigger ── */}
      {!mobileOpen && (
        <button
          onClick={() => setMobileOpen(true)}
          className="md:hidden fixed top-4 left-4 z-50 bg-white shadow-lg rounded-2xl p-3 text-[#1a2b49]"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
      )}

      {/* ── Mobile: Backdrop ── */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/40 z-40 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── Mobile: Slide-in drawer ── */}
      <div
        className={`md:hidden fixed top-0 left-0 h-screen z-50 transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <SidebarContent isMobile={true} />
      </div>
    </>
  );
}