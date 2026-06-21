// src/store/chatSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/services/api";

interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
  exchangeRequestId?: string | null;
  status?: "SENT" | "READ";
  attachmentUrl?: string | null;
  attachmentType?: string | null;
  attachmentName?: string | null;
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

// Async thunk to fetch chat history
export const fetchChatHistory = createAsyncThunk<
  ChatMessage[],
  string,
  { rejectValue: string }
>("chat/fetchHistory", async (userId: string, { rejectWithValue }) => {
  try {
    console.log("📜 Fetching chat history for user:", userId);
    const res = await api.get(`/chat/history/user/${userId}`);
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
    updateMessageStatus: (
      state,
      action: PayloadAction<{ messageIds: string[]; status: "SENT" | "READ" }>
    ) => {
      state.messages = state.messages.map((msg) => {
        if (action.payload.messageIds.includes(msg.id)) {
          return { ...msg, status: action.payload.status };
        }
        return msg;
      });
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

export const { addMessage, updateMessageStatus, clearMessages } = chatSlice.actions;
export default chatSlice.reducer;
