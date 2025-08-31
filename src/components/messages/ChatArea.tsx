import { FC } from "react";
import { ChatAreaProps } from "@/components/messages/types";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ChatArea: FC<ChatAreaProps> = ({
  selectedConversation,
  messages,
  messageInput,
  onMessageInputChange,
  onSendMessage,
  onCall,
  onCloseChat,
  isVisible,
  onToggleInfo,
}) => {
  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="flex-1 flex flex-col bg-gray-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 bg-[#3174cd] text-white">
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-medium">{selectedConversation.name}</h2>
            <button onClick={onToggleInfo} className="text-sm">
              Info
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={onCall} className="text-sm">
              Call
            </button>
            <button onClick={onCloseChat}>
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-3 py-2 rounded-xl text-sm max-w-[70%] ${
                  msg.isOwn
                    ? "bg-[#3174cd] text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                <p>{msg.content}</p>
                <p className="text-xs opacity-70 mt-1">{msg.timestamp}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="flex items-center p-3 bg-white">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => onMessageInputChange(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[#3174cd]"
            onKeyDown={(e) => e.key === "Enter" && onSendMessage()}
          />
          <button
            onClick={onSendMessage}
            className="ml-2 px-4 py-2 bg-[#3174cd] text-white rounded-full hover:brightness-90 transition"
          >
            Send
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ChatArea;
