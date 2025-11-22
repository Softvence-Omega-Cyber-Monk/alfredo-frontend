import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { fetchUser, updateUser } from "@/store/Slices/Profile/ProfileSlice";
import penIcon from "@/assets/icons/pen-icon.svg";
import { Textarea } from "@/components/ui/textarea";
import NotificationPreferences from "../reusable/NotificationPreferences";

const ProfileForm = () => {
  const { t } = useTranslation("profile");
  const dispatch = useAppDispatch();
  const { data: user, loading } = useAppSelector((state) => state.user);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    ageRange: "",
    gender: "",
    employmentStatus: "",
    travelMostlyWith: [] as string[],
    favoriteDestinations: [] as string[],
    travelType: [] as string[],
    isTravelWithPets: false,
    notes: "",
    photo: null as File | null,
  });

  const [preview, setPreview] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // swear word list
  const bannedWords = ["Groot", "Fine", "Good", "Nice"];

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.fullName || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        ageRange: user.onboarding?.ageRange || "",
        gender: user.onboarding?.gender || "",
        employmentStatus: user.onboarding?.employmentStatus || "",
        travelMostlyWith: user.onboarding?.travelMostlyWith
          ? [user.onboarding.travelMostlyWith]
          : [],
        favoriteDestinations: user.onboarding?.favoriteDestinations || [],
        travelType: user.onboarding?.travelType || [],
        isTravelWithPets: user.onboarding?.isTravelWithPets || false,
        notes: user.onboarding?.notes || "",
      }));
      setPreview(user.photo || "");
    }
  }, [user]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    // For checkbox inputs, we need to assert the type to HTMLInputElement
    if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      const checked = target.checked;

      setFormData((prev) => {
        const currentValues = prev[name as keyof typeof prev] as string[];
        if (checked) {
          // for "travelMostlyWith" allow max 2 choices
          if (name === "travelMostlyWith" && currentValues.length >= 2)
            return prev; // ignore if already 2
          return { ...prev, [name]: [...currentValues, value] };
        } else {
          return { ...prev, [name]: currentValues.filter((v) => v !== value) };
        }
      });
    } else if (type === "radio") {
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setFormData((prev) => ({ ...prev, photo: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const containsBannedWord = (text: string) => {
    return bannedWords.some((word) => text.toLowerCase().includes(word));
  };

  const isFormComplete = () => {
    const {
      fullName,
      email,
      ageRange,
      gender,
      employmentStatus,
      travelMostlyWith,
      favoriteDestinations,
      travelType,
      notes,
    } = formData;
    return (
      fullName &&
      email &&
      ageRange &&
      gender &&
      employmentStatus &&
      travelMostlyWith.length > 0 &&
      favoriteDestinations.length > 0 &&
      travelType.length > 0 &&
      notes.trim() !== ""
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (containsBannedWord(formData.notes)) {
      toast.error("Please remove inappropriate words from notes.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          payload.append(key, JSON.stringify(value));
        } else if (typeof value === "boolean") {
          payload.append(key, value ? "true" : "false");
        } else if (value !== null && value !== "") {
          payload.append(key, value as any);
        }
      });

      if (isFormComplete()) {
        payload.append("verified", "true"); // unlock verified badge
      }

      await dispatch(updateUser(payload)).unwrap();
      await dispatch(fetchUser());

      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Error updating profile.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <p>{t("profile.loading")}</p>;

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
                    )}{" "}
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

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic info */}
              <div>
                <Label className="mb-2">Full Name</Label>
                <Input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label className="mb-2">Email</Label>
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label className="mb-2">Phone Number</Label>
                <Input
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                />
              </div>

              {/* Age */}
              <div>
                <Label className="mb-2">Age Range</Label>
                <div className="flex flex-wrap gap-3">
                  {["AGE_18_30", "AGE_30_50", "AGE_50_65", "AGE_65_PLUS"].map(
                    (age) => (
                      <label key={age} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="ageRange"
                          value={age}
                          checked={formData.ageRange === age}
                          onChange={handleInputChange}
                        />
                        {age === "AGE_65_PLUS"
                          ? "65+"
                          : age.replace("AGE_", "").replace("_", "-")}
                      </label>
                    )
                  )}
                </div>
              </div>

              {/* Gender */}
              <div>
                <Label className="mb-2">Gender</Label>
                <div className="flex gap-3">
                  {["MALE", "FEMALE", "NOT_SPECIFIED"].map((g) => (
                    <label key={g} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="gender"
                        value={g}
                        checked={formData.gender === g}
                        onChange={handleInputChange}
                      />
                      {g === "NOT_SPECIFIED"
                        ? "Not specified"
                        : g.toLowerCase()}
                    </label>
                  ))}
                </div>
              </div>

              {/* Employment */}
              <div>
                <Label className="mb-2">I am a</Label>
                <div className="flex gap-3 flex-wrap">
                  {["WORKER", "RETIRED", "STUDENT", "UNEMPLOYED"].map(
                    (status) => (
                      <label key={status} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="employmentStatus"
                          value={status}
                          checked={formData.employmentStatus === status}
                          onChange={handleInputChange}
                        />
                        {status.toLowerCase()}
                      </label>
                    )
                  )}
                </div>
              </div>

              {/* Travel mostly with */}
              <div>
                <Label className="mb-2">I travel mostly with (max 2)</Label>
                <div className="flex gap-3 flex-wrap">
                  {["MYSELF", "FAMILY", "COUPLE", "FRIENDS"].map((opt) => (
                    <label key={opt} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="travelMostlyWith"
                        value={opt}
                        checked={formData.travelMostlyWith.includes(opt)}
                        onChange={handleInputChange}
                      />
                      {opt.toLowerCase()}
                    </label>
                  ))}
                </div>
              </div>

              {/* Favourite destinations */}
              <div>
                <Label className="mb-2">Favourite destinations</Label>
                <div className="flex gap-3 flex-wrap">
                  {["BIG_CITIES", "SMALL_CITIES", "SEASIDE", "MOUNTAIN"].map(
                    (dest) => (
                      <label key={dest} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="favoriteDestinations"
                          value={dest}
                          checked={formData.favoriteDestinations.includes(dest)}
                          onChange={handleInputChange}
                        />
                        {dest.replace("_", " ").toLowerCase()}
                      </label>
                    )
                  )}
                </div>
              </div>

              {/* Travel type */}
              <div>
                <Label className="mb-2">I travel for</Label>
                <div className="flex gap-3 flex-wrap">
                  {["RELAX", "ADVENTURE", "WORK"].map((type) => (
                    <label key={type} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="travelType"
                        value={type}
                        checked={formData.travelType.includes(type)}
                        onChange={handleInputChange}
                      />
                      {type.toLowerCase()}
                    </label>
                  ))}
                </div>
              </div>

              {/* Travel with pets */}
              <div>
                <Label className="mb-2">Traveling with pets</Label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
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
                    />
                    Yes
                  </label>
                  <label className="flex items-center gap-2">
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
                    />
                    No
                  </label>
                </div>
              </div>

              {/* Notes */}
              <div>
                <Label className="mb-2">Notes about yourself</Label>
                <Textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Tell us about yourself..."
                />
              </div>

              <h3 className="text-lg font-medium mt-8 mb-3">Notifications</h3>
              <NotificationPreferences />

              {/* Submit */}
              <div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 rounded-lg bg-[var(--color-primary-blue)] hover:bg-[#255DA8] text-white text-lg disabled:opacity-70"
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>

            {isFormComplete() && (
              <p className="text-green-600 text-sm mt-3">
                🎉 100% completed — Verified badge unlocked!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
