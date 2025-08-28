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
  id: string;
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
      id: "1",
      icon: fridge,
      title: "dashboard.part3.main.title1",
    },
    {
      id: "1",
      icon: Microwave,
      title: "dashboard.part3.main.title2",
    },
    {
      id: "1",
      icon: washing,
      title: "dashboard.part3.main.title3",
    },
    {
      id: "1",
      icon: bathtub,
      title: "dashboard.part3.main.title4",
    },
    {
      id: "1",
      icon: wifi,
      title: "dashboard.part3.main.title5",
    },
    {
      id: "1",
      icon: trash,
      title: "dashboard.part3.main.title6",
    },
    {
      id: "1",
      icon: ac,
      title: "dashboard.part3.main.title7",
    },
    {
      id: "1",
      icon: tv,
      title: "dashboard.part3.main.title8",
    },
    {
      id: "1",
      icon: easy,
      title: "dashboard.part3.main.title9",
    },
    {
      id: "1",
      icon: balcony,
      title: "dashboard.part3.main.title10",
    },

    {
      id: "1",
      icon: computer,
      title: "dashboard.part3.main.title11",
    },
    {
      id: "1",
      icon: swimming,
      title: "dashboard.part3.main.title12",
    },
    {
      id: "1",
      icon: gym,
      title: "dashboard.part3.main.title13",
    },
    {
      id: "1",
      icon: roomHeater,
      title: "dashboard.part3.main.title14",
    },
    {
      id: "1",
      icon: parking,
      title: "dashboard.part3.main.title15",
    },
    {
      id: "1",
      icon: playground,
      title: "dashboard.part3.main.title16",
    },
    {
      id: "1",
      icon: terrace,
      title: "dashboard.part3.main.title17",
    },
    {
      id: "1",
      icon: garden,
      title: "dashboard.part3.main.title18",
    },
    {
      id: "1",
      icon: heatPump,
      title: "dashboard.part3.main.title19",
    },
    {
      id: "1",
      icon: dishwasher,
      title: "dashboard.part3.main.title20",
    },

    {
      id: "1",
      icon: elevator,
      title: "dashboard.part3.main.title21",
    },
    {
      id: "1",
      icon: privatePool,
      title: "dashboard.part3.main.title22",
    },
    {
      id: "1",
      icon: bbq,
      title: "dashboard.part3.main.title23",
    },
  ],
  transport: [
    {
      id: "1",
      icon: bicycle,
      title: "dashboard.part3.transport.title1",
    },
    {
      id: "1",
      icon: bike,
      title: "dashboard.part3.transport.title2",
    },
    {
      id: "1",
      icon: car,
      title: "dashboard.part3.transport.title3",
    },
    {
      id: "1",
      icon: bus,
      title: "dashboard.part3.transport.title4",
    },
    {
      id: "1",
      icon: train,
      title: "dashboard.part3.transport.title5",
    },
    {
      id: "1",
      icon: boat,
      title: "dashboard.part3.transport.title6",
    },
  ],
  surrounding: [
    {
      id: "1",
      icon: countryside,
      title: "dashboard.part3.surrounding.title1",
    },
    {
      id: "1",
      icon: mountain,
      title: "dashboard.part3.surrounding.title2",
    },
    {
      id: "1",
      icon: Coastal,
      title: "dashboard.part3.surrounding.title3",
    },
    {
      id: "1",
      icon: lake,
      title: "dashboard.part3.surrounding.title4",
    },
    {
      id: "1",
      icon: city,
      title: "dashboard.part3.surrounding.title5",
    },
    {
      id: "1",
      icon: village,
      title: "dashboard.part3.surrounding.title6",
    },
    {
      id: "1",
      icon: river,
      title: "dashboard.part3.surrounding.title7",
    },
    {
      id: "1",
      icon: island,
      title: "dashboard.part3.surrounding.title8",
    },
  ],
};

