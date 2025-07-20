import React, { useRef, useState, useEffect } from "react";
import imgUpload from "@/assets/icons/imgUpload.svg";
import photoCross from "@/assets/icons/photoCross.svg";

interface PhotoUploadProps {
  photos: File[];
  onPhotosChange: (photos: File[]) => void;
}

const PhotoUpload = ({ photos, onPhotosChange }: PhotoUploadProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (photos.length === 0) {
      setSelectedIndex(0);
    } else if (selectedIndex >= photos.length) {
      setSelectedIndex(Math.max(0, photos.length - 1));
    }
  }, [photos.length, selectedIndex]);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const newFiles = Array.from(selectedFiles).filter((file) =>
        ["image/jpeg", "image/png", "image/jpg"].includes(file.type)
      );
      onPhotosChange([...photos, ...newFiles]);
      if (photos.length === 0 && newFiles.length > 0) {
        setSelectedIndex(0); // Default preview if it's the first image
      }
    }
  };

  const removeImage = (indexToRemove: number) => {
    const newPhotos = photos.filter((_, i) => i !== indexToRemove);
    onPhotosChange(newPhotos);

    setSelectedIndex((prevSelected) => {
      if (indexToRemove === prevSelected) {
        return 0;
      } else if (indexToRemove < prevSelected) {
        return prevSelected - 1;
      } else {
        return prevSelected;
      }
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 mt-4">
      {/* Left Side Upload Area */}
      <div className="lg:col-span-5 space-y-4">
        {/* Uploaded Images List */}
        {photos.length > 0 && (
          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
            {photos.map((img, index) => (
              <div
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`flex justify-between p-2 items-center rounded-lg  cursor-pointer transition hover:bg-blue-50 ${
                  selectedIndex === index ? "bg-primary-blue/10" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={URL.createObjectURL(img)}
                    alt={`Thumb-${index}`}
                    className="w-10 h-10 rounded object-cover "
                  />
                  <div className="flex flex-col">
                    <span className="text-lg font-normal text-dark-2 truncate max-w-[120px]">
                      {img.name}
                    </span>
                    <span className="text-sm text-dark-3">
                      <span className="text-[#AFAFAF]"> Size:</span>{" "}
                      {(img.size / 1024).toFixed(1)} KB
                    </span>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(index);
                  }}
                  className="text-red-500 text-lg font-bold px-2"
                >
                  <img src={photoCross} alt="Remove" className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Upload Card */}
        <div
          onClick={handleUploadClick}
          className="flex items-center gap-3 p-4 border border-[#BFD4F0] rounded-xl cursor-pointer hover:bg-[#F1F5FB] transition"
        >
          <div className="p-2">
            <img src={imgUpload} className="w-10 h-10" alt="Upload" />
          </div>
          <div>
            <h3 className="text-lg text-primary-blue font-medium">
              Upload Picture
            </h3>
            <p className="text-sm text-dark-3 font-regular mt-1">
              Upload an image of your property (JPG or PNG format supported)
            </p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/jpg"
            className="hidden"
            multiple
            onChange={handleFileChange}
          />
        </div>
      </div>

      {/* Right Side Preview */}
      <div className="lg:col-span-7 min-h-[360px] bg-[#F8F8F8] rounded-2xl overflow-hidden flex items-center justify-center">
        {photos.length > 0 ? (
          <img
            src={URL.createObjectURL(photos[selectedIndex])}
            alt="Preview"
            className="h-full w-full object-cover"
          />
        ) : (
          <p className="text-gray-400">No image selected</p>
        )}
      </div>
    </div>
  );
};

export default PhotoUpload;
