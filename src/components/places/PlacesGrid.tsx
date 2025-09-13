import { useNavigate } from "react-router-dom";
import PlacesCard from "./PlacesCard";
import { CommonCard } from "@/types/commonCard";

interface PlacesGridProps {
  propertyCards: CommonCard[];
}

const PlacesGrid = ({ propertyCards }: PlacesGridProps) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
      {propertyCards.map((card) => (
        <PlacesCard
          key={card.id}
          {...card}
          onViewDetails={() => navigate(`/home-details/${card.id}`)}
        />
      ))}
    </div>
  );
};

export default PlacesGrid;
