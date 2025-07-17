import { useState } from "react";
import { Conversation, Message } from "@/components/messages/types.ts";
import ConversationsList from "../components/messages/ConversationsList";
import ChatArea from "../components/messages/ChatArea";
import ChatInfoPanel from "../components/messages/ChatInfoPanel";

// Sample conversation data
const conversations: Conversation[] = [
  {
    id: 1,
    name: "ElectroHub",
    lastMessage: "Your order has been shipped and is on its way!",
    timestamp: "17 june, 2025  3:50 pm",
    unread: 2,
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face",
    online: true,
    type: "supplier",
    rating: 4.5,
  },
  {
    id: 2,
    name: "TechGear Support",
    lastMessage: "We've processed your refund request",
    timestamp: "1 hour ago",
    unread: 0,
    avatar:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=40&h=40&fit=crop&crop=face",
    online: false,
    type: "support",
    rating: 4.8,
  },
  {
    id: 3,
    name: "ShopSphere",
    lastMessage: "Thank you for your purchase!",
    timestamp: "3 hours ago",
    unread: 1,
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    online: true,
    type: "supplier",
    rating: 4.2,
  },
  {
    id: 4,
    name: "Customer Service",
    lastMessage: "How can we help you today?",
    timestamp: "Yesterday",
    unread: 0,
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b67fcfd4?w=40&h=40&fit=crop&crop=face",
    online: false,
    type: "support",
    rating: 4.9,
  },
];

// Sample messages for each conversation
const conversationMessages: {
  [key: number]: Message[];
} = {
  1: [
    // ElectroHub
    {
      id: 1,
      sender: "ElectroHub",
      content:
        "Hello! Thank you for your order. We're preparing your items for shipment.",
      timestamp: "17 june, 2025, 10:30 AM",
      isOwn: false,
      type: "text",
    },
    {
      id: 2,
      sender: "You",
      content: "Great! When can I expect the delivery?",
      timestamp: "10:35 AM",
      isOwn: true,
      type: "text",
    },
    {
      id: 3,
      sender: "ElectroHub",
      content:
        "Your order has been shipped and is on its way! You should receive it within 2-3 business days. Here's your tracking number: TRK123456789",
      timestamp: "2 min ago",
      isOwn: false,
      type: "text",
    },
    {
      id: 4,
      sender: "You",
      content:
        "Perfect! Thank you for the quick update and tracking information.",
      timestamp: "1 min ago",
      isOwn: true,
      type: "text",
    },
  ],
  2: [
    // TechGear Support
    {
      id: 1,
      sender: "TechGear Support",
      content:
        "Hi there! I see you've submitted a refund request. Let me help you with that.",
      timestamp: "Yesterday, 2:15 PM",
      isOwn: false,
      type: "text",
    },
    {
      id: 2,
      sender: "You",
      content:
        "Yes, I need to return a defective product. The item doesn't match the description.",
      timestamp: "2:18 PM",
      isOwn: true,
      type: "text",
    },
    {
      id: 3,
      sender: "TechGear Support",
      content:
        "I understand your concern. I've reviewed your order and approved the refund. You should see the amount credited to your account within 3-5 business days.",
      timestamp: "2:25 PM",
      isOwn: false,
      type: "text",
    },
    {
      id: 4,
      sender: "You",
      content: "Thank you for the quick resolution!",
      timestamp: "2:26 PM",
      isOwn: true,
      type: "text",
    },
    {
      id: 5,
      sender: "TechGear Support",
      content:
        "We've processed your refund request and sent you an email confirmation.",
      timestamp: "1 hour ago",
      isOwn: false,
      type: "text",
    },
  ],
  3: [
    // ShopSphere
    {
      id: 1,
      sender: "ShopSphere",
      content:
        "Thank you for choosing ShopSphere! Your order #SP12345 has been confirmed.",
      timestamp: "16 june, 2025, 9:45 AM",
      isOwn: false,
      type: "text",
    },
    {
      id: 2,
      sender: "You",
      content:
        "Thanks! Can you tell me more about the warranty for this product?",
      timestamp: "9:50 AM",
      isOwn: true,
      type: "text",
    },
    {
      id: 3,
      sender: "ShopSphere",
      content:
        "Absolutely! This product comes with a 2-year manufacturer warranty covering all defects and malfunctions. You'll also get free support during this period.",
      timestamp: "10:05 AM",
      isOwn: false,
      type: "text",
    },
    {
      id: 4,
      sender: "You",
      content: "Perfect! That's exactly what I needed to know.",
      timestamp: "10:07 AM",
      isOwn: true,
      type: "text",
    },
    {
      id: 5,
      sender: "ShopSphere",
      content:
        "Thank you for your purchase! We hope you love your new product.",
      timestamp: "3 hours ago",
      isOwn: false,
      type: "text",
    },
  ],
  4: [
    // Customer Service
    {
      id: 1,
      sender: "Customer Service",
      content:
        "Hello! Welcome to our customer support. How can we help you today?",
      timestamp: "Yesterday, 11:30 AM",
      isOwn: false,
      type: "text",
    },
    {
      id: 2,
      sender: "You",
      content:
        "Hi! I have a question about my account settings. How do I update my shipping address?",
      timestamp: "11:35 AM",
      isOwn: true,
      type: "text",
    },
    {
      id: 3,
      sender: "Customer Service",
      content:
        "I'd be happy to help you with that! You can update your shipping address by going to 'My Account' > 'Address Book' > 'Edit' next to your current address.",
      timestamp: "11:37 AM",
      isOwn: false,
      type: "text",
    },
    {
      id: 4,
      sender: "You",
      content: "Found it! Thank you so much for the help.",
      timestamp: "11:40 AM",
      isOwn: true,
      type: "text",
    },
    {
      id: 5,
      sender: "Customer Service",
      content:
        "You're welcome! Is there anything else I can help you with today?",
      timestamp: "11:41 AM",
      isOwn: false,
      type: "text",
    },
  ],
};

