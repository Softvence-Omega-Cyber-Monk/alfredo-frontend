import { useEffect, useState, useRef } from "react";
import { Conversation, Message } from "@/components/messages/types";
import ConversationsList from "../components/messages/ConversationsList";
import ChatArea from "../components/messages/ChatArea";
import ChatInfoPanel from "../components/messages/ChatInfoPanel";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  fetchChatHistory,
  addMessage,
} from "@/store/Slices/ChatSlice/ChatSlice";
import { initSocket } from "@/services/socket";
import { Socket } from "socket.io-client"; // ADD THIS IMPORT
import axios from "axios";
import { toast } from "sonner"; // ADD THIS IMPORT

// Map API response to Conversation type
const mapApiToConversation = (apiConv: any): Conversation => ({
  id: apiConv.id,
  name: apiConv.fullName,
  lastMessage: apiConv.lastMessage?.content || "",
  timestamp: apiConv.lastMessage?.createdAt || "",
  unread: 0, // You can update this if you have unread info
  avatar: apiConv.photo || "/defaultAvatar.png",
  online: false, // Update if you have online info
  type: "supplier", // Or "support" if needed
  rating: 0, // Update if you have rating info
});
const token = localStorage.getItem("token");
// Fetch conversations from /chat/partners/{userId}
const fetchConversations = async (userId: string): Promise<Conversation[]> => {
  try {
    // console.log("Fetching conversations for userId:", userId);
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/chat/partners/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (Array.isArray(res.data)) {
      return res.data.map(mapApiToConversation);
    }
    return [];
  } catch (err) {
    console.error("Failed to fetch conversations:", err);
    return [];
  }
};

const Messages = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const [currentView, setCurrentView] = useState<"list" | "chat">("list");
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [, setSocketReady] = useState(false);

  const dispatch = useAppDispatch();
  const { messages } = useAppSelector((state) => state.chat);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user?.id;

  // ADD THIS REF
  const socketRef = useRef<Socket | null>(null);

  // Fetch conversations
  useEffect(() => {
    if (userId) {
      fetchConversations(userId).then((data) => {
        console.log("📋 Fetched conversations:", data);
        setConversations(data);
        if (data.length > 0 && !selectedConversation) {
          setSelectedConversation(data[0]);
        }
      });
    }
  }, [userId]);

  // Initialize WebSocket
  useEffect(() => {
    if (!userId) {
      console.error("❌ No userId found");
      return;
    }

    console.log("🔌 Initializing socket in Messages for user:", userId);
    const socket = initSocket(userId);
    socketRef.current = socket; // STORE IN REF

    const handleConnect = () => {
      console.log("✅ Socket connected in Messages:", socket.id);
      setSocketReady(true);
    };

    const handleConnectError = (error: any) => {
      console.error("❌ Socket connection error:", error);
      setSocketReady(false);
    };

    const handleDisconnect = (reason: string) => {
      console.log("❌ Socket disconnected in Messages:", reason);
      setSocketReady(false);
    };

    const handleReceiveMessage = (msg: any) => {
      console.log("📩 Received message in Messages:", msg);

      // Check if message already exists to prevent duplicates
      const messageExists = messages.some((m) => m.id === msg.id);
      if (!messageExists) {
        dispatch(
          addMessage({
            id: msg.id || `${Date.now()}-${Math.random()}`,
            senderId: msg.senderId,
            receiverId: msg.receiverId,
            content: msg.content,
            createdAt: msg.createdAt || new Date().toISOString(),
            exchangeRequestId: msg.exchangeRequestId,
          })
        );
      }
    };

    // Remove existing listeners to avoid duplicates
    socket.off("connect");
    socket.off("connect_error");
    socket.off("disconnect");
    socket.off("receive_message");

    // Add fresh listeners
    socket.on("connect", handleConnect);
    socket.on("connect_error", handleConnectError);
    socket.on("disconnect", handleDisconnect);
    socket.on("receive_message", handleReceiveMessage);

    // Check if already connected
    if (socket.connected) {
      console.log("✅ Socket already connected on mount");
      setSocketReady(true);
    }

    return () => {
      console.log("🧹 Cleaning up socket listeners in Messages");
      socket.off("receive_message", handleReceiveMessage);
      socket.off("connect", handleConnect);
      socket.off("connect_error", handleConnectError);
      socket.off("disconnect", handleDisconnect);
    };
  }, [userId, dispatch]); // Remove 'messages' from dependencies

  // Fetch chat history for selected conversation
  useEffect(() => {
    if (selectedConversation && userId) {
      console.log("📜 Fetching chat history for:", selectedConversation.id);
      dispatch(fetchChatHistory(selectedConversation.id) as any);
    }
  }, [dispatch, selectedConversation, userId]);

  // Get messages for the selected conversation
  // ...existing code...
  const getCurrentMessages = (): Message[] => {
    if (!selectedConversation) return [];
    return messages
      .filter(
        (msg) =>
          (msg.senderId === userId &&
            msg.receiverId === selectedConversation.id) ||
          (msg.senderId === selectedConversation.id &&
            msg.receiverId === userId)
      )
      .map(
        (msg): Message => ({
          id: msg.id,
          sender: msg.senderId === userId ? "You" : selectedConversation.name,
          content: msg.content,
          timestamp: new Date(msg.createdAt).toLocaleString(),
          isOwn: msg.senderId === userId,
          type: "text", // now enforced by the explicit Message return type
        })
      )
      .sort(
        (a, b) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      ); // Sort by timestamp
  };
  // ...existing code...

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedConversation?.id) {
      console.log("❌ Cannot send: empty message or no conversation selected");
      return;
    }

    // USE SOCKET REF INSTEAD OF getSocket()
    const socket = socketRef.current;

    if (!socket) {
      console.error("❌ Socket not initialized");
      toast.error("Connection not established. Please refresh the page.");
      return;
    }

    if (!socket.connected) {
      console.error("❌ Socket is not connected");
      console.log("Socket state:", {
        connected: socket.connected,
        id: socket.id,
      });
      toast.error("Connection lost. Please refresh the page.");
      return;
    }

    console.log("📤 Sending message:", {
      to: selectedConversation.id,
      content: messageInput.substring(0, 50) + "...",
      socketId: socket.id,
    });

    try {
      socket.emit("send_message", {
        senderId: userId,
        toUserId: selectedConversation.id,
        content: messageInput,
      });

      console.log("✅ Message emitted successfully");
      setMessageInput("");
    } catch (error) {
      console.error("❌ Error sending message:", error);
      toast.error("Failed to send message. Please try again.");
    }
  };

  const handleSelectConversation = (conversation: Conversation) => {
    console.log("👤 Selected conversation:", conversation.name);
    setSelectedConversation(conversation);
    setCurrentView("chat");
    setShowSidebar(false);
  };

  const handleCall = () => {
    if (selectedConversation) {
      console.log("📞 Calling:", selectedConversation.name);
      // Add call logic here
    }
  };

  const handleCloseChat = () => {
    setCurrentView("list");
  };

  const handleCloseSidebar = () => {
    setShowSidebar(false);
  };

  return (
    <div className="flex flex-col lg:h-[90vh] shadow-lg overflow-hidden bg-white">
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
          ) : selectedConversation ? (
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
          ) : null}

          {/* ChatInfoPanel - Slide-up for mobile */}
          {showInfoPanel && selectedConversation && (
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
          {selectedConversation ? (
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
          ) : null}
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
