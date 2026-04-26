"use client";
import { Play, ArrowUpRight, RotateCcw } from "lucide-react";
import { Button } from "../ui/button";
import { useState, useRef, useEffect } from "react";

export default function HeroSection() {
  const [stage, setStage] = useState<'idle' | 'transitioning' | 'playing'>('idle');
  const videoRef = useRef<HTMLVideoElement>(null);

  const startProcess = () => {
    setStage('transitioning');
    setTimeout(() => {
      setStage('playing');
    }, 50); // High-speed 3D initiation
  };

  const resetProcess = () => {
    setStage('idle');
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  useEffect(() => {
    if (stage === 'playing' && videoRef.current) {
      videoRef.current.play().catch(err => console.error("Video play failed:", err));
    }
  }, [stage]);

  return (
    <section className="px-3 sm:px-6 pb-6 sm:pb-10 pt-20 sm:pt-24 md:pt-28 overflow-hidden perspective-[2500px] bg-white">
      <div 
        className="relative h-[500px] sm:h-[600px] md:h-[720px] w-full transform-style-3d transition-all duration-[1200ms] ease-in-out"
      >
        
        {/* 🧱 LAYER 1: THE TILTED BASE HERO (Backplane) */}
        <div className={`absolute inset-0 rounded-[40px] sm:rounded-[60px] overflow-hidden transition-all duration-[1200ms] border border-slate-100 shadow-xl
          ${stage !== 'idle' ? 'rotate-y-[-25deg] rotate-x-[15deg] scale-[0.85] -translate-x-32 -translate-z-64 blur-2xl opacity-20 pointer-events-none' : 'rotate-0 scale-100 translate-x-0 translate-z-0 blur-0 opacity-100 shadow-[0_40px_100px_rgba(0,0,0,0.05)] bg-white'}`}>
           
           {/* Background Media */}
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070')] bg-cover bg-center opacity-90" />
           <div className="absolute inset-0 bg-black/30" />

           {/* Content */}
           <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-12 md:px-24 text-white">
              <h1 className="text-[32px] sm:text-[50px] md:text-[80px] lg:text-[100px] font-black leading-[1.1] sm:leading-[0.9] mb-4 sm:mb-6 md:mb-8 max-w-3xl tracking-tighter opacity-0 animate-fade-in-up delay-100">
                Let's Find Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-orange-400">Dream House</span>
              </h1>
              
              <p className="max-w-[520px] text-gray-100 text-xs sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8 md:mb-10 font-medium opacity-0 animate-fade-in-up delay-200">
                PropertyPro is your trusted partner in home, offering premium listings, expert guidance, and seamless property transactions.
              </p>

              <div className="flex flex-wrap gap-4 sm:gap-6 items-center mb-8 sm:mb-14 md:mb-16 opacity-0 animate-fade-in-up delay-300">
                <Button className="bg-[#FF7F32] hover:bg-orange-600 text-white h-auto px-5 py-3 sm:px-10 sm:py-6 rounded-full font-black text-sm sm:text-lg shadow-2xl border-none gap-3 group/btn transition-all hover:scale-105">
                  Explore Properties
                  <span className="bg-white/20 rounded-full p-1.5 group-hover/btn:rotate-45 transition-transform duration-300">
                    <ArrowUpRight size={20} />
                  </span>
                </Button>

                <button
                  onClick={startProcess}
                  className="flex items-center gap-3 sm:gap-4 hover:text-[#FF7F32] transition-all font-bold text-sm sm:text-lg group/play relative"
                >
                  <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center border transition-all duration-700 ease-in-out
                    ${stage !== 'idle' 
                      ? 'scale-[5] opacity-0 bg-orange-500 border-orange-500' 
                      : 'bg-white/20 backdrop-blur-md border-white/30 group-hover/play:bg-[#FF7F32] group-hover/play:border-[#FF7F32] shadow-xl'}`}>
                    <Play 
                      size={14} 
                      className={`sm:w-5 sm:h-5 text-white transition-all duration-500 
                        ${stage !== 'idle' ? 'scale-0 rotate-90' : 'scale-100 rotate-0'}`} 
                      fill="currentColor" 
                    />
                  </div>
                  <span className={`transition-all duration-700 ease-in-out group-hover/play:text-[#FF7F32]
                    ${stage !== 'idle' ? 'translate-x-12 opacity-0 blur-md' : 'translate-x-0 opacity-100 blur-0'}`}>
                    Our process
                  </span>
                </button>
              </div>

              {/* Stats Bar */}
              <div className="pt-6 sm:pt-8 md:pt-10 border-t border-white/20 flex flex-wrap gap-6 sm:gap-14 md:gap-24 w-fit opacity-0 animate-fade-in-up delay-500">
                {[
                  { val: "50K+", label: "Happy Clients" },
                  { val: "200+", label: "Properties" },
                  { val: "4.5", label: "Rating" }
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col group/stat cursor-default">
                    <span className="text-2xl sm:text-4xl md:text-5xl font-black">{stat.val}</span>
                    <span className="text-[8px] sm:text-[11px] md:text-[12px] font-bold text-orange-400 mt-1 sm:mt-2 uppercase tracking-[0.2em]">{stat.label}</span>
                  </div>
                ))}
              </div>
           </div>
        </div>

        {/* 🛸 LAYER 2: THE ORBITING VIDEO CONSOLE (Foreground) */}
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-[1200ms] cubic-bezier(0.19,1,0.22,1)
          ${stage === 'playing' ? 'rotate-y-[-5deg] rotate-x-[5deg] translate-z-[180px] opacity-100' : 'rotate-y-[45deg] translate-x-[150%] translate-z-[500px] opacity-0 pointer-events-none'}`}>
          
          <div className="relative w-[95%] h-[90%] bg-black/90 backdrop-blur-2xl rounded-[48px] border border-white/20 shadow-[0_40px_120px_rgba(0,0,0,0.6)] overflow-hidden ring-1 ring-white/10 group/console">
            
            <button 
              onClick={resetProcess}
              className="absolute top-8 right-8 z-[60] w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-orange-500 hover:scale-110 transition-all border border-white/20 backdrop-blur-xl"
            >
              <RotateCcw size={20} />
            </button>

            <div className="w-full h-full p-4">
              <div className="w-full h-full rounded-[38px] overflow-hidden bg-black shadow-2xl relative">
                <video 
                  ref={videoRef}
                  muted 
                  loop
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover"
                >
                  <source src="https://res.cloudinary.com/dbwhhrlja/video/upload/14200446_3840_2160_60fps_1_ftyw2x.mp4" type="video/mp4" />
                </video>
                <div className="absolute top-8 left-8 flex items-center gap-3 px-4 py-2 bg-black/60 backdrop-blur-xl rounded-full border border-white/10 shadow-2xl">
                   <div className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
                   <span className="text-[10px] font-black text-white/80 tracking-[0.3em] uppercase">Cinematic Process // Experience View</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}