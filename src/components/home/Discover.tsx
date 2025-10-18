import { useEffect, useRef, useState } from "react";
import CommonWrapper from "@/common/CommonWrapper";
import ClientHeading from "../reusable/ClientHeading";
import discoverEnglish from "@/assets/home/VACANZA-VSL-ENGLISH-NEW.mp4";
import discoverGreek from "@/assets/home/VACANZA-VSL-GREEK-NEW.mp4";
import playBtn from "@/assets/home/playButton.png";
import { useTranslation } from "react-i18next";

const Discover = () => {
  const { t, i18n } = useTranslation("discover");
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoWrapperRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const videoSrc = i18n.language === "el" ? discoverGreek : discoverEnglish;

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        // exited fullscreen → reset state
        setIsPlaying(false);

        if (videoRef.current) {
          videoRef.current.muted = true; // back to silent mode
          videoRef.current.pause(); // optional → pause when exit fullscreen
          // videoRef.current.currentTime = 0; // optional → restart from beginning
          videoRef.current.play(); // keep looping silently in background
        }
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    if (videoWrapperRef.current) {
      observer.observe(videoWrapperRef.current);
    }

    return () => {
      if (videoWrapperRef.current) observer.unobserve(videoWrapperRef.current);
    };
  }, []);

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play();
      setIsPlaying(true);

      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div className="pb-10 lg:pb-32">
      <CommonWrapper>
        <ClientHeading
          headingText={t("section.title")}
          spanText={t("section.highlight")}
        />
        <p className="text-lg md:text-xl lg:text-2xl text-dark-3 py-6 font-regular text-center max-w-4xl mx-auto mb-10">
          {t("section.para")}
        </p>

        <div ref={videoWrapperRef} className="mt-9 relative md:px-20 lg:px-20">
          {isVisible ? (
            <video
              ref={videoRef}
              src={videoSrc}
              className="w-full h-auto rounded-[40px]"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/discover-poster-min.png"
            />
          ) : (
            <img
              src="/discover-poster.png"
              alt="Discover"
              className="w-full h-auto rounded-[40px]"
            />
          )}

          {!isPlaying && (
            <button
              onClick={handlePlayClick}
              className="absolute -bottom-8 md:-bottom-10 lg:-bottom-12 left-1/2 transform -translate-x-1/2 p-4 md:p-6 rounded-full bg-black/20 backdrop-blur-xl z-10"
            >
              <img
                src={playBtn}
                alt="Play"
                className="w-8 h-8 md:w-10 md:h-10 lg:w-16 lg:h-16"
              />
            </button>
          )}
        </div>
      </CommonWrapper>
    </div>
  );
};

export default Discover;
