"use client";

import { useState, useMemo } from "react";
import { MapPin, Search, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue
} from "@/components/ui/select";
import { CITIES, TRICITY_MAP } from "@/lib/constants";
import { FormSectionProps } from "@/types/property-form";

const sectionHeader = "flex items-center gap-2 text-[#1a2b49] font-black text-sm uppercase tracking-widest mb-8 border-b border-gray-100 pb-3";
const inputBase = "bg-gray-50 border-gray-200 rounded-xl px-4 py-6 text-sm text-[#1a2b49] placeholder:text-gray-400 focus:bg-white focus:ring-4 focus:ring-orange-500/5 focus:border-[#FF7F32] transition-all outline-none w-full relative z-10";

export function LocationDetails({ formData, handleInputChange, handleSelectChange }: FormSectionProps) {
  const [isSectorOpen, setIsSectorOpen] = useState(false);
  const [sectorSearch, setSectorSearch] = useState("");

  const availableSectors = useMemo(() => {
    if (!formData.city) return [];
    const cityData = TRICITY_MAP[formData.city as keyof typeof TRICITY_MAP];
    if (!cityData) return [];

    return cityData.sectors.map(s => {
      if (typeof s === 'number') return `Sector ${s}`;
      return s;
    });
  }, [formData.city]);

  const filteredSectors = useMemo(() => {
    const term = sectorSearch.toLowerCase();
    return availableSectors.filter(s => s.toLowerCase().includes(term));
  }, [availableSectors, sectorSearch]);

  const handleCityChange = (cityId: string) => {
    handleSelectChange("city", cityId);
    handleSelectChange("sector", ""); // Reset sector when city changes
    setSectorSearch("");
  };

  const handleSectorSelect = (sector: string) => {
    handleSelectChange("sector", sector);
    setSectorSearch(sector);
    setIsSectorOpen(false);
  };

  return (
    <div className="space-y-8">
      <h4 className={sectionHeader}><MapPin size={18} className="text-[#FF7F32]" /> Location Details</h4>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* City Selection */}
        <div className="space-y-2">
          <Label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 ml-1">City</Label>
          <Select value={formData.city} onValueChange={handleCityChange}>
            <SelectTrigger className={inputBase}>
              <SelectValue placeholder="Select City" />
            </SelectTrigger>
            <SelectContent className="bg-white shadow-xl">
              {CITIES.map(city => (
                <SelectItem key={city.id} value={city.id} className="py-3 font-medium">
                  {city.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Dynamic Sector Search */}
        <div className="space-y-2 relative">
          <Label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 ml-1">Sector / Area</Label>
          <div className="relative group">
            <Input
              name="sector"
              value={isSectorOpen ? sectorSearch : formData.sector}
              onChange={(e) => {
                setSectorSearch(e.target.value);
                if (!isSectorOpen) setIsSectorOpen(true);
              }}
              onFocus={() => setIsSectorOpen(true)}
              placeholder={formData.city ? "Search or Type Sector..." : "Select city first"}
              className={`${inputBase} pr-10`}
              disabled={!formData.city}
              autoComplete="off"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              {isSectorOpen ? <Search size={16} /> : <ChevronDown size={16} />}
            </div>

            {/* Dropdown Results */}
            {isSectorOpen && formData.city && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => {
                    setIsSectorOpen(false);
                    setSectorSearch("");
                  }}
                />
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-2xl max-h-[300px] overflow-y-auto z-50 py-2 custom-scrollbar animate-in fade-in slide-in-from-top-2 duration-200">
                  {filteredSectors.length > 0 ? (
                    filteredSectors.map((sector, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSectorSelect(sector)}
                        className="w-full text-left px-5 py-3 text-sm hover:bg-orange-50 hover:text-[#FF7F32] transition-colors font-medium flex items-center justify-between group/item"
                      >
                        {sector}
                        <span className="text-[10px] opacity-0 group-hover/item:opacity-100 transition-opacity font-bold uppercase tracking-tighter">Select</span>
                      </button>
                    ))
                  ) : (
                    <div className="px-5 py-8 text-center">
                      <p className="text-gray-400 text-xs font-bold uppercase tracking-widest leading-loose">
                        No sectors found for <br />
                        <span className="text-[#FF7F32]">"{sectorSearch}"</span>
                      </p>
                      <button
                        onClick={() => handleSectorSelect(sectorSearch)}
                        className="mt-4 text-[10px] font-black text-[#FF7F32] uppercase tracking-[0.2em] hover:underline"
                      >
                        Use "{sectorSearch}" anyway
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Locality */}
        <div className="space-y-2">
          <Label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 ml-1">Locality</Label>
          <Input
            name="locality"
            value={formData.locality}
            onChange={handleInputChange}
            placeholder="e.g. Rohini"
            className={inputBase}
            required
          />
        </div>

        {/* Landmark */}
        <div className="space-y-2">
          <Label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 ml-1">Landmark</Label>
          <Input
            name="landmark"
            value={formData.landmark}
            onChange={handleInputChange}
            placeholder="Near Metro Station"
            className={inputBase}
          />
        </div>

        {/* Full Address - Spans full width if needed, but keeping it 2-col consistent */}
        <div className="space-y-2 md:col-span-2">
          <Label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 ml-1">Full Address</Label>
          <Input
            name="fullAddress"
            value={formData.fullAddress}
            onChange={handleInputChange}
            placeholder="Complete Address"
            className={inputBase}
            required
          />
        </div>
      </div>
    </div>
  );
}
