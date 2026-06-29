import { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import CtaButton from "../reusable/CtaButton/CtaButton";
import Banner1 from "@/assets/banner/first-image.png"
import Banner2 from "@/assets/banner/luxury-1-new.png"
import Banner3 from "@/assets/banner/tavern-1-new.png"

// Add your actual image paths from your assets folder here
const CAROUSEL_IMAGES = [
  Banner1,
  Banner2,
  Banner3
];

const AUTOPLAY_INTERVAL = 4000;

const Banner = () => {
  const { t } = useTranslation("banner");
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 700);
    },
    [isTransitioning]
  );

  const goToNext = useCallback(() => {
    goToSlide((currentIndex + 1) % CAROUSEL_IMAGES.length);
  }, [currentIndex, goToSlide]);

  // Autoplay
  useEffect(() => {
    const timer = setInterval(goToNext, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [goToNext]);

  return (
    <section className="relative w-full h-screen min-h-[420px] overflow-hidden">
      {/* ── Slides ── */}
      {CAROUSEL_IMAGES.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out"
          style={{ opacity: i === currentIndex ? 1 : 0 }}
          aria-hidden={i !== currentIndex}
        >
          <img
            src={src}
            alt={`Banner slide ${i + 1}`}
            className="w-full h-full object-cover object-center"
            loading={i === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}

      {/* ── Left-side gradient overlay for text readability ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.55) 10%, rgba(0,0,0,0.25) 50%, transparent 100%)",
        }}
      />
      {/* ── Bottom gradient for depth ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.30) 0%, transparent 40%)",
        }}
      />

      {/* ── Content — centred on mobile, left-aligned on md+ ── */}
      <div className="absolute top-[25%] md:top-[35%] lg:top-[30%] lg:right-[46%] w-full md:w-auto flex flex-col items-center md:items-start justify-end pb-12 md:pb-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-[620px] text-center md:text-left">
          <h1
            className={`font-normal text-white leading-[1] mb-3 md:mb-4 drop-shadow-md
              ${currentLanguage === "el"
                ? "text-2xl md:text-4xl lg:text-[46px]"
                : "text-3xl md:text-4xl lg:text-[50px]"
              }`}
          >
            {t("banner.title")}{" "}
            <span className="font-Grand-Hotel text-white text-[50px] lg:text-[65px]">
              {t("banner.highlight")}
            </span>
            {currentLanguage === "en" ? t("banner.title2") : ""}
          </h1>

          <p className="text-base md:text-lg text-white/90 font-medium mb-6 md:mb-8 drop-shadow-sm">
            {t("banner.subtitle")}
          </p>

          <div className="flex justify-center md:justify-start">
            <CtaButton />
          </div>
        </div>

        {/* ── Dot indicators ── */}
        <div className="flex items-center justify-center md:justify-start gap-2 mt-8">
          {CAROUSEL_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`transition-all duration-300 rounded-full focus:outline-none
                ${i === currentIndex
                  ? "w-7 h-2.5 bg-white"
                  : "w-2.5 h-2.5 bg-white/50 hover:bg-white/75"
                }`}
            />
          ))}
        </div>
      </div>

      {/* ── Prev / Next arrow buttons — hidden on mobile ── */}
      <button
        onClick={() =>
          goToSlide(
            (currentIndex - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length
          )
        }
        aria-label="Previous slide"
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm items-center justify-center transition-colors focus:outline-none"
      >
        <svg
          className="w-5 h-5 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={goToNext}
        aria-label="Next slide"
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm items-center justify-center transition-colors focus:outline-none"
      >
        <svg
          className="w-5 h-5 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </section>
  );
};

export default Banner;