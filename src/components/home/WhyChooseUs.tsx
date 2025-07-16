import ClientHeading from "../reusable/ClientHeading";
import CommonWrapper from "@/common/CommonWrapper";
import img from "@/assets/home/wcuImg.jpg";
import time from "@/assets/home/time.png";
import home from "@/assets/home/home.png";
import lock from "@/assets/home/lock.svg";

const cardData = [
  {
    img: lock,
    title: "Secure & Verified",
    description:
      "Enjoy peace of mind with our robust verification process and secure platform",
  },
  {
    img: time,
    title: "24/7 Dedicated Support",
    description:
      "Enjoy peace of mind with our robust verification process and secure platform",
  },
  {
    img: home,
    title: "Flexible & Rewarding",
    description:
      "Customize your exchanges and earn bonuses and badges for seamless travel.",
  },
];

const WhyChooseUs = () => {
  return (
    <div className="pb-10 lg:pb-32">
      <CommonWrapper>
        <ClientHeading headingText="Why choose" spanText="us?" />
        <p className="text-lg md:text-xl lg:text-2xl text-dark-3 font-regular text-center my-6 max-w-3xl mx-auto mb-10">
          Trusted, flexible, and secure home exchanges—so you can travel
          comfortably and confidently.
        </p>

        <div className="mt-9 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-12 gap-6 items-center">
            <div className="xl:col-span-7 rounded-[40px] overflow-hidden shadow-[0_30px_40px_-6px_rgba(59,130,246,0.5)]">
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
                        {card.title}
                      </h3>
                    </div>
                    <p className="text-dark-3 font-normal text-sm sm:text-base mt-2 md:mt-4">
                      {card.description}
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
