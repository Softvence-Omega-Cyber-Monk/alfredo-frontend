import { TbChecklist } from "react-icons/tb";
import { Button } from "../ui/button";
import Title from "./Shared/Title";

import { RxCrossCircled } from "react-icons/rx";
import { FcOk } from "react-icons/fc";
import CalendarRangePicker from "./CalendarRangePicker";

const HomeAvailability = () => {
  return (
    <div className="w-full  md:py-10 space-y-6 ">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-center mb-10 w-full gap-4">
        <div className="w-full lg:w-auto flex-1">
          <Title title="Add your home's availability" />
        </div>
        <div className="w-full lg:w-auto flex justify-end">
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
        <div className="mt-10">
          <h3 className="text-lg text-primary-blue font-semibold ">
            Add your home's availability
          </h3>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 ">
            <div className="p-6 flex flex-col gap-2.5 border border-[#BFD4F0] rounded-lg bg-[#F4F7FC] shadow-[0_0_24px_0_rgba(49,116,205,0.25)]">
              <div className="flex items-center gap-2 ">
                <FcOk className="w-5 h-5" />
                <p className="text-lg text-dark-3 font-normal">Home</p>
              </div>
              <p className="text-lg text-dark-3 font-normal">
                Let others know you're flexible and open to all kinds of home
                exchange opportunities.
              </p>
            </div>

            <div className="p-6 flex flex-col gap-2.5 border border-[#BFD4F0] rounded-lg">
              <div className="flex items-center gap-2 ">
                <RxCrossCircled className="w-5 h-5 text-[#E33A4B]" />
                <p className="text-lg text-dark-3 font-normal">Unavailable</p>
              </div>
              <p className="text-lg text-dark-3 font-regular">
                This home is not available for exchange at the moment..
              </p>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      <div className=" space-y-6">
        <h1 className="text-[#3174CD] font-dmSans text-[18px] font-semibold leading-[27px]">
          Select Your Available Dates
        </h1>
        <CalendarRangePicker />
      </div>
    </div>
  );
};

export default HomeAvailability;

