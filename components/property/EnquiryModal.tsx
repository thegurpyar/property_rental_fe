"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: any;
}

export function EnquiryModal({ isOpen, onClose, property }: EnquiryModalProps) {
  const [enquiryForm, setEnquiryForm] = useState({ name: "", phone: "" });

  const submitEnquiry = () => {
    if (!enquiryForm.name || !enquiryForm.phone) {
      return toast.error("Please fill your details");
    }
    toast.success("Enquiry Sent!", {
      description: `We've notified the owner about your interest in ${property?.title}.`
    });
    onClose();
    setEnquiryForm({ name: "", phone: "" });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#1a2b49]/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-[48px] w-full max-w-lg overflow-hidden shadow-2xl animate-scale-in">
        <div className="p-10 pb-0">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="bg-[#FF7F32] p-3 rounded-2xl text-white shadow-lg shadow-orange-500/20">
                <Search size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-[#1a2b49] tracking-tighter">Property Enquiry</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{property?.title}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full text-slate-300 transition-colors">
              <X size={20} />
            </button>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Full Name</label>
              <input 
                type="text"
                placeholder="Enter your name"
                className="w-full h-14 px-6 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-[#FF7F32]/20 font-bold text-sm outline-none"
                value={enquiryForm.name}
                onChange={(e) => setEnquiryForm(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Phone Number</label>
              <input 
                type="tel"
                placeholder="+91 00000 00000"
                className="w-full h-14 px-6 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-[#FF7F32]/20 font-bold text-sm outline-none"
                value={enquiryForm.phone}
                onChange={(e) => setEnquiryForm(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>
          </div>
        </div>

        <div className="p-10 flex gap-3">
          <Button 
            variant="ghost" 
            onClick={onClose}
            className="flex-1 h-14 rounded-2xl font-black uppercase tracking-widest text-[10px] text-slate-400 hover:bg-slate-50"
          >
            Cancel
          </Button>
          <Button 
            onClick={submitEnquiry}
            className="flex-grow-[2] h-14 rounded-2xl bg-[#FF7F32] hover:bg-orange-600 text-white font-black uppercase tracking-widest text-[10px] shadow-lg shadow-orange-500/20"
          >
            Send Request
          </Button>
        </div>
      </div>
    </div>
  );
}
