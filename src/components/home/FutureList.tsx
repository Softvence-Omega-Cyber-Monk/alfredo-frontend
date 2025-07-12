import React from "react";
import CommonWrapper from "@/common/CommonWrapper";
import ClientHeading from "../reusable/ClientHeading";
import CommonCard from "../reusable/CommonCard";
import cardImg from "@/assets/home/cardImg.jpg";
import cardAvatar from "@/assets/home/cardAvatar.jpg";
import PrimaryButton from '../reusable/PrimaryButton';


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

  // Add more property cards here
];

const FutureList = () => {
  return (
    <div className="px-4">
      <CommonWrapper>
        <ClientHeading headingText="Our Future" spanText="list" />
        <p className="text-lg md:text-xl lg:text-2xl text-dark-3 font-regular text-center max-w-md mx-auto mb-10">
          Over 360,000 homes and apartments available for an exchange
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 px-4">
          {propertyCards.map((card, index) => (
            <CommonCard key={index} {...card} />
          ))}

          
        </div>
        <div className="mt-8 flex justify-center">
            <PrimaryButton
            title="Explore All  "
            onClick={() => console.log("View All Clicked")}
          />
        </div>
      </CommonWrapper>
    </div>
  );
};

export default FutureList;
