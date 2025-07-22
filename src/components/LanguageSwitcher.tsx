import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaEarthAmericas } from "react-icons/fa6";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (lng: Parameters<typeof i18n.changeLanguage>[0]) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  const languages = [
    { code: "en", name: "English" },
    { code: "el", name: "Ελληνικά (Greek)" },
  ];

  return (
    <div className="relative inline-block">
      {/* Earth Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors bg-white shadow-[0_0_10px_0_#B9D7FF]"
        aria-label="Change language"
      >
        <FaEarthAmericas className="text-xl text-primary-blue" />
      </button>

      {/* Popover */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 border border-gray-200">
          <div className="py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  i18n.language === lang.code
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
