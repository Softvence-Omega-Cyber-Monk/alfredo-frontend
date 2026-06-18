import { FC, useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { IoClose } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";

const STORAGE_KEY = "newsletter_popup_shown";
const getNewsletterDelay = () => (Math.floor(Math.random() * 6) + 10) * 1000; // 10-15 seconds

const NewsletterPopup: FC = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const { t } = useTranslation("subscribe");

  useEffect(() => {
    // Don't show if already shown
    if (localStorage.getItem(STORAGE_KEY)) return;

    const delay = getNewsletterDelay();
    const timer = setTimeout(() => {
      setOpen(true);
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setOpen(false);
    localStorage.setItem(STORAGE_KEY, "true");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/web-subscribe`,
        { name, email },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 201) {
        setSuccess(true);
        localStorage.setItem(STORAGE_KEY, "true");
        setTimeout(() => {
          setOpen(false);
        }, 2500);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.message || "Failed to subscribe. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={(val) => { if (!val) handleClose(); }}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-[100] backdrop-blur-sm animate-[fadeIn_0.3s_ease]" />
        <Dialog.Content
          className="fixed z-[101] top-1/2 left-1/2 w-[90vw] max-w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-8 shadow-2xl animate-[scaleIn_0.3s_ease]"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-500 hover:text-gray-700 cursor-pointer"
            aria-label="Close"
          >
            <IoClose size={18} />
          </button>

          {success ? (
            /* Success State */
            <div className="flex flex-col items-center gap-4 py-6">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 13L9 17L19 7" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-xl font-semibold text-[#505050] text-center">
                {t("newsletterPopup.success")}
              </p>
            </div>
          ) : (
            <>
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-[#EAF1FA] flex items-center justify-center">
                  <HiOutlineMail className="text-[#3174CD] text-3xl" />
                </div>
              </div>

              {/* Title */}
              <Dialog.Title className="text-2xl font-bold text-center text-[#333] mb-1">
                {t("newsletterPopup.title")}
              </Dialog.Title>
              <p className="text-center text-[#666] mb-6 text-base">
                {t("newsletterPopup.subtitle")}
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("newsletterPopup.namePlaceholder")}
                  className="w-full h-[48px] px-5 border border-gray-300 rounded-full text-[#333] placeholder-gray-400 focus:outline-none focus:border-[#3174CD] focus:ring-2 focus:ring-[#3174CD]/20 transition-all"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("newsletterPopup.emailPlaceholder")}
                  required
                  className="w-full h-[48px] px-5 border border-gray-300 rounded-full text-[#333] placeholder-gray-400 focus:outline-none focus:border-[#3174CD] focus:ring-2 focus:ring-[#3174CD]/20 transition-all"
                />

                {error && (
                  <p className="text-sm text-red-500 text-center">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-[48px] rounded-full bg-[#3174CD] text-white font-semibold text-base hover:bg-[#2a65b5] transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "..." : t("newsletterPopup.button")}
                </button>
              </form>

              {/* Disclaimer */}
              <p className="mt-4 text-xs text-gray-400 text-center leading-relaxed">
                {t("disclaimer")}
              </p>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default NewsletterPopup;
