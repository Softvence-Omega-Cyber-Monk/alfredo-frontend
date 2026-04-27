// /store/Slices/AuthSlice/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/services/api";
import { AxiosError } from "axios";

const storedUser = localStorage.getItem("user");
const storedToken = localStorage.getItem("token");

// ========== Types ==========
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  hasOnboarded: boolean;
  photo?: string | null;
}
export interface RegisterResponse {
  status: string; // e.g. "pending"
  message: string;
  userId: string;
}
interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  successMessage?: string | null;
}

interface AuthResponse {
  user: User;
  token: string;
}

interface ApiError {
  message: string;
}

// ========== Initial State ==========
const initialState: AuthState = {
  isAuthenticated: !!storedToken,
  user: storedUser ? JSON.parse(storedUser) : null,
  token: storedToken,
  loading: false,
  error: null,
};

//Signup User

export const signupUser = createAsyncThunk<
  RegisterResponse, // updated return type
  {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    referralCode?: string;
  },
  { rejectValue: string }
>("auth/register", async (newUser, { rejectWithValue }) => {
  try {
    const { data } = await api.post<RegisterResponse>(
      "/auth/register",
      newUser
    );
    return data;
  } catch (err) {
    const error = err as AxiosError<ApiError>;
    return rejectWithValue(error.response?.data?.message || "Signup failed");
  }
});

// Login User
export const loginUser = createAsyncThunk<
  AuthResponse,
  { email: string; password: string },
  { rejectValue: string }
>("auth/loginUser", async (credentials, { rejectWithValue }) => {
  try {
    const { data } = await api.post("/auth/login", credentials);

    const authData: AuthResponse = {
      user: data.user,
      token: data.accessToken,
    };

    return authData;
  } catch (err) {
    const error = err as AxiosError<ApiError>;
    return rejectWithValue(error.response?.data?.message || "Login failed");
  }
});

// ========== EMAIL LINK VERIFICATION (New Flow) ==========

// Verify Email Token (from verification link)
export const verifyEmailToken = createAsyncThunk<
  AuthResponse,
  { token: string },
  { rejectValue: string }
>("auth/verify-email-token", async ({ token }, { rejectWithValue }) => {
  try {
    const { data } = await api.post("/auth/verify-email-token", { token });

    const authData: AuthResponse = {
      user: {
        id: data.user.id,
        firstName: data.user.fullName.split(" ")[0],
        lastName: data.user.fullName.split(" ").slice(1).join(" "),
        email: data.user.email,
        role: data.user.role,
        hasOnboarded: data.user.hasOnboarded,
      },
      token: data.accessToken,
    };

    return authData;
  } catch (err) {
    const error = err as AxiosError<ApiError>;
    return rejectWithValue(
      error.response?.data?.message || "Email verification failed"
    );
  }
});

// Resend Verification Email
export const resendVerificationEmail = createAsyncThunk<
  { message: string },
  { email: string },
  { rejectValue: string }
>(
  "auth/resend-verification-email",
  async ({ email }, { rejectWithValue }) => {
    try {
      const { data } = await api.post<{ message: string }>(
        "/auth/resend-verification-email",
        { email }
      );
      return data;
    } catch (err) {
      const error = err as AxiosError<ApiError>;
      return rejectWithValue(
        error.response?.data?.message || "Resend verification email failed"
      );
    }
  }
);

// ========== OTP VERIFICATION (Old Flow - Commented Out) ==========
// Keeping these thunks for potential future use.

// // Send OTP
// export const sendOtp = createAsyncThunk<
//   { message: string },
//   { userId: string; method: string },
//   { rejectValue: string }
// >("auth/send-otp", async ({ userId, method }, { rejectWithValue }) => {
//   try {
//     const { data } = await api.post<{ message: string }>("/auth/send-otp", {
//       userId,
//       method,
//     });
//     return data;
//   } catch (err) {
//     const error = err as AxiosError<ApiError>;
//     return rejectWithValue(
//       error.response?.data?.message || "OTP sending failed"
//     );
//   }
// });

