import { TbChecklist } from "react-icons/tb";
import Title from "./Shared/Title";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "../ui/textarea";
import { ChangeEvent } from "react";

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

  return (
    <div className="w-full py-6 md:py-10 space-y-6 ">
      <div className="flex flex-col lg:flex-row justify-between items-center mb-10 w-full gap-4">
        <div className="w-full lg:w-auto flex-1">
          <Title title="Welcome back, Savannah!" />
        </div>
        <div className="w-full lg:w-auto flex justify-center md:justify-end">
          <Button
            variant="secondary"
            className="flex items-center gap-2 px-5 py-3 rounded-lg border border-[#CAD2DB] text-[#3174CD] text-base font-medium hover:bg-gray-100"
          >
            Save Draft
            <TbChecklist className="w-5 h-5" />
          </Button>
        </div>
      </div>
      <hr className="text-[#EAF1FA]" />

      <form className="space-y-8 font-sans">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label className="block text-lg text-[#3174CD] mb-2">Age: </Label>
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
              Gender:{" "}
            </Label>
            <div className="flex flex-wrap gap-4">
              {(["Male", "Female", "Not Specified"] as Gender[]).map((g) => (
                <label
                  key={g}
                  className="flex items-center gap-2 cursor-pointer text-base text-[#808080]"
                >
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={personalInformation.gender === g}
                    onChange={() => handleChange("gender", g)}
                    className="w-4 h-4 accent-blue-500"
                  />
                  {g}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label className="block text-lg text-[#3174CD] mb-2">I am a:</Label>
            <div className="flex flex-wrap gap-4">
              {(["Worker", "Retired", "Student", "Unemployed"] as Role[]).map(
                (role) => (
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
                    {role}
                  </label>
                )
              )}
            </div>
          </div>

          <div>
            <Label className="block text-lg text-[#808080] mb-2">
              Your Travel Type
              <span className="text-sm text-muted-foreground">
                (Select up to 2 options)
              </span>
            </Label>
            <div className="flex flex-wrap gap-4">
              {(
                [
                  "Business",
                  "Leisure",
                  "Adventure",
                  "Family",
                  "Solo",
                  "Cultural",
                ] as TravelType[]
              ).map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-2 text-base text-[#808080]"
                >
                  <input
                    type="checkbox"
                    checked={personalInformation.travelType.includes(
                      type as TravelType
                    )}
                    onChange={() => handleCheckboxChange("travelType", type)}
                    className="w-5 h-5 accent-blue-500"
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label className="block text-lg text-[#3174CD] mb-2">
              Favourite destinations
              <span className="text-sm text-muted-foreground">
                (select all that apply):
              </span>
            </Label>
            <div className="flex flex-wrap gap-4">
              {(
                [
                  "Big Cities",
                  "Small Cities",
                  "Seaside",
                  "Mountain",
                ] as DestinationType[]
              ).map((dest) => (
                <label
                  key={dest}
                  className="flex items-center gap-2 text-base text-[#808080]"
                >
                  <input
                    type="checkbox"
                    checked={personalInformation.favoriteDestinations.includes(
                      dest as DestinationType
                    )}
                    onChange={() =>
                      handleCheckboxChange("favoriteDestinations", dest)
                    }
                    className="w-5 h-5 accent-blue-500"
                  />
                  {dest}
                </label>
              ))}
            </div>
          </div>

          <div>
            <Label className="block text-lg text-[#808080] mb-2">
              Who Do You Usually Travel With? (Select one)
            </Label>
            <div className="flex flex-wrap gap-4">
              {(
                [
                  "By Myself",
                  "With Family",
                  "With a Partner",
                  "With Friends",
                ] as TravelGroup[]
              ).map((group) => (
                <label
                  key={group}
                  className="flex items-center gap-2 cursor-pointer text-base text-[#808080]"
                >
                  <input
                    type="radio"
                    name="travelGroup"
                    value={group}
                    checked={personalInformation.travelGroup === group}
                    onChange={() => handleChange("travelGroup", group)}
                    className="w-4 h-4 accent-blue-500"
                  />
                  {group}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label className="block text-lg text-[#808080] mb-2">
              Do You Travel With Pets?
              <span className="text-sm text-muted-foreground">
                (Select one)
              </span>
            </Label>
            <div className="flex flex-wrap gap-4">
              {(
                ["Business trips", "Leisure trips", "Both"] as TravelWithPets[]
              ).map((group) => (
                <label
                  key={group}
                  className="flex items-center gap-2 cursor-pointer text-base text-[#808080]"
                >
                  <input
                    type="radio"
                    name="travelWithPets"
                    value={group}
                    checked={personalInformation.travelWithPets === group}
                    onChange={() => handleChange("travelWithPets", group)}
                    className="w-4 h-4 accent-blue-500"
                  />
                  {group}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div>
          <Label className="block text-lg text-[#3174CD] mb-2">
            Notes on yourself
          </Label>
          <Textarea
            value={personalInformation.notes}
            onChange={handleInputChange}
            placeholder="Write something about yourself"
            className="min-h-[120px] border border-[#D2D2D2] focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </form>
    </div>
  );
};

export default VerificationProcess;
