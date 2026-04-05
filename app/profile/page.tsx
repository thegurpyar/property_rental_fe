"use client";

import { useState } from "react";
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Edit3, 
  Building2, 
  Heart, 
  Clock, 
  Plus,
  ChevronRight
} from "lucide-react";
import { Card, CardContent } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";

export default function ProfilePage() {
  // Mock data matching your Navbar pill
  const [userData] = useState({
    name: "Ujjwal Nagpal",
    phone: "+91 98785 43210",
    email: "ujjwal@propertypro.com",
    location: "Chandigarh, India",
    listingsCount: 3
  });

  const myProperties = [
    { id: 1, title: "Modern 3BHK Apartment", price: "₹85 Lakhs", status: "Active", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80" },
    { id: 2, title: "Luxury Studio Phase 7", price: "₹25,000/mo", status: "Pending", image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=400&q=80" },
    { id: 3, title: "Industrial Plot IT Park", price: "₹12 Cr", status: "Active", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80" },
  ];

  return (
    <div className="min-h-screen bg-[#fffbf9] pb-20">
      {/* 🚀 Header Hero */}
      <div className="bg-white border-b border-orange-100 pt-32 pb-16 px-8 md:px-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
          {/* Large Avatar */}
          <div className="relative group">
            <div className="w-40 h-40 bg-[#FF7F32] rounded-[48px] shadow-2xl shadow-orange-500/20 flex items-center justify-center text-white transition-transform group-hover:scale-105 duration-500">
              <User size={80} strokeWidth={1.5} />
            </div>
            <button className="absolute bottom-2 right-2 bg-white p-3 rounded-2xl shadow-lg border border-orange-50 text-[#FF7F32] hover:bg-orange-50 transition-all">
              <Edit3 size={20} />
            </button>
          </div>

          {/* User Info */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
              <h1 className="text-5xl font-black text-[#1a2b49] tracking-tighter uppercase">{userData.name}</h1>
              <span className="bg-orange-100 text-[#FF7F32] text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">Premium Member</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 max-w-2xl">
              <div className="flex items-center gap-3 text-slate-500 font-bold text-sm">
                <Phone size={18} className="text-[#FF7F32]" /> {userData.phone}
              </div>
              <div className="flex items-center gap-3 text-slate-500 font-bold text-sm">
                <Mail size={18} className="text-[#FF7F32]" /> {userData.email}
              </div>
              <div className="flex items-center gap-3 text-slate-500 font-bold text-sm">
                <MapPin size={18} className="text-[#FF7F32]" /> {userData.location}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex gap-4">
            <Card className="rounded-[32px] border-orange-50 shadow-sm bg-white p-6 text-center min-w-[120px]">
              <div className="text-3xl font-black text-[#FF7F32]">{userData.listingsCount}</div>
              <div className="text-[9px] font-black uppercase text-slate-400 tracking-widest mt-1">Listings</div>
            </Card>
            <Card className="rounded-[32px] border-orange-50 shadow-sm bg-white p-6 text-center min-w-[120px]">
              <div className="text-3xl font-black text-[#1a2b49]">42</div>
              <div className="text-[9px] font-black uppercase text-slate-400 tracking-widest mt-1">Inquiries</div>
            </Card>
          </div>
        </div>
      </div>

      {/* 🏡 Content Grid */}
      <div className="max-w-7xl mx-auto px-8 md:px-16 mt-16">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-black text-[#1a2b49] tracking-tight flex items-center gap-3">
            <Building2 className="text-[#FF7F32]" /> My Active Listings
          </h2>
          <Button className="bg-[#FF7F32] hover:bg-[#e66a1f] text-white rounded-2xl px-6 py-6 h-auto font-black text-xs uppercase tracking-widest shadow-xl shadow-orange-500/20 transition-all flex items-center gap-2">
            <Plus size={18} /> New Listing
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {myProperties.map((prop) => (
            <Card key={prop.id} className="rounded-[40px] border-none shadow-xl shadow-orange-900/5 bg-white group overflow-hidden cursor-pointer transition-all hover:-translate-y-2">
              <div className="relative h-64 overflow-hidden">
                <img src={prop.image} alt="prop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-5 left-5">
                  <span className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20 backdrop-blur-md text-white ${prop.status === 'Active' ? 'bg-emerald-500/80' : 'bg-orange-500/80'}`}>
                    {prop.status}
                  </span>
                </div>
              </div>
              <CardContent className="p-8">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-black text-[#1a2b49] leading-tight group-hover:text-[#FF7F32] transition-colors">{prop.title}</h3>
                </div>
                <div className="text-2xl font-black text-[#FF7F32]">{prop.price}</div>
                <div className="mt-6 pt-6 border-t border-orange-50 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-tighter">
                    <Clock size={14} /> Posted 2 days ago
                  </div>
                  <ChevronRight className="text-orange-200 group-hover:text-[#FF7F32] group-hover:translate-x-1 transition-all" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}