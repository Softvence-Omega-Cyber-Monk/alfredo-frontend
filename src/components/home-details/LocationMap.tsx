// LocationMap.tsx
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

interface LocationMapProps {
  location: {
    lat: number;
    lng: number;
  };
  isLoggedIn: boolean;
}

// Fix leaflet icons for Vite/Webpack
delete (L.Icon.Default as any).prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Component to update map center when location changes
const MapUpdater = ({
  location,
}: {
  location: { lat: number; lng: number };
}) => {
  const map = useMap();

  useEffect(() => {
    console.log("Updating map center to:", location);
    map.setView([location.lat, location.lng], 13);
  }, [location, map]);

  return null;
};

const LocationMap = ({ location, isLoggedIn }: LocationMapProps) => {
  useEffect(() => {
    console.log("LocationMap rendered with:", { location, isLoggedIn });
  }, [location, isLoggedIn]);

  return (
    <div className={`w-full h-full ${!isLoggedIn ? "blur-[8px]" : ""}`}>
      <MapContainer
        center={[location.lat, location.lng]}
        zoom={13}
        scrollWheelZoom={false}
        className="w-full h-full rounded-xl"
        key={`${location.lat}-${location.lng}`} // Force re-render when location changes
      >
        <TileLayer
          attribution='&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[location.lat, location.lng]}>
          <Popup>Property Location</Popup>
        </Marker>
        <MapUpdater location={location} />
      </MapContainer>
    </div>
  );
};

export default LocationMap;
