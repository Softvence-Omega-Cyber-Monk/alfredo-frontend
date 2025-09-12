import { useAppDispatch } from "@/hooks/useRedux";
import { addProperty } from "@/store/Slices/PropertySlice/propertySlice";
import { Property } from "@/types/property";
import { useState } from "react";
import { toast } from "sonner";
import { Label } from "../ui/label";

interface AddPlaceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddPlaceModal = ({ isOpen, onClose }: AddPlaceModalProps) => {
  const [formData, setFormData] = useState<Property>({
    title: "",
    description: "",
    location: "",
    country: "",
    price: 0,
    size: 0,
    bedrooms: 0,
    bathrooms: 0,
    isAvailable: true,
  });

  const dispatch = useAppDispatch();

  const [files, setFiles] = useState<FileList | null>(null);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // convert number fields properly
    const payload: Property = {
      ...formData,
      price: Number(formData.price),
      size: Number(formData.size),
      bedrooms: Number(formData.bedrooms),
      bathrooms: Number(formData.bathrooms),
    };

    // build FormData for backend
    const formDataToSend = new FormData();
    formDataToSend.append("data", JSON.stringify(payload));

    if (files) {
      Array.from(files).forEach((file) => {
        formDataToSend.append("files", file);
      });
    }

    console.log("Submitting form data:", payload, files);

    dispatch(addProperty(formDataToSend));
    toast.success("Property added successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm transition z-100">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Add Place</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Label>Title:</Label>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
            required
          />
          <Label>Description:</Label>
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
            required
          />
          <Label>Location:</Label>
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
            required
          />
          <Label>Country:</Label>
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
            required
          />
          <div className="lg:flex items-center gap-4">
            <div className="w-1/2">
              <Label>Price:</Label>
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                className="w-full border p-2 rounded mt-2"
                required
              />
            </div>
            <div className="w-1/2">
              <Label>Size:</Label>
              <input
                type="number"
                name="size"
                placeholder="Size (sqft)"
                value={formData.size}
                onChange={handleChange}
                className="w-full border p-2 rounded mt-2"
                required
              />
            </div>
          </div>
          <div className="lg:flex gap-4">
            <div className="w-1/2">
              <Label>Bedrooms:</Label>
              <input
                type="number"
                name="bedrooms"
                placeholder="Bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                className="w-full border p-2 rounded mt-2"
                required
              />
            </div>
            <div className="w-1/2">
              <Label>Bathrooms:</Label>
              <input
                type="number"
                name="bathrooms"
                placeholder="Bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                className="w-full border p-2 rounded mt-2"
                required
              />
            </div>
          </div>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isAvailable"
              checked={formData.isAvailable}
              onChange={handleChange}
            />
            Is your home Available?
          </label>

          {/* File Upload */}
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="w-full border p-2 rounded"
          />

          <div className="flex justify-end gap-3">
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
