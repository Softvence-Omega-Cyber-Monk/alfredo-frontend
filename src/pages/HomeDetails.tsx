import CommonWrapper from "@/common/CommonWrapper";
import HomeDetailsTabs from '../components/home-details/HomeDetailsTabs';
import { homeDetailsData } from '@/lib/data/homeDetails';
import PrimaryButton from "@/components/reusable/PrimaryButton";
import { Mail, MapPin } from "lucide-react";

const HomeDetails = () => {
  const { owner, callToAction } = homeDetailsData;

  return (
    <div className="mt-6 md:mt-10">
      <CommonWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-9 space-y-8">
            <HomeDetailsTabs data={homeDetailsData} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-3 p-6 border border-[#F4F7FC] rounded-lg md:rounded-3xl bg-white">
            {/* Owner Info */}
            <img
              src={owner.image}
              className="h-48 w-full object-cover object-top rounded-lg"
              alt={owner.name}
            />
            <div className="flex flex-col gap-4 pt-4 pb-6 border-b border-[#F4F7FC]">
              <h3 className="text-lg text-dark-2 font-semibold">
                {owner.name}
              </h3>
              <div className="flex items-center gap-1.5 text-dark-3 text-base">
                <Mail className="w-5 h-5 text-primary-blue" />
                <p>{owner.email}</p>
              </div>
              <div className="flex items-start justify-start gap-1.5 text-dark-3 text-base">
                <MapPin className="w-5 h-5 text-primary-blue" />
                <p>{owner.location}</p>
              </div>
            </div>

            {/* Achievement Badges */}
            <div className="border border-[#F4F7FC] rounded-lg my-6">
              <h2 className="bg-[#EAF1FA] text-dark-2 text-base font-regular px-2 py-1">
                Achievement Badges
              </h2>
              <div className="p-3">
                <div className="flex items-center gap-2">
                  {owner.badges.map((badge, index) => (
                    <div
                      key={index}
                      className={`${badge.color} p-2 rounded-full`}
                    >
                      <badge.icon className="text-white w-6 h-6" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Verifications */}
            <div className="flex flex-col gap-3 pb-6 border-b border-[#F4F7FC]">
              {owner.verifications.map((verification, index) => (
                <div key={index} className="flex items-center gap-1.5 text-dark-3 text-sm">
                  <div className={`p-1.5 rounded-full ${verification.bgColor} ${verification.iconColor}`}>
                    <verification.icon className="w-3 h-3" />
                  </div>
                  <p>{verification.text}</p>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="py-6">
              <h4 className="text-sm font-regular text-dark-2">
                {callToAction.message}
              </h4>
            </div>
            <PrimaryButton {...callToAction.button} />
          </div>
        </div>
      </CommonWrapper>
    </div>
  );
};

export default HomeDetails;
