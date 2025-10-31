import { FC, useState, useEffect } from "react";
import axios from "axios";
import * as Dialog from "@radix-ui/react-dialog";
import check from "../../assets/check.svg";
import { FaCcStripe } from "react-icons/fa";
import { Button } from "../ui/button";
import ReusableButton from "./ReusableButton";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

interface Translation {
  id: string;
  planId: string;
  language: string;
  name: string;
  description: string;
  features: string[];
  planDuration: string;
  planType: string;
  createdAt: string;
  updatedAt: string;
}

interface Plan {
  id: string;
  price: number;
  status: string;
  priceId: string;
  createdAt: string;
  updatedAt: string;
  is_populer: boolean;
  translations: Translation[];
}

interface ProcessedPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  planType: string;
  status: string;
  priceId: string;
  plan_duration: string;
  is_populer: boolean;
}

const config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  },
};

const ServicePlan: FC = () => {
  const [open, setOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [plans, setPlans] = useState<ProcessedPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<ProcessedPlan | null>(null);

  const { t, i18n } = useTranslation("ourplan");
  const currentLanguage = i18n.language;
  // console.log(currentLanguage, "currentLanguage");

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/plans`);

        // Process the plans to get the correct translation based on current language
        const processedPlans: ProcessedPlan[] = res.data.data
          .map((plan: Plan) => {
            // Find the translation for current language, fallback to English if not found
            const translation =
              plan.translations.find(
                (t: Translation) => t.language === currentLanguage
              ) ||
              plan.translations.find((t: Translation) => t.language === "en");

            if (!translation) {
              console.warn(`No translation found for plan ${plan.id}`);
              return null;
            }

            return {
              id: plan.id,
              name: translation.name,
              description: translation.description,
              price: plan.price,
              features: translation.features,
              planType: translation.planType,
              status: plan.status,
              priceId: plan.priceId,
              plan_duration: translation.planDuration,
              is_populer: plan.is_populer,
            };
          })
          .filter(Boolean); // Remove any null values

        setPlans(processedPlans);
      } catch (error) {
        console.error("Error fetching plans:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, [currentLanguage]); // Re-fetch when language changes

  // Handle Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan) return;

    // Map plan duration
    const planDuration = selectedPlan.planType === "TWO_YEARLY" ? 2 : 1;

    const payload = {
      priceId: selectedPlan.priceId,
      planId: selectedPlan.id,
      planDuration,
    };

    try {
      console.log("Payload:", payload);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/stripe-payment/checkout`,
        payload,
        config
      );
      console.log("Checkout response:", res.data);
      window.location.href = res.data.url;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Something went wrong");
      } else {
        toast.error("Unexpected error occurred");
      }
      console.error("Error creating checkout:", err);
    }
  };

  console.log("plans:", plans);

  return (
    <>
      <section className="flex items-center justify-center">
        <div className="flex flex-col lg:flex-row gap-14 md:gap-6 lg:gap-6">
          {loading ? (
            <p className="text-center">Loading plans...</p>
          ) : (
            plans?.map((plan) => (
              <div
                key={plan.id}
                className={`relative p-[40px] flex flex-col w-full max-w-[384px] border border-primary-border-color rounded-[24px] text-center min-h-[680px] duration-300 transition-all ease-in-out
    ${
      plan.is_populer
        ? "bg-[#EAF1FA] shadow-2xl shadow-[#bfd4f0]"
        : "bg-white hover:shadow-2xl hover:shadow-[#bfd4f0] hover:bg-[#EAF1FA]"
    }`}
              >
                {/* Tag */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-primary-blue text-white text-[16px] px-6 py-[10px] rounded-full shadow-md">
                  {plan.plan_duration} {plan.is_populer ? "(Popular)" : ""}
                </div>

                {/* Popular Tag */}
                {/* {plan.is_populer && (
                  <div className="absolute top-20 right-36  text-[#0ed300] text-[14px] font-semibold px-4 py-[6px] rounded-full "></div>
                )} */}

                {/* Content */}
                <div className="flex flex-col gap-6 flex-grow">
                  <h2 className="text-[24px] font-semibold text-[#505050] mt-5">
                    {plan.name}
                  </h2>
                  <div className="mx-auto mt-1">
                    <p className="text-[64px] font-semibold text-primary-blue">
                      {plan.price}
                      <span className="text-[24px] font-semibold"> €</span>
                    </p>
                  </div>
                  <p className="text-[16px] text-[#505050] mt-2">
                    {plan.description}
                  </p>

                  <div className="border-b border-b-[#EAF1FA]" />

                  <ul className="space-y-3 text-left">
                    {plan.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 text-basic-dark text-4"
                      >
                        <img src={check} alt="check icon" className="w-5 h-5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <ReusableButton
                  className="mt-6 w-full"
                  onClick={() => {
                    setSelectedPlan(plan);
                    setOpen(true);
                  }}
                >
                  {t("ourplan.plancard1.button")}
                </ReusableButton>
              </div>
            ))
          )}
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

              {/* Save Button */}
              <Button
                type="submit"
                className="w-full h-[52px] flex justify-center items-center gap-[45px] rounded-[35px] bg-[#3174CD] text-white text-lg hover:bg-[#2a65b5] transition cursor-pointer"
              >
                {t("ourplan.form.button")}
              </Button>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};

export default ServicePlan;
