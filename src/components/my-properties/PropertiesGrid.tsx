import { useNavigate } from "react-router-dom";
import PropertyCard from "./PropertyCard";

// import { propertiess } from "@/lib/data/properties";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { useEffect } from "react";
import { fetchMyProperties } from "@/store/Slices/PropertySlice/propertySlice";
const PropertiesGrid = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { myProperties } = useAppSelector((state) => state.property);
  console.log("properties", myProperties);

  useEffect(() => {
    dispatch(fetchMyProperties());
  }, [dispatch]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
      {myProperties.map((card) => (
        <PropertyCard
          key={card.id}
          image={card.images[0] || "/placeholder.jpg"} // backend returns `images: []`
          avatarImage={card.owner?.photo || "/avatar-placeholder.png"}
          rating={"5.0"} // your backend doesn’t send ratings → fake it for now
          ownerName={card.owner?.fullName || "Unknown"}
          location={card.location}
          title={card.title}
          price={card.price}
          features={{
            beds: card.bedrooms,
            baths: card.bathrooms,
            sqft: Math.floor(card.size),
          }}
          onViewDetails={() => navigate(`/home-details/${card.id}`)}
        />
      ))}
    </div>
  );
};

export default PropertiesGrid;
