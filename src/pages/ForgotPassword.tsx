import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CommonWrapper from "@/common/CommonWrapper";
import AuthenticateHeading from "@/components/reusable/AuthenticateHeading";
import { Link } from "react-router-dom";
import AuthButton from "@/components/reusable/AuthButton";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "@/store/Slices/AuthSlice/authSlice";
import { AppDispatch, RootState } from "@/store/store";

const verifySchema = z.object({
  email: z.string().email("Invalid email address"),
});

type VerifyFormInputs = z.infer<typeof verifySchema>;

const ForgotPassword = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, successMessage } = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<VerifyFormInputs>({
    resolver: zodResolver(verifySchema),
  });

  const onSubmit = async (data: VerifyFormInputs) => {
    const res = await dispatch(forgotPassword({ email: data.email }));
    if (forgotPassword.fulfilled.match(res)) {
      reset();
    }
  };

  return (
    <CommonWrapper>
      <div className="flex justify-center items-center mx-auto my-[64px] max-[767px]:mt-[40px]">
        <div className="w-[65%] max-[767px]:w-full bg-white">
          <AuthenticateHeading title="Forgot your password?" />
          <p className="text-[18px] text-center text-basic-dark mt-4 mb-6">
            Enter your email address below and we'll send <br />
            you a link to reset your password.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-16">
            {/* Email Input */}
            <div>
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
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {error && <p className="text-red-500 text-center">{error}</p>}
            {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}

            {/* Submit Button */}
            <AuthButton
              onClick={handleSubmit(onSubmit)}
              title={loading ? "Sending..." : "Send Reset Link"}
            />
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

export default ForgotPassword;
