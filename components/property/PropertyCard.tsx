import { Bed, Bath, Square, MapPin, Bookmark, Plus } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";

interface PropertyProps {
  image: string;
  title: string;
  location: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  postedAt: string;
}

export default function PropertyCard({ property }: { property: PropertyProps }) {
  return (
    <Card className="bg-white rounded-[32px] p-5 shadow-sm border-gray-100 flex flex-col group hover:shadow-xl transition-all duration-300 border-none">
      <CardContent className="p-0 flex flex-col h-full">
        {/* Image Container */}
        <div className="relative h-52 w-full rounded-[24px] overflow-hidden mb-5">
          <Image 
            src={property.image} 
            alt={property.title} 
            fill 
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            <span className="bg-[#FF7F32] text-white text-[9px] font-bold px-3 py-1 rounded-md uppercase tracking-wider">
              Featured
            </span>
            <span className="bg-[#1a2b49] text-white text-[9px] font-bold px-3 py-1 rounded-md uppercase tracking-wider w-fit">
              For sale
            </span>
          </div>

          {/* Bookmark Button - Shadcn */}
          <Button 
            variant="ghost" 
            size="icon"
            className="absolute top-3 right-3 h-8 w-8 bg-black/20 backdrop-blur-sm rounded-md text-white hover:bg-[#FF7F32] hover:text-white border-none transition-colors"
          >
            <Bookmark size={14} fill="currentColor" />
          </Button>
        </div>

        {/* Content */}
        <h3 className="font-bold text-[17px] text-[#1a2b49] leading-tight mb-2 truncate">
          {property.title}
        </h3>
        
        <div className="flex items-center gap-1.5 text-gray-400 text-[11px] font-medium mb-4">
          <MapPin size={13} className="text-gray-300" />
          {property.location}
        </div>

        <div className="text-[#1a2b49] font-extrabold text-xl mb-4">
          ₹{property.price.toLocaleString()}
        </div>

        {/* Amenities */}
        <div className="flex justify-between items-center pb-4 mb-4 border-b border-gray-50 text-[#1a2b49] font-semibold text-[11px]">
          <div className="flex items-center gap-1.5">
            <Bed size={14} className="text-gray-400" /> Beds: {property.beds}
          </div>
          <div className="flex items-center gap-1.5">
            <Bath size={14} className="text-gray-400" /> Baths: {property.baths}
          </div>
          <div className="flex items-center gap-1.5">
            <Square size={14} className="text-gray-400" /> Sqft: {property.sqft}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-auto">
          {/* Compare Button - Shadcn */}
          <Button 
            variant="ghost" 
            className="h-auto p-0 flex items-center gap-1 text-[11px] font-bold text-[#1a2b49] hover:text-[#FF7F32] hover:bg-transparent transition-colors"
          >
            <span className="text-[#FF7F32] font-black">
              <Plus size={14} strokeWidth={4} />
            </span>
            Compare
          </Button>
          
          <span className="text-gray-400 text-[11px] font-medium">
            {property.postedAt}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}