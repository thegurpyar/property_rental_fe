// app/admin/layout.tsx
"use client";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  return (
    <div className="min-h-screen flex bg-[#fffbf9] relative">
      {!isLoginPage && <Sidebar />}
      
      <main className={`flex-1 relative transition-all duration-500 ${!isLoginPage ? 'md:ml-72' : 'ml-0'}`}>
        <div className={`relative z-10 mx-auto min-h-screen ${isLoginPage ? 'w-full' : 'p-4 pt-16 md:pt-8 md:p-8 lg:p-12 max-w-[1400px]'}`}>
          {children}
        </div>
      </main>
    </div>
  );
}