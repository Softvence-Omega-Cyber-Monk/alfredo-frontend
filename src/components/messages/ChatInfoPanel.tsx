import { Conversation } from "./types";
import {
  Mail,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import badge from "@/assets/icons/crown2.svg"; // Replace with your real badge path
import { useTranslation } from "react-i18next";

interface ChatInfoPanelProps {
  conversation: Conversation;
}

const ChatInfoPanel = ({ conversation }: ChatInfoPanelProps) => {
  const { i18n } = useTranslation();

  const owner = {
    image: conversation.avatar || "/defaultAvatar.png",
    name: conversation.name,
    email: conversation.email || "No email provided",
    location: conversation.location || "No location provided",
    badges: conversation.achievementBadges?.map((b: any) => ({
      color: "bg-yellow-500",
      icon: b.icon || badge,
    })) || [],
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
    message: {
      en: "Start exchanging your home! Chat with this user to define the terms of the exchange, and prepare for your next trip!",
      el: "Ξεκίνα να ανταλλάσσεις το σπίτι σου! Συνομίλησε με αυτό το μέλος για να συμφωνήσετε τους όρους της ανταλλαγής και προετοιμάσου για το επόμενο ταξίδι σου!"
    }
  };

  const language = i18n.language?.startsWith("el") ? "el" : "en";
  console.log(conversation, "this is conversation in chat info panel")


  return (
    <div className="relative p-6 flex flex-col bg-white">
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
          {owner.badges.length > 0 ? (
            owner.badges.map((badge, index) => (
              <div key={index} className={`p-2 rounded-full ${badge.color}`}>
                <img src={badge.icon} alt="badge" className="w-6 h-6" />
              </div>
            ))
          ) : (
            <p className="text-sm text-dark-3 italic">No badges yet</p>
          )}
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
          {language === "en" ? callToAction.message.en : callToAction.message.el}
        </h4>
      </div>
    </div>
  );
};

export default ChatInfoPanel;
