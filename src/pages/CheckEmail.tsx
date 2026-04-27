import CommonWrapper from "@/common/CommonWrapper";
import AuthenticateHeading from "@/components/reusable/AuthenticateHeading";
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { resendVerificationEmail } from "@/store/Slices/AuthSlice/authSlice";
import { useState } from "react";
import { toast } from "sonner";
import SupportModal from "@/components/modals/SupportModal";

const CheckEmail = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || "";
  const dispatch = useDispatch<AppDispatch>();
  const [resending, setResending] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  const handleResend = async () => {
    if (!email) return;
    setResending(true);
    try {
      const res = await dispatch(resendVerificationEmail({ email }));
      if (resendVerificationEmail.fulfilled.match(res)) {
        toast.success("Verification email resent! Please check your inbox.");
      } else {
        toast.error(
          (res.payload as string) || "Failed to resend verification email."
        );
      }
    } finally {
      setResending(false);
    }
  };

  return (
    <CommonWrapper>
      <div className="flex justify-center items-center mx-auto my-[64px] max-[767px]:mt-[40px]">
        <div className="max-[767px]:w-full w-[65%]">
          <AuthenticateHeading title="Check Your Email" />

          <div className="text-center mt-6 space-y-4">
            <div className="mx-auto w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-primary-blue"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>

            <p className="text-[18px] text-basic-dark">
              We've sent a verification link to:
            </p>
            <p className="text-[18px] font-semibold text-primary-blue">
              {email || "your email address"}
            </p>
            <p className="text-[16px] text-gray-500 mt-4">
              Click the link in the email to verify your account and get
              started with your onboarding.
            </p>
            <p className="text-[14px] text-gray-400 mt-2">
              The link is valid for 24 hours.
            </p>
          </div>

          <div className="text-center mt-10 space-y-4">
            <button
              onClick={handleResend}
              disabled={resending}
              className={`text-[16px] font-semibold cursor-pointer ${
                resending
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-primary-blue hover:border-b border-primary-blue"
              } duration-200`}
            >
              {resending ? "Sending..." : "Resend Verification Email"}
            </button>
          </div>

          <p className="text-[18px] text-basic-dark text-center mt-16">
            Already verified?{" "}
            <Link
              to="/login"
              className="text-primary-blue hover:border-b border-primary-blue duration-200"
            >
              Login here
            </Link>
          </p>

          <p className="text-[18px] text-basic-dark text-center mt-4">
            Didn't receive an email? Check your spam folder or{" "}
            <button
              onClick={() => setIsSupportModalOpen(true)}
              className="text-[#009DE8] hover:border-b border-primary-blue duration-200 font-semibold"
            >
              Contact Support
            </button>
          </p>

          <SupportModal
            isOpen={isSupportModalOpen}
            onClose={() => setIsSupportModalOpen(false)}
          />
        </div>
      </div>
    </CommonWrapper>
  );
};

export default CheckEmail;
