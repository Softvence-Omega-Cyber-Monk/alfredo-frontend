import { useState } from "react";
import { MoveLeft, MoveRight } from "lucide-react";
import star1 from "../../assets/icons/Star22.svg";
import star2 from "../../assets/icons/starBlue.svg";
import GetStarted from "./GetStarted";
import VerificationProcess, { AgeGroupLabels } from "./VerificationProcess";
import UploadPhoto from "./UploadPhoto";
import { AddPlaceData } from "@/types";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "@/hooks/useRedux";
import { postOnboarding } from "@/store/Slices/OnboardingSlice/OnboardSlice";

export type AgeGroup = "AGE_18_30" | "AGE_30_50" | "AGE_50_65" | "AGE_65_PLUS";
export type Gender = "MALE" | "FEMALE" | "NOT_SPECIFIED";
export type Role = "WORKER" | "RETIRED" | "STUDENT" | "UNEMPLOYED";
export type TravelType =
  | "Business"
  | "Leisure"
  | "Adventure"
  // | "Family"
  // | "Solo"
  | "Cultural";
export type DestinationType =
  | "Big Cities"
  | "Small Cities"
  | "Seaside"
  | "Mountain";
export type TravelGroup = "BY_MYSELF" | "FAMILY" | "COUPLE" | "FRIENDS";
export type TravelWithPets = boolean;
export type HomeApartmentType = "HOME" | "APARTMENT" | "BOAT" | "VAN" | "ROOM";

interface OnboardingData extends AddPlaceData {
  personalInformation: {
    age: AgeGroup;
    gender: Gender;
    role: Role;
    travelType: TravelType[]; // max 2
    favoriteDestinations: DestinationType[];
    travelGroup: TravelGroup;
    travelWithPets: TravelWithPets;
    maxPeople: number | null;
    address: string;
    notes: string;
  };
}

const steps = [
  { number: 1, title: "onboarding.step1", subtitle: "onboarding.step1s" },
  { number: 2, title: "onboarding.step2", subtitle: "onboarding.step2s" },
  { number: 3, title: "onboarding.step6", subtitle: "onboarding.step6s" },
];

