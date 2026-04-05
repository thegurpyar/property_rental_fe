import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import FooterWrapper from "@/components/layout/FooterWrapper"; // Import the wrapper

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PropertyPro – Find Your Dream House",
  description: "Premium listings, expert guidance, and seamless property transactions.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        {/* The wrapper handles the logic automatically */}
        <FooterWrapper /> 
      </body>
    </html>
  );
}