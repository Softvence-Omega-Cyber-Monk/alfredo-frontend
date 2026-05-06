import { X, MapPin } from "lucide-react";
import { OwnerDetails } from "@/types/PropertyDetails";
import { useEffect } from "react";

interface OwnerDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  ownerDetails: OwnerDetails;
  city?: string;
}

const OwnerDetailsModal = ({
  isOpen,
  onClose,
  ownerDetails,
  city,
}: OwnerDetailsModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  z-100 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
        >
          <X className="w-5 h-5 text-dark-3" />
        </button>

        {/* Owner Image */}
        <div className="relative ">
          <img
            src={ownerDetails?.photo || "/defaultAvatar.png"}
            className="h-[40vh] w-full mt-4 object-contain rounded-xl"
            alt={ownerDetails?.fullName || "Owner"}
          />
        </div>

        {/* Owner Information */}
        <div className="p-6 space-y-6">
          {/* Name */}
          <div>
            <h2 className="text-2xl font-semibold text-dark-3 mb-2">
              {ownerDetails?.fullName}
            </h2>
            <p className="text-sm text-dark-2">Property Owner</p>
          </div>

          {/* Information Section */}
          <div className="space-y-4 py-4 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-dark-3 mb-3">
              About the Owner
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {/* Age Range */}
              {ownerDetails?.onboarding?.ageRange && (
                <div className="flex flex-col">
                  <p className="text-xs text-dark-2">Age Range</p>
                  <p className="text-sm font-medium text-dark-3">
                    {ownerDetails.onboarding.ageRange.replace("AGE_", "").replace("_", "-")}
                  </p>
                </div>
              )}

              {/* Gender */}
              {ownerDetails?.onboarding?.gender && ownerDetails.onboarding.gender !== "NOT_SPECIFIED" && (
                <div className="flex flex-col">
                  <p className="text-xs text-dark-2">Gender</p>
                  <p className="text-sm font-medium text-dark-3 capitalize">
                    {ownerDetails.onboarding.gender.toLowerCase()}
                  </p>
                </div>
              )}

              {/* Employment Status */}
              {ownerDetails?.onboarding?.employmentStatus && (
                <div className="flex flex-col">
                  <p className="text-xs text-dark-2">Employment</p>
                  <p className="text-sm font-medium text-dark-3 capitalize">
                    {ownerDetails.onboarding.employmentStatus.toLowerCase()}
                  </p>
                </div>
              )}

              {/* Travel Mostly With */}
              {ownerDetails?.onboarding?.travelMostlyWith && (
                <div className="flex flex-col">
                  <p className="text-xs text-dark-2">Travels With</p>
                  <p className="text-sm font-medium text-dark-3 capitalize">
                    {ownerDetails.onboarding.travelMostlyWith.toLowerCase().replace("_", " ")}
                  </p>
                </div>
              )}
            </div>

            {/* Favorite Destinations */}
            {ownerDetails?.onboarding?.favoriteDestinations && ownerDetails.onboarding.favoriteDestinations.length > 0 && (
              <div className="flex flex-col pt-2">
                <p className="text-xs text-dark-2 mb-1">Favorite Destinations</p>
                <div className="flex flex-wrap gap-1.5">
                  {ownerDetails.onboarding.favoriteDestinations.map((dest, idx) => (
                    <span key={idx} className="text-[11px] px-2 py-0.5 bg-blue-50 text-primary-blue rounded-md border border-blue-100">
                      {dest}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Travel Types */}
            {ownerDetails?.onboarding?.travelType && ownerDetails.onboarding.travelType.length > 0 && (
              <div className="flex flex-col pt-2">
                <p className="text-xs text-dark-2 mb-1">Travel Style</p>
                <div className="flex flex-wrap gap-1.5">
                  {ownerDetails.onboarding.travelType.map((type, idx) => (
                    <span key={idx} className="text-[11px] px-2 py-0.5 bg-green-50 text-green-700 rounded-md border border-green-100">
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Pets */}
            <div className="flex items-center gap-2 pt-2">
              <p className="text-xs text-dark-2">Travels with pets:</p>
              <p className="text-sm font-medium text-dark-3">
                {ownerDetails?.onboarding?.isTravelWithPets ? "Yes" : "No"}
              </p>
            </div>

            {/* Location/Address */}
            {(city || ownerDetails?.onboarding?.address) && (
              <div className="flex items-start gap-3 text-dark-3 pt-4 border-t border-gray-100">
                <div className="p-2 bg-blue-50 rounded-full shrink-0">
                  <MapPin className="w-5 h-5 text-primary-blue" />
                </div>
                <div>
                  <p className="text-xs text-dark-2">Location</p>
                  <p className="text-sm font-medium">
                    {ownerDetails?.onboarding?.address || city}
                  </p>
                </div>
              </div>
            )}

            {/* Notes */}
            {ownerDetails?.onboarding?.notes && (
              <div className="pt-4 border-t border-gray-100">
                <p className="text-xs text-dark-2 mb-1">About</p>
                <p className="text-sm text-dark-3 italic leading-relaxed">
                  "{ownerDetails.onboarding.notes}"
                </p>
              </div>
            )}
          </div>

          {/* Achievement Badges */}
          {ownerDetails?.achievementBadges?.length > 0 && (
            <div className="py-4 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-dark-3 mb-3">
                Achievement Badges
              </h3>
              <div className="flex flex-wrap gap-2">
                {ownerDetails.achievementBadges.map((badge) => (
                  <div
                    key={badge.id}
                    className="flex items-center gap-2 bg-[#F4F7FC] border border-gray-200 px-3 py-1.5 rounded-full shadow-sm"
                    title={badge.description}
                  >
                    <img
                      src={badge.icon}
                      alt={badge.displayName}
                      className="w-4 h-4 object-contain"
                    />
                    <span className="text-xs font-medium text-dark-2">
                      {badge.displayName}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Additional Stats */}
          {/* <div className="grid grid-cols-3 gap-4 py-4 border-t border-gray-200">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary-blue">
                {ownerDetails?.totalListed || 0}
              </p>
              <p className="text-xs text-dark-2">Listed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary-blue">
                {ownerDetails?.totalExchange || 0}
              </p>
              <p className="text-xs text-dark-2">Exchanges</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary-blue">
                {ownerDetails?.totalReferrals || 0}
              </p>
              <p className="text-xs text-dark-2">Referrals</p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default OwnerDetailsModal;
