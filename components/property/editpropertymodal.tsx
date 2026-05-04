"use client";

import { useState, useRef, useEffect } from "react";
import { X, Home, CheckCircle2, Loader2, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import apiClient from "@/lib/apClient";
import { toast } from "sonner";
import { BasicDetails } from "../../components/property/form-sections/BasicDetails";
import { LocationDetails } from "../../components/property/form-sections/LocationDetails";
import { AmenitiesDetails } from "../../components/property/form-sections/AmenitiesDetails";
import { MediaDetails } from "../../components/property/form-sections/MediaDetails";

interface EditPropertyModalProps {
  property: any;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

export default function EditPropertyModal({ property, isOpen, onClose, onUpdate }: EditPropertyModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: property.title || "",
    purpose: property.purpose || "rent",
    category: property.category || "apartment",
    price: property.price.toString() || "",
    priceType: property.priceType || "monthly",
    bhk: property.bhk.toString() || "",
    bathrooms: property.bathrooms.toString() || "",
    totalArea: property.totalArea.toString() || "",
    areaUnit: property.areaUnit || "sqft",
    city: property.city || "",
    sector: property.sector || "",
    locality: property.locality || "",
    landmark: property.landmark || "",
    fullAddress: property.fullAddress || "",
    furnishing: property.furnishing || "unfurnished",
    parking: property.parking || "car",
    age: property.age.toString() || "",
    amenities: property.amenities || [],
    description: property.description || "",
  });

  const [images, setImages] = useState<string[]>(property.images?.map((img: any) => img.url) || []);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && property) {
      setFormData({
        title: property.title || "",
        purpose: property.purpose || "rent",
        category: property.category || "apartment",
        price: property.price?.toString() || "",
        priceType: property.priceType || "monthly",
        bhk: property.bhk?.toString() || "",
        bathrooms: property.bathrooms?.toString() || "",
        totalArea: property.totalArea?.toString() || "",
        areaUnit: property.areaUnit || "sqft",
        city: property.city || "",
        sector: property.sector || "",
        locality: property.locality || "",
        landmark: property.landmark || "",
        fullAddress: property.fullAddress || "",
        furnishing: property.furnishing || "unfurnished",
        parking: property.parking || "car",
        age: property.age?.toString() || "",
        amenities: property.amenities || [],
        description: property.description || "",
      });
      setImages(property.images?.map((img: any) => img.url) || []);
      setImageFiles([]);
    }
  }, [isOpen, property]);

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
        ? prev.amenities.filter((a: string) => a !== amenity)
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
      toast.error("Failed to process one or more files.");
    }
  };

  const removeImage = (index: number) => {
    const itemToRemove = images[index];
    setImages(prev => prev.filter((_, i) => i !== index));
    
    if (itemToRemove.startsWith('data:')) {
      const base64Index = images.slice(0, index).filter(img => img.startsWith('data:')).length;
      setImageFiles(prev => prev.filter((_, i) => i !== base64Index));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      /**
       * 🚀 STEP 1: UPLOAD NEW MEDIA
       */
      const uploadedImagePaths: { url: string }[] = [];
      for (const file of imageFiles) {
        const formDataUpload = new FormData();
        formDataUpload.append("file", file);

        const uploadRes = await apiClient.post("/fileupload", formDataUpload, {
          headers: { "Content-Type": "multipart/form-data" }
        });

        if (uploadRes.data.success) {
          const fileKey = uploadRes.data.data.key;
          uploadedImagePaths.push({ url: `/uploads/${fileKey}` });
        }
      }

      /**
       * 🎯 STEP 2: COMBINE WITH EXISTING MEDIA
       */
      const existingImages = images
        .filter(img => !img.startsWith('data:'))
        .map(url => ({ url }));

      const finalImages = [...existingImages, ...uploadedImagePaths];

      const payload = {
        ...formData,
        price: Number(formData.price) || 0,
        bhk: Number(formData.bhk) || 0,
        bathrooms: Number(formData.bathrooms) || 0,
        totalArea: Number(formData.totalArea) || 0,
        age: Number(formData.age) || 0,
        coordinates: property.coordinates,
        images: finalImages
      };

      const res = await apiClient.put(`/property/user/${property._id}`, payload);
      if (res.data.success) {
        toast.success("Property Updated Successfully!");
        onUpdate();
        onClose();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update property.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <div className="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto no-scrollbar rounded-[48px] shadow-2xl relative animate-in zoom-in-95 duration-300">
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 hover:text-rose-500 transition-colors z-20"
        >
          <X size={24} />
        </button>

        <div className="p-10 border-b border-slate-50 flex items-center gap-6">
          <div className="w-16 h-16 bg-[#FF7F32] rounded-3xl flex items-center justify-center text-white shadow-xl shadow-orange-500/20">
            <Pencil size={28} />
          </div>
          <div>
            <h2 className="text-4xl font-black text-[#1a2b49] tracking-tighter">Edit Property</h2>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-1">Refine your listing details</p>
          </div>
        </div>

        <div className="p-10 md:p-16">
          <form onSubmit={handleSubmit} className="space-y-16">
            <BasicDetails 
              formData={formData} 
              handleInputChange={handleInputChange} 
              handleSelectChange={handleSelectChange} 
            />
            <LocationDetails 
              formData={formData} 
              handleInputChange={handleInputChange} 
              handleSelectChange={handleSelectChange} 
            />
            <AmenitiesDetails 
              formData={formData} 
              handleInputChange={handleInputChange} 
              handleSelectChange={handleSelectChange} 
              handleAmenityToggle={handleAmenityToggle}
            />

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

            <Button 
              type="submit" 
              disabled={isLoading} 
              className="w-full bg-[#FF7F32] hover:bg-orange-600 text-white h-auto py-7 rounded-[32px] font-black text-xl shadow-2xl shadow-orange-500/30 transition-all active:scale-[0.98] border-none group"
            >
              {isLoading ? <Loader2 className="animate-spin mr-2" /> : "Save Changes"}
              {!isLoading && <CheckCircle2 size={24} className="ml-2 group-hover:rotate-12 transition-transform" />}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
