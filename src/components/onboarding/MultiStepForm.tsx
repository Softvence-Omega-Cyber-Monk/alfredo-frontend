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
        className="relative overflow-hidden rounded-full border border-[#80808080] transition-colors text-sm md:text-base lg:text-lg font-medium cursor-pointer bg-white px-6 py-2 text-[#80808080] flex items-center justify-center gap-2.5 w-full md:w-auto"
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
    <div className="relative mb-12 overflow-x-hidden px-2 sm:px-4">
      <div className="grid grid-cols-4 md:grid-cols-7 gap-4 items-start  z-10">
        {steps.map((step, index) => {
          const isActive = currentStep === step.number;
          const isCompleted = currentStep > step.number;
          const starIcon = isActive || isCompleted ? star2 : star1;

          return (
            <div
              key={step.number}
              className="flex flex-col items-center justify-center "
            >
              {/* Dashed connector line */}

              {/* Step icon */}
              <div className=" z-10">
                <div className="flex items-center justify-center relative w-10 sm:w-14 mx-auto">
                  <img src={starIcon} className="w-full" alt="" />
                  <div className="absolute text-white text-sm sm:text-base md:text-xl font-bold">
                    {step.number}
                  </div>

                  {index !== steps.length - 1 && (
                    <div
                      className={`absolute top-1/2 left-full h-0.5 border-t-2 border-dashed z-0 translate-y-[-50%] 
      transition-all duration-500 ease-in-out 
      ${
        currentStep > step.number
          ? "border-[#3174CD] w-20 sm:w-26 md:w-28 lg:w-24"
          : "border-[#EAF1FA] w-20 sm:w-26 md:w-28 lg:w-24"
      }`}
                    ></div>
                  )}
                </div>

                {/* Step title + subtitle */}
                <div className="text-center mt-2">
                  <p
                    className={`text-xs sm:text-sm font-medium ${
                      isActive || isCompleted
                        ? "text-[#3174CD]"
                        : "text-gray-400"
                    }`}
                  >
                    {step.title}
                  </p>
                  <p
                    className={`text-xs sm:text-sm font-medium ${
                      isActive || isCompleted
                        ? "text-[#3174CD]"
                        : "text-gray-400"
                    }`}
                  >
                    {step.subtitle}
                  </p>
                </div>
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