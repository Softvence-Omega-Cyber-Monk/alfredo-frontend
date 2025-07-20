import fridge from "@/assets/icons/Fridge.svg";
import Microwave from "@/assets/icons/Micro.svg";
import washing from "@/assets/icons/washing.svg";
import bicycle from "@/assets/icons/bicycle.svg";
import Coastal from "@/assets/icons/sunbath.svg";
import bathtub from "@/assets/icons/bathtub.svg";
import wifi from "@/assets/icons/wifi.svg";
import balcony from "@/assets/icons/balcony.svg";
import trash from "@/assets/icons/trash.svg";
import ac from "@/assets/icons/ac.svg";
import tv from "@/assets/icons/tv.svg";
import easy from "@/assets/icons/easy.svg";

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
    {
      icon: bathtub,
      title: "Bathtub",
    },
    {
      icon: wifi,
      title: "WIFI",
    },
    {
      icon: balcony,
      title: "Balcony",
    },

    {
      icon: trash,
      title: "Waste Sorting",
    },
    {
      icon: ac,
      title: "Air Conditioner",
    },
    {
      icon: tv,
      title: "TV",
    },
    {
      icon: easy,
      title: "Easily Accessible",
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
