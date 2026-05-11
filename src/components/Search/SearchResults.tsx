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
  const { t, i18n } = useTranslation(["futureList", "onboarding", "addPlaceModal"]);
  const currentLanguage = i18n.language;

  return (
    <div className="p-4">
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <PageLoader />
        </div>
      ) : error ? (
        <div className="p-4 text-center text-red-500">{error}</div>
      ) : hasSearched && searchResults.length === 0 ? (
        <div className="p-6 text-center text-gray-500 text-lg font-medium">
          No data found
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchResults.map((item: PropertyData) => (
            <div key={item.id} className="p-3 rounded-3xl bg-[#d9e0ec] flex flex-col h-full">
              {/* Main Image */}
              <div className="rounded-2xl overflow-hidden h-64 relative shrink-0">
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
                      src={item.owner?.photo || "/defaultAvatar.png"}
                      alt={"Owner"}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <h3 className="text-dark-2 font-semibold text-base truncate max-w-[120px]">
                      {item.owner?.fullName || "Unknown"}
                    </h3>
                  </div>

                  <div className="relative w-8 h-8 rounded-full">
                    <img
                      src={cardStar}
                      className="w-full h-full object-cover"
                      alt="rating"
                    />
                    <span className="absolute inset-0 flex items-center justify-center text-white text-[10px] font-semibold">
                      {item.averageRating?.toFixed(1) || "5.0"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Info Section */}
              <div className="mt-4 px-2 flex-grow flex flex-col">
                {/* Location */}
                <div className="flex items-center gap-1 text-dark-3 font-regular text-base">
                  <MapPin className="text-primary-blue w-5 h-5 shrink-0" />
                  <span className="truncate">{item.location || item.homeAddress}</span>
                </div>

                {/* Title */}
                <h3 className="text-dark-3 font-semibold text-xl my-4 line-clamp-2 h-14">
                  {item.title || "Unnamed Property"}
                </h3>

                {/* Features */}
                <div className="mb-4 grid grid-cols-3 gap-2">
                  {item.maxPeople !== undefined && (
                    <div className="flex flex-col justify-center text-center items-center gap-1">
                      <User className="text-primary-blue w-5 h-5" />
                      <p className="text-dark-3 font-regular text-[10px]">
                        {item.maxPeople} {currentLanguage === "el" ? "Άτομα" : "People"}
                      </p>
                    </div>
                  )}
                  {item.propertyType && (
                    <div className="flex flex-col justify-center text-center items-center gap-1">
                      <House className="text-primary-blue w-5 h-5" />
                      <p className="text-dark-3 font-regular text-[10px] capitalize">
                        {t(`addPlaceModal:propertyTypes.${item.propertyType.toLowerCase()}`) || item.propertyType}
                      </p>
                    </div>
                  )}
                  {item.availabilityStartDate && (
                    <div className="flex flex-col justify-center text-center items-center gap-1">
                      <Building className="text-primary-blue w-5 h-5" />
                      <p className="text-dark-3 font-regular text-[10px]">
                        {currentLanguage === "el" ? "Από" : "From"}: {new Date(item.availabilityStartDate).toLocaleDateString(currentLanguage)}
                      </p>
                    </div>
                  )}
                </div>

                {/* Amenities */}
                {item.amenities && item.amenities.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold mb-2">{t("addPlaceModal:sections.amenities")}:</h4>
                    <div className="flex flex-wrap gap-1.5 overflow-hidden max-h-20">
                      {item.amenities.slice(0, 4).map((amenity) => (
                        <span
                          key={amenity.id}
                          className="bg-white/50 text-dark-3 text-[10px] px-2 py-1 rounded-full border border-gray-200"
                        >
                          {currentLanguage === "el" && amenity.greek_name ? amenity.greek_name : amenity.name}
                        </span>
                      ))}
                      {item.amenities.length > 4 && (
                        <span className="text-[10px] text-gray-500 self-center">+{item.amenities.length - 4}</span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Button - Always at the bottom */}
              <div className="mt-auto">
                <PrimaryButton
                  title={t("futureList:viewDetails")}
                  textColor="text-primary-blue"
                  bgColor="bg-[#F4F7FC] w-full hover:bg-primary-blue hover:text-white"
                  borderColor="border-2 border-primary-blue"
                  bgImage="/cardButtonHome.svg"
                  onClick={() => navigate(`/home-details/${item.id}`)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
