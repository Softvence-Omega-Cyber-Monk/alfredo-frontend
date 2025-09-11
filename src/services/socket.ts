// socket.ts
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const initSocket = (userId: string): Socket => {
  if (!socket) {
    console.log("Creating new socket connection for user:", userId);
    socket = io(`${import.meta.env.VITE_BASE_URL}`, {
      query: { userId },
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      console.log(" Connected to socket server with ID:", socket?.id);
    });

    socket.on("disconnect", (reason) => {
      console.log(" Disconnected from socket server. Reason:", reason);
    });

    socket.on("connect_error", (error) => {
      console.error(" Connection error:", error);
    });
  } else {
    console.log("Reusing existing socket connection");
  }

  return socket;
};

export const getSocket = (): Socket => {
  if (!socket) {
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

// Optional cleanup if you want
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
