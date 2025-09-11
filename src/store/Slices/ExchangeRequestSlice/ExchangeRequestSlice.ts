// store/Slices/ExchangeSlice/exchangeSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Types
export interface ExchangeRequest {
  id: string;
  fromUserId: string;
  toUserId: string;
  fromPropertyId: string;
  toPropertyId: string;
  message: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED" | "completed" | "cancelled";
  createdAt: string;
  updatedAt: string;
  // You might want to add related property/user details here
  fromProperty?: any;
  toProperty?: any;
  fromUser?: any;
  toUser?: any;
}

interface ExchangeState {
  requests: ExchangeRequest[];
  currentRequest: ExchangeRequest | null;
  loading: boolean;
  error: string | null;
}

const initialState: ExchangeState = {
  requests: [],
  currentRequest: null,
  loading: false,
  error: null,
};

// Thunks
export const sendExchangeRequest = createAsyncThunk(
  "exchange/sendRequest",
  async (
    requestData: {
      fromUserId: string;
      toUserId: string;
      fromPropertyId: string;
      toPropertyId: string;
      message: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/exchange-request`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to send exchange request"
      );
    }
  }
);

export const fetchExchangeRequests = createAsyncThunk(
  "exchange/fetchRequests",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/exchange-request`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch exchange requests"
      );
    }
  }
);

export const fetchExchangeRequestDetails = createAsyncThunk(
  "exchange/fetchRequestDetails",
  async (requestId: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/exchange-request/${requestId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch exchange request details"
      );
    }
  }
);

export const acceptExchangeRequest = createAsyncThunk(
  "exchange/acceptRequest",
  async (requestId: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/exchange-request/aceept/${requestId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to accept exchange request"
      );
    }
  }
);

export const deleteExchangeRequest = createAsyncThunk(
  "exchange/deleteRequest",
  async (requestId: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/exchange-request/${requestId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return requestId;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete exchange request"
      );
    }
  }
);

// Slice
const exchangeSlice = createSlice({
  name: "exchange",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentRequest: (state) => {
      state.currentRequest = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Send Exchange Request
      .addCase(sendExchangeRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendExchangeRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.requests.push(action.payload);
      })
      .addCase(sendExchangeRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch Exchange Requests
      .addCase(fetchExchangeRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExchangeRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload;
      })
      .addCase(fetchExchangeRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch Exchange Request Details
      .addCase(fetchExchangeRequestDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExchangeRequestDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentRequest = action.payload;
      })
      .addCase(fetchExchangeRequestDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Accept Exchange Request
      .addCase(acceptExchangeRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(acceptExchangeRequest.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.requests.findIndex(
          (req) => req.id === action.payload.id
        );
        if (index !== -1) {
          state.requests[index] = action.payload;
        }
        if (
          state.currentRequest &&
          state.currentRequest.id === action.payload.id
        ) {
          state.currentRequest = action.payload;
        }
      })
      .addCase(acceptExchangeRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete Exchange Request
      .addCase(deleteExchangeRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteExchangeRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = state.requests.filter(
          (req) => req.id !== action.payload
        );
        if (
          state.currentRequest &&
          state.currentRequest.id === action.payload
        ) {
          state.currentRequest = null;
        }
      })
      .addCase(deleteExchangeRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearCurrentRequest } = exchangeSlice.actions;
export default exchangeSlice.reducer;
