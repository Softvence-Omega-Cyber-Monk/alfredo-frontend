import { FC, useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { IoClose } from "react-icons/io5";
import { HiUserAdd, HiUsers, HiTrendingUp, HiChatAlt2 } from "react-icons/hi";

interface SocialMessage {
  getText: (lang: string) => string;
  icon: React.ReactNode;
  iconBg: string;
}

const NAME_CITY_COMBOS = [
  { name: "Maria", nameEl: "Μαρία", city: "Athens", cityEl: "Αθήνα" },
  { name: "Nikos", nameEl: "Νίκος", city: "Thessaloniki", cityEl: "Θεσσαλονίκη" },
  { name: "Elena", nameEl: "Ελένα", city: "Crete", cityEl: "Κρήτη" },
  { name: "Giorgos", nameEl: "Γιώργος", city: "Mykonos", cityEl: "Μύκονο" },
  { name: "Sofia", nameEl: "Σοφία", city: "Rhodes", cityEl: "Ρόδο" },
  { name: "Dimitris", nameEl: "Δημήτρης", city: "Corfu", cityEl: "Κέρκυρα" },
  { name: "Anna", nameEl: "Άννα", city: "Santorini", cityEl: "Σαντορίνη" },
  { name: "Kostas", nameEl: "Κώστας", city: "Patras", cityEl: "Πάτρα" },
];

const getRandomCombo = () =>
  NAME_CITY_COMBOS[Math.floor(Math.random() * NAME_CITY_COMBOS.length)];

const buildMessages = (): SocialMessage[] => {
  const combo = getRandomCombo();
  return [
    {
      getText: (lang: string) =>
        lang === "el"
          ? `${combo.nameEl} από ${combo.cityEl} μόλις εγγράφηκε!`
          : `${combo.name} from ${combo.city} just joined the site`,
      icon: <HiUserAdd className="text-white text-lg" />,
      iconBg: "bg-green-500",
    },
    {
      getText: (lang: string) =>
        lang === "el"
          ? "1300 χρήστες βλέπουν αυτόν τον ιστότοπο τώρα"
          : "1300 users are seeing this site right now",
      icon: <HiUsers className="text-white text-lg" />,
      iconBg: "bg-blue-500",
    },
    {
      getText: (lang: string) =>
        lang === "el"
          ? "Τα Premium μέλη αυξάνουν το ποσοστό ανταλλαγής κατά 84%"
          : "Premium users increase exchange rate by 84%",
      icon: <HiTrendingUp className="text-white text-lg" />,
      iconBg: "bg-purple-500",
    },
    {
      getText: (lang: string) =>
        lang === "el"
          ? "Οι καλές καταχωρήσεις λαμβάνουν 71% περισσότερα μηνύματα"
          : "Good listings get 71% more messages",
      icon: <HiChatAlt2 className="text-white text-lg" />,
      iconBg: "bg-orange-500",
    },
  ];
};

const getInitialDelay = () =>
  (Math.floor(Math.random() * 6) + 30) * 1000; // 30-35 seconds in ms

const getRandomDelay = () =>
  (Math.floor(Math.random() * 46) + 45) * 1000; // 45-90 seconds in ms

const SocialProofPopup: FC = () => {
  const [visible, setVisible] = useState(false);
  const [currentMessage, setCurrentMessage] = useState<SocialMessage | null>(null);
  const [exiting, setExiting] = useState(false);

  const { i18n } = useTranslation();
  const lang = i18n.language;

  const dismiss = useCallback(() => {
    setExiting(true);
    setTimeout(() => {
      setVisible(false);
      setExiting(false);
    }, 400);
  }, []);

  const showNext = useCallback(() => {
    const messages = buildMessages();
    const msg = messages[Math.floor(Math.random() * messages.length)];
    setCurrentMessage(msg);
    setVisible(true);
    setExiting(false);

    // Auto-dismiss after 5 seconds
    const autoDismiss = setTimeout(() => {
      dismiss();
    }, 5000);

    return () => clearTimeout(autoDismiss);
  }, [dismiss]);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    let autoDismissCleanup: (() => void) | undefined;

    const scheduleFirst = () => {
      const delay = getInitialDelay();
      timeoutId = setTimeout(() => {
        autoDismissCleanup = showNext();
      }, delay);
    };

    // Initial delay (30-35 seconds)
    scheduleFirst();

    return () => {
      clearTimeout(timeoutId);
      if (autoDismissCleanup) autoDismissCleanup();
    };
  }, [showNext]);

  // Schedule next message after dismiss
  useEffect(() => {
    if (!visible && currentMessage) {
      const delay = getRandomDelay();
      const timeoutId = setTimeout(() => {
        showNext();
      }, delay);

      return () => clearTimeout(timeoutId);
    }
  }, [visible, currentMessage, showNext]);

  if (!visible || !currentMessage) return null;

  return (
    <div
      className={`fixed bottom-6 left-6 z-[90] max-w-[360px] w-[calc(100vw-48px)] sm:w-auto ${exiting ? "animate-[slideOut_0.4s_ease_forwards]" : "animate-[slideIn_0.5s_ease]"
        }`}
    >
      <div className="bg-[#5599f3] text-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-100 p-4 flex items-start gap-3">
        {/* Icon */}
        <div
          className={`w-10 h-10 rounded-full ${currentMessage.iconBg} flex items-center justify-center flex-shrink-0`}
        >
          {currentMessage.icon}
        </div>

        {/* Text */}
        <p className="text-sm text-white font-medium leading-snug flex-1 pt-2">
          {currentMessage.getText(lang)}
        </p>

        {/* Close */}
        <button
          onClick={dismiss}
          className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-white flex-shrink-0 cursor-pointer"
          aria-label="Close"
        >
          <IoClose size={14} />
        </button>
      </div>
    </div>
  );
};

export default SocialProofPopup;
