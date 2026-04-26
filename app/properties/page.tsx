"use client";

import { useState, useEffect } from "react";
import AddPropertyForm from "@/components/property/addpropertyform";
import PropertyCard from "@/components/property/propertycard";
import apiClient from "@/lib/apClient";
import { Loader2, Home } from "lucide-react";

export default function PropertiesPage() {
  const [properties, setProperties] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProperties = async () => {
    setIsLoading(true);
    try {
      const res = await apiClient.get(`/property/user/public?limit=8&page=1`);
      if (res.data.success) {
        const mapped = res.data.data.properties.map((prop: any) => {
          const rawUrl = prop.images?.[0]?.url || "";
          let fullImgUrl = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070";
          if (rawUrl) {
            if (rawUrl.startsWith("http")) fullImgUrl = rawUrl;
            else fullImgUrl = `https://module-project-tx70.onrender.com/uploads/${rawUrl.split('/').pop()}`;
          }
          return {
            image: fullImgUrl,
            title: prop.title,
            location: `${prop.locality || ""}, ${prop.city || ""}`,
            price: prop.price,
            beds: prop.bhk || 0,
            baths: prop.bathrooms || 0,
            sqft: prop.totalArea || 0,
            postedAt: new Date(prop.createdAt).toLocaleDateString(),
            slug: prop.slug
          };
        });
        setProperties(mapped);
      }
    } catch (error) {
      console.error("Failed to fetch properties:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50/30">
      
      {/* 🚀 FORM SECTION (Restored for the user) */}
      <section className="bg-white border-b border-slate-100 pt-32 pb-16 px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
             <h4 className="text-[#FF7F32] font-black text-xs uppercase tracking-[0.4em] mb-4">List your inventory</h4>
             <h1 className="text-4xl md:text-6xl font-black text-[#1a2b49] tracking-tighter mb-4">
               Partner With <span className="text-[#FF7F32]">Elite</span>
             </h1>
             <p className="text-slate-400 font-bold text-lg max-w-2xl mx-auto">
               Quickly upload your property details and reach thousands of high-intent buyers in our network.
             </p>
          </div>

          {/* Corrected component import case if necessary, but usually it's AddPropertyForm.tsx */}
          <AddPropertyForm />
        </div>
      </section>

    </main>
  );
}
