import { TbChecklist } from "react-icons/tb";
import { Button } from "../ui/button";
import Title from "./Shared/Title";
import { useState } from "react";

import map from "@/assets/icons/Location.svg";
import mapUp from "@/assets/icons/dashboardMap.svg";
import MapModal from "../dashboard/MapModal";
import { AiOutlineExclamationCircle } from "react-icons/ai";

const GetStarted = () => {
  const [showMap, setShowMap] = useState(false);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null
  );

  const handleMapSelect = (lat: number, lng: number) => {
    setCoords({ lat, lng });
    setShowMap(false);
  };

  const displayValue = coords
    ? `Lat: ${coords.lat.toFixed(5)}, Lng: ${coords.lng.toFixed(5)}`
    : "";

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

      <div className="flex flex-col lg:flex-row w-full gap-5">
        <div className="w-full lg:w-1/2">
          <div className="mt-10">
            <div className="flex flex-col items-start gap-[26px] p-10 flex-1 rounded-[24px] bg-[#F4F7FC] ">
              <div>
                <h3 className="text-2xl text-primary-blue font-semibold mt-3">
                  1. Create your home listing
                </h3>
                <p className="text-lg text-dark-3 font-regular mt-3 max-w-md">
                  Add your property details, photos, and pricing to start
                  attracting guests.
                </p>
              </div>

              <div>
                <h3 className="text-2xl text-primary-blue font-semibold mt-3">
                  2. Introduce yourself.
                </h3>
                <p className="text-lg text-dark-3 font-regular mt-3 max-w-md">
                  Share a bit about who you are to build trust with potential
                  guests.
                </p>
              </div>

              <div>
                <h3 className="text-2xl text-primary-blue font-semibold mt-3">
                  3. Become a member for 59 EUR
                </h3>
                <p className="text-lg text-dark-3 font-regular mt-3 max-w-md">
                  Unlock full platform benefits and connect with a global
                  community..
                </p>
              </div>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="w-full lg:w-1/2">
          <div className="mt-10">
            <div className="mt-10 gap-6 space-y-8">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg text-primary-blue font-semibold mt-3">
                    Where is your home?
                  </h3>
                  <p className="text-base text-dark-3 font-regular mt-3 max-w-md">
                    Tell guests where your home is located so they can plan
                    their stay with confidence.
                  </p>
                </div>

                <div
                  className="relative mt-4 w-full"
                  onClick={() => setShowMap(true)}
                >
                  {/* Left Icon */}
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <img src={map} className="w-6 h-6" />
                  </div>

                  {/* Input Field */}
                  <input
                    type="text"
                    value={displayValue}
                    onClick={() => setShowMap(true)}
                    readOnly
                    placeholder="Select from Google Map"
                    className="w-full pl-10 pr-10  py-4 border border-dark-3 text-dark-3 rounded-lg cursor-pointer focus:outline-none"
                  />

                  {/* Right Icon */}
                  <div
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 w-16 h-10 flex items-center justify-center rounded overflow-hidden"
                    style={{
                      backgroundImage: `url('/mapBg.svg')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <img src={mapUp} alt="" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg text-primary-blue font-semibold mt-3">
                  Where would you like to go?
                </h3>
                <p className="text-base text-dark-3 font-regular mt-3 max-w-md">
                  Choose your destination and start planning your next adventure
                  with Vacanza.
                </p>

                <div
                  className="relative mt-4 w-full"
                  onClick={() => setShowMap(true)}
                >
                  {/* Left Icon */}
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <img src={map} className="w-6 h-6" />
                  </div>

                  {/* Input Field */}
                  <input
                    type="text"
                    value={displayValue}
                    onClick={() => setShowMap(true)}
                    readOnly
                    placeholder="Select from Google Map"
                    className="w-full pl-10 pr-10  py-4 border border-dark-3 text-dark-3 rounded-lg cursor-pointer focus:outline-none"
                  />

                  {/* Right Icon */}
                  <div
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 w-16 h-10 rounded overflow-hidden"
                    style={{
                      backgroundImage: `url('/mapBg.svg')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                </div>
              </div>
              <p className="flex justify-baseline items-center gap-2 text-[#808080] text-base font-DM-sans">
                <span>
                  {" "}
                  <AiOutlineExclamationCircle />
                </span>{" "}
                You'll be able to modify this information later
              </p>
            </div>

            {/* Map modal rendered via props */}
            <MapModal
              isOpen={showMap}
              onClose={() => setShowMap(false)}
              onSelect={handleMapSelect}
            />
          </div>
        </div>
      </div>

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
