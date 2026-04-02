import { useEffect } from "react";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { AppDispatch } from "@/store/store";
import { createContact } from "@/store/Slices/ContactSlice/contactSclice";
import ReusableButton from "@/components/reusable/ReusableButton";
import { FormData } from "@/types";

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SupportModal = ({ isOpen, onClose }: SupportModalProps) => {
  const { t } = useTranslation("contact");
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  // Prevent body scroll
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const onSubmit = (data: FormData) => {
    const contactPayload = {
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      phoneNumber: data.phone,
      opinion: data.message,
    };

    dispatch(createContact(contactPayload))
      .unwrap()
      .then(() => {
        toast.success("Message sent successfully!");
        reset();
        onClose();
      })
      .catch((err) => {
        toast.error("Error sending message", err);
      });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col animate-scaleIn overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-300 bg-white z-10">
          <h2 className="text-2xl font-semibold text-primary-blue">Contact Support</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <X size={22} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="px-6 py-6 overflow-y-auto flex-1">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("contact.firstName")}</label>
                <input
                  type="text"
                  placeholder={t("contact.firstName")}
                  className="w-full border border-primary-border-color py-3 px-4 rounded-[25px] text-sm"
                  {...register("firstName", { required: "First name is required" })}
                />
                {errors.firstName && <p className="text-red-600 text-xs mt-1">{errors.firstName.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("contact.lastName")}</label>
                <input
                  type="text"
                  placeholder={t("contact.lastName")}
                  className="w-full border border-primary-border-color py-3 px-4 rounded-[25px] text-sm"
                  {...register("lastName", { required: "Last name is required" })}
                />
                {errors.lastName && <p className="text-red-600 text-xs mt-1">{errors.lastName.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t("contact.enterEmail")}</label>
              <input
                type="email"
                placeholder={t("contact.enterEmail")}
                className="w-full border border-primary-border-color py-3 px-4 rounded-[25px] text-sm"
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
                })}
              />
              {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t("contact.phone")}</label>
              <input
                type="tel"
                placeholder={t("contact.phone")}
                className="w-full border border-primary-border-color py-3 px-4 rounded-[25px] text-sm"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: { value: /^[0-9+\-\s()]*$/, message: "Invalid phone number" },
                })}
              />
              {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t("contact.writeMessage")}</label>
              <textarea
                placeholder={t("contact.writeMessage")}
                rows={4}
                className="w-full border border-primary-border-color py-3 px-4 rounded-[25px] resize-none text-sm"
                {...register("message", { required: "Message is required" })}
              ></textarea>
              {errors.message && <p className="text-red-600 text-xs mt-1">{errors.message.message}</p>}
            </div>

            <ReusableButton
              type="submit"
              className="text-[18px] w-full font-semibold py-3 px-6 rounded-full"
            >
              {t("contact.startConversation")}
            </ReusableButton>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SupportModal;
