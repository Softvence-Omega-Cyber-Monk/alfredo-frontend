import {
  Mail,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import PrimaryButton from "../reusable/PrimaryButton";
import badge from "@/assets/icons/crown2.svg"; // Replace with your real badge path

const ChatInfoPanel = () => {
  const owner = {
    image:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=500&q=80",
    name: "Emma Johnson",
    email: "emma.johnson@example.com",
    location: "123 Kingsway Blvd, London, UK",
    badges: [
      {
        color: "bg-yellow-500",
        icon: badge,
      },
    ],
    verifications: [
      {
        bgColor: "bg-green-100",
        iconColor: "text-green-600",
        icon: CheckCircle2,
        text: "Email Verified",
      },
      {
        bgColor: "bg-blue-100",
        iconColor: "text-blue-600",
        icon: ShieldCheck,
        text: "Government ID Verified",
      },
      {
        bgColor: "bg-purple-100",
        iconColor: "text-purple-600",
        icon: UserCheck,
        text: "Profile Completed",
      },
    ],
  };

  const callToAction = {
    message: "Start exchanging your home! Create a VACANZA account to start contacting members.",
  };

  const isPremiumMember = true; // Toggle to false to see locked state

  return (
    <div className="relative p-6 hidden md:flex flex-col w-1/4 xl:w-1/5 bg-white">
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

      {/* Owner Header Image */}
      <img
        src={owner.image}
        className="h-48 w-full object-cover object-top rounded-lg"
        alt={owner.name}
      />

      {/* Name + Contact */}
      <div className="flex flex-col gap-4 pt-4 pb-6 border-b border-[#F4F7FC]">
        <h3 className="text-lg text-dark-2 font-semibold">{owner.name}</h3>
        <div className="flex items-center gap-1.5 text-dark-3 text-base">
          <Mail className="w-5 h-5 text-primary-blue" />
          <p>{owner.email}</p>
        </div>
        <div className="flex items-start gap-1.5 text-dark-3 text-base">
          <MapPin className="w-5 h-5 text-primary-blue" />
          <p>{owner.location}</p>
        </div>
      </div>

      {/* Achievement Badges */}
      <div className="border border-[#F4F7FC] rounded-lg my-6">
        <h2 className="bg-[#EAF1FA] text-dark-2 text-base font-regular px-2 py-1">
          Achievement Badges
        </h2>
        <div className="p-3 flex items-center gap-2">
          {owner.badges.map((badge, index) => (
            <div key={index} className={`p-2 rounded-full ${badge.color}`}>
              <img src={badge.icon} alt="badge" className="w-6 h-6" />
            </div>
          ))}
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
    </div>
  );
};

export default ChatInfoPanel;
