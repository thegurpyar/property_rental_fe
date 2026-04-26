import { Property } from "@/types";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Property", href: "/properties" },
  { label: "Approvals", href: "/approvals" },
  { label: "Contact", href: "/contact" },
];

export const HERO_STATS = [
  { value: "50K+", label: "Happy Clients" },
  { value: "200+", label: "Properties" },
  { value: "4.5", label: "Rating" },
];

export const MOCK_PROPERTIES: Property[] = [
  {
    id: "1",
    title: "Spacious & Luxurious in Dubai",
    location: "Downtown, Dubai, UAE",
    price: 7500,
    beds: 4, baths: 2, sqft: 1150,
    category: "House",
    status: "For Sale",
    isFeatured: true,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
    postedAt: "6 months ago",
  },
  {
    id: "2",
    title: "Spacious & Luxurious in Dubai",
    location: "Downtown, Dubai, UAE",
    price: 7500,
    beds: 4, baths: 2, sqft: 1150,
    category: "Villa",
    status: "For Sale",
    isFeatured: true,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
    postedAt: "1 years ago",
  },
  {
    id: "3",
    title: "Spacious & Luxurious in Dubai",
    location: "Downtown, Dubai, UAE",
    price: 7500,
    beds: 4, baths: 2, sqft: 1150,
    category: "House",
    status: "For Sale",
    isFeatured: true,
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&q=80",
    postedAt: "1 months ago",
  },
  {
    id: "4",
    title: "Spacious & Luxurious in Dubai",
    location: "Downtown, Dubai, UAE",
    price: 7500,
    beds: 4, baths: 2, sqft: 1150,
    category: "Apartment",
    status: "For Sale",
    isFeatured: true,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80",
    postedAt: "3 months ago",
  },
  {
    id: "5",
    title: "Spacious & Luxurious in Dubai",
    location: "Downtown, Dubai, UAE",
    price: 7500,
    beds: 4, baths: 2, sqft: 1150,
    category: "Villa",
    status: "For Sale",
    isFeatured: true,
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80",
    postedAt: "2 months ago",
  },
  {
    id: "6",
    title: "Spacious & Luxurious in Dubai",
    location: "Downtown, Dubai, UAE",
    price: 7500,
    beds: 4, baths: 2, sqft: 1150,
    category: "Apartment",
    status: "For Sale",
    isFeatured: false,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80",
    postedAt: "5 months ago",
  },
  {
    id: "7",
    title: "Spacious & Luxurious in Dubai",
    location: "Downtown, Dubai, UAE",
    price: 7500,
    beds: 4, baths: 2, sqft: 1150,
    category: "House",
    status: "For Sale",
    isFeatured: true,
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80",
    postedAt: "4 months ago",
  },
  {
    id: "8",
    title: "Spacious & Luxurious in Dubai",
    location: "Downtown, Dubai, UAE",
    price: 7500,
    beds: 4, baths: 2, sqft: 1150,
    category: "Villa",
    status: "For Sale",
    isFeatured: false,
    image: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=600&q=80",
    postedAt: "7 months ago",
  },
];
export const PROPERTY_CATEGORIES = [
  "flat", "apartment", "house", "villa", "studio", "pg", "shop", "office", "plot", "warehouse"
];

export const TRICITY_MAP = {
  chandigarh: {
    name: "Chandigarh",
    sectors: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
      14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
      26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37,
      38, 39, 40, 41, 42, 43, 44, 45, 46, 47,
      48, 49, 50, 51, 52, 53, 54, 55, 56,
      57, 58, 59, 60, 61, 62, 63
    ]
  },

  mohali: {
    name: "Mohali (SAS Nagar)",
    sectors: [
      48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
      60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71,
      72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83,
      84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95,
      96, 97, 98, 99, 100, 101, 102, 103, 104, 105,
      106, 107, 108, 109, 110, 111, 112, 113, 114,
      115, 116, 117, 118, 119, 120, 121, 122, 123,
      124, 125, 126, 127, 128
    ]
  },

  panchkula: {
    name: "Panchkula",
    sectors: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, "12A",
      14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
      26, 27, 28, 29, 30, 31
    ]
  },

  zirakpur: {
    name: "Zirakpur",
    sectors: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16
    ]
  },

  kharar: {
    name: "Kharar",
    sectors: [
   "Sector 125", "Sector 126",
      "Sector 127", "Sector 128"
    ]
  }
};

export const CITIES = Object.keys(TRICITY_MAP).map(key => ({
  id: key,
  name: TRICITY_MAP[key as keyof typeof TRICITY_MAP].name
}));

export const FURNISHING_STATUS = [
  { label: "Unfurnished", value: "unfurnished" },
  { label: "Semi-Furnished", value: "semi-furnished" },
  { label: "Fully-Furnished", value: "fully-furnished" }
];

export const PARKING_TYPES = [
  { label: "Car Parking", value: "car" },
  { label: "Two Wheeler", value: "bike" },
  { label: "Both", value: "both" },
  { label: "None", value: "none" }
];

export const AMENITIES_LIST = [
  { label: "Lift", value: "lift" },
  { label: "Gym", value: "gym" },
  { label: "Power Backup", value: "power_backup" },
  { label: "Swimming Pool", value: "swimming_pool" },
  { label: "Security", value: "security" },
  { label: "Clubhouse", value: "clubhouse" },
  { label: "Park", value: "park" },
  { label: "Near Market", value: "near_market" }
];

export const AREA_UNITS = [
  { label: "Sq Ft", value: "sqft" },
  { label: "Sq M", value: "sqm" },
  { label: "Marla", value: "marla" },
  { label: "Kanal", value: "kanal" },
  { label: "Acre", value: "acre" }
];
