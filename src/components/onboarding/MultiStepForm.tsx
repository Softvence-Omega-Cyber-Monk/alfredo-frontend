import { useState } from "react";
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
  const [currentStep, setCurrentStep] = useState(5); // current screen is Step 5 in image

  const renderStepContent = () => {
    switch (currentStep) {
      case 5:
        return (
          <div>
            <HomeAvailability />
          </div>
        );
      case 6:
        return (
          <div>
            <HomeAvailability />
          </div>
        );
      default:
        return (
          <div className="mt-10 text-lg font-medium text-gray-500">
            Step {currentStep}: Content goes here...
          </div>
        );
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Stepper */}
      <div className="flex items-center justify-between mb-10">
        {steps.map((step, index) => (
          <div key={step.number} className="flex-1 text-center">
            <div
              className={`mx-auto w-10 h-10 flex items-center justify-center rounded-full text-white font-bold mb-1 ${
                currentStep === step.number
                  ? "bg-blue-600"
                  : currentStep > step.number
                  ? "bg-blue-400"
                  : "bg-gray-300"
              }`}
            >
              {step.number}
            </div>
            <div className="text-xs leading-tight text-gray-600">
              <div className="font-semibold">{step.title}</div>
              <div className="text-[11px]">{step.subtitle}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Step Content */}
      {renderStepContent()}

      {/* Navigation */}
      <div className="mt-10 flex justify-between">
        <button
          disabled={currentStep === 1}
          onClick={() => setCurrentStep((prev) => prev - 1)}
          className={`px-4 py-2 rounded-md text-white ${
            currentStep === 1 ? "bg-gray-300" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          Back
        </button>
        <button
          disabled={currentStep === steps.length}
          onClick={() => setCurrentStep((prev) => prev + 1)}
          className={`px-4 py-2 rounded-md text-white ${
            currentStep === steps.length
              ? "bg-gray-300"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default MultiStepForm;
