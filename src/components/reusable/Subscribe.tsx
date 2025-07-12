import location from "@/assets/location.svg";
import phone from "@/assets/phone.svg";
import email from "@/assets/email.svg";
import ReusableButton from "./ReusableButton";

const Subscribe = () => {
  return (
    <div className="w-full h-auto min-h-[448px] md:h-[448px] relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-[url(/src/assets/subscribeBg.jpg)]"
        style={{
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center top 50%",
        }}
      ></div>

      {/* Overlay (#3174CD with 70% opacity) */}
      <div className="absolute inset-0 bg-[#3174CD] opacity-70 brightness-40"></div>

      {/* Content (positioned on top of overlay) */}
      <div className="w-full h-full backdrop-blur-[3px]">
        <div className="relative z-10 flex flex-col md:flex-row max-w-[1000px] h-full mx-auto items-center gap-12 px-4 py-10 md:py-0 md:px-0">
          <div className="text-white text-center md:text-left mb-8 md:mb-0">
            <h1 className="text-3xl sm:text-4xl lg:text-[64px] leading-tight">
              Start Your Journey with{" "}
              <span className="font-Grand-Hotel text-5xl lg:text-[96px]">
                Vacanza
              </span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl mt-6 lg:mt-10 max-w-[600px]">
              Join a global community and unlock unforgettable home exchange
              experiences—safely, simply, and affordably.
            </p>
          </div>

          {/* Contact & Newsletter Section */}
          <div className="flex flex-col gap-6 md:gap-10 text-white w-full md:w-auto">
            <div className="flex flex-col gap-2 font-extralight">
              <h1 className="text-xl font-bold">Contact Us</h1>
              <p className="flex items-center gap-2">
                <img src={location} alt="" className="w-4 h-4" />
                75835 Herta Walks, London
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

            {/* Newsletter Section */}
            <div className="w-full">
              <h1 className="text-lg md:text-[18px] font-[400]">
                Subscribe For Instant Updates
              </h1>
              <div className="relative mt-3">
                <input
                  type="text"
                  className="w-full md:w-[383px] h-[52px] px-5 bg-white bg-opacity-20 placeholder-white text-basic-dark rounded-full"
                  placeholder="Your email"
                />
                <ReusableButton className="w-full md:w-auto mt-4 md:mt-0 md:absolute md:top-1 md:right-[5px]">
                  Subscribe
                </ReusableButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
