import { X, Mail, MapPin, Phone } from "lucide-react";
import { OwnerDetails } from "@/types/PropertyDetails";

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
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
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
        <div className="relative">
          <img
            src={ownerDetails?.photo || "/defaultAvatar.png"}
            className="h-64 w-full object-cover object-top rounded-t-2xl"
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

          {/* Contact Information */}
          <div className="space-y-3 py-4 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-dark-3 mb-3">
              Contact Information
            </h3>

            {/* Email */}
            <div className="flex items-center gap-3 text-dark-3">
              <div className="p-2 bg-blue-50 rounded-full">
                <Mail className="w-5 h-5 text-primary-blue" />
              </div>
              <div>
                <p className="text-xs text-dark-2">Email</p>
                <p className="text-sm font-medium">{ownerDetails?.email}</p>
              </div>
            </div>

            {/* Phone */}
            {ownerDetails?.phoneNumber && (
              <div className="flex items-center gap-3 text-dark-3">
                <div className="p-2 bg-blue-50 rounded-full">
                  <Phone className="w-5 h-5 text-primary-blue" />
                </div>
                <div>
                  <p className="text-xs text-dark-2">Phone</p>
                  <p className="text-sm font-medium">
                    {ownerDetails.phoneNumber}
                  </p>
                </div>
              </div>
            )}

            {/* Location */}
            {city && (
              <div className="flex items-center gap-3 text-dark-3">
                <div className="p-2 bg-blue-50 rounded-full">
                  <MapPin className="w-5 h-5 text-primary-blue" />
                </div>
                <div>
                  <p className="text-xs text-dark-2">Location</p>
                  <p className="text-sm font-medium">{city}</p>
                </div>
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
