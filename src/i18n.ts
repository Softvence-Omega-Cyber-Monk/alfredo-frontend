import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(HttpApi)
  .use(LanguageDetector) // Add language detector
  .use(initReactI18next)
  .init({
    lng: "el", // Default to Greek
    fallbackLng: "en", // Fallback to English
    supportedLngs: ["el", "en"], // Supported languages
    ns: ["translation", "banner", "article", "faq", "navigation", "articles"],
    defaultNS: "translation",
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"], // Look for language in localStorage first
      caches: ["localStorage"], // Cache the language in localStorage
    },
    debug: process.env.NODE_ENV === "development",
  });

export default i18n;
