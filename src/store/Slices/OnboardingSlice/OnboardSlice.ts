import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/services/api";

export interface OnboardingPayload {
  userId: string | null;
  homeAddress?: string;
  destination?: string;
  ageRange: string;
  gender: string;
  employmentStatus: string;
  travelType: string[];
  favoriteDestinations: string[];
  travelMostlyWith: string;
  isTravelWithPets: boolean;
  maxPeople: number;
  notes: string;
  address?: string;
  propertyType: "HOME" | "APARTMENT" | "BOAT" | "VAN" | "ROOM" | null;
  isMainResidence: boolean | null;
  amenities: string[];
  transport: string[];
  surroundings: string[];
  homeName: string;
  homeDescription: string;
  aboutNeighborhood: string;

  availabilityStartDate: string | null;
  availabilityEndDate: string | null;
}

interface OnboardingState {
  data: OnboardingPayload | null;
  list: OnboardingPayload[];
  loading: boolean;
  error: string | { statusCode: number; message: string } | null;
}

const initialState: OnboardingState = {
  data: null,
  list: [],
  loading: false,
  error: null,
};

//  POST: submit onboarding data
export const postOnboarding = createAsyncThunk(
  "onboarding/postOnboarding",
  async (payload: FormData, { rejectWithValue }) => {
    try {
      const response = await api.post("/onboarding", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Error posting onboarding");
    }
  }
);

//  GET: fetch onboarding data
export const getOnboarding = createAsyncThunk(
  "onboarding/getOnboarding",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/onboarding/user");
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Error fetching onboarding");
    }
  }
);

//  DELETE: remove gallery image
export const deleteGalleryImage = createAsyncThunk(
  "onboarding/deleteGalleryImage",
  async (imageUrl: string, { rejectWithValue }) => {
    try {
      const response = await api.delete("/onboarding/gallery-image", {
        data: { imageUrl },
      });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Error deleting image");
    }
  }
);

//  POST: upload gallery images
export const uploadGalleryImages = createAsyncThunk(
  "onboarding/uploadGalleryImages",
  async (files: File[], { rejectWithValue }) => {
    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("homeImages", file);
      });
      const response = await api.post("/onboarding/gallery", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Error uploading images");
    }
  }
);

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // POST onboarding
    builder.addCase(postOnboarding.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      postOnboarding.fulfilled,
      (state, action: PayloadAction<OnboardingPayload>) => {
        state.loading = false;
        state.data = action.payload;
      }
    );
    builder.addCase(postOnboarding.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload;
    });

    // GET onboarding
    builder.addCase(getOnboarding.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      getOnboarding.fulfilled,
      (state, action: PayloadAction<OnboardingPayload[]>) => {
        state.loading = false;
        state.list = action.payload;
      }
    );
    builder.addCase(getOnboarding.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default onboardingSlice.reducer;
