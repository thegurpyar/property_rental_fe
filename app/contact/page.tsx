import ContactForm from "@/components/contact/ContactForm";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";

export default function ContactPage() {
  return (
    <section className="relative min-h-screen py-20 px-6 md:px-16 bg-gradient-to-br from-[#f8f9fb] to-[#f0f2f5] overflow-hidden">
      
      {/* 🎯 Ambient Background Blurs */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-orange-50/50 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT SIDE: Content & Info */}
          <div className="space-y-10">
            <div>
              <h4 className="text-[#FF7F32] font-bold text-xs uppercase tracking-[0.25em] mb-4">Contact Us</h4>
              <h1 className="text-[48px] md:text-[64px] font-extrabold text-[#0a1629] tracking-tight leading-[1.1]">
                Let's start a <br /> <span className="text-[#FF7F32]">conversation.</span>
              </h1>
              <p className="text-gray-500 mt-6 text-lg max-w-md leading-relaxed">
                Have a question about a property or want to list your own? Our elite team is ready to assist you.
              </p>
            </div>

            {/* Contact Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-[#0a1629] group-hover:bg-[#0a1629] group-hover:text-white transition-all">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Email us</p>
                  <p className="text-sm font-bold text-[#0a1629]">hello@propertypro.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-[#0a1629] group-hover:bg-[#0a1629] group-hover:text-white transition-all">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Call us</p>
                  <p className="text-sm font-bold text-[#0a1629]">+1 (555) 000-0000</p>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-[32px] bg-[#0a1629] text-white flex items-start gap-6 shadow-2xl shadow-blue-900/20">
              <div className="bg-white/10 p-3 rounded-xl">
                <MessageSquare className="text-[#FF7F32]" />
              </div>
              <div>
                <h4 className="font-bold mb-1">Live Chat Support</h4>
                <p className="text-xs text-gray-400 leading-relaxed">Our average response time is under 5 minutes. Available 24/7.</p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: The Form */}
          <ContactForm />
          
        </div>
      </div>
    </section>
  );
}