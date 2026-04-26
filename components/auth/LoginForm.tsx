"use client";

import { useState, useRef, KeyboardEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { ArrowRight, ArrowLeft, ShieldCheck, CheckCircle2, LayoutDashboard, User, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent } from "../ui/card";
import apiClient from "@/lib/apClient";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [step, setStep] = useState<"phone" | "otp" | "success">("phone");
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState<string[]>(new Array(4).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // ── Helper: Save Tokens to Cookies ──
  const saveTokens = (tokens: { accessToken: string; refreshToken: string }) => {
    // Access token usually has a shorter life (e.g., 1 day)
    Cookies.set("accessToken", tokens.accessToken, { expires: 1, secure: true, sameSite: 'strict' });
    // Refresh token lives longer (e.g., 7 days)
    Cookies.set("refreshToken", tokens.refreshToken, { expires: 7, secure: true, sameSite: 'strict' });
  };
  const handleRegister = async () => {
    if (!name || !phoneNumber) return alert("Please fill all details");

    setIsLoading(true);

    try {
      const response = await apiClient.post("/auth/register", {
        full_name: name,
        number: phoneNumber,
      });

      if (response.data.success) {
        const data = response.data.data;
        const tokens = data?.tokens;

        // ✅ CASE 1: Existing user → tokens returned → LOGIN directly
        if (tokens) {
          saveTokens(tokens);
          setAccessToken(tokens.accessToken);

          setStep("success"); // 🚀 skip OTP
          return;
        }

        // ✅ CASE 2: New user → OTP sent
        setStep("otp");
      }
    } catch (error: any) {
      console.error("Registration Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Registration failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    const otpString = otp.join("");
    if (otpString.length < 4) return alert("Please enter the 4-digit code");

    setIsLoading(true);
    try {
      const response = await apiClient.post("/auth/verify-otp", {
        number: phoneNumber,
        otp: otpString,
      });

      if (response.data.success) {
        const tokens = response.data.data?.tokens;

        if (tokens) {
          saveTokens(tokens); // ✅ STORE TOKENS
          setAccessToken(tokens.accessToken);
        }

        setStep("success");
      }
    } catch (error: any) {
      console.error("Verify OTP Error:", error.response?.data);
      alert(error.response?.data?.message || "Verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  // ── UI Logic ──
  const handleChange = (value: string, index: number) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    if (value && index < 3) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) inputRefs.current[index - 1]?.focus();
  };

  const inputBase = "bg-gray-100/50 border-gray-200/50 rounded-2xl px-4 py-6 md:py-7 text-sm text-[#1a2b49] transition-all outline-none pl-14 focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:border-[#FF7F32]";
  const otpInputBase = "w-12 h-16 bg-gray-100/50 border-2 border-gray-200/50 rounded-2xl text-center text-xl font-black text-[#1a2b49] transition-all outline-none focus:bg-white focus:border-[#FF7F32]";

  return (
    <Card className="rounded-[40px] md:rounded-[48px] border border-white/40 bg-white/80 backdrop-blur-2xl shadow-[0_32px_64px_-16px_rgba(26,43,73,0.3)] overflow-hidden transition-all duration-700 relative">
      {step === "otp" && !isLoading && (
        <button onClick={() => setStep("phone")} className="absolute top-6 left-6 md:top-10 md:left-10 flex items-center gap-2 text-gray-500 hover:text-[#1a2b49] font-bold text-[10px] uppercase tracking-widest transition-colors z-20">
          <ArrowLeft size={14} /> Back
        </button>
      )}

      <CardContent className={`p-6 md:p-14 transition-all duration-500 ${step === 'success' ? 'pt-10' : 'pt-20'}`}>
        {step !== "success" && (
          <div className="text-center mb-10">
            <h1 className="text-2xl md:text-4xl font-black text-[#1a2b49] tracking-tighter mb-2">
              {step === "phone" ? "Welcome " : "Verify "}
              <span className="text-[#FF7F32]">{step === "phone" ? "Back" : "Code"}</span>
            </h1>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest opacity-80">
              {step === "phone" ? "Access your Real Estate Engine" : `Sent to +91 ${phoneNumber}`}
            </p>
          </div>
        )}

        {step === "phone" && (
          <div className="space-y-6 animate-fade-in-up">
            <div className="space-y-2 group">
              <Label className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Full Name</Label>
              <div className="relative">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FF7F32]" size={18} />
                <Input type="text" placeholder="Gurpyar" className={inputBase} value={name} onChange={(e) => setName(e.target.value)} disabled={isLoading} />
              </div>
            </div>
            <div className="space-y-2 group">
              <Label className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Phone Number</Label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-gray-400 font-bold border-r border-gray-200 pr-3 h-6">
                  <span className="text-xs">+91</span>
                </div>
                <Input type="tel" placeholder="9876543210" className={inputBase} value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} disabled={isLoading} />
              </div>
            </div>
            <Button onClick={handleRegister} disabled={isLoading} className="w-full bg-[#FF7F32] hover:bg-orange-600 text-white py-6 rounded-full font-black text-lg shadow-xl shadow-orange-600/20">
              {isLoading ? <Loader2 className="animate-spin" /> : "Get Started"}
            </Button>
          </div>
        )}

        {step === "otp" && (
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-4 text-center">
              <Label className="text-[11px] font-bold uppercase tracking-widest text-gray-400">4-Digit Security Code</Label>
              <div className="flex justify-center gap-3">
                {otp.map((digit, index) => (
                  <input key={index} ref={(el) => { inputRefs.current[index] = el; }} type="text" value={digit} onChange={(e) => handleChange(e.target.value, index)} onKeyDown={(e) => handleKeyDown(e, index)} className={otpInputBase} autoFocus={index === 0} disabled={isLoading} />
                ))}
              </div>
            </div>
            <Button onClick={handleVerifyOtp} disabled={isLoading} className="w-full bg-[#FF7F32] hover:bg-[#1a2b49] text-white py-6 rounded-full font-black text-lg shadow-xl">
              {isLoading ? <Loader2 className="animate-spin" /> : "Verify & Continue"}
            </Button>
          </div>
        )}

        {step === "success" && (
          <div className="flex flex-col items-center text-center space-y-8 animate-fade-in-up">
            <div className="bg-green-50/80 backdrop-blur-md w-28 h-28 rounded-[32px] flex items-center justify-center border border-green-100 shadow-sm">
              <CheckCircle2 size={56} className="text-green-500" strokeWidth={2.5} />
            </div>
            <h2 className="text-3xl font-black text-[#1a2b49]">Welcome Back!</h2>
            <Button onClick={() => router.push(callbackUrl || "/")} className="w-full bg-[#1a2b49] hover:bg-[#0a1629] text-white py-6 rounded-full font-black text-lg shadow-xl">
              {callbackUrl ? "Continue Listing" : "Go to Dashboard"} <LayoutDashboard size={18} className="ml-2" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}