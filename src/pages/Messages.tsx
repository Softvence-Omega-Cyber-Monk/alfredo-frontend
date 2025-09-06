import { useEffect, useState } from "react";
import { Conversation, Message } from "@/components/messages/types";
import ConversationsList from "../components/messages/ConversationsList";
import ChatArea from "../components/messages/ChatArea";
import ChatInfoPanel from "../components/messages/ChatInfoPanel";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  fetchChatHistory,
  addMessage,
} from "@/store/Slices/ChatSlice/ChatSlice";
import { getSocket, initSocket } from "@/services/socket";
import axios from "axios";

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
    console.log("Fetching conversations for userId:", userId);
    const res = await axios.get(
      `https://alfredo-server-n9x6.onrender.com/chat/partners/${userId}`,
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
  const [socketReady, setSocketReady] = useState(false);

  const dispatch = useAppDispatch();
  const { messages } = useAppSelector((state) => state.chat);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user?.id;

  // Fetch conversations
  useEffect(() => {
    if (userId) {
      fetchConversations(userId).then((data) => {
        console.log("Fetched conversationssss:", data);
        setConversations(data);
        if (data.length > 0 && !selectedConversation) {
          setSelectedConversation(data[0]);
        }
      });
    }
  }, [userId]);

  // Initialize WebSocket
  useEffect(() => {
    if (!userId) return;

    const socket = initSocket(userId);

    socket.on("connect", () => {
      setSocketReady(true);
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    socket.on("receive_message", (msg) => {
      dispatch(
        addMessage({
          id: msg.id,
          senderId: msg.senderId,
          receiverId: msg.receiverId,
          content: msg.content,
          createdAt: msg.createdAt,
          exchangeRequestId: msg.exchangeRequestId,
        })
      );
    });

    return () => {
      socket.off("receive_message");
      socket.off("connect");
      socket.off("connect_error");
    };
  }, [userId, dispatch]);

  // Fetch chat history for selected conversation
  useEffect(() => {
    if (selectedConversation && userId) {
      dispatch(fetchChatHistory(selectedConversation.id) as any);
    }
  }, [dispatch, selectedConversation, userId]);

  // Get messages for the selected conversation
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
      .map((msg) => ({
        id: msg.id,
        sender: msg.senderId === userId ? "You" : selectedConversation.name,
        content: msg.content,
        timestamp: new Date(msg.createdAt).toLocaleString(),
        isOwn: msg.senderId === userId,
        type: "text",
      }));
  };

  const handleSendMessage = () => {
    if (!messageInput.trim() || !socketReady || !selectedConversation?.id) {
      return;
    }

    console.log("Sending message to:", selectedConversation.id);

    try {
      const socket = getSocket();
      const messageId = crypto.randomUUID();
      socket.emit("send_message", {
        senderId: userId,
        toUserId: selectedConversation.id,
        content: messageInput,
      });

      // // Optimistic update
      // dispatch(
      //   addMessage({
      //     id: messageId,
      //     senderId: userId,
      //     receiverId: selectedConversation.id,
      //     content: messageInput,
      //     createdAt: new Date().toISOString(),
      //   })
      // );

      setMessageInput("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setCurrentView("chat");
    setShowSidebar(false);
  };

  const handleCall = () => {
    if (selectedConversation) {
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
