import React from "react";
import articleImage from "@/assets/articleImg.png";
import testimonailPerson from "@/assets/testimonailPerson.jpg";
const TopArticle = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 relative">
      <div className="absolute top-6 left-6">
        <p className=" bg-[#001C4233] bg-blur-[8px] border border-[#F4F7FC] px-4 py-2 rounded-lg text-white">
          Latest Article
        </p>
      </div>
      <div className="lg:col-span-5 rounded-3xl overflow-hidden">
        <img src={articleImage} className="w-full" alt="" />
      </div>
      <div className="lg:col-span-7 flex flex-col gap-8 lg:gap-4 justify-between text-dark-3">
        <div>
          <p className="text-sm lg:text-base font-normal mb-3">
            Last Update: 20-June-2024
          </p>
          <h2 className="text-2xl lg:text-[32px] font-medium mb-4 text-primary-blue line-clamp-2">
            Vacanza 101: How to travel without paying for accommodation
          </h2>
          <p className="text-xl lg:text-2xl font-normal mb-3 line-clamp-8">
            Vacanza is the first greek platform that brings to Greece
            exclusively the home exchange model. It has been proved to be very
            successful in other countries of Europe mainly for traveling without
            paying for accommodation, but also for forming bonds with new
            people. It is an alternative to the ordinary booking sites in which
            you pay your money for accommodation, and you don't know the other
            person and the current situation of the house before traveling.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <img
            src={testimonailPerson}
            className="w-12 h-12 rounded-full object-cover object-center"
            alt="Author Avatar"
          />
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-bold text-primary-blue">
              Mr. Jhon Don
            </h3>
            <p className="text-sm font-normal">Manager of IT</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopArticle;
