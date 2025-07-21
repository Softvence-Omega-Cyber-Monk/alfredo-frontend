import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "../ui/textarea";
import testimonailPerson from "@/assets/testimonailPerson.jpg";
import penIcon from "@/assets/icons/pen-icon.svg";
import { toast } from "sonner";

type FormData = {
  firstName: string;
  lastName: string;
  phone: string;
  dob: string;
  email: string;
  idType: string;
  idNumber: string;
  ageGroup: string;
  gender: string;
  role: string;
  travelGroup: string;
  favoriteDestinations: string[];
  travelReasons: string[];
  notes: string;
  travelPreferences: string[];
  withPets: string;
};

const ProfileForm = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "John",
    lastName: "Doe",
    phone: "1234567890",
    dob: "1990-01-01",
    email: "john.doe@example.com",
    idType: "NID",
    idNumber: "",
    ageGroup: "18–30",
    gender: "Male",
    role: "Worker",
    travelGroup: "Family",
    favoriteDestinations: [""],
    travelReasons: [""],
    notes: "",
    travelPreferences: [""],
    withPets: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (
    name: keyof FormData,
    value: string,
    isChecked: boolean
  ) => {
    setFormData((prev) => {
      const currentValues = prev[name] as string[];
      if (isChecked) {
        return {
          ...prev,
          [name]: [...currentValues, value],
        };
      } else {
        return {
          ...prev,
          [name]: currentValues.filter((item) => item !== value),
        };
      }
    });
  };

  const handleRadioChange = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success(" Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(" Failed to update profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full mx-auto px-6 py-10 space-y-8 font-sans">
      {/* Header */}
      <div className="max-w-3xl mx-auto px-4">
        {/* heading section */}
        <div className="text-center">
          <h1 className="text-primary-blue font-semibold text-xl md:text-2xl md:pb-3 border-b border-[#EAF1FA]">
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
              alt="Profile"
            />
            <button className="absolute bottom-2.5 right-2.5 bg-white p-2 rounded-full shadow-md cursor-pointer">
              <img src={penIcon} alt="Edit" className="w-6 h-6 md:w-8 md:h-8" />
            </button>
          </div>
        </div>
      </div>

      {/* Form Component */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name, Phone, DOB, Email */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="grid w-full items-center gap-2">
            <Label
              htmlFor="firstName"
              className="text-[var(--color-basic-dark)] text-lg font-DM-sans"
            >
              First Name
            </Label>
            <Input
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              type="text"
              id="firstName"
              placeholder="First Name"
              className="h-11 px-4 items-center gap-2 rounded-lg border border-[var(--color-basic-dark)] bg-white/5 backdrop-blur-sm placeholder:text-gray-500"
            />
          </div>

          <div className="grid w-full items-center gap-2">
            <Label
              htmlFor="lastName"
              className="text-[var(--color-basic-dark)] text-lg font-DM-sans"
            >
              Last Name
            </Label>
            <Input
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              type="text"
              id="lastName"
              placeholder="Last Name"
              className="h-11 px-4 items-center gap-2 rounded-lg border border-[var(--color-basic-dark)] bg-white/5 backdrop-blur-sm placeholder:text-gray-500"
            />
          </div>

          <div className="grid w-full items-center gap-2">
            <Label
              htmlFor="phone"
              className="text-[var(--color-basic-dark)] text-lg font-DM-sans"
            >
              Phone (WhatsApp)
            </Label>
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              type="tel"
              id="phone"
              placeholder="Phone Number"
              className="h-11 px-4 items-center gap-2 rounded-lg border border-[var(--color-basic-dark)] bg-white/5 backdrop-blur-sm placeholder:text-gray-500"
            />
          </div>

          <div className="grid w-full items-center gap-2">
            <Label
              htmlFor="dob"
              className="text-[var(--color-basic-dark)] text-lg font-DM-sans"
            >
              Date of Birth
            </Label>
            <Input
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              type="date"
              id="dob"
              className="hide-calendar-icon h-11 px-4 pr-10 rounded-lg border border-[var(--color-basic-dark)] bg-white/5 backdrop-blur-sm placeholder:text-gray-500 text-[var(--color-basic-dark)]"
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
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              type="email"
              id="email"
              placeholder="you@example.com"
              className="h-11 px-4 items-center gap-2 rounded-lg border border-[var(--color-basic-dark)] bg-white/5 backdrop-blur-sm placeholder:text-gray-500"
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
                  checked={formData.idType === type}
                  onChange={() => handleRadioChange("idType", type)}
                  className="w-4 h-4 accent-[var(--Info-I-600,#009DE8)] cursor-pointer"
                />
                {type}
              </label>
            ))}
          </div>
        </div>

        <div className="grid w-full items-center gap-2">
          <Label
            htmlFor="idNumber"
            className="text-[var(--color-basic-dark)] text-lg font-DM-sans"
          >
            Number
          </Label>
          <Input
            name="idNumber"
            value={formData.idNumber}
            onChange={handleInputChange}
            type="text"
            id="idNumber"
            placeholder="Enter Identification Number"
            className="h-11 px-4 items-center gap-2 rounded-lg border border-[var(--color-basic-dark)] bg-white/5 backdrop-blur-sm placeholder:text-gray-500"
          />
        </div>

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
                    checked={formData.ageGroup === age}
                    onChange={() => handleRadioChange("ageGroup", age)}
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
                  checked={formData.gender === g}
                  onChange={() => handleRadioChange("gender", g)}
                  className="w-4 h-4 accent-[var(--Info-I-600,#009DE8)] cursor-pointer"
                />
                {g}
              </label>
            ))}
          </div>
        </div>

        {/* Employment & Travel Group */}
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <Label className="text-[var(--color-basic-dark)] text-base md:text-lg font-medium font-DM-sans">
            I am a:
          </Label>
          <div className="flex flex-wrap gap-6 mt-2 md:mt-0">
            {["Worker", "Retired", "Student", "Unemployed"].map((role) => (
              <label
                key={role}
                className="flex items-center gap-2 cursor-pointer text-base text-[var(--color-basic-dark)] font-DM-sans"
              >
                <input
                  type="radio"
                  name="role"
                  checked={formData.role === role}
                  onChange={() => handleRadioChange("role", role)}
                  className="w-4 h-4 accent-[var(--Info-I-600,#009DE8)] cursor-pointer"
                />
                {role}
              </label>
            ))}
          </div>
        </div>

        {/* Travel Group */}
        <div className="flex flex-col md:flex-row md:items-center gap-2 mt-4">
          <Label className="text-[var(--color-basic-dark)] text-base md:text-lg font-medium font-DM-sans">
            I mostly travel with:
          </Label>
          <div className="flex flex-wrap gap-6 mt-2 md:mt-0">
            {["By Myself", "Family", "Couple", "Friends"].map((group) => (
              <label
                key={group}
                className="flex items-center gap-2 cursor-pointer text-base text-[var(--color-basic-dark)] font-DM-sans"
              >
                <input
                  type="radio"
                  name="travelGroup"
                  checked={formData.travelGroup === group}
                  onChange={() => handleRadioChange("travelGroup", group)}
                  className="w-4 h-4 accent-[var(--Info-I-600,#009DE8)] cursor-pointer"
                />
                {group}
              </label>
            ))}
          </div>
        </div>

        {/* Checkboxes – Preferences */}
        <div className="space-y-4">
          <div>
            <Label className="text-[#808080] text-lg">
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
                      checked={formData.favoriteDestinations.includes(dest)}
                      onChange={(e) =>
                        handleCheckboxChange(
                          "favoriteDestinations",
                          dest,
                          e.target.checked
                        )
                      }
                      className="w-5 h-5 rounded-[6px] border border-[#009DE8] bg-[#009DE8] cursor-pointer"
                    />
                    {dest}
                  </label>
                )
              )}
            </div>
          </div>

          <div>
            <Label className="text-[#808080] text-lg">
              I travel for{" "}
              <span className="text-muted-foreground">
                (select all that apply)
              </span>
            </Label>
            <div className="flex gap-4 flex-wrap mt-2 text-[#808080] text-base">
              {["Relax", "Adventure", "Work"].map((reason) => (
                <label key={reason} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.travelReasons.includes(reason)}
                    onChange={(e) =>
                      handleCheckboxChange(
                        "travelReasons",
                        reason,
                        e.target.checked
                      )
                    }
                    className="w-5 h-5 rounded-[6px] border border-[#009DE8] bg-[#009DE8] cursor-pointer"
                  />
                  {reason}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="grid w-full gap-3">
          <Label className="text-[#808080] text-lg">Notes on yourself</Label>
          <Textarea
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            id="notes"
            placeholder="Write something about yourself"
            className="min-h-[100px] border-[#D2D2D2]"
          />
        </div>

        {/* Travel Preferences */}
        <div className="p-4 sm:p-6 rounded-3xl bg-[#F9F9F9] space-y-4 sm:h-60 h-auto">
          <h1 className="text-[var(--color-basic-dark)] text-lg sm:text-xl font-DM-sans font-normal">
            Travel Preferences
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
                    checked={formData.travelPreferences.includes(opt)}
                    onChange={(e) =>
                      handleCheckboxChange(
                        "travelPreferences",
                        opt,
                        e.target.checked
                      )
                    }
                    className="w-5 h-5 rounded-[6px] border border-[#009DE8] bg-[#009DE8] cursor-pointer"
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>

          {/* With Pets */}
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
                    value={opt}
                    checked={formData.withPets === opt}
                    onChange={() => handleRadioChange("withPets", opt)}
                    className="w-4 h-4 accent-[var(--Info-I-600,#009DE8)] cursor-pointer"
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Status & Submit */}
        <div className="text-start">
          <p className="text-lg">
            Account Verification Status:
            <span className="text-green-600 font-semibold pl-2">Verified</span>
          </p>
        </div>

        {successMessage && (
          <div className="p-4 bg-green-100 text-green-700 rounded-lg">
            {successMessage}
          </div>
        )}

        <div className="">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-14 flex py-4 px-7 justify-center items-center self-stretch rounded-lg bg-[var(--color-primary-blue)] hover:bg-[#255DA8] text-white text-lg cursor-pointer disabled:opacity-70"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;

// import { useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "../ui/textarea";
// import testimonailPerson from "@/assets/testimonailPerson.jpg";
// import penIcon from "@/assets/icons/pen-icon.svg";
// import { toast } from "sonner";

// type FormData = {
//   firstName: string;
//   lastName: string;
//   phone: string;
//   dob: string;
//   email: string;
//   idType: string;
//   idNumber: string;
//   ageGroup: string;
//   gender: string;
//   role: string;
//   travelGroup: string;
//   favoriteDestinations: string[];
//   travelReasons: string[];
//   notes: string;
//   travelPreferences: string[];
//   withPets: string;
// };

// const ProfileForm = () => {
//   const [formData, setFormData] = useState<FormData>({
//     firstName: "John",
//     lastName: "Doe",
//     phone: "1234567890",
//     dob: "1990-01-01",
//     email: "john.doe@example.com",
//     idType: "NID",
//     idNumber: "",
//     ageGroup: "18–30",
//     gender: "Male",
//     role: "Worker",
//     travelGroup: "Family",
//     favoriteDestinations: ["Big Cities"],
//     travelReasons: ["Relax"],
//     notes: "",
//     travelPreferences: [""],
//     withPets: "",
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleCheckboxChange = (
//     name: keyof FormData,
//     value: string,
//     isChecked: boolean
//   ) => {
//     setFormData((prev) => {
//       const currentValues = prev[name] as string[];
//       if (isChecked) {
//         // For travelPreferences, limit to 2 selections
//         if (name === "travelPreferences" && currentValues.length >= 2) {
//           return prev;
//         }
//         return {
//           ...prev,
//           [name]: [...currentValues, value],
//         };
//       } else {
//         return {
//           ...prev,
//           [name]: currentValues.filter((item) => item !== value),
//         };
//       }
//     });
//   };

//   const handleRadioChange = (name: keyof FormData, value: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setSuccessMessage("");

//     try {
//       // Validate required fields
//       if (!formData.firstName || !formData.lastName || !formData.email) {
//         throw new Error("Please fill in all required fields");
//       }

//       // Validate travelPreferences has max 2 selections
//       if (formData.travelPreferences.length > 2) {
//         throw new Error("Please select maximum 2 travel preferences");
//       }

//       // Simulate API call with timeout
//       await new Promise((resolve) => setTimeout(resolve, 1500));

//       // Here you would typically make an actual API call
//       // For example:
//       // const response = await fetch('/api/profile', {
//       //   method: 'POST',
//       //   headers: {
//       //     'Content-Type': 'application/json',
//       //   },
//       //   body: JSON.stringify(formData),
//       // });
//       // const data = await response.json();
//       // if (!response.ok) throw new Error(data.message || 'Failed to update profile');

//       // On success
//       setSuccessMessage("Profile updated successfully!");
//       toast.success("Profile updated successfully!");

//       // You might want to update the local state with the response data
//       // setFormData(data.updatedProfile);
//     } catch (error) {
//       const errorMessage =
//         error instanceof Error
//           ? error.message
//           : "Failed to update profile. Please try again.";
//       console.error("Error updating profile:", error);
//       toast.error(errorMessage);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="w-full mx-auto px-6 py-10 space-y-8 font-sans">
//       {/* Header */}
//       <div className="max-w-3xl mx-auto px-4">
//         {/* heading section */}
//         <div className="text-center">
//           <h1 className="text-primary-blue font-semibold text-xl md:text-2xl md:pb-3 border-b border-[#EAF1FA]">
//             Profile
//           </h1>
//           <p className="text-base text-dark-3 py-3 md:py-6">
//             <span className="text-dark-2 font-semibold">User ID: </span>
//             093526212544330792
//           </p>
//         </div>

//         {/* image section */}
//         <div className="flex flex-col items-center justify-center">
//           <div className="relative">
//             <img
//               src={testimonailPerson}
//               className="h-44 w-44 object-cover object-center rounded-full border-4 border-[#A0BFE8]"
//               alt="Profile"
//             />
//             <button
//               type="button"
//               className="absolute bottom-2.5 right-2.5 bg-white p-2 rounded-full shadow-md cursor-pointer"
//               onClick={() => toast.info("Profile picture upload coming soon")}
//             >
//               <img src={penIcon} alt="Edit" className="w-6 h-6 md:w-8 md:h-8" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Form Component */}
//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Name, Phone, DOB, Email */}
//         <div className="grid md:grid-cols-2 gap-4">
//           <div className="grid w-full items-center gap-2">
//             <Label
//               htmlFor="firstName"
//               className="text-[var(--color-basic-dark)] text-lg font-DM-sans"
//             >
//               First Name *
//             </Label>
//             <Input
//               name="firstName"
//               value={formData.firstName}
//               onChange={handleInputChange}
//               type="text"
//               id="firstName"
//               placeholder="First Name"
//               required
//               className="h-11 px-4 items-center gap-2 rounded-lg border border-[var(--color-basic-dark)] bg-white/5 backdrop-blur-sm placeholder:text-gray-500"
//             />
//           </div>

//           <div className="grid w-full items-center gap-2">
//             <Label
//               htmlFor="lastName"
//               className="text-[var(--color-basic-dark)] text-lg font-DM-sans"
//             >
//               Last Name *
//             </Label>
//             <Input
//               name="lastName"
//               value={formData.lastName}
//               onChange={handleInputChange}
//               type="text"
//               id="lastName"
//               placeholder="Last Name"
//               required
//               className="h-11 px-4 items-center gap-2 rounded-lg border border-[var(--color-basic-dark)] bg-white/5 backdrop-blur-sm placeholder:text-gray-500"
//             />
//           </div>

//           <div className="grid w-full items-center gap-2">
//             <Label
//               htmlFor="phone"
//               className="text-[var(--color-basic-dark)] text-lg font-DM-sans"
//             >
//               Phone (WhatsApp)
//             </Label>
//             <Input
//               name="phone"
//               value={formData.phone}
//               onChange={handleInputChange}
//               type="tel"
//               id="phone"
//               placeholder="Phone Number"
//               className="h-11 px-4 items-center gap-2 rounded-lg border border-[var(--color-basic-dark)] bg-white/5 backdrop-blur-sm placeholder:text-gray-500"
//             />
//           </div>

//           <div className="grid w-full items-center gap-2">
//             <Label
//               htmlFor="dob"
//               className="text-[var(--color-basic-dark)] text-lg font-DM-sans"
//             >
//               Date of Birth
//             </Label>
//             <Input
//               name="dob"
//               value={formData.dob}
//               onChange={handleInputChange}
//               type="date"
//               id="dob"
//               className="h-11 px-4 items-center gap-2 rounded-lg border border-[var(--color-basic-dark)] bg-white/5 backdrop-blur-sm placeholder:text-gray-500 text-[var(--color-basic-dark)]"
//             />
//           </div>

//           <div className="md:col-span-2">
//             <Label
//               htmlFor="email"
//               className="text-[var(--color-basic-dark)] text-lg font-DM-sans"
//             >
//               Email Address *
//             </Label>
//             <Input
//               name="email"
//               value={formData.email}
//               onChange={handleInputChange}
//               type="email"
//               id="email"
//               placeholder="you@example.com"
//               required
//               className="h-11 px-4 items-center gap-2 rounded-lg border border-[var(--color-basic-dark)] bg-white/5 backdrop-blur-sm placeholder:text-gray-500"
//             />
//           </div>
//         </div>

//         {/* ID Section */}
//         <div className="space-y-2">
//           <Label className="text-[var(--color-basic-dark)]">
//             Identification Type
//           </Label>
//           <div className="flex gap-4 text-[var(--color-basic-dark)] font-DM-sans text-base mt-2">
//             {["NID", "Passport", "Birth Certificate"].map((type) => (
//               <label
//                 key={type}
//                 className="flex items-center gap-2 cursor-pointer"
//               >
//                 <input
//                   type="radio"
//                   name="idType"
//                   checked={formData.idType === type}
//                   onChange={() => handleRadioChange("idType", type)}
//                   className="w-4 h-4 accent-[var(--Info-I-600,#009DE8)] cursor-pointer"
//                 />
//                 {type}
//               </label>
//             ))}
//           </div>
//         </div>

//         <div className="grid w-full items-center gap-2">
//           <Label
//             htmlFor="idNumber"
//             className="text-[var(--color-basic-dark)] text-lg font-DM-sans"
//           >
//             Number
//           </Label>
//           <Input
//             name="idNumber"
//             value={formData.idNumber}
//             onChange={handleInputChange}
//             type="text"
//             id="idNumber"
//             placeholder="Enter Identification Number"
//             className="h-11 px-4 items-center gap-2 rounded-lg border border-[var(--color-basic-dark)] bg-white/5 backdrop-blur-sm placeholder:text-gray-500"
//           />
//         </div>

//         {/* Age & Gender */}
//         <div className="grid md:grid-cols-2 gap-4">
//           <div className="flex flex-col md:flex-row md:items-center gap-2">
//             <Label className="text-[var(--color-basic-dark)] text-lg font-DM-sans">
//               Age:
//             </Label>
//             <div className="flex flex-wrap gap-4 mt-2 md:mt-0">
//               {["18–30", "30–50", "50–65", "65+"].map((age) => (
//                 <label
//                   key={age}
//                   className="flex items-center gap-2 cursor-pointer text-base text-[var(--Basic-B-Dark-3,#808080)] font-[DM Sans] leading-[150%]"
//                 >
//                   <input
//                     type="radio"
//                     name="ageGroup"
//                     checked={formData.ageGroup === age}
//                     onChange={() => handleRadioChange("ageGroup", age)}
//                     className="w-4 h-4 accent-[var(--Info-I-600,#009DE8)] cursor-pointer"
//                   />
//                   {age}
//                 </label>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Gender */}
//         <div className="flex flex-col md:flex-row md:items-center gap-2">
//           <Label className="text-[var(--color-basic-dark)] text-lg font-DM-sans">
//             Gender
//           </Label>
//           <div className="flex flex-wrap gap-4 mt-2 md:mt-0">
//             {["Male", "Female", "Not Specified"].map((g) => (
//               <label
//                 key={g}
//                 className="flex items-center gap-2 cursor-pointer text-base text-[var(--Basic-B-Dark-3,#808080)] font-[DM Sans] leading-[150%]"
//               >
//                 <input
//                   type="radio"
//                   name="gender"
//                   checked={formData.gender === g}
//                   onChange={() => handleRadioChange("gender", g)}
//                   className="w-4 h-4 accent-[var(--Info-I-600,#009DE8)] cursor-pointer"
//                 />
//                 {g}
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Employment & Travel Group */}
//         <div className="flex flex-col md:flex-row md:items-center gap-2">
//           <Label className="text-[var(--color-basic-dark)] text-base md:text-lg font-medium font-DM-sans">
//             I am a:
//           </Label>
//           <div className="flex flex-wrap gap-6 mt-2 md:mt-0">
//             {["Worker", "Retired", "Student", "Unemployed"].map((role) => (
//               <label
//                 key={role}
//                 className="flex items-center gap-2 cursor-pointer text-base text-[var(--color-basic-dark)] font-DM-sans"
//               >
//                 <input
//                   type="radio"
//                   name="role"
//                   checked={formData.role === role}
//                   onChange={() => handleRadioChange("role", role)}
//                   className="w-4 h-4 accent-[var(--Info-I-600,#009DE8)] cursor-pointer"
//                 />
//                 {role}
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Travel Group */}
//         <div className="flex flex-col md:flex-row md:items-center gap-2 mt-4">
//           <Label className="text-[var(--color-basic-dark)] text-base md:text-lg font-medium font-DM-sans">
//             I mostly travel with:
//           </Label>
//           <div className="flex flex-wrap gap-6 mt-2 md:mt-0">
//             {["By Myself", "Family", "Couple", "Friends"].map((group) => (
//               <label
//                 key={group}
//                 className="flex items-center gap-2 cursor-pointer text-base text-[var(--color-basic-dark)] font-DM-sans"
//               >
//                 <input
//                   type="radio"
//                   name="travelGroup"
//                   checked={formData.travelGroup === group}
//                   onChange={() => handleRadioChange("travelGroup", group)}
//                   className="w-4 h-4 accent-[var(--Info-I-600,#009DE8)] cursor-pointer"
//                 />
//                 {group}
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Checkboxes – Preferences */}
//         <div className="space-y-4">
//           <div>
//             <Label className="text-[#808080] text-lg">
//               Favourite Destinations{" "}
//               <span className="text-muted-foreground">
//                 (select all that apply)
//               </span>
//             </Label>
//             <div className="flex gap-4 flex-wrap mt-2 text-base text-[#808080]">
//               {["Big Cities", "Small Cities", "Seaside", "Mountain"].map(
//                 (dest) => (
//                   <label key={dest} className="flex items-center gap-2">
//                     <input
//                       type="checkbox"
//                       checked={formData.favoriteDestinations.includes(dest)}
//                       onChange={(e) =>
//                         handleCheckboxChange(
//                           "favoriteDestinations",
//                           dest,
//                           e.target.checked
//                         )
//                       }
//                       className="w-5 h-5 rounded-[6px] border border-[#009DE8] bg-[#009DE8] cursor-pointer"
//                     />
//                     {dest}
//                   </label>
//                 )
//               )}
//             </div>
//           </div>

