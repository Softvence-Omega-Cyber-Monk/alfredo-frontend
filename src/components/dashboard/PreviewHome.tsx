import { useState } from "react";
import MapModal from "./MapModal";
import map from "@/assets/icons/Location.svg";
import mapUp from "@/assets/icons/dashboardMap.svg";
import { useTranslation } from "react-i18next";

interface PreviewHomeProps {
  location: { lat: number; lng: number } | null;
  destination: { lat: number; lng: number } | null;
  onLocationChange: (location: { lat: number; lng: number } | null) => void;
  onDestinationChange: (
    destination: { lat: number; lng: number } | null
  ) => void;
}

const PreviewHome = ({
  location,
  destination,
  onLocationChange,
  onDestinationChange,
}: PreviewHomeProps) => {
  const [showMap, setShowMap] = useState(false);
  const [mapType, setMapType] = useState<"location" | "destination">(
    "location"
  );

  const handleMapSelect = (lat: number, lng: number) => {
    const coords = { lat, lng };
    if (mapType === "location") {
      onLocationChange(coords);
    } else {
      onDestinationChange(coords);
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

  const locationDisplayValue = location
    ? `Lat: ${location.lat.toFixed(5)}, Lng: ${location.lng.toFixed(5)}`
    : "";

  const destinationDisplayValue = destination
    ? `Lat: ${destination.lat.toFixed(5)}, Lng: ${destination.lng.toFixed(5)}`
    : "";

  const { t } = useTranslation("dashboard");
  return (
    <div className="mt-10 lg:mt-16">
      <h1 className="font-semibold text-primary-blue text-3xl md:text-4xl lg:text-[40px]">
        {t("dashboard.part1.title1")}
      </h1>

      <div className="mt-6 lg:mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg text-primary-blue font-semibold">
            {t("dashboard.part1.miniTitle1")}
          </h3>
          <p className="text-base text-dark-3 font-regular mt-3 max-w-md">
            {t("dashboard.part1.subtitle1")}
          </p>

          <div className="relative mt-4 w-full" onClick={openLocationMap}>
            {/* Left Icon */}
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <img src={map} className="w-6 h-6" />
            </div>

            {/* Input Field */}
            <input
              type="text"
              value={locationDisplayValue}
              onClick={openLocationMap}
              readOnly
              placeholder={t("dashboard.part1.inputText1")}
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
          <h3 className="text-lg text-primary-blue font-semibold">
            {t("dashboard.part1.miniTitle2")}
          </h3>
          <p className="text-base text-dark-3 font-regular mt-3 max-w-md">
            {t("dashboard.part1.subtitle2")}
          </p>

          <div className="relative mt-4 w-full" onClick={openDestinationMap}>
            {/* Left Icon */}
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <img src={map} className="w-6 h-6" />
            </div>

            {/* Input Field */}
            <input
              type="text"
              value={destinationDisplayValue}
              onClick={openDestinationMap}
              readOnly
              placeholder={t("dashboard.part1.inputText2")}
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

// import { useState } from "react";
// import MapModal from "./MapModal";
// import map from "@/assets/icons/Location.svg";
// import mapUp from "@/assets/icons/dashboardMap.svg";

// interface PreviewHomeProps {
//   location: { lat: number; lng: number } | null;
//   destination: { lat: number; lng: number } | null;
//   onLocationChange: (location: { lat: number; lng: number } | null) => void;
//   onDestinationChange: (
//     destination: { lat: number; lng: number } | null
//   ) => void;
// }

// const PreviewHome = ({
//   location,
//   destination,
//   onLocationChange,
//   onDestinationChange,
// }: PreviewHomeProps) => {
//   const [showMap, setShowMap] = useState(false);
//   const [mapType, setMapType] = useState<"location" | "destination">(
//     "location"
//   );

//   const handleMapSelect = (lat: number, lng: number) => {
//     const coords = { lat, lng };
//     if (mapType === "location") {
//       onLocationChange(coords);
//     } else {
//       onDestinationChange(coords);
//     }
//     setShowMap(false);
//   };

//   const openLocationMap = () => {
//     setMapType("location");
//     setShowMap(true);
//   };

//   const openDestinationMap = () => {
//     setMapType("destination");
//     setShowMap(true);
//   };

//   const locationDisplayValue = location
//     ? `Lat: ${location.lat.toFixed(5)}, Lng: ${location.lng.toFixed(5)}`
//     : "";

//   const destinationDisplayValue = destination
//     ? `Lat: ${destination.lat.toFixed(5)}, Lng: ${destination.lng.toFixed(5)}`
//     : "";

//   return (
//     <div className="mt-10 lg:mt-16">
//       <h1 className="font-semibold text-primary-blue text-3xl md:text-4xl lg:text-[40px]">
//         Preview Your Home Listing
//       </h1>

//       <div className="mt-6 lg:mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div>
//           <h3 className="text-lg text-primary-blue font-semibold">
//             Where is your home?
//           </h3>
//           <p className="text-base text-dark-3 font-regular mt-3 max-w-md">
//             Tell guests where your home is located so they can plan their stay
//             with confidence.
//           </p>

//           <div className="relative mt-4 w-full" onClick={openLocationMap}>
//             {/* Left Icon */}
//             <div className="absolute left-3 top-1/2 -translate-y-1/2">
//               <img src={map} className="w-6 h-6" />
//             </div>

//             {/* Input Field */}
//             <input
//               type="text"
//               value={locationDisplayValue}
//               onClick={openLocationMap}
//               readOnly
//               placeholder="Select from Google Map"
//               className="w-full pl-10 pr-10  py-4 border border-dark-3 text-dark-3 rounded-lg cursor-pointer focus:outline-none"
//             />

//             {/* Right Icon */}
//             <div
//               className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 w-16 h-10 flex items-center justify-center rounded overflow-hidden"
//               style={{
//                 backgroundImage: `url('/mapBg.svg')`,
//                 backgroundSize: "cover",
//                 backgroundPosition: "center",
//               }}
//             >
//               <img src={mapUp} alt="" />
//             </div>
//           </div>
//         </div>

//         <div>
//           <h3 className="text-lg text-primary-blue font-semibold">
//             Where would you like to go?
//           </h3>
//           <p className="text-base text-dark-3 font-regular mt-3 max-w-md">
//             Choose your destination and start planning your next adventure with
//             Vacanza.
//           </p>

//           <div className="relative mt-4 w-full" onClick={openDestinationMap}>
//             {/* Left Icon */}
//             <div className="absolute left-3 top-1/2 -translate-y-1/2">
//               <img src={map} className="w-6 h-6" />
//             </div>

//             {/* Input Field */}
//             <input
//               type="text"
//               value={destinationDisplayValue}
//               onClick={openDestinationMap}
//               readOnly
//               placeholder="Select from Google Map"
//               className="w-full pl-10 pr-10  py-4 border border-dark-3 text-dark-3 rounded-lg cursor-pointer focus:outline-none"
//             />

//             {/* Right Icon */}
//             <div
//               className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 w-16 h-10 rounded overflow-hidden"
//               style={{
//                 backgroundImage: `url('/mapBg.svg')`,
//                 backgroundSize: "cover",
//                 backgroundPosition: "center",
//               }}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Map modal rendered via props */}
//       <MapModal
//         isOpen={showMap}
//         onClose={() => setShowMap(false)}
//         onSelect={handleMapSelect}
//       />
//     </div>
//   );
// };

// export default PreviewHome;
