import React, { useState, useEffect } from "react";
// import imgUpload from "@/assets/icons/imgUpload.svg";
import photoCross from "@/assets/icons/photoCross.svg";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

interface PhotoUploadProps {
  photos: File[];
  onPhotosChange: (photos: File[]) => void;
}

const PhotoUpload = ({ photos, onPhotosChange }: PhotoUploadProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  // const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (photos.length === 0) {
      setSelectedIndex(0);
    } else if (selectedIndex >= photos.length) {
      setSelectedIndex(Math.max(0, photos.length - 1));
    }
  }, [photos.length, selectedIndex]);

  // const handleUploadClick = () => {
  //   fileInputRef.current?.click();
  // };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      if (photos.length + selectedFiles.length > 5) {
        toast.error("You can upload a maximum of 5 photos");
        return;
      }
      const newFiles = Array.from(selectedFiles).filter((file) =>
        ["image/jpeg", "image/png", "image/jpg", "image/heic", "image/heif"].includes(file.type.toLowerCase()) ||
        file.name.toLowerCase().endsWith(".heic") ||
        file.name.toLowerCase().endsWith(".heif")
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

  const { t } = useTranslation("dashboard");
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
                className={`flex justify-between p-2 items-center rounded-lg  cursor-pointer transition hover:bg-blue-50 ${selectedIndex === index ? "bg-primary-blue/10" : ""
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

        {/* Upload Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          {/* File Upload */}
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-8 h-8 mb-2 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
              </svg>
              <p className="text-sm text-gray-500">
                <span className="font-semibold">Upload from File</span>
              </p>
            </div>
            <input
              type="file"
              multiple
              accept="image/*,.heic,.heif,.HEIC,.HEIF"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {/* Camera Upload */}
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-8 h-8 mb-2 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-sm text-gray-500">
                <span className="font-semibold">Take a Photo</span>
              </p>
            </div>
            <input
              type="file"
              accept="image/*,.heic,.heif,.HEIC,.HEIF"
              capture="environment"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
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
          <p className="text-gray-400"> {t("dashboard.part4.image")}</p>
        )}
      </div>
    </div>
  );
};

export default PhotoUpload;

// import React, { useRef, useState, useEffect } from "react";
// import imgUpload from "@/assets/icons/imgUpload.svg";
// import photoCross from "@/assets/icons/photoCross.svg";

// interface PhotoUploadProps {
//   photos: File[];
//   onPhotosChange: (photos: File[]) => void;
// }

// const PhotoUpload = ({ photos, onPhotosChange }: PhotoUploadProps) => {
//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     if (photos.length === 0) {
//       setSelectedIndex(0);
//     } else if (selectedIndex >= photos.length) {
//       setSelectedIndex(Math.max(0, photos.length - 1));
//     }
//   }, [photos.length, selectedIndex]);

//   const handleUploadClick = () => {
//     fileInputRef.current?.click();
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFiles = e.target.files;
//     if (selectedFiles) {
//       const newFiles = Array.from(selectedFiles).filter((file) =>
//         ["image/jpeg", "image/png", "image/jpg"].includes(file.type)
//       );
//       onPhotosChange([...photos, ...newFiles]);
//       if (photos.length === 0 && newFiles.length > 0) {
//         setSelectedIndex(0); // Default preview if it's the first image
//       }
//     }
//   };

//   const removeImage = (indexToRemove: number) => {
//     const newPhotos = photos.filter((_, i) => i !== indexToRemove);
//     onPhotosChange(newPhotos);

//     setSelectedIndex((prevSelected) => {
//       if (indexToRemove === prevSelected) {
//         return 0;
//       } else if (indexToRemove < prevSelected) {
//         return prevSelected - 1;
//       } else {
//         return prevSelected;
//       }
//     });
//   };

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 mt-4">
//       {/* Left Side Upload Area */}
//       <div className="lg:col-span-5 space-y-4">
//         {/* Uploaded Images List */}
//         {photos.length > 0 && (
//           <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
//             {photos.map((img, index) => (
//               <div
//                 key={index}
//                 onClick={() => setSelectedIndex(index)}
//                 className={`flex justify-between p-2 items-center rounded-lg  cursor-pointer transition hover:bg-blue-50 ${
//                   selectedIndex === index ? "bg-primary-blue/10" : ""
//                 }`}
//               >
//                 <div className="flex items-center gap-3">
//                   <img
//                     src={URL.createObjectURL(img)}
//                     alt={`Thumb-${index}`}
//                     className="w-10 h-10 rounded object-cover "
//                   />
//                   <div className="flex flex-col">
//                     <span className="text-lg font-normal text-dark-2 truncate max-w-[120px]">
//                       {img.name}
//                     </span>
//                     <span className="text-sm text-dark-3">
//                       <span className="text-[#AFAFAF]"> Size:</span>{" "}
//                       {(img.size / 1024).toFixed(1)} KB
//                     </span>
//                   </div>
//                 </div>
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     removeImage(index);
//                   }}
//                   className="text-red-500 text-lg font-bold px-2"
//                 >
//                   <img src={photoCross} alt="Remove" className="w-5 h-5" />
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Upload Card */}
//         <div
//           onClick={handleUploadClick}
//           className="flex items-center gap-3 p-4 border border-[#BFD4F0] rounded-xl cursor-pointer hover:bg-[#F1F5FB] transition"
//         >
//           <div className="p-2">
//             <img src={imgUpload} className="w-10 h-10" alt="Upload" />
//           </div>
//           <div>
//             <h3 className="text-lg text-primary-blue font-medium">
//               Upload Picture
//             </h3>
//             <p className="text-sm text-dark-3 font-regular mt-1">
//               Upload an image of your property (JPG or PNG format supported)
//             </p>
//           </div>
//           <input
//             ref={fileInputRef}
//             type="file"
//             accept="image/jpeg,image/png,image/jpg"
//             className="hidden"
//             multiple
//             onChange={handleFileChange}
//           />
//         </div>
//       </div>

//       {/* Right Side Preview */}
//       <div className="lg:col-span-7 min-h-[360px] bg-[#F8F8F8] rounded-2xl overflow-hidden flex items-center justify-center">
//         {photos.length > 0 ? (
//           <img
//             src={URL.createObjectURL(photos[selectedIndex])}
//             alt="Preview"
//             className="h-full w-full object-cover"
//           />
//         ) : (
//           <p className="text-gray-400">No image selected</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PhotoUpload;