//           <div>
//             <Label className="text-[#808080] text-lg">
//               I travel for{" "}
//               <span className="text-muted-foreground">
//                 (select all that apply)
//               </span>
//             </Label>
//             <div className="flex gap-4 flex-wrap mt-2 text-[#808080] text-base">
//               {["Relax", "Adventure", "Work"].map((reason) => (
//                 <label key={reason} className="flex items-center gap-2">
//                   <input
//                     type="checkbox"
//                     checked={formData.travelReasons.includes(reason)}
//                     onChange={(e) =>
//                       handleCheckboxChange(
//                         "travelReasons",
//                         reason,
//                         e.target.checked
//                       )
//                     }
//                     className="w-5 h-5 rounded-[6px] border border-[#009DE8] bg-[#009DE8] cursor-pointer"
//                   />
//                   {reason}
//                 </label>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Notes */}
//         <div className="grid w-full gap-3">
//           <Label className="text-[#808080] text-lg">Notes on yourself</Label>
//           <Textarea
//             name="notes"
//             value={formData.notes}
//             onChange={handleInputChange}
//             id="notes"
//             placeholder="Write something about yourself"
//             className="min-h-[100px] border-[#D2D2D2]"
//           />
//         </div>

//         {/* Travel Preferences */}
//         <div className="p-4 sm:p-6 rounded-3xl bg-[#F9F9F9] space-y-4 sm:h-60 h-auto">
//           <h1 className="text-[var(--color-basic-dark)] text-lg sm:text-xl font-DM-sans font-normal">
//             Travel Preferences
//           </h1>

