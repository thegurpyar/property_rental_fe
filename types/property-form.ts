export interface PropertyFormData {
  title: string;
  purpose: string;
  category: string;
  price: string;
  priceType: string;
  bhk: string;
  bathrooms: string;
  totalArea: string;
  areaUnit: string;
  city: string;
  sector: string;
  locality: string;
  landmark: string;
  fullAddress: string;
  furnishing: string;
  parking: string;
  age: string;
  amenities: string[];
  description: string;
}

export interface FormSectionProps {
  formData: PropertyFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleAmenityToggle?: (amenity: string) => void;
  isLoading?: boolean;
}
