import { TbChecklist } from "react-icons/tb";
import { Button } from "../ui/button";
import Title from "./Shared/Title";
// import { amenitiesData } from "@/lib/data/amenities";
import type { Amenity } from "@/lib/data/amenities"; // Import the Amenity type
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { useEffect } from "react";
import {
  fetchMainAmenities,
  fetchSurroundingAmenities,
  fetchTransportAmenities,
  AmenityItem as ApiAmenity, // added
} from "@/store/Slices/OnboardingSlice/AmenitySlice";
import Loader from "../reusable/Loader";

interface AmenitiesProps {
  selectedAmenities: {
    main: Amenity[];
    transport: Amenity[];
    surrounding: Amenity[];
  };
  onAmenitiesChange: (selectedAmenities: {
    main: Amenity[];
    transport: Amenity[];
    surrounding: Amenity[];
  }) => void;
}

const SelectAmenities = ({
  selectedAmenities,
  onAmenitiesChange,
}: AmenitiesProps) => {
  const dispatch = useAppDispatch();

  const { main, transport, surrounding, loading, error } = useAppSelector(
    (state) => state.amenities
  );

  useEffect(() => {
    dispatch(fetchMainAmenities());
    dispatch(fetchTransportAmenities());
    dispatch(fetchSurroundingAmenities());
  }, [dispatch]);

  // Updated toggle based on id, preserve style logic
  const toggleAmenity = (
    category: keyof typeof selectedAmenities,
    amenity: ApiAmenity
  ) => {
    const currentAmenities = selectedAmenities[category];
    const isSelected = currentAmenities.some(
      (item) => (item as any).id === amenity.id
    );

    let newAmenities;
    if (isSelected) {
      newAmenities = currentAmenities.filter(
        (item) => (item as any).id !== amenity.id
      );
    } else {
      // cast to Amenity for compatibility
      newAmenities = [...currentAmenities, amenity as unknown as Amenity];
    }

    onAmenitiesChange({
      ...selectedAmenities,
      [category]: newAmenities,
    });
  };

  const isAmenitySelected = (
    category: keyof typeof selectedAmenities,
    amenity: ApiAmenity
  ) => {
    return selectedAmenities[category].some(
      (item) => (item as any).id === amenity.id
    );
  };

  const { t } = useTranslation("dashboard");

  if (loading)
    return (
      <div>
        <Loader />
      </div>
    );
  if (error) return <div>{error}</div>;

  return (
    <div className="w-full py-6 md:py-10 space-y-6 ">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-center mb-10 w-full gap-4">
        <div className="w-full lg:w-auto flex-1">
          <Title title="Select Amenities" />
        </div>
        <div className="w-full lg:w-auto flex justify-center md:justify-end">
          <Button
            variant="secondary"
            className="flex items-center gap-2 px-5 py-3 rounded-lg border border-[#CAD2DB] text-[#3174CD] text-base font-medium hover:bg-gray-100"
          >
            Save Draft
            <TbChecklist className="w-5 h-5" />
          </Button>
        </div>
      </div>
      <hr className="text-[#EAF1FA]" />
      <div>
        <div className="mt-8">
          {/* Category Loop */}
          {Object.entries({ main, transport, surrounding }).map(
            ([category, items]: [string, ApiAmenity[]]) => (
              <div key={category} className="mb-8">
                <h2 className="text-xl font-semibold text-primary-blue capitalize mb-4">
                  {t(category)}
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
                  {items.map((amenity) => {
                    const isSelected = isAmenitySelected(
                      category as keyof typeof selectedAmenities,
                      amenity
                    );
                    return (
                      <div
                        key={amenity.id}
                        onClick={() =>
                          toggleAmenity(
                            category as keyof typeof selectedAmenities,
                            amenity
                          )
                        }
                        className={`flex flex-col items-center justify-center p-6 border rounded-xl cursor-pointer transition-all duration-200 ${
                          isSelected
                            ? "bg-[#F4F7FC] shadow-[0_0_24px_0_rgba(49,116,205,0.25)] border-primary-blue"
                            : "border-[#EAF1FA] hover:bg-[#F4F7FC] hover:shadow-[0_0_24px_0_rgba(49,116,205,0.25)] hover:border-primary-blue"
                        }`}
                      >
                        <img
                          src={amenity.icon}
                          alt={amenity.name}
                          className="w-6 h-6 mb-1 mx-auto" // ensure centering
                        />
                        <p className="text-base font-regular text-center text-dark-2">
                          {t(amenity.name)}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectAmenities;
