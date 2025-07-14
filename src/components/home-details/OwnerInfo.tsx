import { Mail, MapPin } from "lucide-react";
import PrimaryButton from "../reusable/PrimaryButton";

interface Badge {
  color: string;
  icon: React.ElementType;
}

interface Verification {
  bgColor: string;
  iconColor: string;
  icon: React.ElementType;
  text: string;
}

interface OwnerInfoProps {
  owner: {
    image: string;
    name: string;
    email: string;
    location: string;
    badges: Badge[];
    verifications: Verification[];
  };
  callToAction: {
    message: string;
    button: React.ComponentProps<typeof PrimaryButton>;
  };
  isPremiumMember?: boolean;
  onSubscribeClick?: () => void;
}

const OwnerInfo = ({
  owner,
  callToAction,
  isPremiumMember = false,
//   onSubscribeClick,
}: OwnerInfoProps) => {
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
        src={owner.image}
        className="h-48 w-full object-cover object-top rounded-lg"
        alt={owner.name}
      />
      <div className="flex flex-col gap-4 pt-4 pb-6 border-b border-[#F4F7FC]">
        <h3 className="text-lg text-dark-2 font-semibold">{owner.name}</h3>
        <div className="flex items-center gap-1.5 text-dark-3 text-base">
          <Mail className="w-5 h-5 text-primary-blue" />
          <p>{owner.email}</p>
        </div>
        <div className="flex items-start justify-start gap-1.5 text-dark-3 text-base">
          <MapPin className="w-5 h-5 text-primary-blue" />
          <p>{owner.location}</p>
        </div>
      </div>

      {/* Achievement Badges */}
      <div className="border border-[#F4F7FC] rounded-lg my-6">
        <h2 className="bg-[#EAF1FA] text-dark-2 text-base font-regular px-2 py-1">
          Achievement Badges
        </h2>
        <div className="p-3">
          <div className="flex items-center gap-2">
            {owner.badges.map((badge, index) => (
              <div key={index} className={`${badge.color} p-2 rounded-full`}>
                <badge.icon className="text-white w-6 h-6" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Verifications */}
      <div className="flex flex-col gap-3 pb-6 border-b border-[#F4F7FC]">
        {owner.verifications.map((verification, index) => (
          <div
            key={index}
            className="flex items-center gap-1.5 text-dark-3 text-sm"
          >
            <div
              className={`p-1.5 rounded-full ${verification.bgColor} ${verification.iconColor}`}
            >
              <verification.icon className="w-3 h-3" />
            </div>
            <p>{verification.text}</p>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="py-6">
        <h4 className="text-sm font-regular text-dark-2">
          {callToAction.message}
        </h4>
      </div>
      <PrimaryButton {...callToAction.button} />
    </div>
  );
};

export default OwnerInfo;
