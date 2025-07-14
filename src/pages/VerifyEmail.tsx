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
  number: z
    .string()
    .min(4, "OTP must be at least 4 digits")
    .regex(/^\d+$/, "OTP must contain only numbers"),
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
        <div className="w-[65%] max-[767px]:w-full bg-white">
          <AuthenticateHeading title="Verify Your Email" />
          <p className="text-[18px] text-center text-basic-dark mt-4 mb-6">
            We've sent a verification code to your email: <br /> j****e@example.com
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-10">
            {/* OTP Input */}
            <div>
              <input
                type="number"
                placeholder="Type here the OTP code"
                {...register("number")}
                className="w-full border border-basic-dark py-3 px-4 rounded-[8px] mt-2 text-center
                  [&::-webkit-outer-spin-button]:appearance-none 
                  [&::-webkit-inner-spin-button]:appearance-none 
                  [-moz-appearance:textfield]"
              />
              {errors.number && (
                <p className="text-red-500 text-sm mt-1">{errors.number.message}</p>
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
              className="text-primary-blue hover:text-[#009DE8] duration-200 cursor-pointer text-[18px] font-semibold"
            >
              Resend Verification Code
            </button>
          </div>
          <p className="text-[18px] text-basic-dark text-center mt-16">
            Didn't receive an email? Check your spam folder or <br />
            <Link
              to="#"
              className="text-[#009DE8] hover:text-primary-blue duration-200 font-semibold"
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
