import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CommonWrapper from "@/common/CommonWrapper";
import AuthButton from "@/components/reusable/AuthButton";
import AuthenticateHeading from "@/components/reusable/AuthenticateHeading";
import { Link } from "react-router-dom";
import { LuEyeOff } from "react-icons/lu";
import { MdOutlineRemoveRedEye } from "react-icons/md";

// ✅ Zod validation schema
const verifySchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain an uppercase letter")
      .regex(/[0-9]/, "Must contain a number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type VerifyFormInputs = z.infer<typeof verifySchema>;

const SetNewPassword = () => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyFormInputs>({
    resolver: zodResolver(verifySchema),
  });

  const onSubmit = (data: VerifyFormInputs) => {
    console.log("Verify Email Data:", data);
  };

  return (
    <CommonWrapper>
      <div className="flex justify-center items-center mx-auto my-[64px] max-[767px]:mt-[40px]">
        <div className="w-[65%] max-[767px]:w-full bg-white">
          <AuthenticateHeading title="Set New Password" />
          <p className="text-[18px] text-center text-basic-dark mt-4 mb-6">
            Enter your email address below and we'll send <br />
            you a link to set your new password.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-16">
            {/* Password Fields */}
            <div className="space-y-6">
              {/* New Password */}
              <div className="w-full">
                <label className="text-[18px] font-semibold text-basic-dark">
                  Set New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="**************"
                    {...register("newPassword")}
                    className="w-full border border-basic-dark py-3 px-4 rounded-[8px] mt-2 pr-12"
                  />
                  <div
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg cursor-pointer"
                    onClick={() => setShowNewPassword((prev) => !prev)}
                  >
                    {showNewPassword ? <LuEyeOff size={22} /> : <MdOutlineRemoveRedEye size={22} />}
                  </div>
                </div>
                {errors.newPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="w-full">
                <label className="text-[18px] font-semibold text-basic-dark">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="**************"
                    {...register("confirmPassword")}
                    className="w-full border border-basic-dark py-3 px-4 rounded-[8px] mt-2 pr-12"
                  />
                  <div
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg cursor-pointer"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                  >
                    {showConfirmPassword ? (
                      <LuEyeOff size={22} />
                    ) : (
                      <MdOutlineRemoveRedEye size={22} />
                    )}
                  </div>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <AuthButton onClick={handleSubmit(onSubmit)} title="Set New Password" />
          </form>

          {/* Support Link */}
          <p className="text-[18px] text-basic-dark text-center mt-[64px]">
            Remember your password?{" "}
            <Link
              to="/login"
              className="text-[#009DE8] hover:border-b border-primary-blue duration-200"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </CommonWrapper>
  );
};

export default SetNewPassword;
