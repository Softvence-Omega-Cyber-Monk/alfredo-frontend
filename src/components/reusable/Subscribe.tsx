import location from "@/assets/location.svg";
import phone from "@/assets/phone.svg";
import email from "@/assets/email.svg";
import ReusableButton from "./ReusableButton";
import { useTranslation } from "react-i18next";
import { Parallax } from "react-parallax";
import subscribeBg from "@/assets/subscribeBg.jpg";

const Subscribe = () => {
  const { t } = useTranslation("subscribe");

  return (
    <Parallax
      bgImage={subscribeBg}
      strength={300}
      bgImageStyle={{
        objectFit: "cover",
        filter: "brightness(0.5)",
        height: "120vh",
        width: "100%",
      }}
    >
      <div className="relative min-h-[448px] md:h-[448px] w-full flex items-center">
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#3174CD] opacity-70 brightness-40"></div>

        {/* Content */}
        <div className="relative z-10 w-full h-full backdrop-blur-[3px]">
          <div className="flex flex-col md:flex-row max-w-[1000px] h-full mx-auto items-center gap-12 px-4 py-10 md:py-0">
            {/* Left text */}
            <div className="text-white text-center md:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-[64px] leading-tight">
                {t("title")}{" "}
                <span className="font-Grand-Hotel text-5xl lg:text-[96px]">
                  {t("highlight")}
                </span>
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl mt-6 lg:mt-10 max-w-[600px]">
                {t("para")}
              </p>
            </div>

            {/* Right contact + newsletter */}
            <div className="flex flex-col gap-6 md:gap-10 text-white w-full md:w-auto">
              <div className="flex flex-col gap-2 font-extralight">
                <h1 className="text-xl font-bold">{t("contact")}</h1>
                <p className="flex items-center gap-2">
                  <img src={location} alt="" className="w-4 h-4" />
                  758/2 Athens, Greece
                </p>
                <p className="flex items-center gap-2">
                  <img src={phone} alt="" className="w-4 h-4" />
                  +888 8888 8888
                </p>
                <p className="flex items-center gap-2">
                  <img src={email} alt="" className="w-4 h-4" />
                  alfredo@business.com
                </p>
              </div>

              {/* Newsletter */}
              <div className="w-full">
                <h1 className="text-lg md:text-[18px] font-[400]">
                  {t("subscribe")}
                </h1>
                <div className="relative mt-3">
                  <input
                    type="text"
                    className="w-full md:w-[383px] h-[52px] px-5 bg-white bg-opacity-20 placeholder-white text-basic-dark rounded-full"
                    placeholder="Your email"
                  />
                  <ReusableButton className="w-full md:w-auto mt-4 md:mt-0 md:absolute md:top-1 md:right-[5px]">
                    {t("subscribeBtn")}
                  </ReusableButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Parallax>
  );
};

export default Subscribe;
