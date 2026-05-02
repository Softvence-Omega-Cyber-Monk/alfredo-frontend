import { useAppDispatch } from "@/hooks/useRedux";
import { addProperty } from "@/store/Slices/PropertySlice/propertySlice";
import { Property } from "@/types/property";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Label } from "../ui/label";
import { getAmenities, getTransports, getSurroundings } from "@/services/api";
// import { X } from "lucide-react";
// import CalendarRangePicker from "../onboarding/CalendarRangePicker";
import { MdCancel } from "react-icons/md";
import CountryCitySelect from "../reusable/CountryCitySelect";
import { useTranslation } from "react-i18next";
import CalendarRangePickerNew from "../home/CalendarRangePickerNew";

interface AddPlaceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AmenityItem {
  id: string;
  name: string;
  greek_name?: string;
  icon?: string;
}

type PropertyForm = Omit<
  Property,
  "size" | "bedrooms" | "bathrooms" | "maxPeople" | "price"
> & {
  size: string | number;
  bedrooms: string | number;
  bathrooms: string | number;
  maxPeople: string | number;
  price: string | number;
};

const AddPlaceModal = ({ isOpen, onClose }: AddPlaceModalProps) => {
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation("addPlaceModal");
  const currentLanguage = i18n.language;

  // State for fetched data
  const [amenities, setAmenities] = useState<AmenityItem[]>([]);
  const [transports, setTransports] = useState<AmenityItem[]>([]);
  const [surroundings, setSurroundings] = useState<AmenityItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<PropertyForm>({
    title: "",
    description: "",
    location: "",
    country: "Greece",
    price: "",
    size: "",
    bedrooms: "",
    bathrooms: "",
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

  // Fetch data from backend when modal opens or language changes
  useEffect(() => {
    const fetchData = async () => {
      if (!isOpen) return;

      setLoading(true);
      setError(null);

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
        console.error("Failed to load filter options:", err);
        setError("Failed to load amenities");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isOpen, currentLanguage]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

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
      const totalFiles = [...files, ...newFiles].slice(0, 30);
      setFiles(totalFiles);
    }
  };

  const removeFile = (index: number) => {
    const updated = [...files];
    updated.splice(index, 1);
    setFiles(updated);
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

    setFormData({
      ...formData,
      availabilityStartDate: formatDate(dates.start),
      availabilityEndDate: formatDate(dates.end),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: Property = {
      ...formData,
      price: Number(formData.price),
      size: Number(formData.size),
      bedrooms: Number(formData.bedrooms),
      bathrooms: Number(formData.bathrooms),
      maxPeople: Number(formData.maxPeople),
    };

    const formDataToSend = new FormData();
    formDataToSend.append("data", JSON.stringify(payload));
    if (files.length) {
      files.forEach((file) => {
        formDataToSend.append("files", file);
      });
    }

    dispatch(addProperty(formDataToSend));
    toast.success(t("successMessage"));
    onClose();
  };

  return (
    <div className="fixed inset-0 lg:top-24 flex items-center justify-center bg-black/50 backdrop-blur-sm z-100">
      <div className="bg-[#f9f9f9] rounded-lg shadow-lg w-full max-w-4xl max-h-[600px] overflow-y-auto scrollbar-hide [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-transparent
  /* Thumb */
  [&::-webkit-scrollbar-thumb]:bg-blue-300
  [&::-webkit-scrollbar-thumb]:rounded-full
  /* Hover effect */
  hover:[&::-webkit-scrollbar-thumb]:bg-blue-400  p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold mb-6">{t("title")}</h2>
          <button type="button" onClick={onClose} className="cursor-pointer">
            <MdCancel className="w-8 h-8 hover:text-blue-600 transition-colors duration-300" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6 ">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-700">{t("fields.title")}</Label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border p-2 rounded mt-2 border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400"
                required
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">{t("fields.propertyType")}</Label>
              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                className="w-full border p-2 rounded mt-1 border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400"
              >
                <option value="HOME">{t("propertyTypes.home")}</option>
                <option value="APARTMENT">
                  {t("propertyTypes.apartment")}
                </option>
                <option value="ROOM">{t("propertyTypes.room")}</option>
                <option value="BOAT">{t("propertyTypes.boat")}</option>
                <option value="VAN">{t("propertyTypes.van")}</option>
              </select>
            </div>
          </div>
          <div>
            <Label className="text-sm font-medium text-gray-700">{t("fields.description")}</Label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1 border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400"
              required
            />
          </div>
          <div className="4">
            <CountryCitySelect formData={formData} setFormData={setFormData} />
          </div>
          {/* Numeric Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-700">{t("fields.size")}</Label>
              <input
                type="number"
                name="size"
                value={formData.size}
                onChange={handleChange}
                className="w-full border p-2 rounded mt-1 border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400"
                required
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">{t("fields.maxPeople")}</Label>
              <input
                type="number"
                name="maxPeople"
                value={formData.maxPeople}
                onChange={handleChange}
                className="w-full border p-2 rounded mt-1 border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400"
                min={1}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-700">{t("fields.bedrooms")}</Label>
              <input
                type="number"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                className="w-full border p-2 rounded mt-1 border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400"
                required
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">{t("fields.bathrooms")}</Label>
              <input
                type="number"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                className="w-full border p-2 rounded mt-1 border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400"
                required
              />
            </div>
          </div>
          {/* Availability Dates */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-4">{t("fields.availabilityDates")}</Label>
            <CalendarRangePickerNew
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
              {t("fields.isAvailable")}
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isTravelWithPets"
                checked={formData.isTravelWithPets}
                onChange={handleChange}
              />
              {t("fields.travelWithPets")}
            </label>
          </div>
          {/* Amenities */}
          <div>
            <Label className="mb-5">{t("sections.amenities")}</Label>
            {loading ? (
              <p>{t("loading")}</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {amenities.map((item: AmenityItem) => (
                  <div
                    key={item.id}
                    onClick={() => toggleSelection("amenities", item.id)}
                    className={`p-3 border border-primary-blue rounded-lg cursor-pointer flex flex-col items-center ${formData.amenities?.includes(item.id)
                      ? "bg-blue-100 border-blue-500"
                      : "hover:bg-blue-100 hover:shadow-lg"
                      }`}
                  >
                    <img
                      src={item.icon}
                      alt={item.name}
                      className="w-6 h-6 mb-1"
                    />
                    <span className="text-sm">
                      {currentLanguage === "el" && item.greek_name
                        ? item.greek_name
                        : item.name}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Transport */}
          <div>
            <Label className="mb-5">{t("sections.transport")}</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {transports.map((item: AmenityItem) => (
                <div
                  key={item.id}
                  onClick={() => toggleSelection("transports", item.id)}
                  className={`p-3 border border-primary-blue rounded-lg cursor-pointer flex flex-col items-center ${formData.transports?.includes(item.id)
                    ? "bg-blue-100 border-blue-500"
                    : "hover:bg-blue-100 hover:shadow-lg"
                    }`}
                >
                  <img
                    src={item.icon}
                    alt={item.name}
                    className="w-6 h-6 mb-1"
                  />
                  <span className="text-sm">
                    {currentLanguage === "el" && item.greek_name
                      ? item.greek_name
                      : item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {/* Surroundings */}
          <div>
            <Label className="mb-5">{t("sections.surroundings")}</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {surroundings.map((item: AmenityItem) => (
                <div
                  key={item.id}
                  onClick={() => toggleSelection("surroundings", item.id)}
                  className={`p-3 border border-primary-blue rounded-lg cursor-pointer flex flex-col items-center ${formData.surroundings?.includes(item.id)
                    ? "bg-blue-100 border-blue-500"
                    : "hover:bg-blue-100 hover:shadow-lg"
                    }`}
                >
                  <img
                    src={item.icon}
                    alt={item.name}
                    className="w-6 h-6 mb-1"
                  />
                  <span className="text-sm">
                    {currentLanguage === "el" && item.greek_name
                      ? item.greek_name
                      : item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {/* File Upload with preview */}
          <div>
            <Label>{t("fields.uploadImages")}</Label>

            {/* Image Previews */}
            {files.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-3 mb-4">
                {files.map((file, index) => (
                  <div key={index} className="relative group aspect-square">
                    <img
                      src={URL.createObjectURL(file)}
                      alt="preview"
                      className="w-full h-full object-cover rounded-lg border border-blue-200"
                    />
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Upload Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-2">
              {/* File Upload */}
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-8 h-8 mb-2 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                  </svg>
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">Upload from File</span>
                  </p>
                </div>
                <input
                  type="file"
                  multiple
                  accept="image/*,.heic,.heif,.HEIC,.HEIF"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              {/* Camera Upload */}
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-8 h-8 mb-2 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">Take a Photo</span>
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/*,.heic,.heif,.HEIC,.HEIF"
                  capture="environment"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>
          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 cursor-pointer"
            >
              {t("buttons.cancel")}
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-primary-blue text-white hover:brightness-90 cursor-pointer"
            >
              {t("buttons.save")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPlaceModal;
