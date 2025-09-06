// src/types/favorite.ts
export interface Property {
  id: string;
  title: string;
  description: string;
  location: string;
  country: string;
  price: number;
  size: number;
  bedrooms: number;
  bathrooms: number;
  images: { url: string; publicId: string }[];
  isAvailable: boolean;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  maxPeople?: number;
}

export interface CommonCardProps extends Property {
  avatarImage: string;
  rating: string;
  ownerName: string;
  features: {
    rooms?: number;
    beds?: number;
    baths?: number;
    sqm?: number;
    floor?: number;
    maxPeople?: number;
  };
  onViewDetails?: () => void;
}
