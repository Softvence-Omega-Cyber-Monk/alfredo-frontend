import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Textarea } from "../ui/textarea";
import testimonailPerson from "@/assets/testimonailPerson.jpg";
import penIcon from "@/assets/icons/pen-icon.svg";

const ProfileForm = () => {
  return (
    <div className="w-full mx-auto px-6 py-10 space-y-8 font-sans">
      {/* Header */}

      <div className="max-w-3xl mx-auto px-4">
        {/* heading section */}
        <div className="text-center">
          <h1 className=" text-primary-blue font-semibold text-xl md:text-2xl md:pb-3 border-b border-[#EAF1FA]">
            Profile
          </h1>
          <p className="text-base text-dark-3 py-3 md:py-6">
            <span className="text-dark-2 font-semibold">User ID: </span>
            093526212544330792
          </p>
        </div>
        {/* image section */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative">
            <img
              src={testimonailPerson}
              className="h-44 w-44 object-cover object-center rounded-full border-4 border-[#A0BFE8]"
              alt=""
            />
            <div className="absolute bottom-2.5 right-2.5">
              <img
                src={penIcon}
                alt="Edit"
                className="w-8 h-8 md:w-10 md:h-10"
              />
            </div>
          </div>
        </div>
        {/* User Information */}
      </div>
      {/* Form Component  */}

      <form className="space-y-6">
        {/* Name, Phone, DOB, Email */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="grid w-full  items-center gap-2">
            <Label
              htmlFor="name"
              className="text-[var(--color-basic-dark)] text-lg font-DM-sans"
            >
              First Name
            </Label>
            <Input
              defaultValue="John"
              type="text"
              id="name"
              placeholder="First Name"
              className="h-11 px-4  items-center gap-2 rounded-lg border border-[var(--color-basic-dark)] bg-white/5 backdrop-blur-sm placeholder:text-gray-500"
            />
          </div>

          <div className="grid w-full  items-center gap-2">
            <Label
              htmlFor="name"
              className="text-[var(--color-basic-dark)] text-lg font-DM-sans"
            >
              Last Name
            </Label>
            <Input
              defaultValue="Doe"
              type="text"
              id="name"
              placeholder="Last Name"
              className="h-11 px-4  items-center gap-2 rounded-lg border border-[var(--color-basic-dark)] bg-white/5 backdrop-blur-sm placeholder:text-gray-500"
            />
          </div>
          {/*  */}
          <div className="grid w-full  items-center gap-2">
            <Label
              htmlFor="name"
              className="text-[var(--color-basic-dark)] text-lg font-DM-sans"
            >
              Phone (WhatsApp)
            </Label>
            <Input
              defaultValue="1234567890"
              type="number"
              id="number"
              placeholder="Phone Number"
              className="h-11 px-4 items-center gap-2 rounded-lg border border-[var(--color-basic-dark)] bg-white/5 backdrop-blur-sm placeholder:text-gray-500"
            />
          </div>

          <div className="grid w-full  items-center gap-2">
            <Label className="text-[var(--color-basic-dark)] text-lg font-DM-sans">
              Date of Birth
            </Label>
            <Input
              className="h-11 px-4 items-center gap-2 rounded-lg border border-[var(--color-basic-dark)] bg-white/5 backdrop-blur-sm placeholder:text-gray-500 text-[var(--color-basic-dark)]"
              type="date"
            />
          </div>
          <div className="md:col-span-2">
            <Label
              htmlFor="email"
              className="text-[var(--color-basic-dark)] text-lg font-DM-sans"
            >
              Email Address
            </Label>
            <Input
              type="email"
              id="email"
              placeholder="you@example.com"
              className="h-11 px-4  items-center gap-2 rounded-lg border border-[var(--color-basic-dark)] bg-white/5 backdrop-blur-sm placeholder:text-gray-500"
            />
          </div>
        </div>

        {/* ID Section */}
        <div className="space-y-2">
          <Label className="text-[var(--color-basic-dark)]">
            Identification Type
          </Label>
          <div className="flex gap-4 text-[var(--color-basic-dark)] font-DM-sans text-base mt-2">
            {["NID", "Passport", "Birth Certificate"].map((type) => (
              <label
                key={type}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="idType"
                  value={type}
                  className="w-4 h-4 accent-[var(--Info-I-600,#009DE8)] cursor-pointer"
                />
                {type}
              </label>
            ))}
          </div>
        </div>
        <div className="grid w-full  items-center gap-2">
          <Label
            htmlFor="name"
            className="text-[var(--color-basic-dark)] text-lg font-DM-sans"
          >
            Number
          </Label>

          <Input
            type="number"
            id="number"
            placeholder="Enter Identification Number"
            className="h-11 px-4 items-center gap-2 rounded-lg border border-[var(--color-basic-dark)] bg-white/5 backdrop-blur-sm placeholder:text-gray-500"
          />
        </div>

        {/* Age & Gender */}
        {/* Age & Gender */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <Label className="text-[var(--color-basic-dark)] text-lg font-DM-sans">
              Age:
            </Label>
            <div className="flex flex-wrap gap-4 mt-2 md:mt-0">
              {["18–30", "30–50", "50–65", "65+"].map((age) => (
                <label
                  key={age}
                  className="flex items-center gap-2 cursor-pointer text-base text-[var(--Basic-B-Dark-3,#808080)] font-[DM Sans] leading-[150%]"
                >
                  <input
                    type="radio"
                    name="ageGroup"
                    value={age}
                    defaultChecked={age === "18–30"}
                    className="w-4 h-4 accent-[var(--Info-I-600,#009DE8)] cursor-pointer"
                  />
                  {age}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Gender */}
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <Label className="text-[var(--color-basic-dark)] text-lg font-DM-sans">
            Gender
          </Label>
          <div className="flex flex-wrap gap-4 mt-2 md:mt-0">
            {["Male", "Female", "Not Specified"].map((g) => (
              <label
                key={g}
                className="flex items-center gap-2 cursor-pointer text-base text-[var(--Basic-B-Dark-3,#808080)] font-[DM Sans] leading-[150%]"
              >
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  defaultChecked={g === "Male"}
                  className="w-4 h-4 accent-[var(--Info-I-600,#009DE8)] cursor-pointer"
                />
                {g}
              </label>
            ))}
          </div>
        </div>

        {/* Employment & Travel Group */}
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          {/* Left Label */}
          <Label
            htmlFor="role"
            className="text-[var(--color-basic-dark)] text-base md:text-lg font-medium font-DM-sans"
          >
            I am a:
          </Label>

          {/* Right RadioGroup */}
          <div className="flex flex-wrap gap-6 mt-2 md:mt-0">
            {["Worker", "Retired", "Student", "Unemployed"].map((role) => (
              <label
                key={role}
                className="flex items-center gap-2 cursor-pointer text-base text-[var(--color-basic-dark)] font-DM-sans"
              >
                <input
                  type="radio"
                  name="role"
                  value={role}
                  defaultChecked={role === "Worker"}
                  className="w-4 h-4 accent-[var(--Info-I-600,#009DE8)] cursor-pointer"
                />
                {role}
              </label>
            ))}
          </div>
        </div>

        {/* Travel Group */}
        <div className="flex flex-col md:flex-row md:items-center gap-2 mt-4">
          <Label
            htmlFor="travelGroup"
            className="text-[var(--color-basic-dark)] text-base md:text-lg font-medium font-DM-sans"
          >
            I mostly travel with:
          </Label>
          <RadioGroup
            id="travelGroup"
            defaultValue="Family"
            className="flex flex-wrap gap-6 mt-2 md:mt-0"
          >
            {["By Myself", "Family", "Couple", "Friends"].map((group) => (
              <div
                key={group}
                className="flex items-center gap-2 cursor-pointer"
              >
                <RadioGroupItem value={group} id={group} />
                <Label
                  htmlFor={group}
                  className="text-[var(--color-basic-dark)] font-DM-sans text-base font-normal"
                >
                  {group}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Checkboxes – Preferences */}
        <div className="space-y-4">
          <div>
            <Label className=" text-[#808080] text-lg">
              Favourite Destinations{" "}
              <span className="text-muted-foreground">
                (select all that apply)
              </span>
            </Label>
            <div className="flex gap-4 flex-wrap mt-2 text-base text-[#808080]">
              {["Big Cities", "Small Cities", "Seaside", "Mountain"].map(
                (dest) => (
                  <label key={dest} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      defaultChecked={dest === "Big Cities"}
                    />
                    {dest}
                  </label>
                )
              )}
            </div>
          </div>

          <div>
            <Label className=" text-[#808080] text-lg">
              I travel for{" "}
              <span className="text-muted-foreground">
                (select all that apply)
              </span>
            </Label>
            <div className="flex gap-4 flex-wrap mt-2 text-[#808080] text-base">
              {["Relax", "Adventure", "Work"].map((reason) => (
                <label key={reason} className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked={reason === "Relax"} />
                  {reason}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="grid w-full gap-3">
          <Label className="  text-[#808080] text-lg">Notes on yourself</Label>
          <Textarea
            id="text"
            placeholder="Write something about yourself"
            className="min-h-[100px] border-[#D2D2D2]"
          />
        </div>

        {/* Travel Preferences */}
        {/* Travel Preferences */}
        <div className="p-4 sm:p-6 rounded-3xl bg-[#F9F9F9] space-y-4 sm:h-60 h-auto">
          <h1 className="text-[var(--color-basic-dark)] text-lg sm:text-xl font-DM-sans font-normal">
            Travel Preferencessss
          </h1>

          {/* Travel Type */}
          <div>
            <Label className="text-[var(--color-basic-dark)] text-base sm:text-lg font-DM-sans font-normal">
              I travel mostly (select up to 2 options):
            </Label>
            <div className="flex flex-wrap gap-3 sm:gap-4 mt-2">
              {[
                "Business",
                "Leisure",
                "Adventure",
                "Family",
                "Solo",
                "Cultural",
              ].map((opt) => (
                <label
                  key={opt}
                  className="flex items-center gap-2 text-sm sm:text-base text-[var(--color-basic-dark)]"
                >
                  <input
                    type="checkbox"
                    defaultChecked={["Business", "Leisure"].includes(opt)}
                    className="w-5 h-5 rounded-[6px] border border-[#009DE8] bg-[#009DE8] cursor-pointer"
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>

          {/* With Pets */}
          <div>
            <Label className="text-[var(--color-basic-dark)] text-base sm:text-lg font-DM-sans font-normal">
              Do you travel with pets?
            </Label>
            <div className="flex flex-wrap gap-3 mt-2">
              {["Yes", "No"].map((opt) => (
                <label
                  key={opt}
                  className="flex items-center gap-2 text-sm sm:text-base text-[var(--color-basic-dark)]"
                >
                  <input
                    type="radio"
                    name="withPets"
                    defaultChecked={opt === "No"}
                    className="w-4 h-4 accent-[var(--Info-I-600,#009DE8)] cursor-pointer"
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Status & Submit */}
        <div className="text-start  ">
          <p className="text-lg ">
            Account Verification Status:
            <span className="text-green-600 font-semibold pl-2">Verified</span>
          </p>
        </div>
        <div>
          <Button
            type="submit"
            className="w-full h-14 flex py-4 px-7 justify-center items-center self-stretch rounded-lg bg-[var(--color-primary-blue)] hover:bg-[#255DA8] text-white text-lg  cursor-pointer"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
