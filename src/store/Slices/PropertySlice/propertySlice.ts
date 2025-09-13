// src/redux/slices/propertySlice.ts
import { PropertyDetails, PropertyImage } from "@/types/PropertyDetails";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

function toListItem(details: PropertyDetails): PropertyListItem {
  return {
    id: details.id,
    title: details.title,
    description: details.description,
    location: details.location,
    country: details.country,
    price: details.price,
    size: details.size,
    bedrooms: details.bedrooms,
    bathrooms: details.bathrooms,
    isAvailable: details.isAvailable,
    images: details.images.map((img, index) => ({
      id: img.publicId || `${details.id}-img-${index}`, // fallback id
      url: img.url,
      publicId: img.publicId,
    })),
    owner: details.owner,
    ownerId: details.ownerId,
    createdAt: details.createdAt,
    updatedAt: details.updatedAt,
  };
}

export interface Owner {
  id: string;
  fullName: string;
  email: string;
  role: string;
  photo: string | null;
  phoneNumber: string | null;
  createdAt: string;
  updatedAt: string;
}
// export interface PropertyImage {
//   url: string;
//   publicId: string;
// }

export interface PropertyListItem {
  id: string;
  title: string;
  description: string;
  location: string;
  country: string;
  price: number;
  size: number;
  bedrooms: number;
  bathrooms: number;
  isAvailable: boolean;
  images: PropertyImage[];
  owner?: Owner;
  ownerId?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface PropertyState {
  allProperties: PropertyListItem[];
  myProperties: PropertyListItem[];
  singleProperty: PropertyDetails | null;
  loading: boolean;
  error: string | null;
}

const initialState: PropertyState = {
  allProperties: [],
  myProperties: [],
  singleProperty: null,
  loading: false,
  error: null,
};

const baseURL = import.meta.env.VITE_API_URL;

const getAuthConfig = (isMultipart = false) => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    ...(isMultipart ? {} : { "Content-Type": "application/json" }),
  },
});

// ✅ Fetch all properties
export const fetchAllProperties = createAsyncThunk<PropertyListItem[]>(
  "properties/fetchAll",
  async () => {
    const response = await axios.get(`${baseURL}/property`, getAuthConfig());
    // ✅ adjust based on API response structure
    return response.data.data || response.data || [];
  }
);

// ✅ Fetch my properties
export const fetchMyProperties = createAsyncThunk<PropertyListItem[]>(
  "properties/fetchMine",
  async () => {
    const response = await axios.get(
      `${baseURL}/property/my-properties`,
      getAuthConfig()
    );
    return response.data.data || response.data || [];
  }
);

// ✅ Fetch single property
export const fetchSingleProperty = createAsyncThunk<PropertyDetails, string>(
  "properties/fetchSingle",
  async (id) => {
    const response = await axios.get(
      `${baseURL}/property/${id}`,
      getAuthConfig()
    );
    return response.data.data || response.data;
  }
);

// ✅ Add new property
export const addProperty = createAsyncThunk<PropertyListItem, FormData>(
  "properties/add",
  async (newProperty) => {
    const response = await axios.post(
      `${baseURL}/property`,
      newProperty,
      getAuthConfig(true)
    );
    return response.data.data || response.data;
  }
);

// ✅ Update property
export const updateProperty = createAsyncThunk<
  PropertyDetails,
  { id: string; updatedData: Partial<PropertyDetails> | FormData }
>("properties/update", async ({ id, updatedData }) => {
  const response = await axios.patch(
    `${baseURL}/property/${id}`,
    updatedData,
    getAuthConfig(updatedData instanceof FormData)
  );
  return response.data.data || response.data;
});

// ✅ Delete property
export const deleteProperty = createAsyncThunk<string, string>(
  "properties/delete",
  async (id) => {
    await axios.delete(`${baseURL}/property/${id}`, getAuthConfig());
    return id;
  }
);

const propertySlice = createSlice({
  name: "properties",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchAllProperties.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.allProperties = Array.isArray(action.payload)
          ? action.payload
          : [];
      })
      .addCase(fetchAllProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch all properties";
      })

      // Fetch My
      .addCase(fetchMyProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.myProperties = Array.isArray(action.payload)
          ? action.payload
          : [];
      })

      // Fetch Single
      .addCase(fetchSingleProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.singleProperty = action.payload;
      })

      // Add
      .addCase(addProperty.fulfilled, (state, action) => {
        state.allProperties.push(action.payload);
        state.myProperties.push(action.payload);
      })

      // Update
      .addCase(updateProperty.fulfilled, (state, action) => {
        const listItem = toListItem(action.payload);

        const updateInList = (list: PropertyListItem[]) => {
          const idx = list.findIndex((p) => p.id === listItem.id);
          if (idx !== -1) list[idx] = listItem;
        };

        updateInList(state.allProperties);
        updateInList(state.myProperties);

        if (state.singleProperty?.id === action.payload.id) {
          state.singleProperty = action.payload; // keep full details
        }
      })

      // Delete
      .addCase(deleteProperty.fulfilled, (state, action) => {
        state.allProperties = state.allProperties.filter(
          (p) => p.id !== action.payload
        );
        state.myProperties = state.myProperties.filter(
          (p) => p.id !== action.payload
        );
        if (state.singleProperty?.id === action.payload) {
          state.singleProperty = null;
        }
      });
  },
});

export default propertySlice.reducer;
