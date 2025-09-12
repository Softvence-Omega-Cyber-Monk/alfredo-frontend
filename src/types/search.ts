
export interface SearchParams {
  destination?: string;
  propertyType?: string;
  availabilityStartDate?: string;
  maxPeople?: number;
}

export interface OnboardingData {
  id: string;
  userId: string;
  homeAddress: string;
  destination: string;
  ageRange: string;
  gender: string;
  employmentStatus: string;
  travelType: string[];
  favoriteDestinations: string[];
  travelMostlyWith: string;
  isTravelWithPets: boolean;
  notes: string;
  hasOnBoarded: boolean;
  maxPeople: number;
  propertyType: string;
  isMainResidence: boolean;
  homeName: string;
  homeDescription: string;
  aboutNeighborhood: string;
  homeImages: string[];
  isAvailableForExchange: boolean;
  availabilityStartDate: string;
  availabilityEndDate: string;
  amenities: Array<{id: string, name: string, icon: string}>;
  transports: Array<{id: string, name: string, icon: string}>;
  surroundings: Array<{id: string, name: string, icon: string}>;
}

export interface ApiResponse {
  status: number;
  success: boolean;
  message: string;
  data: OnboardingData[];
}



// src/services/types.ts

// export interface PropertyImage {
//   url: string;
//   publicId: string;
// }

// export interface Owner {
//   id: string;
//   fullName: string;
//   email: string;
//   phoneNumber: string | null;
//   photo: string | null;
//   role: string;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface OnboardingData {
//   id: string;
//   title: string;
//   description: string;
//   location: string;
//   country: string;
//   price: number;
//   size: number;
//   bedrooms: number;
//   bathrooms: number;
//   images: PropertyImage[];
//   maxPeople: number;
//   propertyType: string;
//   availabilityStartDate: string;
//   availabilityEndDate: string;
//   isTravelWithPets: boolean;
//   owner: Owner;
//   amenities: Array<{ id: string; name: string }>;
// }

// export interface ApiResponse {
//   data: OnboardingData[];
//   meta: {
//     total: number;
//     page: number;
//     limit: number;
//     totalPages: number;
//   };
// }
