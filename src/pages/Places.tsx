import CommonWrapper from "@/common/CommonWrapper";
import PlacesGrid from "@/components/places/PlacesGrid";
import PlacesHeading from "@/components/places/PlacesHeading";
import PlacesEmpty from "@/components/places/PlacesEmpty";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { useEffect } from "react";
import {
  fetchAllProperties,
  fetchMyProperties,
} from "@/store/Slices/PropertySlice/propertySlice";
import Loader from "@/components/reusable/Loader";

const Places = () => {
  const dispatch = useAppDispatch();
  const { allProperties, myProperties, loading, error } = useAppSelector(
    (state) => state.property
  );

  const filteredProperties = allProperties.filter(
    (property) => !myProperties.some((myProp) => myProp.id === property.id)
  );

  useEffect(() => {
    dispatch(fetchAllProperties());
    dispatch(fetchMyProperties());
  }, [dispatch]);

  // Transform PropertyListItem to CommonCard format
  const propertyCards = filteredProperties.map((property) => ({
    id: property.id,
    image: property.images?.[0]?.url || "/placeholder-image.jpg",
    location: `${property.location}, ${property.country}`,
    title: property.title,
    description: property.description,
    price: property.price,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    size: property.size,
    isAvailable: property.isAvailable,
  }));

  const hasPlaces = allProperties.length > 0;

  if (loading) {
    return (
      <div className="mt-6 md:mt-10">
        <CommonWrapper>
          <div className="p-6">
            <Loader />
          </div>
        </CommonWrapper>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-6 md:mt-10">
        <CommonWrapper>
          <div className="p-6">
            <div className="text-center text-red-500">
              <p>Error loading properties: {error}</p>
            </div>
          </div>
        </CommonWrapper>
      </div>
    );
  }

  return (
    <div className="mt-6 md:mt-10">
      <CommonWrapper>
        <div className="p-6">
          <PlacesHeading hasPlaces={hasPlaces} />
          {hasPlaces ? (
            <PlacesGrid propertyCards={propertyCards} />
          ) : (
            <PlacesEmpty />
          )}
        </div>
      </CommonWrapper>
    </div>
  );
};

export default Places;
