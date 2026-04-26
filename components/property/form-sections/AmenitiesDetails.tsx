import { LayoutDashboard } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue
} from "@/components/ui/select";
import { FURNISHING_STATUS, PARKING_TYPES, AMENITIES_LIST } from "@/lib/constants";
import { FormSectionProps } from "@/types/property-form";

const sectionHeader = "flex items-center gap-2 text-[#1a2b49] font-black text-sm uppercase tracking-widest mb-8 border-b border-gray-100 pb-3";
const inputBase = "bg-gray-50 border-gray-200 rounded-xl px-4 py-6 text-sm text-[#1a2b49] placeholder:text-gray-400 focus:bg-white focus:ring-4 focus:ring-orange-500/5 focus:border-[#FF7F32] transition-all outline-none w-full relative z-10";

export function AmenitiesDetails({ formData, handleInputChange, handleSelectChange, handleAmenityToggle }: FormSectionProps) {
  return (
    <div className="space-y-10">
      <h4 className={sectionHeader}><LayoutDashboard size={18} className="text-[#FF7F32]" /> Features & Amenities</h4>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div className="space-y-2">
          <Label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 ml-1">Furnishing</Label>
          <Select value={formData.furnishing} onValueChange={(v) => handleSelectChange("furnishing", v)}>
            <SelectTrigger className={inputBase}><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent className="bg-white shadow-xl">
              {FURNISHING_STATUS.map(f => (
                <SelectItem key={f.value} value={f.value} className="py-3">{f.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 ml-1">Parking</Label>
          <Select value={formData.parking} onValueChange={(v) => handleSelectChange("parking", v)}>
            <SelectTrigger className={inputBase}><SelectValue placeholder="Select Type" /></SelectTrigger>
            <SelectContent className="bg-white shadow-xl">
              {PARKING_TYPES.map(type => (
                <SelectItem key={type.value} value={type.value} className="py-3">{type.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 ml-1">Age (Years)</Label>
          <Input 
            name="age"
            type="number"
            min="0"
            value={formData.age}
            onChange={handleInputChange}
            placeholder="e.g. 2" 
            className={inputBase} 
          />
        </div>
      </div>

      <div className="bg-gray-50/50 p-8 rounded-[40px] border border-gray-100">
        <Label className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FF7F32] mb-8 block">Select Available Amenities</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6">
          {AMENITIES_LIST.map(item => (
            <div key={item.value} className="flex items-center gap-3">
              <input 
                type="checkbox" 
                checked={formData.amenities.includes(item.value)}
                onChange={() => handleAmenityToggle?.(item.value)}
                className="w-5 h-5 accent-[#FF7F32] rounded-md cursor-pointer" 
              />
              <span className="text-sm font-bold text-[#1a2b49] opacity-80">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
