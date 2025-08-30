
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
