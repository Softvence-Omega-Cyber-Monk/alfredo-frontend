import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { verifyEmailToken } from "@/store/Slices/AuthSlice/authSlice";
import CommonWrapper from "@/common/CommonWrapper";
import AuthenticateHeading from "@/components/reusable/AuthenticateHeading";
import { Link } from "react-router-dom";

const EmailVerificationCallback = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [status, setStatus] = useState<"verifying" | "success" | "error">(
    "verifying"
  );
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setStatus("error");
        setErrorMessage("No verification token found in the URL.");
        return;
      }

      try {
        const res = await dispatch(verifyEmailToken({ token }));

        if (verifyEmailToken.fulfilled.match(res)) {
          setStatus("success");
          // Auto-navigate to onboarding after a short delay (new users always go to onboarding)
          setTimeout(() => {
            navigate("/onboarding");
          }, 2000);
        } else {
          setStatus("error");
          setErrorMessage(
            (res.payload as string) ||
              "Verification failed. The link may be expired or invalid."
          );
        }
      } catch {
        setStatus("error");
        setErrorMessage("An unexpected error occurred during verification.");
      }
    };

    verify();
  }, [token, dispatch, navigate]);

  return (
    <CommonWrapper>
      <div className="flex justify-center items-center mx-auto my-[64px] max-[767px]:mt-[40px]">
        <div className="max-[767px]:w-full w-[65%]">
          {status === "verifying" && (
            <div className="text-center">
              <AuthenticateHeading title="Verifying Your Email..." />
              <div className="mt-8 flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue"></div>
              </div>
              <p className="text-[18px] text-gray-500 mt-6">
                Please wait while we verify your email address...
              </p>
            </div>
          )}

          {status === "success" && (
            <div className="text-center">
              <AuthenticateHeading title="Email Verified!" />
              <div className="mx-auto w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mt-6 mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="text-[18px] text-basic-dark mt-4">
                Your email has been verified successfully!
              </p>
              <p className="text-[16px] text-gray-500 mt-2">
                Redirecting you to onboarding...
              </p>
            </div>
          )}

          {status === "error" && (
            <div className="text-center">
              <AuthenticateHeading title="Verification Failed" />
              <div className="mx-auto w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mt-6 mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <p className="text-[18px] text-red-500 mt-4">{errorMessage}</p>
              <p className="text-[16px] text-gray-500 mt-4">
                The verification link may have expired or already been used.
              </p>
              <div className="mt-8 space-y-4">
                <Link
                  to="/signup"
                  className="text-primary-blue hover:border-b border-primary-blue duration-200 text-[16px] font-semibold"
                >
                  Try signing up again
                </Link>
                <span className="text-gray-400 mx-3">|</span>
                <Link
                  to="/login"
                  className="text-primary-blue hover:border-b border-primary-blue duration-200 text-[16px] font-semibold"
                >
                  Login
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </CommonWrapper>
  );
};

export default EmailVerificationCallback;
