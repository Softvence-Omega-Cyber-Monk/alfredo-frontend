// components/MapModal.tsx
import LeafletInputMap from "./LeafletInputMap";

type MapModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (lat: number, lng: number) => void;
};

const MapModal = ({ isOpen, onClose, onSelect }: MapModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg w-[90vw] max-w-3xl shadow-xl">
        <h2 className="text-xl font-semibold mb-2">Pick a Location</h2>

        <LeafletInputMap onSelect={onSelect} />

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapModal;
