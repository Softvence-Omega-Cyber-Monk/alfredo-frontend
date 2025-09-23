import api from "@/services/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface User {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string | null;
  photo: string | null;
  age: number | null;
  dateOfBirth: string | null;
  identification: string | null;
  role: string;
}

interface UserState {
  data: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  data: null,
  loading: false,
  error: null,
};

const user = localStorage.getItem("user");
const parsedUser = user ? JSON.parse(user) : null;

const id = parsedUser.id;

// Get user by ID
export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  if (!id) throw new Error("User ID not found in localStorage");
  const res = await api.get(`/user/my-profile`);
  return res.data;
});

// Update user
// export const updateUser = createAsyncThunk(
//   "user/updateUser",
//   async (updatedData: {
//     fullName?: string;
//     email?: string;
//     phoneNumber?: string;
//     dateOfBirth?: string;
//     notes?: string;
//     photo?: File | null;
//   }) => {
//     const id = localStorage.getItem("userId");
//     if (!id) throw new Error("User ID not found in localStorage");

//     const formData = new FormData();
//     if (updatedData.fullName) formData.append("fullName", updatedData.fullName);
//     if (updatedData.email) formData.append("email", updatedData.email);
//     if (updatedData.phoneNumber)
//       formData.append("phoneNumber", updatedData.phoneNumber);
//     if (updatedData.dateOfBirth)
//       formData.append("dateOfBirth", updatedData.dateOfBirth);
//     if (updatedData.notes) formData.append("notes", updatedData.notes);
//     if (updatedData.photo) formData.append("photo", updatedData.photo);

//     const res = await api.patch(`/user/me`, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });

//     return res.data;
//   }
// );

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (payload: FormData, { rejectWithValue }) => {
    try {
      const response = await api.patch("/user/me", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to update user");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchUser
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch user";
      })
      // updateUser
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update user";
      });
  },
});

export default userSlice.reducer;
