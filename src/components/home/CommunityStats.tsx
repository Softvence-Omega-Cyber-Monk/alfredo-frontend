import React from "react";
import CommonWrapper from "@/common/CommonWrapper";
import communityStatsImage from "@/assets/home/happyUser.png";

const CommunityStats = () => {
  return (
    <div className="border-b-3 border-[#EAF1FA] py-8 md:py-12 lg:py-16">
      <CommonWrapper>
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6 text-center text-dark-3 font-medium text-lg md:text-xl lg:text-2xl">
          <p>Join our community of</p>
          <div className="flex items-center gap-2 md:gap-3">
            <img
              src={communityStatsImage}
              className="h-12 md:h-14 lg:h-16"
              alt=""
            />
            <h2 className="text-primary-blue text-3xl md:text-[36px] lg:text-[40px] font-semibold">
              6,500 +
            </h2>
          </div>
          <p>Happy Exchangers!</p>
        </div>
      </CommonWrapper>
    </div>
  );
};

export default CommunityStats;
