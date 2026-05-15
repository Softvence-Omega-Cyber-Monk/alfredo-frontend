import { OwnerDetails } from "@/types/PropertyDetails";
import { MapPin, X } from "lucide-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

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
  const { t, i18n } = useTranslation(["onboarding", "addPlaceModal"]);
  const currentLanguage = i18n.language;

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
            <p className="text-sm text-dark-2">
              {currentLanguage === "el" ? "Ιδιοκτήτης" : "Property Owner"}
            </p>
          </div>

          {/* Information Section */}
          <div className="space-y-4 py-4 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-dark-3 mb-3">
              {currentLanguage === "el" ? "Πληροφορίες" : "About the Owner"}
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {/* Age Range */}
              {ownerDetails?.onboarding?.ageRange && (
                <div className="flex flex-col">
                  <p className="text-xs text-dark-2">
                    {currentLanguage === "el" ? "Ηλικία" : "Age"}
                  </p>
                  <p className="text-sm font-medium text-dark-3">
                    {ownerDetails.onboarding.ageRange.replace("AGE_", "").replace("_", "-")}
                  </p>
                </div>
              )}

              {/* Gender */}
              {ownerDetails?.onboarding?.gender && ownerDetails.onboarding.gender !== "NOT_SPECIFIED" && (
                <div className="flex flex-col">
                  <p className="text-xs text-dark-2">
                    {currentLanguage === "el" ? "Φύλο" : "Gender"}
                  </p>
                  <p className="text-sm font-medium text-dark-3 capitalize">
                    {currentLanguage === "el"
                      ? (ownerDetails.onboarding.gender === "MALE" ? "Άνδρας" : "Γυναίκα")
                      : ownerDetails.onboarding.gender.toLowerCase()}
                  </p>
                </div>
              )}

              {/* Employment Status */}
              {ownerDetails?.onboarding?.employmentStatus && (
                <div className="flex flex-col">
                  <p className="text-xs text-dark-2">
                    {currentLanguage === "el" ? "Είμαι" : "I am a"}
                  </p>
                  <p className="text-sm font-medium text-dark-3 capitalize">
                    {currentLanguage === "el"
                      ? {
                        WORKER: "Εργαζόμενος",
                        RETIRED: "Συνταξιούχος",
                        STUDENT: "Φοιτητής",
                        UNEMPLOYED: "Άνεργος",
                      }[ownerDetails.onboarding.employmentStatus] || "Εργαζόμενος"
                      : ownerDetails.onboarding.employmentStatus.toLowerCase()}
                  </p>
                </div>
              )}

              {/* Travel Mostly With */}
              {ownerDetails?.onboarding?.travelMostlyWith && (
                <div className="flex flex-col">
                  <p className="text-xs text-dark-2">
                    {currentLanguage === "el" ? "Συνήθως ταξιδεύω με" : "I mostly travel with"}
                  </p>
                  <p className="text-sm font-medium text-dark-3 capitalize">
                    {currentLanguage === "el"
                      ? {
                        by_myself: "Μόνος",
                        family: "Οικογένεια",
                        couple: "Σύντροφο",
                        friends: "Με φίλους",
                      }[ownerDetails.onboarding.travelMostlyWith.toLowerCase()] || "Μόνος"
                      : ownerDetails.onboarding.travelMostlyWith.toLowerCase().replace("_", " ")}
                  </p>
                </div>
              )}
            </div>

            {/* Favorite Destinations */}
            {ownerDetails?.onboarding?.favoriteDestinations && ownerDetails.onboarding.favoriteDestinations.length > 0 && (
              <div className="flex flex-col pt-2">
                <p className="text-xs text-dark-2 mb-1">
                  {currentLanguage === "el" ? "Αγαπημένοι Προορισμοί (επιλέξτε όσους θέλετε)" : "Favorite destinations (choose all that apply)"}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {ownerDetails.onboarding.favoriteDestinations.map((dest, idx) => {
                    const greekDestMap: Record<string, string> = {
                      "big cities": "Μεγάλες πόλεις",
                      "small cities": "Μικρές πόλεις",
                      "seaside": "Παραθαλάσσια",
                      "sea side": "Παραθαλάσσια",
                      "mountain": "Βουνά",
                      "mountains": "Βουνά",
                    };
                    const normalizedDest = dest.toLowerCase().trim();
                    return (
                      <span key={idx} className="text-[11px] px-2 py-0.5 bg-blue-50 text-primary-blue rounded-md border border-blue-100">
                        {currentLanguage === "el" ? (greekDestMap[normalizedDest] || dest) : dest}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Travel Types */}
            {ownerDetails?.onboarding?.travelType && ownerDetails.onboarding.travelType.length > 0 && (
              <div className="flex flex-col pt-2">
                <p className="text-xs text-dark-2 mb-1">
                  {currentLanguage === "el" ? "Τύπος ταξιδιού" : "Your travel type"}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {ownerDetails.onboarding.travelType.map((type, idx) => {
                    const greekTypeMap: Record<string, string> = {
                      "business": "Επαγγελματικό",
                      "leisure": "Αναψυχή",
                      "adventure": "Περιπέτεια",
                      "cultural": "Πολιτιστικό",
                      "family": "Οικογενειακό",
                      "solo": "Μόνος",
                    };
                    const normalizedType = type.toLowerCase().trim();
                    return (
                      <span key={idx} className="text-[11px] px-2 py-0.5 bg-green-50 text-green-700 rounded-md border border-green-100">
                        {currentLanguage === "el" ? (greekTypeMap[normalizedType] || type) : type}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Pets */}
            <div className="flex items-center gap-2 pt-2">
              <p className="text-xs text-dark-2">
                {currentLanguage === "el" ? "Ταξιδεύετε με κατοικίδια;" : "Do you travel with pets?"}:
              </p>
              <p className="text-sm font-medium text-dark-3">
                {ownerDetails?.onboarding?.isTravelWithPets
                  ? (currentLanguage === "el" ? "Ναι" : "Yes")
                  : (currentLanguage === "el" ? "Όχι" : "No")}
              </p>
            </div>

            {/* Location/Address */}
            {(city || ownerDetails?.onboarding?.address) && (
              <div className="flex items-start gap-3 text-dark-3 pt-4 border-t border-gray-100">
                <div className="p-2 bg-blue-50 rounded-full shrink-0">
                  <MapPin className="w-5 h-5 text-primary-blue" />
                </div>
                <div>
                  <p className="text-xs text-dark-2">
                    {currentLanguage === "el" ? "Ο τόπος κατοικίας μου" : "My hometown"}
                  </p>
                  <p className="text-sm font-medium">
                    {ownerDetails?.onboarding?.address || city}
                  </p>
                </div>
              </div>
            )}

            {/* Notes */}
            {ownerDetails?.onboarding?.notes && (
              <div className="pt-4 border-t border-gray-100">
                <p className="text-xs text-dark-2 mb-1">
                  {currentLanguage === "el" ? "Σημειώσεις για εσάς" : "Notes on yourself"}
                </p>
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
                {currentLanguage === "el" ? "Μετάλλια Κατορθωμάτων" : "Achievement Badges"}
              </h3>
              <div className="flex flex-wrap gap-2">
                {ownerDetails.achievementBadges.map((badge) => (
                  <div
                    key={badge.id}
                    className="flex items-center gap-2 bg-[#F4F7FC] border border-gray-200 px-3 py-1.5 rounded-full shadow-sm"
                    title={currentLanguage === "el" ? (badge.greek_discription || badge.description) : badge.description}
                  >
                    <img
                      src={badge.icon}
                      alt={badge.displayName}
                      className="w-4 h-4 object-contain"
                    />
                    <span className="text-xs font-medium text-dark-2">
                      {currentLanguage === "el" ? (badge.greek_displayName || badge.displayName) : badge.displayName}
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
