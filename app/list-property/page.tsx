import { Button } from "@/components/ui/button";

export default function ListPropertyPage() {
  return (
    <div className="max-w-lg mx-auto px-5 py-20">
      <h1 className="text-3xl font-extrabold text-[#1a3c5e] mb-2">List Your Property</h1>
      <p className="text-slate-400 text-sm mb-8">Fill in the details to list your property.</p>
      <form className="space-y-4">
        <input type="text" placeholder="Property title" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3c5e]/20" />
        <input type="text" placeholder="Location" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3c5e]/20" />
        <input type="number" placeholder="Price (₹)" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3c5e]/20" />
        <Button className="w-full bg-[#1a3c5e] hover:bg-[#152d47] text-white rounded-full font-semibold">Submit Listing</Button>
      </form>
    </div>
  );
}
