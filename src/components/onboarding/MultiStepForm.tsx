import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

import star1 from "../../assets/icons/Star1.png";
import star2 from "../../assets/icons/Star2.png";

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

  const commonBtnClass =
    "w-full sm:w-auto h-[52px] px-8 py-3 rounded-[35px] text-[18px] font-semibold leading-[156%] flex items-center justify-center gap-2 cursor-pointer";

  const renderButtons = () => {
    const cancelBtn = (
      <Button
        type="button"
        className="w-full sm:w-[125px] h-[52px] px-6 py-2 text-[rgba(128,128,128,0.5)] font-inter text-[18px] font-semibold leading-[156%] border border-[#CAD2DB] rounded-[35px] cursor-pointer"
        onClick={() => setCurrentStep(1)}
      >
        Cancel
      </Button>
    );

    const backBtn = (
      <Button
        type="button"
        onClick={() => setCurrentStep((prev) => prev - 1)}
        className={`${commonBtnClass} border border-[#BFD4F0] bg-white text-[#77B1EE] font-inter`}
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </Button>
    );

    const continueBtn = (
      <Button
        type="button"
        onClick={() => setCurrentStep((prev) => prev + 1)}
        className={`${commonBtnClass} bg-[#3174CD] hover:bg-[#215ba8] text-white`}
      >
        Continue
        <FaArrowRight className="w-5 h-5" />
      </Button>
    );

    const finishBtn = (
      <Button
        type="submit"
        className={`${commonBtnClass} bg-[#3174CD] hover:bg-[#215ba8] text-white`}
      >
        Finish
        <FaArrowRight className="w-5 h-5" />
      </Button>
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
    <div className="w-full max-w-6xl mx-auto p-6">
      {/* Stepper */}
      <div className="relative mb-12 overflow-x-auto px-2 sm:px-4">
        <div className="flex justify-between items-center relative z-10">
          {steps.map((step, index) => {
            const isActive = currentStep === step.number;
            const isCompleted = currentStep > step.number;
            const starIcon = isActive || isCompleted ? star2 : star1;

            return (
              <div
                key={step.number}
                className="flex items-center flex-1 relative min-w-[100px]"
              >
                {/* Step Icon */}
                <div className="relative z-20 w-14 h-14">
                  <img
                    src={starIcon}
                    alt={`Step ${step.number}`}
                    className="w-14 h-14"
                  />
                  <div className="absolute top-[12px] left-1/2 transform -translate-x-1/2 text-white text-2xl font-bold">
                    {step.number}
                  </div>
                </div>

                {/* Line after icon (not last item) */}
                {index !== steps.length - 1 && (
                  <div className="flex-1 h-1 bg-gray-200 ml-2 relative">
                    <div
                      className="absolute top-0 left-0 h-1 bg-[#3174CD] transition-all duration-500"
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
                )}
              </div>
            );
          })}
        </div>

        {/* Step Titles */}
        <div className="flex justify-between items-center mt-2">
          {steps.map((step) => {
            const isActive = currentStep === step.number;
            const isCompleted = currentStep > step.number;
            return (
              <div
                key={step.number}
                className="flex-1 min-w-[100px] text-center text-[13px] font-medium "
              >
                <p
                  className={`${
                    isActive || isCompleted ? "text-[#3174CD]" : "text-gray-400"
                  }`}
                >
                  {step.title}
                </p>
                <p
                  className={`${
                    isActive || isCompleted ? "text-[#3174CD]" : "text-gray-400"
                  }`}
                >
                  {step.subtitle}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <div>{renderStepContent()}</div>

      {/* Buttons */}
      {renderButtons()}
    </div>
  );
};

export default MultiStepForm;
