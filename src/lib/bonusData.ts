import made from "../assets/bonus/made.png";
import earn from "../assets/bonus/earn.png";
import bonus from "../assets/bonus/bonus.png";
import { Card, InviteDataItem } from "@/types";

export const cardData: Card[] = [
  {
    title: "bonus.firstBonus.content",
    titleSub: "bonus.firstBonus.content1",
    amount: 12,
    bgColor: "#F6F3FF",
    borderColor: "#E7D4FF",
    color: "#8260F8",
    img: made,
  },
  {
    title: "bonus.secondBonus.content",
    titleSub: "bonus.secondBonus.content1",
    amount: 48,
    currency: "USD",
    bgColor: "#FFF2F4",
    borderColor: "#FFDBE1",
    color: "#FF2C49",
    img: earn,
  },
  {
    title: "bonus.thirdBonus.content",
    titleSub: "bonus.thirdBonus.content1",
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
    headTitle: "invite.firstBonus.title",
    points: ["invite.firstBonus.content", "invite.firstBonus.content1"],
  },
  {
    headTitle: "invite.secondBonus.title",
    points: ["invite.secondBonus.content", "invite.secondBonus.content1"],
  },
  {
    headTitle: "invite.thirdBonus.title",
    points: ["invite.thirdBonus.content", "invite.thirdBonus.content1"],
  },
  {
    headTitle: "invite.fourthBonus.title",
    points: [
      "invite.fourthBonus.content",
      "invite.fourthBonus.content1",
      "invite.fourthBonus.content2",
    ],
  },
];
