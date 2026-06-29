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
import { setCredentials } from "@/store/Slices/AuthSlice/authSlice";
import { fetchMyProperties } from "@/store/Slices/PropertySlice/propertySlice";
// import { AgeGroupLabels } from "../onboarding/VerificationProcess";
import { deleteGalleryImage, uploadGalleryImages } from "@/store/Slices/OnboardingSlice/OnboardSlice";
import axios from "axios";
import NotificationPreferences from "../reusable/NotificationPreferences";


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
  const [isPhotoPopoverOpen, setIsPhotoPopoverOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; url: string }>({
    isOpen: false,
    url: "",
  });
  const { user: authUser } = useAppSelector((state) => state.auth);
  // const { myProperties } = useAppSelector((state) => state.property);

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
        `${import.meta.env.VITE_API_URL}/onboarding/user`,
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

  const handleGallerySelect = (url: string) => {
    setFormData((prev) => ({ ...prev, photoUrl: url }));
    setFiles([]); // Clear newly uploaded files if picking from gallery
  };

  const handleChangeProfilePicture = async () => {
    setIsPhotoPopoverOpen(false);
    await updateUserProfile(formData, files);
  };

  const handleDeleteClick = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    setDeleteModal({ isOpen: true, url });
  };

  const handleDelete = async () => {
    const urlToDelete = deleteModal.url;
    if (!urlToDelete) return;

    try {
      // 1. Call the new dedicated delete API
      const resultAction = await dispatch(deleteGalleryImage(urlToDelete));

      if (deleteGalleryImage.fulfilled.match(resultAction)) {
        // 2. Clear current profile photo if it was the one deleted
        if (formData.photoUrl === urlToDelete) {
          setFormData((prev) => ({ ...prev, photoUrl: "" }));
          // Also update user profile on backend to remove the photo reference
          const token = localStorage.getItem("token");
          await axios.patch(
            `${import.meta.env.VITE_API_URL}/user/me`,
            { photo: "" },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
        }

        toast.success("Image deleted successfully!");
        // 3. Refresh data
        await fetchOnboardingData();
      } else {
        throw new Error("Failed to delete image from server");
      }
    } catch (error) {
      console.error("Error deleting gallery image:", error);
      toast.error("Failed to delete image.");
    } finally {
      setDeleteModal({ isOpen: false, url: "" });
    }
  };

  const updateUserProfile = async (currentFormData: typeof formData, currentFiles: File[]) => {
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      let response;
      let uploadedPhotoUrl = currentFormData.photoUrl;

      // 1. Upload new files to gallery FIRST so we can get the URL for the profile photo
      if (currentFiles.length > 0) {
        try {
          const uploadResult = await dispatch(uploadGalleryImages(currentFiles)).unwrap();
          // The backend returns the full updated onboarding record with ALL homeImages
          // Newly uploaded images are appended at the end
          const allImages: string[] = uploadResult?.data?.homeImages || uploadResult?.homeImages || [];
          // Extract only the newly uploaded URLs (last N items where N = files uploaded)
          const newlyUploaded = allImages.slice(-currentFiles.length);
          if (newlyUploaded.length > 0) {
            // coverImage is the index within the newly uploaded files
            const selectedIndex = Math.min(currentFormData.coverImage, newlyUploaded.length - 1);
            uploadedPhotoUrl = newlyUploaded[selectedIndex] || newlyUploaded[0];
          } else {
            throw new Error("No images returned from gallery upload");
          }
        } catch (onboardingErr) {
          console.error("Error uploading gallery images, falling back to basic upload:", onboardingErr);
          try {
            const fallbackFormData = new FormData();
            const fileToUpload = currentFiles[currentFormData.coverImage] || currentFiles[0];
            fallbackFormData.append("file", fileToUpload);
            const fallbackRes = await axios.post(
              `${import.meta.env.VITE_API_URL}/chat/upload`,
              fallbackFormData,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            uploadedPhotoUrl = fallbackRes.data.url;
          } catch (fallbackErr) {
            console.error("Fallback upload failed", fallbackErr);
            throw new Error("Failed to upload profile photo");
          }
        }
      }

      // 2. Update basic user profile (phone, address, metadata, and active photo)
      const profilePayload: Record<string, any> = {
        phoneNumber: currentFormData.phoneNumber,
        address: currentFormData.address,
        ageRange: currentFormData.ageRange,
        employmentStatus: currentFormData.employmentStatus,
        travelType: currentFormData.travelType,
        favoriteDestinations: currentFormData.favoriteDestinations,
        travelMostlyWith: currentFormData.travelMostlyWith,
        isTravelWithPets: currentFormData.isTravelWithPets,
        notes: currentFormData.notes,
      };

      // Set the photo — either from gallery selection or the newly uploaded image
      if (uploadedPhotoUrl) {
        profilePayload.photo = uploadedPhotoUrl;
      }

      response = await axios.patch(`${import.meta.env.VITE_API_URL}/user/me`, profilePayload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data) {
        const userData = response.data.data || response.data;
        const newAuthUser = {
          ...authUser!,
          photo: userData.photo,
          fullName: userData.fullName,
        };

        setFormData((prev) => ({ ...prev, photoUrl: userData.photo || "" }));
        dispatch(setCredentials({ user: newAuthUser, token: token! }));
        localStorage.setItem("user", JSON.stringify(newAuthUser));
      }

      // Clear pending files
      if (currentFiles.length > 0) {
        setFiles([]);
      }

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
              <Popover open={isPhotoPopoverOpen} onOpenChange={setIsPhotoPopoverOpen}>
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

                    {/* Profile Gallery Pictures */}
                    {onboardingData?.homeImages && onboardingData.homeImages.length > 0 && (
                      <div className="pt-2">
                        <p className="text-[10px] uppercase text-gray-400 font-bold mb-2">Gallery Pictures</p>
                        <div className="grid grid-cols-3 gap-2">
                          {onboardingData.homeImages.map((img: string, idx: number) => (
                            <div key={idx} className="relative group">
                              <img
                                src={img}
                                className={`w-full h-12 object-cover rounded-md cursor-pointer border-2 hover:border-primary-blue transition ${formData.photoUrl === img ? "border-primary-blue" : "border-transparent"
                                  }`}
                                onClick={() => handleGallerySelect(img)}
                                alt={`Profile Gallery ${idx}`}
                              />
                              <button
                                type="button"
                                onClick={(e) => handleDeleteClick(e, img)}
                                className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow-sm z-10 text-[10px]"
                                title="Delete photo"
                              >
                                &times;
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  {/* Change Profile Picture button */}
                  <Button
                    type="button"
                    onClick={handleChangeProfilePicture}
                    disabled={isSubmitting || (files.length === 0 && !formData.photoUrl)}
                    className="w-full mt-3 h-10 rounded-lg cursor-pointer bg-[#3174CD] hover:bg-[#255DA8] text-white text-sm disabled:opacity-50"
                  >
                    {isSubmitting ? "Saving..." : "Change Profile Picture"}
                  </Button>
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
      {/* Delete Confirmation Modal */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 transform transition-all animate-in fade-in zoom-in duration-200">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Photo</h3>
              <p className="text-sm text-gray-500 mb-6">
                Are you sure you want to remove this photo from your gallery? This action cannot be undone.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => setDeleteModal({ isOpen: false, url: "" })}
                className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-colors shadow-lg shadow-red-200 disabled:opacity-50"
              >
                {isSubmitting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileForm;
