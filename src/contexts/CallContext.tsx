import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  ReactNode,
} from "react";
import { Socket } from "socket.io-client";
import { toast } from "sonner";
import { initSocket } from "@/services/socket";
import {
  describeMediaError,
  getIceServers,
  getMediaConstraints,
  isMediaSupported,
} from "@/services/webrtc";
import { useAppSelector } from "@/hooks/useRedux";
import {
  CallPeer,
  CallStatus,
  CallType,
  CallEndedPayload,
  IceCandidatePayload,
  IncomingCallPayload,
  SdpPayload,
} from "@/types/call";

/** How long we ring before giving up on an unanswered call. */
const RING_TIMEOUT_MS = 45_000;
/** How long the "Call ended" screen lingers before returning to idle. */
const ENDED_SCREEN_MS = 1_200;

interface CallContextValue {
  status: CallStatus;
  callType: CallType;
  peer: CallPeer | null;
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  isMuted: boolean;
  isCameraOff: boolean;
  startCall: (peer: CallPeer, callType: CallType) => Promise<void>;
  acceptCall: () => Promise<void>;
  rejectCall: () => void;
  hangUp: (reason?: string) => void;
  toggleMute: () => void;
  toggleCamera: () => void;
}

const CallContext = createContext<CallContextValue | null>(null);

export const useCall = (): CallContextValue => {
  const ctx = useContext(CallContext);
  if (!ctx) throw new Error("useCall must be used within a <CallProvider>");
  return ctx;
};

