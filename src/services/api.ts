import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': '*/*',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

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

export const searchOnboarding = async (params: SearchParams): Promise<ApiResponse> => {
  try {
    const response = await api.get<ApiResponse>('/onboarding', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching onboarding data:', error);
    throw error;
  }
};

export default api;


// import axios from 'axios';

// const API_BASE_URL = import.meta.env.VITE_API_URL;

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//     'Accept': '*/*',
//   },
// });

// export interface SearchParams {
//   destination?: string;
//   propertyType?: string;
//   availabilityStartDate?: string;
//   maxPeople?: number;
// }

// export interface OnboardingData {
//   id: string;
//   userId: string;
//   homeAddress: string;
//   destination: string;
//   ageRange: string;
//   gender: string;
//   employmentStatus: string;
//   travelType: string[];
//   favoriteDestinations: string[];
//   travelMostlyWith: string;
//   isTravelWithPets: boolean;
//   notes: string;
//   hasOnBoarded: boolean;
//   maxPeople: number;
//   propertyType: string;
//   isMainResidence: boolean;
//   homeName: string;
//   homeDescription: string;
//   aboutNeighborhood: string;
//   homeImages: string[];
//   isAvailableForExchange: boolean;
//   availabilityStartDate: string;
//   availabilityEndDate: string;
//   amenities: Array<{id: string, name: string, icon: string}>;
//   transports: Array<{id: string, name: string, icon: string}>;
//   surroundings: Array<{id: string, name: string, icon: string}>;
// }

// export interface ApiResponse {
//   status: number;
//   success: boolean;
//   message: string;
//   data: OnboardingData[];
// }

// export const searchOnboarding = async (params: SearchParams): Promise<ApiResponse> => {
//   try {
//     const response = await api.get<ApiResponse>('/onboarding', { params });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching onboarding data:', error);
//     throw error;
//   }
// };

// export default api;