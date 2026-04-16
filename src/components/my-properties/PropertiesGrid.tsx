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
import CalendarRangePicker from "../onboarding/CalendarRangePicker";
import { Label } from "../ui/label";
import { getAmenities, getTransports, getSurroundings } from "@/services/api";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

interface AmenityItem {
  id: string;
  name: string;
  greek_name?: string;
  icon?: string;
}

interface PropertyFormData extends Omit<PropertyDetails, "amenities" | "transports" | "surroundings"> {
  amenities: string[];
  transports: string[];
  surroundings: string[];
}

const PropertiesGrid = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { myProperties, singleProperty, loading } = useAppSelector(
    (state) => state.property
  );
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] =
    useState<PropertyListItem | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  // Amenities state
  const [amenities, setAmenities] = useState<AmenityItem[]>([]);
  const [transports, setTransports] = useState<AmenityItem[]>([]);
  const [surroundings, setSurroundings] = useState<AmenityItem[]>([]);
  const [amenitiesLoading, setAmenitiesLoading] = useState(false);

  // Form state for edit modal
  const [formData, setFormData] = useState<Partial<PropertyFormData>>({});
  const [newImages, setNewImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<{ url: string; publicId: string }[]>([]);
  const [imagesToRemove, setImagesToRemove] = useState<string[]>([]);

  // 1. Initial fetch of properties
  useEffect(() => {
    dispatch(fetchMyProperties());
  }, [dispatch]);

  // 2. Fetch amenities when edit modal opens
  useEffect(() => {
    const fetchAmenities = async () => {
      if (!editModalOpen) return;

      setAmenitiesLoading(true);
      try {
        const [aRes, tRes, sRes] = await Promise.all([
          getAmenities(),
          getTransports(),
          getSurroundings(),
        ]);

        setAmenities(aRes);
        setTransports(tRes);
        setSurroundings(sRes);
      } catch (err) {
        console.error("Failed to load amenities:", err);
        setActionError("Failed to load amenities");
      } finally {
        setAmenitiesLoading(false);
      }
    };

    fetchAmenities();
  }, [editModalOpen, currentLanguage]);

  // 3. Populate form data when singleProperty is fetched
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
        availabilityStartDate: singleProperty.availabilityStartDate || "",
        availabilityEndDate: singleProperty.availabilityEndDate || "",
        amenities: singleProperty.amenities?.map((a) => a.id) || [],
        transports: singleProperty.transports?.map((t) => t.id) || [],
        surroundings: singleProperty.surroundings?.map((s) => s.id) || [],
      });
      setExistingImages(singleProperty.images || []);
      setImagesToRemove([]);
    }
  }, [singleProperty, selectedProperty]);

  // 4. Disable/enable body scrolling
  useEffect(() => {
    const isModalOpen = editModalOpen || deleteModalOpen;
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [editModalOpen, deleteModalOpen]);

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

  const handleDateChange = (dates: {
    start: Date | null;
    end: Date | null;
  }) => {
    const formatDate = (date: Date | null): string => {
      if (!date) return "";
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    setFormData((prev) => ({
      ...prev,
      availabilityStartDate: formatDate(dates.start),
      availabilityEndDate: formatDate(dates.end),
    }));
  };

  const toggleSelection = (
    category: "amenities" | "transports" | "surroundings",
    id: string
  ) => {
    setFormData((prev) => {
      const current = (prev[category] as string[]) || [];
      const updated = current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id];
      return {
        ...prev,
        [category]: updated,
      };
    });
  };

  const removeExistingImage = (publicId: string) => {
    setExistingImages((prev) => prev.filter((img) => img.publicId !== publicId));
    setImagesToRemove((prev) => [...prev, publicId]);
  };

  const removeNewImage = (index: number) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProperty) return;

    setActionLoading(true);
    setActionError(null);

    try {
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
        availabilityStartDate: formData.availabilityStartDate || "",
        availabilityEndDate: formData.availabilityEndDate || "",
        propertyType: formData.propertyType || "APARTMENT",
        maxPeople: formData.maxPeople || 4,
        isTravelWithPets: formData.isTravelWithPets || false,
        amenities: (formData.amenities as string[]) || [],
        transports: (formData.transports as string[]) || [],
        surroundings: (formData.surroundings as string[]) || [],
        removeImages: imagesToRemove,
      };

      let updatedData: FormData = new FormData();
      updatedData.append("data", JSON.stringify(updateData));

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
      toast.success("Property updated successfully");
      setEditModalOpen(false);
      setNewImages([]);
      setFormData({});
      setExistingImages([]);
      setImagesToRemove([]);
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
      dispatch(fetchMyProperties());
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


  const closeEditModal = () => {
    setEditModalOpen(false);
    setNewImages([]);
    setFormData({});
    setExistingImages([]);
    setImagesToRemove([]);
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
          <div className="bg-white p-6 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
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

                {/* Availability Dates Section */}
                <div className="mb-4">
                  <Label className="block mb-2 font-medium">
                    Availability Dates
                  </Label>
                  <CalendarRangePicker
                    availabilityDates={{
                      start: formData.availabilityStartDate
                        ? new Date(formData.availabilityStartDate)
                        : null,
                      end: formData.availabilityEndDate
                        ? new Date(formData.availabilityEndDate)
                        : null,
                    }}
                    onAvailabilityChange={handleDateChange}
                  />
                </div>

                {/* Amenities Section */}
                <div className="mb-6">
                  <Label className="block mb-3 font-medium text-lg">Amenities</Label>
                  {amenitiesLoading ? (
                    <p className="text-gray-500">Loading amenities...</p>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                      {amenities.map((item: AmenityItem) => (
                        <div
                          key={item.id}
                          onClick={() => toggleSelection("amenities", item.id)}
                          className={`p-3 border border-primary-blue rounded-lg cursor-pointer flex flex-col items-center transition-all ${(formData.amenities as string[])?.includes(item.id)
                            ? "bg-blue-100 border-blue-500"
                            : "hover:bg-blue-50 hover:shadow-lg"
                            }`}
                        >
                          <img
                            src={item.icon}
                            alt={item.name}
                            className="w-6 h-6 mb-1"
                          />
                          <span className="text-sm text-center">
                            {currentLanguage === "el" && item.greek_name
                              ? item.greek_name
                              : item.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Transport Section */}
                <div className="mb-6">
                  <Label className="block mb-3 font-medium text-lg">Transport</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {transports.map((item: AmenityItem) => (
                      <div
                        key={item.id}
                        onClick={() => toggleSelection("transports", item.id)}
                        className={`p-3 border border-primary-blue rounded-lg cursor-pointer flex flex-col items-center transition-all ${(formData.transports as string[])?.includes(item.id)
                          ? "bg-blue-100 border-blue-500"
                          : "hover:bg-blue-50 hover:shadow-lg"
                          }`}
                      >
                        <img
                          src={item.icon}
                          alt={item.name}
                          className="w-6 h-6 mb-1"
                        />
                        <span className="text-sm text-center">
                          {currentLanguage === "el" && item.greek_name
                            ? item.greek_name
                            : item.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Surroundings Section */}
                <div className="mb-6">
                  <Label className="block mb-3 font-medium text-lg">Surroundings</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {surroundings.map((item: AmenityItem) => (
                      <div
                        key={item.id}
                        onClick={() => toggleSelection("surroundings", item.id)}
                        className={`p-3 border border-primary-blue rounded-lg cursor-pointer flex flex-col items-center transition-all ${(formData.surroundings as string[])?.includes(item.id)
                          ? "bg-blue-100 border-blue-500"
                          : "hover:bg-blue-50 hover:shadow-lg"
                          }`}
                      >
                        <img
                          src={item.icon}
                          alt={item.name}
                          className="w-6 h-6 mb-1"
                        />
                        <span className="text-sm text-center">
                          {currentLanguage === "el" && item.greek_name
                            ? item.greek_name
                            : item.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Images Section */}
                <div className="mb-6">
                  <Label className="block mb-3 font-medium text-lg">Images</Label>

                  {/* Existing Images */}
                  {existingImages.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Existing Images</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {existingImages.map((img) => (
                          <div key={img.publicId} className="relative group aspect-square">
                            <img
                              src={img.url}
                              alt="Property"
                              className="w-full h-full object-cover rounded-lg border border-gray-200"
                            />
                            <button
                              type="button"
                              onClick={() => removeExistingImage(img.publicId)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                            >
                              &times;
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* New Image Previews */}
                  {newImages.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">New Images</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {newImages.map((file, index) => (
                          <div key={index} className="relative group aspect-square">
                            <img
                              src={URL.createObjectURL(file)}
                              alt="New Upload"
                              className="w-full h-full object-cover rounded-lg border border-blue-200"
                            />
                            <button
                              type="button"
                              onClick={() => removeNewImage(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                            >
                              &times;
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Upload Button */}
                  <div className="mt-2">
                    <label className="block mb-2 font-medium text-sm text-gray-600">
                      Add More Images
                    </label>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                          </svg>
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                        </div>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={(e) => {
                            if (e.target.files) {
                              setNewImages((prev) => [...prev, ...Array.from(e.target.files!)]);
                            }
                          }}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-4 ">
                  <button
                    type="button"
                    onClick={closeEditModal}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer transition-colors"
                    disabled={actionLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer transition-colors disabled:opacity-50"
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