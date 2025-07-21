import PrimaryButton from "../reusable/PrimaryButton";
import FeatureItem from './FeatureItem';
import House from "@/assets/icons/home-two.svg";
import Bed from "@/assets/icons/double-bed.svg";
import Scale from "@/assets/icons/scale.svg";
import Bath from "@/assets/icons/sunbath.svg";
import { Share2 } from 'lucide-react';

interface HomeTitleProps {
  title: string;
  features?: {
    rooms?: number;
    baths?: number;
    beds?: number;
    area?: number;
  };
}

const isPremiumMember:boolean = true; // This should be replaced with actual premium status from your auth context or state
const HomeTitle = ({ title,features }: HomeTitleProps) => {

  const featuresItems = [
    {
      icon: House,
      label: "Rooms",
      value: features?.rooms !== undefined ? `${features.rooms} rooms` : "-",
    },
    {
      icon: Bed,
      label: "Beds",
      value: features?.beds !== undefined ? `${features.beds} beds` : "-",
    },
    {
      icon: Bath,
      label: "Baths",
      value: features?.baths !== undefined ? `${features.baths} Baths` : "-",
    },
    {
      icon: Scale,
      label: "Area",
      value: features?.area !== undefined ? `${features.area} sqf` : "-",
    },
  ];
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <h1 className=" text-2xl md:text-3xl lg:text-[32px] font-medium text-dark-3">
         {title}
        </h1>
        <div className="flex items-center justify-end gap-2">
          {isPremiumMember ? (

            <PrimaryButton
            title="Chat With"

            />
          ):(

            <PrimaryButton
            title="Chat With"
            textColor="text-[#8B8B8B]"
            bgColor="bg-[#DEDEDE]"
            borderColor=""
            bgImage="/buttonHomeWhite.svg"
            />
          )}

          <div className="text-primary-blue bg-white shadow-[0px_0px_10px_0px_#B9D7FF] p-2 rounded-full cursor-pointer">
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
        
    </div>
  );
};

export default HomeTitle;




