// src/components/favorites/FavoriteGrid.tsx
import { useNavigate } from "react-router-dom";
import MyFavoriteCard from "./MyFavoriteCard";
import { Property } from "@/types/favorite";

interface FavoriteGridProps {
  favorites: Property[];
}

const FavoriteGrid: React.FC<FavoriteGridProps> = ({ favorites }) => {
  const navigate = useNavigate();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
      {favorites.map((property) => (
        <MyFavoriteCard
          key={property.id}
          {...property}
          onViewDetails={() => {
            navigate(`/home-details/${property.id}`);
          }}
        />
      ))}
    </div>
  );
};

export default FavoriteGrid;

// import { useNavigate } from "react-router-dom";

// import { properties } from "@/lib/data/properties";
// import MyFavoriteCard from "./MyFavoriteCard";
// const FavoriteGrid = () => {
//   const navigate = useNavigate();
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
//       {properties.map((card, index) => (
//         <MyFavoriteCard
//           key={index}
//           {...card}
//           onViewDetails={() => {
//             navigate(`/home-details/${card.id}`);
//           }}
//         />
//       ))}
//     </div>
//   );
// };

// export default FavoriteGrid;
