import PrimaryButton from "../reusable/PrimaryButton";
import FeatureItem from './FeatureItem';
import {
  House,
  BedDouble,
  Bath,
  SquareArrowOutUpRight,
  Share2,
} from "lucide-react";

interface HomeTitleProps {
  title: string;
}

const features = [
  { icon: House, label: "Rooms",  value: "10 rooms",  },
  { icon: BedDouble, label: "Beds",  value: "10 beds", },
  { icon: Bath, label: "Baths",  value: "2 Baths",  },
  { icon: SquareArrowOutUpRight, label: "Area", value: "250 sqf", }
];
const isPremiumMember:boolean = true; // This should be replaced with actual premium status from your auth context or state
const HomeTitle = ({ title }: HomeTitleProps) => {
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
        {features.map((feature, index) => (
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




