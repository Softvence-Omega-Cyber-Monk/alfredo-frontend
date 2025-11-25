import CommonWrapper from "@/common/CommonWrapper";
import HomeDetailsTabs from "../components/home-details/HomeDetailsTabs";
import { homeDetailsData } from "@/lib/data/homeDetails";
import OwnerInfo from "@/components/home-details/OwnerInfo";
import Testimonial from "@/components/reusable/Testimonial";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleProperty } from "@/store/Slices/PropertySlice/propertySlice";
import { OwnerDetails, PropertyDetails } from "@/types/PropertyDetails";
import Loader from "@/components/reusable/Loader";
import OwnerDetailsModal from "@/components/reusable/OwnerDetailsModal";

const HomeDetails = () => {
  const { callToAction } = homeDetailsData;
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { singleProperty } = useAppSelector((state) => state.property);
  const [isOwnerModalOpen, setIsOwnerModalOpen] = useState(false);

  // console.log("singleProperty", singleProperty);

  useEffect(() => {
    if (!id) return;
    dispatch(fetchSingleProperty(id));
  }, [id]);

  const handleViewOwnerDetails = () => {
    setIsOwnerModalOpen(true);
  };

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
              city={singleProperty?.location || ""}
              ownerDetails={singleProperty?.owner as OwnerDetails}
              callToAction={callToAction}
              isPremiumMember={true} // You can replace this with actual premium status
              onViewDetails={handleViewOwnerDetails}
            />
          </div>
        </div>
        <Testimonial />
      </CommonWrapper>

      {/* Owner Details Modal */}
      {singleProperty?.owner && (
        <OwnerDetailsModal
          isOpen={isOwnerModalOpen}
          onClose={() => setIsOwnerModalOpen(false)}
          ownerDetails={singleProperty.owner as OwnerDetails}
          city={singleProperty?.location}
        />
      )}
    </div>
  );
};

export default HomeDetails;