//           {/* Travel Type */}
//           <div>
//             <Label className="text-[var(--color-basic-dark)] text-base sm:text-lg font-DM-sans font-normal">
//               I travel mostly (select up to 2 options):
//             </Label>
//             <div className="flex flex-wrap gap-3 sm:gap-4 mt-2">
//               {[
//                 "Business",
//                 "Leisure",
//                 "Adventure",
//                 "Family",
//                 "Solo",
//                 "Cultural",
//               ].map((opt) => (
//                 <label
//                   key={opt}
//                   className="flex items-center gap-2 text-sm sm:text-base text-[var(--color-basic-dark)]"
//                 >
//                   <input
//                     type="checkbox"
//                     checked={formData.travelPreferences.includes(opt)}
//                     onChange={(e) =>
//                       handleCheckboxChange(
//                         "travelPreferences",
//                         opt,
//                         e.target.checked
//                       )
//                     }
//                     disabled={
//                       formData.travelPreferences.length >= 2 &&
//                       !formData.travelPreferences.includes(opt)
//                     }
//                     className="w-5 h-5 rounded-[6px] border border-[#009DE8] bg-[#009DE8] cursor-pointer disabled:opacity-50"
//                   />
//                   {opt}
//                 </label>
//               ))}
//             </div>
//           </div>

