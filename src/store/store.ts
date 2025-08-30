import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./Slices/AuthSlice/authSlice";
import authReducer from "@/store/Slices/AuthSlice/authSlice";
import amenitiesReducer from "@/store/Slices/OnboardingSlice/AmenitySlice";
import onboardingReducer from "@/store/Slices/OnboardingSlice/OnboardSlice";
import propertyReducer from "@/store/Slices/PropertySlice/propertySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    amenities: amenitiesReducer,
    onboarding: onboardingReducer,
    property: propertyReducer,
  },
});

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
