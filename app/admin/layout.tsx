// app/admin/layout.tsx
"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex bg-[#fffbf9] relative">
      {!isLoginPage && (
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      )}

      <main
        className={`flex-1 transition-all duration-500 ${!isLoginPage
            ? (isCollapsed ? 'md:ml-24' : 'md:ml-72')
            : 'ml-0'
          }`}
      >
        <div className={`relative z-10 mx-auto min-h-screen ${isLoginPage ? 'w-full' : 'p-4 sm:p-6 pt-20 sm:pt-10 md:pt-8 md:p-8 lg:p-12 max-w-[1600px]'}`}>
          {children}
        </div>
      </main>
    </div>
  );
}