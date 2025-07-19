import fridge from "@/assets/icons/Fridge.svg";
import Microwave from "@/assets/icons/Micro.svg";
import washing from "@/assets/icons/washing.svg";
import bicycle from "@/assets/icons/bicycle.svg";
import Coastal from "@/assets/icons/sunbath.svg";


export interface Amenity {
  icon: string;
  title: string;
}

export interface Amenities {
  main: Amenity[];
  transport: Amenity[];
  surrounding: Amenity[];
}



export const amenitiesData: Amenities = {
  main: [
    {
      icon: fridge,
      title: "Fridge",
    },
    {
      icon: Microwave,
      title: "Microwave oven",
    },
    {
      icon: washing,
      title: "Washing machine",
    },
  ],
  transport: [
    {
      icon: bicycle,
      title: "Bicycle",
    },
  ],
  surrounding: [
    {
      icon: Coastal,
      title: "Countryside",
    },
    {
      icon: Coastal,
      title: "Mountain",
    },
    {
      icon: Coastal,
      title: "Coastal",
    },
  ],
};