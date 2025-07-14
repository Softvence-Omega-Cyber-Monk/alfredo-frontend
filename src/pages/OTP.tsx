import CommonWrapper from "@/common/CommonWrapper";
import AuthenticateHeading from "@/components/reusable/AuthenticateHeading";
import { Link } from "react-router-dom";

const OTP = () => {
  const mobile = "+000********985";
  const email = "j****e@example.com";

  const handleMobileClick = () => {
    console.log("Selected Mobile:", mobile);
  };

  const handleEmailClick = () => {
    console.log("Selected Email:", email);
  };

  return (
    <CommonWrapper>
      <div className="flex justify-center items-center mx-auto my-[64px]">
        <div className="w-3/4 bg-white">
          <AuthenticateHeading title="Choose OTP Delivery Method" />
          <p className="text-[18px] text-center text-basic-dark mt-4 mb-6">
            We've sent a verification link to your email:
          </p>

          <div className="space-y-6">
            {/* Mobile Button */}
            <div>
              <button
                type="button"
                onClick={handleMobileClick}
                className="w-full bg-[#F4F7FC] text-basic-dark p-3 rounded-md hover:bg-primary-blue duration-200 hover:text-white transition-all cursor-pointer"
              >
                {mobile}
              </button>
            </div>

            {/* Email Button */}
            <div>
              <button
                type="button"
                onClick={handleEmailClick}
                className="w-full bg-[#F4F7FC] text-basic-dark p-3 rounded-md hover:bg-primary-blue hover:text-white transition-all cursor-pointer duration-200"
              >
                {email}
              </button>
            </div>
          </div>

          {/* Support Link */}
          <p className="text-[16px] text-basic-dark text-center mt-8">
            Didn't receive an email? Check your spam folder or <br />
            <Link
              to="#"
              className="text-primary-blue hover:border-b border-primary-blue duration-200"
            >
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </CommonWrapper>
  );
};

export default OTP;
