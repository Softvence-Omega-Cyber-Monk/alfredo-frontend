import React from "react";
import { Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

import { Conversation } from "./types";

interface ConversationsListProps {
  conversations: Conversation[];
  selectedConversation: Conversation;
  onSelectConversation: (conversation: Conversation) => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  isVisible: boolean;
  onClose?: () => void;
}

const ConversationsList: React.FC<ConversationsListProps> = ({
  conversations,
  selectedConversation,
  onSelectConversation,
  searchTerm,
  onSearchChange,
  isVisible,
  onClose,
}) => {
  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className={`${
        isVisible ? "block" : "hidden"
      } md:block w-full md:w-1/4 lg:w-1/5 flex flex-col md:mt-0 md:relative inset-0 md:inset-auto z-50 md:z-auto
    `}
    >
      {/* Header */}
      <div className=" mb-2">
        <div className="relative bg-white rounded-full px-4 py-2  md:p-4">
          <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-dark-2 w-6 rounded-full h-auto" />
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 rounded-lg border-none shadow-none focus:border-primary-border-color focus:ring-primary-border-color text-sm md:text-lg md:placeholder:text-lg md:placeholder:text-dark-3 h-12"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.map((conversation) => (
          <div
            key={conversation.id}
            onClick={() => {
              onSelectConversation(conversation);
              if (onClose) onClose(); // Close sidebar on mobile after selection
            }}
            className={`p-3 md:p-4 cursor-pointer  transition-colors  ${
              selectedConversation.id === conversation.id
                ? "bg-[#EAF1FA] text-dark-2"
                : "text-dark-3"
            }`}
          >
            <div className="flex items-start gap-3 xl:gap-5 ">
              <div className="relative">
                <Avatar className="w-10 h-10 md:w-12 md:h-12">
                  <AvatarImage
                    src={conversation.avatar}
                    alt={conversation.name}
                  />
                  <AvatarFallback className="text-xs md:text-sm">
                    {conversation.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                {conversation.online && (
                  <div className="absolute -top-1 -left-1 w-3 h-3 md:w-3 md:h-3 bg-primary-blue rounded-full border-1 border-white shadow-[0px_4px_4px_0px_#26262640]"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3
                  className={`font-medium truncate text-sm md:text-base lg:text-lg ${
                    conversation.online ? "text-primary-blue" : ""
                  }`}
                >
                  {conversation.name}
                </h3>

                <p className="text-xs md:text-sm truncate flex-1 xl:mt-2">
                  {conversation.lastMessage}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConversationsList;
