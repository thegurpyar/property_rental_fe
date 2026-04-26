import { Suspense } from "react";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen w-full relative overflow-hidden flex items-center justify-center py-10 md:py-20 px-4 md:px-6">
      
      {/* 🖼️ New Unsplash Background Layer (Modern Luxury Villa) */}
      <div 
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070')] bg-cover bg-center transition-transform duration-[15000ms] animate-slow-zoom" 
      />

      {/* 🌑 Deep SaaS Overlay (Dark Navy to Transparent) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1629] via-[#0a1629]/70 to-[#0a1629]/30" />
      
      {/* 🎯 Brand Accent Glows (Subtle and atmospheric) */}
      <div className="absolute top-[-10%] left-[-10%] w-[400px] md:w-[700px] h-[400px] md:h-[700px] bg-blue-500/10 rounded-full blur-[100px] md:blur-[150px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#FF7F32]/10 rounded-full blur-[80px] md:blur-[130px] pointer-events-none animate-pulse" 
           style={{ animationDelay: '2s' }} 
      />

      {/* Glassy Form Container */}
      <div className="relative z-10 w-full max-w-[520px] animate-fade-in-up">
        <Suspense fallback={<div className="h-[400px] flex items-center justify-center bg-white/10 backdrop-blur-xl rounded-[48px] border border-white/20 shadow-2xl text-white font-bold animate-pulse">Initializing Auth...</div>}>
          <LoginForm />
        </Suspense>
      </div>

    </main>
  );
}