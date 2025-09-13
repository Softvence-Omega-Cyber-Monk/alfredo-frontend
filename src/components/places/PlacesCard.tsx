import { CommonCard } from "@/types/commonCard";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const PlacesCard: React.FC<CommonCard> = ({ id, image, location, title }) => {
  return (
    <Link
      to={`/home-details/${id}`}
      className="p-3 rounded-3xl bg-[#F4F7FC] block"
    >
      <div className="rounded-2xl overflow-hidden max-h-64 h-64">
        {/* Main Image with fallback */}
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder-image.jpg";
          }}
        />
      </div>

      <div className="mt-4 px-2">
        {/* Location */}
        <div className="flex items-center gap-1 text-dark-3 font-regular text-base">
          <MapPin className="text-primary-blue w-5 h-5" />
          <span className="truncate">{location}</span>
        </div>

        {/* Title */}
        <h3 className="text-dark-3 font-semibold text-2xl my-4 line-clamp-2 h-16">
          {title}
        </h3>
      </div>
    </Link>
  );
};

export default PlacesCard;
