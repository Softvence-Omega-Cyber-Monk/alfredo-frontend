import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { fetchUser } from "@/store/Slices/Profile/ProfileSlice";
import penIcon from "@/assets/icons/pen-icon.svg";
import { Textarea } from "@/components/ui/textarea";
import NotificationPreferences from "../reusable/NotificationPreferences";
import axios from "axios";
import { setCredentials } from "@/store/Slices/AuthSlice/authSlice";
import { fetchMyProperties, updateProperty } from "@/store/Slices/PropertySlice/propertySlice";

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
    address: "",
    ageRange: "AGE_18_30" as AgeGroup,
    gender: "NOT_SPECIFIED" as Gender,
    employmentStatus: "RETIRED" as Role,
    travelType: [] as string[],
    favoriteDestinations: [] as string[],
    travelMostlyWith: "BY_MYSELF" as TravelGroup,
    isTravelWithPets: false,
    notes: "",
    photoUrl: "" as string, // For selection from gallery
    coverImage: 0,
  });

  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user: authUser } = useAppSelector((state) => state.auth);
  const { myProperties } = useAppSelector((state) => state.property);

  useEffect(() => {
    const loadData = async () => {
      await dispatch(fetchUser());
      await fetchOnboardingData();
      await dispatch(fetchMyProperties());
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


  useEffect(() => {
    if (user && onboardingData) {
      setFormData({
        fullName: user.fullName || "",
        phoneNumber: user.phoneNumber || "",
        address: onboardingData.address || "",
        ageRange: onboardingData.ageRange || "AGE_18_30",
        gender: onboardingData.gender || "NOT_SPECIFIED",
        employmentStatus: onboardingData.employmentStatus || "RETIRED",
        travelType: onboardingData.travelType || [],
        favoriteDestinations: onboardingData.favoriteDestinations || [],
        travelMostlyWith: onboardingData.travelMostlyWith || "BY_MYSELF",
        isTravelWithPets: onboardingData.isTravelWithPets || false,
        notes: onboardingData.notes || "",
        photoUrl: user.photo || "",
        coverImage: 0,
      });
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
    const newFiles = e.target.files ? Array.from(e.target.files) : [];
    if (newFiles.length > 0) {
      setFiles((prev) => [...prev, ...newFiles]);
      setFormData((prev) => ({ ...prev, photoUrl: "" }));
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    if (formData.coverImage === index) {
      setFormData((prev) => ({ ...prev, coverImage: 0 }));
    } else if (formData.coverImage > index) {
      setFormData((prev) => ({ ...prev, coverImage: prev.coverImage - 1 }));
    }
  };

  const handleGallerySelect = async (url: string) => {
    const newFormData = { ...formData, photoUrl: url };
    setFormData(newFormData);
    setFiles([]); // Clear newly uploaded files if picking from gallery
    await updateUserProfile(newFormData, []);
  };

  const updateUserProfile = async (currentFormData: typeof formData, currentFiles: File[]) => {
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      let response;

      if (currentFiles.length > 0) {
        const payload = new FormData();
        payload.append("phoneNumber", currentFormData.phoneNumber);
        
        // Use the selected file as the profile photo
        payload.append("photo", currentFiles[currentFormData.coverImage]);

        payload.append("address", currentFormData.address);
        payload.append("ageRange", currentFormData.ageRange);
        payload.append("employmentStatus", currentFormData.employmentStatus);

        currentFormData.travelType.forEach((type) => payload.append("travelType", type));
        currentFormData.favoriteDestinations.forEach((dest) => payload.append("favoriteDestinations", dest));

        payload.append("travelMostlyWith", currentFormData.travelMostlyWith);
        payload.append("isTravelWithPets", String(currentFormData.isTravelWithPets));
        payload.append("notes", currentFormData.notes);

        response = await axios.patch("https://vacanzagreece.gr/api/user/me", payload, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        const jsonPayload = {
          phoneNumber: currentFormData.phoneNumber,
          address: currentFormData.address,
          ageRange: currentFormData.ageRange,
          employmentStatus: currentFormData.employmentStatus,
          travelType: currentFormData.travelType,
          favoriteDestinations: currentFormData.favoriteDestinations,
          travelMostlyWith: currentFormData.travelMostlyWith,
          isTravelWithPets: currentFormData.isTravelWithPets,
          notes: currentFormData.notes,
          photo: currentFormData.photoUrl || undefined,
        };

        response = await axios.patch("https://vacanzagreece.gr/api/user/me", jsonPayload, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      }

      if (response.data) {
        const userData = response.data.data || response.data;
        const newAuthUser = {
          ...authUser!,
          photo: userData.photo,
          fullName: userData.fullName,
        };
        
        // Update local formData with the new photo URL from server
        setFormData((prev) => ({ ...prev, photoUrl: userData.photo || "" }));
        
        dispatch(setCredentials({ user: newAuthUser, token: token! }));
        localStorage.setItem("user", JSON.stringify(newAuthUser));
      }

      // Clear pending files if any were uploaded
      if (currentFiles.length > 0) {
        // If the user has a property, upload all files to the property gallery as well
        if (myProperties.length > 0) {
          try {
            const propertyId = myProperties[0].id;
            const propertyFormData = new FormData();
            
            // To add images to gallery, we send them under 'files' key
            // We use the same structure as PropertiesGrid
            const updateData = {
              removeImages: [],
              // Keep current cover image if possible, or just add images
            };
            propertyFormData.append("data", JSON.stringify(updateData));
            currentFiles.forEach((file) => {
              propertyFormData.append("files", file);
            });

            await dispatch(updateProperty({ id: propertyId, updatedData: propertyFormData })).unwrap();
          } catch (propError) {
            console.error("Error updating property gallery:", propError);
            // Don't fail the whole operation if property update fails
          }
        }
        setFiles([]);
      }

      await dispatch(fetchUser());
      await fetchOnboardingData();
      await dispatch(fetchMyProperties());
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast.error(error.response?.data?.message || "Failed to update profile.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async () => {
    await updateUserProfile(formData, files);
  };

  if (loading || !onboardingData) return <p>{t("profile.loading")}</p>;

  return (
    <div className="w-full max-w-5xl mx-auto px-2 py-10 font-sans">
      <div className="bg-white shadow-md rounded-2xl p-6 md:p-10">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Profile Image */}
          <div className="flex flex-col items-center md:w-1/3">
            <div className="relative">
              <img
                src={files.length > 0 ? URL.createObjectURL(files[formData.coverImage]) : formData.photoUrl || "/defaultAvatar.png"}
                className="h-48 w-48 object-cover rounded-full border-4 border-[#A0BFE8]"
                alt="Profile"
              />
              <Popover>
                <PopoverTrigger asChild>
                  <div className="absolute bottom-3 right-3 bg-white p-2 rounded-full shadow-md cursor-pointer">
                    <img src={penIcon} alt="edit" className="w-6 h-6" />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-4 space-y-4 bg-white border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Change Profile Photo</h3>
                  <div className="space-y-2">
                    <label
                      htmlFor="photoUpload"
                      className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition"
                    >
                      <div className="p-2 bg-blue-50 rounded-full">
                        <svg className="w-4 h-4 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                      </div>
                      <span className="text-sm">Upload from file</span>
                    </label>

                    {/* Multiple Upload Previews */}
                    {files.length > 0 && (
                      <div className="grid grid-cols-3 gap-2 pt-2">
                        {files.map((file, index) => (
                          <div
                            key={index}
                            className={`relative aspect-square cursor-pointer rounded-lg border-2 transition-all ${formData.coverImage === index ? "border-primary-blue shadow-md" : "border-transparent"
                              }`}
                            onClick={async () => {
                              const newFormData = { ...formData, coverImage: index };
                              setFormData(newFormData);
                              await updateUserProfile(newFormData, files);
                            }}
                          >
                            <img
                              src={URL.createObjectURL(file)}
                              alt="preview"
                              className="w-full h-full object-cover rounded-md"
                            />
                            {formData.coverImage === index && (
                              <div className="absolute top-1 left-1 bg-primary-blue text-white text-[8px] px-1 py-0.5 rounded-full">
                                Cover
                              </div>
                            )}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeFile(index);
                              }}
                              className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] shadow-lg"
                            >
                              &times;
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {onboardingData?.homeImages && onboardingData.homeImages.length > 0 && (
                      <div className="pt-2">
                        <p className="text-[10px] uppercase text-gray-400 font-bold mb-2">Gallery Pictures</p>
                        <div className="grid grid-cols-3 gap-2">
                          {onboardingData.homeImages.map((img: string, idx: number) => (
                            <img
                              key={idx}
                              src={img}
                              className={`w-full h-12 object-cover rounded-md cursor-pointer border-2 hover:border-primary-blue transition ${formData.photoUrl === img ? "border-primary-blue" : "border-transparent"
                                }`}
                              onClick={() => handleGallerySelect(img)}
                              alt={`Onboarding ${idx}`}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
              <input
                id="photoUpload"
                type="file"
                accept="image/*"
                multiple
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
              {t("profile.title")}
            </h1>

            <div className="space-y-6">
              {/* Full Name */}
              <div>
                <Label className="mb-2 text-sm font-medium text-gray-700">
                  {t("profile.fullName")}
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
                  disabled
                  className="h-12 cursor-not-allowed border-gray-300 rounded-lg text-[12px] lg:text-base"
                />
              </div>

              {/* Phone Number */}
              <div>
                <Label className="mb-2 text-sm font-medium text-gray-700">
                  {t("profile.phone")}
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
                    className="flex-1 h-12 border-gray-300 text-[12px] lg:text-base rounded-lg"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>

              {/* City/Home Address */}
              <div>
                <Label className="mb-2 text-sm font-medium text-gray-700">
                  {t("profile.homeAddress")}
                </Label>
                <Input
                  name="address"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      address: e.target.value,
                    }))
                  }
                  className="h-12 border-gray-300 text-[12px] lg:text-base rounded-lg"
                  placeholder={t("profile.homeAddress")}
                />
              </div>

              {/* Age Range - Radio */}
              <div>
                <Label className="mb-3 text-sm font-medium text-gray-700 block">
                  {t("profile.ageRange")}
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
                      className={`flex items-center gap-3 p-4 text-[12px] lg:text-base border-2 rounded-lg cursor-pointer transition-all ${formData.ageRange === age.value
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
                  {t("profile.gender.title")}
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: "MALE", label: t("profile.gender.male") },
                    { value: "FEMALE", label: t("profile.gender.female") },
                    { value: "NOT_SPECIFIED", label: t("profile.gender.notSpecified") },
                  ].map((gender) => (
                    <div
                      key={gender.value}
                      className={`flex items-center gap-2 p-4 border-2 rounded-lg text-[12px] lg:text-base transition-all ${formData.gender === gender.value
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
                {/* <p className="text-xs text-gray-500 mt-2">
                  Gender cannot be changed after registration.
                </p> */}
              </div>

              {/* Employment Status - Radio */}
              <div>
                <Label className="mb-3 text-sm font-medium text-gray-700 block">
                  {t("profile.employmentStatus.title")}
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: "WORKER", label: t("profile.employmentStatus.worker") },
                    { value: "RETIRED", label: t("profile.employmentStatus.retired") },
                    { value: "STUDENT", label: t("profile.employmentStatus.student") },
                    { value: "UNEMPLOYED", label: t("profile.employmentStatus.unemployed") },
                  ].map((status) => (
                    <label
                      key={status.value}
                      className={`flex items-center gap-3 p-4 text-[12px] lg:text-base border-2 rounded-lg cursor-pointer transition-all ${formData.employmentStatus === status.value
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
                  {t("profile.iTravelFor.title")}
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: "Business", label: t("profile.iTravelFor.business") },
                    { value: "Leisure", label: t("profile.iTravelFor.leisure") },
                    { value: "Adventure", label: t("profile.iTravelFor.adventure") },
                    // { value: "Family", label: "Family" },
                    // { value: "Solo", label: "Solo" },
                    { value: "Cultural", label: t("profile.iTravelFor.cultural") },
                  ].map((type) => (
                    <label
                      key={type.value}
                      className={`flex items-center gap-3 p-4 text-[12px] lg:text-base border-2 rounded-lg cursor-pointer transition-all ${formData.travelType.includes(type.value)
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
                  {t("profile.favoriteDestinations.title")}
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: "Big Cities", label: t("profile.favoriteDestinations.bigCities") },
                    { value: "Small Cities", label: t("profile.favoriteDestinations.smallCities") },
                    { value: "Seaside", label: t("profile.favoriteDestinations.seaside") },
                    { value: "Mountain", label: t("profile.favoriteDestinations.mountains") },
                  ].map((dest) => (
                    <label
                      key={dest.value}
                      className={`flex items-center gap-3 p-4 text-[12px] lg:text-base border-2 rounded-lg cursor-pointer transition-all ${formData.favoriteDestinations.includes(dest.value)
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
                  {t("profile.iTravelMostlyWith.title")}
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: "BY_MYSELF", label: t("profile.iTravelMostlyWith.byMyself") },
                    { value: "FAMILY", label: t("profile.iTravelMostlyWith.family") },
                    { value: "COUPLE", label: t("profile.iTravelMostlyWith.couple") },
                    { value: "FRIENDS", label: t("profile.iTravelMostlyWith.friends") },
                  ].map((opt) => (
                    <label
                      key={opt.value}
                      className={`flex items-center gap-3 p-4 text-[12px] lg:text-base border-2 rounded-lg cursor-pointer transition-all ${formData.travelMostlyWith === opt.value
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
                  {t("profile.doYouTravelWithPets.title")}
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  <label
                    className={`flex items-center gap-3 p-4 text-[12px] lg:text-base border-2 rounded-lg cursor-pointer transition-all ${formData.isTravelWithPets === true
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
                    <span className="font-medium text-gray-700">{t("profile.doYouTravelWithPets.yes")}</span>
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
                    <span className="font-medium text-gray-700 text-[12px] lg:text-base">{t("profile.doYouTravelWithPets.no")}</span>
                  </label>
                </div>
              </div>

              {/* Notes */}
              <div>
                <Label className="mb-2 text-sm font-medium text-gray-700">
                  {t("profile.notesOnYourself.title")}
                </Label>
                <Textarea
                  name="notes"
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, notes: e.target.value }))
                  }
                  placeholder={t("profile.notesOnYourself.placeHolder")}
                  className="min-h-[120px] border-gray-300 rounded-lg text-[14px] lg:text-base"
                />
              </div>

              <h3 className="text-lg font-medium mt-8 mb-3">{t("profile.notifications")}</h3>
              <NotificationPreferences />

              {/* Submit */}
              <div>
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full h-14 rounded-lg cursor-pointer bg-[#3174CD] hover:bg-[#255DA8] text-white text-lg disabled:opacity-70"
                >
                  {isSubmitting ? "Saving..." : t("profile.saveChanges")}
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
