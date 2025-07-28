import { Amenity } from "@/lib/data/amenities";

// Define a type for your user (example)
export interface User {
  id: string;
  name: string;
  email: string;
}

// Define a type for your app's theme (example)
export type Theme = "light" | "dark";

// Define a type for your app's routes (example)
export type Route = {
  path: string;
  component: React.ComponentType;
  exact?: boolean;
};

// Contact page type
export type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
};

// Service plan card
export interface Plan {
  title: string;
  duration: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  features: string[];
}

// Plans page
export interface MembershipStage {
  title: string;
  subtitle: string;
  completed: boolean;
}

// Bonus Progamme page
export interface Card {
  title: string;
  titleSub: string;
  amount: number;
  currency?: string;
  bgColor: string;
  borderColor: string;
  img: string;
  color: string;
}
export interface InviteDataItem {
  headTitle: string;
  points: string[];
}
// -------------------------

// Card type
export interface CardFeatures {
  rooms?: number;
  beds?: number;
  baths?: number;
  sqm?: number;
  floor?: number;
  maxPeople?: number;
}

export interface CommonCard {
  id: string;
  image: string;
  avatarImage: string;
  rating: string;
  ownerName: string;
  location: string;
  title: string;
  price: number;
  priceUnit?: string;
  features: CardFeatures;
  onViewDetails?: () => void;
}

// Dashboard data types
export interface AddPlaceData {
  location: {
    lat: number;
    lng: number;
  } | null;
  destination: {
    lat: number;
    lng: number;
  } | null;

  homeType: "home" | "apartment" | null;
  residenceType: "main" | "occasional" | null;

  selectedAmenities: {
    main: Amenity[];
    transport: Amenity[];
    surrounding: Amenity[];
  };

  homeName: string;
  homeDescription: string;
  areaDescription: string;
  photos: File[];
  availabilityType: "home" | "apartment" | null;
  availabilityDates: {
    start: Date | null;
    end: Date | null;
  };
}
