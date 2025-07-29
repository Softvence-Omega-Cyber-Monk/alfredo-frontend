// components/Payment.tsx
import MiniWrapper from "@/common/MiniWrapper";
import * as Dialog from "@radix-ui/react-dialog";
import { FaCcStripe } from "react-icons/fa";
import { Button } from "../ui/button";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const AddCardDialog = () => {
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your form handling logic here
    setOpen(false); // Close dialog after saving
  };

  const { t } = useTranslation("settings");

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button className="w-full text-lg font-DM-sans flex h-14 justify-center items-center gap-2 self-stretch rounded-xl bg-[#E9E9E9] text-[var(--color-basic-dark)] hover:bg-[#d4d3d3] transition-colors duration-200 cursor-pointer">
          + {t("settings.payment.addNewCard")}
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-40" />
        <Dialog.Content className="fixed z-50 top-1/2 left-1/2 w-full max-w-[692px]  -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-8 shadow-xl space-y-8">
          <Dialog.Title className="text-[40px] font-DM-sans text-center text-[#3174CD]">
            Checkout Information
          </Dialog.Title>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name fields */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full flex flex-col space-y-2">
                <label className="text-[14px]  text-[#808080] font-DM-sans">
                  First Name*
                </label>
                <input
                  type="text"
                  placeholder="Enter your first name"
                  className="flex-1 px-4 py-3 border rounded-full border-[#808080]"
                  required
                />
              </div>
              <div className="w-full flex flex-col space-y-2">
                <label className="text-[14px]  text-[#808080] font-DM-sans">
                  Last Name*
                </label>
                <input
                  type="text"
                  placeholder="Enter your last name"
                  className="flex-1 px-4 py-3 border rounded-full border-[#808080]"
                  required
                />
              </div>
            </div>

            {/* Telephone and Email */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full flex flex-col space-y-2">
                <label className="text-[14px]  text-[#808080] font-DM-sans">
                  Telephone*
                </label>

                <input
                  type="tel"
                  placeholder="e.g., +1234567890"
                  className="flex-1 px-4 py-3 border rounded-full border-[#808080]"
                  required
                />
              </div>
              <div className="w-full flex flex-col space-y-2">
                <label className="text-[14px]  text-[#808080] font-DM-sans">
                  Email*
                </label>
                <input
                  type="email"
                  placeholder="e.g., your.email@example.com"
                  className="flex-1 px-4 py-3 border rounded-full border-[#808080]"
                  required
                />
              </div>
            </div>

            {/* City */}
            <div className="w-full flex flex-col space-y-2">
              <label className="text-[14px]  text-[#808080] font-DM-sans">
                City*
              </label>

              <input
                type="text"
                placeholder="Enter your city"
                className="w-full px-4 py-3 border rounded-full border-[#808080]"
                required
              />
            </div>

            {/* Payment method */}
            <div className="w-full flex flex-col space-y-2">
              <label className="text-[14px]  text-[#808080] font-DM-sans">
                Payment Method*
              </label>

              <div className="border border-[#808080] px-4 py-3 rounded-full flex justify-between items-center">
                <div className="flex items-center gap-2 text-[#3174CD] font-medium ">
                  <input
                    type="radio"
                    checked
                    readOnly
                    className="w-4 h-4 accent-[#3174CD] cursor-pointer"
                  />
                  Stripe Pay
                </div>
                <FaCcStripe className="text-[#635bff] text-2xl" />
              </div>
            </div>

            {/* Save button */}
            <Dialog.Close asChild>
              <Button
                type="submit"
                className="w-full h-[52px] flex px-8 py-3 justify-center items-center gap-[45px] self-stretch rounded-[35px] bg-[#3174CD] text-white text-lg hover:bg-[#2a65b5] cursor-pointer"
              >
                Save
              </Button>
            </Dialog.Close>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

const Payment = () => {
  const { t } = useTranslation("settings");
  return (
    <MiniWrapper>
      <div className="space-y-8 ">
        {/* Header Button */}
        <div>
          <Button className="w-full text-2xl font-DM-sans flex h-14 justify-center items-center gap-2 self-stretch rounded-xl bg-[var(--Primary-P-25,#F4F7FC)] text-[var(--color-primary-blue)] hover:bg-[#e1e9f5] transition-colors duration-200 cursor-pointer">
            {t("settings.payment.subtitle")}
          </Button>
        </div>

        {/* Existing Card Info */}
        <div className="space-y-3">
          <Button className="w-full flex h-14 justify-between items-center bg-[#3174CD] text-white rounded-xl px-4">
            <div className="flex items-center space-x-2">
              <FaCcStripe className="h-10 w-16" />
              <span>220********052</span>
            </div>
            <label className="relative w-5 h-5 cursor-pointer">
              <input
                type="checkbox"
                className="peer appearance-none w-5 h-5 rounded-full border-2 border-white bg-transparent checked:bg-white checked:border-white"
              />
              <span className="absolute top-1 left-1 w-3 h-3 bg-white rounded-full scale-0 peer-checked:scale-100 transition-transform" />
            </label>
          </Button>
        </div>

        {/* Add New Card Dialog Trigger */}
        <AddCardDialog />
      </div>
    </MiniWrapper>
  );
};

export default Payment;

// // components/Payment.tsx
// import MiniWrapper from "@/common/MiniWrapper";
// import * as Dialog from "@radix-ui/react-dialog";
// import { FaCcStripe, FaCreditCard, FaTrash } from "react-icons/fa";
// import { Button } from "../ui/button";
// import { useState } from "react";
// import { toast } from "sonner";

// interface Card {
//   id: string;
//   brand: string;
//   last4: string;
//   exp_month: number;
//   exp_year: number;
//   isDefault: boolean;
// }

// const AddCardDialog = ({ onAddCard }: { onAddCard: () => void }) => {
//   const [open, setOpen] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       await new Promise((resolve) => setTimeout(resolve, 1000));
//       onAddCard();
//       toast.success("Card added successfully");
//       setOpen(false);
//     } catch (error) {
//       toast.error("Failed to add card", {
//         description: "Please try again.",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Dialog.Root open={open} onOpenChange={setOpen}>
//       <Dialog.Trigger asChild>
//         <Button className="w-full text-lg font-DM-sans flex h-14 justify-center items-center gap-2 self-stretch rounded-xl bg-[#E9E9E9] text-[var(--color-basic-dark)] hover:bg-[#d4d3d3] transition-colors duration-200 cursor-pointer">
//           + Add New Card
//         </Button>
//       </Dialog.Trigger>

//       <Dialog.Portal>
//         <Dialog.Overlay className="fixed inset-0 bg-black/40 z-40" />
//         <Dialog.Content className="fixed z-50 top-1/2 left-1/2 w-full max-w-[692px] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-8 shadow-xl space-y-8">
//           <Dialog.Title className="text-[40px] font-DM-sans text-center text-[#3174CD]">
//             Checkout Information
//           </Dialog.Title>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="flex flex-col md:flex-row gap-4">
//               <div className="w-full flex flex-col space-y-2">
//                 <label className="text-[14px] text-[#808080] font-DM-sans">
//                   First Name*
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Enter your first name"
//                   className="flex-1 px-4 py-3 border rounded-full border-[#808080]"
//                   required
//                 />
//               </div>
//               <div className="w-full flex flex-col space-y-2">
//                 <label className="text-[14px] text-[#808080] font-DM-sans">
//                   Last Name*
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Enter your last name"
//                   className="flex-1 px-4 py-3 border rounded-full border-[#808080]"
//                   required
//                 />
//               </div>
//             </div>

//             <div className="flex flex-col md:flex-row gap-4">
//               <div className="w-full flex flex-col space-y-2">
//                 <label className="text-[14px] text-[#808080] font-DM-sans">
//                   Telephone*
//                 </label>
//                 <input
//                   type="tel"
//                   placeholder="e.g., +1234567890"
//                   className="flex-1 px-4 py-3 border rounded-full border-[#808080]"
//                   required
//                   pattern="^\+[1-9]\d{1,14}$"
//                 />
//               </div>
//               <div className="w-full flex flex-col space-y-2">
//                 <label className="text-[14px] text-[#808080] font-DM-sans">
//                   Email*
//                 </label>
//                 <input
//                   type="email"
//                   placeholder="e.g., your.email@example.com"
//                   className="flex-1 px-4 py-3 border rounded-full border-[#808080]"
//                   required
//                 />
//               </div>
//             </div>

//             <div className="w-full flex flex-col space-y-2">
//               <label className="text-[14px] text-[#808080] font-DM-sans">
//                 City*
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter your city"
//                 className="w-full px-4 py-3 border rounded-full border-[#808080]"
//                 required
//               />
//             </div>

//             <div className="w-full flex flex-col space-y-2">
//               <label className="text-[14px] text-[#808080] font-DM-sans">
//                 Payment Method*
//               </label>
//               <div className="border border-[#808080] px-4 py-3 rounded-full flex justify-between items-center">
//                 <div className="flex items-center gap-2 text-[#3174CD] font-medium">
//                   <input
//                     type="radio"
//                     checked
//                     readOnly
//                     className="w-4 h-4 accent-[#3174CD] cursor-pointer"
//                   />
//                   Stripe Pay
//                 </div>
//                 <FaCcStripe className="text-[#635bff] text-2xl" />
//               </div>
//             </div>

//             <Dialog.Close asChild>
//               <Button
//                 type="submit"
//                 className="w-full h-[52px] flex px-8 py-3 justify-center items-center gap-[45px] self-stretch rounded-[35px] bg-[#3174CD] text-white text-lg hover:bg-[#2a65b5] cursor-pointer"
//                 disabled={loading}
//               >
//                 {loading ? "Processing..." : "Save"}
//               </Button>
//             </Dialog.Close>
//           </form>
//         </Dialog.Content>
//       </Dialog.Portal>
//     </Dialog.Root>
//   );
// };

// const Payment = () => {
//   const [cards, setCards] = useState<Card[]>([
//     {
//       id: "card_1",
//       brand: "visa",
//       last4: "4242",
//       exp_month: 12,
//       exp_year: 2025,
//       isDefault: true,
//     },
//     {
//       id: "card_2",
//       brand: "mastercard",
//       last4: "0052",
//       exp_month: 6,
//       exp_year: 2024,
//       isDefault: false,
//     },
//   ]);
//   const [loading, setLoading] = useState(false);

//   const handleSetDefault = async (cardId: string) => {
//     try {
//       setLoading(true);
//       await new Promise((resolve) => setTimeout(resolve, 300));
//       setCards(
//         cards.map((card) => ({
//           ...card,
//           isDefault: card.id === cardId,
//         }))
//       );
//       toast.success("Default payment method updated");
//     } catch (error) {
//       toast.error("Failed to update default payment method");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteCard = async (cardId: string) => {
//     try {
//       setLoading(true);
//       await new Promise((resolve) => setTimeout(resolve, 300));
//       const newCards = cards.filter((card) => card.id !== cardId);
//       setCards(newCards);

//       // If we deleted the default card and there are other cards, set the first one as default
//       if (
//         cards.find((c) => c.id === cardId)?.isDefault &&
//         newCards.length > 0
//       ) {
//         await handleSetDefault(newCards[0].id);
//       }

//       toast.success("Payment method removed");
//     } catch (error) {
//       toast.error("Failed to remove payment method");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddCard = async () => {
//     try {
//       setLoading(true);
//       await new Promise((resolve) => setTimeout(resolve, 800));

//       const brands = ["visa", "mastercard", "amex"];
//       const newCard: Card = {
//         id: `card_${Date.now()}`,
//         brand: brands[Math.floor(Math.random() * brands.length)],
//         last4: Math.floor(1000 + Math.random() * 9000).toString(),
//         exp_month: Math.floor(Math.random() * 11) + 1,
//         exp_year: new Date().getFullYear() + Math.floor(Math.random() * 5) + 1,
//         isDefault: cards.length === 0,
//       };

//       setCards((prev) => [...prev, newCard]);
//       if (cards.length === 0) {
//         await handleSetDefault(newCard.id);
//       }
//       toast.success("New card added successfully");
//     } catch (error) {
//       toast.error("Failed to add new card");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getCardIcon = (brand: string) => {
//     switch (brand.toLowerCase()) {
//       case "visa":
//         return <FaCcStripe className="h-8 w-16 text-blue-600" />;
//       case "mastercard":
//         return <FaCcStripe className="h-8 w-16 text-red-500" />;
//       case "amex":
//         return <FaCcStripe className="h-8 w-16 text-blue-400" />;
//       default:
//         return <FaCcStripe className="h-8 w-16 text-gray-500" />;
//     }
//   };

//   return (
//     <MiniWrapper>
//       <div className="space-y-8">
//         <div>
//           <Button className="w-full text-2xl font-DM-sans flex h-14 justify-center items-center gap-2 self-stretch rounded-xl bg-[var(--Primary-P-25,#F4F7FC)] text-[var(--color-primary-blue)] hover:bg-[#e1e9f5] transition-colors duration-200 cursor-pointer">
//             Payment Setup
//           </Button>
//         </div>

//         {loading && (
//           <div className="flex justify-center items-center h-40">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3174CD]"></div>
//           </div>
//         )}

//         {!loading && cards.length === 0 && (
//           <div className="text-center py-8">
//             <p className="text-gray-500 mb-4">No payment methods saved</p>
//           </div>
//         )}

//         <div className="space-y-3">
//           {cards.map((card) => (
//             <div
//               key={card.id}
//               className="w-full flex h-14 justify-between items-center bg-[#3174CD] text-white rounded-xl px-4"
//             >
//               <div className="flex items-center space-x-2">
//                 {getCardIcon(card.brand)}
//                 <span className="font-DM-sans">
//                   •••• •••• •••• {card.last4}
//                 </span>
//               </div>

//               <div className="flex items-center space-x-4">
//                 <button
//                   onClick={() => handleDeleteCard(card.id)}
//                   className="text-white hover:text-red-200 transition-colors"
//                   title="Remove card"
//                 >
//                   <FaTrash />
//                 </button>

//                 <label className="relative w-5 h-5 cursor-pointer">
//                   <input
//                     type="radio"
//                     checked={card.isDefault}
//                     onChange={() => handleSetDefault(card.id)}
//                     className="peer appearance-none w-5 h-5 rounded-full border-2 border-white bg-transparent checked:bg-white checked:border-white"
//                   />
//                   <span className="absolute top-1 left-1 w-3 h-3 bg-white rounded-full scale-0 peer-checked:scale-100 transition-transform" />
//                 </label>
//               </div>
//             </div>
//           ))}
//         </div>

//         <AddCardDialog onAddCard={handleAddCard} />
//       </div>
//     </MiniWrapper>
//   );
// };

// export default Payment;
