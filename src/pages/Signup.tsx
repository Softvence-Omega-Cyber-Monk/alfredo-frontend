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
import { signupUser, setCredentials } from "@/store/Slices/AuthSlice/authSlice";
// import { sendOtp } from "@/store/Slices/AuthSlice/authSlice"; // OLD OTP FLOW
import { AppDispatch, RootState } from "@/store/store";
import CustomModal from "@/components/modals/CustomModal";
import {
  cookieContent,
  privacyContent,
  termsContent,
} from "@/lib/data/termsAndCondition";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider, facebookProvider } from "@/lib/firebase";

const signupSchema = z
  .object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Invalid email format"),
    phoneNumber: z.string().min(10, "Mobile number must be at least 10 digits"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(/[0-9]/, "Must contain a number"),
    confirmPassword: z.string(),
    referralCode: z.string().optional(),
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
  const { t } = useTranslation("auth");

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
        phoneNumber: data.phoneNumber,
        password: data.password,
        referralCode: data.referralCode,
      })
    );

    if (signupUser.fulfilled.match(resultAction)) {
      // New flow: verification link is sent automatically by the backend
      toast.success(
        "Registration successful! A verification link has been sent to your email. Please check your inbox."
      );
      // Navigate to a check-email info page
      navigate(`/check-email?email=${encodeURIComponent(data.email)}`);

      // --- OLD OTP FLOW (commented out for future use) ---
      // const userId = resultAction.payload.userId;
      // // Send OTP
      // const otpAction = await dispatch(sendOtp({ userId, method: "email" }));
      // if (sendOtp.fulfilled.match(otpAction)) {
      //   toast("OTP sent successfully to your email. Please check your email.");
      //   // Navigate to verify OTP page with userId in URL
      //   navigate(`/verify-otp/${userId}`);
      // } else {
      //   console.error("OTP sending failed:", otpAction.payload);
      // }
    } else {
      console.error("Signup failed:", resultAction.payload);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      const user = result.user;

      // 🔑 Get Firebase ID Token
      const idToken = await user.getIdToken();

      // Send token to backend
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/google`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ idToken }),
        }
      );

      const data = await response.json();

      if (data.success) {
        // Store user and token just like regular login
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.accessToken);

        const formattedUser = {
          ...data.user,
          firstName: data.user.fullName.split(" ")[0] || "",
          lastName: data.user.fullName.split(" ").slice(1).join(" ") || "",
        };

        dispatch(
          setCredentials({
            user: formattedUser,
            token: data.accessToken,
          })
        );

        if (!data.user.hasOnboarded) {
          navigate("/onboarding");
        } else {
          navigate("/dashboard");
        }
      }
    } catch (error) {
      console.error("Google login error::", error);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;
      const idToken = await user.getIdToken();

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/facebook`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ idToken }),
        }
      );

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.accessToken);

        const formattedUser = {
          ...data.user,
          firstName: data.user.fullName.split(" ")[0] || "",
          lastName: data.user.fullName.split(" ").slice(1).join(" ") || "",
        };

        dispatch(
          setCredentials({
            user: formattedUser,
            token: data.accessToken,
          })
        );

        if (!data.user.hasOnboarded) {
          navigate("/onboarding");
        } else {
          navigate("/dashboard");
        }
      }
    } catch (error) {
      console.error("Facebook login error::", error);
    }
  };


  return (
    <CommonWrapper>
      <div className="flex items-center justify-center mx-auto my-[64px] max-[767px]:mt-[40px]">
        <div className="w-[65%] max-[767px]:w-full bg-white">
          <AuthenticateHeading title={t("auth.signup.title")} />

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
            {/* Name Fields */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full">
                <label className="text-[18px] font-semibold text-basic-dark">
                  {t("auth.signup.firstName")} <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder={t("auth.signup.firstName")}
                  {...register("firstName")}
                  autoComplete="given-name"
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
                  {t("auth.signup.lastName")} <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder={t("auth.signup.lastName")}
                  {...register("lastName")}
                  autoComplete="family-name"
                  className="w-full px-4 py-3 mt-2 border border-basic-dark rounded-[8px] focus:ring-1 focus:ring-primary-blue"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email Fields */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full">
                <label className="text-[18px] font-semibold text-basic-dark">
                  {t("auth.signup.emailAddress")} <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  placeholder={t("auth.signup.emailAddress")}
                  {...register("email")}
                  autoComplete="email"
                  className="w-full border border-basic-dark py-3 px-4 rounded-[8px] mt-2"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full">
                <label className="text-[18px] font-semibold text-basic-dark">
                  {t("auth.signup.phoneNumber")} <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder={t("auth.signup.phoneNumber")}
                  {...register("phoneNumber")}
                  autoComplete="tel"
                  className="w-full border border-basic-dark py-3 px-4 rounded-[8px] mt-2
                    [&::-webkit-outer-spin-button]:appearance-none 
                    [&::-webkit-inner-spin-button]:appearance-none 
                    [-moz-appearance:textfield]"
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>
              {/* <div className="w-full">
                <label className="text-[18px] font-semibold text-basic-dark">
                  {t("auth.signup.referralCode")}
                </label>
                <input
                  type="text"
                  placeholder={t("auth.signup.referralCode")}
                  {...register("referralCode")}
                  className="w-full border border-basic-dark py-3 px-4 rounded-[8px] mt-2
                    [&::-webkit-outer-spin-button]:appearance-none 
                    [&::-webkit-inner-spin-button]:appearance-none 
                    [-moz-appearance:textfield]"
                />
                {errors.referralCode && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.referralCode.message}
                  </p>
                )}
              </div> */}
            </div>

            {/* Password Fields */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Password */}
              <div className="w-full">
                <label className="text-[18px] font-semibold text-basic-dark">
                  {t("auth.signup.password")} <span className="text-red-400">*</span>
                </label>
                <div className="relative mt-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder={t("auth.signup.password")}
                    {...register("password")}
                    autoComplete="new-password"
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
                  {t("auth.signup.confirmPassword")} <span className="text-red-400">*</span>
                </label>
                <div className="relative mt-2">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder={t("auth.signup.confirmPassword")}
                    {...register("confirmPassword")}
                    autoComplete="new-password"
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
              {t("auth.signup.passwordRequirement")}
            </p>

            {/* Terms Agreement */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                {...register("agreeToTerms")}
                className="mt-1 cursor-pointer"
              />
              <label className="text-[16px] text-basic-dark font-semibold">
                {t("auth.signup.agreeText").split("terms of service")[0]}
                <button
                  type="button"
                  onClick={() => setIsTermsOpen(true)}
                  className="text-primary-blue underline cursor-pointer"
                >
                  {t("auth.signup.agreeText").includes("terms of service")
                    ? "Terms of Service"
                    : "Όρους Παροχής Υπηρεσιών"}
                </button>
                {t("auth.signup.agreeText").includes("cookie policy")
                  ? ", "
                  : " "}
                <button
                  type="button"
                  onClick={() => setIsCookieOpen(true)}
                  className="text-primary-blue underline cursor-pointer"
                >
                  {t("auth.signup.agreeText").includes("cookie policy")
                    ? "Cookie Policy"
                    : "Πολιτική Cookies"}
                </button>
                {t("auth.signup.agreeText").includes("and") ? " and " : " και "}
                <button
                  type="button"
                  onClick={() => setIsPrivacyOpen(true)}
                  className="text-primary-blue underline cursor-pointer"
                >
                  {t("auth.signup.agreeText").includes("privacy policy")
                    ? "Privacy Policy"
                    : "Πολιτική Απορρήτου"}
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
              title={
                loading
                  ? t("auth.signup.submit") + "..."
                  : t("auth.signup.submit")
              }
              onClick={handleSubmit(onSubmit)}
            />
            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-[1px] bg-gray-300"></div>
              <span className="text-sm text-gray-500 font-medium">OR</span>
              <div className="flex-1 h-[1px] bg-gray-300"></div>
            </div>

            {/* Google Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center cursor-pointer justify-center gap-3 border border-gray-300 py-3 rounded-[8px] bg-white hover:bg-gray-50 transition duration-200 font-semibold text-basic-dark shadow-sm"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              {t("auth.continueWithGoogle")}
            </button>

            <button
              type="button"
              onClick={handleFacebookLogin}
              className="w-full mt-4 flex items-center cursor-pointer justify-center gap-3 border border-gray-300 py-3 rounded-[8px] bg-white hover:bg-gray-50 transition duration-200 font-semibold text-basic-dark shadow-sm"
            >
              <img
                src="https://www.svgrepo.com/show/475647/facebook-color.svg"
                alt="Facebook"
                className="w-5 h-5"
              />
              {t("auth.continueWithFacebook")}
            </button>

          </form>

          {/* Already have account */}
          <p className="text-[18px] text-basic-dark text-center mt-[64px]">
            {t("auth.signup.alreadyHaveAccount")}{" "}
            <Link
              to="/login"
              className="text-primary-blue hover:border-b border-primary-blue duration-200"
            >
              {t("auth.signup.login")}
            </Link>
          </p>
        </div>
      </div>
    </CommonWrapper>
  );
};

export default Signup;
