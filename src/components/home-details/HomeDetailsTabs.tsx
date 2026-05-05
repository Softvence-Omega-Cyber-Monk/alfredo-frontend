import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HomeTitle from "./HomeTitle";
import Photos from "./Photos";
import Description from "./Description";
import Amenities from "./Amenities";
import Map from "./Map";
import AccordionComponent from "../reusable/AccordionComponent";
import { HomeDetailsType } from "@/lib/data/homeDetails.ts";
import { bonus } from "@/lib/AccordionData/accordionData";
import { PropertyDetails } from "@/types/PropertyDetails";
import Reviews from "./Reviews";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

const HomeDetailsTabs = ({
  singlePropertyData,
}: {
  data: HomeDetailsType;
  singlePropertyData: PropertyDetails;
}) => {
  // console.log(singlePropertyData, "dddddddd");
  const { id } = useParams();
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const { t } = useTranslation("homeDetails");

  // Check if user is subscribed
  const isSubscribed = user?.isSubscribed || false;

  // State for location coordinates
  const [locationCoordinates, setLocationCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const [isLoadingLocation, setIsLoadingLocation] = useState(true);

  // Geocode location string to coordinates
  useEffect(() => {
    const geocodeLocation = async () => {
      setIsLoadingLocation(true);

      // Build location query from API data (NOT from data.location)
      const locationParts = [];
      if (singlePropertyData.location) {
        locationParts.push(singlePropertyData.location);
      }
      if (singlePropertyData.country) {
        locationParts.push(singlePropertyData.country);
      }

      const locationString = locationParts.join(", ");

      if (!locationString) {
        console.warn("No location data available");
        setIsLoadingLocation(false);
        return;
      }

      try {
        // Using Nominatim (OpenStreetMap) - free and no API key required
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            locationString
          )}&limit=1&addressdetails=1`,
          {
            headers: {
              "User-Agent": "HomeExchangeApp/1.0",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Geocoding API error: ${response.status}`);
        }

        const geocodeData = await response.json();

        if (geocodeData && geocodeData.length > 0) {
          const coordinates = {
            lat: parseFloat(geocodeData[0].lat),
            lng: parseFloat(geocodeData[0].lon),
          };

          // console.log(" Setting coordinates:", coordinates);
          setLocationCoordinates(coordinates);
        } else {
          console.warn(" No geocoding results found for:", locationString);
          // Set fallback coordinates
          setLocationCoordinates({ lat: 37.9838, lng: 23.7275 }); // Athens, Greece as fallback
        }
      } catch (error) {
        console.error(" Geocoding failed:", error);
        // Set fallback coordinates
        setLocationCoordinates({ lat: 37.9838, lng: 23.7275 }); // Athens, Greece as fallback
      } finally {
        setIsLoadingLocation(false);
      }
    };

    // Only geocode if we have property data
    if (singlePropertyData?.location || singlePropertyData?.country) {
      geocodeLocation();
    } else {
      setIsLoadingLocation(false);
    }
  }, [singlePropertyData?.location, singlePropertyData?.country]);

  // Transform API data for the components
  const transformedAmenities = {
    main:
      singlePropertyData.amenities?.map((amenity) => ({
        icon: amenity.icon,
        title: amenity.name,
        greek_name: (amenity as any).greek_name || amenity.name,
      })) || [],
    transport:
      singlePropertyData.transports?.map((transport) => ({
        icon: transport.icon,
        title: transport.name,
        greek_name: (transport as any).greek_name || transport.name,
      })) || [],
    surrounding:
      singlePropertyData.surroundings?.map((surrounding) => ({
        icon: surrounding.icon,
        title: surrounding.name,
        greek_name: (surrounding as any).greek_name || surrounding.name,
      })) || [],
  };

  const transformedPhotos =
    singlePropertyData.images
      ? [...singlePropertyData.images]
          .sort((a, b) => {
            if (a.url === singlePropertyData.coverImage) return -1;
            if (b.url === singlePropertyData.coverImage) return 1;
            return 0;
          })
          .map((image) => ({
            src: image.url,
            alt: singlePropertyData.title,
          }))
      : [];

  const tabsData = [
    {
      id: "Photos",
      label: t("photos"),
      content: (
        <div className="space-y-6">
          <Photos photos={transformedPhotos} />
          <Description
            dates={{
              from: singlePropertyData.availabilityStartDate
                ? new Date(
                  singlePropertyData.availabilityStartDate
                ).toLocaleDateString()
                : "N/A",
              to: singlePropertyData.availabilityEndDate
                ? new Date(
                  singlePropertyData.availabilityEndDate
                ).toLocaleDateString()
                : "N/A",
            }}
            description={singlePropertyData.description}
          />
          <Amenities amenities={transformedAmenities} />
          <div className="mb-6 md:mb-20">
            {isLoadingLocation && (
              <div className="w-full h-[526px] rounded-2xl border border-[#BFD4F0] flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue mx-auto mb-4"></div>
                  <p className="text-gray-500">Loading map...</p>
                </div>
              </div>
            )}
            {!isLoadingLocation && locationCoordinates && (
              <Map location={locationCoordinates} isLoggedIn={isSubscribed} />
            )}
          </div>
          {/* <AccordionComponent items={bonus} /> */}
        </div>
      ),
    },
    {
      id: "Description",
      label: t("description"),
      content: (
        <Description
          dates={{
            from: singlePropertyData.availabilityStartDate
              ? new Date(
                singlePropertyData.availabilityStartDate
              ).toLocaleDateString()
              : "N/A",
            to: singlePropertyData.availabilityEndDate
              ? new Date(
                singlePropertyData.availabilityEndDate
              ).toLocaleDateString()
              : "N/A",
          }}
          description={singlePropertyData.description}
        />
      ),
    },
    {
      id: "Amenities",
      label: t("amenities"),
      content: <Amenities amenities={transformedAmenities} />,
    },
    {
      id: "Map",
      label: t("map"),
      content: isLoadingLocation ? (
        <div className="w-full h-[526px] rounded-2xl border border-[#BFD4F0] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue mx-auto mb-4"></div>
            <p className="text-gray-500">Loading map...</p>
          </div>
        </div>
      ) : locationCoordinates ? (
        <Map location={locationCoordinates} isLoggedIn={isSubscribed} />
      ) : (
        <div className="w-full h-[526px] rounded-2xl border border-[#BFD4F0] flex items-center justify-center">
          <p className="text-gray-500">Location not available</p>
        </div>
      ),
    },
    {
      id: "FAQ",
      label: t("faq"),
      content: <AccordionComponent items={bonus} />,
    },
    {
      id: "Reviews",
      label: t("reviews"),
      content: (
        <Reviews
          reviews={singlePropertyData.Review || []}
          propertyId={id || ""}
          isOwner={user?.id === singlePropertyData?.owner?.id}
          userId={user?.id}
          isExchanged={singlePropertyData?.isExchanged}
        />
      ),
    },
  ];

  return (
    <>
      <Tabs defaultValue="Photos" className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 rounded-none mb-6 lg:mb-0">
          {tabsData.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="text-dark-3 text-sm md:text-base font-normal rounded-none lg:text-lg 
                  data-[state=active]:shadow-none data-[state=active]:border-t-0 
                  data-[state=active]:text-primary-blue data-[state=active]:bg-[#F4F7FC] 
                  data-[state=active]:rounded-none data-[state=active]:font-semibold 
                  data-[state=active]:border-b-2 border-b-2 
                  data-[state=active]:border-b-primary-blue border-b-dark-3/25"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="mt-6 md:mt-10">
          <HomeTitle
            owner={singlePropertyData.owner}
            title={singlePropertyData.title}
            features={{
              rooms: singlePropertyData.bedrooms,
              beds: singlePropertyData.bedrooms,
              baths: singlePropertyData.bathrooms,
              area: singlePropertyData.size,
            }}
            singlePropertyData={singlePropertyData}
          />
        </div>

        {tabsData.map((tab) => (
          <TabsContent key={tab.id} value={tab.id}>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
};

export default HomeDetailsTabs;
