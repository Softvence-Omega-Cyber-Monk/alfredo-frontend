import { useEffect, useRef } from "react";

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
  type: "text";
  avatar?: string; // Avatar for the sender
}

interface MessagesListProps {
  messages: Message[];
  otherParticipant?: {
    name: string;
    avatar: string;
  };
  conversationId?: number; // Add this to detect conversation changes
}

const MessagesList: React.FC<MessagesListProps> = ({
  messages,
  conversationId,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  // Scroll to bottom when messages change or conversation changes
  useEffect(() => {
    scrollToBottom();
  }, [messages, conversationId]);
  const formatDateTime = (timestamp: string) => {
    // Simple date/time formatting logic
    const now = new Date();

    // If timestamp contains "ago", keep as is
    if (timestamp.includes("ago")) {
      return timestamp;
    }

    // If timestamp contains date and time, format it
    if (timestamp.includes(",")) {
      const [date, time] = timestamp.split(",");
      return `${date.trim()} | ${time.trim()}`;
    }

    // If just time, add today's date
    if (timestamp.includes("AM") || timestamp.includes("PM")) {
      const currentDate = now.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      return `${currentDate} | ${timestamp}`;
    }

    return timestamp;
  };

  useEffect(() => {
  const ref = containerRef.current;
  if (ref) {
    const shouldScroll = ref.scrollHeight - ref.scrollTop === ref.clientHeight;
    if (shouldScroll) scrollToBottom();
  }
}, [messages, conversationId]);

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto p-3 md:p-4 flex flex-col-reverse"
    >
      <div className="space-y-2 md:space-y-3">
        {messages.map((message, index) => {
          const prevMessage = index > 0 ? messages[index - 1] : null;

          const isSameAsPrevious =
            prevMessage && prevMessage.isOwn === message.isOwn;

          return (
            <div
              key={message.id}
              className={`flex ${
                message.isOwn ? "justify-end" : "justify-start"
              } items-start gap-2 md:gap-3 lg:gap-6 ${isSameAsPrevious ? "mt-1" : "mt-6"}`}
            >
              <div>
                <div
                  className={`max-w-[80%] lg:w-full px-6 py-2.5 rounded-lg lg:rounded-full ${
                    message.isOwn
                      ? "bg-primary-blue text-white ml-auto"
                      : "bg-[#F4F7FC] text-dark-2"
                  }`}
                >
                  <p className="text-sm md:text-base leading-relaxed">
                    {message.content}
                  </p>
                </div>

                <p
                  className={`text-xs mt-1 text-dark-3 ${
                    message.isOwn ? "mr-4 text-right" : "ml-4"
                  }`}
                >
                  {formatDateTime(message.timestamp)}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessagesList;
