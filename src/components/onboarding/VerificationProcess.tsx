import { TbChecklist } from "react-icons/tb";
import Title from "./Shared/Title";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "../ui/textarea";
import { ArrowLeft } from "lucide-react";
import { FaArrowRight } from "react-icons/fa";

const VerificationProcess = () => {
  return (
    <div className="w-full  md:py-10 space-y-6 ">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-center mb-10 w-full gap-4">
        <div className="w-full lg:w-auto flex-1">
          <Title title="Welcome back, Savannah!" />
        </div>
        <div className="w-full lg:w-auto flex justify-end">
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

      {/* Form Section */}
      <form className="space-y-8 font-sans">
        {/* Age & Gender */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Age */}
          <div>
            <Label className="block text-lg text-[#3174CD] mb-2">Age: </Label>
            <div className="flex flex-wrap gap-4">
              {["18–30", "30–50", "50–65", "65+"].map((age) => (
                <label
                  key={age}
                  className="flex items-center gap-2 cursor-pointer text-base text-[#808080]"
                >
                  <input
                    type="radio"
                    name="ageGroup"
                    value={age}
                    defaultChecked={age === "18–30"}
                    className="w-4 h-4 accent-blue-500"
                  />
                  {age}
                </label>
              ))}
            </div>
          </div>

          {/* Gender */}
          <div>
            <Label className="block text-lg text-[#3174CD] mb-2">
              Gender:{" "}
            </Label>
            <div className="flex flex-wrap gap-4">
              {["Male", "Female", "Not Specified"].map((g) => (
                <label
                  key={g}
                  className="flex items-center gap-2 cursor-pointer text-base text-[#808080]"
                >
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    defaultChecked={g === "Male"}
                    className="w-4 h-4 accent-blue-500"
                  />
                  {g}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Role & Travel */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Role */}
          <div>
            <Label className="block text-lg text-[#3174CD] mb-2">I am a:</Label>
            <div className="flex flex-wrap gap-4">
              {["Worker", "Retired", "Student", "Unemployed"].map((role) => (
                <label
                  key={role}
                  className="flex items-center gap-2 cursor-pointer text-base text-[#808080]"
                >
                  <input
                    type="radio"
                    name="role"
                    value={role}
                    defaultChecked={role === "Worker"}
                    className="w-4 h-4 accent-blue-500"
                  />
                  {role}
                </label>
              ))}
            </div>
          </div>

          {/* Travel Group */}
          <div>
            <Label className="block text-lg text-[#808080] mb-2">
              Your Travel Type
              <span className="text-sm text-muted-foreground">
                (Select up to 2 options)
              </span>
            </Label>
            <div className="flex flex-wrap gap-4">
              {[
                "Business",
                "Leisure",
                "Adventure",
                "Family",
                "Solo",
                "Cultural",
              ].map((dest) => (
                <label
                  key={dest}
                  className="flex items-center gap-2 text-base text-[#808080]"
                >
                  <input
                    type="checkbox"
                    defaultChecked={dest === "Big Cities"}
                    className="w-5 h-5 accent-blue-500"
                  />
                  {dest}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Destination & Travel Reason */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Favourite Destinations */}
          <div>
            <Label className="block text-lg text-[#3174CD] mb-2">
              Favourite destinations
              <span className="text-sm text-muted-foreground">
                (select all that apply):
              </span>
            </Label>
            <div className="flex flex-wrap gap-4">
              {["Big Cities", "Small Cities", "Seaside", "Mountain"].map(
                (dest) => (
                  <label
                    key={dest}
                    className="flex items-center gap-2 text-base text-[#808080]"
                  >
                    <input
                      type="checkbox"
                      defaultChecked={dest === "Big Cities"}
                      className="w-5 h-5 accent-blue-500"
                    />
                    {dest}
                  </label>
                )
              )}
            </div>
          </div>

          {/* Travel Purpose */}
          <div>
            <Label className="block text-lg text-[#808080] mb-2">
              Who Do You Usually Travel With? (Select one)
            </Label>
            <div className="flex flex-wrap gap-4">
              {[
                "By Myself",
                "With Family",
                "With a Partner",
                "With Friends",
              ].map((group) => (
                <label
                  key={group}
                  className="flex items-center gap-2 cursor-pointer text-base text-[#808080]"
                >
                  <input
                    type="radio"
                    name="travelGroup"
                    value={group}
                    defaultChecked={group === "Family"}
                    className="w-4 h-4 accent-blue-500"
                  />
                  {group}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Travel Reason */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Travel Purpose */}
          <div>
            <Label className="block text-lg text-[#808080] mb-2">
              Do You Travel With Pets?
              <span className="text-sm text-muted-foreground">
                (Select one)
              </span>
            </Label>

            <div className="flex flex-wrap gap-4">
              {["Business trips", "Leisure trips", "Both"].map((group) => (
                <label
                  key={group}
                  className="flex items-center gap-2 cursor-pointer text-base text-[#808080]"
                >
                  <input
                    type="radio"
                    name="travelGroup"
                    value={group}
                    defaultChecked={group === "Family"}
                    className="w-4 h-4 accent-blue-500"
                  />
                  {group}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Notes */}
        <div>
          <Label className="block text-lg text-[#3174CD] mb-2">
            Notes on yourself
          </Label>
          <Textarea
            placeholder="Write something about yourself"
            className="min-h-[120px] border border-[#D2D2D2] focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
          <Button className="w-full sm:w-[125px] h-[52px] px-6 py-2 text-[rgba(128,128,128,0.5)] font-inter text-[18px] font-semibold leading-[156%] border border-[#CAD2DB] rounded-[35px] cursor-pointer">
            Cancel
          </Button>

          <div className="flex gap-4 w-full sm:w-auto justify-end">
            <Button
              variant="outline"
              className="w-full sm:w-[125px] h-[52px] px-8 py-3 rounded-[35px] border border-[#BFD4F0] bg-[#FFFFFF] text-[#77B1EE] text-[18px] font-semibold leading-[156%] font-['Inter'] flex items-center justify-center gap-[10px] cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </Button>
            <Button
              type="submit"
              className="w-full sm:w-[125px] h-[52px] px-8 py-3 rounded-[35px] bg-[#3174CD] hover:bg-[#215ba8] text-white font-inter text-[18px] font-semibold leading-[156%] flex justify-center items-center  gap-[10px] cursor-pointer"
            >
              Continue
              <FaArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default VerificationProcess;
