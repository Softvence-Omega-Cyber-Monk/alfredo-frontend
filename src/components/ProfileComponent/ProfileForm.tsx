import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { fetchUser, updateUser } from "@/store/Slices/Profile/ProfileSlice";
import penIcon from "@/assets/icons/pen-icon.svg";

const ProfileForm = () => {
  const { t } = useTranslation("profile");
  const dispatch = useAppDispatch();
  const { data: user, loading } = useAppSelector((state) => state.user);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    identification: "",
    notes: "",
    photo: null as File | null,
  });

  const [preview, setPreview] = useState<string>(""); // For showing image preview
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load user from API
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  // Populate form data when user is loaded
  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        dateOfBirth: user.dateOfBirth
          ? new Date(user.dateOfBirth).toISOString().substring(0, 10) // safer
          : "",
        identification: user.identification || "",
        notes: "",
        photo: null,
      });

      setPreview(user.photo || "");
    }
  }, [user]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setFormData((prev) => ({ ...prev, photo: file }));
      setPreview(URL.createObjectURL(file)); // Show preview
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== "") {
          if (key === "dateOfBirth") {
            payload.append(
              key,
              new Date(value as string).toISOString().split("T")[0]
            );
          } else {
            payload.append(key, value as any);
          }
        }
      });

      await dispatch(updateUser(payload)).unwrap();
      await dispatch(fetchUser());
      toast.success(t("profile.saveChanges"));
    } catch (error) {
      toast.error(t("profile.saveChangesError"));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <p>{t("profile.loading")}</p>;

  console.log("RAW DOB from API:", user);

  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-10 font-sans">
      <div className="bg-white shadow-md rounded-2xl p-6 md:p-10">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Image Section */}
          <div className="flex flex-col items-center md:w-1/3">
            <div className="relative">
              <img
                src={preview || ""}
                className="h-48 w-48 object-cover rounded-full border-4 border-[#A0BFE8]"
                alt={t("profile.imageAlt")}
              />
              <label
                htmlFor="photoUpload"
                className="absolute bottom-3 right-3 bg-white p-2 rounded-full shadow-md cursor-pointer"
              >
                <img
                  src={penIcon}
                  alt={t("profile.editAlt")}
                  className="w-6 h-6"
                />
              </label>
              <input
                id="photoUpload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
              />
            </div>
          </div>

          {/* Form Section */}
          <div className="flex-1">
            <h1 className="text-primary-blue font-semibold text-xl md:text-2xl border-b border-[#EAF1FA] pb-3 mb-6">
              {t("profile.title")}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <Label className="mb-2" htmlFor="fullName">
                  {t("profile.fullName")}
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
              </div>

              {/* Email */}
              <div>
                <Label className="mb-2" htmlFor="email">
                  {t("profile.email")}
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              {/* Phone */}
              <div>
                <Label className="mb-2" htmlFor="phoneNumber">
                  {t("profile.phone")}
                </Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                />
              </div>

              {/* Date of Birth */}
              <div>
                <Label className="mb-2" htmlFor="dateOfBirth">
                  {t("profile.dob")}
                </Label>
                <Input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                />
              </div>

              {/* Identification */}
              <div>
                <Label className="mb-2" htmlFor="identification">
                  {t("profile.identificationType.label")}
                </Label>
                <Input
                  id="identification"
                  name="identification"
                  value={formData.identification}
                  onChange={handleInputChange}
                />
              </div>

              {/* Notes */}
              {/* <div>
                <Label className="mb-2" htmlFor="notes">
                  {t("profile.notesOnYourself.title")}
                </Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                />
              </div> */}

              {/* Submit */}
              <div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 flex justify-center items-center rounded-lg bg-[var(--color-primary-blue)] hover:bg-[#255DA8] text-white text-lg disabled:opacity-70"
                >
                  {isSubmitting
                    ? t("profile.saving")
                    : t("profile.saveChanges")}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
