import { useNavigate } from "react-router-dom";
import cardImg from "@/assets/home/cardImg.jpg";
import cardAvatar from "@/assets/home/cardAvatar.jpg";
import PlacesCard from "./PlacesCard";

const propertyCards = [
  {
    image: cardImg,
    avatarImage: cardAvatar,
    rating: "4.9",
    ownerName: "Mr. Alfred",
    location: "75835 Herta Walks, london",
    title: "2 Bedroom Apartment",
    price: 200.5,
    features: {
      rooms: 14,
      beds: 14,
      baths: 2,
      sqft: 250,
    },
  },
  {
    image: cardImg,
    avatarImage: cardAvatar,
    rating: "4.9",
    ownerName: "Mr. Alfred",
    location: "75835 Herta Walks, london",
    title: "2 Bedroom Apartment",
    price: 200.5,
    features: {
      rooms: 14,
      beds: 14,
      baths: 2,
      sqft: 250,
    },
  },
  {
    image: cardImg,
    avatarImage: cardAvatar,
    rating: "4.9",
    ownerName: "Mr. Alfred",
    location: "75835 Herta Walks, london",
    title: "2 Bedroom Apartment",
    price: 200.5,
    features: {
      rooms: 14,
      beds: 14,
      baths: 2,
      sqft: 250,
    },
  },
  {
    image: cardImg,
    avatarImage: cardAvatar,
    rating: "4.9",
    ownerName: "Mr. Alfred",
    location: "75835 Herta Walks, london",
    title: "2 Bedroom Apartment",
    price: 200.5,
    features: {
      rooms: 14,
      beds: 14,
      baths: 2,
      sqft: 250,
    },
  },
  {
    image: cardImg,
    avatarImage: cardAvatar,
    rating: "4.9",
    ownerName: "Mr. Alfred",
    location: "75835 Herta Walks, london",
    title: "2 Bedroom Apartment",
    price: 200.5,
    features: {
      rooms: 14,
      beds: 14,
      baths: 2,
      sqft: 250,
    },
  },
  {
    image: cardImg,
    avatarImage: cardAvatar,
    rating: "4.9",
    ownerName: "Mr. Alfred",
    location: "75835 Herta Walks, london",
    title: "2 Bedroom Apartment",
    price: 200.5,
    features: {
      rooms: 14,
      beds: 14,
      baths: 2,
      sqft: 250,
    },
  },
];
const PlacesGrid = () => {
    const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
      {propertyCards.map((card, index) => (
        <PlacesCard
          key={index}
          {...card}
          onViewDetails={() => {
            navigate(`/home-details/${index}`);
          }}
        />
      ))}
    </div>
  );
};

export default PlacesGrid;
