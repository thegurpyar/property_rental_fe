"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import {
  Home, CheckCircle2, Loader2
} from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import apiClient from "@/lib/apClient";
import { PropertyFormData } from "@/types/property-form";
import { toast } from "sonner";

// Import Refactored Sections
import { BasicDetails } from "./form-sections/BasicDetails";
import { LocationDetails } from "./form-sections/LocationDetails";
import { AmenitiesDetails } from "./form-sections/AmenitiesDetails";
import { MediaDetails } from "./form-sections/MediaDetails";

export default function AddPropertyForm() {
  const router = useRouter();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [images, setImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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

  // 📝 LOAD SAVED DATA FROM LOCALSTORAGE ON MOUNT
  useEffect(() => {
    const savedData = localStorage.getItem("pendingPropertyData");
    const savedImages = localStorage.getItem("pendingPropertyImages");

    if (savedData || savedImages) {
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);
          setFormData(prev => ({ ...prev, ...parsedData }));
        } catch (err) {
          console.error("Failed to restore property data:", err);
        }
      }

      if (savedImages) {
        try {
          const parsedImages = JSON.parse(savedImages);
          setImages(parsedImages);
          
          // Convert base64 strings back to File objects for submission
          const restoredFiles = parsedImages.map((base64: string, index: number) => {
            const [header, data] = base64.split(",");
            const mime = header.match(/:(.*?);/)?.[1] || "image/png";
            const binary = atob(data);
            const array = [];
            for (let i = 0; i < binary.length; i++) {
              array.push(binary.charCodeAt(i));
            }
            const blob = new Blob([new Uint8Array(array)], { type: mime });
            return new File([blob], `restored-image-${index}.png`, { type: mime });
          });
          setImageFiles(restoredFiles);
        } catch (err) {
          console.error("Failed to restore images:", err);
        }
      }

      toast.info("Form Restored", {
        id: "form-restored-toast", // deduplicate toasts
        description: "We've restored your previously filled details and images."
      });
    }
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const remainingSlots = 10 - images.length;
    const selectedFiles = files.slice(0, remainingSlots);

    if (selectedFiles.length === 0) return;

    // Process all files and wait for them to finish
    try {
      const filePromises = selectedFiles.map(file => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
      });

      const newImageResults = await Promise.all(filePromises);
      
      setImages(prev => [...prev, ...newImageResults].slice(0, 10));
      setImageFiles(prev => [...prev, ...selectedFiles].slice(0, 10));
    } catch (err) {
      console.error("Image processing error:", err);
      toast.error("Failed to process one or more images.");
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImageFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 🔐 AUTH CHECK
    const token = Cookies.get("accessToken");
    if (!token) {
      // 💾 Save both form data and the base64 images
      localStorage.setItem("pendingPropertyData", JSON.stringify(formData));
      localStorage.setItem("pendingPropertyImages", JSON.stringify(images));

      toast.info("Authentication Required", {
        description: "Please login to publish your listing. We've saved your progress."
      });
      // Redirect to login with callback to return here
      const callbackPath = window.location.pathname;
      router.push(`/login?callbackUrl=${encodeURIComponent(callbackPath)}`);
      return;
    }

    if (imageFiles.length < 3) return toast.error("Please upload at least 3 images.");

    setIsLoading(true);
    try {
      /**
       * 🚀 STEP 1: UPLOAD ACTUAL IMAGES
       */
      const uploadedImagePaths: { url: string }[] = [];
      
      // We use a for-of loop to upload sequentially and ensure all finish
      for (const file of imageFiles) {
        const formDataUpload = new FormData();
        formDataUpload.append("file", file);
        
        console.log(`Uploading: ${file.name}...`);
        const uploadRes = await apiClient.post("/fileupload", formDataUpload, {
          headers: { "Content-Type": "multipart/form-data" }
        });

        if (uploadRes.data.success) {
          // Extract the key and format it for the property model (e.g., /uploads/filename.webp)
          const fileKey = uploadRes.data.data.key;
          uploadedImagePaths.push({ url: `/uploads/${fileKey}` });
        }
      }

      if (uploadedImagePaths.length < 3) {
        throw new Error("Failed to upload minimum required images.");
      }

      /**
       * 🎯 STEP 2: SUBMIT PROPERTY JSON
       */
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
        amenities: formData.amenities,
        images: uploadedImagePaths // Using the real server-generated paths
      };

      console.log("Publishing Final Property Data:", payload);
      const response = await apiClient.post("/property/user", payload);

      if (response.data.success) {
        toast.success("Listing Published!", {
          description: "Your property is now live and visible to the Tricity real estate engine."
        });

        // ✨ CLEANUP: REMOVE DRAFTS FROM LOCALSTORAGE
        localStorage.removeItem("pendingPropertyData");
        localStorage.removeItem("pendingPropertyImages");

        // ✨ RESET STATE AFTER SUCCESS
        setFormData({
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
          amenities: [],
          description: "",
        });
        setImages([]);
        setImageFiles([]);
        if (fileInputRef.current) fileInputRef.current.value = "";

        router.push("/property");
      }
    } catch (error: any) {
      console.error("Submission Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || error.message || "Failed to publish property.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="group rounded-[48px] border border-gray-100 bg-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.06)] relative overflow-visible"
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 opacity-0 group-hover:opacity-100 rounded-[48px]"
        style={{ background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,127,50,0.04), transparent 40%)` }}
      />

      {/* Header */}
      <div className="bg-white p-10 pb-6 border-b border-gray-50 rounded-t-[48px]">
        <div className="flex items-center gap-4">
          <div className="bg-[#FF7F32] p-3 rounded-2xl shadow-lg shadow-orange-500/20 text-white">
            <Home size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-black text-[#1a2b49] tracking-tighter">List Your Property</h3>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Verified Tricity Real Estate Engine</p>
          </div>
        </div>
      </div>

      <CardContent className="p-8 md:p-12 space-y-20 bg-white relative z-10 rounded-b-[48px]">
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
            className="w-full bg-[#FF7F32] hover:bg-orange-600 text-white h-auto py-7 rounded-3xl font-black text-xl shadow-2xl shadow-orange-500/30 transition-all active:scale-[0.98] border-none group"
          >
            {isLoading ? <Loader2 className="animate-spin mr-2" /> : "Publish Property Listing"}
            {!isLoading && <CheckCircle2 size={24} className="ml-2 group-hover:rotate-12 transition-transform" />}
          </Button>

          <p className="text-center text-[11px] text-gray-400 flex items-center justify-center gap-2 font-bold uppercase tracking-[0.2em]">
            Verified by Mr. Tolet Network 2026
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
