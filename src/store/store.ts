import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./Slices/AuthSlice/authSlice";
import authReducer from "@/store/Slices/AuthSlice/authSlice";
import amenitiesReducer from "@/store/Slices/OnboardingSlice/AmenitySlice";
import onboardingReducer from "@/store/Slices/OnboardingSlice/OnboardSlice";
import favoritesReducer from "@/store/Slices/FavoritesSlice/favoritesSlice";
import propertyReducer from "@/store/Slices/PropertySlice/propertySlice";
import chatReducer from "@/store/Slices/ChatSlice/ChatSlice";
import exchangeRequestReducer from "@/store/Slices/ExchangeRequestSlice/ExchangeRequestSlice";
import userReducer from "@/store/Slices/Profile/ProfileSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    amenities: amenitiesReducer,
    onboarding: onboardingReducer,
    favorites: favoritesReducer,
    property: propertyReducer,
    chat: chatReducer,
    exchangeRequest: exchangeRequestReducer,
    user: userReducer,
  },
});

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