//           {/* With Pets */}
//           <div>
//             <Label className="text-[var(--color-basic-dark)] text-base sm:text-lg font-DM-sans font-normal">
//               Do you travel with pets?
//             </Label>
//             <div className="flex flex-wrap gap-3 mt-2">
//               {["Yes", "No"].map((opt) => (
//                 <label
//                   key={opt}
//                   className="flex items-center gap-2 text-sm sm:text-base text-[var(--color-basic-dark)]"
//                 >
//                   <input
//                     type="radio"
//                     name="withPets"
//                     value={opt}
//                     checked={formData.withPets === opt}
//                     onChange={() => handleRadioChange("withPets", opt)}
//                     className="w-4 h-4 accent-[var(--Info-I-600,#009DE8)] cursor-pointer"
//                   />
//                   {opt}
//                 </label>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Status & Submit */}
//         <div className="text-start">
//           <p className="text-lg">
//             Account Verification Status:
//             <span className="text-green-600 font-semibold pl-2">Verified</span>
//           </p>
//         </div>

//         {successMessage && (
//           <div className="p-4 bg-green-100 text-green-700 rounded-lg">
//             {successMessage}
//           </div>
//         )}

//         <div className="">
//           <Button
//             type="submit"
//             disabled={isSubmitting}
//             className="w-full h-14 flex py-4 px-7 justify-center items-center self-stretch rounded-lg bg-[var(--color-primary-blue)] hover:bg-[#255DA8] text-white text-lg cursor-pointer disabled:opacity-70"
//           >
//             {isSubmitting ? "Saving..." : "Save Changes"}
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ProfileForm;
