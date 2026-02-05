import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";
import L from "leaflet";

// Fix default marker icon issue with Leaflet and Webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const SearchControl = ({ onSearchSelect }: { onSearchSelect: (lat: number, lng: number) => void }) => {
  const map = useMap();

  useEffect(() => {
    // Configure provider to prioritize Greek results
    const provider = new OpenStreetMapProvider({
      params: {
        'accept-language': 'el,en', // Prioritize Greek, then English
        countrycodes: 'gr', // Limit search to Greece first
        addressdetails: 1,
        limit: 10,
      },
    });

    const searchControl = new (GeoSearchControl as any)({
      provider,
      style: "bar",
      autoComplete: true,
      autoCompleteDelay: 250,
      showMarker: false,
      retainZoomLevel: false,
      searchLabel: 'Search locations in Greece...',
    });

    map.addControl(searchControl);

    // Listen for search result selection
    map.on('geosearch/showlocation', (result: any) => {
      if (result.location) {
        const { x: lng, y: lat } = result.location;
        onSearchSelect(lat, lng);
      }
    });

    return () => {
      map.off('geosearch/showlocation');
      map.removeControl(searchControl);
    };
  }, [map, onSearchSelect]);

  return null;
};

// Component to handle centering the map when initialCenter changes
const MapCenterController = ({
  center
}: {
  center: { lat: number; lng: number }
}) => {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.setView([center.lat, center.lng], map.getZoom());
    }
  }, [center, map]);

  return null;
};

// Component to configure iOS/mobile touch settings
const TouchConfigController = () => {
  const map = useMap();

  useEffect(() => {
    // Enable tap for iOS/mobile devices
    const mapInstance = map as any;
    if (mapInstance._container) {
      mapInstance._container.style.touchAction = 'pan-y';
    }

    // Configure tap options if available
    if (mapInstance.tap) {
      mapInstance.tap.enable();
    }
  }, [map]);

  return null;
};

const LocationMarker = ({
  position,
  onMapClick,
}: {
  position: L.LatLng | null;
  onMapClick: (lat: number, lng: number) => void;
}) => {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });

  return position === null ? null : <Marker position={position} />;
};

const LeafletInputMap = ({
  onSelect,
  initialCenter,
}: {
  onSelect: (lat: number, lng: number) => void;
  initialCenter?: { lat: number; lng: number };
}) => {
  const [markerPosition, setMarkerPosition] = useState<L.LatLng | null>(
    initialCenter ? L.latLng(initialCenter.lat, initialCenter.lng) : null
  );

  // Default to Athens, Greece coordinates
  const center = initialCenter || { lat: 37.9838, lng: 23.7275 };

  const handleLocationSelect = (lat: number, lng: number) => {
    setMarkerPosition(L.latLng(lat, lng));
    onSelect(lat, lng);
  };

  // Update marker position when initialCenter changes
  useEffect(() => {
    if (initialCenter) {
      setMarkerPosition(L.latLng(initialCenter.lat, initialCenter.lng));
    }
  }, [initialCenter]);

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "400px", width: "100%" }}
      touchZoom={true}
      dragging={true}
      zoomControl={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <SearchControl onSearchSelect={handleLocationSelect} />
      <TouchConfigController />
      <MapCenterController center={center} />
      <LocationMarker
        position={markerPosition}
        onMapClick={handleLocationSelect}
      />
    </MapContainer>
  );
};

export default LeafletInputMap;