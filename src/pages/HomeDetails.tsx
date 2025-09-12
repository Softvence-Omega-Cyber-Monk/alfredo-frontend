import CommonWrapper from "@/common/CommonWrapper";
import HomeDetailsTabs from "../components/home-details/HomeDetailsTabs";
import { homeDetailsData } from "@/lib/data/homeDetails";
import OwnerInfo from "@/components/home-details/OwnerInfo";
import Testimonial from "@/components/reusable/Testimonial";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleProperty } from "@/store/Slices/PropertySlice/propertySlice";
import { OwnerDetails, PropertyDetails } from "@/types/PropertyDetails";
import Loader from "@/components/reusable/Loader";

const HomeDetails = () => {
  const { callToAction } = homeDetailsData;
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { singleProperty } = useAppSelector((state) => state.property);

  console.log("singleProperty", singleProperty);

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleProperty(id));
    }
  }, [id]);

  return (
    <div className="mt-6 md:mt-10">
      <CommonWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-9 space-y-8">
            {singleProperty ? (
              <HomeDetailsTabs
                data={homeDetailsData}
                singlePropertyData={singleProperty as PropertyDetails}
              />
            ) : (
              <Loader />
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-3">
            <OwnerInfo
              // owner={owner}
              ownerDetails={singleProperty?.owner as OwnerDetails}
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
