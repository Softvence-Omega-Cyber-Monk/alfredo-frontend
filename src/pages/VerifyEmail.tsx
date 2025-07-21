import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CommonWrapper from "@/common/CommonWrapper";
import AuthenticateHeading from "@/components/reusable/AuthenticateHeading";
import { Link } from "react-router-dom";
import AuthButton from "@/components/reusable/AuthButton";
import time from "../assets/time.svg";

// ✅ Zod schema
const verifySchema = z.object({
  email: z.string().email("Invalid email address"),
});

type VerifyFormInputs = z.infer<typeof verifySchema>;

const VerifyEmail = () => {
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
        <div className="max-[767px]:w-full w-[65%]">
          <AuthenticateHeading title="Verify Your Email" />
          <p className="text-[18px] text-center text-basic-dark mt-4 mb-6">
            We've sent a verification code to your email: <br /> j****e@example.com
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-10">
            {/* Email Input */}
            <div>
              <input
                type="email"
                placeholder="Type here the OTP code"
                {...register("email")}
                className="w-full px-4 py-3 mt-2 border border-basic-dark rounded-[8px] focus:ring-1 focus:ring-primary-blue text-center"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <AuthButton onClick={handleSubmit(onSubmit)} title="Verify Email" />
          </form>

          {/* Support Link */}
          <div className="text-center mt-8 space-y-1">
            <div className="text-[18px] flex items-center justify-center gap-2 font-semibold text-primary-blue text-center ">
              <img src={time} alt="" />
              <span> 00:30</span>
            </div>
            <button
              className="text-primary-blue hover:border-b border-primary-blue duration-200 cursor-pointer"
            >
              Resend Verification Code
            </button>
          </div>
          <p className="text-[18px] text-basic-dark text-center mt-16">
            Didn't receive an email? Check your spam folder or <br />
            <Link
              to="#"
              className="text-[#009DE8] hover:border-b border-primary-blue duration-200 font-semibold"
            >
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </CommonWrapper>
  );
};

export default VerifyEmail;
