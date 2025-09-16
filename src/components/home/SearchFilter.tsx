import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import PrimaryButton from "../reusable/PrimaryButton";

import map from "@/assets/icons/Location.svg";
import user from "@/assets/icons/userRounded.svg";
import home from "@/assets/icons/homeType.svg";
import calendar from "@/assets/icons/Calendar.svg";

import { useTranslation } from "react-i18next";
import { DateRange } from "react-day-picker";
import { useSearch } from "@/contexts/SearchContext";
import { Amenity, getAmenities, SearchParams } from "@/services/api";

interface PropertyType {
  value: string;
  label: string;
}

const SearchFilter = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [availableAmenities, setAvailableAmenities] = useState<Amenity[]>([]);
  const [availablePropertyTypes, setAvailablePropertyTypes] = useState<
    PropertyType[]
  >([]);
  const [localSearch, setLocalSearch] = useState({
    destination: "",
    maxPeople: "",
    propertyType: "",
    amenities: [] as string[],
    isTravelWithPets: false,
  });

  const { t } = useTranslation("banner");
  const { setSearchParams, performSearch } = useSearch();

  // Fetch amenities
  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        const data = await getAmenities();
        setAvailableAmenities(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAmenities();
  }, []);

  // Hardcoded property types (can be fetched from API)
  useEffect(() => {
    setAvailablePropertyTypes([
      { value: "HOME", label: t("search.home") },
      { value: "APARTMENT", label: t("search.apartment") },
      { value: "ROOM", label: t("search.room") },
      { value: "BOAT", label: t("search.boat") },
      { value: "VAN", label: t("search.van") },
    ]);
  }, [t]);

  // Handle input changes
  const handleInputChange = (
    field: string,
    value: string | string[] | boolean
  ) => {
    setLocalSearch((prev) => ({ ...prev, [field]: value }));
  };

  // Handle search action

  const handleSearch = async () => {
    const params: SearchParams = {};

    if (localSearch.destination) params.location = localSearch.destination;
    if (localSearch.maxPeople)
      params.maxPeople = parseInt(localSearch.maxPeople);
    if (localSearch.propertyType)
      params.propertyType = localSearch.propertyType;
    if (dateRange?.from)
      params.availabilityStartDate = dateRange.from.toISOString();
    if (dateRange?.to) params.availabilityEndDate = dateRange.to.toISOString();
    if (localSearch.amenities.length)
      params.amenities = localSearch.amenities.join(",");
    if (localSearch.isTravelWithPets) params.isTravelWithPets = true;

    setSearchParams(params); //  store params in context
    await performSearch(params); // pass fresh params directly (no stale state)
  };

  return (
    <div
      className="w-full max-w-[2066px] mx-auto px-4 py-6 rounded-xl lg:rounded-full"
      style={{
        backgroundImage: `url("/footerBg.svg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="bg-white rounded-xl lg:rounded-full px-4 lg:px-8 py-6 shadow-md">
        <div className="flex flex-col lg:flex-row items-stretch gap-6">
          {/* Destination */}
          <div className="flex-1">
            <label
              htmlFor="location"
              className="block text-sm text-dark-3 mb-1"
            >
              {t("search.placeholder")}
            </label>
            <div className="flex items-center gap-2">
              <img src={map} alt="map icon" className="w-5 h-5" />
              <Input
                id="location"
                value={localSearch.destination}
                onChange={(e) =>
                  handleInputChange("destination", e.target.value)
                }
                placeholder={t("search.placeInGreece")}
                className="w-full text-sm md:text-base bg-transparent border-none focus:ring-0 shadow-none"
              />
            </div>
          </div>

          {/* Guests */}
          <div className="flex-1">
            <label htmlFor="people" className="block text-sm text-dark-3 mb-1">
              {t("search.guest")}
            </label>
            <div className="flex items-center gap-2">
              <img src={user} alt="user icon" className="w-5 h-5" />
              <Input
                id="people"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={localSearch.maxPeople}
                onChange={(e) => handleInputChange("maxPeople", e.target.value)}
                placeholder={t("search.selectHere")}
                className="w-full text-sm md:text-base bg-transparent border-none focus:ring-0 shadow-none"
                onKeyPress={(e) => {
                  if (!/[0-9]/.test(e.key)) e.preventDefault();
                }}
              />
            </div>
          </div>

          {/* Property Type */}
          <div className="flex-1">
            <label htmlFor="type" className="block text-sm text-dark-3 mb-1">
              {t("search.propertyType")}
            </label>
            <div className="flex items-center gap-2">
              <img src={home} alt="home icon" className="w-5 h-5" />
              <Select
                value={localSearch.propertyType}
                onValueChange={(value) =>
                  handleInputChange("propertyType", value)
                }
              >
                <SelectTrigger className="w-full border-[#C4D7F1] cursor-pointer">
                  <SelectValue placeholder={t("search.home")} />
                </SelectTrigger>
                <SelectContent className="bg-white border-none cursor-pointer">
                  {availablePropertyTypes.map((type) => (
                    <SelectItem
                      key={type.value}
                      value={type.value}
                      className="cursor-pointer hover:bg-gray-100"
                    >
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Dates */}
          {/* <div className="flex-1">
            <label
              htmlFor="homeDate"
              className="block text-sm text-dark-3 mb-1"
            >
              {t("search.dates")}
            </label>
            <div className="flex items-center gap-2">
              <img src={calendar} alt="calendar icon" className="w-5 h-5" />
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    data-empty={!dateRange?.from}
                    className="w-full text-left font-normal bg-transparent border-none focus:ring-0 shadow-none"
                  >
                    {dateRange?.from
                      ? dateRange.to
                        ? `${format(dateRange.from, "LLL dd, y")} - ${format(
                            dateRange.to,
                            "LLL dd, y"
                          )}`
                        : format(dateRange.from, "LLL dd, y")
                      : t("search.pickADateRange")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white border">
                  <Calendar
                    mode="range"
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={1}
                    className="[--rdp-accent-color:#3174cd]"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div> */}
          {/* Dates */}
          <div className="flex-1">
            <label
              htmlFor="homeDate"
              className="block text-sm text-dark-3 mb-1"
            >
              {t("search.dates")}
            </label>
            <div className="flex items-center gap-2">
              <img src={calendar} alt="calendar icon" className="w-5 h-5" />
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    data-empty={!dateRange?.from}
                    className="w-full text-left font-normal bg-transparent border-none focus:ring-0 shadow-none"
                  >
                    {dateRange?.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "LLL dd, y")} -{" "}
                          {format(dateRange.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      <span>{t("search.pickADateRange")}</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white border">
                  <Calendar
                    mode="range"
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={1}
                    className="[--rdp-accent-color:#3174cd] [--rdp-background-color:theme(colors.blue.200)]"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Amenities */}
          <div className="flex-1">
            <label
              htmlFor="amenities"
              className="block text-sm text-dark-3 mb-1"
            >
              {t("search.amenities")}
            </label>
            <Select
              onValueChange={(value) =>
                handleInputChange("amenities", [
                  ...localSearch.amenities,
                  value,
                ])
              }
            >
              <SelectTrigger className="w-full border-[#C4D7F1]">
                <SelectValue placeholder="Amenities" />
              </SelectTrigger>
              <SelectContent className="bg-white border-none cursor-pointer">
                {availableAmenities.map((amenity) => (
                  <SelectItem
                    key={amenity.id}
                    value={amenity.id}
                    className="cursor-pointer hover:bg-gray-100"
                  >
                    {amenity.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Pets */}
          <div className="flex-1 flex items-center gap-2">
            <input
              id="pets"
              type="checkbox"
              checked={localSearch.isTravelWithPets}
              onChange={(e) =>
                handleInputChange("isTravelWithPets", e.target.checked)
              }
              className="w-5 h-5 cursor-pointer"
            />
            <label htmlFor="pets" className="text-sm text-dark-3">
              Travel with Pets
            </label>
          </div>

          {/* Search Button */}
          <div className="flex-1 flex items-end">
            <PrimaryButton
              onClick={handleSearch}
              title={t("search.search")}
              textColor="text-white w-full text-sm md:text-base text-center lg:text-lg"
              bgColor="bg-primary-blue hover:brightness-90"
              bgImage="/buttonHomeIcon.svg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
