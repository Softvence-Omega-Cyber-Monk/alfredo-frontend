import { useState } from "react";
import MapModal from "./MapModal";
import map from "@/assets/icons/Location.svg";
import mapUp from "@/assets/icons/dashboardMap.svg";

const PreviewHome = () => {
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
    <div className="mt-16">
      <h1 className="font-semibold text-primary-blue text-[40px]">
        Preview Your Home Listing
      </h1>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg text-primary-blue font-semibold mt-3">
            Where is your home?
          </h3>
          <p className="text-base text-dark-3 font-regular mt-3 max-w-md">
            Tell guests where your home is located so they can plan their stay
            with confidence.
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
            Choose your destination and start planning your next adventure with
            Vacanza.
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
      </div>

      {/* Map modal rendered via props */}
      <MapModal
        isOpen={showMap}
        onClose={() => setShowMap(false)}
        onSelect={handleMapSelect}
      />
    </div>
  );
};

export default PreviewHome;
