import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { X } from "lucide-react";
import { OwnerDetails, PropertyDetails } from "@/types/PropertyDetails";
import { initSocket, isSocketConnected } from "@/services/socket";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import PrimaryButton from "../reusable/PrimaryButton";
import { fetchMyProperties } from "@/store/Slices/PropertySlice/propertySlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { sendExchangeRequest } from "@/store/Slices/ExchangeRequestSlice/ExchangeRequestSlice";
import { sendNotification } from "@/helper/NotificationService";
import CalendarRangePickerNew from "../home/CalendarRangePickerNew";

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  owner: OwnerDetails;
  singlePropertyData: PropertyDetails;
}

const ChatModal: React.FC<ChatModalProps> = ({
  isOpen,
  onClose,
  owner,
  singlePropertyData,
}) => {
  const [messages, setMessages] = useState<
    { text: string; sender: "me" | "other" }[]
  >([]);
  const [input, setInput] = useState("");
  const [socketReady, setSocketReady] = useState(false);
  const socketRef = useRef<any>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const senderId = user?.id;
  const receiverId = owner?.id;

  const [selectedProperty, setSelectedProperty] = useState("");
  const [exchangeDates, setExchangeDates] = useState<{ start: Date | null; end: Date | null }>({ start: null, end: null });
  const [isExchangeModalOpen, setIsExchangeModalOpen] = useState(false);
  const [exchangeStep, setExchangeStep] = useState<"property" | "dates">("property");
  const { myProperties } = useAppSelector((state) => state.property);
  const dispatch = useAppDispatch();

  //get the id
  const { id } = useParams();

  // Get the selected property title
  const selectedPropertyTitle =
    myProperties?.find((property) => property.id === selectedProperty)?.title ||
    "a property";

  // const handleExchangeRequest = async () => {
  //   if (!selectedProperty || !id) {
  //     console.log("Please select a property before sending request");
  //     return;
  //   }

  //   const exchangeMessage = `I want to exchange my property "${selectedPropertyTitle}" for your property "${singlePropertyData.title}. Please check your exchange route on dashboard for details."`;

  //   try {
  //     // Dispatch the thunk
  //     // if(!toPropertyId) return;
  //     const result = await dispatch(
  //       sendExchangeRequest({
  //         fromUserId: senderId,
  //         toUserId: receiverId,
  //         fromPropertyId: selectedProperty,
  //         toPropertyId: id!,
  //         message: exchangeMessage,
  //       })
  //     ).unwrap();

  //     console.log("Exchange request sent successfully:", result);

  //     // Send the message through socket after successful API call
  //     if (socketRef.current) {
  //       socketRef.current.emit("send_message", {
  //         senderId,
  //         toUserId: receiverId,
  //         content: exchangeMessage,
  //       });
  //     }

  //     // Close the popover
  //     setSelectedProperty("");
  //     toast.success("Request sent successfully");
  //   } catch (error) {
  //     console.error("Failed to send exchange request:", error);
  //     toast.error("Failed to send request");
  //   }
  // };
  const handleExchangeRequest = async () => {
    if (!selectedProperty || !id) {
      toast.error("Please select a property before sending request");
      return;
    }
    if (!exchangeDates.start || !exchangeDates.end) {
      toast.error("Please select exchange dates before sending request");
      return;
    }

    const formatDate = (date: Date) => date.toLocaleDateString();
    const dateRangeStr = `from ${formatDate(exchangeDates.start)} to ${formatDate(exchangeDates.end)}`;
    const exchangeMessage = `I want to exchange my property "${selectedPropertyTitle}" for your property "${singlePropertyData.title}" ${dateRangeStr}. Please check your exchange route on dashboard for details.`;

    try {
      const result = await dispatch(
        sendExchangeRequest({
          fromUserId: senderId,
          toUserId: receiverId,
          fromPropertyId: selectedProperty,
          toPropertyId: id!,
          message: exchangeMessage,
          exchangeStartDate: exchangeDates.start.toISOString(),
          exchangeEndDate: exchangeDates.end.toISOString(),
        })
      ).unwrap();

      console.log("Exchange request sent successfully:", result);

      // Send the message through socket
      if (socketRef.current) {
        socketRef.current.emit("send_message", {
          senderId,
          toUserId: receiverId,
          content: exchangeMessage,
        });
      }

      // Send notification for exchange request
      await sendNotification(
        receiverId,
        `Exchange Request from ${user?.name || user?.username || "User"}`,
        `Exchange request for ${singlePropertyData.title}`
      );

      setSelectedProperty("");
      setExchangeDates({ start: null, end: null });
      toast.success("Request sent successfully");
    } catch (error) {
      console.error("Failed to send exchange request:", error);
      toast.error("Failed to send request");
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

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

  useEffect(() => {
    if (!senderId) {
      console.error("No senderId found");
      return;
    }

    const socket = initSocket(senderId);
    socketRef.current = socket;

    const handleConnect = () => {
      console.log("Socket connected in ChatModal:", socket.id);
      setSocketReady(true);
    };

    const handleReceiveMessage = (msg: {
      senderId: string;
      content: string;
    }) => {
      console.log("Received message:", msg);
      setMessages((prev) => [
        ...prev,
        {
          text: msg.content,
          sender: msg.senderId === senderId ? "me" : "other",
        },
      ]);
    };

    const handleError = (error: any) => {
      console.error("Socket error:", error);
    };

    socket.on("connect", handleConnect);
    socket.on("receive_message", handleReceiveMessage);
    socket.on("error", handleError);

    if (isSocketConnected()) {
      setSocketReady(true);
    }

    return () => {
      socket.off("connect", handleConnect);
      socket.off("receive_message", handleReceiveMessage);
      socket.off("error", handleError);
    };
  }, [senderId]);

  // const sendMessage = async () => {
  //   if (!input.trim() || !receiverId) {
  //     console.log("Input or receiverId is empty");
  //     return;
  //   }

  //   if (!socketRef.current) {
  //     console.error("Socket not available");
  //     return;
  //   }

  //   console.log("Sending message:", input, "to:", receiverId);

  //   socketRef.current.emit("send_message", {
  //     senderId: senderId,
  //     toUserId: receiverId,
  //     content: input,
  //   });

  //   try {
  //     await sendNotification(
  //       receiverId,
  //       `New message from ${user?.name || "User"}`,
  //       input.length > 50 ? input.substring(0, 50) + "..." : input
  //     );
  //   } catch (error) {
  //     console.error("Failed to send notification:", error);
  //   }
  //   setInput("");
  // };
  const sendMessage = async () => {
    if (!input.trim() || !receiverId) {
      // console.log("Input or receiverId is empty");
      return;
    }

    if (!socketRef.current) {
      console.error("Socket not available");
      return;
    }

    // console.log("Sending message:", input, "to:", receiverId);

    // Send the message via socket
    socketRef.current.emit("send_message", {
      senderId: senderId,
      toUserId: receiverId,
      content: input,
    });

    setInput("");
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-white rounded-2xl shadow-lg w-full max-w-md flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-4 bg-[#3174cd] text-white">
              <h2 className="text-lg font-medium">Chat</h2>
              <button onClick={onClose}>
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={messagesContainerRef}
              className="flex-1 p-4 overflow-y-auto space-y-2 bg-gray-50"
              style={{ maxHeight: "300px" }}
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"
                    }`}
                >
                  <div
                    className={`px-3 py-2 rounded-xl text-sm max-w-[70%] ${msg.sender === "me"
                      ? "bg-[#3174cd] text-white"
                      : "bg-gray-200 text-gray-800"
                      }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="flex items-center p-3 bg-white">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[#3174cd]"
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button
                onClick={sendMessage}
                className="ml-2 px-4 py-2 bg-[#3174cd] text-white rounded-full hover:brightness-90 transition"
                disabled={!socketReady}
              >
                Send
              </button>
            </div>

            {/* Exchange Request Button */}
            <div className="p-3 bg-white border-t border-gray-300">
              <Dialog open={isExchangeModalOpen} onOpenChange={(open) => {
                setIsExchangeModalOpen(open);
                if (!open) {
                  setExchangeStep("property");
                }
              }}>
                <DialogTrigger asChild>
                  <PrimaryButton
                    title="Send Exchange Request"
                    className="w-full"
                    onClick={() => {
                      setIsExchangeModalOpen(true);
                      setExchangeStep("property");
                    }}
                  />
                </DialogTrigger>
                <DialogContent className="bg-white border border-gray-300 p-5 shadow-xl max-w-[90%] md:max-w-3xl rounded-2xl w-full max-h-[80vh] mt-10 overflow-y-auto">
                  <DialogHeader className="mb-0 md:mb-3">
                    <DialogTitle className="text-xl font-bold text-gray-800">
                      {exchangeStep === "property"
                        ? "Select Property to Exchange"
                        : "Select Exchange Dates"}
                    </DialogTitle>
                    <DialogDescription className="text-gray-500 text-sm">
                      {exchangeStep === "property"
                        ? "Choose which of your listed properties you'd like to offer for this exchange."
                        : ""}
                    </DialogDescription>
                  </DialogHeader>

                  {exchangeStep === "property" ? (
                    <div className="space-y-4">
                      <RadioGroup
                        value={selectedProperty}
                        onValueChange={(value) => setSelectedProperty(value)}
                        className="space-y-3"
                      >
                        {myProperties && myProperties.length > 0 ? (
                          myProperties.map((property) => (
                            <div
                              key={property.id}
                              className="flex items-center space-x-3 p-3 rounded-xl border border-gray-200 hover:bg-blue-50/30 cursor-pointer transition-colors"
                              onClick={() => setSelectedProperty(property.id)}
                            >
                              <RadioGroupItem value={property.id} id={property.id} className="cursor-pointer" />
                              <Label htmlFor={property.id} className="font-medium text-gray-700 cursor-pointer flex-1">
                                {property.title} ({property.location})
                              </Label>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-6 text-gray-500 text-sm">
                            You don't have any properties listed yet. Please add a property first.
                          </div>
                        )}
                      </RadioGroup>

                      <div className="flex justify-end gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => setIsExchangeModalOpen(false)}
                          className="px-4 py-2 border rounded-xl text-gray-600 hover:bg-gray-50 transition"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (!selectedProperty) {
                              toast.error("Please select a property first.");
                              return;
                            }
                            setExchangeStep("dates");
                          }}
                          className="px-5 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="w-full flex justify-center">
                        <CalendarRangePickerNew
                          availabilityDates={exchangeDates}
                          onAvailabilityChange={setExchangeDates}
                        />
                      </div>

                      <div className="flex justify-between items-center pt-4border-t">
                        <button
                          type="button"
                          onClick={() => setExchangeStep("property")}
                          className="px-4 py-2 border rounded-xl text-gray-600 hover:bg-gray-50 transition font-medium"
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          onClick={async () => {
                            if (!exchangeDates.start || !exchangeDates.end) {
                              toast.error("Please select exchange dates first.");
                              return;
                            }
                            await handleExchangeRequest();
                            setIsExchangeModalOpen(false);
                            setExchangeStep("property");
                          }}
                          className="px-6 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
                        >
                          Send Request
                        </button>
                      </div>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatModal;
