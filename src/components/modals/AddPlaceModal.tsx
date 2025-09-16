import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { addProperty } from "@/store/Slices/PropertySlice/propertySlice";
import { Property } from "@/types/property";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Label } from "../ui/label";
import {
  fetchMainAmenities,
  fetchTransportAmenities,
  fetchSurroundingAmenities,
  AmenityItem,
} from "@/store/Slices/OnboardingSlice/AmenitySlice";
import { X } from "lucide-react";
import CalendarRangePicker from "../onboarding/CalendarRangePicker";
import { MdCancel } from "react-icons/md";

// Calendar picker

interface AddPlaceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddPlaceModal = ({ isOpen, onClose }: AddPlaceModalProps) => {
  const dispatch = useAppDispatch();
  const { main, transport, surrounding, loading, error } = useAppSelector(
    (state) => state.amenities
  );

  const [formData, setFormData] = useState<Property>({
    title: "",
    description: "",
    location: "",
    country: "",
    price: 0,
    size: 0,
    bedrooms: 0,
    bathrooms: 0,
    propertyType: "HOME",
    maxPeople: 1,
    isTravelWithPets: false,
    isAvailable: true,
    availabilityStartDate: "",
    availabilityEndDate: "",
    amenities: [],
    transports: [],
    surroundings: [],
  });

  const [files, setFiles] = useState<File[]>([]);

