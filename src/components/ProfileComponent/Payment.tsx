// components/Payment.tsx
import MiniWrapper from "@/common/MiniWrapper";
import * as Dialog from "@radix-ui/react-dialog";
import { FaCcStripe } from "react-icons/fa";
import { Button } from "../ui/button";
import { useState } from "react";

const AddCardDialog = () => {
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your form handling logic here
    setOpen(false); // Close dialog after saving
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button className="w-full text-lg font-DM-sans flex h-14 justify-center items-center gap-2 self-stretch rounded-xl bg-[#E9E9E9] text-[var(--color-basic-dark)] hover:bg-[#d4d3d3] transition-colors duration-200 cursor-pointer">
          + Add New Card
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
  return (
    <MiniWrapper>
      <div className="space-y-8 ">
        {/* Header Button */}
        <div>
          <Button className="w-full text-2xl font-DM-sans flex h-14 justify-center items-center gap-2 self-stretch rounded-xl bg-[var(--Primary-P-25,#F4F7FC)] text-[var(--color-primary-blue)] hover:bg-[#e1e9f5] transition-colors duration-200 cursor-pointer">
            Payment Setup
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

// import MiniWrapper from "@/common/MiniWrapper";
// import { Button } from "../ui/button";
// import { FaCcStripe } from "react-icons/fa";

// const Payment = () => {
//   return (
//     <MiniWrapper>
//       <div className="space-y-8">
//         <div>
//           <Button className="w-full text-2xl font-DM-sans flex h-14 justify-center items-center gap-2 self-stretch rounded-xl bg-[var(--Primary-P-25,#F4F7FC)] text-[var(--color-primary-blue)] hover:bg-[#e1e9f5] transition-colors duration-200 cursor-pointer">
//             Payment Setup
//           </Button>
//         </div>
//         <div className="space-y-3">
//           <div>
//             <Button className="w-full flex h-14 justify-between items-center bg-[#3174CD] text-white rounded-xl px-4">
//               <div className="flex justify-start items-center space-x-2">
//                 <p>
//                   <FaCcStripe className="h-10 w-16" />
//                 </p>
//                 <span>220********052</span>
//               </div>

//               <label className="relative w-5 h-5 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   className="peer appearance-none w-5 h-5 rounded-full border-2 border-white bg-transparent checked:bg-white checked:border-white"
//                 />
//                 {/* Selector dot when checked */}
//                 <span className="absolute top-1 left-1 w-3 h-3 bg-[#3174CD] rounded-full scale-0 peer-checked:scale-100 transition-transform"></span>
//               </label>
//             </Button>
//           </div>
//         </div>

//         <div>
//           <Button className="w-full text-lg font-DM-sans flex h-14 justify-center items-center gap-2 self-stretch rounded-xl bg-[#E9E9E9] text-[var(--color-basic-dark)] hover:bg-[#d4d3d3] transition-colors duration-200 cursor-pointer">
//             + Add New Card
//           </Button>
//         </div>
//       </div>
//     </MiniWrapper>
//   );
// };

// export default Payment;
