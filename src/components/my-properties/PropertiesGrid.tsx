import { useNavigate } from "react-router-dom";
import PropertyCard from "./PropertyCard";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { useEffect, useState } from "react";
import {
  fetchMyProperties,
  fetchSingleProperty,
  updateProperty,
  deleteProperty,
  PropertyListItem,
} from "@/store/Slices/PropertySlice/propertySlice";
import { PropertyDetails } from "@/types/PropertyDetails";

const PropertiesGrid = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { myProperties, singleProperty, loading } = useAppSelector(
    (state) => state.property
  );

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] =
    useState<PropertyListItem | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  // Form state for edit modal
  const [formData, setFormData] = useState<Partial<PropertyDetails>>({});
  const [newImages, setNewImages] = useState<File[]>([]);

  // 1. Initial fetch of properties
  useEffect(() => {
    dispatch(fetchMyProperties());
  }, [dispatch]);

  // 2. Populate form data when singleProperty is fetched
  useEffect(() => {
    if (singleProperty && selectedProperty?.id === singleProperty.id) {
      setFormData({
        title: singleProperty.title,
        description: singleProperty.description,
        price: singleProperty.price,
        bedrooms: singleProperty.bedrooms,
        bathrooms: singleProperty.bathrooms,
        size: singleProperty.size,
        location: singleProperty.location,
        country: singleProperty.country,
        isAvailable: singleProperty.isAvailable,
      });
    }
  }, [singleProperty, selectedProperty]);

  // 3. 🛑 EFFECT TO DISABLE/ENABLE BODY SCROLLING 🛑
  useEffect(() => {
    const isModalOpen = editModalOpen || deleteModalOpen;
    if (isModalOpen) {
      // Disable scrolling
      document.body.style.overflow = "hidden";
    } else {
      // Enable scrolling
      document.body.style.overflow = "unset";
    }

    // Cleanup function: ensures scrolling is re-enabled when the component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [editModalOpen, deleteModalOpen]);
  // 🛑 END OF SCROLLING EFFECT 🛑

  const handleEditClick = async (property: PropertyListItem) => {
    setSelectedProperty(property);
    setActionError(null);

    try {
      setActionLoading(true);
      await dispatch(fetchSingleProperty(property.id)).unwrap();
      setEditModalOpen(true);
    } catch (err) {
      setActionError("Failed to load property details");
      console.error("Failed to fetch property:", err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteClick = (property: PropertyListItem) => {
    setSelectedProperty(property);
    setActionError(null);
    setDeleteModalOpen(true);
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProperty) return;

    setActionLoading(true);
    setActionError(null);

    try {
      // Create the data object according to API requirements
      const updateData = {
        title: formData.title || "",
        description: formData.description || "",
        price: formData.price || 0,
        bedrooms: formData.bedrooms || 0,
        bathrooms: formData.bathrooms || 0,
        size: formData.size || 0,
        location: formData.location || "",
        country: formData.country || "",
        isAvailable: formData.isAvailable || false,
        // Include other required fields with defaults
        propertyType: formData.propertyType || "APARTMENT", // You might want to make this dynamic
        maxPeople: formData.maxPeople || 4,
        isTravelWithPets: formData.isTravelWithPets || false,
        // Add empty arrays for relationships if needed
        amenities: [],
        transports: [],
        surroundings: [],
        removeImages: [], // Empty array since we're not removing any images
      };

      let updatedData: FormData = new FormData();

      // Append the data as a JSON string in the 'data' field
      updatedData.append("data", JSON.stringify(updateData));

      // Append new images if any
      if (newImages.length > 0) {
        newImages.forEach((file) => {
          updatedData.append("files", file);
        });
      }

      await dispatch(
        updateProperty({
          id: selectedProperty.id,
          updatedData,
        })
      ).unwrap();

      setEditModalOpen(false);
      setNewImages([]);
      setFormData({});
      dispatch(fetchMyProperties());
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to update property";
      setActionError(errorMessage);
      console.error("Update failed:", err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedProperty) return;

    setActionLoading(true);
    setActionError(null);

    try {
      await dispatch(deleteProperty(selectedProperty.id)).unwrap();
      setDeleteModalOpen(false);
      setSelectedProperty(null);
      dispatch(fetchMyProperties()); // Refresh list
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to delete property";
      setActionError(errorMessage);
      console.error("Delete failed:", err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    let processedValue: string | number | boolean = value;

    if (type === "number") {
      processedValue = value === "" ? 0 : Number(value);
    } else if (type === "checkbox") {
      processedValue = (e.target as HTMLInputElement).checked;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: processedValue,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewImages(Array.from(e.target.files));
    }
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setNewImages([]);
    setFormData({});
    setActionError(null);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setActionError(null);
  };

  if (loading && myProperties.length === 0) {
    return (
      <div className="flex justify-center items-center mt-10">
        <div className="text-lg">Loading properties...</div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {myProperties.map((property) => (
          <PropertyCard
            key={property.id}
            image={property.images[0]?.url || "/placeholder.jpg"}
            avatarImage={property.owner?.photo || "/avatar-placeholder.png"}
            rating={"5.0"}
            ownerName={property.owner?.fullName || "Unknown"}
            location={property.location}
            title={property.title}
            price={property.price}
            features={{
              beds: property.bedrooms,
              baths: property.bathrooms,
              sqm: Math.floor(property.size),
            }}
            onViewDetails={() => navigate(`/home-details/${property.id}`)}
            onEdit={() => handleEditClick(property)}
            onDelete={() => handleDeleteClick(property)}
          />
        ))}
      </div>

      {myProperties.length === 0 && !loading && (
        <div className="text-center mt-10 text-gray-500">
          No properties found. Create your first property!
        </div>
      )}

      {/* Edit Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 backdrop-blur-lg flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[70vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Edit Property</h2>

            {actionError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {actionError}
              </div>
            )}

            {loading ? (
              <div className="text-center py-4">
                Loading property details...
              </div>
            ) : (
              <form onSubmit={handleUpdateSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block mb-2 font-medium">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title || ""}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-medium">Size (sqm)</label>
                    <input
                      type="number"
                      name="size"
                      value={formData.size || 0}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-medium">Bedrooms</label>
                    <input
                      type="number"
                      name="bedrooms"
                      value={formData.bedrooms || 0}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-medium">Bathrooms</label>
                    <input
                      type="number"
                      name="bathrooms"
                      value={formData.bathrooms || 0}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min="0"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="isAvailable"
                      checked={formData.isAvailable || false}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <label className="font-medium">
                      Available for exchange
                    </label>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block mb-2 font-medium">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location || ""}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-2 font-medium">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country || ""}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-2 font-medium">Description</label>
                  <textarea
                    name="description"
                    value={formData.description || ""}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-2 font-medium">
                    Upload New Images (will replace existing ones)
                  </label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full border border-gray-300 p-2 rounded"
                  />
                  {newImages.length > 0 && (
                    <p className="text-sm text-gray-600 mt-2">
                      {newImages.length} image(s) selected
                    </p>
                  )}
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={closeEditModal}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors"
                    disabled={actionLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
                    disabled={actionLoading}
                  >
                    {actionLoading ? "Updating..." : "Update Property"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-transparent backdrop-blur-lg bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full">
            <h2 className="text-2xl font-bold mb-4">Confirm Delete</h2>

            {actionError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {actionError}
              </div>
            )}

            <p>
              Are you sure you want to delete **"{selectedProperty?.title}"**?
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors"
                disabled={actionLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors disabled:opacity-50"
                disabled={actionLoading}
              >
                {actionLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PropertiesGrid;
