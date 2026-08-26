import api from "@/services/api";
import { CallType } from "@/types/call";

/**
 * STUN-only fallback used when `/webrtc/ice-servers` is unreachable.
 *
 * ⚠️ This is a development stopgap, NOT a shipping configuration. Without TURN
 * relay, roughly 1 in 6 calls fails outright — any peer behind symmetric NAT,
 * carrier-grade NAT (most mobile networks), or a UDP-blocking firewall cannot
 * connect. If you see the console warning below in production, the backend
 * endpoint is broken and calls are silently degraded.
 */
const FALLBACK_ICE_SERVERS: RTCIceServer[] = [
  {
    urls: [
      "stun:stun.cloudflare.com:3478",
      "stun:stun.l.google.com:19302",
    ],
  },
];

/**
 * Fetches short-lived TURN credentials minted by our backend, which proxies
 * Cloudflare Realtime. The Cloudflare key/token never reach the browser.
 */
export const getIceServers = async (): Promise<RTCIceServer[]> => {
  try {
    const { data } = await api.get("/webrtc/ice-servers");
    const iceServers = data?.iceServers;
    if (Array.isArray(iceServers) && iceServers.length > 0) {
      return iceServers;
    }
    console.warn("⚠️ /webrtc/ice-servers returned no servers — using STUN-only fallback");
  } catch (err) {
    console.error(
      "⚠️ Failed to fetch TURN credentials — falling back to STUN only. Calls will fail behind NAT.",
      err
    );
  }
  return FALLBACK_ICE_SERVERS;
};

export const isMediaSupported = (): boolean =>
  typeof navigator !== "undefined" &&
  !!navigator.mediaDevices &&
  typeof navigator.mediaDevices.getUserMedia === "function";

export const getMediaConstraints = (callType: CallType): MediaStreamConstraints => ({
  audio: {
    echoCancellation: true,
    noiseSuppression: true,
    autoGainControl: true,
  },
  video:
    callType === "video"
      ? { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: "user" }
      : false,
});

/** Human-readable reason for a getUserMedia rejection. */
export const describeMediaError = (err: unknown): string => {
  const name = (err as DOMException)?.name;
  switch (name) {
    case "NotAllowedError":
    case "SecurityError":
      return "Camera and microphone access was denied. Enable it in your browser settings to make calls.";
    case "NotFoundError":
    case "OverconstrainedError":
      return "No camera or microphone was found on this device.";
    case "NotReadableError":
      return "Your camera or microphone is already in use by another application.";
    default:
      return "Could not access your camera or microphone.";
  }
};
