import { amenitiesData } from "@/lib/data/amenities";

const DashboardAmenities = () => {
  return (
    <div className="mt-8">
      {/* Category Loop */}
      {Object.entries(amenitiesData).map(([category, items]) => (
        <div key={category} className="mb-8">
          <h2 className="text-xl font-semibold text-primary-blue capitalize mb-4">
            {category}
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {items.map((amenity, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-6 border border-[#EAF1FA] rounded-xl hover:bg-[#F4F7FC] hover:shadow-[0_0_24px_0_rgba(49,116,205,0.25)] hover:border-primary-blue transition-colors duration-200"
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
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardAmenities;
