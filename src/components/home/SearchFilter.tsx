import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import PrimaryButton from "../reusable/PrimaryButton";
// import CalendarRangePicker from "../onboarding/CalendarRangePicker";

import map from "@/assets/icons/Location.svg";
import userIcon from "@/assets/icons/userRounded.svg";
import home from "@/assets/icons/homeType.svg";
import calendar from "@/assets/icons/Calendar.svg";

import { useTranslation } from "react-i18next";
import { useSearch } from "@/contexts/SearchContext";
import { SearchParams } from "@/services/api";
import SearchCombinedFilter from "./SearchCombinedFilter";
import CalendarRangePickerNew from "./CalendarRangePickerNew";
import { useAppSelector } from "@/hooks/useRedux";
import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import api from "@/services/api";
import axios from "axios";
import { toast } from "sonner";

interface PropertyType {
  value: string;
  label: string;
}

const SearchFilter = () => {
  const [availabilityDates, setAvailabilityDates] = useState<{
    start: Date | null;
    end: Date | null;
  }>({
    start: null,
    end: null,
  });
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const [localSearch, setLocalSearch] = useState({
    destination: "",
    maxPeople: "",
    propertyType: "",
    isTravelWithPets: false,
  });

  const { t, i18n } = useTranslation("banner");
  const currentLanguage = i18n.language;
  const { setSearchParams, performSearch } = useSearch();
  const { data: userData } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  // Memoized property types
  const availablePropertyTypes = useMemo<PropertyType[]>(() => [
    { value: "HOME", label: t("search.home") },
    { value: "APARTMENT", label: t("search.apartment") },
    { value: "ROOM", label: t("search.room") },
    { value: "BOAT", label: t("search.boat") },
    { value: "VAN", label: t("search.van") },
  ], [t]);

  // Handle date changes from CalendarRangePicker
  const handleDateChange = (dates: {
    start: Date | null;
    end: Date | null;
  }) => {
    setAvailabilityDates(dates);
  };

  // Format date for display
  const formatDateDisplay = (date: Date | null): string => {
    if (!date) return "";
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  // Build and run search
  const runSearch = async (override?: Partial<SearchParams>) => {
    const params: SearchParams = {};

    if (localSearch.destination) params.location = localSearch.destination;
    if (localSearch.maxPeople)
      params.maxPeople = parseInt(localSearch.maxPeople);
    if (localSearch.propertyType)
      params.propertyType = localSearch.propertyType;
    if (availabilityDates.start)
      params.availabilityStartDate = availabilityDates.start.toISOString();
    if (availabilityDates.end)
      params.availabilityEndDate = availabilityDates.end.toISOString();
    if (localSearch.isTravelWithPets) params.isTravelWithPets = true;

    Object.assign(params, override);

    setSearchParams(params);
    await performSearch(params);
  };

  const handleBasePlanCheckout = async () => {
    try {
      setCheckoutLoading(true);
      // Fetch plans to find the Base plan ID/PriceID
      const res = await api.get("/plans");
      const plans = res.data.data;

      const basePlan = plans.find((p: any) => {
        const translation = p.translations.find((tr: any) => tr.language === (currentLanguage === "en" ? "en" : "el")) || p.translations.find((tr: any) => tr.language === "en");
        return translation?.name?.toLowerCase().includes("base");
      });

      if (!basePlan) {
        // Fallback to plans page if base plan not found
        navigate("/plans");
        return;
      }

      const planTranslation = basePlan.translations.find((tr: any) => tr.language === (currentLanguage === "en" ? "en" : "el")) || basePlan.translations.find((tr: any) => tr.language === "en");
      const planDuration = planTranslation?.planType === "TWO_YEARLY" ? 2 : 1;

      const payload = {
        priceId: basePlan.priceId,
        planId: basePlan.id,
        planDuration,
      };

      const response = await api.post("/stripe-payment/checkout", payload);
      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Checkout failed");
      } else {
        toast.error("Unexpected error occurred");
      }
      navigate("/plans"); // Fallback
    } finally {
      setCheckoutLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setLocalSearch((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div
      className="w-full mx-auto px-4 py-6 rounded-xl lg:rounded-full"
      style={{
        backgroundImage: `url("/footerBg.svg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="bg-white rounded-xl lg:rounded-full px-4 lg:px-4 py-6 shadow-md">
        <div className="flex flex-col lg:flex-row items-stretch gap-2 flex-wrap">
          {/* Destination */}
          <div className="flex-1">
            <label className="block text-sm text-dark-3 mb-1">
              {t("search.placeholder")}
            </label>
            <div className="flex items-center gap-2 border border-[#C4D7F1] text-xs px-2 rounded-lg">
              <img src={map} alt="map icon" className="w-5 h-5" />
              <Input
                value={localSearch.destination}
                onChange={(e) =>
                  handleInputChange("destination", e.target.value)
                }
                placeholder={t("search.placeInGreece")}
                className="w-full text-sm py-5 md:text-base bg-transparent border-none focus:ring-0 shadow-none placeholder:text-xs px-0"
              />
            </div>
          </div>

          {/* Guests */}
          <div className="flex-1">
            <label className="block text-sm text-dark-3 mb-1 ">
              {t("search.guest")}
            </label>
            <div className="flex items-center gap-2 border border-[#C4D7F1] px-2 rounded-lg">
              <img src={userIcon} alt="user icon" className="w-5 h-5" />
              <Input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={localSearch.maxPeople}
                onChange={(e) => handleInputChange("maxPeople", e.target.value)}
                placeholder={t("search.selectHere")}
                className="w-full text-sm md:text-xs py-5 bg-transparent border-none focus:ring-0 shadow-none placeholder:text-xs px-0"
                onKeyPress={(e) => {
                  if (!/[0-9]/.test(e.key)) e.preventDefault();
                }}
              />
            </div>
          </div>

          {/* Property Type */}
          <div className="flex-1">
            <label className="block text-sm text-dark-3 mb-1">
              {t("search.propertyType")}
            </label>
            <div className="flex items-center gap-2 border p-0.5 px-2 rounded-lg border-[#C4D7F1] ">
              <img src={home} alt="home icon" className="w-5 h-5" />
              <div className="flex-1">
                <Select
                  value={localSearch.propertyType}
                  onValueChange={(value) =>
                    handleInputChange("propertyType", value)
                  }
                >
                  <SelectTrigger className="w-full border-none cursor-pointer text-gray-600 text-xs px-0 justify-start">
                    <SelectValue placeholder={t("search.home")} />
                  </SelectTrigger>
                  <SelectContent className=" bg-white border-none ">
                    {availablePropertyTypes.map((type) => (
                      <SelectItem
                        key={type.value}
                        value={type.value}
                        className="cursor-pointer"
                      >
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Dates - Using CalendarRangePicker in Popover */}
          <div className="flex-1">
            <label className="block text-sm text-dark-3 mb-1">
              {t("search.dates")}
            </label>
            <div className="flex items-center gap-2 border border-[#C4D7F1] p-0.5 px-1 w-[170px] rounded-lg">
              <img src={calendar} alt="calendar icon" className="w-5 h-5" />
              <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-start font-normal bg-transparent border-none text-xs focus:ring-0 shadow-none hover:bg-transparent px-0"
                  >
                    {availabilityDates.start && availabilityDates.end ? (
                      <span className="text-dark-3">
                        {formatDateDisplay(availabilityDates.start)} -{" "}
                        {formatDateDisplay(availabilityDates.end)}
                      </span>
                    ) : availabilityDates.start ? (
                      <span className="text-dark-3">
                        {formatDateDisplay(availabilityDates.start)}
                      </span>
                    ) : (
                      <span className="text-dark-3 flex items-center ">
                        {t("search.pickADateRange")}
                      </span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto border-none shadow-none"
                // align="start"
                >
                  <CalendarRangePickerNew
                    availabilityDates={availabilityDates}
                    onAvailabilityChange={(dates) => {
                      handleDateChange(dates);
                      // Close popover when both dates are selected
                      if (dates.start && dates.end) {
                        // setIsCalendarOpen(false);
                      }
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/*  Combined Amenities + Transport + Surroundings */}
          <div className="flex-1 cursor-pointer p-0.5">
            <label className="block text-sm text-dark-3 mb-1 ">
              {t("search.amenities")}
            </label>
            <SearchCombinedFilter />
          </div>

          {/* Pets */}
          <div className="flex-1 flex items-center gap-2 p-0.5 mt-4">
            <input
              id="pets"
              type="checkbox"
              checked={localSearch.isTravelWithPets}
              onChange={(e) =>
                handleInputChange("isTravelWithPets", e.target.checked)
              }
              className="w-5 h-5 cursor-pointer "
            />
            <label htmlFor="pets" className="text-sm text-dark-3">
              {t("search.selectpet")}
            </label>
          </div>

          {/* Search Button */}
          <div className="flex-1 flex items-end mt-3">
            <PrimaryButton
              onClick={() => {
                if (!userData?.subscriptions?.some(sub => sub.status === "ACTIVE")) {
                  handleBasePlanCheckout();
                } else {
                  runSearch();
                }
              }}
              disabled={checkoutLoading}
              title={
                <div className="flex items-center gap-2">
                  {checkoutLoading ? "..." : t("search.search")}
                  {!userData?.subscriptions?.some(sub => sub.status === "ACTIVE") && !checkoutLoading && <FaLock className="w-3 h-3 text-white/70" />}
                </div>
              }
              textColor="text-white w-full text-sm md:text-base text-center lg:text-lg"
              bgColor={!userData?.subscriptions?.some(sub => sub.status === "ACTIVE") ? "bg-gray-400" : "bg-primary-blue hover:brightness-90"}
              bgImage="/buttonHomeIcon.svg"
              className={!userData?.subscriptions?.some(sub => sub.status === "ACTIVE") ? "grayscale opacity-80" : ""}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
