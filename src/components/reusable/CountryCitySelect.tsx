import axios from "axios";
import { useEffect, useState } from "react";

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
  const [countries, setCountries] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    axios
      .get("https://countriesnow.space/api/v0.1/countries/positions")
      .then((res) => setCountries(res.data.data.map((c: any) => c.name)))
      .catch(console.error);
  }, []);

  const handleCountryChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCountry = e.target.value;
    setFormData((prev) => ({
      ...prev,
      country: selectedCountry,
      location: "",
    }));

    try {
      const res = await axios.post(
        "https://countriesnow.space/api/v0.1/countries/cities",
        { country: selectedCountry }
      );
      setCities(res.data.data);
    } catch (error) {
      console.error(error);
      setCities([]);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block mb-1 font-medium">Country</label>
        <select
          name="country"
          value={formData.country}
          onChange={handleCountryChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select a country</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">City</label>
        <select
          name="location"
          value={formData.location}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              location: e.target.value,
            }))
          }
          className="w-full border p-2 rounded"
          required
          disabled={!cities.length}
        >
          <option value="">Select a city</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CountryCitySelect;
