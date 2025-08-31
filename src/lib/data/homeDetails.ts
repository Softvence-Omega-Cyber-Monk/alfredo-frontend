import { MdRocketLaunch } from "react-icons/md";
import { RiVipDiamondFill } from "react-icons/ri";
import { FaCheck } from "react-icons/fa";
import cardImg from "@/assets/home/cardImg.jpg";
import testimonailPerson from "@/assets/testimonailPerson.jpg";

import fridge from "@/assets/icons/Fridge.svg";
import Microwave from "@/assets/icons/Micro.svg";
import washing from "@/assets/icons/washing.svg";
import bicycle from "@/assets/icons/bicycle.svg";
import Coastal from "@/assets/icons/sunbath.svg";

export interface HomeDetailsType {
  title: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  dates: {
    from: string;
    to: string;
  };
  photos: {
    src: string;
    alt: string;
  }[];
  features: {
    rooms?: number;
    baths?: number;
    beds?: number;
    area?: number;
  };
  description: {
    text: string;
    homeId: string;
  };
  amenities: {
    main: {
      icon: string;
      title: string;
    }[];
    transport: {
      icon: string;
      title: string;
    }[];
    surrounding: {
      icon: string;
      title: string;
    }[];
  };
  owner: {
    image: string;
    name: string;
    email: string;
    location: string;
    badges: {
      icon: React.ElementType;
      color: string;
    }[];
    verifications: {
      icon: React.ElementType;
      text: string;
      bgColor: string;
      iconColor: string;
    }[];
  };
  callToAction: {
    message: string;
    button: {
      title: string;
      textColor: string;
      bgColor: string;
      borderColor: string;
      bgImage: string;
    };
  };
}

export const homeDetailsData: HomeDetailsType = {
  title: "Beautiful Beach House",
  location: {
    lat: 23.8103,
    lng: 90.4125,
    address: "75835 Herta Walks, london",
  },
  dates: {
    from: "01-Jun-2026",
    to: "30-Dec-2026",
  },
  features: {
    rooms: 3,
    baths: 2,
    beds: 4,
    area: 1200,
  },
  photos: [
    { src: cardImg, alt: "Main view" },
    { src: cardImg, alt: "Second view" },
    { src: cardImg, alt: "Third view" },
    { src: cardImg, alt: "Fourth view" },
  ],
  description: {
    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
    commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
    velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
    occaecat cupidatat non proident, sunt in culpa qui officia deserunt
    mollit anim id est laborum.

    Sed ut perspiciatis unde omnis iste natus error sit voluptatem.
    Accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
    illo inventore veritatis et quasi architecto beatae vitae dicta sunt
    explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
    od`,
    homeId: "#2462622",
  },
  amenities: {
    main: [
      {
        icon: fridge,
        title: "Fridge",
      },
      {
        icon: Microwave,
        title: "Microwave oven ",
      },
      {
        icon: washing,
        title: "Washing machine ",
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
  },
  owner: {
    image: testimonailPerson,
    name: "Mr. Alfred Jones",
    email: "yourmail@gmail.com",
    location: "75835 Herta Walks, london 1229",
    badges: [
      { icon: MdRocketLaunch, color: "bg-[#9333EA]" },
      { icon: RiVipDiamondFill, color: "bg-[#D97706]" },
    ],
    verifications: [
      {
        icon: FaCheck,
        text: "ID and proof verified",
        bgColor: "bg-[#E6F5E9]",
        iconColor: "text-[#49A85F]",
      },
      {
        icon: FaCheck,
        text: "Email verified",
        bgColor: "bg-[#E6F5E9]",
        iconColor: "text-[#49A85F]",
      },
      {
        icon: FaCheck,
        text: "Phone verified",
        bgColor: "bg-[#E6F5E9]",
        iconColor: "text-[#49A85F]",
      },
    ],
  },
  callToAction: {
    message:
      "Start exchanging your home! Create a VACANZA account to start contacting members.",
    button: {
      title: "Contact",
      textColor: "text-white",
      bgColor: "bg-primary-blue w-full",
      borderColor: "border-none",
      bgImage: "/buttonHomeIcon.svg",
    },
  },
};
