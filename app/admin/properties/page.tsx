"use client";

import { useState, useEffect } from "react";
import {
  Building2,
  Search,
  Filter,
  MoreVertical,
  Clock,
  ExternalLink,
  Plus,
  Loader2,
  XCircle,
  ShieldAlert
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import apiClient from "@/lib/apClient";
import AdminAddPropertyForm from "@/components/admin/AdminAddPropertyForm";

export default function AdminProperties() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: "",
  });
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 1
  });

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("page", filters.page.toString());
      params.append("limit", filters.limit.toString());
      if (filters.search) params.append("search", filters.search);

      // Using the integrated API path from swagger
      const res = await apiClient.get(`/property/admin?${params.toString()}`);
      if (res.data.success) {
        setProperties(res.data.data.properties);
        setPagination({
          total: res.data.data.pagination.total,
          totalPages: res.data.data.pagination.totalPages
        });
      }
    } catch (error) {
      console.error("Failed to fetch properties:", error);
      toast.error("Failed to sync property inventory");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(fetchProperties, 500);
    return () => clearTimeout(timer);
  }, [filters]);

  const handleStatusToggle = async (propertyId: string) => {
    try {
      // Using the dedicated approval toggle endpoint
      const res = await apiClient.put(`/property/admin/approve/${propertyId}`);
      if (res.data.success) {
        const newStatus = res.data.data.property.status;
        setProperties(prev => prev.map(p => p._id === propertyId ? { ...p, status: newStatus } : p));
        toast.success(`Property is now ${newStatus === 'available' ? 'Approved' : 'Pending'}`);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  const getStatusBadge = (status: string) => {
    const isApproved = status === "available";
    return (
      <Badge className={`font-black uppercase text-[9px] px-3 py-1 rounded-full flex items-center gap-1.5 ${isApproved
        ? "bg-emerald-50 text-emerald-600 border-emerald-100"
        : "bg-slate-50 text-slate-400 border-slate-100"
        }`}>
        <div className={`w-1.5 h-1.5 rounded-full ${isApproved ? "bg-emerald-500 animate-pulse" : "bg-slate-300"}`} />
        {isApproved ? "Approved" : "Not Approved"}
      </Badge>
    );
  };

  return (
    <div className="space-y-6 md:space-y-10 animate-in fade-in duration-700">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-5xl font-black text-[#1a2b49] tracking-tighter uppercase">
            Property <span className="text-[#FF7F32]">Inventory</span>
          </h1>
          <p className="text-gray-400 font-bold uppercase tracking-[0.3em] text-[9px] mt-2">
            Global Listing Management &amp; Asset Control
          </p>
        </div>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-[#FF7F32] hover:bg-[#e66a1f] text-white rounded-2xl px-8 h-14 font-black text-[11px] uppercase tracking-widest shadow-xl shadow-orange-500/20 transition-all active:scale-95 flex items-center gap-3"
        >
          <Plus size={18} strokeWidth={3} /> Post Global Listing
        </Button>
      </div>

      {/* ── Search & Filters ── */}
      <div className="bg-white rounded-[40px] p-4 shadow-xl shadow-slate-200/40 border border-slate-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#FF7F32] transition-colors" size={20} />
            <input
              placeholder="Search by Title, Location, or UID..."
              className="w-full bg-slate-50 border-none rounded-[24px] py-4 pl-16 pr-6 text-sm font-bold text-[#1a2b49] outline-none focus:ring-4 focus:ring-orange-500/5 transition-all"
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value, page: 1 }))}
            />
          </div>
          <Button variant="outline" className="rounded-[24px] border-orange-100 bg-white px-8 h-14 font-black text-[11px] uppercase tracking-widest text-[#1a2b49] flex items-center gap-2 hover:bg-orange-50 transition-all">
            <Filter size={18} /> Filters
          </Button>
        </div>
      </div>

      {/* ── Table (Desktop) ── */}
      <Card className="rounded-[48px] border-none bg-white shadow-2xl shadow-slate-200/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[1000px]">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="px-10 py-7 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Property Details</th>
                <th className="px-10 py-7 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Valuation</th>
                <th className="px-10 py-7 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-center">Status</th>
                <th className="px-10 py-7 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-center">Approve</th>
                <th className="px-10 py-7"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-40 text-center">
                    <Loader2 className="animate-spin mx-auto text-[#FF7F32]" size={48} />
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 mt-8">Loading Inventory...</p>
                  </td>
                </tr>
              ) : properties.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-40 text-center">
                    <Building2 className="mx-auto text-slate-100 mb-8" size={72} />
                    <h3 className="text-2xl font-black text-[#1a2b49] tracking-tight">No Listings Found</h3>
                  </td>
                </tr>
              ) : (
                properties.map((prop) => {
                  const firstImg = prop.images?.[0]?.url;
                  let fullImgUrl = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=100&q=80";
                  if (firstImg) {
                    if (firstImg.startsWith("http")) fullImgUrl = firstImg;
                    else fullImgUrl = `https://module-project-tx70.onrender.com/uploads/${firstImg.split('/').pop()}`;
                  }

                  return (
                    <tr key={prop._id} className="group hover:bg-slate-50/50 transition-all duration-300">
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-6">
                          <div className="w-16 h-16 rounded-[24px] overflow-hidden border border-orange-100 shadow-sm flex-shrink-0">
                            <img src={fullImgUrl} alt="thumb" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          </div>
                          <div>
                            <div className="font-black text-[#1a2b49] text-base group-hover:text-[#FF7F32] transition-colors">{prop.title}</div>
                            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tight mt-1">{prop.locality}, {prop.city}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        <div className="text-base font-black text-[#1a2b49]">₹{prop.price?.toLocaleString()}</div>
                        <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">{prop.userId?.full_name || "Enterprise Owner"}</div>
                      </td>
                      <td className="px-10 py-8 text-center">
                        <div className="flex justify-center">
                          {getStatusBadge(prop.status)}
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        <div className="flex flex-col items-center">
                          <button
                            onClick={() => handleStatusToggle(prop._id)}
                            className={`relative w-12 h-6 rounded-full transition-all duration-300 p-1 flex items-center ${prop.status === "available" ? "bg-emerald-500" : "bg-slate-200"
                              }`}
                          >
                            <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-300 transform ${prop.status === "available" ? "translate-x-6" : "translate-x-0"
                              }`} />
                          </button>
                        </div>
                      </td>
                      <td className="px-10 py-8 text-right">
                        <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-3 hover:bg-slate-100 rounded-[16px] text-slate-300 hover:text-[#1a2b49] transition-all">
                            <ExternalLink size={20} />
                          </button>
                          <button className="p-3 hover:bg-slate-100 rounded-[16px] text-slate-300 hover:text-[#1a2b49] transition-all">
                            <MoreVertical size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ── Pagination ── */}
      <div className="flex items-center justify-between px-10 pb-20">
        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-300">Displaying {properties.length} of {pagination.total} High-Value Assets</p>
        <div className="flex gap-4">
          <Button
            variant="ghost"
            disabled={filters.page === 1 || loading}
            onClick={() => setFilters(prev => ({ ...prev, page: prev.page - 1 }))}
            className="px-8 h-14 rounded-[20px] font-black text-[11px] uppercase tracking-widest border border-slate-100"
          >
            Prev
          </Button>
          <Button
            variant="ghost"
            disabled={filters.page >= pagination.totalPages || loading}
            onClick={() => setFilters(prev => ({ ...prev, page: prev.page + 1 }))}
            className="px-8 h-14 rounded-[20px] font-black text-[11px] uppercase tracking-widest border border-slate-100 bg-white shadow-sm"
          >
            Next Set
          </Button>
        </div>
      </div>

      {/* ── Global Listing Form ── */}
      {showAddForm && (
        <AdminAddPropertyForm
          onClose={() => setShowAddForm(false)}
          onSuccess={fetchProperties}
        />
      )}
    </div>
  );
}