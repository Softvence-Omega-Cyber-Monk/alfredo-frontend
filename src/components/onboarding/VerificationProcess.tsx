"use client";

import { TbChecklist } from "react-icons/tb";
import Title from "./Shared/Title";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "../ui/textarea";
import { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";

export type AgeGroup = "18–30" | "30–50" | "50–65" | "65+";
export type Gender = "Male" | "Female" | "Not Specified";
export type Role = "Worker" | "Retired" | "Student" | "Unemployed";
export type TravelType =
  | "Business"
  | "Leisure"
  | "Adventure"
  | "Family"
  | "Solo"
  | "Cultural";
export type DestinationType =
  | "Big Cities"
  | "Small Cities"
  | "Seaside"
  | "Mountain";
export type TravelGroup =
  | "By Myself"
  | "With Family"
  | "With a Partner"
  | "With Friends";
export type TravelWithPets = "Business trips" | "Leisure trips" | "Both";

interface VerificationProps {
  personalInformation: {
    age: AgeGroup;
    gender: Gender;
    role: Role;
    travelType: TravelType[];
    favoriteDestinations: DestinationType[];
    travelGroup: TravelGroup;
    travelWithPets: TravelWithPets;
    notes: string;
  };
  onDataChange: (
    personalInformation: VerificationProps["personalInformation"]
  ) => void;
}

const VerificationProcess = ({
  personalInformation,
  onDataChange,
}: VerificationProps) => {
  const { t } = useTranslation("onboarding");

  const handleChange = <
    K extends keyof VerificationProps["personalInformation"]
  >(
    key: K,
    value: VerificationProps["personalInformation"][K]
  ) => {
    onDataChange({
      ...personalInformation,
      [key]: value,
    });
  };

  const handleCheckboxChange = (
    key: "travelType" | "favoriteDestinations",
    value: TravelType | DestinationType
  ) => {
    const currentArray = personalInformation[key];
    const isSelected = currentArray.includes(value as never);
    const updatedArray = isSelected
      ? currentArray.filter((v) => v !== value)
      : [...currentArray, value];

    if (key === "travelType" && updatedArray.length > 2) return;

    onDataChange({
      ...personalInformation,
      [key]: updatedArray as (typeof personalInformation)[typeof key],
    });
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    handleChange("notes", e.target.value);
  };

  const genderOptions = [
    { value: "Male", key: "male" },
    { value: "Female", key: "female" },
    { value: "Not Specified", key: "notSpecified" },
  ];

  const roleOptions = ["Worker", "Retired", "Student", "Unemployed"] as Role[];
  const travelTypeOptions = [
    "Business",
    "Leisure",
    "Adventure",
    "Family",
    "Solo",
    "Cultural",
  ] as TravelType[];

  const destinationOptions: { value: DestinationType; key: string }[] = [
    { value: "Big Cities", key: "bigCities" },
    { value: "Small Cities", key: "smallCities" },
    { value: "Seaside", key: "seaSide" },
    { value: "Mountain", key: "mountains" },
  ];

  const travelGroupOptions: { value: TravelGroup; key: string }[] = [
    { value: "By Myself", key: "byMyself" },
    { value: "With Family", key: "family" },
    { value: "With a Partner", key: "withPartner" },
    { value: "With Friends", key: "withFrends" },
  ];

  const petOptions: { value: TravelWithPets; key: string }[] = [
    { value: "Business trips", key: "business" },
    { value: "Leisure trips", key: "leasure" },
    { value: "Both", key: "both" },
  ];

  return (
    <div className="w-full py-6 md:py-10 space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-center mb-10 w-full gap-4">
        <div className="w-full lg:w-auto flex-1">
          <Title title={t("onboarding.part2.headTitle")} />
        </div>
        <div className="w-full lg:w-auto flex justify-center md:justify-end">
          <Button
            variant="secondary"
            className="flex items-center gap-2 px-5 py-3 rounded-lg border border-[#CAD2DB] text-[#3174CD] text-base font-medium hover:bg-gray-100"
          >
            {t("onboarding.part2.headButton")}
            <TbChecklist className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <hr className="text-[#EAF1FA]" />

      <form className="space-y-8 font-sans">
        {/* Age and Gender */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label className="block text-lg text-[#3174CD] mb-2">
              {t("onboarding.part2.age")}
            </Label>
            <div className="flex flex-wrap gap-4">
              {(["18–30", "30–50", "50–65", "65+"] as AgeGroup[]).map((age) => (
                <label
                  key={age}
                  className="flex items-center gap-2 cursor-pointer text-base text-[#808080]"
                >
                  <input
                    type="radio"
                    name="ageGroup"
                    value={age}
                    checked={personalInformation.age === age}
                    onChange={() => handleChange("age", age)}
                    className="w-4 h-4 accent-blue-500"
                  />
                  {age}
                </label>
              ))}
            </div>
          </div>

          <div>
            <Label className="block text-lg text-[#3174CD] mb-2">
              {t("onboarding.part2.gender.title")}
            </Label>
            <div className="flex flex-wrap gap-4">
              {genderOptions.map((g) => (
                <label
                  key={g.key}
                  className="flex items-center gap-2 cursor-pointer text-base text-[#808080]"
                >
                  <input
                    type="radio"
                    name="gender"
                    value={g.value}
                    checked={personalInformation.gender === g.value}
                    onChange={() => handleChange("gender", g.value as Gender)}
                    className="w-4 h-4 accent-blue-500"
                  />
                  {t(`onboarding.part2.gender.${g.key}`)}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Role and Travel Type */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label className="block text-lg text-[#3174CD] mb-2">
              {t("onboarding.part2.iAmA.title")}
            </Label>
            <div className="flex flex-wrap gap-4">
              {roleOptions.map((role) => (
                <label
                  key={role}
                  className="flex items-center gap-2 cursor-pointer text-base text-[#808080]"
                >
                  <input
                    type="radio"
                    name="role"
                    value={role}
                    checked={personalInformation.role === role}
                    onChange={() => handleChange("role", role)}
                    className="w-4 h-4 accent-blue-500"
                  />
                  {t(`onboarding.part2.iAmA.${role.toLowerCase()}`)}
                </label>
              ))}
            </div>
          </div>

          <div>
            <Label className="block text-lg text-[#3174CD] mb-2">
              {t("onboarding.part2.travelType.title")}
              <span className="text-sm text-muted-foreground">
                {t("onboarding.part2.travelType.subTitle")}
              </span>
            </Label>
            <div className="flex flex-wrap gap-4">
              {travelTypeOptions.map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-2 text-base text-[#808080]"
                >
                  <input
                    type="checkbox"
                    checked={personalInformation.travelType.includes(type)}
                    onChange={() => handleCheckboxChange("travelType", type)}
                    className="w-5 h-5 accent-blue-500"
                  />
                  {t(`onboarding.part2.travelType.${type.toLowerCase()}`)}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Favorite Destinations & Travel Group */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label className="block text-lg text-[#3174CD] mb-2">
              {t("onboarding.part2.favoriteDestinations.title")}
            </Label>
            <div className="flex flex-wrap gap-4">
              {destinationOptions.map((dest) => (
                <label
                  key={dest.value}
                  className="flex items-center gap-2 text-base text-[#808080]"
                >
                  <input
                    type="checkbox"
                    checked={personalInformation.favoriteDestinations.includes(
                      dest.value
                    )}
                    onChange={() =>
                      handleCheckboxChange("favoriteDestinations", dest.value)
                    }
                    className="w-5 h-5 accent-blue-500"
                  />
                  {t(`onboarding.part2.favoriteDestinations.${dest.key}`)}
                </label>
              ))}
            </div>
          </div>

          <div>
            <Label className="block text-lg text-[#3174CD] mb-2">
              {t("onboarding.part2.iMostlyTravelWith.title")}
            </Label>
            <div className="flex flex-wrap gap-4">
              {travelGroupOptions.map((group) => (
                <label
                  key={group.key}
                  className="flex items-center gap-2 cursor-pointer text-base text-[#808080]"
                >
                  <input
                    type="radio"
                    name="travelGroup"
                    value={group.value}
                    checked={personalInformation.travelGroup === group.value}
                    onChange={() =>
                      handleChange("travelGroup", group.value as TravelGroup)
                    }
                    className="w-4 h-4 accent-blue-500"
                  />
                  {t(`onboarding.part2.iMostlyTravelWith.${group.key}`)}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Travel With Pets */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label className="block text-lg text-[#3174CD] mb-2">
              {t("onboarding.part2.TravelWithPet.title")}
            </Label>
            <div className="flex flex-wrap gap-4">
              {petOptions.map((pet) => (
                <label
                  key={pet.key}
                  className="flex items-center gap-2 cursor-pointer text-base text-[#808080]"
                >
                  <input
                    type="radio"
                    name="travelWithPets"
                    value={pet.value}
                    checked={personalInformation.travelWithPets === pet.value}
                    onChange={() =>
                      handleChange(
                        "travelWithPets",
                        pet.value as TravelWithPets
                      )
                    }
                    className="w-4 h-4 accent-blue-500"
                  />
                  {t(`onboarding.part2.TravelWithPet.${pet.key}`)}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Notes */}
        <div>
          <Label className="block text-lg text-[#3174CD] mb-2">
            {t("onboarding.part2.notesOnYourself.title")}
          </Label>
          <Textarea
            value={personalInformation.notes}
            onChange={handleInputChange}
            placeholder={t("onboarding.part2.notesOnYourself.placeHolder")}
            className="min-h-[120px] border border-[#D2D2D2] focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </form>
    </div>
  );
};

export default VerificationProcess;
