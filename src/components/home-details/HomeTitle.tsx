import PrimaryButton from "../reusable/PrimaryButton";
import FeatureItem from "./FeatureItem";
import User from "@/assets/icons/userRounded.svg";
import Bed from "@/assets/icons/double-bed.svg";
import Scale from "@/assets/icons/scale.svg";
import Bath from "@/assets/icons/sunbath.svg";
import { Share2, Lock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import ChatModal from "../modals/ChatModal";
import { OwnerDetails, PropertyDetails } from "@/types/PropertyDetails";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  addFavorite,
  removeFavorite,
} from "@/store/Slices/FavoritesSlice/favoritesSlice";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface HomeTitleProps {
  title: string;
  features?: {
    rooms?: number;
    baths?: number;
    beds?: number;
    area?: number;
  };
  owner: OwnerDetails;
  singlePropertyData: PropertyDetails;
}

const HomeTitle = ({
  title,
  features,
  owner,
  singlePropertyData,
}: HomeTitleProps) => {
  // console.log("Single Property Data in HomeTitle:", singlePropertyData);
  const { t } = useTranslation("homeDetails");
  const navigate = useNavigate();

  const featuresItems = [
    {
      icon: User,
      label: t("properties.rooms"),
      value:
        features?.rooms !== undefined
          ? `${features.rooms} ${t("properties.rooms")}`
          : "-",
    },
    {
      icon: Bed,
      label: "Beds",
      value:
        features?.beds !== undefined
          ? `${features.beds} ${t("properties.beds")}`
          : "-",
    },
    {
      icon: Bath,
      label: "Baths",
      value:
        features?.baths !== undefined
          ? `${features.baths} ${t("properties.baths")}`
          : "-",
    },
    {
      icon: Scale,
      label: "Area",
      value:
        features?.area !== undefined
          ? `${features.area} ${t("properties.area")}`
          : "-",
    },
  ];

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [animateHeart, setAnimateHeart] = useState(false);

  const dispatch = useAppDispatch();

  const { favorites, loading } = useAppSelector((state) => state.favorites);

  const isFavorited = favorites.some((fav) => fav.id === singlePropertyData.id);

  // Get current user's subscription status
  const storedUser = localStorage.getItem("user");
  const currentUser = storedUser ? JSON.parse(storedUser) : null;
  const isUserSubscribed = currentUser?.isSubscribed || false;

  const toggleFavorite = async () => {
    try {
      // Instant visual feedback
      setAnimateHeart(true);
      setTimeout(() => setAnimateHeart(false), 600);

      if (!isFavorited) {
        // Optimistic update
        toast.success("Added to favorites");
        dispatch(addFavorite(singlePropertyData.id));
      } else {
        toast.success("Removed from favorites");
        dispatch(removeFavorite(singlePropertyData.id));
      }
    } catch (error: any) {
      toast.error(error || "Something went wrong");
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: singlePropertyData.title,
          text: singlePropertyData.description,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const handleChatClick = () => {
    if (!isUserSubscribed) {
      toast.error("Please subscribe to unlock chat feature");
      setTimeout(() => {
        navigate("/plans");
      }, 1000);
    } else {
      setIsChatOpen(true);
    }
  };

  // const handleChatClickTest = () => {
  //   setIsChatOpen(true);
  // };

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <h1 className=" text-2xl md:text-3xl lg:text-[32px] font-medium text-dark-3">
          {title}
        </h1>
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={toggleFavorite}
            disabled={loading}
            className="mr-3 transition-transform duration-200"
          >
            {isFavorited ? (
              <FaHeart
                className={`w-7 h-7 text-[#3072C9] ${animateHeart ? "animate-bounce-once" : ""
                  }`}
              />
            ) : (
              <FaRegHeart className="w-7 h-7 text-[#3072C9] hover:text-blue-500 cursor-pointer" />
            )}
          </button>

          {/* Test purpose  */}
          {/* <PrimaryButton title={t("chatWith")} onClick={handleChatClickTest} /> */}

          {isUserSubscribed ? (
            <PrimaryButton title={t("chatWith")} onClick={handleChatClick} />
          ) : (
            <div className="relative">
              <PrimaryButton
                title={
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    <span>{t("chatWith")}</span>
                  </div>
                }
                textColor="text-[#8B8B8B]"
                bgColor="bg-[#DEDEDE]"
                borderColor=""
                bgImage="/buttonHomeWhite.svg"
                onClick={handleChatClick}
              />
            </div>
          )}

          <div
            className="text-primary-blue bg-white shadow-[0px_0px_10px_0px_#B9D7FF] p-2 rounded-full cursor-pointer"
            onClick={handleShare}
          >
            <Share2 className="" />
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-6 grid grid-cols-2 md:flex md:justify-between gap-4 border-y-2 border-[#80808040]/50 my-6">
        {featuresItems.map((feature, index) => (
          <FeatureItem
            key={index}
            icon={feature.icon}
            label={feature.label}
            value={feature.value}
          />
        ))}
      </div>

      {/* chat modal - only opens if user is subscribed */}
      <ChatModal
        isOpen={isChatOpen}
        owner={owner}
        singlePropertyData={singlePropertyData}
        onClose={() => setIsChatOpen(false)}
      />
      {isUserSubscribed && (
        <ChatModal
          isOpen={isChatOpen}
          owner={owner}
          singlePropertyData={singlePropertyData}
          onClose={() => setIsChatOpen(false)}
        />
      )}
    </div>
  );
};

export default HomeTitle;
