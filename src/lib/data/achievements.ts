import rocketIcon from "@/assets/icons/rocket.svg";
import bag from "@/assets/icons/bag.svg";
import crown from "@/assets/icons/crown.svg";
import sprout from "@/assets/icons/sprout.svg";
import diamond from "@/assets/icons/diamond.svg";
import starBlue from "@/assets/icons/starBlue.svg";
import starPurple from "@/assets/icons/starPurple.svg";
import starRed from "@/assets/icons/starRed.svg";
import starGreen from "@/assets/icons/starGreen.svg";
import trophy from "@/assets/icons/trophy.svg";
import cardsHeart from "@/assets/icons/cardsHeart.svg";
import ratingStar from "@/assets/icons/ratingStar.svg";
import goldenHost from "@/assets/achievements/goldenHost.png";
import checkMarkGreen from "@/assets/icons/checkmaekBgGreen.svg";
import verified from "@/assets/achievements/blueVerify.png";
import userIconBlue from "@/assets/icons/users3.svg";
import users from "@/assets/icons/users.svg";

import userWhite from "@/assets/icons/user2.svg";
import pencil from "@/assets/icons/pencil.svg";
import crown2 from "@/assets/icons/crown2.svg";
import diamond2 from "@/assets/icons/diamondSharp.svg";










const achievementsData = [
  {
    id: 1,
    achievementsType: "Promotional",
    achievementsTypeIcon: sprout,
    achievements: [
      {
        id: 1,
        title: "Early Adopter",
        description: "Subscribe until 30/09!",
        borderColor: "#E6CEFF",
        bgColor: "#F6EDFF",
        icon: rocketIcon,
        titleColor: "#5837A4",
        descriptionColor: "#9333EA",
      },
    ],
  },
  {
    id: 2,
    achievementsType: "Loyalty",
    achievementsTypeIcon: crown,
    achievements: [
      {
        id: 1,
        title: "Traveler",
        description: "Purchased the base plan",
        borderColor: "#C5DFFF",
        bgColor: "#E3EFFE",
        icon: bag,
        titleColor: "#1E3A8A",
        descriptionColor: "#2563EB",
      },
      {
        id: 2,
        title: "Premium Traveler",
        description: "Purchased the base plan",
        borderColor: "#FFEC9D",
        bgColor: "#FEF7D9",
        icon: diamond,
        titleColor: "#78350F",
        descriptionColor: "#D97706",
      },
    ],
  },
  {
    id: 3,
    achievementsType: "Loyalty (Years Active)",
    achievementsTypeIcon: cardsHeart,
    achievements: [
      {
        id: 1,
        description: "  Year Active",
        borderColor: "#C5DFFF",
        bgColor: "#E3EFFE",
        descriptionColor: "#2563EB",
        cardType: "bgImage",
        bgImage: starBlue,
        bgTitle: 1,
      },
      {
        id: 2,
        description: "  Years Active",
        borderColor: "#E1D8FF",
        bgColor: "#F5F3FF",
        descriptionColor: "#8260F8",
        cardType: "bgImage",
        bgImage: starPurple,
        bgTitle: 2,
      },
      {
        id: 3,
        description: "  Years Active",
        borderColor: "#FFD3D3",
        bgColor: "#FEE9E9",
        descriptionColor: "#EB2525",
        cardType: "bgImage",
        bgImage: starRed,
        bgTitle: 4,
      },
      {
        id: 4,
        description: "  Years Active",
        borderColor: "#BDFFDB",
        bgColor: "#E3FFF0",
        descriptionColor: " #00C458",
        cardType: "bgImage",
        bgImage: starGreen,
        bgTitle: 4,
      },

      {
        id: 5,
        title: "Top Supporter",
        description: "4+ Years Active",
        borderColor: "#E6CEFF",
        bgColor: "#F6EDFF",
        icon: trophy,
        titleColor: "#5837A4",
        descriptionColor: "#9333EA",
      },
    ],
  },
  {
    id: 4,
    achievementsType: "Reviews",
    achievementsTypeIcon: ratingStar,
    achievements: [
      {
        id: 1,
        title: "Golden Host",
        description: "Received 100 reviews as a host",
        borderColor: "#FFEAA2",
        bgColor: "#FFF9E6",
        icon: goldenHost,
        titleColor: "#78350F",
        descriptionColor: "#E8BB20",
        cardType: "iconOnly",
      },
      {
        id: 2,
        title: "Golden Host",
        description: "Received 100 reviews as a host",
        borderColor: "#FFE0BC",
        bgColor: "#FFF4E6",
        icon: goldenHost,
        titleColor: "#78350F",
        descriptionColor: "#FF8800",
        cardType: "iconOnly",
      },
    ],
  },
  {
    id: 5,
    achievementsType: "Verification",
    achievementsTypeIcon: checkMarkGreen,
    achievements: [
      {
        id: 1,
        title: "Verified",
        description: "Verified user profile 100%.",
        borderColor: "#BDFFDB",
        bgColor: "#E3FFF0",
        icon: verified,
        titleColor: "#005710",
        descriptionColor: " #00C458",
        cardType: "iconOnly",
      },
    ],
  },
  {
    id: 3,
    achievementsType: "Referrals",
    achievementsTypeIcon: userIconBlue,
    achievements: [
      
      {
        id: 1,
        title: "Due",
        description: "Bring 1 person through referral",
        borderColor: "#C4ECFF",
        bgColor: "#E4F6FF",
        icon: userWhite,
        titleColor: "#063F5B",
        descriptionColor: "#33BDFF",
      },
      {
        id: 2,
        title: "Lots Of Friends",
        description: "Bring 3 people through referral",
        borderColor: "#FFC5DF",
        bgColor: "#FDEDF6",
        icon: users,
        titleColor: "#DB2777",
        descriptionColor: "#DB2777",
      },

      {
        id: 3,
        title: "Pure Charisma",
        description: "Bring 10 people through referral",
        borderColor: "#E6CEFF",
        bgColor: "#F6EDFF",
        icon: pencil,
        titleColor: "#5837A4",
        descriptionColor: "#9333EA",
      },
      {
        id: 4,
        title: "VIP",
        description: "Bring 50 people through referral",
        borderColor: "#FFEC9D",
        bgColor: "#FEF7D9",
        icon: crown2,
        titleColor: "#78350F",
        descriptionColor: "#D97706",
      },
      {
        id: 5,
        title: "Diamond VIP",
        description: "Bring 200 people (coming soon)",
        borderColor: "#D2D2D2",
        bgColor: "#EBEBEB",
        icon: diamond2,
        titleColor: "#2C2C2C",
        descriptionColor: "#505050",
      },
    ],
  },
];

export default achievementsData;
