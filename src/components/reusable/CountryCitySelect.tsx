import { useTranslation } from "react-i18next";

interface CountryCityFields {
  country: string;
  location: string;
}

interface CountryCitySelectProps<T extends CountryCityFields> {
  formData: T;
  setFormData: React.Dispatch<React.SetStateAction<T>>;
}

const CountryCitySelect = <T extends CountryCityFields>({
  formData,
  setFormData,
}: CountryCitySelectProps<T>) => {
  const { t } = useTranslation("addPlaceModal");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Country Locked to Greece */}
      <div>
        <label className="block mb-1 font-medium">{t("fields.country")}</label>
        <input
          type="text"
          className="w-full border p-2 rounded bg-gray-100 cursor-pointer"
          value={t("countryValue")}
          disabled
        />
      </div>

      {/* Manual City Input */}
      <div>
        <label className="block mb-1 font-medium">{t("fields.city")}</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              location: e.target.value,
              country: "Greece", // Ensure backend always receives Greece
            }))
          }
          className="w-full border p-2 rounded"
          placeholder={t("fields.cityPlaceholder")}
          required
        />
      </div>
    </div>
  );
};

export default CountryCitySelect;
