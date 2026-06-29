import { useState } from "react";
import { ChevronLeft, ChevronRight, X, Play } from "lucide-react";

interface PhotoType {
  src: string;
  alt: string;
}

interface PhotosProps {
  photos: PhotoType[];
}

const isVideoUrl = (url?: string): boolean => {
  if (!url) return false;
  return /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url);
};

const Photos = ({ photos }: PhotosProps) => {
  const [showPreview, setShowPreview] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setCurrentIndex(index);
    setShowPreview(true);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!showPreview) return;

    if (e.key === "ArrowRight") {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    } else if (e.key === "ArrowLeft") {
      setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
    } else if (e.key === "Escape") {
      setShowPreview(false);
    }
  };

  // Add keyboard event listener
  useState(() => {
    if (showPreview) {
      window.addEventListener("keydown", handleKeyDown as any);
      return () => window.removeEventListener("keydown", handleKeyDown as any);
    }
  });

  if (!photos || photos.length === 0) {
    return (
      <div className="rounded-lg md:rounded-xl lg:rounded-3xl overflow-hidden bg-gray-200 h-64 flex items-center justify-center">
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  /** Renders image or video based on the URL */
  const renderMedia = (
    photo: PhotoType,
    className: string,
    options?: { controls?: boolean; muted?: boolean; autoPlay?: boolean; loop?: boolean }
  ) => {
    if (isVideoUrl(photo.src)) {
      return (
        <video
          src={photo.src}
          className={className}
          controls={options?.controls ?? false}
          muted={options?.muted ?? true}
          autoPlay={options?.autoPlay ?? false}
          loop={options?.loop ?? true}
          playsInline
        />
      );
    }
    return (
      <img
        src={photo.src}
        className={className}
        alt={photo.alt}
        onError={(e) => {
          (e.target as HTMLImageElement).src = "/placeholder-image.jpg";
        }}
      />
    );
  };

  return (
    <div className="relative">
      {/* Main Image / Video */}
      <div
        className="rounded-lg md:rounded-xl lg:rounded-3xl overflow-hidden cursor-pointer relative"
        onClick={() => handleImageClick(0)}
      >
        {renderMedia(photos[0], "w-full h-auto lg:h-[488px] object-cover", {
          muted: true,
          autoPlay: true,
          loop: true,
        })}
        {isVideoUrl(photos[0]?.src) && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-black/40 rounded-full p-4">
              <Play className="w-10 h-10 text-white fill-white" />
            </div>
          </div>
        )}
      </div>

      {/* Thumbnail Grid */}
      {photos.length > 1 && (
        <div className="grid grid-cols-3 gap-4 mt-4">
          {photos.slice(1).map((photo, index) => (
            <div
              key={index}
              className="rounded-lg md:rounded-xl lg:rounded-3xl overflow-hidden cursor-pointer relative group"
              onClick={() => handleImageClick(index + 1)}
            >
              {isVideoUrl(photo.src) ? (
                <>
                  <video
                    src={photo.src}
                    muted
                    playsInline
                    className="w-full h-auto lg:h-44 object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-black/40 rounded-full p-2">
                      <Play className="w-5 h-5 text-white fill-white" />
                    </div>
                  </div>
                </>
              ) : (
                <img
                  src={photo.src}
                  className="w-full h-auto lg:h-44 object-cover"
                  alt={photo.alt}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder-image.jpg";
                  }}
                />
              )}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      )}

      {/* Image/Video Preview Overlay */}
      {showPreview && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={() => setShowPreview(false)}
        >
          <div className="relative w-full h-full flex items-center justify-center p-4">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-3 hover:bg-black/75 transition-colors cursor-pointer z-10"
              onClick={(e) => {
                e.stopPropagation();
                setShowPreview(false);
              }}
            >
              <X size={24} />
            </button>

            {/* Image Counter */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full">
              {currentIndex + 1} / {photos.length}
            </div>

            {/* Previous Button */}
            {photos.length > 1 && (
              <button
                className="absolute left-4 text-white bg-black/50 rounded-full p-3 hover:bg-black/75 transition-colors cursor-pointer z-10"
                onClick={handlePrevious}
              >
                <ChevronLeft size={32} />
              </button>
            )}

            {/* Main Preview Content */}
            <div
              className="max-w-6xl max-h-[85vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {isVideoUrl(photos[currentIndex]?.src) ? (
                <video
                  key={photos[currentIndex]?.src}
                  src={photos[currentIndex]?.src}
                  controls
                  autoPlay
                  className="max-w-full max-h-[85vh] object-contain rounded-2xl"
                />
              ) : (
                <img
                  src={photos[currentIndex]?.src}
                  className="max-w-full max-h-[85vh] object-contain rounded-2xl"
                  alt={photos[currentIndex]?.alt}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder-image.jpg";
                  }}
                />
              )}
            </div>

            {/* Next Button */}
            {photos.length > 1 && (
              <button
                className="absolute right-4 text-white bg-black/50 rounded-full p-3 hover:bg-black/75 transition-colors cursor-pointer z-10"
                onClick={handleNext}
              >
                <ChevronRight size={32} />
              </button>
            )}

            {/* Thumbnail Strip */}
            {photos.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto px-4 py-2 bg-black/50 rounded-lg">
                {photos.map((photo, index) => (
                  <div
                    key={index}
                    className={`flex-shrink-0 w-16 h-16 rounded cursor-pointer transition-all relative ${
                      index === currentIndex
                        ? "ring-2 ring-white scale-110"
                        : "opacity-60 hover:opacity-100"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex(index);
                    }}
                  >
                    {isVideoUrl(photo.src) ? (
                      <>
                        <video
                          src={photo.src}
                          muted
                          playsInline
                          className="w-full h-full object-cover rounded"
                        />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <Play className="w-3 h-3 text-white fill-white" />
                        </div>
                      </>
                    ) : (
                      <img
                        src={photo.src}
                        className="w-full h-full object-cover rounded"
                        alt={photo.alt}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/placeholder-image.jpg";
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Photos;
