"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, CheckCircle2, Loader2, Building2, Image as ImageIcon, MapPin, ListPlus } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent } from "../ui/card";
import apiClient from "@/lib/apClient";
import { PropertyFormData } from "@/types/property-form";
import { toast } from "sonner";
import { BasicDetails } from "../property/form-sections/BasicDetails";
import { LocationDetails } from "../property/form-sections/LocationDetails";
import { AmenitiesDetails } from "../property/form-sections/AmenitiesDetails";
import { MediaDetails } from "../property/form-sections/MediaDetails";

interface AdminAddPropertyFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function AdminAddPropertyForm({ onClose, onSuccess }: AdminAddPropertyFormProps) {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<PropertyFormData>({
    title: "",
    purpose: "rent",
    category: "apartment",
    price: "",
    priceType: "monthly",
    bhk: "",
    bathrooms: "",
    totalArea: "",
    areaUnit: "sqft",
    city: "",
    sector: "",
    locality: "",
    landmark: "",
    fullAddress: "",
    furnishing: "unfurnished",
    parking: "car",
    age: "",
    amenities: [] as string[],
    description: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAmenityToggle = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement> | File[]) => {
    let files: File[] = [];
    if (Array.isArray(e)) {
      files = e;
    } else {
      files = Array.from(e.target.files || []);
    }

    const remainingSlots = 10 - images.length;
    const selectedFiles = files.slice(0, remainingSlots);

    if (selectedFiles.length === 0) return;

    try {
      const filePromises = selectedFiles.map(file => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      const newMediaResults = await Promise.all(filePromises);
      setImages(prev => [...prev, ...newMediaResults].slice(0, 10));
      setImageFiles(prev => [...prev, ...selectedFiles].slice(0, 10));
    } catch (err) {
      console.error("Media processing error:", err);
      toast.error("Failed to process images");
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImageFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.price || !formData.totalArea || !formData.city) {
      return toast.error("Missing Required Fields", {
        description: "Title, Price, Area, and City are mandatory for global listings."
      });
    }

    setIsLoading(true);
    try {
      const uploadedImagePaths: { url: string }[] = [];
      for (const file of imageFiles) {
        const formDataUpload = new FormData();
        formDataUpload.append("file", file);
        const uploadRes = await apiClient.post("/fileupload", formDataUpload, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        if (uploadRes.data.success) {
          uploadedImagePaths.push({ url: `/uploads/${uploadRes.data.data.key}` });
        }
      }

      const payload = {
        ...formData,
        price: Number(formData.price) || 0,
        bhk: Number(formData.bhk) || 0,
        bathrooms: Number(formData.bathrooms) || 0,
        totalArea: Number(formData.totalArea) || 0,
        age: Number(formData.age) || 0,
        coordinates: {
          lat: 28.7041,
          lng: 77.1025
        },
        images: uploadedImagePaths
      };

      const response = await apiClient.post("/property/admin/", payload);

      if (response.data.success) {
        toast.success("Global Listing Published!", {
          description: "Property has been added to the master inventory successfully."
        });
        onSuccess();
        onClose();
      }
    } catch (error: any) {
      console.error("Submission error:", error);
      toast.error("Failed to post listing", {
        description: error.response?.data?.message || "Internal Server Error"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 left-0 top-0 z-[10000] w-screen h-screen bg-[#1a2b49]/60 backdrop-blur-md flex items-center justify-center animate-in fade-in duration-500">
      {/* Form Container */}
      <div className="relative w-full max-w-7xl bg-white h-full md:h-[95vh] rounded-[24px] md:rounded-[40px] shadow-[0_32px_128px_-16px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden animate-in zoom-in-95 duration-700">

        {/* Header */}
        <div className="bg-white border-b border-slate-100 px-6 md:px-12 py-6 md:py-10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-5 md:gap-8">
            <div className="bg-[#FF7F32] p-4 md:p-6 rounded-[20px] md:rounded-[28px] shadow-2xl shadow-orange-500/30 text-white">
              <Building2 className="w-8 h-8 md:w-10 md:h-10" strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="text-2xl md:text-4xl lg:text-5xl font-black text-[#1a2b49] tracking-tighter uppercase leading-none italic">
                Post Global <span className="text-[#FF7F32]">Listing</span>
              </h3>
              <p className="text-[9px] md:text-[12px] text-gray-400 font-bold uppercase tracking-[0.4em] mt-2 md:mt-4">Administrative Asset Entry Protocol</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-3 md:p-6 hover:bg-slate-50 rounded-[16px] md:rounded-[28px] text-slate-300 hover:text-[#FF7F32] transition-all group border border-transparent hover:border-orange-100"
          >
            <X className="w-8 h-8 md:w-10 md:h-10 group-hover:rotate-90 transition-transform duration-500" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto px-6 md:px-12 lg:px-20 py-8 md:py-20 bg-white custom-scrollbar pb-40">
          <form id="admin-property-form" onSubmit={handleSubmit} className="w-full max-w-5xl mx-auto space-y-16 md:space-y-28">

            <section className="animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
              <BasicDetails
                formData={formData}
                handleInputChange={handleInputChange}
                handleSelectChange={handleSelectChange}
              />
            </section>

            <section className="animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
              <LocationDetails
                formData={formData}
                handleInputChange={handleInputChange}
                handleSelectChange={handleSelectChange}
              />
            </section>

            <section className="animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300">
              <AmenitiesDetails
                formData={formData}
                handleInputChange={handleInputChange}
                handleSelectChange={handleSelectChange}
                handleAmenityToggle={handleAmenityToggle}
              />
            </section>

            <section className="animate-in fade-in slide-in-from-bottom-6 duration-700 delay-400">
              <MediaDetails
                formData={formData}
                handleInputChange={handleInputChange}
                handleSelectChange={handleSelectChange}
                images={images}
                imageFiles={imageFiles}
                fileInputRef={fileInputRef}
                handleImageUpload={handleImageUpload}
                removeImage={removeImage}
                isLoading={isLoading}
              />
            </section>

          </form>
        </div>

        {/* Footer */}
        <div className="bg-white/95 backdrop-blur-md border-t border-slate-100 px-6 md:px-12 lg:px-20 py-6 md:py-10 shrink-0 absolute bottom-0 left-0 right-0 z-30">
          <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="hidden md:block">
              <div className="flex items-center gap-3 text-[#FF7F32] font-black text-[11px] uppercase tracking-widest">
                <div className="w-2 h-2 rounded-full bg-[#FF7F32] animate-pulse" />
                Global Inventory Mode
              </div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.4em] mt-2">
                Verified by Mr. Tolet Network © 2026
              </p>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1 md:flex-none h-14 md:h-18 px-8 md:px-14 rounded-[16px] md:rounded-[24px] border-slate-200 text-slate-400 font-black uppercase text-[11px] tracking-widest hover:bg-slate-50 transition-all"
              >
                Cancel
              </Button>
              <Button
                form="admin-property-form"
                type="submit"
                disabled={isLoading}
                className="flex-[2] md:flex-none md:min-w-[320px] bg-[#FF7F32] hover:bg-[#e66a1f] text-white h-14 md:h-18 rounded-[16px] md:rounded-[24px] font-black text-sm md:text-lg shadow-2xl shadow-orange-500/30 transition-all active:scale-[0.98] border-none group px-8 md:px-12"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin mr-3" size={24} />
                ) : (
                  <>
                    <ListPlus className="mr-3 group-hover:scale-110 transition-transform" size={24} />
                    Publish Listing
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
