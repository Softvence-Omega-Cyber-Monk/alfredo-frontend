import { FC, useEffect, useRef } from "react";
import { ChatAreaProps } from "@/components/messages/types";
// import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { fetchMyProperties } from "@/store/Slices/PropertySlice/propertySlice";
// import { Label } from "@/components/ui/label";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import PrimaryButton from "../reusable/PrimaryButton";

const ChatArea: FC<ChatAreaProps> = ({
  selectedConversation,
  messages,
  messageInput,
  onMessageInputChange,
  onSendMessage,
  // onCall,
  // onCloseChat,
  isVisible,
  onToggleInfo,
}) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  // const [selectedProperty, setSelectedProperty] = useState("");
  const { myProperties } = useAppSelector((state) => state.property);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  if (!isVisible) return null;

  useEffect(() => {
    dispatch(fetchMyProperties());
  }, [dispatch]);

  console.log("mahim properties", myProperties);
  // console.log("selected property", selectedProperty);
  console.log(selectedConversation, "selected conversation.....");

  return (
    <AnimatePresence>
      <motion.div
        className="flex-1 flex flex-col bg-gray-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 mt-2 bg-[#3174cd] text-white">
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-medium">{selectedConversation.name}</h2>
            <button onClick={onToggleInfo} className="text-sm">
              Info
            </button>
          </div>
          <div className="flex items-center space-x-2">
            {/* <button onClick={onCall} className="text-sm">
              Call
            </button> */}
            {/* <button onClick={onCloseChat}>
              <X className="w-6 h-6" />
            </button> */}
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
