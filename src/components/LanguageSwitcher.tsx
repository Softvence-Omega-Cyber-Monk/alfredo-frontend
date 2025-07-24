import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaEarthAmericas } from "react-icons/fa6";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  useEffect(() => {
    // This effect runs when the language changes
    const handleLanguageChange = () => {
      setCurrentLanguage(i18n.language);
    };

    i18n.on("languageChanged", handleLanguageChange);
    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n]);

  const changeLanguage = (lng: string) => {
    if (lng !== i18n.language) {
      i18n.changeLanguage(lng).then(() => {
        // Language changed successfully
        localStorage.setItem("i18nextLng", lng); // Explicitly save to localStorage
      });
    }
    setIsOpen(false);
  };

  const languages = [
    { code: "el", name: "Ελληνικά" },
    { code: "en", name: "English" },
  ];

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors bg-white shadow-[0_0_10px_0_#B9D7FF]"
        aria-label="Change language"
      >
        <div className="flex items-center gap-1">
          <FaEarthAmericas className="text-xl text-primary-blue" />
          <span className="text-xs font-medium uppercase">
            {currentLanguage}
          </span>
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 border border-gray-200">
          <div className="py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  currentLanguage === lang.code
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
