// src/components/favorites/MyFavoriteCard.tsx
import {
  MapPin,
  BedDouble,
  Bath,
  SquareArrowOutUpRight,
  User,
} from "lucide-react";
import PrimaryButton from "@/components/reusable/PrimaryButton";
import { useAppDispatch } from "@/hooks/useRedux";
import { toast } from "sonner";
import { useState } from "react";
import { Property } from "@/types/favorite";
import { removeFavorite } from "@/store/Slices/FavoritesSlice/favoritesSlice";
import { useNavigate } from "react-router-dom";

interface MyFavoriteCardProps extends Property {
  onViewDetails?: () => void;
}

const MyFavoriteCard: React.FC<MyFavoriteCardProps> = ({
  id,
  images,
  location,
  country,
  title,
  price,
  size,
  bedrooms,
  bathrooms,
  maxPeople,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemoveFavorite = async () => {
    if (!id) return;

    setIsRemoving(true);
    try {
      await dispatch(removeFavorite(id)).unwrap();
      toast.success("Removed from favorites");
    } catch (error) {
      toast.error("Failed to remove from favorites");
    } finally {
      setIsRemoving(false);
    }
  };

  const handleViewDetails = () => {
    navigate(`/home-details/${id}`);
  };

  return (
    <div className="p-3 rounded-3xl bg-[#F4F7FC]">
      <div className="rounded-2xl overflow-hidden max-h-64 relative">
        <img
          src={
            images && images.length > 0
              ? images[0].url
              : "/placeholder-property.jpg"
          }
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="mt-4 px-2">
        <div className="flex items-center gap-1 text-dark-3 font-regular text-base">
          <MapPin className="text-primary-blue w-5 h-5" />
          <span>
            {location}, {country}
          </span>
        </div>

        <h3 className="text-dark-3 font-semibold text-2xl my-4 line-clamp-2">
          {title}
        </h3>

        <h3 className="text-primary-blue font-semibold text-2xl pb-4 border-b border-b-[#EAF1FA]">
          ${price}
        </h3>

        <div className="my-4 grid grid-cols-3 gap-3">
          {bedrooms !== undefined && (
            <div className="flex flex-col justify-center text-center items-center gap-1">
              <BedDouble className="text-primary-blue w-5 h-5" />
              <p className="text-dark-3 font-regular text-sm">
                {bedrooms} Beds
              </p>
            </div>
          )}
          {bathrooms !== undefined && (
            <div className="flex flex-col justify-center text-center items-center gap-1">
              <Bath className="text-primary-blue w-5 h-5" />
              <p className="text-dark-3 font-regular text-sm">
                {bathrooms} Baths
              </p>
            </div>
          )}
          {size !== undefined && (
            <div className="flex flex-col justify-center text-center items-center gap-1">
              <SquareArrowOutUpRight className="text-primary-blue w-5 h-5" />
              <p className="text-dark-3 font-regular text-sm">{size} sqm</p>
            </div>
          )}
          {maxPeople !== undefined && (
            <div className="flex flex-col justify-center text-center items-center gap-1">
              <User className="text-primary-blue w-5 h-5" />
              <p className="text-dark-3 font-regular text-sm">
                {maxPeople} max people
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        <PrimaryButton
          title="View Details"
          textColor="text-primary-blue"
          bgColor="bg-[#F4F7FC] w-full"
          borderColor="border-2 border-primary-blue"
          onClick={handleViewDetails}
        />
        <button
          onClick={handleRemoveFavorite}
          disabled={isRemoving}
          className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors disabled:opacity-50 cursor-pointer"
        >
          {isRemoving ? "Removing..." : "Remove"}
        </button>
      </div>
    </div>
  );
};

export default MyFavoriteCard;

// // src/components/favorites/MyFavoriteCard.tsx
// import {
//   MapPin,
//   House,
//   BedDouble,
//   Bath,
//   SquareArrowOutUpRight,
//   User,
// } from "lucide-react";
// import PrimaryButton from "@/components/reusable/PrimaryButton";

// import { useAppDispatch } from "@/hooks/useRedux";

// import { toast } from "sonner";
// import { useState } from "react";
// import { Property } from "@/types/favorite";
// import { removeFavorite } from "@/store/Slices/FavoritesSlice/favoritesSlice";

// interface MyFavoriteCardProps extends Property {
//   onViewDetails?: () => void;
// }

// const MyFavoriteCard: React.FC<MyFavoriteCardProps> = ({
//   id,
//   images,
//   location,
//   country,
//   title,
//   price,
//   size,
//   bedrooms,
//   bathrooms,
//   maxPeople,
//   onViewDetails,
// }) => {
//   const dispatch = useAppDispatch();
//   const [isRemoving, setIsRemoving] = useState(false);

//   const handleRemoveFavorite = async () => {
//     if (!id) return;

//     setIsRemoving(true);
//     try {
//       await dispatch(removeFavorite(id)).unwrap();
//       toast.success("Removed from favorites");
//     } catch (error) {
//       toast.error("Failed to remove from favorites");
//     } finally {
//       setIsRemoving(false);
//     }
//   };

//   return (
//     <div className="p-3 rounded-3xl bg-[#F4F7FC]">
//       <div className="rounded-2xl overflow-hidden max-h-64 relative">
//         <img
//           src={
//             images && images.length > 0
//               ? images[0]
//               : "/placeholder-property.jpg"
//           }
//           alt={title}
//           className="w-full h-full object-cover"
//         />
//       </div>

//       <div className="mt-4 px-2">
//         <div className="flex items-center gap-1 text-dark-3 font-regular text-base">
//           <MapPin className="text-primary-blue w-5 h-5" />
//           <span>
//             {location}, {country}
//           </span>
//         </div>

//         <h3 className="text-dark-3 font-semibold text-2xl my-4 line-clamp-2">
//           {title}
//         </h3>

//         <h3 className="text-primary-blue font-semibold text-2xl pb-4 border-b border-b-[#EAF1FA]">
//           ${price}
//         </h3>

//         <div className="my-4 grid grid-cols-3 gap-3">
//           {bedrooms !== undefined && (
//             <div className="flex flex-col justify-center text-center items-center gap-1">
//               <House className="text-primary-blue w-5 h-5" />
//               <p className="text-dark-3 font-regular text-sm">
//                 {bedrooms} Rooms
//               </p>
//             </div>
//           )}
//           {bedrooms !== undefined && (
//             <div className="flex flex-col justify-center text-center items-center gap-1">
//               <BedDouble className="text-primary-blue w-5 h-5" />
//               <p className="text-dark-3 font-regular text-sm">
//                 {bedrooms} Beds
//               </p>
//             </div>
//           )}
//           {bathrooms !== undefined && (
//             <div className="flex flex-col justify-center text-center items-center gap-1">
//               <Bath className="text-primary-blue w-5 h-5" />
//               <p className="text-dark-3 font-regular text-sm">
//                 {bathrooms} Baths
//               </p>
//             </div>
//           )}
//           {size !== undefined && (
//             <div className="flex flex-col justify-center text-center items-center gap-1">
//               <SquareArrowOutUpRight className="text-primary-blue w-5 h-5" />
//               <p className="text-dark-3 font-regular text-sm">{size} sqm</p>
//             </div>
//           )}
//           {maxPeople !== undefined && (
//             <div className="flex flex-col justify-center text-center items-center gap-1">
//               <User className="text-primary-blue w-5 h-5" />
//               <p className="text-dark-3 font-regular text-sm">
//                 {maxPeople} max people
//               </p>
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="flex gap-2">
//         <PrimaryButton
//           title="View Details"
//           textColor="text-primary-blue"
//           bgColor="bg-[#F4F7FC] w-full"
//           borderColor="border-2 border-primary-blue"
//           onClick={onViewDetails}
//         />
//         <button
//           onClick={handleRemoveFavorite}
//           disabled={isRemoving}
//           className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors disabled:opacity-50 cursor-pointer"
//         >
//           Remove
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MyFavoriteCard;

// import {
//   MapPin,
//   House,
//   BedDouble,
//   Bath,
//   SquareArrowOutUpRight,
// } from "lucide-react";

// import PrimaryButton from "@/components/reusable/PrimaryButton";

// interface FavoriteFeatures {
//   rooms?: number;
//   beds?: number;
//   baths?: number;
//   sqft?: number;
// }

// interface CommonCardProps {
//   image: string;
//   avatarImage: string;
//   rating: string;
//   ownerName: string;
//   location: string;
//   title: string;
//   price: number;
//   priceUnit?: string;
//   features: FavoriteFeatures;
//   onViewDetails?: () => void;
// }

// const MyFavoriteCard: React.FC<CommonCardProps> = ({
//   image,
//   location,
//   title,
//   price,
//   priceUnit = "/mt",
//   features,
//   onViewDetails,
// }) => {
//   return (
//     <div className="p-3 rounded-3xl bg-[#F4F7FC]">
//       <div className="rounded-2xl overflow-hidden max-h-64 relative">
//         {/* Main Image */}
//         <img src={image} alt={title} className="w-full h-full object-cover" />
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
//         <h3 className="text-primary-blue font-semibold text-2xl pb-4 border-b border-b-[#EAF1FA]">
//           ${price}
//           <span className="font-Grand-Hotel font-regular text-base text-dark-2 pl-1">
//             {priceUnit}
//           </span>
//         </h3>

//         {/* Features */}
//         <div className="my-4 flex items-center justify-between">
//           {features.rooms !== undefined && (
//             <div className="flex flex-col justify-center text-center items-center gap-1">
//               <House className="text-primary-blue w-5 h-5" />
//               <p className="text-dark-3 font-regular text-sm">
//                 {features.rooms} Rooms
//               </p>
//             </div>
//           )}
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
//                 {features.sqft} sqf
//               </p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Action Button */}
//       <PrimaryButton
//         title="Edit Details"
//         textColor="text-primary-blue"
//         bgColor="bg-[#F4F7FC] w-full"
//         borderColor="border-2 border-primary-blue"
//         bgImage="/cardButtonHome.svg"
//         onClick={onViewDetails}
//       />
//     </div>
//   );
// };

// export default MyFavoriteCard;
