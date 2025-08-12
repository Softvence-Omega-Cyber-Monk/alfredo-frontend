// /store/Slices/ContactSlice/contactSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

// ========== Types ==========
export interface Contact {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  opinion: string;
  createdAt: string;
}

interface ContactState {
  contacts: Contact[];
  loading: boolean;
  error: string | null;
}

interface ApiError {
  message: string;
}

// ========== Initial State ==========
const initialState: ContactState = {
  contacts: [],
  loading: false,
  error: null,
};

// ========== Axios Instance ==========
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
});

// CREATE contact
export const createContact = createAsyncThunk<
  Contact,
  Omit<Contact, "id" | "createdAt">,
  { rejectValue: string }
>("contact/create", async (contactData, { rejectWithValue }) => {
  try {
    const { data } = await api.post<Contact>("/contact", contactData);
    return data;
  } catch (err) {
    const error = err as AxiosError<ApiError>;
    return rejectWithValue(error.response?.data?.message || "Create contact failed");
  }
});

// READ all contacts
export const fetchContacts = createAsyncThunk<
  Contact[],
  void,
  { rejectValue: string }
>("contact/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get<Contact[]>("/contact");
    return data;
  } catch (err) {
    const error = err as AxiosError<ApiError>;
    return rejectWithValue(error.response?.data?.message || "Fetch contacts failed");
  }
});

// UPDATE contact
export const updateContact = createAsyncThunk<
  Contact,
  Partial<Contact> & { id: string },
  { rejectValue: string }
>("contact/update", async ({ id, ...updateData }, { rejectWithValue }) => {
  try {
    const { data } = await api.put<Contact>(`/contact/${id}`, updateData);
    return data;
  } catch (err) {
    const error = err as AxiosError<ApiError>;
    return rejectWithValue(error.response?.data?.message || "Update contact failed");
  }
});

// DELETE contact
export const deleteContact = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("contact/delete", async (id, { rejectWithValue }) => {
  try {
    await api.delete(`/contact/${id}`);
    return id; // Return deleted contact ID
  } catch (err) {
    const error = err as AxiosError<ApiError>;
    return rejectWithValue(error.response?.data?.message || "Delete contact failed");
  }
});

// ========== Slice ==========
const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // CREATE
      .addCase(createContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createContact.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts.push(action.payload);
      })
      .addCase(createContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Create contact failed";
      })

      // READ
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Fetch contacts failed";
      })

      // UPDATE
      .addCase(updateContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.contacts.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) state.contacts[index] = action.payload;
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Update contact failed";
      })

      // DELETE
      .addCase(deleteContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = state.contacts.filter((c) => c.id !== action.payload);
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Delete contact failed";
      });
  },
});

export default contactSlice.reducer;
