import React from "react";
import { useSearch } from "@/contexts/SearchContext";
import { PropertyData } from "@/services/api";
import { MapPin, House, Building, User } from "lucide-react";

import cardStar from "@/assets/home/star.svg";
import { useTranslation } from "react-i18next";
import PrimaryButton from "../reusable/PrimaryButton";
import { useNavigate } from "react-router-dom";
import PageLoader from "@/common/PageLoader";

const SearchResults: React.FC = () => {
  const navigate = useNavigate();
  const { searchResults, isLoading, error, hasSearched } = useSearch();
  const { t } = useTranslation("futureList");

  // 🔄 Loading state
  if (isLoading) {
    return (
      <div>
        <PageLoader />
      </div>
    );
  }

  // ❌ Error state
  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }

  // 📭 No results state (only after search is triggered)
  if (hasSearched && searchResults.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500 text-lg font-medium">
        No data found
      </div>
    );
  }

  // ✅ Results state
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {searchResults.map((item: PropertyData) => (
        <div key={item.id} className="p-3 rounded-3xl bg-[#d9e0ec]">
          {/* Main Image */}
          <div className="rounded-2xl overflow-hidden max-h-64 relative">
            {item.images && item.images.length > 0 && (
              <img
                src={item.images[0].url}
                alt={item.title || "Property"}
                className="w-full h-full object-cover"
              />
            )}

            {/* Bottom overlay with avatar & rating */}
            <div className="absolute bottom-4 left-4 right-4 z-10 flex justify-between items-end bg-white/80 rounded-2xl backdrop-blur-sm p-3">
              <div className="flex items-center gap-2 rounded-full">
                <img
                  src={item.images?.[0]?.url || ""}
                  alt={"Owner"}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <h3 className="text-dark-2 font-semibold text-base">
                  {item.owner?.fullName || "Unknown"}
                </h3>
              </div>

              <div className="relative w-8 h-8 rounded-full">
                <img
                  src={cardStar}
                  className="w-full h-full object-cover"
                  alt="rating"
                />
                <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-semibold">
                  5.0
                </span>
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="mt-4 px-2">
            {/* Location */}
            <div className="flex items-center gap-1 text-dark-3 font-regular text-base">
              <MapPin className="text-primary-blue w-5 h-5" />
              <span>{item.homeAddress}</span>
            </div>

            {/* Title */}
            <h3 className="text-dark-3 font-semibold text-2xl my-4">
              {item.title || "Unnamed Property"}
            </h3>

            {/* Features */}
            <div className="my-4 grid grid-cols-3 gap-3">
              {item.maxPeople !== undefined && (
                <div className="flex flex-col justify-center text-center items-center gap-1">
                  <User className="text-primary-blue w-5 h-5" />
                  <p className="text-dark-3 font-regular text-sm">
                    {item.maxPeople} People
                  </p>
                </div>
              )}
              {item.propertyType && (
                <div className="flex flex-col justify-center text-center items-center gap-1">
                  <House className="text-primary-blue w-5 h-5" />
                  <p className="text-dark-3 font-regular text-sm">
                    {item.propertyType}
                  </p>
                </div>
              )}
              {item.availabilityStartDate && (
                <div className="flex flex-col justify-center text-center items-center gap-1">
                  <Building className="text-primary-blue w-5 h-5" />
                  <p className="text-dark-3 font-regular text-sm">
                    From{" "}
                    {new Date(item.availabilityStartDate).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>

            {/* Amenities */}
            {item.amenities && item.amenities.length > 0 && (
              <div className="mt-2">
                <h4 className="font-medium mb-2">Amenities:</h4>
                <div className="flex flex-wrap gap-2">
                  {item.amenities.map((amenity) => (
                    <span
                      key={amenity.id}
                      className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                    >
                      {amenity.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Button */}
          <PrimaryButton
            title={t("viewDetails")}
            textColor="text-primary-blue"
            bgColor="bg-[#F4F7FC] w-full hover:bg-primary-blue hover:text-white"
            borderColor="border-2 border-primary-blue"
            bgImage="/cardButtonHome.svg"
            onClick={() => navigate(`/home-details/${item.id}`)}
          />
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
