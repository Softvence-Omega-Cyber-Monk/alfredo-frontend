import { useState } from "react";
import { useTranslation } from "react-i18next";
import LeafletInputMap from "./LeafletInputMap";

type MapModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (lat: number, lng: number) => void;
  initialCenter?: { lat: number; lng: number } | null;
};

const MapModal = ({ isOpen, onClose, onSelect, initialCenter }: MapModalProps) => {
  const { t } = useTranslation("dashboard");
  const [tempSelection, setTempSelection] = useState<{ lat: number; lng: number } | null>(null);

  if (!isOpen) return null;

  // Default to Athens, Greece if no initial center provided
  const center = initialCenter || { lat: 37.9838, lng: 23.7275 };

  const handleTempSelect = (lat: number, lng: number) => {
    // Store the selection temporarily, don't close modal yet
    setTempSelection({ lat, lng });
  };

  const handleConfirm = () => {
    if (tempSelection) {
      onSelect(tempSelection.lat, tempSelection.lng);
      setTempSelection(null);
      onClose();
    }
  };

  const handleCancel = () => {
    setTempSelection(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg w-[90vw] max-w-3xl shadow-xl">
        <h2 className="text-xl font-semibold mb-2">
          {t("dashboard.part1.location")}
        </h2>

        <LeafletInputMap
          onSelect={handleTempSelect}
          initialCenter={center}
        />

        {tempSelection && (
          <div className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded text-sm">
            <p className="text-blue-700">
              Selected: {tempSelection.lat.toFixed(5)}, {tempSelection.lng.toFixed(5)}
            </p>
          </div>
        )}

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded cursor-pointer"
          >
            {t("dashboard.part1.button")}
          </button>
          <button
            onClick={handleConfirm}
            disabled={!tempSelection}
            className={`px-4 py-2 rounded cursor-pointer ${tempSelection
              ? "bg-primary-blue hover:bg-blue-600 text-white"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapModal;