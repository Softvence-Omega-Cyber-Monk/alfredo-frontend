import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CommonWrapper from "@/common/CommonWrapper";
import AuthButton from "@/components/reusable/AuthButton";
import AuthenticateHeading from "@/components/reusable/AuthenticateHeading";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

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
              <div className="w-full">
                <label className="text-[18px] font-semibold text-basic-dark">
                  Set New Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="**************"
                    {...register("newPassword")}
                    className="w-full px-4 py-3 mt-2 border border-basic-dark rounded-[8px] focus:ring-1 focus:ring-primary-blue pr-12"
                  />
                  <FaRegEyeSlash
                    size={24}
                    className="absolute right-4 top-1/2 transform -translate-y-1/3 text-gray-500 text-lg cursor-pointer"
                  />
                </div>
                {errors.newPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>

              <div className="w-full">
                <label className="text-[18px] font-semibold text-basic-dark">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="**************"
                    {...register("confirmPassword")}
                    className="w-full px-4 py-3 mt-2 border border-basic-dark rounded-[8px] focus:ring-1 focus:ring-primary-blue pr-12"
                  />
                  <FaRegEyeSlash
                    size={24}
                    className="absolute right-4 top-1/2 transform -translate-y-1/3 text-gray-500 text-lg cursor-pointer"
                  />
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
