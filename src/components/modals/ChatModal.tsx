import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { X } from "lucide-react";
import { OwnerDetails } from "@/types/PropertyDetails";
import { initSocket, isSocketConnected } from "@/services/socket";

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  owner: OwnerDetails;
}

const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose, owner }) => {
  const [messages, setMessages] = useState<
    { text: string; sender: "me" | "other" }[]
  >([]);
  const [input, setInput] = useState("");
  const [socketReady, setSocketReady] = useState(false);
  const socketRef = useRef<any>(null);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const senderId = user?.id;
  const receiverId = owner?.id;

  console.log("Owner ID: ", senderId, "Receiver ID: ", receiverId);

  useEffect(() => {
    if (!senderId) {
      console.error("No senderId found");
      return;
    }

    const socket = initSocket(senderId);
    socketRef.current = socket;

    const handleConnect = () => {
      console.log("Socket connected in ChatModal:", socket.id);
      setSocketReady(true);
    };

    const handleReceiveMessage = (msg: {
      senderId: string;
      content: string;
    }) => {
      console.log("Received message:", msg);
      setMessages((prev) => [
        ...prev,
        {
          text: msg.content,
          sender: msg.senderId === senderId ? "me" : "other",
        },
      ]);
    };

    const handleError = (error: any) => {
      console.error("Socket error:", error);
    };

    socket.on("connect", handleConnect);
    socket.on("receive_message", handleReceiveMessage);
    socket.on("error", handleError);

    if (isSocketConnected()) {
      setSocketReady(true);
    }

    return () => {
      socket.off("connect", handleConnect);
      socket.off("receive_message", handleReceiveMessage);
      socket.off("error", handleError);
    };
  }, [senderId]);

  const sendMessage = () => {
    if (!input.trim() || !receiverId) {
      console.log("Input or receiverId is empty");
      return;
    }

    if (!socketRef.current) {
      console.error("Socket not available");
      return;
    }

    console.log("Sending message:", input, "to:", receiverId);

    socketRef.current.emit("send_message", {
      senderId: senderId,
      toUserId: receiverId,
      content: input,
    });

    setInput("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-white rounded-2xl shadow-lg w-full max-w-md flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-4 bg-[#3174cd] text-white">
              <h2 className="text-lg font-medium">Chat</h2>
              <button onClick={onClose}>
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-2 bg-gray-50">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.sender === "me" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`px-3 py-2 rounded-xl text-sm max-w-[70%] ${
                      msg.sender === "me"
                        ? "bg-[#3174cd] text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="flex items-center p-3 bg-white">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 border rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[#3174cd]"
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button
                onClick={sendMessage}
                className="ml-2 px-4 py-2 bg-[#3174cd] text-white rounded-full hover:brightness-90 transition"
                disabled={!socketReady}
              >
                Send
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatModal;
