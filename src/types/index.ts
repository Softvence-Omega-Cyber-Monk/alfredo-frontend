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

  homeAddress?: string;
  destinationAddress?: string; // New field

  homeType: "HOME" | "APARTMENT" | null;
  residenceType: boolean | null;

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

//onboarding

export type AgeGroup = "18–30" | "30–50" | "50–65" | "65+";
export type Gender = "Male" | "Female" | "Not Specified";
export type Role = "Worker" | "Retired" | "Student" | "Unemployed";
export type TravelType =
  | "Business"
  | "Leisure"
  | "Adventure"
  | "Family"
  | "Solo"
  | "Cultural";
export type DestinationType =
  | "Big Cities"
  | "Small Cities"
  | "Seaside"
  | "Mountain";
export type TravelGroup =
  | "By Myself"
  | "With Family"
  | "With a Partner"
  | "With Friends";
export type TravelWithPets = "Business trips" | "Leisure trips" | "Both";

// Define a flattened form state
export interface OnboardingPayload {
  id?: string;
  userId?: string;
  location: {
    lat: number;
    lng: number;
  } | null;
  destinationCords: {
    lat: number;
    lng: number;
  } | null;
  homeAddress?: string;
  destination?: string;
  ageRange?: AgeGroup;
  gender?: Gender;
  employmentStatus?: Role;
  travelType?: TravelType;
  favoriteDestinations?: DestinationType[];
  travelMostlyWith?: TravelGroup;
  isTravelWithPets?: boolean;
  notes?: string;
  propertyType?: "home" | "apartment";
  isMainResidence?: boolean | null;
  amenities?: string[];
  transports?: string[];
  surroundings?: string[];
  homeName?: string;
  homeDescription?: string;
  aboutNeighborhood?: string;
  homeImages?: string[];
  availabilityStartDate?: string; // ISO string
  availabilityEndDate?: string;
}
