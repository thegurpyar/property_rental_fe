import { Play, ArrowUpRight } from "lucide-react";
import { Button } from "../ui/button";

export default function HeroSection() {
  return (
    <section className="px-3 sm:px-6 pb-6 sm:pb-10 pt-20 sm:pt-24 md:pt-28 overflow-hidden">
      <div className="relative h-[500px] sm:h-[600px] md:h-[720px] w-full rounded-[28px] sm:rounded-[40px] md:rounded-[60px] overflow-hidden group">

        {/* 🎥 Animated Background Image (Independent of content) */}
        <div
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070')] bg-cover bg-center animate-slow-zoom"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50 sm:bg-black/40 transition-opacity duration-700 group-hover:bg-black/55 sm:group-hover:bg-black/50" />

        <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-12 md:px-24 text-white">

          {/* 1. Staggered Title */}
          <h1 className="text-[32px] sm:text-[50px] md:text-[80px] lg:text-[100px] font-black leading-[1.1] sm:leading-[0.9] mb-4 sm:mb-6 md:mb-8 max-w-3xl tracking-tighter opacity-0 animate-fade-in-up delay-100">
            Let's Find Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-orange-400">Dream House</span>
          </h1>

          {/* 2. Staggered Paragraph */}
          <p className="max-w-[520px] text-gray-200 text-xs sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8 md:mb-10 font-medium opacity-0 animate-fade-in-up delay-200">
            PropertyPro is your trusted partner in home, offering premium listings, expert guidance, and seamless property transactions.
          </p>

          {/* 3. Staggered Buttons */}
          <div className="flex flex-wrap gap-4 sm:gap-6 items-center mb-8 sm:mb-14 md:mb-16 opacity-0 animate-fade-in-up delay-300">
            <Button
              className="bg-[#FF7F32] hover:bg-orange-600 text-white h-auto px-5 py-3 sm:px-10 sm:py-6 rounded-full font-black text-sm sm:text-lg shadow-2xl shadow-orange-500/20 border-none gap-2 sm:gap-3 group/btn transition-all hover:scale-105"
            >
              Explore Properties
              <span className="bg-white/20 rounded-full p-1 sm:p-1.5 group-hover/btn:rotate-45 transition-transform duration-300">
                <ArrowUpRight size={18} className="sm:w-5 sm:h-5" />
              </span>
            </Button>

            <Button
              variant="ghost"
              className="text-white hover:bg-white/10 h-auto p-0 rounded-full font-bold text-sm sm:text-lg gap-3 sm:gap-4 group/play"
            >
              <span className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover/play:bg-white group-hover/play:text-black transition-all duration-500 border border-white/20">
                <Play size={14} className="sm:w-5 sm:h-5" fill="currentColor" />
              </span>
              Our process
            </Button>
          </div>

          {/* 4. Staggered Stats Bar */}
          <div className="pt-6 sm:pt-8 md:pt-10 border-t border-white/10 flex flex-wrap gap-6 sm:gap-14 md:gap-24 w-fit opacity-0 animate-fade-in-up delay-500">
            {[
              { val: "50K+", label: "Happy Clients" },
              { val: "200+", label: "Properties" },
              { val: "4.5", label: "Rating" }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col group/stat cursor-default">
                <span className="text-2xl sm:text-4xl md:text-5xl font-black transition-transform group-hover/stat:-translate-y-1 duration-300">
                  {stat.val}
                </span>
                <span className="text-[8px] sm:text-[11px] md:text-[12px] font-bold text-orange-400 mt-1 sm:mt-2 uppercase tracking-[0.1em] sm:tracking-[0.2em]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}