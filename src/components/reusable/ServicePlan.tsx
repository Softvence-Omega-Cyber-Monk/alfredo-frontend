import { FC, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import check from "../../assets/check.svg";
import { Plan } from "@/types";
import ReusableButton from "./ReusableButton";
import { FaCcStripe } from "react-icons/fa";
import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";

const plans: Plan[] = [
  {
    title: "ourplan.plancard1.title1",
    duration: "ourplan.plancard1.badge",
    price: 59,
    features: [
      "ourplan.plancard1.firstFaq.content",
      "ourplan.plancard1.secondFaq.content",
      "ourplan.plancard1.thirdFaq.content",
      "ourplan.plancard1.fourthFaq.content",
      "ourplan.plancard1.fifthFaq.content",
      "ourplan.plancard1.sixthFaq.content",
    ],
  },
  {
    title: "ourplan.plancard2.title1",
    duration: "ourplan.plancard2.badge",
    price: 89,
    originalPrice: 220,
    badge: "EARLY ADOPTER (Until 30/09)",
    features: [
      "ourplan.plancard2.firstFaq.content",
      "ourplan.plancard2.secondFaq.content",
      "ourplan.plancard2.thirdFaq.content",
      "ourplan.plancard2.fourthFaq.content",
      "ourplan.plancard2.fifthFaq.content",
      "ourplan.plancard2.sixthFaq.content",
      "ourplan.plancard2.sevenFaq.content",
      "ourplan.plancard2.eightFaq.content",
    ],
  },
];

const ServicePlan: FC = () => {
  const [open, setOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("stripe");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpen(false);
  };

  const { t } = useTranslation("ourplan");

  return (
    <>
      <section className="flex items-center justify-center">
        <div className="flex flex-col lg:flex-row gap-14 md:gap-6 lg:gap-6">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className="relative bg-white p-[40px] flex flex-col w-full max-w-[384px] border border-primary-border-color rounded-[24px] text-center min-h-[680px] hover:shadow-2xl hover:shadow-[#bfd4f0] hover:bg-[#EAF1FA] duration-300 transition-all  ease-in-out"
            >
              {/* Tag */}
              <div className="absolute -top-6 left-23 bg-primary-blue text-white text-[16px] px-6 py-[10px] rounded-full shadow-md">
                {t(plan.duration)}
                {/* {plan.duration} */}
              </div>

              {/* Content */}
              <div className="flex flex-col gap-6 flex-grow">
                <h2 className="text-[24px] font-semibold text-[#505050]">
                  {t(plan.title)}
                </h2>
                <div className="mx-auto mt-1">
                  <p className="text-[64px] font-semibold text-primary-blue">
                    {plan.originalPrice && (
                      <span className="text-[24px] font-semibold text-[#B9B9B9] line-through mr-2">
                        {plan.originalPrice}
                      </span>
                    )}

                    {plan.price}
                    <span className="text-[24px] font-semibold">
                      {t("ourplan.plancard1.tk")}
                    </span>
                  </p>
                </div>
                <p className="text-[16px] text-[#505050] mt-2">
                  {t("ourplan.plancard1.button")}
                </p>

                <div className="border-b border-b-[#EAF1FA]" />

                <ul className="space-y-3 text-left">
                  {plan.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-basic-dark text-4"
                    >
                      <img src={check} alt="check icon" className="w-5 h-5" />
                      <span>{t(feature)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <ReusableButton
                className="mt-6 w-full"
                onClick={() => setOpen(true)}
              >
                {t("ourplan.plancard1.button")}
              </ReusableButton>
            </div>
          ))}
        </div>
      </section>

      {/* Dialog */}
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/40 z-40" />
          <Dialog.Content className="fixed z-50 top-1/2 left-1/2 w-full max-w-[692px] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-8 shadow-xl space-y-8">
            <Dialog.Title className="text-[40px] font-DM-sans text-center text-[#3174CD]">
              {t("ourplan.form.title1")}
            </Dialog.Title>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full flex flex-col space-y-2">
                  <label className="text-sm text-[#808080] font-DM-sans">
                    {t("ourplan.form.name1")}
                  </label>
                  <input
                    type="text"
                    placeholder={t("ourplan.form.name1p")}
                    className="px-4 py-3 border rounded-full border-[#808080]"
                    required
                  />
                </div>
                <div className="w-full flex flex-col space-y-2">
                  <label className="text-sm text-[#808080] font-DM-sans">
                    {t("ourplan.form.name2")}
                  </label>
                  <input
                    type="text"
                    placeholder={t("ourplan.form.name2p")}
                    className="px-4 py-3 border rounded-full border-[#808080]"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full flex flex-col space-y-2">
                  <label className="text-sm text-[#808080] font-DM-sans">
                    {t("ourplan.form.phone")}
                  </label>
                  <input
                    type="tel"
                    placeholder="+1234567890"
                    className="px-4 py-3 border rounded-full border-[#808080]"
                    required
                  />
                </div>
                <div className="w-full flex flex-col space-y-2">
                  <label className="text-sm text-[#808080] font-DM-sans">
                    {t("ourplan.form.email")}
                  </label>
                  <input
                    type="email"
                    placeholder={t("ourplan.form.emailp")}
                    className="px-4 py-3 border rounded-full border-[#808080]"
                    required
                  />
                </div>
              </div>

              <div className="w-full flex flex-col space-y-2">
                <label className="text-sm text-[#808080] font-DM-sans">
                  {t("ourplan.form.city")}
                </label>
                <input
                  type="text"
                  placeholder={t("ourplan.form.cityp")}
                  className="px-4 py-3 border rounded-full border-[#808080]"
                  required
                />
              </div>

              {/* Payment Method */}
              <div className="w-full flex flex-col space-y-2">
                <label className="text-sm text-[#808080] font-DM-sans">
                  {t("ourplan.form.payment")}
                </label>
                <label className="cursor-pointer border border-[#808080] px-4 py-3 rounded-full flex justify-between items-center hover:bg-[#f0f0f0] transition">
                  <div className="flex items-center gap-2 text-[#3174CD] font-medium">
                    <input
                      type="radio"
                      name="payment"
                      value="stripe"
                      checked={paymentMethod === "stripe"}
                      onChange={() => setPaymentMethod("stripe")}
                      className="w-4 h-4 accent-[#3174CD] cursor-pointer"
                    />
                    {t("ourplan.form.stripe")}
                  </div>
                  <FaCcStripe className="text-[#635bff] text-2xl" />
                </label>
              </div>

              <Dialog.Close asChild>
                <Button
                  type="submit"
                  className="w-full h-[52px] flex justify-center items-center gap-[45px] rounded-[35px] bg-[#3174CD] text-white text-lg hover:bg-[#2a65b5] transition cursor-pointer"
                >
                  {t("ourplan.form.button")}
                </Button>
              </Dialog.Close>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};

export default ServicePlan;

// import { FC, useState } from "react";
// import * as Dialog from "@radix-ui/react-dialog";
// import check from "../../assets/check.svg";
// import { Plan } from "@/types";
// import ReusableButton from "./ReusableButton";
// import { FaCcStripe } from "react-icons/fa";
// import { Button } from "../ui/button";

// const plans: Plan[] = [
//   {
//     title: "Traveler",
//     duration: "1 Year Subscription",
//     price: 59,
//     features: [
//       "TRAVELER badge",
//       "Enter the community",
//       "Search for houses",
//       "Send requests to your favourite ones",
//       "Unlimited free exchanges during the subscription",
//       "Badge EARLY ADOPTER (Until 30/09)",
//     ],
//   },
//   {
//     title: "Premium Traveler",
//     duration: "2 Years Subscription",
//     price: 89,
//     originalPrice: 220,
//     badge: "EARLY ADOPTER (Until 30/09)",
//     features: [
//       "PREMIUM TRAVELER badge",
//       "Enter the community",
//       "Search for houses",
//       "Search for houses and send request to your favourite ones",
//       "Unlimited free exchanges during the subscription",
//       "Priority Assistance",
//       "Discounts on Planes, ferries and cars",
//       "Badge EARLY ADOPTER (Until 30/09)",
//     ],
//   },
// ];

// const ServicePlan: FC = () => {
//   const [open, setOpen] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState("stripe");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setOpen(false);
//   };

//   return (
//     <>
//       <section className="flex items-center justify-center">
//         <div className="flex flex-col lg:flex-row gap-14 md:gap-6 lg:gap-6">
//           {plans.map((plan, idx) => (
//             <div
//               key={idx}
//               className="relative bg-white p-[40px] flex flex-col w-full max-w-[384px] border border-primary-border-color rounded-[24px] text-center min-h-[680px] hover:shadow-2xl hover:shadow-[#bfd4f0] hover:bg-[#EAF1FA] duration-300 transition-all  ease-in-out"
//             >
//               {/* Tag */}
//               <div className="absolute -top-6 left-23 bg-primary-blue text-white text-[16px] px-6 py-[10px] rounded-full shadow-md">
//                 {plan.duration}
//               </div>

//               {/* Content */}
//               <div className="flex flex-col gap-6 flex-grow">
//                 <h2 className="text-[24px] font-semibold text-[#505050]">{plan.title}</h2>
//                 <div className="mx-auto mt-1">
//                   <p className="text-[64px] font-semibold text-primary-blue">
//                     {plan.originalPrice && (
//                       <span className="text-[24px] font-semibold text-[#B9B9B9] line-through mr-2">
//                         {plan.originalPrice}
//                       </span>
//                     )}
//                     {plan.price} <span className="text-[24px] font-semibold">eur</span>
//                   </p>
//                 </div>
//                 <p className="text-[16px] text-[#505050] mt-2">Billed annually</p>

//                 <div className="border-b border-b-[#EAF1FA]" />

//                 <ul className="space-y-3 text-left">
//                   {plan.features.map((feature, i) => (
//                     <li key={i} className="flex items-center gap-3 text-basic-dark text-4">
//                       <img src={check} alt="check icon" className="w-5 h-5" />
//                       <span>{feature}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               {/* CTA Button */}
//               <ReusableButton className="mt-6 w-full" onClick={() => setOpen(true)}>
//                 Choose Plan
//               </ReusableButton>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Dialog */}
//       <Dialog.Root open={open} onOpenChange={setOpen}>
//         <Dialog.Portal>
//           <Dialog.Overlay className="fixed inset-0 bg-black/40 z-40" />
//           <Dialog.Content className="fixed z-50 top-1/2 left-1/2 w-full max-w-[692px] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-8 shadow-xl space-y-8">
//             <Dialog.Title className="text-[40px] font-DM-sans text-center text-[#3174CD]">
//               Checkout Information
//             </Dialog.Title>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div className="flex flex-col md:flex-row gap-4">
//                 <div className="w-full flex flex-col space-y-2">
//                   <label className="text-sm text-[#808080] font-DM-sans">First Name*</label>
//                   <input
//                     type="text"
//                     placeholder="Enter your first name"
//                     className="px-4 py-3 border rounded-full border-[#808080]"
//                     required
//                   />
//                 </div>
//                 <div className="w-full flex flex-col space-y-2">
//                   <label className="text-sm text-[#808080] font-DM-sans">Last Name*</label>
//                   <input
//                     type="text"
//                     placeholder="Enter your last name"
//                     className="px-4 py-3 border rounded-full border-[#808080]"
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="flex flex-col md:flex-row gap-4">
//                 <div className="w-full flex flex-col space-y-2">
//                   <label className="text-sm text-[#808080] font-DM-sans">Telephone*</label>
//                   <input
//                     type="tel"
//                     placeholder="e.g., +1234567890"
//                     className="px-4 py-3 border rounded-full border-[#808080]"
//                     required
//                   />
//                 </div>
//                 <div className="w-full flex flex-col space-y-2">
//                   <label className="text-sm text-[#808080] font-DM-sans">Email*</label>
//                   <input
//                     type="email"
//                     placeholder="e.g., your.email@example.com"
//                     className="px-4 py-3 border rounded-full border-[#808080]"
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="w-full flex flex-col space-y-2">
//                 <label className="text-sm text-[#808080] font-DM-sans">City*</label>
//                 <input
//                   type="text"
//                   placeholder="Enter your city"
//                   className="px-4 py-3 border rounded-full border-[#808080]"
//                   required
//                 />
//               </div>

//               {/* Payment Method */}
//               <div className="w-full flex flex-col space-y-2">
//                 <label className="text-sm text-[#808080] font-DM-sans">Payment Method*</label>
//                 <label className="cursor-pointer border border-[#808080] px-4 py-3 rounded-full flex justify-between items-center hover:bg-[#f0f0f0] transition">
//                   <div className="flex items-center gap-2 text-[#3174CD] font-medium">
//                     <input
//                       type="radio"
//                       name="payment"
//                       value="stripe"
//                       checked={paymentMethod === "stripe"}
//                       onChange={() => setPaymentMethod("stripe")}
//                       className="w-4 h-4 accent-[#3174CD] cursor-pointer"
//                     />
//                     Stripe Pay
//                   </div>
//                   <FaCcStripe className="text-[#635bff] text-2xl" />
//                 </label>
//               </div>

//               <Dialog.Close asChild>
//                 <Button
//                   type="submit"
//                   className="w-full h-[52px] flex justify-center items-center gap-[45px] rounded-[35px] bg-[#3174CD] text-white text-lg hover:bg-[#2a65b5] transition cursor-pointer"
//                 >
//                   Save
//                 </Button>
//               </Dialog.Close>
//             </form>
//           </Dialog.Content>
//         </Dialog.Portal>
//       </Dialog.Root>
//     </>
//   );
// };

// export default ServicePlan;
