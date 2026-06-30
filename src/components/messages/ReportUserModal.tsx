import React, { useState } from "react";
import { X, AlertTriangle } from "lucide-react";

interface ReportUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string, details: string) => void;
  partnerName: string;
}

const REPORT_REASONS = [
  "Spam",
  "Inappropriate Content / Nudity",
  "Harassment or Hate Speech",
  "Scam or Fraud",
  "Others",
];

const ReportUserModal: React.FC<ReportUserModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  partnerName,
}) => {
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [details, setDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReason) return;
    
    setIsSubmitting(true);
    try {
      await onSubmit(selectedReason, details);
      // Reset form
      setSelectedReason("");
      setDetails("");
    } finally {
      setIsSubmitting(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-2 text-amber-600">
            <AlertTriangle className="w-5 h-5" />
            <h2 className="text-lg font-semibold text-gray-800">
              Report User
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <p className="text-sm text-gray-600 mb-4">
            You are reporting <strong>{partnerName}</strong>. Please select a reason for your report:
          </p>

          <div className="space-y-3 mb-6">
            {REPORT_REASONS.map((reason) => (
              <label
                key={reason}
                className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                  selectedReason === reason
                    ? "border-amber-500 bg-amber-50"
                    : "border-gray-200 hover:border-amber-200 hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name="reportReason"
                  value={reason}
                  checked={selectedReason === reason}
                  onChange={(e) => setSelectedReason(e.target.value)}
                  className="w-4 h-4 text-amber-600 focus:ring-amber-500 border-gray-300"
                />
                <span className="text-sm font-medium text-gray-700">
                  {reason}
                </span>
              </label>
            ))}
          </div>

          {selectedReason === "Others" && (
            <div className="mb-6 animate-in slide-in-from-top-2 duration-200">
              <label
                htmlFor="details"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Please provide additional details:
              </label>
              <textarea
                id="details"
                rows={3}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Describe the issue..."
                className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none resize-none"
                required
              />
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!selectedReason || isSubmitting}
              className="flex-1 px-4 py-2.5 bg-amber-500 text-white font-medium rounded-xl hover:bg-amber-600 transition-colors disabled:bg-amber-300 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "Submit Report"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportUserModal;
