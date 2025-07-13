import { useState } from 'react';
import cardImg from "@/assets/home/cardImg.jpg";
import { X } from "lucide-react";

const Photos = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const handleImageClick = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    setShowPreview(true);
  };

  return (
    <div className="relative">
      {/* Main Image */}
      <div 
        className="rounded-lg md:rounded-xl lg:rounded-3xl overflow-hidden cursor-pointer"
        onClick={() => handleImageClick(cardImg)}
      >
        <img src={cardImg} className="w-full h-auto lg:h-[488px] object-cover" alt="" />
      </div>

      {/* Thumbnail Grid */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        {[1, 2, 3].map((_, index) => (
          <div 
            key={index}
            className="rounded-lg md:rounded-xl lg:rounded-3xl overflow-hidden cursor-pointer relative group"
            onClick={() => handleImageClick(cardImg)}
          >
            <img src={cardImg} className="w-full h-auto lg:h-44 object-cover" alt="" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </div>

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
            />
            <button
              className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 m-2 hover:bg-black/75 transition-colors"
              onClick={() => setShowPreview(false)}
            >
              <X />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Photos;