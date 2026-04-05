"use client";

import { useState, useEffect } from "react";
import {
  Building2,
  Search,
  Filter,
  MoreVertical,
  CheckCircle2,
  XCircle,
  Clock,
  ExternalLink,
  Plus
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// ── 🧪 MOCK DATA ──
const mockProperties = [
  {
    id: "prop-01",
    title: "Luxury Sky Villa",
    location: "Sector 45, Chandigarh",
    price: "₹4.5 Cr",
    type: "Sale",
    status: "Active",
    owner: "Ujjwal Sharma",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=100&q=80"
  },
  {
    id: "prop-02",
    title: "Modern Studio",
    location: "Phase 7, Mohali",
    price: "₹25,000/mo",
    type: "Rent",
    status: "Pending",
    owner: "Rahul Verma",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=100&q=80"
  },
  {
    id: "prop-03",
    title: "Commercial Hub",
    location: "IT Park, Chandigarh",
    price: "₹12 Cr",
    type: "Sale",
    status: "Rejected",
    owner: "Priya Singh",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=100&q=80"
  }
];

export default function AdminProperties() {
  const [properties, setProperties] = useState(mockProperties);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating API load
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-emerald-50 text-emerald-600 border-emerald-100 font-black uppercase text-[9px] px-3 py-1 rounded-full flex items-center gap-1.5"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Active</Badge>;
      case "Pending":
        return <Badge className="bg-orange-50 text-[#FF7F32] border-orange-100 font-black uppercase text-[9px] px-3 py-1 rounded-full flex items-center gap-1.5"><Clock size={10} /> Reviewing</Badge>;
      case "Rejected":
        return <Badge className="bg-rose-50 text-rose-600 border-rose-100 font-black uppercase text-[9px] px-3 py-1 rounded-full flex items-center gap-1.5"><XCircle size={10} /> Spam</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">

      {/* 👑 Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-[#1a2b49] tracking-tighter uppercase">
            Property <span className="text-[#FF7F32]">Inventory</span>
          </h1>
          <p className="text-gray-400 font-bold uppercase tracking-[0.3em] text-[9px] mt-1">
            Global Listing Management & Quality Control
          </p>
        </div>
        <Button className="bg-[#FF7F32] hover:bg-[#e66a1f] text-white rounded-2xl px-6 py-6 h-auto font-black text-xs uppercase tracking-widest shadow-xl shadow-orange-500/20 transition-all active:scale-95 flex items-center gap-2">
          <Plus size={18} strokeWidth={3} /> Post Internal Listing
        </Button>
      </div>

      {/* 🔍 Search & Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#FF7F32] transition-colors" size={20} />
          <input
            placeholder="Search by Title, Location, or UID..."
            className="w-full bg-white border border-orange-100 rounded-2xl py-4 pl-14 pr-6 text-sm font-bold text-[#1a2b49] outline-none focus:ring-4 focus:ring-orange-500/5 transition-all"
          />
        </div>
        <Button variant="outline" className="rounded-2xl border-orange-100 bg-white px-6 py-4 h-auto font-black text-[#1a2b49] flex items-center gap-2 hover:bg-orange-50 transition-all">
          <Filter size={18} /> Filters
        </Button>
      </div>

      {/* 📊 High-End Inventory Table */}
      <Card className="rounded-[40px] border-orange-100 bg-white/70 backdrop-blur-xl shadow-2xl shadow-orange-950/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-orange-50/50 border-b border-orange-100">
              <tr>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Property Details</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Type</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Valuation</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                <th className="px-8 py-6"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-orange-50">
              {properties.map((prop) => (
                <tr key={prop.id} className="group hover:bg-orange-50/30 transition-all duration-300 cursor-pointer">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl overflow-hidden border border-orange-100 shadow-sm flex-shrink-0">
                        <img src={prop.image} alt="thumb" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div>
                        <div className="font-black text-[#1a2b49] group-hover:text-[#FF7F32] transition-colors line-clamp-1">{prop.title}</div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{prop.location}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="text-sm font-black text-[#1a2b49]">{prop.type}</div>
                    <div className="text-[9px] text-slate-400 font-bold uppercase">UID: {prop.id}</div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="text-sm font-black text-[#FF7F32]">{prop.price}</div>
                    <div className="text-[9px] text-slate-400 font-bold uppercase">{prop.owner}</div>
                  </td>
                  <td className="px-8 py-6">
                    {getStatusBadge(prop.status)}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 hover:bg-emerald-50 text-emerald-500 rounded-xl transition-all" title="Approve">
                        <CheckCircle2 size={18} strokeWidth={2.5} />
                      </button>
                      <button className="p-2 hover:bg-slate-100 text-slate-400 rounded-xl transition-all">
                        <ExternalLink size={18} />
                      </button>
                      <button className="p-2 hover:bg-white text-slate-400 rounded-xl transition-all">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* 🚀 Pagination / Quick Stats */}
      <div className="flex justify-between items-center px-4">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Showing 3 of 1.2k Listings</p>
        <div className="flex gap-2">
          <Button variant="ghost" disabled className="rounded-xl font-black text-xs uppercase">Prev</Button>
          <Button variant="ghost" className="rounded-xl font-black text-xs uppercase text-[#FF7F32]">Next</Button>
        </div>
      </div>
    </div>
  );
}