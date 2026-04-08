"use client";
import { useEffect, useState } from "react";
// import apiClient from "@/lib/apClient";
import { Card } from "@/components/ui/card";
import { Loader2, Search, MoreVertical } from "lucide-react";

export default function UsersList() {
  const [users, setUsers] = useState<{ id: string; full_name: string; number: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dummyUsers = [
      { id: "user_1a2b3c", full_name: "Ujjwal Sharma", number: "9876543210" },
      { id: "user_4d5e6f", full_name: "Rahul Verma", number: "9123456780" },
      { id: "user_7g8h9i", full_name: "Priya Singh", number: "9988776655" },
      { id: "user_0j1k2l", full_name: "Aman Gupta", number: "9012345678" },
    ];
    setTimeout(() => {
      setUsers(dummyUsers);
      setLoading(false);
    }, 800);
  }, []);

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-700">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#1a2b49] tracking-tighter">
            User <span className="text-[#FF7F32]">Directory</span>
          </h1>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mt-1">
            Manage Property Owners &amp; Agents
          </p>
        </div>
        <div className="relative group w-full sm:w-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FF7F32] transition-colors" size={16} />
          <input
            placeholder="Search users..."
            className="bg-white border border-gray-100 rounded-2xl pl-12 pr-6 py-3.5 sm:py-4 text-sm font-bold text-[#1a2b49] outline-none focus:ring-4 focus:ring-orange-500/5 focus:border-[#FF7F32] transition-all w-full sm:w-72"
          />
        </div>
      </div>

      {/* ── Mobile: Card list (< sm) ── */}
      <div className="sm:hidden space-y-3">
        {loading ? (
          <div className="py-20 flex justify-center">
            <Loader2 className="animate-spin text-[#FF7F32]" size={32} />
          </div>
        ) : (
          users.map((user: any) => (
            <Card key={user.id} className="rounded-[24px] border-none bg-white shadow-sm p-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-black text-[#1a2b49] text-sm">{user.full_name}</div>
                  <div className="text-[10px] text-gray-400 font-bold uppercase tracking-tight mt-0.5">
                    Agent ID: {user.id.slice(-6)}
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                  <MoreVertical size={16} className="text-gray-400" />
                </button>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm font-bold text-gray-600">+91 {user.number}</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase tracking-tighter">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full" /> Verified
                </span>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* ── Tablet/Desktop: Table (sm+) ── */}
      <Card className="hidden sm:block rounded-[40px] border-white/40 bg-white/70 backdrop-blur-2xl shadow-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#1a2b49]/5 border-b border-gray-100">
            <tr>
              <th className="px-6 md:px-10 py-5 md:py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">User Identity</th>
              <th className="px-6 md:px-10 py-5 md:py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Contact</th>
              <th className="px-6 md:px-10 py-5 md:py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Activity</th>
              <th className="px-6 md:px-10 py-5 md:py-6"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr>
                <td colSpan={4} className="py-32 text-center">
                  <Loader2 className="animate-spin mx-auto text-[#FF7F32]" size={32} />
                </td>
              </tr>
            ) : (
              users.map((user: any) => (
                <tr key={user.id} className="hover:bg-white/50 transition-colors group">
                  <td className="px-6 md:px-10 py-5 md:py-7">
                    <div className="font-black text-[#1a2b49] group-hover:text-[#FF7F32] transition-colors">{user.full_name}</div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Agent ID: {user.id.slice(-6)}</div>
                  </td>
                  <td className="px-6 md:px-10 py-5 md:py-7 text-sm font-bold text-gray-600">+91 {user.number}</td>
                  <td className="px-6 md:px-10 py-5 md:py-7">
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase tracking-tighter">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full" /> Verified
                    </span>
                  </td>
                  <td className="px-6 md:px-10 py-5 md:py-7 text-right">
                    <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                      <MoreVertical size={16} className="text-gray-400" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}