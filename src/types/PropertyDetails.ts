// interface Badge {
//   color: string;
//   icon: React.ElementType;
// }

// interface Verification {
//   bgColor: string;
//   iconColor: string;
//   icon: React.ElementType;
//   text: string;
// }

export interface OwnerDetails {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string | null;
  photo: string | null;
  age: number | null;
  dateOfBirth: string | null;
  identification: string | null;
  languagePreference: string | null;
  city: string[];
  password: string;
  resetToken: string | null;
  resetTokenExpiry: string | null;
  isSubscribed: boolean;
  achievementBadges: string[];
  paymentCardNumber: string[];
  role: string;
  createdAt: string;
  updatedAt: string;
  referralCode: string;
  referredBy: string;
  balance: number;
  totalReferrals: number;
  hasOnboarded: boolean;
}

export interface PropertyImage {
  id: string;
  url: string;
}

export interface PropertyDetails {
  id: string;
  title: string;
  description: string;
  location: string;
  country: string;
  price: number;
  size: number;
  bedrooms: number;
  bathrooms: number;
  images: PropertyImage[];
  isAvailable: boolean;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  owner: OwnerDetails;
}
