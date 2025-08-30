// import CommonWrapper from "@/common/CommonWrapper";
// import DashboardAmenities from "@/components/dashboard/DashboardAmenities";
// import HomeType from "@/components/dashboard/HomeType";
// import PreviewHome from "@/components/dashboard/PreviewHome";
// import DashboardHomeDetails from "@/components/dashboard/DashboardHomeDetails";
// import { useState } from "react";
// import type { Amenity } from "@/lib/data/amenities";
// import AddPlaceHeading from "@/components/add-place/AddPlaceHeading";
// import { AddPlaceData } from "@/types";

const AddPlace = () => {
  // const [dashboardData, setDashboardData] = useState<AddPlaceData>({
  //  location: null,
  //   destination: null,
  //   homeType: null,
  //   residenceType: null,
  //   selectedAmenities: {
  //     main: [],
  //     transport: [],
  //     surrounding: [],
  //   },
  //   homeName: "",
  //   homeDescription: "",
  //   areaDescription: "",
  //   photos: [],
  //   availabilityType: null,
  //   availabilityDates: {
  //     start: null,
  //     end: null,
  //   },
  // });
  // const handleDataUpdate = (updates: Partial<AddPlaceData>) => {
  //   setDashboardData((prev) => ({ ...prev, ...updates }));
  // };

  // const handleSubmitData = async () => {
  //   try {
  //     console.log("Dashboard Data to send to backend:", dashboardData);
  //   } catch (error) {
  //     console.error("Error submitting property:", error);
  //     alert("Error submitting property. Please try again.");
  //   }
  // };

  return (
    <div>Add place</div>
    // <div className="">
    //   <CommonWrapper>
    //     <div className="p-6">
    //       <AddPlaceHeading onSubmit={handleSubmitData} />
    //       <PreviewHome
    //         location={dashboardData.location}
    //         destination={dashboardData.destination}
    //         onLocationChange={(location: { lat: number; lng: number } | null) =>
    //           handleDataUpdate({ location })
    //         }
    //         onDestinationChange={(
    //           destination: { lat: number; lng: number } | null
    //         ) => handleDataUpdate({ destination })}
    //       />
    //       <HomeType
    //         homeType={dashboardData.homeType}
    //         residenceType={dashboardData.residenceType}
    //         onHomeTypeChange={(homeType: "home" | "apartment") =>
    //           handleDataUpdate({ homeType })
    //         }
    //         onResidenceTypeChange={(residenceType: "main" | "occasional") =>
    //           handleDataUpdate({ residenceType })
    //         }
    //       />
    //       <DashboardAmenities
    //         selectedAmenities={dashboardData.selectedAmenities}
    //         onAmenitiesChange={(selectedAmenities: {
    //           main: Amenity[];
    //           transport: Amenity[];
    //           surrounding: Amenity[];
    //         }) => handleDataUpdate({ selectedAmenities })}
    //       />
    //       <DashboardHomeDetails
    //         homeName={dashboardData.homeName}
    //         homeDescription={dashboardData.homeDescription}
    //         areaDescription={dashboardData.areaDescription}
    //         photos={dashboardData.photos}
    //         availabilityType={dashboardData.availabilityType}
    //         onDataChange={handleDataUpdate}
    //         availabilityDates={dashboardData.availabilityDates}
    //         onAvailabilityChange={(availabilityDates) =>
    //           handleDataUpdate({ availabilityDates })
    //         }
    //       />
    //     </div>
    //   </CommonWrapper>
    // </div>
  );
};

export default AddPlace;
