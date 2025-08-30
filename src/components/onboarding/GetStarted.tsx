import { TbChecklist } from "react-icons/tb";
import { Button } from "../ui/button";
import Title from "./Shared/Title";
import { useEffect, useState } from "react";

import map from "@/assets/icons/Location.svg";
import mapUp from "@/assets/icons/dashboardMap.svg";
import MapModal from "../dashboard/MapModal";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import { forwardGeocode, reverseGeocode } from "@/lib/geocoding";

interface GetStartedProps {
  location: { lat: number; lng: number } | null;
  destination: { lat: number; lng: number } | null;
  onLocationChange: (location: { lat: number; lng: number } | null) => void;
  onDestinationChange: (
    destination: { lat: number; lng: number } | null
  ) => void;
  onLocationAddressChange: (address: string) => void;
  onDestinationAddressChange: (address: string) => void;
}

const GetStarted = ({
  location,
  destination,
  onLocationChange,
  onDestinationChange,
  onLocationAddressChange,
  onDestinationAddressChange,
}: GetStartedProps) => {
  const [showMap, setShowMap] = useState(false);
  const [mapType, setMapType] = useState<"location" | "destination">(
    "location"
  );

  const [locationAddress, setLocationAddress] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");

  useEffect(() => {
    let active = true;
    (async () => {
      if (location && !locationAddress) {
        const addr = await reverseGeocode(location.lat, location.lng);
        if (active && addr) {
          setLocationAddress(addr);
          onLocationAddressChange(addr);
        }
      }
    })();
    return () => {
      active = false;
    };
  }, [location]);

  useEffect(() => {
    let active = true;
    (async () => {
      if (destination && !destinationAddress) {
        const addr = await reverseGeocode(destination.lat, destination.lng);
        if (active && addr) {
          setDestinationAddress(addr);
          onDestinationAddressChange(addr);
        }
      }
    })();
    return () => {
      active = false;
    };
  }, [destination]);

  const handleMapSelect = async (lat: number, lng: number) => {
    const coords = { lat, lng };
    const addr = await reverseGeocode(lat, lng);
    if (mapType === "location") {
      setLocationAddress(
        addr || `Lat: ${lat.toFixed(5)}, Lng: ${lng.toFixed(5)}`
      );
      onLocationChange(coords);
      if (addr) onLocationAddressChange(addr);
    } else {
      setDestinationAddress(
        addr || `Lat: ${lat.toFixed(5)}, Lng: ${lng.toFixed(5)}`
      );
      onDestinationChange(coords);
      if (addr) onDestinationAddressChange(addr);
    }
    setShowMap(false);
  };

  const openLocationMap = () => {
    setMapType("location");
    setShowMap(true);
  };

  const openDestinationMap = () => {
    setMapType("destination");
    setShowMap(true);
  };

  // Debounced forward geocoding when user types address (keeps coords in sync)
  useEffect(() => {
    const id = setTimeout(async () => {
      if (!locationAddress || locationAddress.trim().length < 4) return;
      const coords = await forwardGeocode(locationAddress.trim());
      if (coords) onLocationChange(coords);
    }, 700);
    return () => clearTimeout(id);
  }, [locationAddress, onLocationChange]);

  useEffect(() => {
    const id = setTimeout(async () => {
      if (!destinationAddress || destinationAddress.trim().length < 4) return;
      const coords = await forwardGeocode(destinationAddress.trim());
      if (coords) onDestinationChange(coords);
    }, 700);
    return () => clearTimeout(id);
  }, [destinationAddress, onDestinationChange]);

  const { t } = useTranslation("onboarding");
  return (
    <div className="w-full py-6 md:py-10 space-y-6 ">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 w-full gap-4">
        <div className="w-full  flex-1">
          <Title title={t("onboarding.part1.headTitle")} />
        </div>
        <div className=" flex justify-end">
          <Button
            variant="secondary"
            className="flex items-center gap-2 px-5 py-3 rounded-lg border border-[#CAD2DB] text-[#3174CD] text-base font-medium hover:bg-gray-100"
          >
            {t("onboarding.part1.headButton")}
            <TbChecklist className="w-5 h-5" />
          </Button>
        </div>
      </div>
      <hr className="text-[#EAF1FA]" />
      {/* Step  2 */}

      <div className="flex flex-col lg:flex-row w-full lg:items-center gap-5">
        <div className="w-full lg:w-1/2">
          <div className="mt-6 lg:mt-10">
            <div className="flex flex-col items-start gap-[26px] p-6 md:p-10 flex-1 rounded-[24px] bg-[#F4F7FC] ">
              <div>
                <h3 className="text-xl md:text-2xl text-primary-blue font-semibold mt-3">
                  1. {t("onboarding.part1.bigtitle1")}
                </h3>
                <p className="text-base md:text-lg text-dark-3 font-regular mt-3 max-w-md">
                  {t("onboarding.part1.subtitle1")}
                </p>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl text-primary-blue font-semibold mt-3">
                  2. {t("onboarding.part1.bigtitle2")}
                </h3>
                <p className="text-base md:text-lg text-dark-3 font-regular mt-3 max-w-md">
                  {t("onboarding.part1.subtitle2")}
                </p>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl text-primary-blue font-semibold mt-3">
                  3. {t("onboarding.part1.bigtitle3")}
                </h3>
                <p className="text-base md:text-lg text-dark-3 font-regular mt-3 max-w-md">
                  {t("onboarding.part1.subtitle3")}
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
                  <h3 className="text-lg text-primary-blue font-semibold">
                    {t("onboarding.part1.minititle1")}
                  </h3>
                  <p className="text-base text-dark-3 font-regular mt-3 max-w-md">
                    {t("onboarding.part1.minisubtitle1")}
                  </p>

                  <div className="relative mt-4 w-full">
                    {/* Left Icon */}
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                      <img src={map} className="w-6 h-6" />
                    </div>

                    {/* Input Field */}
                    <input
                      type="text"
                      value={locationAddress}
                      onChange={(e) => setLocationAddress(e.target.value)}
                      placeholder={t("onboarding.part1.location1")}
                      className="w-full pl-10 pr-10 py-4 border border-dark-3 text-dark-3 rounded-lg focus:outline-none"
                    />

                    {/* Right Icon */}
                    <div
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 w-16 h-10 flex items-center justify-center rounded overflow-hidden"
                      style={{
                        backgroundImage: `url('/mapBg.svg')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                      onClick={openLocationMap}
                    >
                      <img src={mapUp} alt="" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg text-primary-blue font-semibold">
                    {t("onboarding.part1.minititle2")}
                  </h3>
                  <p className="text-base text-dark-3 font-regular mt-3 max-w-md">
                    {t("onboarding.part1.minisubtitle2")}
                  </p>

                  <div className="relative mt-4 w-full">
                    {/* Left Icon */}
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                      <img src={map} className="w-6 h-6" />
                    </div>

                    {/* Input Field */}
                    <input
                      type="text"
                      value={destinationAddress}
                      onChange={(e) => setDestinationAddress(e.target.value)}
                      placeholder={t("onboarding.part1.location2")}
                      className="w-full pl-10 pr-10 py-4 border border-dark-3 text-dark-3 rounded-lg focus:outline-none"
                    />

                    {/* Right Icon */}
                    <div
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 w-16 h-10 rounded overflow-hidden"
                      style={{
                        backgroundImage: `url('/mapBg.svg')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                      onClick={openDestinationMap}
                    />
                  </div>
                </div>
                <p className="flex justify-baseline items-center gap-2 text-[#808080] text-base font-DM-sans">
                  <span>
                    {" "}
                    <AiOutlineExclamationCircle />
                  </span>{" "}
                  {t("onboarding.part1.note")}
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
      </div>
    </div>
  );
};

export default GetStarted;
