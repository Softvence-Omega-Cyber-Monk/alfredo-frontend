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
import countryside from "@/assets/icons/city.svg";
import mountain from "@/assets/icons/mountain.svg";
import village from "@/assets/icons/village.svg";
import island from "@/assets/icons/island.svg";
import river from "@/assets/icons/river.svg";
import city from "@/assets/icons/city-2.svg";
import lake from "@/assets/icons/lake.svg";
import bike from "@/assets/icons/bike.svg";
import car from "@/assets/icons/car.svg";
import bus from "@/assets/icons/bus.svg";
import train from "@/assets/icons/train.svg";
import boat from "@/assets/icons/boat.svg";
import computer from "@/assets/icons/computer.svg";
import swimming from "@/assets/icons/Swimming.svg";
import gym from "@/assets/icons/gym.svg";
import roomHeater from "@/assets/icons/room-heater.svg";
import parking from "@/assets/icons/parking.svg";
import playground from "@/assets/icons/playground.svg";
import garden from "@/assets/icons/garden2.svg";
import terrace from "@/assets/icons/terrace.svg";
import heatPump from "@/assets/icons/heat-pump.svg";
import dishwasher from "@/assets/icons/dishwasher.svg";
import elevator from "@/assets/icons/elevator.svg";
import privatePool from "@/assets/icons/private-pool.svg";
import bbq from "@/assets/icons/bbq.svg";

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
    {
      icon: balcony,
      title: "Balcony",
    },

    {
      icon: computer,
      title: "Computer",
    },
    {
      icon: swimming,
      title: "Swimming Pool",
    },
    {
      icon: gym,
      title: "Gym Space",
    },
    {
      icon: roomHeater,
      title: "Room Heater",
    },
    {
      icon: parking,
      title: "Parking",
    },
    {
      icon: playground,
      title: "Playground",
    },
    {
      icon: terrace,
      title: "Terrace",
    },
    {
      icon: garden,
      title: "Garden",
    },
    {
      icon: heatPump,
      title: "Heat Pump",
    },
    {
      icon: dishwasher,
      title: "Dishwasher",
    },

    {
      icon: elevator,
      title: "Elevator",
    },
    {
      icon: privatePool,
      title: "Private Pool",
    },
    {
      icon: bbq,
      title: "BBQ",
    },
  ],
  transport: [
    {
      icon: bicycle,
      title: "Bicycle",
    },
    {
      icon: bike,
      title: "Bike",
    },
    {
      icon: car,
      title: "Car",
    },
    {
      icon: bus,
      title: "Bus",
    },
    {
      icon: train,
      title: "Train",
    },
    {
      icon: boat,
      title: "Boat",
    },
  ],
  surrounding: [
    {
      icon: countryside,
      title: "Countryside",
    },
    {
      icon: mountain,
      title: "Mountain",
    },
    {
      icon: Coastal,
      title: "Coastal",
    },
    {
      icon: lake,
      title: "Lake",
    },
    {
      icon: city,
      title: "City",
    },
    {
      icon: village,
      title: "Village",
    },
    {
      icon: river,
      title: "River",
    },
    {
      icon: island,
      title: "Island",
    },
  ],
};
