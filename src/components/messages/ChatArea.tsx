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
  onCall?: () => void;
  onCloseChat?: () => void;
  isVisible: boolean;
}

const ChatArea: React.FC<ChatAreaProps> = ({
  selectedConversation,
  messages,
  messageInput,
  onMessageInputChange,
  onSendMessage,
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
