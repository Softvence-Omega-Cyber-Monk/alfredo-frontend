import made from "../assets/bonus/made.png";
// import earn from "../assets/bonus/earn.png";
// import bonus from "../assets/bonus/bonus.png";
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
