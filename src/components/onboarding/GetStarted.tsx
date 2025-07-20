import { TbChecklist } from "react-icons/tb";
import { Button } from "../ui/button";
import Title from "./Shared/Title";
import { useState } from "react";

import map from "@/assets/icons/Location.svg";
import mapUp from "@/assets/icons/dashboardMap.svg";
import MapModal from "../dashboard/MapModal";
import { AiOutlineExclamationCircle } from "react-icons/ai";

const GetStarted = () => {
  return (
    <div className="w-full  md:py-10 space-y-6 ">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-center mb-10 w-full gap-4">
        <div className="w-full lg:w-auto flex-1">
          <Title title="Get started with Vacaza." />
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
      <div></div>

      {/* <div>
       
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
          <Button className="w-full sm:w-[125px] h-[52px] px-6 py-2 text-[rgba(128,128,128,0.5)] font-inter text-[18px] font-semibold leading-[156%] border border-[#CAD2DB] rounded-[35px] cursor-pointer">
            Cancel
          </Button>

          <div className="flex gap-4 w-full sm:w-auto justify-end">
            <Button
              type="submit"
              className="w-full sm:w-[246px] h-[52px] px-8 py-3 rounded-[35px] bg-[#3174CD] hover:bg-[#215ba8] text-white font-inter text-[18px] font-semibold leading-[156%] flex justify-center items-center  gap-[10px] cursor-pointer"
            >
              Continue Address
              <FaArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default GetStarted;
