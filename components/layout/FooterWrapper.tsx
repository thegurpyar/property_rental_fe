"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function FooterWrapper() {
  const pathname = usePathname();

  // ── 🛡️ Hide Footer for Admin Panel and Main Login ──
  // This covers /login, /admin, and /admin/login
  const isExcluded = pathname.startsWith("/admin") || pathname === "/login" || pathname === '/profile';

  if (isExcluded) return null;

  return <Footer />;
}