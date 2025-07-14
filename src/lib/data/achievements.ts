import promotionalImage from "@/assets/achievements/promotional.png";
import rocketIcon from "@/assets/icons/rocket.svg";
import bag from "@/assets/icons/bag.svg";
import crown from "@/assets/icons/crown.svg";
import sprout from "@/assets/icons/sprout.svg";
import diamond from "@/assets/icons/diamond.svg";
import starBlue from "@/assets/icons/starBlue.svg";
import starPurple from "@/assets/icons/starPurple.svg";
import trophy from "@/assets/icons/trophy.svg";
import starRed from "@/assets/icons/starRed.svg";
import cardsHeart from "@/assets/icons/cardsHeart.svg";
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
        bgTitle: 3,
      },

      {
        id: 4,
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
    achievementsType: "Expert",
    achievementsTypeIcon: promotionalImage,
    achievements: [
      {
        id: 1,
        title: "Mastermind",
        description: "Finish 50 tasks",
        borderColor: "#FFAB91",
        bgColor: "#FBE9E7",
        icon: promotionalImage,
        titleColor: "#333333",
        descriptionColor: "#666666",
      },
      {
        id: 2,
        title: "Community Helper",
        description: "Answer 10 community questions",
        borderColor: "#CE93D8",
        bgColor: "#F3E5F5",
        icon: promotionalImage,
        titleColor: "#333333",
        descriptionColor: "#666666",
      },
      {
        id: 3,
        title: "Elite Streak",
        description: "Log in 30 days in a row",
        borderColor: "#A5D6A7",
        bgColor: "#E8F5E9",
        icon: promotionalImage,
        titleColor: "#333333",
        descriptionColor: "#666666",
      },
      {
        id: 4,
        title: "Project Pro",
        description: "Complete 5 full projects",
        borderColor: "#90CAF9",
        bgColor: "#E3F2FD",
        icon: promotionalImage,
        titleColor: "#333333",
        descriptionColor: "#666666",
      },
    ],
  },
  {
    id: 5,
    achievementsType: "Legend",
    achievementsTypeIcon: promotionalImage,
    achievements: [
      {
        id: 1,
        title: "Living Legend",
        description: "Reach 100 completed tasks",
        borderColor: "#FFD700",
        bgColor: "#FFF9C4",
        icon: promotionalImage,
        titleColor: "#333333",
        descriptionColor: "#666666",
      },
      {
        id: 2,
        title: "Mentor",
        description: "Help 10 new users onboard",
        borderColor: "#B2EBF2",
        bgColor: "#E0F7FA",
        icon: promotionalImage,
        titleColor: "#333333",
        descriptionColor: "#666666",
      },
      {
        id: 3,
        title: "Legacy Builder",
        description: "Be active for 90+ days",
        borderColor: "#FFCDD2",
        bgColor: "#FFEBEE",
        icon: promotionalImage,
        titleColor: "#333333",
        descriptionColor: "#666666",
      },
      {
        id: 4,
        title: "Top Contributor",
        description: "Contribute to 20 discussions",
        borderColor: "#C8E6C9",
        bgColor: "#F1F8E9",
        icon: promotionalImage,
        titleColor: "#333333",
        descriptionColor: "#666666",
      },
      {
        id: 5,
        title: "Hall of Fame",
        description: "Earn all other badges",
        borderColor: "#D1C4E9",
        bgColor: "#EDE7F6",
        icon: promotionalImage,
        titleColor: "#333333",
        descriptionColor: "#666666",
      },
    ],
  },
];

export default achievementsData;
