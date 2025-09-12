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
