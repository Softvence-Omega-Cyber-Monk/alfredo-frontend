import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import CommonWrapper from "@/common/CommonWrapper";
import AuthenticateHeading from "@/components/reusable/AuthenticateHeading";
import SocialAuthButton from "@/components/reusable/SocialAuthButton";
import AuthButton from "@/components/reusable/AuthButton";
import { FaRegEyeSlash } from "react-icons/fa";

// ✅ Login schema (no agreeToTerms here)
const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();

  const onSubmit = (data: LoginFormInputs) => {
    console.log("Login Data:", data);
    navigate("/");
  };

  return (
    <CommonWrapper>
      <div className="flex items-center justify-center mt-16 max-[767px]:mt-[40px]">
        <div className="w-[65%] max-[767px]:w-full bg-white">
          <AuthenticateHeading title="Login now !" />

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
            {/* Email Field */}
            <div>
              <label className="text-[18px] font-semibold text-basic-dark">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                {...register("email")}
                className="w-full px-4 py-3 mt-2 border border-basic-dark rounded-[8px] focus:ring-1 focus:ring-primary-blue"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="w-full">
              <label className="text-[18px] font-semibold text-basic-dark">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="**************"
                  {...register("password")}
                  className="w-full px-4 py-3 mt-2 border border-basic-dark rounded-[8px] focus:ring-1 focus:ring-primary-blue pr-12"
                />
                <FaRegEyeSlash size={24} className="absolute right-4 top-1/2 transform -translate-y-1/3 text-gray-500 text-lg cursor-pointer" />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>


            {/* Remember Password & Forgot */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  className="mt-1 cursor-pointer"
                />
                <label className="text-[16px] text-basic-dark font-semibold">
                  Remember Password
                </label>
              </div>
              <p className="text-[16px] text-basic-dark font-semibold cursor-pointer hover:underline">
                Forgot Password?
              </p>
            </div>

            {/* Submit Button */}
            <AuthButton title="Log In" onClick={handleSubmit(onSubmit)} />
          </form>

          {/* Divider and Social */}
          <div>
            <div className="flex items-center gap-4 mt-[64px] mb-[32px]">
              <div className="flex-1 h-px bg-basic-dark" />
              <p className="text-[18px] font-semibold text-basic-dark whitespace-nowrap">
                Or Continue With
              </p>
              <div className="flex-1 h-px bg-basic-dark" />
            </div>

            <SocialAuthButton />
            <p className="text-[18px] text-basic-dark text-center mt-[64px]">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="text-[#009DE8] hover:border-b border-primary-blue duration-200"
              >
                Sign up
              </Link>
            </p>
            <p className="text-[16px] text-basic-dark text-center mt-4">
              By using SecureLogin you agree to the Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </CommonWrapper>
  );
};

export default Login;
