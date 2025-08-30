import CommonWrapper from "@/common/CommonWrapper";
import PlacesGrid from "@/components/places/PlacesGrid";
import PlacesHeading from "@/components/places/PlacesHeading";
import PlacesEmpty from "@/components/places/PlacesEmpty";
import { propertiess } from "@/lib/data/properties"; // Assuming this is where your property cards are defined

const Places = () => {
  const hasPlaces = propertiess.length > 0;

  return (
    <div className="">
      <CommonWrapper>
        <div className="p-6">
          <PlacesHeading hasPlaces={hasPlaces} />
          {hasPlaces ? (
            <PlacesGrid propertyCards={propertiess} />
          ) : (
            <PlacesEmpty />
          )}
        </div>
      </CommonWrapper>
    </div>
  );
};

export default Places;
