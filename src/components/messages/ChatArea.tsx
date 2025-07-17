import MessagesList from "./MessagesList";
import MessageInput from "./MessageInput";
import { ChevronLeft, Info } from "lucide-react";

interface Conversation {
  id: number;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  avatar: string;
  online: boolean;
  type: "supplier" | "support";
  rating?: number; // Rating out of 5
}

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
  type: "text";
}

interface ChatAreaProps {
  selectedConversation: Conversation;
  messages: Message[];
  messageInput: string;
  onMessageInputChange: (value: string) => void;
  onSendMessage: () => void;
  onCloseChat: () => void;
  onCall: () => void;
  onToggleInfo?: () => void;
  isVisible: boolean;
}

const ChatArea: React.FC<ChatAreaProps> = ({
  selectedConversation,
  messages,
  messageInput,
  onMessageInputChange,
  onSendMessage,
  onCloseChat, // Add this
  onToggleInfo, // Add this
  isVisible,
}) => {
  return (
    <div
      className={`
      ${isVisible ? "flex" : "hidden"} 
      md:flex flex-1 flex-col
      w-full md:w-2/3 lg:w-3/4 
      bg-white border-x-2 border-[#EAF1FA]`}
    >
      {/** Top bar for mobile view */}
      {/* Mobile header */}
      <div className="md:hidden flex justify-between items-center px-4 py-2 border-b border-[#EAF1FA] bg-white">
        <button
          onClick={onCloseChat}
          className="text-white bg-primary-blue p-1 rounded-full font-medium cursor-pointe"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <p className="text-sm font-semibold text-dark-2 truncate w-full text-center">
          {selectedConversation.name}
        </p>
        <button
          onClick={onToggleInfo}
          className="text-white bg-primary-blue p-2 rounded-full font-medium cursor-pointer"
        >
          <Info className="w-4 h-4" />
        </button>
      </div>

      <MessagesList
        messages={messages}
        otherParticipant={{
          name: selectedConversation.name,
          avatar: selectedConversation.avatar,
        }}
        conversationId={selectedConversation.id}
      />
      <MessageInput
        messageInput={messageInput}
        onMessageInputChange={onMessageInputChange}
        onSendMessage={onSendMessage}
      />
    </div>
  );
};

export default ChatArea;
