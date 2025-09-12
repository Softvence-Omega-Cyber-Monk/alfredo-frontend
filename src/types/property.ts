export interface Property {
  title: string;
  description: string;
  location: string;
  country: string;
  price: number;
  size: number;
  bedrooms: number;
  bathrooms: number;

  // New fields from payload
  propertyType: "HOME" | "APARTMENT";
  maxPeople: number;
  isTravelWithPets: boolean;
  availabilityStartDate: string; // ISO date string (e.g. "2025-09-15")
  availabilityEndDate: string; // ISO date string
  amenities: string[]; // amenity IDs
  transports: string[]; // transport IDs
  surroundings: string[]; // surrounding IDs

  // Existing field
  isAvailable: boolean;
}
