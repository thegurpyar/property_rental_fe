import { Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue
} from "@/components/ui/select";
import { PROPERTY_CATEGORIES, AREA_UNITS } from "@/lib/constants";
import { FormSectionProps } from "@/types/property-form";

const sectionHeader = "flex items-center gap-2 text-[#1a2b49] font-black text-sm uppercase tracking-widest mb-8 border-b border-gray-100 pb-3";
const inputBase = "bg-gray-50 border-gray-200 rounded-xl px-4 h-[56px] text-sm text-[#1a2b49] placeholder:text-gray-400 focus:bg-white focus:ring-4 focus:ring-orange-500/5 focus:border-[#FF7F32] transition-all outline-none w-full relative z-10";

export function BasicDetails({ formData, handleInputChange, handleSelectChange }: FormSectionProps) {
  return (
    <div className="space-y-8">
      <h4 className={sectionHeader}><Info size={18} className="text-[#FF7F32]" /> Basic Property Details</h4>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-6 space-y-2">
          <Label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 ml-1">Property Title <span className="text-red-500">*</span></Label>
          <Input
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="e.g. 3BHK Flat in Sector 70 Mohali"
            className={inputBase}
            required
          />
        </div>
        <div className="lg:col-span-3 space-y-2">
          <Label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 ml-1">Category <span className="text-red-500">*</span></Label>
          <Select value={formData.category} onValueChange={(v) => handleSelectChange("category", v)}>
            <SelectTrigger className={inputBase}><SelectValue placeholder="Select type" /></SelectTrigger>
            <SelectContent className="bg-white z-[100] shadow-2xl">
              {PROPERTY_CATEGORIES.map(cat => (
                <SelectItem key={cat} value={cat.toLowerCase()} className="py-3">{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="lg:col-span-3 space-y-2">
          <Label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 ml-1">Purpose <span className="text-red-500">*</span></Label>
          <Select value={formData.purpose} onValueChange={(v) => handleSelectChange("purpose", v)}>
            <SelectTrigger className={inputBase}><SelectValue placeholder="Rent / Sale" /></SelectTrigger>
            <SelectContent className="bg-white z-[100] shadow-2xl">
              <SelectItem value="rent" className="py-3">For Rent</SelectItem>
              <SelectItem value="sale" className="py-3">For Sale</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="space-y-2">
          <Label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 ml-1">Price (₹) <span className="text-red-500">*</span></Label>
          <Input
            name="price"
            type="number"
            min="0"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="e.g. 25000"
            className={inputBase}
            required
          />
        </div>
        <div className="space-y-2">
          <Label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 ml-1">BHK</Label>
          <Input
            name="bhk"
            type="number"
            min="1"
            value={formData.bhk}
            onChange={handleInputChange}
            placeholder="Beds"
            className={inputBase}
          />
        </div>
        <div className="space-y-2">
          <Label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 ml-1">Bathrooms</Label>
          <Input
            name="bathrooms"
            type="number"
            min="1"
            value={formData.bathrooms}
            onChange={handleInputChange}
            placeholder="Baths"
            className={inputBase}
          />
        </div>
        <div className="space-y-2">
          <Label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 ml-1">Total Area <span className="text-red-500">*</span></Label>
          <div className="flex gap-2">
            <Input
              name="totalArea"
              type="number"
              min="1"
              value={formData.totalArea}
              onChange={handleInputChange}
              placeholder="Size"
              className="bg-gray-50 border-gray-200 rounded-xl px-4 h-[56px] text-sm flex-1 focus:bg-white transition-all outline-none"
              required
            />
            <Select value={formData.areaUnit} onValueChange={(v) => handleSelectChange("areaUnit", v)}>
              <SelectTrigger className="w-[110px] bg-gray-100 border-none rounded-xl h-[56px] text-xs font-bold"><SelectValue placeholder="Unit" /></SelectTrigger>
              <SelectContent className="bg-white shadow-xl">
                {AREA_UNITS.map(unit => (
                  <SelectItem key={unit.value} value={unit.value}>{unit.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
