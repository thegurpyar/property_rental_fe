export interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  category: 'House' | 'Villa' | 'Apartment';
  isFeatured?: boolean;
}