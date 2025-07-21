export type ConversationType = "supplier" | "support";

export interface Conversation {
  id: number;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  avatar: string;
  online: boolean;
  type: ConversationType;
  rating: number; // Made this required since we always provide it
}

export interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
  type: "text";
}

export interface Conversation {
  id: number;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  avatar: string;
  online: boolean;
  type: ConversationType;
  rating: number;
}

export interface ConversationsListProps {
  conversations: Conversation[];
  selectedConversation: Conversation;
  onSelectConversation: (conversation: Conversation) => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  isVisible: boolean;
  onClose?: () => void;
}

export interface ChatAreaProps {
  selectedConversation: Conversation;
  messages: Message[];
  messageInput: string;
  onMessageInputChange: (value: string) => void;
  onSendMessage: () => void;
  onCall: () => void;
  onCloseChat: () => void;
  isVisible: boolean;
}
