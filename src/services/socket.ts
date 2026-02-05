// socket.ts
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;
let currentUserId: string | null = null;

export const initSocket = (userId: string): Socket => {
  // If socket exists but for a different user, disconnect first
  if (socket && currentUserId !== userId) {
    console.log("🔄 Disconnecting old socket for different user");
    socket.disconnect();
    socket = null;
  }

  if (!socket) {
    console.log("🔌 Creating new socket connection for user:", userId);
    currentUserId = userId;

    socket = io(`${import.meta.env.VITE_BASE_URL || window.location.origin}`, {
      query: { userId },
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 10000,
    });

    socket.on("connect", () => {
      console.log("✅ Connected to socket server with ID:", socket?.id);
    });

    socket.on("disconnect", (reason) => {
      console.log("❌ Disconnected from socket server. Reason:", reason);
    });

    socket.on("connect_error", (error) => {
      console.error("❌ Connection error:", error);
    });

    socket.on("reconnect", (attemptNumber) => {
      console.log("🔄 Reconnected after", attemptNumber, "attempts");
    });

    socket.on("reconnect_attempt", (attemptNumber) => {
      console.log("🔄 Reconnection attempt:", attemptNumber);
    });

    socket.on("reconnect_error", (error) => {
      console.error("❌ Reconnection error:", error);
    });

    socket.on("reconnect_failed", () => {
      console.error("❌ Reconnection failed");
    });
  } else {
    console.log("♻️ Reusing existing socket connection");
  }

  return socket;
};

export const getSocket = (): Socket => {
  if (!socket || !socket.connected) {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const userId = user?.id;

    if (userId) {
      return initSocket(userId);
    } else {
      throw new Error("Socket not initialized and no user ID found");
    }
  }
  return socket;
};

export const isSocketConnected = (): boolean => {
  return socket?.connected || false;
};

export const disconnectSocket = () => {
  if (socket) {
    console.log("🔌 Manually disconnecting socket");
    socket.disconnect();
    socket = null;
    currentUserId = null;
  }
};

export const removeSocketListener = (event: string, callback?: Function) => {
  if (socket) {
    if (callback) {
      socket.off(event, callback as any);
    } else {
      socket.off(event);
    }
  }
};
