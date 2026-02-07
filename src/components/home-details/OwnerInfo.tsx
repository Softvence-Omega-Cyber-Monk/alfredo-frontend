import { MapPin, Lock } from "lucide-react";
import PrimaryButton from "../reusable/PrimaryButton";
import { OwnerDetails } from "@/types/PropertyDetails";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
// import { on } from "events";

interface OwnerInfoProps {
  city?: string;
  ownerDetails?: OwnerDetails;
  callToAction: {
    message: string;
    button: Omit<React.ComponentProps<typeof PrimaryButton>, "title"> & {
      title: string; // translation key ONLY
    };
  };

  isPremiumMember?: boolean;
  onViewDetails?: () => void; // Add this prop
}

const OwnerInfo = ({
  city,
  ownerDetails,
  callToAction,
  isPremiumMember = false,
  onViewDetails,
}: OwnerInfoProps) => {
  const { t } = useTranslation("homeDetails");
  const navigate = useNavigate();

  // Get current user's subscription status
  const storedUser = localStorage.getItem("user");
  const currentUser = storedUser ? JSON.parse(storedUser) : null;
  const isUserSubscribed = currentUser?.isSubscribed || false;

  const handleButtonClick = () => {
    if (!isUserSubscribed) {
      toast.error("Please subscribe to view owner details");
      // Redirect to plans page after a short delay
      setTimeout(() => {
        navigate("/plans"); // Adjust to your actual plans page route
      }, 1000);
    } else {
      // If subscribed, trigger the view details modal
      if (onViewDetails) {
        onViewDetails();
      }
    }
  };

  // const handleButtonClickTest = () => {
  //   onViewDetails && onViewDetails();
  // };

  return (
    <div className="relative p-6 border border-[#F4F7FC] rounded-lg md:rounded-3xl bg-white">
      {!isPremiumMember && (
        <div className="absolute inset-0 z-20 backdrop-blur-[3px] bg-white/60 rounded-lg md:rounded-3xl flex items-center justify-center">
          <div className="bg-primary-blue p-6 rounded-2xl max-w-[80%] text-center shadow-[0_0_25px_0_rgba(0,0,0,0.5)]">
            <p className="text-white mb-6">
              To contact this seller and view their details, please upgrade to
              our premium membership.
            </p>
            <div className="flex flex-col gap-2">
              <PrimaryButton
                title="Traveler"
                textColor="w-full text-primary-blue bg-white text-sm font-semibold"
                bgImage="/buttonHomeWhite.svg"
              />
              <PrimaryButton
                title="Premium Traveler"
                textColor="w-full text-white text-sm font-semibold"
                borderColor="border-white"
                padding="px-4 py-2"
              />
            </div>
          </div>
        </div>
      )}
      {/* Owner Info */}
      <img
        src={ownerDetails?.photo || "/defaultAvatar.png"}
        className="h-48 w-full object-cover rounded-lg"
        alt={ownerDetails?.fullName || "Owner Image"}
      />
      <div className="flex flex-col gap-4 pt-4 pb-6 border-b border-[#F4F7FC]">
        <h3 className="text-lg text-dark-2 font-semibold">
          {ownerDetails?.fullName}
        </h3>
        <div className="flex items-start justify-start gap-1.5 text-dark-3 text-base">
          <MapPin className="w-5 h-5 text-primary-blue" />
          <p>{city}</p>
        </div>
      </div>

      {/* Achievement Badges */}
      <div className="border border-[#F4F7FC] rounded-lg my-6">
        <h2 className="bg-[#EAF1FA] text-dark-2 text-base font-regular px-2 py-1">
          {t("achievementBadge")}
        </h2>

        <div className="p-3 flex flex-wrap gap-3">
          {ownerDetails?.achievementBadges?.length ? (
            ownerDetails.achievementBadges.map((badge) => (
              <div
                key={badge.id}
                className="flex items-center gap-2 bg-[#F4F7FC] border border-gray-200 px-3 py-1.5 rounded-full shadow-sm hover:shadow-md transition"
                title={badge.description}
              >
                <img
                  src={badge.icon}
                  alt={badge.displayName}
                  className="w-5 h-5 object-contain"
                />
                <span className="text-sm font-medium text-dark-2">
                  {badge.displayName}
                </span>
              </div>
            ))
          ) : (
            <p className="text-sm text-dark-3">No badges earned yet.</p>
          )}
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-6">
        <h4 className="text-sm font-regular text-dark-2">
          {t("startExchange")}
        </h4>
      </div>
      {/* <PrimaryButton {...callToAction.button} onClick={handleButtonClickTest} /> */}

      {/* Conditional Button based on subscription */}
      {isUserSubscribed ? (
        <PrimaryButton
          {...callToAction.button}
          title={t(callToAction.button.title)}
          onClick={handleButtonClick}
        />
      ) : (
        <PrimaryButton
          title={
            <div className="flex items-center justify-center gap-2">
              <Lock className="w-4 h-4" />
              <span>{t("contact")}</span>
            </div>
          }
          textColor="text-[#8B8B8B]"
          bgColor="bg-[#DEDEDE]"
          borderColor=""
          bgImage="/buttonHomeWhite.svg"
          onClick={handleButtonClick}
        />
      )}
    </div>
  );
};

export default OwnerInfo;
