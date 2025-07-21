import CommonWrapper from "@/common/CommonWrapper";
import HomeDetailsTabs from "../components/home-details/HomeDetailsTabs";
import { homeDetailsData } from "@/lib/data/homeDetails";
import OwnerInfo from "@/components/home-details/OwnerInfo";
import Testimonial from "@/components/reusable/Testimonial";

const HomeDetails = () => {
  const { owner, callToAction } = homeDetailsData;

  return (
    <div className="mt-6 md:mt-10">
      <CommonWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">achievementsData
          <div className="lg:col-span-9 space-y-8">
            <HomeDetailsTabs data={homeDetailsData} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-3">
            <OwnerInfo
              owner={owner}
              callToAction={callToAction}
              isPremiumMember={true} // You can replace this with actual premium status from your auth context or state
              onSubscribeClick={() => {
                // Add your subscription handling logic here
                console.log("Navigate to subscription page");
              }}
            />
          </div>
        </div>
          <Testimonial />
      </CommonWrapper>
    </div>
  );
};

export default HomeDetails;