  // Fetch amenities on open
  useEffect(() => {
    if (isOpen) {
      dispatch(fetchMainAmenities());
      dispatch(fetchTransportAmenities());
      dispatch(fetchSurroundingAmenities());
    }
  }, [isOpen, dispatch]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? Number(value)
          : value,
    });
  };

  // Toggle amenities/transport/surroundings
  const toggleSelection = (
    category: "amenities" | "transports" | "surroundings",
    id: string
  ) => {
    const current = formData[category] || [];
    const updated = current.includes(id)
      ? current.filter((item) => item !== id)
      : [...current, id];

    setFormData({
      ...formData,
      [category]: updated,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const totalFiles = [...files, ...newFiles].slice(0, 5);
      setFiles(totalFiles);
    }
  };

  const removeFile = (index: number) => {
    const updated = [...files];
    updated.splice(index, 1);
    setFiles(updated);
  };

  // const handleDateChange = (dates: {
  //   start: Date | null;
  //   end: Date | null;
  // }) => {
  //   setFormData({
  //     ...formData,
  //     availabilityStartDate: dates.start
  //       ? dates.start.toISOString().split("T")[0]
  //       : "",
  //     availabilityEndDate: dates.end
  //       ? dates.end.toISOString().split("T")[0]
  //       : "",
  //   });
  // };
  const handleDateChange = (dates: {
    start: Date | null;
    end: Date | null;
  }) => {
    // Helper function to format date without timezone issues
    const formatDate = (date: Date | null): string => {
      if (!date) return "";
      // Use local date components instead of ISO string
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    setFormData({
      ...formData,
      availabilityStartDate: formatDate(dates.start),
      availabilityEndDate: formatDate(dates.end),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // build payload
    const payload: Property = {
      ...formData,
      price: Number(formData.price),
      size: Number(formData.size),
      bedrooms: Number(formData.bedrooms),
      bathrooms: Number(formData.bathrooms),
      maxPeople: Number(formData.maxPeople),
    };

    // build FormData for backend
    const formDataToSend = new FormData();
    formDataToSend.append("data", JSON.stringify(payload));

    if (files.length) {
      files.forEach((file) => {
        formDataToSend.append("files", file);
      });
    }

    dispatch(addProperty(formDataToSend));
    toast.success("Property added successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[600px] overflow-y-auto p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold mb-6">Add Place</h2>
          <button type="button" onClick={onClose} className="">
            <MdCancel className="w-8 h-8" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Title</Label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border p-2 rounded mt-1"
                required
              />
            </div>
            <div>
              <Label>Property Type</Label>
              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                className="w-full border p-2 rounded mt-1"
              >
                <option value="HOME">Home</option>
                <option value="APARTMENT">Apartment</option>
                <option value="ROOM">Room</option>
                <option value="BOAT">Boat</option>
                <option value="VAN">Van</option>
              </select>
            </div>
          </div>

          <div>
            <Label>Description</Label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Location</Label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full border p-2 rounded mt-1"
                required
              />
            </div>
            <div>
              <Label>Country</Label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full border p-2 rounded mt-1"
                required
              />
            </div>
          </div>

          {/* Numeric Fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Price (Eur)</Label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full border p-2 rounded mt-1"
                required
              />
            </div>
            <div>
              <Label>Size (sqft)</Label>
              <input
                type="number"
                name="size"
                value={formData.size}
                onChange={handleChange}
                className="w-full border p-2 rounded mt-1"
                required
              />
            </div>
            <div>
              <Label>Max People</Label>
              <input
                type="number"
                name="maxPeople"
                value={formData.maxPeople}
                onChange={handleChange}
                className="w-full border p-2 rounded mt-1"
                min={1}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Bedrooms</Label>
              <input
                type="number"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                className="w-full border p-2 rounded mt-1"
                required
              />
            </div>
            <div>
              <Label>Bathrooms</Label>
              <input
                type="number"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                className="w-full border p-2 rounded mt-1"
                required
              />
            </div>
          </div>

          {/* Availability Dates */}
          <div>
            <Label>Availability Dates</Label>
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

          {/* Checkboxes */}
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isAvailable"
                checked={formData.isAvailable}
                onChange={handleChange}
              />
              Is Available
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isTravelWithPets"
                checked={formData.isTravelWithPets}
                onChange={handleChange}
              />
              Travel with Pets Allowed?
            </label>
          </div>

          {/* Amenities */}
          <div>
            <Label className="mb-5">Amenities</Label>
            {loading ? (
              <p>Loading amenities...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {main.map((item: AmenityItem) => (
                  <div
                    key={item.id}
                    onClick={() => toggleSelection("amenities", item.id)}
                    className={`p-3 border border-primary-blue rounded-lg cursor-pointer flex flex-col items-center ${
                      formData.amenities?.includes(item.id)
                        ? "bg-blue-100 border-blue-500"
                        : "hover:bg-blue-100 hover:shadow-lg"
                    }`}
                  >
                    <img
                      src={item.icon}
                      alt={item.name}
                      className="w-6 h-6 mb-1"
                    />
                    <span className="text-sm">{item.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Transport */}
          <div>
            <Label className="mb-5">Transport</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {transport.map((item: AmenityItem) => (
                <div
                  key={item.id}
                  onClick={() => toggleSelection("transports", item.id)}
                  className={`p-3 border border-primary-blue rounded-lg cursor-pointer flex flex-col items-center ${
                    formData.transports?.includes(item.id)
                      ? "bg-blue-100 border-blue-500"
                      : "hover:bg-blue-100 hover:shadow-lg"
                  }`}
                >
                  <img
                    src={item.icon}
                    alt={item.name}
                    className="w-6 h-6 mb-1"
                  />
                  <span className="text-sm">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Surroundings */}
          <div>
            <Label className="mb-5">Surroundings</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {surrounding.map((item: AmenityItem) => (
                <div
                  key={item.id}
                  onClick={() => toggleSelection("surroundings", item.id)}
                  className={`p-3 border border-primary-blue rounded-lg cursor-pointer flex flex-col items-center ${
                    formData.surroundings?.includes(item.id)
                      ? "bg-blue-100 border-blue-500"
                      : "hover:bg-blue-100 hover:shadow-lg"
                  }`}
                >
                  <img
                    src={item.icon}
                    alt={item.name}
                    className="w-6 h-6 mb-1"
                  />
                  <span className="text-sm">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* File Upload with preview */}
          <div>
            <Label>Upload Images (max 5)</Label>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="w-full border p-2 rounded mt-2"
              accept="image/*"
            />
            <div className="flex flex-wrap gap-4 mt-3">
              {files.map((file, index) => (
                <div key={index} className="relative w-24 h-24">
                  <img
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    className="w-full h-full object-cover rounded-lg border"
                  />
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-primary-blue text-white hover:brightness-90"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPlaceModal;
