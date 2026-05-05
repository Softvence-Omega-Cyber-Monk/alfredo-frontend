// src/redux/slices/propertySlice.ts
import api from "@/services/api";
import { PropertyDetails, PropertyImage } from "@/types/PropertyDetails";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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
    coverImage: details.coverImage,
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
  coverImage?: string;
}

interface PropertyState {
  allProperties: PropertyListItem[];
  featuredProperties: PropertyListItem[];
  myProperties: PropertyListItem[];
  singleProperty: PropertyDetails | null;
  loading: boolean;
  error: string | null;
}

const initialState: PropertyState = {
  allProperties: [],
  featuredProperties: [],
  myProperties: [],
  singleProperty: null,
  loading: false,
  error: null,
};

// ✅ Fetch all properties
export const fetchAllProperties = createAsyncThunk<PropertyListItem[]>(
  "properties/fetchAll",
  async () => {
    const response = await api.get("/property");
    return response.data.data || response.data || [];
  }
);

// ✅ Fetch my properties
export const fetchMyProperties = createAsyncThunk<PropertyListItem[]>(
  "properties/fetchMine",
  async () => {
    const response = await api.get("/property/my-properties");
    return response.data.data || response.data || [];
  }
);

// ✅ Fetch featured properties
export const fetchFeaturedProperties = createAsyncThunk<PropertyListItem[]>(
  "properties/fetchFeatured",
  async () => {
    const response = await api.get("/featured-property");
    const items = response.data.data || [];
    return items.map((item: any) => item.property).filter(Boolean);
  }
);

// ✅ Fetch single property
export const fetchSingleProperty = createAsyncThunk<PropertyDetails, string>(
  "properties/fetchSingle",
  async (id) => {
    const response = await api.get(`/property/${id}`);
    return response.data.data || response.data;
  }
);

// ✅ Add new property
export const addProperty = createAsyncThunk<PropertyListItem, FormData>(
  "properties/add",
  async (newProperty) => {
    const response = await api.post("/property", newProperty, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.data || response.data;
  }
);

// ✅ Update property
export const updateProperty = createAsyncThunk<
  PropertyDetails,
  { id: string; updatedData: Partial<PropertyDetails> | FormData }
>("properties/update", async ({ id, updatedData }) => {
  const isMultipart = updatedData instanceof FormData;
  const response = await api.patch(`/property/${id}`, updatedData, {
    headers: isMultipart ? { "Content-Type": "multipart/form-data" } : {},
  });
  return response.data.data || response.data;
});

// ✅ Delete property
export const deleteProperty = createAsyncThunk<string, string>(
  "properties/delete",
  async (id) => {
    await api.delete(`/property/${id}`);
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

      // Fetch Featured
      .addCase(fetchFeaturedProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.featuredProperties = Array.isArray(action.payload)
          ? action.payload
          : [];
      })
      .addCase(fetchFeaturedProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch featured properties";
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
