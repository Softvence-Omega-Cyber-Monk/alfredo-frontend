import CommonWrapper from "@/common/CommonWrapper";
import ClientHeading from "../reusable/ClientHeading";
import img1 from "@/assets/home/htwImg1.png";
import img2 from "@/assets/home/htwImg2.png";
import img3 from "@/assets/home/htwImg3.png";

import bg1 from "@/assets/home/htwBg1.svg";
import bg2 from "@/assets/home/htwBg2.svg";
import bg3 from "@/assets/home/htwBg3.svg";

import HowItWorksCard from "./HowItWorksCard";
import { useTranslation } from "react-i18next";

const HowItWorks = () => {
  const { t } = useTranslation("howItWorks");

  // Get translated card data
  const cardsData = [
    {
      mainImage: img1,
      backgroundImage: bg1,
      title: t("section.firstCard.title"),
      description: t("section.firstCard.para"),
      backgroundColor: "#FFF2F0",
      titleColor: "#E82F1A",
    },
    {
      mainImage: img2,
      backgroundImage: bg2,
      title: t("section.secondCard.title"),
      description: t("section.secondCard.para"),
      backgroundColor: "#F4F7FC",
      titleColor: "#3174CD",
    },
    {
      mainImage: img3,
      backgroundImage: bg3,
      title: t("section.thirdCard.title"),
      description: t("section.thirdCard.para"),
      backgroundColor: "#FFF8E6",
      titleColor: "#FFBA00",
    },
  ];

  return (
    <div className="py-12 md:py-16 lg:pt-25 lg:pb-[130px]">
      <CommonWrapper>
        <ClientHeading
          headingText={t("section.title")}
          spanText={t("section.highlight")}
        />
        <p className="text-lg md:text-xl lg:text-2xl text-dark-3 font-regular text-center max-w-3xl mx-auto mb-10">
          {t("section.para")}
        </p>

        {/* How it works Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
          {cardsData.map((card, index) => (
            <HowItWorksCard
              key={index}
              mainImage={card.mainImage}
              backgroundImage={card.backgroundImage}
              title={card.title}
              description={card.description}
              backgroundColor={card.backgroundColor}
              titleColor={card.titleColor}
            />
          ))}
        </div>
      </CommonWrapper>
    </div>
  );
};

export default HowItWorks;