export const CallProvider = ({ children }: { children: ReactNode }) => {
  const [status, setStatus] = useState<CallStatus>("idle");
  const [callType, setCallType] = useState<CallType>("audio");
  const [peer, setPeer] = useState<CallPeer | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);

  const authUser = useAppSelector((state) => state.auth.user);
  const userId =
    authUser?.id || JSON.parse(localStorage.getItem("user") || "{}")?.id;

  const socketRef = useRef<Socket | null>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const callIdRef = useRef<string | null>(null);
  const ringTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const endedTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ICE candidates routinely arrive before setRemoteDescription() has run.
  // addIceCandidate() throws if called that early, so we buffer and flush.
  const pendingCandidatesRef = useRef<RTCIceCandidateInit[]>([]);
  // Likewise the offer can beat our peer connection into existence.
  const pendingOfferRef = useRef<RTCSessionDescriptionInit | null>(null);

  // Mirror of `status` readable from inside socket listeners without re-binding them.
  const statusRef = useRef<CallStatus>("idle");
  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  const clearTimers = useCallback(() => {
    if (ringTimeoutRef.current) {
      clearTimeout(ringTimeoutRef.current);
      ringTimeoutRef.current = null;
    }
    if (endedTimeoutRef.current) {
      clearTimeout(endedTimeoutRef.current);
      endedTimeoutRef.current = null;
    }
  }, []);

  /** Releases camera/mic and tears down the peer connection. Always safe to call. */
  const releaseResources = useCallback(() => {
    localStreamRef.current?.getTracks().forEach((track) => track.stop());
    localStreamRef.current = null;

    const pc = pcRef.current;
    if (pc) {
      pc.onicecandidate = null;
      pc.ontrack = null;
      pc.onconnectionstatechange = null;
      pc.close();
      pcRef.current = null;
    }

    pendingCandidatesRef.current = [];
    pendingOfferRef.current = null;
    callIdRef.current = null;
  }, []);

  const teardown = useCallback(
    (showEndedScreen: boolean) => {
      clearTimers();
      releaseResources();
      setLocalStream(null);
      setRemoteStream(null);
      setIsMuted(false);
      setIsCameraOff(false);

      if (showEndedScreen) {
        setStatus("ended");
        endedTimeoutRef.current = setTimeout(() => {
          setStatus("idle");
          setPeer(null);
        }, ENDED_SCREEN_MS);
      } else {
        setStatus("idle");
        setPeer(null);
      }
    },
    [clearTimers, releaseResources]
  );

  const hangUp = useCallback(
    (reason = "hangup") => {
      const callId = callIdRef.current;
      if (callId && socketRef.current?.connected) {
        socketRef.current.emit("call:end", { callId, reason });
      }
      teardown(true);
    },
    [teardown]
  );

  // Held in a ref so `createPeerConnection` can reach it without a circular dep.
  const hangUpRef = useRef(hangUp);
  useEffect(() => {
    hangUpRef.current = hangUp;
  }, [hangUp]);

  const flushPendingCandidates = useCallback(async (pc: RTCPeerConnection) => {
    const candidates = pendingCandidatesRef.current;
    pendingCandidatesRef.current = [];
    for (const candidate of candidates) {
      try {
        await pc.addIceCandidate(candidate);
      } catch (err) {
        console.error("Failed to add buffered ICE candidate:", err);
      }
    }
  }, []);

  const createPeerConnection = useCallback(
    async (stream: MediaStream): Promise<RTCPeerConnection> => {
      const iceServers = await getIceServers();
      const pc = new RTCPeerConnection({ iceServers });

      stream.getTracks().forEach((track) => pc.addTrack(track, stream));

      pc.onicecandidate = (event) => {
        if (event.candidate && callIdRef.current) {
          socketRef.current?.emit("call:ice-candidate", {
            callId: callIdRef.current,
            candidate: event.candidate.toJSON(),
          });
        }
      };

      pc.ontrack = (event) => {
        if (event.streams[0]) setRemoteStream(event.streams[0]);
      };

      pc.onconnectionstatechange = () => {
        switch (pc.connectionState) {
          case "connected":
            if (ringTimeoutRef.current) {
              clearTimeout(ringTimeoutRef.current);
              ringTimeoutRef.current = null;
            }
            setStatus("active");
            break;
          case "failed":
            toast.error("Call connection failed.");
            hangUpRef.current("connection-failed");
            break;
          case "disconnected":
            // Transient — the ICE agent may recover on its own. Don't tear down.
            break;
        }
      };

      pcRef.current = pc;
      return pc;
    },
    []
  );

  const requestMedia = useCallback(
    async (type: CallType): Promise<MediaStream | null> => {
      if (!isMediaSupported()) {
        toast.error("Calling requires a secure (HTTPS) connection.");
        return null;
      }
      try {
        return await navigator.mediaDevices.getUserMedia(getMediaConstraints(type));
      } catch (err) {
        toast.error(describeMediaError(err));
        return null;
      }
    },
    []
  );

  const startCall = useCallback(
    async (target: CallPeer, type: CallType) => {
      if (statusRef.current !== "idle") {
        toast.warning("You're already in a call.");
        return;
      }
      const socket = socketRef.current;
      if (!socket?.connected) {
        toast.error("Not connected to the server. Please refresh and try again.");
        return;
      }

      const stream = await requestMedia(type);
      if (!stream) return;

      const callId =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

      callIdRef.current = callId;
      localStreamRef.current = stream;
      setLocalStream(stream);
      setCallType(type);
      setPeer(target);
      setStatus("outgoing");

      socket.emit("call:initiate", {
        callId,
        toUserId: target.id,
        callType: type,
      });

      ringTimeoutRef.current = setTimeout(() => {
        toast.info(`${target.name} didn't answer.`);
        hangUpRef.current("no-answer");
      }, RING_TIMEOUT_MS);
    },
    [requestMedia]
  );

  const acceptCall = useCallback(async () => {
    const socket = socketRef.current;
    const callId = callIdRef.current;
    if (!socket?.connected || !callId) return;

    const stream = await requestMedia(callType);
    if (!stream) {
      socket.emit("call:reject", { callId, reason: "media-error" });
      teardown(false);
      return;
    }

    localStreamRef.current = stream;
    setLocalStream(stream);
    setStatus("connecting");

    const pc = await createPeerConnection(stream);

    // If the caller's offer arrived while we were acquiring media, handle it now.
    const bufferedOffer = pendingOfferRef.current;
    if (bufferedOffer) {
      pendingOfferRef.current = null;
      await pc.setRemoteDescription(bufferedOffer);
      await flushPendingCandidates(pc);
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      socket.emit("call:answer", { callId, sdp: answer });
    }

    socket.emit("call:accept", { callId });
  }, [callType, createPeerConnection, flushPendingCandidates, requestMedia, teardown]);

  const rejectCall = useCallback(() => {
    const callId = callIdRef.current;
    if (callId && socketRef.current?.connected) {
      socketRef.current.emit("call:reject", { callId, reason: "declined" });
    }
    teardown(false);
  }, [teardown]);

  const toggleMute = useCallback(() => {
    const track = localStreamRef.current?.getAudioTracks()[0];
    if (!track) return;
    track.enabled = !track.enabled;
    setIsMuted(!track.enabled);
  }, []);

  const toggleCamera = useCallback(() => {
    const track = localStreamRef.current?.getVideoTracks()[0];
    if (!track) return;
    track.enabled = !track.enabled;
    setIsCameraOff(!track.enabled);
  }, []);

  // ── Signaling ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!userId) return;

    const socket = initSocket(userId);
    socketRef.current = socket;

    const onIncoming = (payload: IncomingCallPayload) => {
      // Already busy — auto-decline so the caller isn't left ringing.
      if (statusRef.current !== "idle") {
        socket.emit("call:reject", { callId: payload.callId, reason: "busy" });
        return;
      }
      callIdRef.current = payload.callId;
      setCallType(payload.callType);
      setPeer({
        id: payload.fromUserId,
        name: payload.callerName,
        avatar: payload.callerAvatar,
      });
      setStatus("incoming");
    };

    // Callee picked up — we're the caller, so we own the offer.
    const onAccepted = async () => {
      const stream = localStreamRef.current;
      const callId = callIdRef.current;
      if (!stream || !callId) return;

      if (ringTimeoutRef.current) {
        clearTimeout(ringTimeoutRef.current);
        ringTimeoutRef.current = null;
      }
      setStatus("connecting");

      try {
        const pc = await createPeerConnection(stream);
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        socket.emit("call:offer", { callId, sdp: offer });
      } catch (err) {
        console.error("Failed to create offer:", err);
        toast.error("Could not start the call.");
        hangUpRef.current("offer-failed");
      }
    };

    const onOffer = async ({ sdp }: SdpPayload) => {
      const pc = pcRef.current;
      if (!pc) {
        // We haven't finished accepting yet — acceptCall() will pick this up.
        pendingOfferRef.current = sdp;
        return;
      }
      try {
        await pc.setRemoteDescription(sdp);
        await flushPendingCandidates(pc);
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        socket.emit("call:answer", { callId: callIdRef.current, sdp: answer });
      } catch (err) {
        console.error("Failed to answer offer:", err);
        hangUpRef.current("answer-failed");
      }
    };

    const onAnswer = async ({ sdp }: SdpPayload) => {
      const pc = pcRef.current;
      if (!pc) return;
      try {
        await pc.setRemoteDescription(sdp);
        await flushPendingCandidates(pc);
      } catch (err) {
        console.error("Failed to apply answer:", err);
        hangUpRef.current("answer-failed");
      }
    };

    const onIceCandidate = async ({ candidate }: IceCandidatePayload) => {
      const pc = pcRef.current;
      if (pc?.remoteDescription) {
        try {
          await pc.addIceCandidate(candidate);
        } catch (err) {
          console.error("Failed to add ICE candidate:", err);
        }
      } else {
        pendingCandidatesRef.current.push(candidate);
      }
    };

    const onRejected = ({ reason }: CallEndedPayload) => {
      if (reason === "busy") toast.info("They're on another call.");
      else if (reason === "media-error") toast.info("They couldn't access their microphone.");
      else toast.info("Call declined.");
      teardown(true);
    };

    const onEnded = ({ reason }: CallEndedPayload) => {
      if (reason === "no-answer") toast.info("No answer.");
      teardown(true);
    };

    const onUnavailable = () => {
      toast.info("They're offline right now.");
      teardown(false);
    };

    socket.on("call:incoming", onIncoming);
    socket.on("call:accepted", onAccepted);
    socket.on("call:offer", onOffer);
    socket.on("call:answer", onAnswer);
    socket.on("call:ice-candidate", onIceCandidate);
    socket.on("call:rejected", onRejected);
    socket.on("call:ended", onEnded);
    socket.on("call:unavailable", onUnavailable);

    return () => {
      socket.off("call:incoming", onIncoming);
      socket.off("call:accepted", onAccepted);
      socket.off("call:offer", onOffer);
      socket.off("call:answer", onAnswer);
      socket.off("call:ice-candidate", onIceCandidate);
      socket.off("call:rejected", onRejected);
      socket.off("call:ended", onEnded);
      socket.off("call:unavailable", onUnavailable);
    };
  }, [userId, createPeerConnection, flushPendingCandidates, teardown]);

  // Release the camera/mic if the app unmounts mid-call.
  useEffect(() => releaseResources, [releaseResources]);

  // Warn before a refresh drops an active call.
  useEffect(() => {
    if (status !== "active" && status !== "connecting") return;
    const handler = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [status]);

  const value = useMemo<CallContextValue>(
    () => ({
      status,
      callType,
      peer,
      localStream,
      remoteStream,
      isMuted,
      isCameraOff,
      startCall,
      acceptCall,
      rejectCall,
      hangUp,
      toggleMute,
      toggleCamera,
    }),
    [
      status,
      callType,
      peer,
      localStream,
      remoteStream,
      isMuted,
      isCameraOff,
      startCall,
      acceptCall,
      rejectCall,
      hangUp,
      toggleMute,
      toggleCamera,
    ]
  );

  return <CallContext.Provider value={value}>{children}</CallContext.Provider>;
};
