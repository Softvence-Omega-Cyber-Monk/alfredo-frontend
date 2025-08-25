import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CommonWrapper from "@/common/CommonWrapper";
import AuthenticateHeading from "@/components/reusable/AuthenticateHeading";
import { Link, useNavigate, useParams } from "react-router-dom";
import AuthButton from "@/components/reusable/AuthButton";
import time from "../assets/time.svg";
import { useDispatch, useSelector } from "react-redux";
import { verifyOtp, resendOtp } from "@/store/Slices/AuthSlice/authSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect, useState } from "react";

const verifySchema = z.object({
  otp: z.string().min(4, "OTP must be at least 4 digits"),
});

type VerifyFormInputs = z.infer<typeof verifySchema>;

const VerifyEmail = () => {
  const { userId } = useParams<{ userId: string }>(); // From /verify-otp/:userId
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyFormInputs>({
    resolver: zodResolver(verifySchema),
  });

  // Countdown timer state
  const [counter, setCounter] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // Timer effect
  useEffect(() => {
    if (counter > 0) {
      const timer = setTimeout(() => setCounter((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [counter]);

  const onSubmit = async (data: VerifyFormInputs) => {
    if (!userId) {
      console.error("No userId found");
      return;
    }

    const res = await dispatch(verifyOtp({ userId, otp: data.otp }));

    if (verifyOtp.fulfilled.match(res)) {
      navigate("/login");
    }
  };

  const handleResend = async () => {
    if (!userId) {
      console.error("No userId found");
      return;
    }

    const res = await dispatch(resendOtp({ userId, method: "email" }));

    if (resendOtp.fulfilled.match(res)) {
      console.log("OTP resent:", res.payload.message);
      setCounter(60); // Restart timer
      setCanResend(false);
    } else {
      console.error("Resend OTP failed:", res.payload);
    }
  };

  return (
    <CommonWrapper>
      <div className="flex justify-center items-center mx-auto my-[64px] max-[767px]:mt-[40px]">
        <div className="max-[767px]:w-full w-[65%]">
          <AuthenticateHeading title="Verify Your Email" />
          <p className="text-[18px] text-center text-basic-dark mt-4 mb-6">
            We've sent a verification code to your email.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-10">
            <div>
              <input
                type="text"
                placeholder="Enter OTP code"
                {...register("otp")}
                className="w-full px-4 py-3 mt-2 border border-basic-dark rounded-[8px] focus:ring-1 focus:ring-primary-blue text-center"
              />
              {errors.otp && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.otp.message}
                </p>
              )}
            </div>

            {error && <p className="text-red-500 text-center">{error}</p>}

            <AuthButton
              onClick={handleSubmit(onSubmit)}
              title={loading ? "Verifying..." : "Verify Email"}
            />
          </form>

          <div className="text-center mt-8 space-y-1">
            <div className="text-[18px] flex items-center justify-center gap-2 font-semibold text-primary-blue">
              <img src={time} alt="" />
              <span>
                {counter > 0
                  ? `00:${counter.toString().padStart(2, "0")}`
                  : "00:00"}
              </span>
            </div>

            <button
              className={`${
                canResend
                  ? "text-primary-blue hover:border-b border-primary-blue"
                  : "text-gray-400 cursor-not-allowed"
              } duration-200`}
              onClick={canResend ? handleResend : undefined}
              disabled={!canResend}
            >
              Resend Verification Code
            </button>
          </div>

          <p className="text-[18px] text-basic-dark text-center mt-16">
            Didn't receive an email? Check your spam folder or{" "}
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
