import { motion, AnimatePresence } from "framer-motion";
import { Phone, PhoneOff, Video } from "lucide-react";
import { useCall } from "@/contexts/CallContext";
import { useRingtone } from "@/hooks/useRingtone";

const IncomingCallModal = () => {
  const { status, callType, peer, acceptCall, rejectCall } = useCall();
  const isRinging = status === "incoming";

  useRingtone(isRinging);

  return (
    <AnimatePresence>
      {isRinging && peer && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-sm rounded-3xl bg-white p-8 text-center shadow-2xl"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 22, stiffness: 300 }}
          >
            <div className="relative mx-auto w-24 h-24">
              <motion.span
                className="absolute inset-0 rounded-full bg-primary-blue/30"
                animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
              />
              <img
                src={peer.avatar || "/defaultAvatar.png"}
                alt={peer.name}
                className="relative w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
            </div>

            <h3 className="mt-5 text-xl font-semibold text-primary-blue">
              {peer.name}
            </h3>
            <p className="mt-1 flex items-center justify-center gap-1.5 text-sm text-dark-3">
              {callType === "video" ? (
                <Video className="w-4 h-4" />
              ) : (
                <Phone className="w-4 h-4" />
              )}
              Incoming {callType} call…
            </p>

            <div className="mt-8 flex items-center justify-center gap-10">
              <button
                type="button"
                onClick={rejectCall}
                aria-label="Decline call"
                className="flex flex-col items-center gap-2 cursor-pointer group"
              >
                <span className="w-14 h-14 rounded-full bg-red-600 group-hover:bg-red-700 text-white flex items-center justify-center transition-colors shadow-lg active:scale-95">
                  <PhoneOff className="w-6 h-6" />
                </span>
                <span className="text-xs text-dark-2">Decline</span>
              </button>

              <button
                type="button"
                onClick={acceptCall}
                aria-label="Accept call"
                className="flex flex-col items-center gap-2 cursor-pointer group"
              >
                <motion.span
                  className="w-14 h-14 rounded-full bg-emerald-600 group-hover:bg-emerald-700 text-white flex items-center justify-center transition-colors shadow-lg active:scale-95"
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                >
                  {callType === "video" ? (
                    <Video className="w-6 h-6" />
                  ) : (
                    <Phone className="w-6 h-6" />
                  )}
                </motion.span>
                <span className="text-xs text-dark-2">Accept</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IncomingCallModal;
