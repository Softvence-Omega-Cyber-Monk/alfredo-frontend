import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HomeTitle from "./HomeTitle";
import Photos from "./Photos";
import Description from "./Description";
import Amenities from "./Amenities";
import Map from "./Map";
import Testimonial from "@/components/reusable/Testimonial";
import AccordionComponent from "../reusable/AccordionComponent";
import { HomeDetailsType } from "@/lib/data/homeDetails.ts";
import { bonus } from "@/lib/AccordionData/accordionData";

const HomeDetailsTabs = ({ data }: { data: HomeDetailsType }) => {
  const tabsData = [
    {
      id: "Photos",
      label: "Photos",
      content: (
        <div className="space-y-6">
          <Photos photos={data.photos} />
          <Description
            dates={{ from: data.dates.from, to: data.dates.to }}
            description={data.description}
          />
          <Amenities amenities={data.amenities} />
          <Map location={data.location} />
          <AccordionComponent items={bonus} />
          <Testimonial />
        </div>
      ),
    },
    {
      id: "Description",
      label: "Description",
      content: (
        <Description
          dates={{ from: data.dates.from, to: data.dates.to }}
          description={data.description}
        />
      ),
    },
    {
      id: "Amenities",
      label: "Amenities",
      content: <Amenities amenities={data.amenities} />,
    },
    {
      id: "Map",
      label: "Map",
      content: <Map location={data.location} />,
    },
    {
      id: "FAQ",
      label: "FAQ",
      content: <AccordionComponent />,
    },
    {
      id: "Reviews",
      label: "Reviews",
      content: <Testimonial />,
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
          <HomeTitle title={data.title} features={data.features} />
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
