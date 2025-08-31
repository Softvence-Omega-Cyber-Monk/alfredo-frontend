// features/amenities/amenitiesSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

export interface AmenityItem {
  id: string;
  name: string;
  icon: string;
}

interface AmenitiesState {
  main: AmenityItem[];
  transport: AmenityItem[];
  surrounding: AmenityItem[];
  loading: boolean;
  error: string | null;
}

const initialState: AmenitiesState = {
  main: [],
  transport: [],
  surrounding: [],
  loading: false,
  error: null,
};

const config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

// Define thunks for each API
export const fetchMainAmenities = createAsyncThunk(
  "amenities/fetchMain",
  async () => {
    const res = await axios.get(`${baseURL}/onboarding/amenities`, config);
    return res.data.data as AmenityItem[];
  }
);

export const fetchTransportAmenities = createAsyncThunk(
  "amenities/fetchTransport",
  async () => {
    const res = await axios.get(`${baseURL}/onboarding/transports`, config);
    return res.data.data as AmenityItem[];
  }
);

export const fetchSurroundingAmenities = createAsyncThunk(
  "amenities/fetchSurrounding",
  async () => {
    const res = await axios.get(`${baseURL}/onboarding/surroundings`, config);
    return res.data.data as AmenityItem[];
  }
);

const amenitiesSlice = createSlice({
  name: "amenities",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Main
      .addCase(fetchMainAmenities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchMainAmenities.fulfilled,
        (state, action: PayloadAction<AmenityItem[]>) => {
          state.main = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchMainAmenities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to load main amenities";
      })
      // Transport
      .addCase(fetchTransportAmenities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchTransportAmenities.fulfilled,
        (state, action: PayloadAction<AmenityItem[]>) => {
          state.transport = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchTransportAmenities.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ?? "Failed to load transport amenities";
      })
      // Surrounding
      .addCase(fetchSurroundingAmenities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchSurroundingAmenities.fulfilled,
        (state, action: PayloadAction<AmenityItem[]>) => {
          state.surrounding = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchSurroundingAmenities.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ?? "Failed to load surrounding amenities";
      });
  },
});

export default amenitiesSlice.reducer;
