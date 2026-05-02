import { FC, useEffect, useRef } from "react";
import { ChatAreaProps } from "@/components/messages/types";
import { ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch } from "@/hooks/useRedux";
import { fetchMyProperties } from "@/store/Slices/PropertySlice/propertySlice";

const ChatArea: FC<ChatAreaProps> = ({
  selectedConversation,
  messages,
  messageInput,
  onMessageInputChange,
  onSendMessage,
  // onCall,
  onCloseChat,
  isVisible,
  onToggleInfo,
}) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    dispatch(fetchMyProperties());
  }, [dispatch]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="flex-1 flex flex-col bg-gray-50 h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 bg-[#3174cd] text-white sticky top-0 z-10">
          <div className="flex items-center space-x-2">
            <button 
              onClick={onCloseChat} 
              className="md:hidden p-1 -ml-2 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Back to messages"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-medium truncate max-w-[150px] sm:max-w-xs">
              {selectedConversation.name}
            </h2>
            <button 
              onClick={onToggleInfo} 
              className="text-xs bg-white/20 px-2 py-1 rounded hover:bg-white/30 transition-colors"
            >
              Info
            </button>
          </div>
          <div className="flex items-center space-x-2">
            {/* Additional header actions can go here */}
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
          <div ref={bottomRef} />
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
