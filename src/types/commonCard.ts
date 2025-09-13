// In @/types/index.ts
export interface CommonCard {
  id: string;
  image: string;
  location: string;
  title: string;
  description?: string;
  price?: number;
  bedrooms?: number;
  bathrooms?: number;
  size?: number;
  isAvailable?: boolean;
  onViewDetails?: () => void;

  // Make these optional if they're not always available from API
  avatarImage?: string;
  rating?: number;
  ownerName?: string;
  features?: any[]; // or a more specific type if you have one
}
