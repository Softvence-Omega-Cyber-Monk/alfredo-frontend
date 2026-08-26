export type CallType = "audio" | "video";

export type CallStatus =
  | "idle"
  | "outgoing" // we called, waiting for them to pick up
  | "incoming" // they called, we haven't answered
  | "connecting" // answered, negotiating the peer connection
  | "active" // media flowing
  | "ended";

export interface CallPeer {
  id: string;
  name: string;
  avatar?: string;
}

export interface IncomingCallPayload {
  callId: string;
  fromUserId: string;
  callerName: string;
  callerAvatar?: string;
  callType: CallType;
}

export interface SdpPayload {
  callId: string;
  sdp: RTCSessionDescriptionInit;
}

export interface IceCandidatePayload {
  callId: string;
  candidate: RTCIceCandidateInit;
}

export interface CallEndedPayload {
  callId: string;
  reason?: string;
}
