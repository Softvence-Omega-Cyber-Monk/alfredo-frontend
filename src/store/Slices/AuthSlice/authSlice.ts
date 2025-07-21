import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  name: string;
  role: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

const isDev = true;; // true if running in dev mode

const initialState: AuthState = {
  isAuthenticated: isDev, // true only during development
  user: isDev
    ? {
        name: "Developer User",
        role: "admin",
      }
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
