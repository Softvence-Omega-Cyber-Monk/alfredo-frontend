import { useState, useEffect } from "react";
import MiniWrapper from "@/common/MiniWrapper";
import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";

const Language = () => {
  const { t, i18n } = useTranslation("settings");
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const languages = [
    { code: "en", name: "English" },
    { code: "el", name: t("settings.language.greek") }, // Or hardcode "Ελληνικά"
  ];

  // Update selectedLanguage if i18n changes externally
  useEffect(() => {
    const handleLanguageChange = () => setSelectedLanguage(i18n.language);
    i18n.on("languageChanged", handleLanguageChange);
    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n]);

  const changeLanguage = (lng: string) => {
    if (lng !== i18n.language) {
      i18n.changeLanguage(lng).then(() => {
        localStorage.setItem("i18nextLng", lng); // Persist in localStorage
      });
    }
    setSelectedLanguage(lng);
  };

  return (
    <MiniWrapper>
      <div className="space-y-8">
        <div>
          <Button className="w-full text-2xl font-DM-sans flex h-14 justify-center items-center gap-2 self-stretch rounded-xl bg-[var(--Primary-P-25,#F4F7FC)] text-[var(--color-primary-blue)] hover:bg-[#e1e9f5] transition-colors duration-200 cursor-pointer">
            {t("settings.language.subtitle")}
          </Button>
        </div>

        <div className="space-y-80">
          {/* Language options */}
          <div className="space-y-3">
            {languages.map((lang) => {
              const isSelected = selectedLanguage === lang.code;
              return (
                <Button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`w-full flex h-14 justify-between items-center rounded-xl px-4 cursor-pointer transition-colors duration-200 ${
                    isSelected
                      ? "bg-[#3174CD] text-white"
                      : "bg-[#FBFBFB] text-[#3174CD]"
                  }`}
                >
                  {lang.name}
                  <label className="relative w-5 h-5">
                    <input
                      type="checkbox"
                      readOnly
                      checked={isSelected}
                      className={`peer appearance-none w-5 h-5 rounded-full border-2 ${
                        isSelected
                          ? "border-white bg-white"
                          : "border-gray-400 bg-transparent"
                      }`}
                    />
                    <span
                      className={`absolute top-1 left-1 w-3 h-3 bg-[#3174CD] rounded-full transition-transform ${
                        isSelected ? "scale-100" : "scale-0"
                      }`}
                    ></span>
                  </label>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </MiniWrapper>
  );
};

export default Language;
