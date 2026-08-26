import { useEffect, useRef } from "react";

interface DiscoverCarsWidgetProps {
  language: "en" | "el";
}

const DiscoverCarsWidget = ({ language }: DiscoverCarsWidgetProps) => {
  const widgetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!widgetRef.current) return;

    // Remove previous widget when language changes
    widgetRef.current.innerHTML = "";

    const script = document.createElement("script");

    script.id = "dchwidget";
    script.src = "https://www.discovercars.com/widget.js?v1";

    script.setAttribute("data-dev-env", "com");
    script.setAttribute("data-location", "greece");
    script.setAttribute("data-lang", language === "en" ? "en" : "gr");
    script.setAttribute("data-currency", "eur");

    script.setAttribute("data-utm-source", "Vacanzagreece");
    script.setAttribute("data-utm-medium", "widget");
    script.setAttribute("data-aff-code", "a_aid");

    script.setAttribute("data-autocomplete", "on");

    script.setAttribute("data-style-submit-bg-color", "#62c2f9");
    script.setAttribute("data-style-submit-font-color", "#ffffff");

    script.setAttribute("data-style-form-bg-color", "#d5c3e5");
    script.setAttribute("data-style-form-font-color", "#000000");

    script.setAttribute(
      "data-style-submit-text",
      language === "en" ? "Search now" : "Αναζήτηση τώρα",
    );

    script.setAttribute("data-style-title-color", "#000000");

    script.setAttribute(
      "data-title-text",
      language === "en"
        ? "Search and compare car rentals and save up to 70%!"
        : "Αναζητήστε και συγκρίνετε ενοικιάσεις αυτοκινήτων και εξοικονομήστε έως και 70%!",
    );

    script.setAttribute("data-style-rounded-corners", "on");

    script.setAttribute("data-layout-description", "on");

    script.setAttribute(
      "data-layout-description-text",
      language === "en"
        ? "We have selected the best offers from our car rental partners."
        : "Επιλέξαμε τις καλύτερες προσφορές από τους συνεργάτες μας στον τομέα της ενοικίασης αυτοκινήτων.",
    );

    script.setAttribute("data-layout-title", "on");
    script.setAttribute("data-layout-supplier-logos", "on");

    widgetRef.current.appendChild(script);

    return () => {
      if (widgetRef.current) {
        widgetRef.current.innerHTML = "";
      }
    };
  }, [language]);

  return (
    <div className="mt-16 flex justify-center opacity-90">
      <div ref={widgetRef} />
    </div>
  );
};

export default DiscoverCarsWidget;
