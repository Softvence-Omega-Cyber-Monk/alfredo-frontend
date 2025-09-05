// "use client";

// import { useState, useEffect, useRef } from "react";
// import { io, Socket } from "socket.io-client";

// let socket: Socket;

// export default function ChatPage() {
//   const USER_ID = "11a0f78a-e313-401c-9564-dfd274336717"; // sender
//   const RECIPIENT_ID = "68e4f02e-b7ea-4cf8-8cfd-77f953605588"; // receiver

//   const [chatMessage, setChatMessage] = useState("");
//   const [chatLog, setChatLog] = useState<
//     { senderId: string; content: string; read: boolean }[]
//   >([]);
//   const chatInputRef = useRef<HTMLInputElement>(null);
//   const chatEndRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     // Initialize socket connection
//     socket = io("https://alfredo-server-n9x6.onrender.com", {
//       query: { userId: USER_ID },
//     });

//     socket.on("connect", () => console.log("✅ Connected:", socket.id));
//     socket.on("disconnect", () => console.log("⚠️ Disconnected"));

//     // Listen for messages from server (saved messages only)
//     socket.on(
//       "receive_message",
//       (msg: { senderId: string; content: string }) => {
//         setChatLog((prev) => [...prev, { ...msg, read: false }]);
//       }
//     );

//     socket.on("error", (err: { message: string }) => {
//       console.error("Socket error:", err.message);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   const sendMessage = () => {
//     if (!chatMessage.trim()) return;

//     // Send to backend; backend will save and emit back
//     socket.emit("send_message", {
//       senderId: USER_ID,
//       toUserId: RECIPIENT_ID,
//       content: chatMessage,
//     });

//     // Do NOT add locally; wait for backend to confirm saved message
//     setChatMessage("");
//     chatInputRef.current?.focus();
//   };

//   // Auto-scroll and mark messages as read
//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });

//     setChatLog((prev) =>
//       prev.map((msg) =>
//         msg.senderId !== USER_ID ? { ...msg, read: true } : msg
//       )
//     );
//   }, [chatLog]);

//   return (
//     <div className="min-h-screen flex flex-col justify-between bg-gray-100 p-4 max-w-md mx-auto">
//       {/* Chat Log */}
//       <div className="bg-white shadow-lg rounded-xl p-4 overflow-y-auto flex-1 mb-4 max-h-[70vh] space-y-2">
//         {chatLog.map((msg, idx) => (
//           <div
//             key={idx}
//             className={`text-sm p-2 rounded max-w-[80%] flex flex-col ${
//               msg.senderId === USER_ID
//                 ? "bg-green-100 text-green-900 self-end ml-auto"
//                 : "bg-gray-200 text-gray-800 self-start"
//             }`}
//           >
//             <span className="font-semibold">
//               {msg.senderId === USER_ID ? "You" : msg.senderId}:
//             </span>{" "}
//             {msg.content}
//             {!msg.read && (
//               <span className="text-xs text-gray-500 italic mt-1">New</span>
//             )}
//           </div>
//         ))}
//         <div ref={chatEndRef} />
//       </div>

//       {/* Message Input */}
//       <div className="flex space-x-2">
//         <input
//           ref={chatInputRef}
//           type="text"
//           placeholder="Type your message..."
//           value={chatMessage}
//           onChange={(e) => setChatMessage(e.target.value)}
//           onKeyDown={(e) => {
//             if (e.key === "Enter") {
//               e.preventDefault();
//               sendMessage();
//             }
//           }}
//           className="flex-1 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none transition"
//         />
//         <button
//           onClick={sendMessage}
//           className="bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }
