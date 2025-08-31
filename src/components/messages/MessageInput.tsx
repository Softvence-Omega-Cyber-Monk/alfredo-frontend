import { LuSend } from "react-icons/lu";
import { FiPaperclip } from "react-icons/fi";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import clsx from "clsx";
import arrow from "@/assets/icons/arrowdown.svg";
import PrimaryButton from "@/components/reusable/PrimaryButton";

interface MessageInputProps {
  messageInput: string;
  onMessageInputChange: (value: string) => void;
  onSendMessage: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({
  messageInput,
  onMessageInputChange,
  onSendMessage,
}) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSendMessage();
    }
  };
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggleReason = (reason: string) => {
    setSelectedReasons((prev) =>
      prev.includes(reason)
        ? prev.filter((r) => r !== reason)
        : [...prev, reason]
    );
  };
  return (
    <div>
      <div className="p-3 md:p-4 rounded-xl border border-[#A0BFE8] m-3 bg-white">
        <div className="flex flex-col gap-2">
          <div className="flex-1 relative">
            <input
              placeholder="Ask Anything"
              value={messageInput}
              onChange={(e) => onMessageInputChange(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pr-16 md:pr-16 border-none focus:border-none focus:outline-none shadow-none active:border-none focus-visible:border-none text-sm md:text-base w-full h-12"
            />
            <div className="flex justify-end">
              <button
                onClick={() => alert("Emoji Picker Not Implemented")}
                className="relative overflow-hidden rounded-full transition-colors text-lg font-medium cursor-pointer px-6 py-2 bg-primary-blue text-white flex items-center justify-center gap-2.5"
              >
                <p className="relative z-10">Send</p>
                <LuSend className="relative z-10 w-5 h-5" />
                <div className="absolute bottom-0 right-0 opacity-80 items-center justify-center overflow-hidden">
                  <img
                    src="/buttonHomeIcon.svg"
                    alt="icon"
                    className="w-full"
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className=" p-3 md:p-4">
        <div className="flex flex-col md:flex-row gap-3 md:gap-0 justify-between items-stretch md:items-center">
          <div>
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
              <PopoverTrigger asChild>
                <button className="flex items-center gap-2 cursor-pointer">
                  <p className="text-lg font-medium text-primary-blue focus:outline-none">
                    Request exchange
                  </p>
                  <div className="p-1 md:p-2">
                    <img
                      src={arrow}
                      alt=""
                      className={clsx(
                        "transition-transform duration-300",
                        popoverOpen ? "rotate-0" : "rotate-180"
                      )}
                    />
                  </div>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-6 space-y-4 rounded-[24px] bg-[#F4F7FC] shadow-black/30 shadow-2xl border-none my-6">
                <h3 className="text-[22px] text-primary-blue">
                  Request Exchange
                </h3>
                <div className="space-y-4">
                  {[
                    { id: "new", label: "Here is your New Property" },
                    { id: "name", label: "Your New Property Name" },
                    { id: "property", label: "Here New Property Name" },
                  ].map((option) => (
                    <div
                      key={option.id}
                      className="flex items-center space-x-2 text-dark-2 text-lg"
                    >
                      <Checkbox
                        id={option.id}
                        checked={selectedReasons.includes(option.id)}
                        onCheckedChange={() => toggleReason(option.id)}
                      />
                      <Label htmlFor={option.id}>{option.label}</Label>
                    </div>
                  ))}
                </div>
                <PrimaryButton
                  title="Send"
                  textColor="w-full sm:text-sm md:text-base mt-4 text-white"
                  className=""
                />
              </PopoverContent>
            </Popover>
          </div>
          <button
            onClick={() => alert("Emoji Picker Not Implemented")}
            className="relative overflow-hidden rounded-full transition-colors text-lg font-medium cursor-pointer px-6 py-2 bg-white border border-dark-3 text-dark-3 flex items-center justify-center gap-2.5"
          >
            <FiPaperclip className="relative z-10 w-5 h-5" />
            <p className="relative z-10">Attach</p>
            <div className="absolute bottom-0 right-0 opacity-80 items-center justify-center overflow-hidden">
              <img src="/buttonHomeWhite.svg" alt="icon" className="w-full" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageInput;