// // Verify OTP
// export const verifyOtp = createAsyncThunk<
//   AuthResponse, // Updated return type
//   { userId: string; otp: string }, // Payload type
//   { rejectValue: string }
// >("auth/verify-otp", async ({ userId, otp }, { rejectWithValue }) => {
//   try {
//     const { data } = await api.post("/auth/verify-otp", { userId, otp });
//
//     const authData: AuthResponse = {
//       user: {
//         id: data.user.id,
//         firstName: data.user.fullName.split(" ")[0],
//         lastName: data.user.fullName.split(" ").slice(1).join(" "),
//         email: data.user.email,
//         role: data.user.role,
//         hasOnboarded: data.user.hasOnboarded,
//       },
//       token: data.accessToken,
//     };
//
//     return authData;
//   } catch (err) {
//     const error = err as AxiosError<ApiError>;
//     return rejectWithValue(
//       error.response?.data?.message || "OTP verification failed"
//     );
//   }
// });

// // Resend OTP
// export const resendOtp = createAsyncThunk<
//   { message: string },
//   { userId: string; method: string },
//   { rejectValue: string }
// >("auth/resend-otp", async ({ userId, method }, { rejectWithValue }) => {
//   try {
//     const { data } = await api.post<{ message: string }>("/auth/resend-otp", {
//       userId,
//       method,
//     });
//     return data;
//   } catch (err) {
//     const error = err as AxiosError<ApiError>;
//     return rejectWithValue(
//       error.response?.data?.message || "OTP resending failed"
//     );
//   }
// });

// Forgot Password

export const forgotPassword = createAsyncThunk<
  string,
  { email: string },
  { rejectValue: string }
>("auth/forgot-password", async ({ email }, { rejectWithValue }) => {
  try {
    const { data } = await api.post<{ message: string }>(
      "/auth/forgot-password",
      { email }
    );
    return data.message;
  } catch (err) {
    const error = err as AxiosError<ApiError>;
    return rejectWithValue(
      error.response?.data?.message || "Forgot password failed"
    );
  }
});

// Reset Password

export const resetPassword = createAsyncThunk<
  string,
  { token: string; newPassword: string },
  { rejectValue: string }
>(
  "auth/reset-password",
  async ({ token, newPassword }, { rejectWithValue }) => {
    try {
      const { data } = await api.post<{ message: string }>(
        "/auth/reset-password",
        { token, newPassword }
      );
      return data.message;
    } catch (err) {
      const error = err as AxiosError<ApiError>;
      return rejectWithValue(
        error.response?.data?.message || "Reset password failed"
      );
    }
  }
);

// Change Password
export const changePassword = createAsyncThunk<
  string,
  { oldPassword: string; newPassword: string },
  { rejectValue: string; state: { auth: AuthState } }
>(
  "auth/change-password",
  async ({ oldPassword, newPassword }, { rejectWithValue, getState }) => {
    const token = getState().auth.token;
    if (!token) {
      return rejectWithValue("User not authenticated");
    }

    try {
      const { data } = await api.patch<{ message: string }>(
        "/auth/change-password",
        {
          currentPassword: oldPassword, // backend expects "currentPassword"
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data.message;
    } catch (err) {
      const error = err as AxiosError<ApiError>;
      return rejectWithValue(
        error.response?.data?.message || "Change password failed"
      );
    }
  }
);

// ========== Slice ==========
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
    setCredentials: (state, action: PayloadAction<AuthResponse>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })

      // Signup
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;

        // Not authenticated yet because email verification is pending
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;

        // --- OLD OTP FLOW (commented out) ---
        // Store userId temporarily in localStorage or state for OTP verification
        // localStorage.setItem("pendingUserId", action.payload.userId);
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Signup failed";
      })

      // ========== EMAIL LINK VERIFICATION (New Flow) ==========
      .addCase(verifyEmailToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyEmailToken.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;

        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(verifyEmailToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Email verification failed";
      })

      // ========== OTP VERIFICATION REDUCERS (Old Flow - Commented Out) ==========
      // .addCase(verifyOtp.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(verifyOtp.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.user = action.payload.user;
      //   state.token = action.payload.token;
      //   state.isAuthenticated = true;
      //
      //   localStorage.setItem("token", action.payload.token);
      //   localStorage.removeItem("pendingUserId"); // Clean up temp storage
      // })
      // .addCase(verifyOtp.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload || "OTP verification failed";
      // })

      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload; // store message
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Forgot password failed";
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload; // Store success message
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Reset password failed";
      });
  },
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;
