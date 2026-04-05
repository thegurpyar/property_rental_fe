"use client";

import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

export default function ContactForm() {
  // ✨ PREMIUM INPUT STYLES (Soft gray background with navy focus)
  const inputBase = "bg-[#f9fafc] border-gray-100 rounded-xl px-4 py-6 text-sm text-[#0a1629] focus:bg-white focus:ring-4 focus:ring-[#0a1629]/5 focus:border-[#0a1629] transition-all outline-none placeholder:text-gray-400 shadow-sm";

  return (
    <Card className="bg-white rounded-[40px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border-none overflow-hidden">
      <CardContent className="p-8 md:p-12">
        <form className="space-y-6">
          {/* Name & Email Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2.5">
              <Label className="text-[#0a1629] font-bold text-xs uppercase tracking-widest ml-1 opacity-70">
                Full Name
              </Label>
              <Input placeholder="Ujjwal Nagpal" className={inputBase} />
            </div>
            <div className="space-y-2.5">
              <Label className="text-[#0a1629] font-bold text-xs uppercase tracking-widest ml-1 opacity-70">
                Email Address
              </Label>
              <Input type="email" placeholder="ujjwal@example.com" className={inputBase} />
            </div>
          </div>

          {/* Subject */}
          <div className="space-y-2.5">
            <Label className="text-[#0a1629] font-bold text-xs uppercase tracking-widest ml-1 opacity-70">
              Subject
            </Label>
            <Input placeholder="How can we help?" className={inputBase} />
          </div>

          {/* Message */}
          <div className="space-y-2.5">
            <Label className="text-[#0a1629] font-bold text-xs uppercase tracking-widest ml-1 opacity-70">
              Your Message
            </Label>
            <Textarea 
              placeholder="Tell us more about your property needs..." 
              className="bg-[#f9fafc] border-gray-100 rounded-2xl p-5 min-h-40 text-sm text-[#0a1629] focus:bg-white focus:ring-4 focus:ring-[#0a1629]/5 focus:border-[#0a1629] transition-all outline-none resize-none shadow-sm" 
            />
          </div>

          {/* CTA Button */}
          <Button 
            className="w-full bg-[#FF7F32] hover:bg-orange-600 text-white h-auto py-5 rounded-2xl font-bold text-lg shadow-xl shadow-orange-200 transition-all active:scale-[0.98] border-none flex gap-3 animate-fade-pulse hover:animate-none"
          >
            Send Message <Send size={18} />
          </Button>
          
          <p className="text-center text-[11px] text-gray-400 font-medium italic opacity-80">
            By clicking send, you agree to our privacy policy.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}