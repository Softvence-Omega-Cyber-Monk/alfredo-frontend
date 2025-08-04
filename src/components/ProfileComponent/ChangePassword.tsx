import { useState } from "react";
import MiniWrapper from "@/common/MiniWrapper";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { LuEyeOff } from "react-icons/lu";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { changePassword } from "@/store/Slices/AuthSlice/authSlice";
import { toast } from "sonner";

interface PasswordFormInputs {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PasswordFormInputs>();

  const { t } = useTranslation("settings");
  const dispatch = useAppDispatch();
  const { loading, error, successMessage } = useAppSelector(
    (state) => state.auth
  );

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const onSubmit = (data: PasswordFormInputs) => {
    if (data.newPassword !== data.confirmPassword) {
      alert("New password and confirm password do not match");
      return;
    }

    dispatch(
      changePassword({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      })
    )
      .unwrap()
      .then(() => {
        toast.success("Password changed successfully!");
        reset();
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const renderPasswordField = (
    label: string,
    name: keyof PasswordFormInputs,
    show: boolean,
    toggle: () => void
  ) => (
    <div className="w-full">
      <label className="text-[18px] font-semibold text-basic-dark">
        {label}
      </label>
      <div className="relative mt-2">
        <input
          type={show ? "text" : "password"}
          placeholder={`Enter ${label.toLowerCase()}`}
          {...register(name, { required: `${label} is required` })}
          className="w-full px-4 py-3 border border-[#808080] rounded-[8px] focus:ring-1 focus:ring-primary-blue pr-12"
        />
        <div
          className="absolute top-1/2 right-4 -translate-y-1/2 text-xl text-gray-500 cursor-pointer"
          onClick={toggle}
        >
          {show ? <LuEyeOff /> : <MdOutlineRemoveRedEye />}
        </div>
      </div>
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name]?.message}</p>
      )}
    </div>
  );

  return (
    <MiniWrapper>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <Button
            type="button"
            className="w-full text-2xl font-DM-sans flex h-14 justify-center items-center gap-2 self-stretch rounded-xl bg-[var(--Primary-P-25,#F4F7FC)] text-[var(--color-primary-blue)]"
          >
            {t("settings.password.changePassword")}
          </Button>
        </div>

        {/* Password Fields */}
        <div className="space-y-8">
          {renderPasswordField(
            t("settings.password.oldPassword"),
            "oldPassword",
            showOld,
            () => setShowOld(!showOld)
          )}
          {renderPasswordField(
            t("settings.password.newPassword"),
            "newPassword",
            showNew,
            () => setShowNew(!showNew)
          )}
          {renderPasswordField(
            t("settings.password.confirmPassword"),
            "confirmPassword",
            showConfirm,
            () => setShowConfirm(!showConfirm)
          )}
        </div>

        {/* Submit Button */}
        <div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full text-lg font-DM-sans flex h-14 justify-center items-center gap-2 self-stretch rounded-xl bg-[#E9E9E9] text-[var(--color-basic-dark)]"
          >
            {loading ? "Updating..." : t("settings.password.update")}
          </Button>
        </div>

        {/* Remember and Forgot */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-start gap-2">
            <input type="checkbox" className="mt-2 cursor-pointer" />
            <label className="text-lg text-basic-dark">
              {t("settings.password.rememberPassword")}
            </label>
          </div>
          <Link
            to="/forgot-password"
            className="text-lg text-[#009DE8] cursor-pointer"
          >
            {t("settings.password.forgotPassword")}
          </Link>
        </div>

        {/* Error / Success Messages */}
        {error && <p className="text-red-500">{error}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}
      </form>
    </MiniWrapper>
  );
};

export default ChangePassword;
