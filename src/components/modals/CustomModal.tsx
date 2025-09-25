import { useEffect } from "react";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: Record<string, string>;
}

const CustomModal = ({ isOpen, onClose, title, content }: CustomModalProps) => {
  const { i18n } = useTranslation();

  // Prevent body scroll
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[70vh] flex flex-col animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-300 sticky top-0 bg-white z-10 rounded-t-2xl">
          <h2 className="text-2xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <X size={22} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="px-6 py-4 overflow-y-auto flex-1">
          <div
            className="prose prose-sm max-w-none whitespace-pre-line"
            dangerouslySetInnerHTML={{
              __html: content[i18n.language] || content.en,
            }}
          >
            {/* {content[i18n.language] || content.en} */}
          </div>
        </div>

        {/* Footer */}
        <div className=" px-6 py-4 flex justify-end sticky bottom-0 bg-white rounded-b-2xl">
          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            I Agree
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