// import fridge from "@/assets/icons/Fridge.svg";
// import Microwave from "@/assets/icons/Micro.svg";
// import washing from "@/assets/icons/washing.svg";
// import bicycle from "@/assets/icons/bicycle.svg";
// import Coastal from "@/assets/icons/sunbath.svg";
// import bathtub from "@/assets/icons/bathtub.svg";
// import wifi from "@/assets/icons/wifi.svg";
// import balcony from "@/assets/icons/balcony.svg";
// import trash from "@/assets/icons/trash.svg";
// import ac from "@/assets/icons/ac.svg";
// import tv from "@/assets/icons/tv.svg";
// import easy from "@/assets/icons/easy.svg";
// import countryside from "@/assets/icons/city.svg";
// import mountain from "@/assets/icons/mountain.svg";
// import village from "@/assets/icons/village.svg";
// import island from "@/assets/icons/island.svg";
// import river from "@/assets/icons/river.svg";
// import city from "@/assets/icons/city-2.svg";
// import lake from "@/assets/icons/lake.svg";
// import bike from "@/assets/icons/bike.svg";
// import car from "@/assets/icons/car.svg";
// import bus from "@/assets/icons/bus.svg";
// import train from "@/assets/icons/train.svg";
// import boat from "@/assets/icons/boat.svg";
// import computer from "@/assets/icons/computer.svg";
// import swimming from "@/assets/icons/Swimming.svg";
// import gym from "@/assets/icons/gym.svg";
// import roomHeater from "@/assets/icons/room-heater.svg";
// import parking from "@/assets/icons/parking.svg";
// import playground from "@/assets/icons/playground.svg";
// import garden from "@/assets/icons/garden2.svg";
// import terrace from "@/assets/icons/terrace.svg";
// import heatPump from "@/assets/icons/heat-pump.svg";
// import dishwasher from "@/assets/icons/dishwasher.svg";
// import elevator from "@/assets/icons/elevator.svg";
// import privatePool from "@/assets/icons/private-pool.svg";
// import bbq from "@/assets/icons/bbq.svg";

// ex
// id: "1",port interface Amenity {
//   icon: string;
//   title: string;
// }

// export interface Amenities {
//   main: Amenity[];
//   transport: Amenity[];
//   surrounding: Amenity[];
// }

// export const amenitiesData: Amenities = {
//   main: [
//     {
//       icon: fridge,
//       title: "Fridge",
//     },
//     {
//       icon: Microwave,
//       title: "Microwave oven",
//     },
//     {
//       icon: washing,
//       title: "Washing machine",
//     },
//     {
//       icon: bathtub,
//       title: "Bathtub",
//     },
//     {
//       icon: wifi,
//       title: "WIFI",
//     },
//     {
//       icon: trash,
//       title: "Waste Sorting",
//     },
//     {
//       icon: ac,
//       title: "Air Conditioner",
//     },
//     {
//       icon: tv,
//       title: "TV",
//     },
//     {
//       icon: easy,
//       title: "Easily Accessible",
//     },
//     {
//       icon: balcony,
//       title: "Balcony",
//     },

//     {
//       icon: computer,
//       title: "Computer",
//     },
//     {
//       icon: swimming,
//       title: "Swimming Pool",
//     },
//     {
//       icon: gym,
//       title: "Gym Space",
//     },
//     {
//       icon: roomHeater,
//       title: "Room Heater",
//     },
//     {
//       icon: parking,
//       title: "Parking",
//     },
//     {
//       icon: playground,
//       title: "Playground",
//     },
//     {
//       icon: terrace,
//       title: "Terrace",
//     },
//     {
//       icon: garden,
//       title: "Garden",
//     },
//     {
//       icon: heatPump,
//       title: "Heat Pump",
//     },
//     {
//       icon: dishwasher,
//       title: "Dishwasher",
//     },

//     {
//       icon: elevator,
//       title: "Elevator",
//     },
//     {
//       icon: privatePool,
//       title: "Private Pool",
//     },
//     {
//       icon: bbq,
//       title: "BBQ",
//     },
//   ],
//   transport: [
//     {
//       icon: bicycle,
//       title: "Bicycle",
//     },
//     {
//       icon: bike,
//       title: "Bike",
//     },
//     {
//       icon: car,
//       title: "Car",
//     },
//     {
//       icon: bus,
//       title: "Bus",
//     },
//     {
//       icon: train,
//       title: "Train",
//     },
//     {
//       icon: boat,
//       title: "Boat",
//     },
//   ],
//   surrounding: [
//     {
//       icon: countryside,
//       title: "Countryside",
//     },
//     {
//       icon: mountain,
//       title: "Mountain",
//     },
//     {
//       icon: Coastal,
//       title: "Coastal",
//     },
//     {
//       icon: lake,
//       title: "Lake",
//     },
//     {
//       icon: city,
//       title: "City",
//     },
//     {
//       icon: village,
//       title: "Village",
//     },
//     {
//       icon: river,
//       title: "River",
//     },
//     {
//       icon: island,
//       title: "Island",
//     },
//   ],
// };
