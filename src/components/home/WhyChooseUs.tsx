import ClientHeading from "../reusable/ClientHeading";
import CommonWrapper from "@/common/CommonWrapper";
import img from "@/assets/why-choose-us-banner.jpg";
import time from "@/assets/home/time.png";
import home from "@/assets/home/home.png";
import lock from "@/assets/home/lock.svg";
import { useTranslation } from "react-i18next";

const cardData = [
  {
    img: lock,
    title: "firstCard.title",
    description: "firstCard.para",
  },
  {
    img: time,
    title: "secondCard.title",
    description: "secondCard.para",
  },
  {
    img: home,
    title: "thirdCard.title",
    description: "thirdCard.para",
  },
];

const WhyChooseUs = () => {
  const { t } = useTranslation("choose");
  return (
    <div className="pb-10 lg:pb-32">
      <CommonWrapper>
        <ClientHeading headingText={t("title")} spanText={t("highlight")} />
        <p className="text-lg md:text-xl lg:text-2xl text-dark-3 font-regular text-center my-6 max-w-3xl mx-auto mb-10">
          {t("para")}
        </p>

        <div className="mt-9 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-12 gap-6 items-center">
            <div className="xl:col-span-7 rounded-[40px] overflow-hidden md:shadow-[0_30px_40px_-6px_rgba(59,130,246,0.5)] lg:shadow-[0_30px_40px_-6px_rgba(59,130,246,0.5)]">
              <img src={img} className="w-full" alt="" />
            </div>
            <div
              className="xl:col-span-5 h-full rounded-[40px] p-6"
              style={{
                backgroundImage: `url("/footerBg.svg")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="bg-white rounded-[24px] p-6 h-full flex flex-col gap-6  md:gap-10">
                {cardData.map((card, index) => (
                  <div key={index}>
                    <div className="flex gap-4">
                      <img
                        src={card.img}
                        alt={card.title}
                        className="w-7 h-7"
                      />
                      <h3 className="font-semibold text-lg md:text-xl lg:text-2xl text-primary-blue">
                        {t(card.title)}
                      </h3>
                    </div>
                    <p className="text-dark-3 font-normal text-sm sm:text-base mt-2 md:mt-4">
                      {t(card.description)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CommonWrapper>
    </div>
  );
};

export default WhyChooseUs;
