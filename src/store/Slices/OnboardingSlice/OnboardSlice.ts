import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

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
  propertyType: "HOME" | "APARTMENT" | null;
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
  error: string | null;
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
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", // important
        },
      };
      console.log("Sending request to:", `${baseURL}/onboarding`);
      const response = await axios.post(
        `${baseURL}/onboarding`,
        payload,
        config
      );
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
      const response = await axios.get(`${baseURL}/onboarding`);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Error fetching onboarding");
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
