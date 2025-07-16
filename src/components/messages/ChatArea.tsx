import React from "react";
import MessagesList from "./MessagesList";
import MessageInput from "./MessageInput";

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
  onCloseChat,  // Add this
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
          className="text-primary-blue font-medium text-sm"
        >
          ← Back
        </button>
        <p className="text-sm font-semibold text-dark-2 truncate w-full text-center">
          {selectedConversation.name}
        </p>
        <button
          onClick={onToggleInfo}
          className="text-primary-blue text-sm font-medium"
        >
          ℹ️
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