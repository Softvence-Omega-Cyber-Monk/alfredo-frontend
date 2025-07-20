import { TbChecklist } from "react-icons/tb";
import { Button } from "../ui/button";
import Title from "./Shared/Title";
import { RxCrossCircled } from "react-icons/rx";
import { FcOk } from "react-icons/fc";

const SelectType = () => {
  return (
    <div className="w-full  md:py-10 space-y-6 ">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-center mb-10 w-full gap-4">
        <div className="w-full lg:w-auto flex-1">
          <Title title="Select Type" />
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
            Select: What is your home like?
          </h3>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 ">
            <div className="p-6 flex flex-col gap-2.5 border border-[#BFD4F0] rounded-lg bg-[#F4F7FC] shadow-[0_0_24px_0_rgba(49,116,205,0.25)]">
              <div className="flex items-center gap-2 ">
                <FcOk className="w-5 h-5" />
                <p className="text-lg text-dark-3 font-normal">Home</p>
              </div>
              <p className="text-lg text-dark-3 font-normal">
                Your home is an independent property.
              </p>
            </div>

            <div className="p-6 flex flex-col gap-2.5 border border-[#BFD4F0] rounded-lg">
              <div className="flex items-center gap-2 ">
                <RxCrossCircled className="w-5 h-5 text-[#E33A4B]" />
                <p className="text-lg text-dark-3 font-normal">Apartment</p>
              </div>
              <p className="text-lg text-dark-3 font-regular">
                Your home is in a building shared by several apartments.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      <div className=" space-y-6">
        <div className="mt-10">
          <h3 className="text-lg text-primary-blue font-semibold ">
            Select: Is it your main residence?
          </h3>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 ">
            <div className="p-6 flex flex-col gap-2.5 border border-[#BFD4F0] rounded-lg bg-[#F4F7FC] shadow-[0_0_24px_0_rgba(49,116,205,0.25)]">
              <div className="flex items-center gap-2 ">
                <FcOk className="w-5 h-5" />
                <p className="text-lg text-dark-3 font-normal">
                  Yes, I live there all year round
                </p>
              </div>
              <p className="text-lg text-dark-3 font-normal">
                Your home is an independent property.
              </p>
            </div>

            <div className="p-6 flex flex-col gap-2.5 border border-[#BFD4F0] rounded-lg">
              <div className="flex items-center gap-2 ">
                <RxCrossCircled className="w-5 h-5 text-[#E33A4B]" />
                <p className="text-lg text-dark-3 font-normal">
                  Nor I go there occasionally
                </p>
              </div>
              <p className="text-lg text-dark-3 font-regular">
                Your home is in a building shared by several apartments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectType;