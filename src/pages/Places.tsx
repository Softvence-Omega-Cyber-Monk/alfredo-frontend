import CommonWrapper from "@/common/CommonWrapper";
import PlacesGrid from "@/components/places/PlacesGrid";
import PlacesHeading from "@/components/places/PlacesHeading";
import PlacesEmpty from "@/components/places/PlacesEmpty";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { useEffect, useState } from "react";
import {
  fetchAllProperties,
  fetchMyProperties,
  PROPERTIES_PER_PAGE,
} from "@/store/Slices/PropertySlice/propertySlice";
import Loader from "@/components/reusable/Loader";
import Pagination from "@/components/reusable/Pagination";

const Places = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const { allProperties, allPropertiesMeta, myProperties, loading, error } =
    useAppSelector((state) => state.property);

  const filteredProperties = allProperties.filter(
    (property) => !myProperties.some((myProp) => myProp.id === property.id)
  );

  useEffect(() => {
    dispatch(fetchAllProperties({ page, limit: PROPERTIES_PER_PAGE }));
  }, [dispatch, page]);

  useEffect(() => {
    dispatch(fetchMyProperties());
  }, [dispatch]);

  const totalPages = allPropertiesMeta.totalPages;
  const hasPlaces = allPropertiesMeta.total > 0;
  const isInitialLoad = loading && allProperties.length === 0;

  const handlePageChange = (nextPage: number) => {
    if (nextPage === page || nextPage < 1 || nextPage > totalPages) return;
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Transform PropertyListItem to CommonCard format
  const propertyCards = filteredProperties.map((property) => ({
    id: property.id,
    image: property.images?.[0]?.url || "/placeholder-image.jpg",
    coverImage: property.coverImage,
    location: `${property.location}, ${property.country}`,
    title: property.title,
    description: property.description,
    price: property.price,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    size: property.size,
    isAvailable: property.isAvailable,
  }));

  if (isInitialLoad) {
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
            <>
              <div
                className={
                  loading ? "opacity-50 pointer-events-none transition-opacity" : ""
                }
              >
                <PlacesGrid propertyCards={propertyCards} />
              </div>
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                disabled={loading}
              />
            </>
          ) : (
            <PlacesEmpty />
          )}
        </div>
      </CommonWrapper>
    </div>
  );
};

export default Places;
