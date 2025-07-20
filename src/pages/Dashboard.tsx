import CommonWrapper from "@/common/CommonWrapper";
import DashboardAmenities from "@/components/dashboard/DashboardAmenities";
import DashboardHeading from "@/components/dashboard/DashboardHeading";
import HomeType from "@/components/dashboard/HomeType";
import PreviewHome from "@/components/dashboard/PreviewHome";
import DashboardHomeDetails from "@/components/dashboard/DashboardHomeDetails";
import { useState } from "react";
import type { Amenity } from "@/lib/data/amenities";
export interface DashboardData {
  // Location data
  location: {
    lat: number;
    lng: number;
  } | null;
  destination: {
    lat: number;
    lng: number;
  } | null;

  // Home type data
  homeType: "home" | "apartment" | null;
  residenceType: "main" | "occasional" | null;

  // Amenities data
  selectedAmenities: {
    main: Amenity[];
    transport: Amenity[];
    surrounding: Amenity[];
  };

  // Home details data
  homeName: string;
  homeDescription: string;
  areaDescription: string;
  photos: File[];
  availabilityType: "home" | "apartment" | null;
}

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    location: null,
    destination: null,
    homeType: null,
    residenceType: null,
    selectedAmenities: {
      main: [],
      transport: [],
      surrounding: [],
    },
    homeName: "",
    homeDescription: "",
    areaDescription: "",
    photos: [],
    availabilityType: null,
  });

  const handleDataUpdate = (updates: Partial<DashboardData>) => {
    setDashboardData((prev) => ({ ...prev, ...updates }));
  };

  const handleSubmitData = async () => {
    try {
      console.log("Dashboard Data to send to backend:", dashboardData);
    } catch (error) {
      console.error("Error submitting property:", error);
      alert("Error submitting property. Please try again.");
    }
  };

  return (
    <div className="">
      <CommonWrapper>
        <div className="p-6">
          <DashboardHeading onSubmit={handleSubmitData}/>
          <PreviewHome
            location={dashboardData.location}
            destination={dashboardData.destination}
            onLocationChange={(location: { lat: number; lng: number } | null) =>
              handleDataUpdate({ location })
            }
            onDestinationChange={(
              destination: { lat: number; lng: number } | null
            ) => handleDataUpdate({ destination })}
          />
          <HomeType
            homeType={dashboardData.homeType}
            residenceType={dashboardData.residenceType}
            onHomeTypeChange={(homeType: "home" | "apartment") =>
              handleDataUpdate({ homeType })
            }
            onResidenceTypeChange={(residenceType: "main" | "occasional") =>
              handleDataUpdate({ residenceType })
            }
          />
          <DashboardAmenities
            selectedAmenities={dashboardData.selectedAmenities}
            onAmenitiesChange={(selectedAmenities: {
              main: Amenity[];
              transport: Amenity[];
              surrounding: Amenity[];
            }) => handleDataUpdate({ selectedAmenities })}
          />
          <DashboardHomeDetails
            homeName={dashboardData.homeName}
            homeDescription={dashboardData.homeDescription}
            areaDescription={dashboardData.areaDescription}
            photos={dashboardData.photos}
            availabilityType={dashboardData.availabilityType}
            onDataChange={handleDataUpdate}
          />
        </div>
      </CommonWrapper>
    </div>
  );
};

export default Dashboard;
