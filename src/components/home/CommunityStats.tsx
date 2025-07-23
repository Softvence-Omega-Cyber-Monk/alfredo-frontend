import CommonWrapper from "@/common/CommonWrapper";
import youngMan from "@/assets/man-young.jpg";
import oldMan from "@/assets/man-old.jpg";
import youngLady from "@/assets/young.jpg";
import oldLady from "@/assets/old.jpg";
import oldLady2 from "@/assets/oldLady2.jpg";
import oldLady3 from "@/assets/oldLady3.jpg";
import youngLady2 from "@/assets/youngLady2.jpg";

const CommunityStats = () => {
  return (
    <div className="border-b-3 border-[#EAF1FA] py-8 md:py-12 lg:py-16">
      <CommonWrapper>
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6 text-center text-dark-3 font-medium text-lg md:text-xl lg:text-2xl">
          <p>Join our community of</p>
          <div className="flex items-center gap-2 md:gap-10">
            {/* <img
              src={communityStatsImage}
              className="h-12 md:h-14 lg:h-16"
              alt=""
            /> */}
            <div className="flex items-center w-[162px] relative">
              <img
                src={youngLady2}
                alt=""
                className="w-[60px] h-[60px] absolute object-cover rounded-full border-white border-4"
              />
              <img
                src={oldMan}
                alt=""
                className="w-[60px] h-[60px] absolute left-[43px] object-cover rounded-full border-white border-4"
              />
              <img
                src={oldLady3}
                alt=""
                className="w-[60px] h-[60px] absolute left-[83px] object-cover rounded-full border-white border-4"
              />
              <img
                src={youngMan}
                alt=""
                className="w-[60px] h-[60px] absolute left-[125px] object-cover rounded-full border-white border-4"
              />
            </div>
            <h1 className="text-primary-blue text-3xl md:text-[36px] lg:text-[40px] font-semibold">
              6,500 +
            </h1>
          </div>
          <p>Happy Exchangers!</p>
        </div>
      </CommonWrapper>
    </div>
  );
};

export default CommunityStats;
