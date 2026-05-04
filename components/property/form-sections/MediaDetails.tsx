import { Camera, X, Video } from "lucide-react";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormSectionProps } from "@/types/property-form";

interface MediaDetailsProps extends FormSectionProps {
  images: string[];
  imageFiles: File[];
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement> | File[]) => void;
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
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!isLoading && images.length < 10) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (isLoading || images.length >= 10) return;
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleImageUpload(files);
    }
  };

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
        />
      </div>
      <div className="space-y-2">
        <Label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 ml-1">Photos & Videos ({images.length}/10)</Label>
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*,video/*" 
          multiple 
          onChange={(e) => handleImageUpload(e)} 
        />
        <div 
          onClick={() => images.length < 10 && !isLoading && fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-[40px] h-[260px] flex flex-col items-center justify-center text-center group/upload transition-all relative ${
            isDragging 
              ? 'border-[#FF7F32] bg-orange-50/30 scale-[1.02] shadow-xl' 
              : 'border-gray-100 bg-gray-50/30'
          } ${images.length < 10 && !isLoading ? 'cursor-pointer hover:border-[#FF7F32]/40 hover:bg-orange-50/20' : ''}`}
        >
          {images.length === 0 ? (
            <>
              <div className={`p-5 rounded-2xl mb-4 shadow-sm transition-all ${isDragging ? 'bg-[#FF7F32] text-white scale-110' : 'bg-white text-[#FF7F32]'}`}>
                <div className="flex gap-3">
                  <Camera className="w-8 h-8" />
                  <Video className="w-8 h-8" />
                </div>
              </div>
              <p className="text-sm font-black text-[#1a2b49]">
                {isDragging ? "Drop to Upload" : "Upload Media"}
              </p>
              <p className="text-[10px] text-gray-400 mt-2 font-bold uppercase tracking-widest">
                Drag & Drop or Click to Select
              </p>
            </>
          ) : (
            <div className="grid grid-cols-4 gap-4 w-full h-full p-6 overflow-y-auto">
              {images.map((img, index) => {
                const isVideo = img.includes("video/mp4") || img.includes("video/quicktime") || img.includes("video/x-matroska") || img.includes("video/webm");
                return (
                  <div key={index} className="relative group/img h-20">
                    {isVideo ? (
                      <video src={img} className="w-full h-full object-cover rounded-2xl" muted />
                    ) : (
                      <img src={img} alt={`Preview ${index}`} className="w-full h-full object-cover rounded-2xl" />
                    )}
                    <button 
                      type="button"
                      disabled={isLoading}
                      onClick={(e) => { e.stopPropagation(); removeImage(index); }}
                      className="absolute -top-2 -right-2 bg-white text-[#1a2b49] p-1 rounded-full shadow-xl hover:bg-red-500 hover:text-white transition-all scale-0 group-hover/img:scale-100 z-10"
                    >
                      <X size={12} />
                    </button>
                    {isVideo && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-2xl pointer-events-none">
                        <Video className="text-white w-6 h-6 opacity-80" />
                      </div>
                    )}
                  </div>
                );
              })}
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
