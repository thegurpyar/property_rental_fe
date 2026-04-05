"use client";

import { useState, useEffect } from "react";
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Eye,
  Search,
  Filter,
  Clock,
  User,
  AlertTriangle,
  Loader2
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// ── 🧪 MOCK DATA (Pending Queue) ──
const pendingQueue = [
  {
    id: "APP-4492",
    title: "Penthouse at The Reserve",
    location: "Sector 17, Chandigarh",
    price: "₹6.8 Cr",
    owner: "Ujjwal Nagpal",
    submitted: "2 hours ago",
    risk: "Low",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=100&q=80"
  },
  {
    id: "APP-1102",
    title: "Eco-Friendly 3BHK",
    location: "Zirakpur, Punjab",
    price: "₹85 Lakhs",
    owner: "Shreeya Narayan",
    submitted: "5 hours ago",
    risk: "Medium",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=100&q=80"
  },
  {
    id: "APP-8831",
    title: "Industrial Warehouse",
    location: "Dera Bassi",
    price: "₹15 Cr",
    owner: "Rahul Verma",
    submitted: "1 day ago",
    risk: "High",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=100&q=80"
  }
];

export default function AdminApprovals() {
  const [items, setItems] = useState(pendingQueue);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">

      {/* 👑 Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-[#1a2b49] tracking-tighter uppercase">
            Listing <span className="text-[#FF7F32]">Approvals</span>
          </h1>
          <p className="text-gray-400 font-bold uppercase tracking-[0.3em] text-[9px] mt-1">
            Quality Assurance & Verification Gateway
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white border border-orange-100 rounded-2xl px-5 py-3 shadow-sm">
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-black uppercase text-[#1a2b49] tracking-widest">
            {items.length} Pending Review
          </span>
        </div>
      </div>

      {/* 📋 Approval Queue Table */}
      <Card className="rounded-[40px] border-orange-100 bg-white/70 backdrop-blur-xl shadow-2xl shadow-orange-950/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-orange-50/50 border-b border-orange-100">
              <tr>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Submission</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Listed By</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Risk Score</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                <th className="px-8 py-6"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-orange-50">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-24 text-center">
                    <Loader2 className="animate-spin mx-auto text-[#FF7F32]" size={32} />
                    <p className="text-xs font-black uppercase tracking-widest text-slate-400 mt-4">Scanning Submissions...</p>
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id} className="group hover:bg-orange-50/30 transition-all duration-300">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl overflow-hidden border border-orange-100 shadow-sm flex-shrink-0">
                          <img src={item.image} alt="prop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div>
                          <div className="font-black text-[#1a2b49] group-hover:text-[#FF7F32] transition-colors">{item.title}</div>
                          <div className="flex items-center gap-1.5 text-[9px] text-slate-400 font-bold uppercase">
                            <Clock size={10} /> {item.submitted}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-orange-100 text-[#FF7F32] rounded-lg flex items-center justify-center">
                          <User size={14} />
                        </div>
                        <div>
                          <div className="text-xs font-black text-[#1a2b49]">{item.owner}</div>
                          <div className="text-[9px] text-slate-400 font-bold">UID: {item.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <Badge className={`
                        ${item.risk === 'Low' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                          item.risk === 'Medium' ? 'bg-orange-50 text-[#FF7F32] border-orange-100' :
                            'bg-rose-50 text-rose-600 border-rose-100'}
                        font-black uppercase text-[9px] px-3 py-1 rounded-full border
                      `}>
                        {item.risk} Risk
                      </Badge>
                    </td>
                    <td className="px-8 py-6">
                      <Badge className="bg-slate-100 text-slate-500 border-slate-200 font-black uppercase text-[9px] px-3 py-1 rounded-full">
                        Pending
                      </Badge>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white rounded-xl transition-all shadow-sm" title="Approve Listing">
                          <CheckCircle2 size={18} strokeWidth={2.5} />
                        </button>
                        <button className="p-2.5 bg-rose-50 text-rose-600 hover:bg-rose-500 hover:text-white rounded-xl transition-all shadow-sm" title="Reject Listing">
                          <XCircle size={18} strokeWidth={2.5} />
                        </button>
                        <button className="p-2.5 bg-white border border-orange-100 text-slate-400 hover:bg-orange-50 hover:text-[#FF7F32] rounded-xl transition-all shadow-sm">
                          <Eye size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>


    </div>
  );
}