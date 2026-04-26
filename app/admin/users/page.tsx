"use client";
import { useEffect, useState } from "react";
import apiClient from "@/lib/apClient";
import { Card } from "@/components/ui/card";
import { Loader2, Search, MoreVertical, Phone, Mail, Shield, CheckCircle2, XCircle, User } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function UsersList() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    full_name: "",
    number: "",
    email: "",
    role: "all",
    status: "all"
  });
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 1
  });

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("page", filters.page.toString());
      params.append("limit", filters.limit.toString());
      if (filters.full_name) params.append("full_name", filters.full_name);
      if (filters.number) params.append("number", filters.number);
      if (filters.email) params.append("email", filters.email);
      if (filters.role !== "all") params.append("role", filters.role);
      if (filters.status !== "all") params.append("status", filters.status);

      const res = await apiClient.get(`/admin/users?${params.toString()}`);
      if (res.data.success) {
        setUsers(res.data.data.users);
        setPagination({
          total: res.data.data.pagination.total,
          totalPages: res.data.data.pagination.totalPages
        });
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsers();
    }, 500); // Debounce
    return () => clearTimeout(timer);
  }, [filters]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
  };

  const handlePageChange = (newPage: number) => {
    setFilters(prev => ({ ...prev, page: newPage }));
  };

  return (
    <div className="space-y-6 md:space-y-10 animate-in fade-in duration-700 p-4 sm:p-8 md:p-12 bg-slate-50/30 min-h-screen">

      {/* ── UNIFIED COMMAND BAR ── */}
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-[#1a2b49] tracking-tighter">
            User <span className="text-[#FF7F32]">Directory</span>
          </h1>
          <p className="text-gray-400 font-bold uppercase tracking-[0.3em] text-[8px] md:text-[10px] mt-2">
            Enterprise Management Engine
          </p>
        </div>

        {/* --- High-Performance Filter Grid --- */}
        <div className="bg-white rounded-[32px] md:rounded-[40px] p-3 md:p-4 shadow-xl shadow-slate-200/40 border border-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 md:gap-4 items-center">

            {/* 1. Name Search (Spans 4) */}
            <div className="md:col-span-2 lg:col-span-4 relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#FF7F32] transition-colors" size={18} />
              <input
                placeholder="Search by full name..."
                value={filters.full_name}
                onChange={(e) => handleFilterChange("full_name", e.target.value)}
                className="w-full bg-slate-50/50 rounded-full pl-16 pr-6 py-3 md:py-4 text-sm font-bold text-[#1a2b49] outline-none border border-transparent focus:border-[#FF7F32]/20 transition-all placeholder:text-slate-300"
              />
            </div>

            {/* 2. Phone Filter (Spans 2) */}
            <div className="md:col-span-1 lg:col-span-2 relative group">
              <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#FF7F32] transition-colors" size={16} />
              <input
                placeholder="Phone"
                value={filters.number}
                onChange={(e) => handleFilterChange("number", e.target.value)}
                className="w-full bg-slate-50/50 rounded-full pl-14 pr-6 py-3 md:py-4 text-sm font-bold text-[#1a2b49] outline-none border border-transparent focus:border-[#FF7F32]/20 transition-all placeholder:text-slate-300"
              />
            </div>

            {/* 3. Email Filter (Spans 2) */}
            <div className="md:col-span-1 lg:col-span-2 relative group">
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#FF7F32] transition-colors" size={16} />
              <input
                placeholder="Email"
                value={filters.email}
                onChange={(e) => handleFilterChange("email", e.target.value)}
                className="w-full bg-slate-50/50 rounded-full pl-14 pr-6 py-3 md:py-4 text-sm font-bold text-[#1a2b49] outline-none border border-transparent focus:border-[#FF7F32]/20 transition-all placeholder:text-slate-300"
              />
            </div>

            {/* 4. Role Select (Spans 2) */}
            <div className="md:col-span-1 lg:col-span-2">
              <Select onValueChange={(v) => handleFilterChange("role", v)} value={filters.role}>
                <SelectTrigger className="h-12 md:h-14 rounded-full bg-slate-50/50 border border-transparent hover:border-orange-100 hover:bg-white text-[10px] font-black uppercase tracking-widest text-slate-400 pl-8 transition-all duration-300 group">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-slate-100 shadow-2xl z-[100] p-1 bg-white/95 backdrop-blur-xl">
                  <SelectItem value="all" className="rounded-xl font-bold py-3 focus:bg-orange-50 focus:text-[#FF7F32]">All Roles</SelectItem>
                  <SelectItem value="admin" className="rounded-xl font-bold py-3 focus:bg-orange-50 focus:text-[#FF7F32]">Admin</SelectItem>
                  <SelectItem value="agent" className="rounded-xl font-bold py-3 focus:bg-orange-50 focus:text-[#FF7F32]">Agent</SelectItem>
                  <SelectItem value="user" className="rounded-xl font-bold py-3 focus:bg-orange-50 focus:text-[#FF7F32]">User</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 5. Status Select (Spans 2) */}
            <div className="md:col-span-1 lg:col-span-2">
              <Select onValueChange={(v) => handleFilterChange("status", v)} value={filters.status}>
                <SelectTrigger className="h-12 md:h-14 rounded-full bg-slate-50/50 border border-transparent hover:border-orange-100 hover:bg-white text-[10px] font-black uppercase tracking-widest text-slate-400 pl-8 transition-all duration-300 group">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-slate-100 z-[100] shadow-2xl p-1 bg-white/95 backdrop-blur-xl">
                  <SelectItem value="all" className="rounded-xl font-bold py-3 focus:bg-orange-50 focus:text-[#FF7F32]">All Status</SelectItem>
                  <SelectItem value="1" className="rounded-xl font-bold py-3 focus:bg-orange-50 focus:text-[#FF7F32]">Active</SelectItem>
                  <SelectItem value="2" className="rounded-xl font-bold py-3 focus:bg-orange-50 focus:text-[#FF7F32]">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

          </div>
        </div>

        {/* Results Counter Sub-Header */}
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-[#FF7F32] rounded-full animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">Live Management Engine</span>
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#FF7F32] bg-orange-50 px-4 py-1.5 rounded-full">{pagination.total} Records Found</span>
        </div>
      </div>

      {/* ── Table Container (Desktop) ── */}
      <div className="hidden md:block">
        <Card className="rounded-[40px] border-none bg-white shadow-xl shadow-slate-200/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[800px]">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">User Details</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Access Role</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Account Status</th>
                  <th className="px-10 py-6"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="py-40 text-center">
                      <Loader2 className="animate-spin mx-auto text-[#FF7F32]" size={40} />
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 mt-6">Loading Users...</p>
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-40 text-center">
                      <User className="mx-auto text-slate-100 mb-6" size={60} />
                      <h3 className="text-xl font-black text-[#1a2b49] tracking-tight">No Records Found</h3>
                    </td>
                  </tr>
                ) : (
                  users.map((user: any) => (
                    <tr key={user._id} className="hover:bg-slate-50/50 transition-all group border-b border-transparent last:border-none">
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-5">
                          <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-[#1a2b49] font-black text-lg group-hover:bg-[#FF7F32] group-hover:text-white transition-all shadow-sm">
                            {user.full_name?.charAt(0)}
                          </div>
                          <div>
                            <div className="font-black text-[#1a2b49] text-base leading-none">{user.full_name}</div>
                            <div className="text-xs font-bold text-slate-400 mt-2 flex items-center gap-2">
                              <Mail size={12} className="text-[#FF7F32]" /> {user.email}
                            </div>
                            <div className="text-xs font-bold text-slate-400 mt-1 flex items-center gap-2">
                              <Phone size={12} className="text-[#FF7F32]" /> +91 {user.number}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 border border-slate-100">
                          <Shield size={12} className="text-[#FF7F32]" />
                          <span className="text-[10px] font-black uppercase tracking-widest text-[#1a2b49] capitalize">{user.role}</span>
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        {user.status === 1 ? (
                          <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-xl text-[10px] font-black uppercase tracking-widest">
                            <CheckCircle2 size={12} /> Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-500 rounded-xl text-[10px] font-black uppercase tracking-widest">
                            <XCircle size={12} /> Inactive
                          </span>
                        )}
                      </td>
                      <td className="px-10 py-8 text-right">
                        <button className="w-10 h-10 flex items-center justify-center hover:bg-slate-100 rounded-xl transition-all ml-auto">
                          <MoreVertical size={20} className="text-slate-300" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* ── Mobile Card View ── */}
      <div className="space-y-4 md:hidden">
        {loading ? (
          <div className="py-20 text-center bg-white rounded-[32px] shadow-sm border border-slate-100">
            <Loader2 className="animate-spin mx-auto text-[#FF7F32]" size={32} />
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 mt-4">Loading Users...</p>
          </div>
        ) : users.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-[32px] shadow-sm border border-slate-100">
            <User className="mx-auto text-slate-100 mb-4" size={48} />
            <h3 className="text-lg font-black text-[#1a2b49] tracking-tight">No Records Found</h3>
          </div>
        ) : (
          users.map((user: any) => (
            <div key={user._id} className="bg-white rounded-[32px] p-6 shadow-xl shadow-slate-200/30 border border-slate-50 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-[#1a2b49] font-black text-base shadow-sm">
                  {user.full_name?.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-black text-[#1a2b49] text-base truncate">{user.full_name}</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-[#FF7F32] mt-0.5">{user.role}</div>
                </div>
                <button className="w-8 h-8 flex items-center justify-center hover:bg-slate-50 rounded-lg transition-all">
                  <MoreVertical size={18} className="text-slate-300" />
                </button>
              </div>

              <div className="grid grid-cols-1 gap-2 pt-2">
                <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
                  <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                    <Mail size={12} className="text-[#FF7F32]" />
                  </div>
                  <span className="truncate">{user.email}</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
                  <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                    <Phone size={12} className="text-[#FF7F32]" />
                  </div>
                  <span>+91 {user.number}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                {user.status === 1 ? (
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-600 rounded-lg text-[9px] font-black uppercase tracking-widest">
                    <CheckCircle2 size={10} /> Active
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-rose-50 text-rose-500 rounded-lg text-[9px] font-black uppercase tracking-widest">
                    <XCircle size={10} /> Inactive
                  </span>
                )}
                <span className="text-[9px] font-bold text-slate-300 uppercase tracking-tighter">ID: {user._id?.slice(-6)}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ── Footer / Pagination ── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 px-4 md:px-10 pb-10">
        <div className="text-[10px] font-black uppercase tracking-widest text-slate-300">
          Page {filters.page} of {pagination.totalPages}
        </div>
        <div className="flex gap-4 w-full sm:w-auto">
          <button
            disabled={filters.page === 1 || loading}
            onClick={() => handlePageChange(filters.page - 1)}
            className="flex-1 sm:flex-none px-6 md:px-8 py-3 md:py-4 rounded-2xl bg-white border border-slate-100 text-[10px] font-black uppercase tracking-widest text-[#1a2b49] hover:bg-[#1a2b49] hover:text-white transition-all disabled:opacity-30 shadow-sm"
          >
            Previous
          </button>
          <button
            disabled={filters.page >= pagination.totalPages || loading}
            onClick={() => handlePageChange(filters.page + 1)}
            className="flex-1 sm:flex-none px-6 md:px-8 py-3 md:py-4 rounded-2xl bg-white border border-slate-100 text-[10px] font-black uppercase tracking-widest text-[#1a2b49] hover:bg-[#1a2b49] hover:text-white transition-all disabled:opacity-30 shadow-sm"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}