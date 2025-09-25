import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import AuthenticateHeading from "@/components/reusable/AuthenticateHeading";
import CommonWrapper from "@/common/CommonWrapper";
import AuthButton from "@/components/reusable/AuthButton";
import { LuEyeOff } from "react-icons/lu";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp, signupUser } from "@/store/Slices/AuthSlice/authSlice";
import { AppDispatch, RootState } from "@/store/store";
// import TermsModal from "@/components/modals/TermsModal";
// import PrivacyModal from "@/components/modals/PrivacyModal";
// import CookiePolicyModal from "@/components/modals/CookiePolicy";
import CustomModal from "@/components/modals/CustomModal";
import {
  cookieContent,
  privacyContent,
  termsContent,
} from "@/lib/data/termsAndCondition";

const signupSchema = z
  .object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Invalid email format"),
    mobile: z.string().min(10, "Mobile number must be at least 10 digits"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(/[0-9]/, "Must contain a number"),
    confirmPassword: z.string(),
    agreeToTerms: z.literal(true, {
      errorMap: () => ({ message: "You must agree to the terms." }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type SignupFormInputs = z.infer<typeof signupSchema>;

const Signup = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>({
    resolver: zodResolver(signupSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isCookieOpen, setIsCookieOpen] = useState(false);

  const onSubmit = async (data: SignupFormInputs) => {
    // Register the user
    const resultAction = await dispatch(
      signupUser({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        mobile: data.mobile,
        password: data.password,
      })
    );

    if (signupUser.fulfilled.match(resultAction)) {
      const userId = resultAction.payload.userId;
      // Send OTP
      const otpAction = await dispatch(sendOtp({ userId, method: "email" }));
      if (sendOtp.fulfilled.match(otpAction)) {
        console.log("OTP sent successfully:", otpAction.payload.message);
        // Navigate to verify OTP page with userId in URL
        navigate(`/verify-otp/${userId}`);
      } else {
        console.error("OTP sending failed:", otpAction.payload);
      }
    } else {
      console.error("Signup failed:", resultAction.payload);
    }
  };

  return (
    <CommonWrapper>
      <div className="flex items-center justify-center mx-auto my-[64px] max-[767px]:mt-[40px]">
        <div className="w-[65%] max-[767px]:w-full bg-white">
          <AuthenticateHeading title="First time here? Sign up now!" />

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
            {/* Name Fields */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full">
                <label className="text-[18px] font-semibold text-basic-dark">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="John"
                  {...register("firstName")}
                  className="w-full px-4 py-3 mt-2 border border-basic-dark rounded-[8px] focus:ring-1 focus:ring-primary-blue"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div className="w-full">
                <label className="text-[18px] font-semibold text-basic-dark">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Doe"
                  {...register("lastName")}
                  className="w-full px-4 py-3 mt-2 border border-basic-dark rounded-[8px] focus:ring-1 focus:ring-primary-blue"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email & Mobile Fields */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full">
                <label className="text-[18px] font-semibold text-basic-dark">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  {...register("email")}
                  className="w-full border border-basic-dark py-3 px-4 rounded-[8px] mt-2"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="w-full">
                <label className="text-[18px] font-semibold text-basic-dark">
                  Phone Number
                </label>
                <input
                  type="text"
                  placeholder="+000522559985"
                  {...register("mobile")}
                  className="w-full border border-basic-dark py-3 px-4 rounded-[8px] mt-2
                    [&::-webkit-outer-spin-button]:appearance-none 
                    [&::-webkit-inner-spin-button]:appearance-none 
                    [-moz-appearance:textfield]"
                />
                {errors.mobile && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.mobile.message}
                  </p>
                )}
              </div>
            </div>

            {/* Password Fields */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Password */}
              <div className="w-full">
                <label className="text-[18px] font-semibold text-basic-dark">
                  Password
                </label>
                <div className="relative mt-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    {...register("password")}
                    className="w-full px-4 py-3 border border-basic-dark rounded-[8px] focus:ring-1 focus:ring-primary-blue pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? (
                      <LuEyeOff size={20} />
                    ) : (
                      <MdOutlineRemoveRedEye size={20} />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="w-full">
                <label className="text-[18px] font-semibold text-basic-dark">
                  Confirm Password
                </label>
                <div className="relative mt-2">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="********"
                    {...register("confirmPassword")}
                    className="w-full px-4 py-3 border border-basic-dark rounded-[8px] focus:ring-1 focus:ring-primary-blue pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showConfirmPassword ? (
                      <LuEyeOff size={20} />
                    ) : (
                      <MdOutlineRemoveRedEye size={20} />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <p className="text-[16px] text-basic-dark">
              Minimum 8 characters, including 1 uppercase letter and 1 number.
            </p>

            {/* Terms Agreement */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                {...register("agreeToTerms")}
                className="mt-1 cursor-pointer"
              />
              <label className="text-[16px] text-basic-dark font-semibold">
                I agree to the{" "}
                <button
                  type="button"
                  onClick={() => setIsTermsOpen(true)}
                  className="text-primary-blue underline cursor-pointer"
                >
                  Terms of Service
                </button>
                {", "}
                <button
                  type="button"
                  onClick={() => setIsCookieOpen(true)}
                  className="text-primary-blue underline cursor-pointer"
                >
                  Cookie Policy
                </button>{" "}
                and{" "}
                <button
                  type="button"
                  onClick={() => setIsPrivacyOpen(true)}
                  className="text-primary-blue underline cursor-pointer"
                >
                  Privacy Policy
                </button>
              </label>
            </div>
            {/* Modals */}
            <CustomModal
              isOpen={isTermsOpen}
              onClose={() => setIsTermsOpen(false)}
              title="Terms of Service"
              content={termsContent}
            />
            <CustomModal
              isOpen={isPrivacyOpen}
              onClose={() => setIsPrivacyOpen(false)}
              title="Privacy Policy"
              content={privacyContent}
            />
            <CustomModal
              isOpen={isCookieOpen}
              onClose={() => setIsCookieOpen(false)}
              title="Cookie Policy"
              content={cookieContent}
            />
            {errors.agreeToTerms && (
              <p className="text-red-500 text-sm mt-1">
                {errors.agreeToTerms.message}
              </p>
            )}

            {error && <p className="text-red-500 text-center">{error}</p>}

            {/* Submit Button */}
            <AuthButton
              title={loading ? "Signing up..." : "Sign Up"}
              onClick={handleSubmit(onSubmit)}
            />
          </form>

          {/* Already have account */}
          <p className="text-[18px] text-basic-dark text-center mt-[64px]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary-blue hover:border-b border-primary-blue duration-200"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </CommonWrapper>
  );
};

export default Signup;
