import { Camera, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormSectionProps } from "@/types/property-form";

interface MediaDetailsProps extends FormSectionProps {
  images: string[];
  imageFiles: File[];
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeImage: (index: number) => void;
}

export function MediaDetails({ 
  formData, 
  handleInputChange, 
  images, 
  fileInputRef, 
  handleImageUpload, 
  removeImage,
  isLoading 
}: MediaDetailsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="space-y-2">
        <Label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 ml-1">Description</Label>
        <Textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Mention nearby landmarks, road connectivity, condition, etc."
          className="bg-gray-50 border-gray-200 rounded-[32px] p-6 min-h-[260px] text-sm text-[#1a2b49] focus:bg-white transition-all outline-none resize-none shadow-sm"
          required
        />
      </div>
      <div className="space-y-2">
        <Label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 ml-1">Property Images ({images.length}/10)</Label>
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*" 
          multiple 
          onChange={handleImageUpload} 
        />
        <div 
          onClick={() => images.length < 10 && !isLoading && fileInputRef.current?.click()}
          className={`border-2 border-dashed border-gray-100 rounded-[40px] h-[260px] flex flex-col items-center justify-center text-center group/upload transition-all bg-gray-50/30 relative ${images.length < 10 && !isLoading ? 'cursor-pointer hover:border-[#FF7F32]/40 hover:bg-orange-50/20' : ''}`}
        >
          {images.length === 0 ? (
            <>
              <div className="bg-white p-5 rounded-2xl mb-4 shadow-sm group-hover/upload:scale-110 transition-transform">
                <Camera className="text-[#FF7F32] w-8 h-8" />
              </div>
              <p className="text-sm font-black text-[#1a2b49]">Upload Minimum 3 Photos</p>
              <p className="text-[10px] text-gray-400 mt-2 font-bold uppercase tracking-widest">Max 10 Photos Supported</p>
            </>
          ) : (
            <div className="grid grid-cols-4 gap-4 w-full h-full p-6 overflow-y-auto">
              {images.map((img, index) => (
                <div key={index} className="relative group/img h-20">
                  <img src={img} alt={`Preview ${index}`} className="w-full h-full object-cover rounded-2xl" />
                  <button 
                    type="button"
                    disabled={isLoading}
                    onClick={(e) => { e.stopPropagation(); removeImage(index); }}
                    className="absolute -top-2 -right-2 bg-white text-[#1a2b49] p-1 rounded-full shadow-xl hover:bg-red-500 hover:text-white transition-all scale-0 group-hover/img:scale-100"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
              {images.length < 10 && !isLoading && (
                <div className="border-2 border-dashed border-gray-200 rounded-2xl h-20 flex items-center justify-center hover:border-[#FF7F32] hover:bg-white transition-all">
                  <Camera className="text-gray-300 w-5 h-5" />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
