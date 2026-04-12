import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { fetchUser } from "@/store/Slices/Profile/ProfileSlice";
import penIcon from "@/assets/icons/pen-icon.svg";
import { Textarea } from "@/components/ui/textarea";
import NotificationPreferences from "../reusable/NotificationPreferences";
import axios from "axios";

type AgeGroup = "AGE_18_30" | "AGE_30_50" | "AGE_50_65" | "AGE_65_PLUS";
type Gender = "MALE" | "FEMALE" | "NOT_SPECIFIED";
type Role = "WORKER" | "RETIRED" | "STUDENT" | "UNEMPLOYED";
type TravelGroup = "BY_MYSELF" | "FAMILY" | "COUPLE" | "FRIENDS";

const ProfileForm = () => {
  const { t } = useTranslation("profile");
  const dispatch = useAppDispatch();
  const { data: user, loading } = useAppSelector((state) => state.user);
  const [onboardingData, setOnboardingData] = useState<any>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    homeAddress: "",
    ageRange: "AGE_18_30" as AgeGroup,
    gender: "NOT_SPECIFIED" as Gender,
    employmentStatus: "RETIRED" as Role,
    travelType: [] as string[],
    favoriteDestinations: [] as string[],
    travelMostlyWith: "BY_MYSELF" as TravelGroup,
    isTravelWithPets: false,
    notes: "",
    photo: null as File | null,
  });

  const [preview, setPreview] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      await dispatch(fetchUser());
      await fetchOnboardingData();
      const userProfile = await fetchUserProfile();
      if (userProfile) {
        setPreview(userProfile.photo || "");
      }
    };
    loadData();
  }, [dispatch]);

  const fetchOnboardingData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://vacanzagreece.gr/api/onboarding/user",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setOnboardingData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching onboarding data:", error);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://vacanzagreece.gr/api/user/my-profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
  };

  useEffect(() => {
    if (user && onboardingData) {
      setFormData({
        fullName: user.fullName || "",
        phoneNumber: user.phoneNumber || "",
        homeAddress: onboardingData.homeAddress || "",
        ageRange: onboardingData.ageRange || "AGE_18_30",
        gender: onboardingData.gender || "NOT_SPECIFIED",
        employmentStatus: onboardingData.employmentStatus || "RETIRED",
        travelType: onboardingData.travelType || [],
        favoriteDestinations: onboardingData.favoriteDestinations || [],
        travelMostlyWith: onboardingData.travelMostlyWith || "BY_MYSELF",
        isTravelWithPets: onboardingData.isTravelWithPets || false,
        notes: onboardingData.notes || "",
        photo: null,
      });
      setPreview(user.photo || "");
    }
  }, [user, onboardingData]);

  const handleCheckboxChange = (name: string, value: string) => {
    setFormData((prev) => {
      const currentValues = prev[name as keyof typeof prev] as string[];
      const isChecked = currentValues.includes(value);

      if (isChecked) {
        return { ...prev, [name]: currentValues.filter((v) => v !== value) };
      } else {
        return { ...prev, [name]: [...currentValues, value] };
      }
    });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setFormData((prev) => ({ ...prev, photo: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    console.log("Form Data State:", formData);
    console.log("isTravelWithPets:", formData.isTravelWithPets);

    try {
      const token = localStorage.getItem("token");

      // ONE SINGLE REQUEST TO /api/user/me
      const payload = new FormData();

      // User fields
      payload.append("fullName", formData.fullName);
      payload.append("phoneNumber", formData.phoneNumber);
      if (formData.photo) {
        payload.append("photo", formData.photo);
      }

      // Onboarding fields — ALL accepted by /user/me
      payload.append("homeAddress", formData.homeAddress);
      payload.append("ageRange", formData.ageRange);
      payload.append("gender", formData.gender);
      payload.append("employmentStatus", formData.employmentStatus);

      // Arrays
      formData.travelType.forEach((type) => payload.append("travelType", type));
      formData.favoriteDestinations.forEach((dest) =>
        payload.append("favoriteDestinations", dest)
      );

      payload.append("travelMostlyWith", formData.travelMostlyWith);

      // THIS NOW WORKS PERFECTLY
      payload.append(
        "isTravelWithPets",
        formData.isTravelWithPets ? "true" : "false"
      );

      payload.append("notes", formData.notes);

      console.log("Sending full payload to /api/user/me");

      const response = await axios.patch(
        "https://vacanzagreece.gr/api/user/me",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Update successful:", response.data);

      // Refresh everything
      await dispatch(fetchUser());
      await fetchOnboardingData();

      toast.success("Profile updated successfully!");
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast.error(error.response?.data?.message || "Failed to update profile.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || !onboardingData) return <p>{t("profile.loading")}</p>;

  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-10 font-sans">
      <div className="bg-white shadow-md rounded-2xl p-6 md:p-10">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Profile Image */}
          <div className="flex flex-col items-center md:w-1/3">
            <div className="relative">
              <img
                src={preview || ""}
                className="h-48 w-48 object-cover rounded-full border-4 border-[#A0BFE8]"
                alt="Profile"
              />
              <label
                htmlFor="photoUpload"
                className="absolute bottom-3 right-3 bg-white p-2 rounded-full shadow-md cursor-pointer"
              >
                <img src={penIcon} alt="edit" className="w-6 h-6" />
              </label>
              <input
                id="photoUpload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
              />
            </div>
            {user?.achievementBadges && user.achievementBadges.length > 0 && (
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                {user.achievementBadges.map((badge) => (
                  <div
                    key={badge.id}
                    title={badge.description}
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 px-3 py-2 rounded-full shadow-sm border border-blue-300 text-sm font-medium hover:scale-105 transition-transform duration-200"
                  >
                    {badge.icon && (
                      <img
                        src={badge.icon}
                        alt={badge.displayName}
                        className="w-7 h-7 object-contain"
                      />
                    )}
                    {badge.displayName}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Profile Form */}
          <div className="flex-1">
            <h1 className="text-primary-blue font-semibold text-xl md:text-2xl border-b border-[#EAF1FA] pb-3 mb-6">
              Profile Information
            </h1>

            <div className="space-y-6">
              {/* Full Name */}
              <div>
                <Label className="mb-2 text-sm font-medium text-gray-700">
                  Full Name
                </Label>
                <Input
                  name="fullName"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      fullName: e.target.value,
                    }))
                  }
                  className="h-12 border-gray-300 rounded-lg"
                />
              </div>

              {/* Phone Number */}
              <div>
                <Label className="mb-2 text-sm font-medium text-gray-700">
                  Phone Number
                </Label>
                <div className="flex gap-2">
                  <select
                    disabled
                    className="w-24 px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed text-gray-700"
                    value="+30"
                  >
                    <option value="+30">🇬🇷 +30</option>
                  </select>
                  <Input
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        phoneNumber: e.target.value,
                      }))
                    }
                    className="flex-1 h-12 border-gray-300 rounded-lg"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>

              {/* City/Home Address */}
              <div>
                <Label className="mb-2 text-sm font-medium text-gray-700">
                  City / Home Address
                </Label>
                <Input
                  name="homeAddress"
                  value={formData.homeAddress}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      homeAddress: e.target.value,
                    }))
                  }
                  className="h-12 border-gray-300 rounded-lg"
                  placeholder="Enter your home address"
                />
              </div>

              {/* Age Range - Radio */}
              <div>
                <Label className="mb-3 text-sm font-medium text-gray-700 block">
                  Age Range
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: "AGE_18_30", label: "18-30" },
                    { value: "AGE_30_50", label: "30-50" },
                    { value: "AGE_50_65", label: "50-65" },
                    { value: "AGE_65_PLUS", label: "65+" },
                  ].map((age) => (
                    <label
                      key={age.value}
                      className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${formData.ageRange === age.value
                        ? "border-[#3174CD] bg-[#EAF1FA]"
                        : "border-gray-200 hover:border-gray-300"
                        }`}
                    >
                      <input
                        type="radio"
                        name="ageRange"
                        value={age.value}
                        checked={formData.ageRange === age.value}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            ageRange: e.target.value as AgeGroup,
                          }))
                        }
                        className="w-5 h-5 text-[#3174CD]"
                      />
                      <span className="font-medium text-gray-700">
                        {age.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Gender - Display Only (Not Editable) */}
              <div>
                <Label className="mb-3 text-sm font-medium text-gray-700 block">
                  Gender
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { value: "MALE", label: "Male" },
                    { value: "FEMALE", label: "Female" },
                    { value: "NOT_SPECIFIED", label: "Not Specified" },
                  ].map((gender) => (
                    <div
                      key={gender.value}
                      className={`flex items-center gap-3 p-4 border-2 rounded-lg transition-all ${formData.gender === gender.value
                        ? "border-[#3174CD] bg-[#EAF1FA]"
                        : "border-gray-200 bg-gray-50"
                        }`}
                    >
                      {/* Fake radio button (just for looks) */}
                      <div className="relative">
                        <div
                          className={`w-5 h-5 rounded-full border-2 ${formData.gender === gender.value
                            ? "border-[#3174CD] bg-[#3174CD]"
                            : "border-gray-300 bg-white"
                            }`}
                        >
                          {formData.gender === gender.value && (
                            <div className="absolute inset-1.5 bg-white rounded-full" />
                          )}
                        </div>
                      </div>
                      <span className="font-medium text-gray-700">
                        {gender.label}
                      </span>
                    </div>
                  ))}
                </div>
                {/* Optional: small note */}
                <p className="text-xs text-gray-500 mt-2">
                  Gender cannot be changed after registration.
                </p>
              </div>

              {/* Employment Status - Radio */}
              <div>
                <Label className="mb-3 text-sm font-medium text-gray-700 block">
                  Employment Status
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: "WORKER", label: "Worker" },
                    { value: "RETIRED", label: "Retired" },
                    { value: "STUDENT", label: "Student" },
                    { value: "UNEMPLOYED", label: "Unemployed" },
                  ].map((status) => (
                    <label
                      key={status.value}
                      className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${formData.employmentStatus === status.value
                        ? "border-[#3174CD] bg-[#EAF1FA]"
                        : "border-gray-200 hover:border-gray-300"
                        }`}
                    >
                      <input
                        type="radio"
                        name="employmentStatus"
                        value={status.value}
                        checked={formData.employmentStatus === status.value}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            employmentStatus: e.target.value as Role,
                          }))
                        }
                        className="w-5 h-5 text-[#3174CD]"
                      />
                      <span className="font-medium text-gray-700">
                        {status.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Travel Type - Checkbox */}
              <div>
                <Label className="mb-3 text-sm font-medium text-gray-700 block">
                  I travel for
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: "Business", label: "Business" },
                    { value: "Leisure", label: "Leisure" },
                    { value: "Adventure", label: "Adventure" },
                    { value: "Family", label: "Family" },
                    { value: "Solo", label: "Solo" },
                    { value: "Cultural", label: "Cultural" },
                  ].map((type) => (
                    <label
                      key={type.value}
                      className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${formData.travelType.includes(type.value)
                        ? "border-[#3174CD] bg-[#EAF1FA]"
                        : "border-gray-200 hover:border-gray-300"
                        }`}
                    >
                      <input
                        type="checkbox"
                        name="travelType"
                        value={type.value}
                        checked={formData.travelType.includes(type.value)}
                        onChange={() =>
                          handleCheckboxChange("travelType", type.value)
                        }
                        className="w-5 h-5 text-[#3174CD] rounded"
                      />
                      <span className="font-medium text-gray-700">
                        {type.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Favourite Destinations - Checkbox */}
              <div>
                <Label className="mb-3 text-sm font-medium text-gray-700 block">
                  Favourite Destinations
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: "Big Cities", label: "Big Cities" },
                    { value: "Small Cities", label: "Small Cities" },
                    { value: "Seaside", label: "Seaside" },
                    { value: "Mountain", label: "Mountain" },
                  ].map((dest) => (
                    <label
                      key={dest.value}
                      className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${formData.favoriteDestinations.includes(dest.value)
                        ? "border-[#3174CD] bg-[#EAF1FA]"
                        : "border-gray-200 hover:border-gray-300"
                        }`}
                    >
                      <input
                        type="checkbox"
                        name="favoriteDestinations"
                        value={dest.value}
                        checked={formData.favoriteDestinations.includes(
                          dest.value
                        )}
                        onChange={() =>
                          handleCheckboxChange(
                            "favoriteDestinations",
                            dest.value
                          )
                        }
                        className="w-5 h-5 text-[#3174CD] rounded"
                      />
                      <span className="font-medium text-gray-700">
                        {dest.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Travel Mostly With - Radio */}
              <div>
                <Label className="mb-3 text-sm font-medium text-gray-700 block">
                  I travel mostly with
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: "BY_MYSELF", label: "By Myself" },
                    { value: "FAMILY", label: "Family" },
                    { value: "COUPLE", label: "Couple" },
                    { value: "FRIENDS", label: "Friends" },
                  ].map((opt) => (
                    <label
                      key={opt.value}
                      className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${formData.travelMostlyWith === opt.value
                        ? "border-[#3174CD] bg-[#EAF1FA]"
                        : "border-gray-200 hover:border-gray-300"
                        }`}
                    >
                      <input
                        type="radio"
                        name="travelMostlyWith"
                        value={opt.value}
                        checked={formData.travelMostlyWith === opt.value}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            travelMostlyWith: e.target.value as TravelGroup,
                          }))
                        }
                        className="w-5 h-5 text-[#3174CD]"
                      />
                      <span className="font-medium text-gray-700">
                        {opt.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Travel with Pets - Radio */}
              <div>
                <Label className="mb-3 text-sm font-medium text-gray-700 block">
                  Traveling with pets
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  <label
                    className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${formData.isTravelWithPets === true
                      ? "border-[#3174CD] bg-[#EAF1FA]"
                      : "border-gray-200 hover:border-gray-300"
                      }`}
                  >
                    <input
                      type="radio"
                      name="isTravelWithPets"
                      value="true"
                      checked={formData.isTravelWithPets === true}
                      onChange={() =>
                        setFormData((prev) => ({
                          ...prev,
                          isTravelWithPets: true,
                        }))
                      }
                      className="w-5 h-5 text-[#3174CD]"
                    />
                    <span className="font-medium text-gray-700">Yes</span>
                  </label>
                  <label
                    className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${formData.isTravelWithPets === false
                      ? "border-[#3174CD] bg-[#EAF1FA]"
                      : "border-gray-200 hover:border-gray-300"
                      }`}
                  >
                    <input
                      type="radio"
                      name="isTravelWithPets"
                      value="false"
                      checked={formData.isTravelWithPets === false}
                      onChange={() =>
                        setFormData((prev) => ({
                          ...prev,
                          isTravelWithPets: false,
                        }))
                      }
                      className="w-5 h-5 text-[#3174CD]"
                    />
                    <span className="font-medium text-gray-700">No</span>
                  </label>
                </div>
              </div>

              {/* Notes */}
              <div>
                <Label className="mb-2 text-sm font-medium text-gray-700">
                  Notes about yourself
                </Label>
                <Textarea
                  name="notes"
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, notes: e.target.value }))
                  }
                  placeholder="Tell us about yourself..."
                  className="min-h-[120px] border-gray-300 rounded-lg"
                />
              </div>

              <h3 className="text-lg font-medium mt-8 mb-3">Notifications</h3>
              <NotificationPreferences />

              {/* Submit */}
              <div>
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full h-14 rounded-lg bg-[#3174CD] hover:bg-[#255DA8] text-white text-lg disabled:opacity-70"
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
