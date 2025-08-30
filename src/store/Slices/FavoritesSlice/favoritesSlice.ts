import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { favoritesService } from '@/services/favoritesService';
import { Property } from '@/types/favorite';

interface FavoritesState {
  favorites: Property[];
  loading: boolean;
  error: string | null;
}

const initialState: FavoritesState = {
  favorites: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchFavorites = createAsyncThunk(
  'favorites/fetchFavorites',
  async (_, { rejectWithValue }) => {
    try {
      return await favoritesService.getFavorites();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch favorites');
    }
  }
);

export const addFavorite = createAsyncThunk(
  'favorites/addFavorite',
  async (propertyId: string, { rejectWithValue }) => {
    try {
      await favoritesService.addFavorite(propertyId);
      return propertyId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add favorite');
    }
  }
);

export const removeFavorite = createAsyncThunk(
  'favorites/removeFavorite',
  async (propertyId: string, { rejectWithValue }) => {
    try {
      await favoritesService.removeFavorite(propertyId);
      return propertyId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to remove favorite');
    }
  }
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    clearFavorites: (state) => {
      state.favorites = [];
    },
    setFavorites: (state, action: PayloadAction<Property[]>) => {
      state.favorites = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch favorites
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action: PayloadAction<Property[]>) => {
        state.loading = false;
        state.favorites = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to fetch favorites';
      })
      // Add favorite
      .addCase(addFavorite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addFavorite.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        // We don't add the property here since we don't have the full data
        // We'll refetch the favorites list instead
      })
      .addCase(addFavorite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to add favorite';
      })
      // Remove favorite
      .addCase(removeFavorite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFavorite.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.favorites = state.favorites.filter(fav => fav.id !== action.payload);
      })
      .addCase(removeFavorite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to remove favorite';
      });
  },
});

export const { clearFavorites, setFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;


// // src/store/slices/favoritesSlice.ts
// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import { favoritesService } from '@/services/favoritesService';
// import { Property } from '@/types/favorite';

// interface FavoritesState {
//   favorites: Property[];
//   loading: boolean;
//   error: string | null;
// }

// const initialState: FavoritesState = {
//   favorites: [],
//   loading: false,
//   error: null,
// };

// // Async thunks
// export const fetchFavorites = createAsyncThunk(
//   'favorites/fetchFavorites',
//   async () => {
//     return await favoritesService.getFavorites();
//   }
// );

// export const addFavorite = createAsyncThunk(
//   'favorites/addFavorite',
//   async (propertyId: string) => {
//     return await favoritesService.addFavorite(propertyId);
//   }
// );

// export const removeFavorite = createAsyncThunk(
//   'favorites/removeFavorite',
//   async (propertyId: string) => {
//     return await favoritesService.removeFavorite(propertyId);
//   }
// );

// const favoritesSlice = createSlice({
//   name: 'favorites',
//   initialState,
//   reducers: {
//     clearFavorites: (state) => {
//       state.favorites = [];
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Fetch favorites
//       .addCase(fetchFavorites.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchFavorites.fulfilled, (state, action: PayloadAction<Property[]>) => {
//         state.loading = false;
//         state.favorites = action.payload;
//       })
//       .addCase(fetchFavorites.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || 'Failed to fetch favorites';
//       })
//       // Add favorite
//       .addCase(addFavorite.fulfilled, (state, action) => {
//         // The API returns the favorite relationship, not the property
//         // We'll need to handle this differently - either refetch or update optimistically
//       })
//       // Remove favorite
//       .addCase(removeFavorite.fulfilled, (state, action) => {
//         // Similar to addFavorite, we need to handle this
//       });
//   },
// });

// export const { clearFavorites } = favoritesSlice.actions;
// export default favoritesSlice.reducer;