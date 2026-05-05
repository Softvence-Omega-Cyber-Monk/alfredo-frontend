import {
  MapPin,
  BedDouble,
  Bath,
  SquareArrowOutUpRight,
  Pencil,
  Trash,
} from "lucide-react"; // Add Pencil and Trash

import PrimaryButton from "@/components/reusable/PrimaryButton";

interface PropertyFeatures {
  beds?: number;
  baths?: number;
  sqm?: number;
}

interface CommonCardProps {
  image: string;
  coverImage?: string;
  avatarImage: string;
  rating: string;
  ownerName: string;
  location: string;
  title: string;
  price: number;
  features: PropertyFeatures;
  onViewDetails?: () => void;
  onEdit?: () => void; // New: for edit modal
  onDelete?: () => void; // New: for delete confirmation
}

const PropertyCard: React.FC<CommonCardProps> = ({
  image,
  coverImage,
  location,
  title,
  features,
  onViewDetails,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="p-3 rounded-3xl bg-[#F4F7FC]">
      <div className="rounded-2xl overflow-hidden max-h-64 relative">
        <img src={coverImage || image} alt={title} className="w-full h-full object-cover" />
      </div>

      <div className="mt-4 px-2">
        <div className="flex items-center gap-1 text-dark-3 font-regular text-base">
          <MapPin className="text-primary-blue w-5 h-5" />
          <span>{location}</span>
        </div>

        <h3 className="text-dark-3 font-semibold text-2xl my-4">{title}</h3>

        <div className="my-4 flex items-center justify-between">
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
          {features.sqm !== undefined && (
            <div className="flex flex-col justify-center text-center items-center gap-1">
              <SquareArrowOutUpRight className="text-primary-blue w-5 h-5" />
              <p className="text-dark-3 font-regular text-sm">
                {features.sqm} sqm
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Actions Row: View/Details Button + Edit/Delete Icons */}
      <div className="flex items-center justify-between mt-4">
        <PrimaryButton
          title="View Details" // Renamed for clarity (was "Edit Details", but function is view)
          textColor="text-primary-blue"
          bgColor="bg-[#F4F7FC]"
          borderColor="border-2 border-primary-blue"
          bgImage="/cardButtonHome.svg"
          onClick={onViewDetails}
          className="flex-1 mr-2" // Make it take space, with margin
        />
        <button
          onClick={onEdit}
          className="p-2 text-primary-blue hover:text-blue-700"
        >
          <Pencil className="w-5 h-5" />
        </button>
        <button
          onClick={onDelete}
          className="p-2 text-red-500 hover:text-red-700"
        >
          <Trash className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;
