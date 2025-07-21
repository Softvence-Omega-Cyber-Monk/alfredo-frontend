import { useNavigate } from "react-router-dom";
import PropertyCard from "./PropertyCard";

import { properties } from "@/lib/data/properties";
const PropertiesGrid = () => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
      {properties.map((card, index) => (
        <PropertyCard
          key={index}
          {...card}
          onViewDetails={() => {
            navigate(`/home-details/${card.id}`);
          }}
        />
      ))}
    </div>
  );
};

export default PropertiesGrid;
