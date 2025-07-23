// src/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector"; // Detect language
import XHR from "i18next-xhr-backend"; // Optional, for loading translations from an external source

// Translation resources (ensure the Greek translations are correct)
const resources = {
  en: {
    translation: {
      // Banner translations
      "banner.title": "Find your perfect home",
      "banner.highlight": "exchange partner",
      "banner.subtitle":
        "Exchange your home with travelers from around the world — safe, easy, and flexible.",

      // SearchFilter translations
      "search.placeholder": "Where to?",

      // Existing translations
      welcome: "Welcome",
      description: "This is the description text in English.",
      footer: {
        contact: "Contact us",
        privacy: "Privacy Policy",
      },
    },
  },
  el: {
    translation: {
      // Banner translations
      "banner.title": "Βρείτε το ιδανικό σας σπίτι",
      "banner.highlight": "εταίρος ανταλλαγής",
      "banner.subtitle":
        "Ανταλλάξτε το σπίτι σας με ταξιδιώτες από όλο τον κόσμο — ασφαλές, εύκολο και ευέλικτο.",

      // SearchFilter translations
      "search.placeholder": "Πού θα πας;",

      // Existing translations
      welcome: "Καλώς ήρθατε",
      description: "Αυτή είναι η περιγραφή στα Ελληνικά.",
      footer: {
        contact: "Επικοινωνήστε μαζί μας",
        privacy: "Πολιτική Απορρήτου",
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(XHR)
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // Default language
    fallbackLng: "en", // Fallback language if the current language isn't available
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    debug: true, // Log i18next initialization for debugging
  });

export default i18n;
