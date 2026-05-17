import { useEffect, useState } from "react";
import i18n from "@/i18n";
import Loader from "@/components/reusable/Loader";

const LanguageInitializer = ({ children }: { children: React.ReactNode }) => {
  // Only show loading screen on the very first visit (when country has not been detected yet)
  const [loading, setLoading] = useState(() => {
    const detected = localStorage.getItem("user-lang-detected");
    return !detected;
  });

  useEffect(() => {
    const initializeLanguage = async () => {
      const detected = localStorage.getItem("user-lang-detected");
      if (detected) {
        // Already detected on a previous visit, use the existing preference saved in localStorage
        const savedLanguage = localStorage.getItem("i18nextLng");
        if (savedLanguage) {
          console.log("LanguageInitializer: Language preference already exists:", savedLanguage);
          await i18n.changeLanguage(savedLanguage);
        }
        return;
      }

      console.log("LanguageInitializer: First visit detected. Starting country detection via IP lookup...");

      // No saved language preference yet, detect by country IP
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);

        // Try api.country.is first (fast, HTTPS-supported, free, no key required)
        const res = await fetch("https://api.country.is", { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await res.json();
        
        console.log("LanguageInitializer: api.country.is response:", data);

        if (data && data.country === "GR") {
          console.log("LanguageInitializer: Detected country Greece (GR). Setting language to Greek (el).");
          await i18n.changeLanguage("el");
          localStorage.setItem("i18nextLng", "el");
        } else {
          const country = data?.country || "unknown";
          console.log(`LanguageInitializer: Detected country ${country}. Setting language to English (en).`);
          await i18n.changeLanguage("en");
          localStorage.setItem("i18nextLng", "en");
        }
        localStorage.setItem("user-lang-detected", "true");
      } catch (err) {
        console.warn("Failed to detect country using country.is, trying fallback...", err);
        // Try fallback ipapi.co
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 2000);
          
          const res = await fetch("https://ipapi.co/json/", { signal: controller.signal });
          clearTimeout(timeoutId);
          const data = await res.json();

          console.log("LanguageInitializer: ipapi.co fallback response:", data);

          if (data && data.country_code === "GR") {
            console.log("LanguageInitializer: Detected country Greece (GR) via fallback. Setting language to Greek (el).");
            await i18n.changeLanguage("el");
            localStorage.setItem("i18nextLng", "el");
          } else {
            const country = data?.country_code || "unknown";
            console.log(`LanguageInitializer: Detected country ${country} via fallback. Setting language to English (en).`);
            await i18n.changeLanguage("en");
            localStorage.setItem("i18nextLng", "en");
          }
          localStorage.setItem("user-lang-detected", "true");
        } catch (fallbackErr) {
          console.error("All country detection methods failed. Defaulting to English.", fallbackErr);
          // Standard fallback language for international visitors
          await i18n.changeLanguage("en");
          localStorage.setItem("i18nextLng", "en");
          localStorage.setItem("user-lang-detected", "true");
        }
      } finally {
        setLoading(false);
      }
    };

    initializeLanguage();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return <>{children}</>;
};

export default LanguageInitializer;
