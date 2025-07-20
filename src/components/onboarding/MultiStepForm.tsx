import { useState } from "react";
import { MoveLeft, MoveRight } from "lucide-react";

import star1 from "../../assets/icons/Star22.svg";
import star2 from "../../assets/icons/starBlue.svg";

import GetStarted from "./GetStarted";
import VerificationProcess from "./VerificationProcess";
import SelectType from "./SelectType";
import SelectAmenities from "./SelectAmenities";
import AboutYourHome from "./AboutYourHome";
import UploadPhoto from "./UploadPhoto";
import HomeAvailability from "./HomeAvailability";

const steps = [
  { number: 1, title: "Welcome", subtitle: "State" },
  { number: 2, title: "Travel", subtitle: "Verification" },
  { number: 3, title: "Select", subtitle: "Type" },
  { number: 4, title: "Select", subtitle: "Amenities" },
  { number: 5, title: "About", subtitle: "Your Home" },
  { number: 6, title: "Upload", subtitle: "Photo" },
  { number: 7, title: "Home’s", subtitle: "Availability" },
];

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <GetStarted />;
      case 2:
        return <VerificationProcess />;
      case 3:
        return <SelectType />;
      case 4:
        return <SelectAmenities />;
      case 5:
        return <AboutYourHome />;
      case 6:
        return <UploadPhoto />;
      case 7:
        return <HomeAvailability />;
      default:
        return <div className="text-center">Invalid step</div>;
    }
  };

  const renderButtons = () => {
    const cancelBtn = (
      <button
        onClick={() => setCurrentStep(1)}
        className="relative overflow-hidden rounded-full border border-[#80808080] transition-colors text-sm md:text-base lg:text-lg font-medium cursor-pointer px-6 py-2 text-[#80808080] flex items-center justify-center gap-2.5 w-full md:w-auto"
      >
        <p className="relative z-10">Cancel</p>
        <div className="absolute bottom-0 right-0 opacity-80 items-center justify-center overflow-hidden">
          <img src="/buttonHomeWhite.svg" alt="icon" className="w-full" />
        </div>
      </button>
    );

    const backBtn = (
      <button
        onClick={() => setCurrentStep((prev) => prev - 1)}
        className="relative overflow-hidden rounded-full border border-[#A0BFE8] transition-colors text-sm md:text-base lg:text-lg font-medium cursor-pointer px-6 py-2 text-[#A0BFE8] flex items-center justify-center gap-2.5 w-full md:w-auto"
      >
        <MoveLeft className="relative z-10 w-5 h-5" />
        <p className="relative z-10">Back</p>
        <div className="absolute bottom-0 right-0 opacity-80 items-center justify-center overflow-hidden">
          <img src="/buttonHomeWhite.svg" alt="icon" className="w-full" />
        </div>
      </button>
    );

    const continueBtn = (
      <button
        onClick={() => setCurrentStep((prev) => prev + 1)}
        className="relative overflow-hidden rounded-full transition-colors text-sm md:text-base lg:text-lg font-medium cursor-pointer px-6 py-2 bg-primary-blue text-white flex items-center justify-center gap-2.5 w-full md:w-auto"
      >
        <p className="relative z-10">Continue</p>
        <div className="absolute bottom-0 right-0 opacity-80 items-center justify-center overflow-hidden">
          <img src="/buttonHomeIcon.svg" alt="icon" className="w-full" />
        </div>
        <MoveRight className="relative z-10 w-5 h-5" />
      </button>
    );

    const finishBtn = (
      <button
        type="submit"
        className="relative overflow-hidden rounded-full transition-colors text-sm md:text-base lg:text-lg font-medium cursor-pointer px-6 py-2 bg-primary-blue text-white flex items-center justify-center gap-2.5 w-full md:w-auto"
      >
        <p className="relative z-10">Continue</p>
        <div className="absolute bottom-0 right-0 opacity-80 items-center justify-center overflow-hidden">
          <img src="/buttonHomeIcon.svg" alt="icon" className="w-full" />
        </div>
        <MoveRight className="relative z-10 w-5 h-5" />
      </button>
    );

    if (currentStep === 1) {
      return (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
          {cancelBtn}
          <div className="flex gap-4 w-full sm:w-auto justify-end">
            {continueBtn}
          </div>
        </div>
      );
    }

    if (currentStep === steps.length) {
      return (
        <div className="flex gap-4 w-full sm:w-auto justify-end mt-6">
          {backBtn}
          {finishBtn}
        </div>
      );
    }

    return (
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
        {cancelBtn}
        <div className="flex gap-4 w-full sm:w-auto justify-end">
          {backBtn}
          {continueBtn}
        </div>
      </div>
    );
  };

  return (
    <div className="relative mb-12 overflow-x-auto px-2 sm:px-4">
      <div className="flex justify-between items-start relative z-10">
        {steps.map((step, index) => {
          const isActive = currentStep === step.number;
          const isCompleted = currentStep > step.number;
          const starIcon = isActive || isCompleted ? star2 : star1;

          return (
            <div
              key={step.number}
              className={`flex flex-col items-start justify-between relative min-w-[100px] ${
                index !== steps.length - 1 ? "flex-1" : "justify-end"
              }`}
            >
              {/* Top row: Icon and dashed line */}
              <div className="flex items-center justify-between w-full">
                {/* Step Icon */}
                <div
                  className={`relative z-20 shrink-0 flex items-center justify-center bg-transparent rounded-full w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 `}
                >
                  <img
                    src={starIcon}
                    alt={`Step ${step.number}`}
                    className="w-full h-full"
                  />
                  <div className="absolute text-white text-sm sm:text-base md:text-xl font-bold">
                    {step.number}
                  </div>
                </div>

                {/* Dashed Line (not after last item) */}
                {index !== steps.length - 1 ? (
                  <div className="flex-1 h-[2px] ml-2 relative">
                    <div className="absolute top-1/2 left-0 w-full border-t-2 border-dashed border-gray-300 transform -translate-y-1/2 z-0"></div>
                    <div
                      className="absolute top-1/2 left-0 h-[2px] bg-[#3174CD] transition-all duration-500 transform -translate-y-1/2 z-10"
                      style={{
                        width:
                          currentStep > step.number
                            ? "100%"
                            : currentStep === step.number
                            ? "50%"
                            : "0%",
                      }}
                    ></div>
                  </div>
                ) : (
                  <div className="w-0" />
                )}
              </div>

              {/* Bottom row: Step title + subtitle */}
              <div className="text-center mt-2">
                <p
                  className={`text-[13px] font-medium ${
                    isActive || isCompleted ? "text-[#3174CD]" : "text-gray-400"
                  }`}
                >
                  {step.title}
                </p>
                <p
                  className={`text-[13px] font-medium ${
                    isActive || isCompleted ? "text-[#3174CD]" : "text-gray-400"
                  }`}
                >
                  {step.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      {/* Step Content */}
      <div>{renderStepContent()}</div>

      {/* Buttons */}
      {renderButtons()}
    </div>
  );
};

export default MultiStepForm;

// import { useState } from "react";
// import { FaArrowRight } from "react-icons/fa";
// import { MoveLeft, MoveRight } from "lucide-react";
// import { Button } from "@/components/ui/button";

// import star1 from "../../assets/icons/Star22.svg";
// import star2 from "../../assets/icons/starBlue.svg";

// import GetStarted from "./GetStarted";
// import VerificationProcess from "./VerificationProcess";
// import SelectType from "./SelectType";
// import SelectAmenities from "./SelectAmenities";
// import AboutYourHome from "./AboutYourHome";
// import UploadPhoto from "./UploadPhoto";
// import HomeAvailability from "./HomeAvailability";

// const steps = [
//   { number: 1, title: "Welcome", subtitle: "State" },
//   { number: 2, title: "Travel", subtitle: "Verification" },
//   { number: 3, title: "Select", subtitle: "Type" },
//   { number: 4, title: "Select", subtitle: "Amenities" },
//   { number: 5, title: "About", subtitle: "Your Home" },
//   { number: 6, title: "Upload", subtitle: "Photo" },
//   { number: 7, title: "Home’s", subtitle: "Availability" },
// ];

// const MultiStepForm = () => {
//   const [currentStep, setCurrentStep] = useState<number>(1);

//   const renderStepContent = () => {
//     switch (currentStep) {
//       case 1:
//         return <GetStarted />;
//       case 2:
//         return <VerificationProcess />;
//       case 3:
//         return <SelectType />;
//       case 4:
//         return <SelectAmenities />;
//       case 5:
//         return <AboutYourHome />;
//       case 6:
//         return <UploadPhoto />;
//       case 7:
//         return <HomeAvailability />;
//       default:
//         return <div className="text-center">Invalid step</div>;
//     }
//   };

//   const commonBtnClass =
//     "w-full sm:w-auto h-[52px] px-8 py-3 rounded-[35px] text-[18px] font-semibold leading-[156%] flex items-center justify-center gap-2 cursor-pointer";

//   const renderButtons = () => {
//     const cancelBtn = (
//       <button
//         onClick={() => setCurrentStep(1)}
//         className="relative overflow-hidden rounded-full border border-[#80808080] transition-colors text-sm md:text-base lg:text-lg font-medium cursor-pointer px-6 py-2 text-[#80808080] flex items-center justify-center gap-2.5"
//       >
//         <p className="relative z-10">Cancel</p>
//         <div className="absolute bottom-0 right-0 opacity-80 items-center justify-center overflow-hidden">
//           <img src="/buttonHomeWhite.svg" alt="icon" className="w-full" />
//         </div>
//       </button>
//     );

//     const backBtn = (
//       <button
//         onClick={() => setCurrentStep((prev) => prev - 1)}
//         className="relative overflow-hidden rounded-full border border-[#A0BFE8] transition-colors text-sm md:text-base lg:text-lg font-medium cursor-pointer px-6 py-2 text-[#A0BFE8] flex items-center justify-center gap-2.5"
//       >
//         <MoveLeft className="relative z-10 w-5 h-5" />
//         <p className="relative z-10">Back</p>
//         <div className="absolute bottom-0 right-0 opacity-80 items-center justify-center overflow-hidden">
//           <img src="/buttonHomeWhite.svg" alt="icon" className="w-full" />
//         </div>
//       </button>
//     );

//     const continueBtn = (
//       <button
//         onClick={() => setCurrentStep((prev) => prev + 1)}
//         className="relative overflow-hidden rounded-full transition-colors text-sm md:text-base lg:text-lg font-medium cursor-pointer px-6 py-2 bg-primary-blue text-white flex items-center justify-center gap-2.5"
//       >
//         <p className="relative z-10">Continue</p>
//         <div className="absolute bottom-0 right-0 opacity-80 items-center justify-center overflow-hidden">
//           <img src="/buttonHomeIcon.svg" alt="icon" className="w-full" />
//         </div>
//         <MoveRight className="relative z-10 w-5 h-5" />
//       </button>
//     );

//     const finishBtn = (
//       <Button
//         type="submit"
//         className={`${commonBtnClass} bg-[#3174CD] hover:bg-[#215ba8] text-white`}
//       >
//         Finish
//         <FaArrowRight className="w-5 h-5" />
//       </Button>
//     );

//     if (currentStep === 1) {
//       return (
//         <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
//           {cancelBtn}
//           <div className="flex gap-4 w-full sm:w-auto justify-end">
//             {continueBtn}
//           </div>
//         </div>
//       );
//     }

//     if (currentStep === steps.length) {
//       return (
//         <div className="flex gap-4 w-full sm:w-auto justify-end mt-6">
//           {backBtn}
//           {finishBtn}
//         </div>
//       );
//     }

//     return (
//       <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
//         {cancelBtn}
//         <div className="flex gap-4 w-full sm:w-auto justify-end">
//           {backBtn}
//           {continueBtn}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="relative mb-12 overflow-x-auto px-2 sm:px-4">
//       <div className="flex justify-between items-start relative z-10">
//         {steps.map((step, index) => {
//           const isActive = currentStep === step.number;
//           const isCompleted = currentStep > step.number;
//           const starIcon = isActive || isCompleted ? star2 : star1;

//           return (
//             <div
//               key={step.number}
//               className={`flex flex-col items-start justify-between relative min-w-[100px] ${
//                 index !== steps.length - 1 ? "flex-1" : "justify-end"
//               }`}
//             >
//               {/* Top row: Icon and dashed line */}
//               <div className="flex items-center justify-between w-full">
//                 {/* Step Icon */}
//                 <div className="relative z-20 w-14 h-14 shrink-0 flex items-center justify-center bg-transparent rounded-full">
//                   <img
//                     src={starIcon}
//                     alt={`Step ${step.number}`}
//                     className={`w-full `}
//                   />
//                   <div className="absolute text-white text-2xl font-bold">
//                     {step.number}
//                   </div>
//                 </div>

//                 {/* Dashed Line (not after last item) */}
//                 {index !== steps.length - 1 ? (
//                   <div className="flex-1 h-[2px] ml-2 relative">
//                     <div className="absolute top-1/2 left-0 w-full border-t-2 border-dashed border-gray-300 transform -translate-y-1/2 z-0"></div>
//                     <div
//                       className="absolute top-1/2 left-0 h-[2px] bg-[#3174CD] transition-all duration-500 transform -translate-y-1/2 z-10"
//                       style={{
//                         width:
//                           currentStep > step.number
//                             ? "100%"
//                             : currentStep === step.number
//                             ? "50%"
//                             : "0%",
//                       }}
//                     ></div>
//                   </div>
//                 ) : (
//                   <div className="w-0" />
//                 )}
//               </div>

//               {/* Bottom row: Step title + subtitle */}
//               <div className="text-center mt-2">
//                 <p
//                   className={`text-[13px] font-medium ${
//                     isActive || isCompleted ? "text-[#3174CD]" : "text-gray-400"
//                   }`}
//                 >
//                   {step.title}
//                 </p>
//                 <p
//                   className={`text-[13px] font-medium ${
//                     isActive || isCompleted ? "text-[#3174CD]" : "text-gray-400"
//                   }`}
//                 >
//                   {step.subtitle}
//                 </p>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//       {/* Step Content */}
//       <div>{renderStepContent()}</div>

//       {/* Buttons */}
//       {renderButtons()}
//     </div>
//   );
// };

// export default MultiStepForm;
