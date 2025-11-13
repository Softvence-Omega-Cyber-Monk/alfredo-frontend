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
import Reviews from "./Reviews"; // You'll need to create this component
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HomeDetailsTabs = ({
  data,
  singlePropertyData,
}: {
  data: HomeDetailsType;
  singlePropertyData: PropertyDetails;
}) => {
  console.log(singlePropertyData, "dddddddd");
  const { id } = useParams();
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const { t } = useTranslation("homeDetails");
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
    singlePropertyData.images?.map((image) => ({
      src: image.url,
      alt: singlePropertyData.title,
    })) || [];

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
            <Map location={data.location} />
          </div>
          <AccordionComponent items={bonus} />
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
      content: <Map location={data.location} />,
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
          isOwner={user.id === singlePropertyData.owner.id}
          userId={user.id}
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
