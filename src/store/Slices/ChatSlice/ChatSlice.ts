// src/store/chatSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
  exchangeRequestId?: string | null;
}

interface ChatState {
  messages: ChatMessage[];
  loading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  messages: [],
  loading: false,
  error: null,
};

const config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  },
};

// Async thunk to fetch chat history
export const fetchChatHistory = createAsyncThunk<
  ChatMessage[],
  string,
  { rejectValue: string }
>("chat/fetchHistory", async (userId: string, { rejectWithValue }) => {
  try {
    console.log("📜 Fetching chat history for user:", userId);
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/chat/history/user/${userId}`,
      config
    );
    console.log("📜 Chat history fetched:", res.data?.length, "messages");
    // Ensure returned data is an array of ChatMessage
    return Array.isArray(res.data) ? (res.data as ChatMessage[]) : [];
  } catch (err: any) {
    console.error("❌ Failed to fetch chat history:", err);
    return rejectWithValue(
      err.response?.data?.message || "Failed to fetch history"
    );
  }
});

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<ChatMessage>) => {
      // Prevent duplicate messages
      const exists = state.messages.some((msg) => msg.id === action.payload.id);
      if (!exists) {
        console.log("➕ Adding new message to store:", action.payload.id);
        state.messages.push(action.payload);
      } else {
        console.log("⚠️ Message already exists, skipping:", action.payload.id);
      }
    },
    clearMessages: (state) => {
      console.log("🧹 Clearing all messages");
      state.messages = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChatHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = Array.isArray(action.payload) ? action.payload : [];
        console.log(
          "✅ Chat history loaded:",
          state.messages.length,
          "messages"
        );
      })
      .addCase(fetchChatHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
        console.error("❌ Failed to load chat history:", state.error);
      });
  },
});

export const { addMessage, clearMessages } = chatSlice.actions;
export default chatSlice.reducer;
