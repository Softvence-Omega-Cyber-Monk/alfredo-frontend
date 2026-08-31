import { FC, useEffect, useRef, useState } from "react";
import { ChatAreaProps } from "@/components/messages/types";
import { ChevronLeft, Paperclip, Ban, FileText, Check, CheckCheck, Lock, Flag, Phone, Video } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch } from "@/hooks/useRedux";
import { fetchMyProperties } from "@/store/Slices/PropertySlice/propertySlice";
import { toast } from "sonner";
import ReportUserModal from "./ReportUserModal";
import { useCall } from "@/contexts/CallContext";
import { CallType } from "@/types/call";

const ChatArea: FC<ChatAreaProps> = ({
  selectedConversation,
  messages,
  messageInput,
  onMessageInputChange,
  onSendMessage,
  onCloseChat,
  isVisible,
  onToggleInfo,
  onBlockUser,
  onUnblockUser,
  blockedUserIds = [],
  blockedByThemIds = [],
  onSendAttachment,
  receivedMessagesCount,
  onReportUser,
}) => {
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const [isUploading, setIsUploading] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const { startCall, status: callStatus } = useCall();

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  useEffect(() => {
    dispatch(fetchMyProperties());
  }, [dispatch]);

  if (!isVisible) return null;

  const isBlockedByMe = blockedUserIds.includes(selectedConversation.id);
  const isBlockedByThem = blockedByThemIds.includes(selectedConversation.id);
  const isBlocked = isBlockedByMe || isBlockedByThem;
  const isAttachmentLocked = receivedMessagesCount < 3;

  const handleFileClick = () => {
    if (isAttachmentLocked) {
      toast.warning("File sharing is locked. You must receive at least 3 messages from this user to unlock.");
      return;
    }
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 50 * 1024 * 1024) {
      toast.error("File size cannot exceed 50MB");
      return;
    }

    try {
      setIsUploading(true);
      if (onSendAttachment) {
        await onSendAttachment(file);
      }
    } catch (err) {
      console.error("Failed to send attachment:", err);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const containsLink = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9-]+\.[a-zA-Z]{2,})/gi;
    return urlRegex.test(text);
  };

  const handleStartCall = (callType: CallType) => {
    if (isBlocked) {
      toast.warning("You can't call a blocked user.");
      return;
    }
    startCall(
      {
        id: selectedConversation.id,
        name: selectedConversation.name,
        avatar: selectedConversation.avatar,
      },
      callType
    );
  };

  const handleSendClick = () => {
    if (isAttachmentLocked && containsLink(messageInput)) {
      toast.warning("Sending links, files, and photos is blocked until you receive at least 3 messages from this user.");
      return;
    }
    onSendMessage();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendClick();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="flex-1 flex flex-col bg-gray-50 h-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Header — always visible at top */}
        <div className="flex-shrink-0 flex justify-between items-center p-4 bg-[#3174cd] text-white z-10">
          <div className="flex items-center space-x-2">
            <button
              onClick={onCloseChat}
              className="md:hidden p-1 -ml-2 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Back to messages"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-medium truncate max-w-[150px] sm:max-w-xs">
              {selectedConversation.name}
            </h2>
            <button
              onClick={onToggleInfo}
              className="text-xs bg-white/20 px-2 py-1 rounded hover:bg-white/30 transition-colors"
            >
              Info
            </button>
          </div>
          <div className="flex items-center space-x-2 z-100">
            {/* Audio / Video Call Buttons */}
            <button
              onClick={() => handleStartCall("audio")}
              disabled={isBlocked || callStatus !== "idle"}
              aria-label="Start audio call"
              title="Audio call"
              className="p-2 cursor-pointer rounded-full bg-white/20 hover:bg-white/30 transition-colors active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white/20"
            >
              <Phone className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleStartCall("video")}
              disabled={isBlocked || callStatus !== "idle"}
              aria-label="Start video call"
              title="Video call"
              className="p-2 cursor-pointer rounded-full bg-white/20 hover:bg-white/30 transition-colors active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white/20"
            >
              <Video className="w-4 h-4" />
            </button>

            {/* Block / Unblock Button */}
            {isBlockedByMe ? (
              <button
                onClick={() => onUnblockUser?.(selectedConversation.id)}
                className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 active:scale-95"
              >
                Unblock
              </button>
            ) : (
              <button
                onClick={() => onBlockUser?.(selectedConversation.id)}
                className="text-xs cursor-pointer bg-red-600 hover:bg-red-700 text-white font-semibold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 active:scale-95"
              >
                <Ban className="w-3 h-3" />
                <span className="hidden sm:inline">Block</span>
              </button>
            )}

            {/* Report Button */}
            <button
              onClick={() => setIsReportModalOpen(true)}
              className="text-xs cursor-pointer bg-amber-500 hover:bg-amber-600 text-white font-semibold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 active:scale-95"
            >
              <Flag className="w-3 h-3" />
              <span className="hidden sm:inline">Report</span>
            </button>
          </div>
        </div>

        {/* Block Banner Warnings */}
        {isBlockedByMe && (
          <div className="flex-shrink-0 bg-red-50 border-y border-red-100 p-2.5 text-center text-xs text-red-700 font-semibold shadow-inner">
            You have blocked this user. Unblock to resume messaging.
          </div>
        )}
        {isBlockedByThem && (
          <div className="flex-shrink-0 bg-slate-100 border-y border-slate-200 p-2.5 text-center text-xs text-slate-600 font-semibold shadow-inner">
            You cannot send messages to this user as they have blocked you.
          </div>
        )}

        {/* Security Gate Info Banner */}
        {isAttachmentLocked && !isBlocked && (
          <div className="flex-shrink-0 bg-amber-50 border-y border-amber-100 p-2 text-center text-[11px] text-amber-700 flex items-center justify-center gap-1 font-medium">
            <Lock className="w-3.5 h-3.5" />
            File sharing (links, photos, files) is locked until you receive at least 3 messages. ({receivedMessagesCount}/3 received)
          </div>
        )}

        {/* Messages */}
        <div
          ref={messagesContainerRef}
          className="flex-1 p-4 overflow-y-auto space-y-3"
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-2.5 rounded-2xl text-sm max-w-[70%] shadow-sm ${msg.isOwn
                  ? "bg-[#3174cd] text-white"
                  : "bg-white text-gray-800 border border-slate-100"
                  }`}
              >
                {/* Render attachment if available */}
                {msg.attachmentUrl && (
                  <div className="mb-2 max-w-xs rounded-xl overflow-hidden border border-black/5 bg-slate-500/10">
                    {msg.attachmentType === "image" ? (
                      <a href={msg.attachmentUrl} target="_blank" rel="noopener noreferrer" className="block">
                        <img
                          src={msg.attachmentUrl}
                          alt={msg.attachmentName || "Shared Image"}
                          className="max-h-52 object-cover w-full hover:scale-[1.02] transition-transform duration-200"
                        />
                      </a>
                    ) : msg.attachmentType === "video" ? (
                      <video
                        src={msg.attachmentUrl}
                        controls
                        className="max-h-52 object-cover w-full"
                      />
                    ) : (
                      <a
                        href={msg.attachmentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-2 p-2.5 hover:underline ${msg.isOwn ? "text-white" : "text-slate-800"
                          }`}
                      >
                        <FileText className="w-8 h-8 flex-shrink-0 opacity-80" />
                        <div className="text-left min-w-0 flex-1">
                          <p className="text-xs font-semibold truncate">
                            {msg.attachmentName || "Download File"}
                          </p>
                          <p className="text-[10px] opacity-60">Open document</p>
                        </div>
                      </a>
                    )}
                  </div>
                )}

                <p className="break-words leading-relaxed">{msg.content}</p>

                {/* Timestamp and Read Status */}
                <div className="flex items-center justify-end gap-1 mt-1 opacity-70 text-[10px]">
                  <span>{msg.timestamp}</span>
                  {msg.isOwn && (
                    <span>
                      {msg.messageStatus === "READ" ? (
                        <CheckCheck className="w-3.5 h-3.5 text-sky-200" />
                      ) : (
                        <Check className="w-3.5 h-3.5 text-slate-300" />
                      )}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input area — always visible at bottom */}
        <div className="flex-shrink-0 flex items-center p-3 bg-white border-t border-slate-100 gap-2">
          {/* File Input (Hidden) */}


          <input
            type="text"
            value={messageInput}
            onChange={(e) => onMessageInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isBlocked}
            placeholder={
              isBlockedByMe
                ? "Unblock this user to send a message"
                : isBlockedByThem
                  ? "You cannot message this user"
                  : "Type a message..."
            }
            className="flex-1 border border-slate-200 rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#3174cd] focus:border-transparent transition-all disabled:bg-slate-50 disabled:cursor-not-allowed"
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*,video/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
          />

          {/* Attachment trigger button */}
          <button
            onClick={handleFileClick}
            disabled={isBlocked || isUploading}
            className={`p-2 rounded-full transition-all flex items-center justify-center ${isAttachmentLocked
              ? "text-slate-300 bg-slate-50 cursor-not-allowed"
              : "text-slate-500 hover:bg-slate-100 hover:text-slate-700 active:scale-95"
              }`}
            title={isAttachmentLocked ? "Receive 3 messages to unlock attachments" : "Attach a file"}
          >
            {isAttachmentLocked ? (
              <Lock className="w-5 h-5" />
            ) : (
              <Paperclip className={`w-5 h-5 ${isUploading ? "animate-spin" : ""}`} />
            )}
          </button>
          <button
            onClick={handleSendClick}
            disabled={isBlocked || !messageInput.trim()}
            className="px-5 py-2.5 bg-[#3174cd] hover:bg-[#255ba3] disabled:bg-slate-100 disabled:text-slate-400 text-white font-semibold rounded-full hover:brightness-95 transition-all active:scale-95 text-sm shadow-sm"
          >
            Send
          </button>
        </div>
      </motion.div>

      <ReportUserModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        partnerName={selectedConversation.name}
        onSubmit={async (reason, details) => {
          if (onReportUser) {
            await onReportUser(selectedConversation.id, reason, details);
            toast.success("User reported successfully. Thank you for keeping our community safe.");
          }
        }}
      />
    </AnimatePresence>
  );
};

export default ChatArea;
