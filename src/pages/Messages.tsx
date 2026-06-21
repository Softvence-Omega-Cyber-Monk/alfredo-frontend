import { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Conversation, Message } from "@/components/messages/types";
import ConversationsList from "../components/messages/ConversationsList";
import ChatArea from "../components/messages/ChatArea";
import ChatInfoPanel from "../components/messages/ChatInfoPanel";
import DeleteChatModal from "../components/messages/DeleteChatModal";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  fetchChatHistory,
  addMessage,
  updateMessageStatus,
} from "@/store/Slices/ChatSlice/ChatSlice";
import { initSocket } from "@/services/socket";
import { Socket } from "socket.io-client";
import axios from "axios";
import { toast } from "sonner";

// Map API response to Conversation type
const mapApiToConversation = (apiConv: any): Conversation => ({
  id: apiConv.id,
  name: apiConv.fullName,
  lastMessage: apiConv.lastMessage?.content || "",
  timestamp: apiConv.lastMessage?.createdAt || "",
  unread: 0,
  avatar: apiConv.photo || "/defaultAvatar.png",
  online: false,
  type: "supplier",
  rating: 0,
  email: apiConv.email || "",
  location: apiConv.onboarding?.homeAddress || "Location not provided",
  achievementBadges: apiConv.achievementBadges || [],
  isSubscribed: apiConv.isSubscribed || false,
});

const token = localStorage.getItem("token");