const MultiStepForm = () => {
  const { t } = useTranslation("onboarding");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [addPlaceData, setAddPlaceData] = useState<
    OnboardingData & {
      homeAddress?: string;
      destinationAddress?: string;
    }
  >({
    location: null,
    destination: null,
    homeType: null,
    residenceType: true,
    selectedAmenities: {
      main: [],
      transport: [],
      surrounding: [],
    },
    homeName: "",
    homeDescription: "",
    areaDescription: "",
    photos: [],
    availabilityType: null,
    availabilityDates: {
      start: null,
      end: null,
    },
    personalInformation: {
      age: "AGE_18_30",
      gender: "NOT_SPECIFIED",
      role: "RETIRED",
      travelType: [],
      favoriteDestinations: [],
      travelGroup: "FRIENDS",
      travelWithPets: true,
      maxPeople: null,
      address: "",
      notes: "",
    },
  });

  const handleDataUpdate = (updates: Partial<OnboardingData>) => {
    setAddPlaceData((prev) => ({ ...prev, ...updates }));
    if (validationErrors.length > 0) {
      setValidationErrors([]);
    }
  };

  // Validation functions for each step
  // const validateStep1 = () => {
  //   const errors: string[] = [];
  //   /*
  //   if (!addPlaceData.homeAddress || addPlaceData.homeAddress.trim() === "") {
  //     errors.push("Home location is required");
  //   }
  //   if (
  //     !addPlaceData.destinationAddress ||
  //     addPlaceData.destinationAddress.trim() === ""
  //   ) {
  //     errors.push("Destination is required");
  //   }
  //   if (!addPlaceData.location) {
  //     errors.push("Please select home location on the map");
  //   }
  //   if (!addPlaceData.destination) {
  //     errors.push("Please select destination on the map");
  //   }
  //   */
  //   return errors;
  // };

  const validateStep2 = () => {
    const errors: string[] = [];
    const pi = addPlaceData.personalInformation;

    if (!pi.age) {
      errors.push("Age group is required");
      toast.error("Age group is required", {
        position: "top-center"
      })
    }
    if (!pi.gender || pi.gender === "NOT_SPECIFIED") {
      errors.push("Gender is required");
      toast.error("Gender is required", {
        position: "top-center"
      })
    }
    if (!pi.role) {
      errors.push("Role/Occupation is required");
      toast.error("Role/Occupation is required", {
        position: "top-center"
      })
    }
    if (pi.travelType.length === 0) {
      errors.push("At least one travel type is required");
      toast.error("At least one travel type is required", {
        position: "top-center"
      })
    }
    if (pi.favoriteDestinations.length === 0) {
      errors.push("At least one favorite destination is required");
      toast.error("At least one favorite destination is required", {
        position: "top-center"
      })
    }
    if (!pi.travelGroup) {
      errors.push("Travel group preference is required");
      toast.error("Travel group preference is required", {
        position: "top-center"
      })
    }
    if (!pi.address) {
      errors.push("Hometown is required");
      toast.error("Hometown is required", {
        position: "top-center"
      })
    }

    return errors;
  };

  const validateStep3 = () => {
    const errors: string[] = [];
    if (addPlaceData.photos.length === 0) {
      errors.push("At least one photo is required");
    }
    if (addPlaceData.photos.length > 5) {
      errors.push("Maximum 5 photos are allowed");
    }
    return errors;
  };

  const validateCurrentStep = () => {
    let errors: string[] = [];

    switch (currentStep) {
      case 2:
        errors = validateStep2();
        break;
      case 3:
        errors = validateStep3();
        break;
      default:
        break;
    }

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleSubmitData = async () => {
    if (!validateCurrentStep()) {
      return;
    }

    try {
      const user = localStorage.getItem("user");

      const parsedUser = user ? JSON.parse(user) : null;
      const userId = parsedUser?.id;

      if (!userId) {
        toast.error("User not found. Please log in again.");
        navigate("/login"); // Redirect to login
        return; // Exit the function early
      }
      const formData = new FormData();

      const payload = {
        // homeAddress: addPlaceData.homeAddress,
        // destination: addPlaceData.destinationAddress,

        //next step (personal info)
        ageRange: AgeGroupLabels[addPlaceData.personalInformation.age as keyof typeof AgeGroupLabels],
        gender: t(`onboarding.part2.gender.${addPlaceData.personalInformation.gender === "NOT_SPECIFIED" ? "notSpecified" : addPlaceData.personalInformation.gender.toLowerCase()}`),
        employmentStatus: t(`onboarding.part2.iAmA.${addPlaceData.personalInformation.role.toLowerCase()}`),
        travelType: addPlaceData.personalInformation.travelType.map(type => t(`onboarding.part2.travelType.${type.toLowerCase()}`)),
        favoriteDestinations:
          addPlaceData.personalInformation.favoriteDestinations.map(dest => {
            const destKeyMap: Record<string, string> = {
              "Big Cities": "bigCities",
              "Small Cities": "smallCities",
              "Seaside": "seaSide",
              "Mountain": "mountains"
            };
            return t(`onboarding.part2.favoriteDestinations.${destKeyMap[dest]}`);
          }),
        travelMostlyWith: t(`onboarding.part2.iMostlyTravelWith.${{
          "BY_MYSELF": "byMyself",
          "FAMILY": "family",
          "COUPLE": "withPartner",
          "FRIENDS": "withFrends"
        }[addPlaceData.personalInformation.travelGroup]}`),
        isTravelWithPets: t(`onboarding.part2.TravelWithPet.${addPlaceData.personalInformation.travelWithPets ? "yes" : "no"}`),
        maxPeople: addPlaceData.personalInformation.maxPeople || 1,
        address: addPlaceData.personalInformation.address,
        notes: addPlaceData.personalInformation.notes,

        //next step (property type)
        propertyType: addPlaceData.homeType,
        isMainResidence: addPlaceData.residenceType,

        //next step (amenities)
        amenities: addPlaceData.selectedAmenities.main.map((i) => i.id),
        transports: addPlaceData.selectedAmenities.transport.map((i) => i.id),
        surroundings: addPlaceData.selectedAmenities.surrounding.map(
          (i) => i.id
        ),

        //next step (home details)
        homeName: addPlaceData.homeName,
        homeDescription: addPlaceData.homeDescription,
        aboutNeighborhood: addPlaceData.areaDescription,

        //next step (upload images)
        homeImages: addPlaceData.photos,

        //next step (availability)
        availabilityStartDate: addPlaceData.availabilityDates.start
          ? new Date(addPlaceData.availabilityDates.start).toISOString()
          : null,
        availabilityEndDate: addPlaceData.availabilityDates.end
          ? new Date(addPlaceData.availabilityDates.end).toISOString()
          : null,
      };
      formData.append("data", JSON.stringify(payload));
      addPlaceData.photos.forEach((file) => {
        formData.append("homeImages", file);
      });
      console.log("Payload:", payload);
      const result = await dispatch(postOnboarding(formData));
      if (postOnboarding.fulfilled.match(result)) {
        toast.success("Onboarding successful!");
        navigate("/dashboard");
      } else {
        console.error("Submission failed with error:", result.error);
        toast.error(
          "Error submitting property. " + (result.error.message || "")
        );
      }
    } catch (error) {
      console.error("Unexpected error in handleSubmitData:", error);
      toast.error("An unexpected error occurred.");
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <GetStarted
            location={addPlaceData.location}
            destination={addPlaceData.destination}
            onLocationChange={(location: { lat: number; lng: number } | null) =>
              handleDataUpdate({ location })
            }
            onDestinationChange={(
              destination: { lat: number; lng: number } | null
            ) => handleDataUpdate({ destination })}
            onLocationAddressChange={(address) =>
              handleDataUpdate({ homeAddress: address })
            }
            onDestinationAddressChange={(address) =>
              handleDataUpdate({ destinationAddress: address })
            }
          />
        );
      case 2:
        return (
          <VerificationProcess
            personalInformation={addPlaceData.personalInformation}
            onDataChange={(personalInformation) =>
              handleDataUpdate({ personalInformation })
            }
          />
        );
      case 3:
        return (
          <UploadPhoto
            photos={addPlaceData.photos}
            onDataChange={handleDataUpdate}
          />
        );

      default:
        return <div className="text-center">Invalid step</div>;
    }
  };

  const renderButtons = () => {
    const cancelBtn = (
      <button
        onClick={() => {
          setCurrentStep(1);
          setValidationErrors([]);
        }}
        className="relative overflow-hidden rounded-full border border-[#80808080] transition-colors text-sm md:text-base lg:text-lg font-medium cursor-pointer bg-white px-6 py-2 text-[#80808080] flex items-center justify-center gap-2.5 w-full md:w-auto"
      >
        <p className="relative z-10">{t("onboarding.stepButton1")}</p>
        <div className="absolute bottom-0 right-0 opacity-80 items-center justify-center overflow-hidden">
          <img src="/buttonHomeWhite.svg" alt="icon" className="w-full" />
        </div>
      </button>
    );

    const backBtn = (
      <button
        onClick={() => {
          setCurrentStep((prev) => prev - 1);
          setValidationErrors([]);
        }}
        className="relative overflow-hidden rounded-full border border-[#A0BFE8] transition-colors text-sm md:text-base lg:text-lg font-medium cursor-pointer px-6 py-2 text-[#A0BFE8] flex items-center justify-center gap-2.5 w-full md:w-auto"
      >
        <MoveLeft className="relative z-10 w-5 h-5" />
        <p className="relative z-10">{t("onboarding.stepButton2")}</p>
        <div className="absolute bottom-0 right-0 opacity-80 items-center justify-center overflow-hidden">
          <img src="/buttonHomeWhite.svg" alt="icon" className="w-full" />
        </div>
      </button>
    );

    const continueBtn = (
      <button
        onClick={() => {
          if (validateCurrentStep()) {
            setCurrentStep((prev) => prev + 1);
          }
        }}
        className="relative overflow-hidden rounded-full transition-colors text-sm md:text-base lg:text-lg font-medium cursor-pointer px-6 py-2 bg-primary-blue text-white flex items-center justify-center gap-2.5 w-full md:w-auto"
      >
        <p className="relative z-10">{t("onboarding.stepButton3")}</p>
        <div className="absolute bottom-0 right-0 opacity-80 items-center justify-center overflow-hidden">
          <img src="/buttonHomeIcon.svg" alt="icon" className="w-full" />
        </div>
        <MoveRight className="relative z-10 w-5 h-5" />
      </button>
    );

    const finishBtn = (
      <button
        onClick={handleSubmitData}
        type="button"
        className="relative overflow-hidden rounded-full transition-colors text-sm md:text-base lg:text-lg font-medium cursor-pointer px-6 py-2 bg-primary-blue text-white flex items-center justify-center gap-2.5 w-full md:w-auto"
      >
        <p className="relative z-10">{t("onboarding.stepButton4")}</p>
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
      ${currentStep > step.number
                          ? "border-[#3174CD] w-20 sm:w-26 md:w-28 lg:w-24"
                          : "border-[#EAF1FA] w-20 sm:w-26 md:w-28 lg:w-24"
                        }`}
                    ></div>
                  )}
                </div>

                {/* Step title + subtitle */}
                <div className="text-center mt-2">
                  <p
                    className={`text-xs sm:text-sm font-medium ${isActive || isCompleted
                      ? "text-[#3174CD]"
                      : "text-gray-400"
                      }`}
                  >
                    {t(step.title)}
                  </p>
                  <p
                    className={`text-xs sm:text-sm font-medium ${isActive || isCompleted
                      ? "text-[#3174CD]"
                      : "text-gray-400"
                      }`}
                  >
                    {t(step.subtitle)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Validation Errors */}
      {validationErrors.length > 0 && (
        <div className="my-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <h4 className="text-red-800 font-semibold mb-2">
            Please fix the following errors:
          </h4>
          <ul className="list-disc list-inside text-red-700 text-sm space-y-1">
            {validationErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Step Content */}
      <div>{renderStepContent()}</div>

      {/* Buttons */}
      {renderButtons()}
    </div>
  );
};

export default MultiStepForm;
