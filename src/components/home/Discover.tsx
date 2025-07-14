import CommonWrapper from "@/common/CommonWrapper";
import ClientHeading from "../reusable/ClientHeading";
import discover from "@/assets/home/discover.mp4";
import playBtn from "@/assets/home/playButton.png";

const Discover = () => {
  return (
    <div className="px-4 pb-10 lg:pb-32">
      <CommonWrapper>
        <ClientHeading headingText="Discover with" spanText="vacanza" />
        <p className="text-lg md:text-xl lg:text-2xl text-dark-3 font-regular text-center max-w-4xl mx-auto mb-10">
          Watch our introductory video to learn more about how HomeExchange
          works and the amazing experiences awaiting you.
        </p>

        <div className="mt-9 relative">
          <video
            src={discover}
            className="w-full h-auto rounded-[40px]"
            autoPlay
            muted
            loop
            playsInline
            poster="/discover-poster.png"
          />

          {/* Play Button with Blur Background */}
          <div className="absolute -bottom-8 md:-bottom-10 lg:-bottom-12 left-1/2 transform -translate-x-1/2 p-4  md:p-6 rounded-full bg-black/20 backdrop-blur-xl z-10">
            <img src={playBtn} alt="Play" className=" w-8 h-8 md:w-10 md:h-10 lg:w-16 lg:h-16" />
          </div>
        </div>
      </CommonWrapper>
    </div>
  );
};

export default Discover;