// Fetch conversations from /chat/partners/{userId}
const fetchConversations = async (userId: string): Promise<Conversation[]> => {
  try {
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
  const [searchParams] = useSearchParams();
  const targetUserId = searchParams.get("userId");
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { messages } = useAppSelector((state) => state.chat);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user?.id;
  const isSubscribed = user?.isSubscribed;

  const socketRef = useRef<Socket | null>(null);
  const selectedConversationRef = useRef<Conversation | null>(null);

  // States for new features
  const [blockedUserIds, setBlockedUserIds] = useState<string[]>([]);
  const [blockedByThemIds, setBlockedByThemIds] = useState<string[]>([]);
  const [receivedMessagesCount, setReceivedMessagesCount] = useState<number>(0);

  // Delete Chat Modal State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletePartnerId, setDeletePartnerId] = useState("");
  const [deletePartnerName, setDeletePartnerName] = useState("");

  // Keep ref updated to avoid stale closures in socket listener
  useEffect(() => {
    selectedConversationRef.current = selectedConversation;
  }, [selectedConversation]);

  // Load blocked list on mount
  const loadBlockedList = async () => {
    if (!userId) return;
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/chat/block/list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (Array.isArray(res.data)) {
        setBlockedUserIds(res.data.map((u: any) => u.blockedId));
      }
    } catch (err) {
      console.error("Failed to fetch blocked users:", err);
    }
  };

  useEffect(() => {
    if (userId) {
      loadBlockedList();
    }
  }, [userId]);

  // Check block status and received count when conversation changes
  useEffect(() => {
    if (selectedConversation && userId) {
      checkBlockStatus(selectedConversation.id);
      fetchReceivedCount(selectedConversation.id);

      // Emit mark_read socket event when selecting conversation
      const socket = socketRef.current;
      if (socket && socket.connected) {
        socket.emit("mark_read", {
          userId: userId,
          senderId: selectedConversation.id,
        });
      }
    }
  }, [selectedConversation, userId]);

  const checkBlockStatus = async (targetId: string) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/chat/block/check/${targetId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { blockedByMe, blockedByThem } = res.data;

      setBlockedUserIds((prev) =>
        blockedByMe ? [...prev.filter((id) => id !== targetId), targetId] : prev.filter((id) => id !== targetId)
      );

      setBlockedByThemIds((prev) =>
        blockedByThem ? [...prev.filter((id) => id !== targetId), targetId] : prev.filter((id) => id !== targetId)
      );
    } catch (err) {
      console.error("Failed to check block status:", err);
    }
  };

  const fetchReceivedCount = async (targetId: string) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/chat/received-count/${targetId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReceivedMessagesCount(res.data.count);
    } catch (err) {
      console.error("Failed to fetch received message count:", err);
    }
  };

  const handleBlockUser = async (targetId: string) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/chat/block/${targetId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("User blocked successfully");
      loadBlockedList();
      if (selectedConversation?.id === targetId) {
        checkBlockStatus(targetId);
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to block user");
    }
  };

  const handleUnblockUser = async (targetId: string) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/chat/block/${targetId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("User unblocked successfully");
      loadBlockedList();
      if (selectedConversation?.id === targetId) {
        checkBlockStatus(targetId);
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to unblock user");
    }
  };

  const handleDeleteChatClick = (partnerId: string, partnerName: string) => {
    setDeletePartnerId(partnerId);
    setDeletePartnerName(partnerName);
    setDeleteModalOpen(true);
  };

  const confirmDeleteChat = async () => {
    if (!deletePartnerId) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/chat/delete/${deletePartnerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Conversation deleted permanently");
      setDeleteModalOpen(false);

      if (userId) {
        const data = await fetchConversations(userId);
        setConversations(data);
        if (selectedConversation?.id === deletePartnerId) {
          setSelectedConversation(data.length > 0 ? data[0] : null);
          if (data.length === 0) {
            setCurrentView("list");
          }
        }
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to delete conversation");
    }
  };

  const handleSendAttachment = async (file: File) => {
    if (!selectedConversation?.id) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/chat/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { url, type, name } = res.data;

      const socket = socketRef.current;
      if (socket && socket.connected) {
        socket.emit("send_message", {
          senderId: userId,
          toUserId: selectedConversation.id,
          content: `Shared an ${type === "image" ? "image" : "attachment"}: ${name}`,
          attachmentUrl: url,
          attachmentType: type,
          attachmentName: name,
        });
      } else {
        toast.error("Connection lost. Please refresh the page.");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to upload file");
      throw err;
    }
  };

  useEffect(() => {
    if (userId) {
      fetchConversations(userId).then((data) => {
        console.log("📋 Fetched conversations:", data);
        setConversations(data);

        if (targetUserId) {
          const targetConv = data.find((c) => c.id === targetUserId);
          if (targetConv) {
            setSelectedConversation(targetConv);
            setCurrentView("chat");
            return;
          }
        }

        if (data.length > 0 && !selectedConversation) {
          setSelectedConversation(data[0]);
        }
      });
    }
  }, [userId, targetUserId]);

  // Initialize WebSocket
  useEffect(() => {
    if (!userId) {
      console.error("❌ No userId found");
      return;
    }

    console.log("🔌 Initializing socket in Messages for user:", userId);
    const socket = initSocket(userId);
    socketRef.current = socket;

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
            status: msg.status,
            attachmentUrl: msg.attachmentUrl,
            attachmentType: msg.attachmentType,
            attachmentName: msg.attachmentName,
          })
        );

        // If active conversation, read it & update received counter
        const activeConv = selectedConversationRef.current;
        if (activeConv && msg.senderId === activeConv.id) {
          setReceivedMessagesCount((prev) => prev + 1);
          socket.emit("mark_read", {
            userId: userId,
            senderId: activeConv.id,
          });
        }
      }
    };

    const handleMessageRead = (data: any) => {
      console.log("👀 Message read receipt received:", data);
      dispatch(
        updateMessageStatus({
          messageIds: data.messageIds,
          status: "READ",
        })
      );
    };

    socket.off("connect");
    socket.off("connect_error");
    socket.off("disconnect");
    socket.off("receive_message");
    socket.off("message_read");

    socket.on("connect", handleConnect);
    socket.on("connect_error", handleConnectError);
    socket.on("disconnect", handleDisconnect);
    socket.on("receive_message", handleReceiveMessage);
    socket.on("message_read", handleMessageRead);

    if (socket.connected) {
      console.log("✅ Socket already connected on mount");
      setSocketReady(true);
    }

    return () => {
      console.log("🧹 Cleaning up socket listeners in Messages");
      socket.off("receive_message", handleReceiveMessage);
      socket.off("message_read", handleMessageRead);
      socket.off("connect", handleConnect);
      socket.off("connect_error", handleConnectError);
      socket.off("disconnect", handleDisconnect);
    };
  }, [userId, dispatch]);

  useEffect(() => {
    if (selectedConversation && userId) {
      console.log("📜 Fetching chat history for:", selectedConversation.id);
      dispatch(fetchChatHistory(selectedConversation.id) as any);
    }
  }, [dispatch, selectedConversation, userId]);

  const getCurrentMessages = (): Message[] => {
    if (!selectedConversation) return [];
    return [...messages]
      .filter(
        (msg) =>
          (msg.senderId === userId &&
            msg.receiverId === selectedConversation.id) ||
          (msg.senderId === selectedConversation.id &&
            msg.receiverId === userId)
      )
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      )
      .map(
        (msg): Message => ({
          id: msg.id,
          sender: msg.senderId === userId ? "You" : selectedConversation.name,
          content: msg.content,
          timestamp: new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isOwn: msg.senderId === userId,
          type: "text",
          messageStatus: msg.status,
          attachmentUrl: msg.attachmentUrl || undefined,
          attachmentType: (msg.attachmentType as "image" | "file") || undefined,
          attachmentName: msg.attachmentName || undefined,
        })
      );
  };

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedConversation?.id) {
      console.log("❌ Cannot send: empty message or no conversation selected");
      return;
    }

    const socket = socketRef.current;

    if (!socket || !socket.connected) {
      console.error("❌ Socket not connected");
      toast.error("Connection lost. Please refresh the page.");
      return;
    }

    console.log("📤 Sending message:", {
      to: selectedConversation.id,
      content: messageInput.substring(0, 50) + "...",
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
    }
  };

  const handleCloseChat = () => {
    setCurrentView("list");
  };

  const handleCloseSidebar = () => {
    setShowSidebar(false);
  };

  return (
    <div className="relative flex flex-col lg:h-[90vh] shadow-lg overflow-hidden bg-white">
      {/* Subscription gate overlay for non-subscribed users */}
      {isSubscribed === false && (
        <div className="absolute inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 backdrop-blur-md bg-white/40" />
          <div className="relative z-10 bg-white rounded-2xl shadow-2xl border border-gray-200 px-8 py-10 max-w-md mx-4 text-center animate-in fade-in zoom-in duration-300">
            <div className="mx-auto mb-5 w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
            </div>

            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Upgrade to Basic/Premium plan to unlock chat
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Αναβάθμισε σε Basic ή Premium πρόγραμμα για να ξεκλειδώσεις τη
              συνομιλία
            </p>

            <button
              onClick={() => navigate("/plans")}
              className="w-full cursor-pointer py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Buy Plans
            </button>
          </div>
        </div>
      )}

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
              onBlockUser={handleBlockUser}
              onUnblockUser={handleUnblockUser}
              onDeleteChat={handleDeleteChatClick}
              blockedUserIds={blockedUserIds}
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
              onToggleInfo={() => setShowInfoPanel(!showInfoPanel)}
              onBlockUser={handleBlockUser}
              onUnblockUser={handleUnblockUser}
              onDeleteChat={handleDeleteChatClick}
              blockedUserIds={blockedUserIds}
              blockedByThemIds={blockedByThemIds}
              onSendAttachment={handleSendAttachment}
              receivedMessagesCount={receivedMessagesCount}
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
                <ChatInfoPanel conversation={selectedConversation} />
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
            onBlockUser={handleBlockUser}
            onUnblockUser={handleUnblockUser}
            onDeleteChat={handleDeleteChatClick}
            blockedUserIds={blockedUserIds}
          />
          {selectedConversation ? (
            <div className="flex-1 flex overflow-hidden">
              <ChatArea
                selectedConversation={selectedConversation}
                messages={getCurrentMessages()}
                messageInput={messageInput}
                onMessageInputChange={setMessageInput}
                onSendMessage={handleSendMessage}
                onCall={handleCall}
                onCloseChat={handleCloseChat}
                isVisible={true}
                onToggleInfo={() => setShowInfoPanel(!showInfoPanel)}
                onBlockUser={handleBlockUser}
                onUnblockUser={handleUnblockUser}
                onDeleteChat={handleDeleteChatClick}
                blockedUserIds={blockedUserIds}
                blockedByThemIds={blockedByThemIds}
                onSendAttachment={handleSendAttachment}
                receivedMessagesCount={receivedMessagesCount}
              />
              {showInfoPanel && (
                <div className="w-80 border-l border-gray-100 bg-white overflow-y-auto animate-in slide-in-from-right duration-300">
                  <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-semibold text-gray-700">User Info</h3>
                    <button
                      onClick={() => setShowInfoPanel(false)}
                      className="p-1 hover:bg-gray-100 rounded-full text-gray-400"
                    >
                      ✕
                    </button>
                  </div>
                  <ChatInfoPanel conversation={selectedConversation} />
                </div>
              )}
            </div>
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
              onBlockUser={handleBlockUser}
              onUnblockUser={handleUnblockUser}
              onDeleteChat={handleDeleteChatClick}
              blockedUserIds={blockedUserIds}
            />
          </div>
        )}
      </div>

      {/* Delete Chat Confirmation Modal */}
      <DeleteChatModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDeleteChat}
        partnerName={deletePartnerName}
      />
    </div>
  );
};

export default Messages;
