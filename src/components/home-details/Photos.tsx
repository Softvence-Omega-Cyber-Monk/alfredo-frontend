import { useState } from "react";

interface PhotoType {
  src: string;
  alt: string;
}

interface PhotosProps {
  photos: PhotoType[];
}

const Photos = ({ photos }: PhotosProps) => {
  const [showPreview, setShowPreview] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const handleImageClick = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    setShowPreview(true);
  };

  if (!photos || photos.length === 0) {
    return (
      <div className="rounded-lg md:rounded-xl lg:rounded-3xl overflow-hidden bg-gray-200 h-64 flex items-center justify-center">
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Main Image */}
      <div
        className="rounded-lg md:rounded-xl lg:rounded-3xl overflow-hidden cursor-pointer"
        onClick={() => handleImageClick(photos[0]?.src)}
      >
        <img
          src={photos[0]?.src}
          className="w-full h-auto lg:h-[488px] object-cover"
          alt={photos[0]?.alt}
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder-image.jpg";
          }}
        />
      </div>

      {/* Thumbnail Grid */}
      {photos.length > 1 && (
        <div className="grid grid-cols-3 gap-4 mt-4">
          {photos.slice(1).map((photo, index) => (
            <div
              key={index}
              className="rounded-lg md:rounded-xl lg:rounded-3xl overflow-hidden cursor-pointer relative group"
              onClick={() => handleImageClick(photo.src)}
            >
              <img
                src={photo.src}
                className="w-full h-auto lg:h-44 object-cover"
                alt={photo.alt}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/placeholder-image.jpg";
                }}
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      )}

      {/* Image Preview Overlay */}
      {showPreview && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
          onClick={() => setShowPreview(false)}
        >
          <div className="relative max-w-6xl mx-auto p-4 rounded-2xl overflow-hidden">
            <img
              src={selectedImage}
              className="w-full h-auto max-h-[80vh] object-contain rounded-2xl overflow-hidden"
              alt=""
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/placeholder-image.jpg";
              }}
            />
            <button
              className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 m-2 hover:bg-black/75 transition-colors cursor-pointer"
              onClick={() => setShowPreview(false)}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Photos;
