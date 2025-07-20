import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";

interface PropertyFeatures {
  rooms?: number;
  beds?: number;
  baths?: number;
  sqft?: number;
}

interface CommonCardProps {
  image: string;
  avatarImage: string;
  rating: string;
  ownerName: string;
  location: string;
  title: string;
  price: number;
  priceUnit?: string;
  features: PropertyFeatures;
  onViewDetails?: () => void;
}

const PlacesCard: React.FC<CommonCardProps> = ({ image, location, title }) => {
  return (
    <Link to={`/places/${title}`} className="p-3 rounded-3xl bg-[#F4F7FC]">
      <div className="rounded-2xl overflow-hidden max-h-64">
        {/* Main Image */}
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      <div className="mt-4 px-2">
        {/* Location */}
        <div className="flex items-center gap-1 text-dark-3 font-regular text-base">
          <MapPin className="text-primary-blue w-5 h-5" />
          <span>{location}</span>
        </div>

        {/* Title */}
        <h3 className="text-dark-3 font-semibold text-2xl my-4">{title}</h3>
      </div>
    </Link>
  );
};

export default PlacesCard;
