import { TbChecklist } from "react-icons/tb";
import { Button } from "../ui/button";
import Title from "./Shared/Title";
import { amenitiesData } from "@/lib/data/amenities";
import type { Amenity } from "@/lib/data/amenities"; // Import the Amenity type

const SelectAmenities = () => {
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
      {/* Aprt-2 */}
      <div>
        <div className="mt-8">
          {/* Category Loop */}
          {Object.entries(amenitiesData).map(
            ([category, items]: [string, Amenity[]]) => (
              <div key={category} className="mb-8">
                <h2 className="text-xl font-semibold text-primary-blue capitalize mb-4">
                  {category}
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
                  {items.map((amenity: Amenity, index: number) => (
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
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectAmenities;
