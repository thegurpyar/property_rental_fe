export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  category: 'House' | 'Villa' | 'Apartment';
  status: string;
  isFeatured?: boolean;
  postedAt: string;
}