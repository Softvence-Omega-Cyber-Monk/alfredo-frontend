import { Property } from "@/types/favorite";
import api from "./api";

export interface FavoriteResponse {
  id: string;
  userId: string;
  propertyId: string;
}

export const favoritesService = {
  // Add property to favorites
  addFavorite: async (propertyId: string): Promise<FavoriteResponse> => {
    try {
      const response = await api.post("/property/favorite", { propertyId });
      return response.data.data;
    } catch (error) {
      console.error("Error adding favorite:", error);
      throw error;
    }
  },

  // Remove property from favorites
  removeFavorite: async (propertyId: string): Promise<{ count: number }> => {
    try {
      const response = await api.delete(`/property/favorite/${propertyId}`);
      return response.data.data;
    } catch (error) {
      console.error("Error removing favorite:", error);
      throw error;
    }
  },

  // Get user's favorite properties
  getFavorites: async (): Promise<Property[]> => {
    try {
      const response = await api.get("/property/user/favorite");
      return response.data.data;
    } catch (error) {
      console.error("Error fetching favorites:", error);
      throw error;
    }
  },
};

// import { Property } from '@/types/favorite';
// import api from './api';

// export interface FavoriteResponse {
//   id: string;
//   userId: string;
//   propertyId: string;
// }

// export const favoritesService = {
//   // Add property to favorites
//   addFavorite: async (propertyId: string): Promise<FavoriteResponse> => {
//     const response = await api.post('/property/favorite', { propertyId });
//     return response.data.data;
//   },

//   // Remove property from favorites
//   removeFavorite: async (propertyId: string): Promise<{ count: number }> => {
//     const response = await api.delete(`/property/favorite/${propertyId}`);
//     return response.data.data;
//   },

//   // Get user's favorite properties
//   getFavorites: async (): Promise<Property[]> => {
//     const response = await api.get('/property/user/favorite');
//     return response.data.data;
//   },
// };
