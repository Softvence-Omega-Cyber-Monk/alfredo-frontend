import { amenitiesData } from "@/lib/data/amenities";
import type { Amenity } from "@/lib/data/amenities"; // Import the Amenity type

interface DashboardAmenitiesProps {
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

const DashboardAmenities = ({
  selectedAmenities,
  onAmenitiesChange,
}: DashboardAmenitiesProps) => {
  const toggleAmenity = (
    category: keyof typeof selectedAmenities,
    amenity: Amenity
  ) => {
    const currentAmenities = selectedAmenities[category];
    const isSelected = currentAmenities.some(
      (item) => item.title === amenity.title && item.icon === amenity.icon
    );

    let newAmenities;
    if (isSelected) {
      // Remove amenity
      newAmenities = currentAmenities.filter(
        (item) => !(item.title === amenity.title && item.icon === amenity.icon)
      );
    } else {
      // Add amenity
      newAmenities = [...currentAmenities, amenity];
    }

    onAmenitiesChange({
      ...selectedAmenities,
      [category]: newAmenities,
    });
  };

  const isAmenitySelected = (
    category: keyof typeof selectedAmenities,
    amenity: Amenity
  ) => {
    return selectedAmenities[category].some(
      (item) => item.title === amenity.title && item.icon === amenity.icon
    );
  };
  return (
    <div className="mt-8">
      {/* Category Loop */}
      {Object.entries(amenitiesData).map(
        ([category, items]: [string, Amenity[]]) => (
          <div key={category} className="mb-8">
            <h2 className="text-xl font-semibold text-primary-blue capitalize mb-4">
              {category}
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
              {items.map((amenity: Amenity, index: number) => {
                const isSelected = isAmenitySelected(
                  category as keyof typeof selectedAmenities,
                  amenity
                );
                return (
                  <div
                    key={index}
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
                      alt={amenity.title}
                      className="w-6 h-6 mb-1"
                    />
                    <p className="text-base font-regular text-center text-dark-2">
                      {amenity.title}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default DashboardAmenities;
