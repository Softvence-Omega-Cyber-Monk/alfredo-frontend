export type ConversationType = "supplier" | "support";

export interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  avatar: string;
  online: boolean;
  type: ConversationType;
  rating: number;
}

export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
  type?: "text" | "request"; // NEW
  status?: "pending" | "accepted" | "rejected"; // NEW
}

export interface ConversationsListProps {
  conversations: Conversation[];
  selectedConversation: Conversation | null;
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
  onToggleInfo: () => void;
}
