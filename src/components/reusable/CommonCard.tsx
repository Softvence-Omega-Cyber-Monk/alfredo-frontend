// src/components/reusable/CommonCard.tsx
import {
  MapPin,
  BedDouble,
  Bath,
  SquareArrowOutUpRight,
  Building,
  User,
} from "lucide-react";
import PrimaryButton from "./PrimaryButton";
import cardStar from "@/assets/home/star.svg";
import { CommonCard as CommonCardProps } from "@/types/index";
import { useTranslation } from "react-i18next";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { addFavorite, removeFavorite } from "@/store/Slices/FavoritesSlice/favoritesSlice";
import { toast } from "sonner";
import { useEffect, useState } from "react";

const CommonCard: React.FC<CommonCardProps> = ({
  id,
  image,
  avatarImage,
  rating,
  ownerName,
  location,
  title,
  features,
  price,
  onViewDetails,
}) => {
  const dispatch = useAppDispatch();
  const { favorites } = useAppSelector((state) => state.favorites);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation("futureList");

  // Check if this property is in favorites
  useEffect(() => {
    if (id) {
      const found = favorites.some(fav => fav.id === id);
      setIsFavorite(found);
    }
  }, [favorites, id]);

  const toggleFavorite = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to add favorites");
      return;
    }
    
    if (!id) return;
    
    setIsLoading(true);
    try {
      if (isFavorite) {
        await dispatch(removeFavorite(id)).unwrap();
        toast.success("Removed from favorites");
      } else {
        await dispatch(addFavorite(id)).unwrap();
        toast.success("Added to favorites");
      }
    } catch (error: any) {
      toast.error(error || "Failed to update favorites");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-3 rounded-3xl bg-[#F4F7FC]">
      <div className="rounded-2xl overflow-hidden max-h-64 relative">
        {/* Main Image */}
        <img src={image} alt={title} className="w-full h-full object-cover" />

        <button
          onClick={toggleFavorite}
          disabled={isLoading}
          className={`absolute top-3 right-4 transition-transform duration-200 ${
            isFavorite ? "scale-110" : "scale-110"
          } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {isFavorite ? (
            <FaHeart className="w-5 h-5 text-red-500" />
          ) : (
            <FaRegHeart className="w-5 h-5 text-white hover:text-red-500 cursor-pointer" />
          )}
        </button>

        {/* Bottom overlay with avatar and rating */}
        <div className="absolute bottom-4 left-4 right-4 z-10 flex justify-between items-end bg-white/80 rounded-2xl backdrop-blur-sm p-3">
          <div className="flex items-center gap-2 rounded-full">
            <img
              src={avatarImage}
              alt={ownerName}
              className="w-8 h-8 rounded-full object-cover"
            />
            <h3 className="text-dark-2 font-semibold text-base">{ownerName}</h3>
          </div>

          <div className="relative w-8 h-8 rounded-full">
            <img
              src={cardStar}
              className="w-full h-full object-cover"
              alt="rating"
            />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-xs font-semibold">
              {rating}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 px-2">
        {/* Location */}
        <div className="flex items-center gap-1 text-dark-3 font-regular text-base">
          <MapPin className="text-primary-blue w-5 h-5" />
          <span>{location}</span>
        </div>

        {/* Title */}
        <h3 className="text-dark-3 font-semibold text-2xl my-4">{title}</h3>

        {/* Price */}
        <h3 className="text-primary-blue font-semibold text-2xl pb-4 border-b border-b-[#EAF1FA]">
          ${price}
        </h3>

        {/* Features */}
        <div className="my-4 grid grid-cols-3 gap-3">
          {features.beds !== undefined && (
            <div className="flex flex-col justify-center text-center items-center gap-1">
              <BedDouble className="text-primary-blue w-5 h-5" />
              <p className="text-dark-3 font-regular text-sm">
                {features.beds} Beds
              </p>
            </div>
          )}
          {features.baths !== undefined && (
            <div className="flex flex-col justify-center text-center items-center gap-1">
              <Bath className="text-primary-blue w-5 h-5" />
              <p className="text-dark-3 font-regular text-sm">
                {features.baths} Baths
              </p>
            </div>
          )}
          {features.sqft !== undefined && (
            <div className="flex flex-col justify-center text-center items-center gap-1">
              <SquareArrowOutUpRight className="text-primary-blue w-5 h-5" />
              <p className="text-dark-3 font-regular text-sm">
                {features.sqft} sqm
              </p>
            </div>
          )}
          {features.floor !== undefined && (
            <div className="flex flex-col justify-center text-center items-center gap-1">
              <Building className="text-primary-blue w-5 h-5" />
              <p className="text-dark-3 font-regular text-sm">
                {features.floor} floor
              </p>
            </div>
          )}
          {features.maxPeople !== undefined && (
            <div className="flex flex-col justify-center text-center items-center gap-1">
              <User className="text-primary-blue w-5 h-5" />
              <p className="text-dark-3 font-regular text-sm">
                {features.maxPeople} max people
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Action Button */}
      <PrimaryButton
        title={t("viewDetails")}
        textColor="text-primary-blue"
        bgColor="bg-[#F4F7FC] w-full hover:bg-primary-blue hover:text-white"
        borderColor="border-2 border-primary-blue"
        onClick={onViewDetails}
      />
    </div>
  );
};

export default CommonCard;


// import {
//   MapPin,
//   BedDouble,
//   Bath,
//   SquareArrowOutUpRight,
//   Building,
//   User,
// } from "lucide-react";
// import PrimaryButton from "./PrimaryButton";
// import cardStar from "@/assets/home/star.svg";
// import { CommonCard as CommonCardProps } from "@/types/index";
// import { useTranslation } from "react-i18next";
// import { FaRegHeart, FaHeart } from "react-icons/fa";
// import { useState } from "react";
// import { toast } from "sonner";

// const CommonCard: React.FC<CommonCardProps> = ({
//   image,
//   avatarImage,
//   rating,
//   ownerName,
//   location,
//   title,
//   features,
//   onViewDetails,
// }) => {
//   const [isFavorite, setIsFavorite] = useState(false);
//   const { t } = useTranslation("futureList");

//   const toggleFavorite = () => {
//     if (!isFavorite) {
//       toast.success("Added to favorites");
//     }
//     setIsFavorite(!isFavorite);
//   };
//   return (
//     <div className="p-3 rounded-3xl bg-[#F4F7FC]">
//       <div className="rounded-2xl overflow-hidden max-h-64 relative">
//         {/* Main Image */}
//         <img src={image} alt={title} className="w-full h-full object-cover" />

//         <button
//           onClick={toggleFavorite}
//           className={`absolute top-3 right-4 transition-transform duration-200 ${
//             isFavorite ? "scale-110" : "scale-110"
//           }`}
//         >
//           {isFavorite ? (
//             <FaHeart className="w-5 h-5 text-red-500 animate-bounce-once" />
//           ) : (
//             <FaRegHeart className="w-5 h-5 text-white hover:text-red-500 cursor-pointer" />
//           )}
//         </button>

//         {/* Bottom overlay with avatar and rating */}
//         <div className="absolute bottom-4 left-4 right-4 z-10 flex justify-between items-end bg-white/80 rounded-2xl backdrop-blur-sm p-3">
//           <div className="flex items-center gap-2 rounded-full">
//             <img
//               src={avatarImage}
//               alt={ownerName}
//               className="w-8 h-8 rounded-full object-cover"
//             />
//             <h3 className="text-dark-2 font-semibold text-base">{ownerName}</h3>
//           </div>

//           <div className="relative w-8 h-8 rounded-full">
//             <img
//               src={cardStar}
//               className="w-full h-full object-cover"
//               alt="rating"
//             />
//             <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-xs font-semibold">
//               {rating}
//             </span>
//           </div>
//         </div>
//       </div>

//       <div className="mt-4 px-2">
//         {/* Location */}
//         <div className="flex items-center gap-1 text-dark-3 font-regular text-base">
//           <MapPin className="text-primary-blue w-5 h-5" />
//           <span>{location}</span>
//         </div>

//         {/* Title */}
//         <h3 className="text-dark-3 font-semibold text-2xl my-4">{title}</h3>

//         {/* Price */}
//         {/* <h3 className="text-primary-blue font-semibold text-2xl pb-4 border-b border-b-[#EAF1FA]">
//           ${price}
//           <span className="font-Grand-Hotel font-regular text-base text-dark-2 pl-1">
//             {priceUnit}
//           </span>
//         </h3> */}

//         {/* Features */}
//         <div className="my-4 grid grid-cols-3 gap-3">
//           {/* {features.rooms !== undefined && (
//             <div className="flex flex-col justify-center text-center items-center gap-1">
//               <House className="text-primary-blue w-5 h-5" />
//               <p className="text-dark-3 font-regular text-sm">
//                 {features.rooms} Rooms
//               </p>
//             </div>
//           )} */}
//           {features.beds !== undefined && (
//             <div className="flex flex-col justify-center text-center items-center gap-1">
//               <BedDouble className="text-primary-blue w-5 h-5" />
//               <p className="text-dark-3 font-regular text-sm">
//                 {features.beds} Beds
//               </p>
//             </div>
//           )}
//           {features.baths !== undefined && (
//             <div className="flex flex-col justify-center text-center items-center gap-1">
//               <Bath className="text-primary-blue w-5 h-5" />
//               <p className="text-dark-3 font-regular text-sm">
//                 {features.baths} Baths
//               </p>
//             </div>
//           )}
//           {features.sqft !== undefined && (
//             <div className="flex flex-col justify-center text-center items-center gap-1">
//               <SquareArrowOutUpRight className="text-primary-blue w-5 h-5" />
//               <p className="text-dark-3 font-regular text-sm">
//                 {features.sqft} sqm
//               </p>
//             </div>
//           )}
//           {features.floor !== undefined && (
//             <div className="flex flex-col justify-center text-center items-center gap-1">
//               <Building className="text-primary-blue w-5 h-5" />
//               <p className="text-dark-3 font-regular text-sm">
//                 {features.floor} floor
//               </p>
//             </div>
//           )}
//           {features.floor !== undefined && (
//             <div className="flex flex-col justify-center text-center items-center gap-1">
//               <User className="text-primary-blue w-5 h-5" />
//               <p className="text-dark-3 font-regular text-sm">
//                 {features.maxPeople} max people
//               </p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Action Button */}
//       <PrimaryButton
//         title={t("viewDetails")}
//         textColor="text-primary-blue"
//         bgColor="bg-[#F4F7FC] w-full hover:bg-primary-blue hover:text-white"
//         borderColor="border-2 border-primary-blue"
//         bgImage="/cardButtonHome.svg"
//         onClick={onViewDetails}
//       />
//     </div>
//   );
// };

// export default CommonCard;
