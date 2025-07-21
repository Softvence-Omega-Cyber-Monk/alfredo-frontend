import bag from "@/assets/icons/bag.svg";
import crown from "@/assets/icons/crown.svg";
import sprout from "@/assets/icons/sprout.svg";
import diamond from "@/assets/icons/diamond.svg";
import trophy from "@/assets/icons/trophy.svg";
import cardsHeart from "@/assets/icons/cardsHeart.svg";
import ratingStar from "@/assets/icons/ratingStar.svg";
import goldenHost from "@/assets/achievements/goldenHost.png";
import checkMarkGreen from "@/assets/icons/checkmaekBgGreen.svg";
import verified from "@/assets/achievements/blueVerify.png";
import userIconBlue from "@/assets/icons/users3.svg";
import diamond2 from "@/assets/icons/diamondSharp.svg";
import seasons from "@/assets/icons/exchange-alt.svg";
import autumn from "@/assets/achievements/seasons-based/autumn traveler.png";
import winter from "@/assets/achievements/seasons-based/winter traveler.png";
import spring from "@/assets/achievements/seasons-based/spring traveler.png";
import summer from "@/assets/achievements/seasons-based/summer traveler.png";
import explorer from "@/assets/achievements/seasons-based/explorer.png";
import sustainability from "@/assets/achievements/sustainability/ecofriendly.png";
import premimumTraveler from "@/assets/achievements/loyalty/PremiumTraveler (2 years).png";
import twoyears from "@/assets/achievements/loyalty/supporter (2 years).png";
import oneyears from "@/assets/achievements/loyalty/traveler (1 year).png";
import earlyAdopter from "@/assets/achievements/loyalty/early adopter.png";
import duo from "@/assets/achievements/referrals/duo.png";
import lotsOfFriends from "@/assets/achievements/referrals/lots of friends.png";
import pureCharisma from "@/assets/achievements/referrals/pure charisma.png";
import diamondVipa from "@/assets/achievements/referrals/vip.png";


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
        icon: earlyAdopter,
        titleColor: "#5837A4",
        descriptionColor: "#9333EA",
        cardType: "iconOnly" as const,
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
        id: 5,
        title: "Top Supporter",
        description: "4+ Years Active",
        borderColor: "#E6CEFF",
        bgColor: "#F6EDFF",
        icon: trophy,
        titleColor: "#5837A4",
        descriptionColor: "#9333EA",
      },

      {
        id: 2,
        title: "Premium Traveler",
        description: "Received 100 reviews as a host",
         borderColor: "#FFEC9D",
        bgColor: "#FEF7D9",
        icon: premimumTraveler,
        titleColor: "#78350F",
        descriptionColor: "#D97706",
        cardType: "iconOnly" as const,
      },
      {
        id: 2,
        title: "One Year Traveler",
        description: "1 year active",
        borderColor: "#C5DFFF",
        bgColor: "#E3EFFE",
        descriptionColor: "#2563EB",
        icon: oneyears,
        titleColor: "#063F5B",

        cardType: "iconOnly" as const,
      },
      {
        id: 2,
        title: "Two Year Traveler",
        description: "2 years active",
        borderColor: "#E1D8FF",
        bgColor: "#F5F3FF",
        descriptionColor: "#8260F8",
        icon: twoyears,
        titleColor: "#5837A4",
        cardType: "iconOnly" as const,
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
        cardType: "iconOnly" as const,
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
        cardType: "iconOnly" as const,
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
        cardType: "iconOnly" as const,
      },
    ],
  },
  {
    id: 6,
    achievementsType: "Referrals",
    achievementsTypeIcon: userIconBlue,
    achievements: [
      {
        id: 1,
        title: "Due",
        description: "Bring 1 person through referral",
        borderColor: "#C4ECFF",
        bgColor: "#E4F6FF",
        icon: duo,
        titleColor: "#063F5B",
        descriptionColor: "#33BDFF",
        cardType: "iconOnly" as const,
      },
      {
        id: 2,
        title: "Lots Of Friends",
        description: "Bring 3 people through referral",
        borderColor: "#FFC5DF",
        bgColor: "#FDEDF6",
        icon: lotsOfFriends,
        titleColor: "#DB2777",
        descriptionColor: "#DB2777",
        cardType: "iconOnly" as const,
      },

      {
        id: 3,
        title: "Pure Charisma",
        description: "Bring 10 people through referral",
        borderColor: "#E6CEFF",
        bgColor: "#F6EDFF",
        icon: pureCharisma,
        titleColor: "#5837A4",
        descriptionColor: "#9333EA",
        cardType: "iconOnly" as const,
      },
      {
        id: 4,
        title: "VIP",
        description: "Bring 50 people through referral",
        borderColor: "#FFEC9D",
        bgColor: "#FEF7D9",
        icon: diamondVipa,
        titleColor: "#78350F",
        descriptionColor: "#D97706",
        cardType: "iconOnly" as const,
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
  {
    id: 7,
    achievementsType: "Season-based",
    achievementsTypeIcon: seasons,
    achievements: [
      {
        id: 1,
        title: "Explorer",
        description: "Travel in all seasons at least once!",
        borderColor: "#FFEAA2",
        bgColor: "#FFF9E6",
        icon: explorer,
        titleColor: "#78350F",
        descriptionColor: "#E8BB20",
        cardType: "iconOnly" as const,
      },
      {
        id: 2,
        title: "Autumn Traveler",
        description: "Travel in autumn at least once!",
        borderColor: "#FFE0BC",
        bgColor: "#FFF4E6",
        icon: autumn,
        titleColor: "#78350F",
        descriptionColor: "#FF8800",
        cardType: "iconOnly" as const,
      },
      {
        id: 3,
        title: "Winter Traveler",
        description: "1 exchange completed during winter.",
        borderColor: "#E8E8E8",
        bgColor: "#F3F3F3",
        icon: winter,
        titleColor: "#666666",
        descriptionColor: "#666666",
        cardType: "iconOnly" as const,
      },
      {
        id: 4,
        title: "Spring Traveler",
        description: "1 exchange completed during spring.",
        borderColor: "#FFE0BC",
        bgColor: "#FFF4E6",
        icon: spring,
        titleColor: "#78350F",
        descriptionColor: "#FF8800",
        cardType: "iconOnly" as const,
      },
      {
        id: 5,
        title: "Summer Traveler",
        description: "1 exchange completed during summer.",
        borderColor: "#EBF8FF",
        bgColor: "#EBF8FF",
        icon: summer,
        titleColor: "#032A4B",
        descriptionColor: "#227FBB",
        cardType: "iconOnly" as const,
      },
    ],
  },
  {
    id: 8,
    achievementsType: "Sustainability",
    achievementsTypeIcon: sustainability,
    achievements: [
      {
        id: 1,
        title: "Eco-Conscious Host",
        description:
          "Add a house with solar panels, heat pump or other eco-friendly systems.",
        borderColor: "#9BFF70",
        bgColor: "#EBFFE3",
        icon: sustainability,
        titleColor: "#1D6100",
        descriptionColor: "#4DC619",
        cardType: "iconOnly" as const,
      },
    ],
  },
];

export default achievementsData;
