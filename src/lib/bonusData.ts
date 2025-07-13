import made from "../assets/bonus/made.png";
import earn from "../assets/bonus/earn.png";
import bonus from "../assets/bonus/bonus.png";
import { Card, InviteDataItem } from "@/types";

export const cardData: Card[] = [
    {
        title: "Total referrals",
        titleSub: "made",
        amount: 12,
        bgColor: "#F6F3FF",
        borderColor: "#E7D4FF",
        color: "#8260F8",
        img: made,
    },
    {
        title: "Total bonuses",
        titleSub: "earned",
        amount: 48,
        currency: "USD",
        bgColor: "#FFF2F4",
        borderColor: "#FFDBE1",
        color: "#FF2C49",
        img: earn,
    },
    {
        title: "Pending",
        titleSub: "bonuses",
        amount: 34,
        currency: "USD",
        bgColor: "#FFF6E6",
        borderColor: "#FFEDC4",
        color: "#FFAA00",
        img: bonus,
    },
];

export const inviteData: InviteDataItem[] = [
  {
    headTitle: "Invite 1 Person",
    points: [
      "DUO badge",
      "20% coupon off another year subscription",
    ],
  },
  {
    headTitle: "Invite 3 Persons",
    points: [
      "1 free month of featured listings x1",
      "LOTS OF FRIENDS badge",
      "20% Coupon off Another year Subscription",
    ],
  },
  {
    headTitle: "Invite 10 Persons",
    points: [
      "Free plane or ferry ticket to surprise destination, offered by Vacanza",
      "1 free month of featured listings x3",
      "PURE CHARISMA badge",
    ],
  },
  {
    headTitle: "Invite 50 Persons",
    points: [
      "Free plane or ferry ticket to luxury destination + car included, offered by Vacanza",
      "5 free months of featured listings x10",
      "VIP badge",
      "50% off Another year Subscription",
    ],
  },
];