const Messages = () => {
  const [selectedConversation, setSelectedConversation] =useState<Conversation>(conversations[0]);
  const [messageInput, setMessageInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const [currentView, setCurrentView] = useState<"list" | "chat">("list"); // For mobile navigation
  const [showInfoPanel, setShowInfoPanel] = useState(false);

  // Get messages for the selected conversation
  const getCurrentMessages = () => {
    return (
      conversationMessages[
        selectedConversation.id as keyof typeof conversationMessages
      ] || []
    );
  };

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // Add message logic here
      console.log("Sending message:", messageInput);
      setMessageInput("");
    }
  };

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setCurrentView("chat"); // Switch to chat view on mobile
    setShowSidebar(false);
  };

  const handleCall = () => {
    console.log("Starting call with:", selectedConversation.name);
    // Add call logic here
  };

  const handleCloseChat = () => {
    console.log("Closing chat with:", selectedConversation.name);
    // Add close chat logic here - maybe navigate back or show confirmation
    setCurrentView("list");
  };

  const handleCloseSidebar = () => {
    setShowSidebar(false);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-hidden">
        {/* Mobile view - Show either conversations list or chat */}
        <div className="md:hidden w-full h-full">
          {currentView === "list" ? (
            <ConversationsList
              conversations={conversations}
              selectedConversation={selectedConversation}
              onSelectConversation={handleSelectConversation}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              isVisible={true}
            />
          ) : (
            <ChatArea
              selectedConversation={selectedConversation}
              messages={getCurrentMessages()}
              messageInput={messageInput}
              onMessageInputChange={setMessageInput}
              onSendMessage={handleSendMessage}
              onCall={handleCall}
              onCloseChat={handleCloseChat}
              isVisible={true}
              onToggleInfo={() => setShowInfoPanel(true)}
            />
          )}

          {/* ChatInfoPanel - Slide-up for mobile */}
          {showInfoPanel && (
            <div className="fixed inset-0 bg-black/40 z-50 md:hidden">
              <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4 max-h-[80vh] overflow-y-auto shadow-lg animate-slide-up">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-dark-2">
                    Profile Info
                  </h2>
                  <button
                    className="text-dark-3 font-semibold text-sm"
                    onClick={() => setShowInfoPanel(false)}
                  >
                    ✕ Close
                  </button>
                </div>
                <ChatInfoPanel />
              </div>
            </div>
          )}
        </div>
        {/* Desktop view - Show both panels */}
        <div className="hidden md:flex w-full h-full">
          <ConversationsList
            conversations={conversations}
            selectedConversation={selectedConversation}
            onSelectConversation={handleSelectConversation}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            isVisible={true}
          />

          <ChatArea
            selectedConversation={selectedConversation}
            messages={getCurrentMessages()}
            messageInput={messageInput}
            onMessageInputChange={setMessageInput}
            onSendMessage={handleSendMessage}
            onCall={handleCall}
            onCloseChat={handleCloseChat} // Add this line
            isVisible={true}
            onToggleInfo={() => setShowInfoPanel(true)} // Add this if needed
          />
<div className="w-1/4 xl:w-1/5">

          <ChatInfoPanel />
</div>
        </div>
        {/* Sidebar overlay for mobile (when toggled from chat view) */}
        {showSidebar && (
          <div className="md:hidden">
            <ConversationsList
              conversations={conversations}
              selectedConversation={selectedConversation}
              onSelectConversation={handleSelectConversation}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              isVisible={true}
              onClose={handleCloseSidebar}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
