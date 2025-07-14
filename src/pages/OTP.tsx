import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CommonWrapper from "@/common/CommonWrapper";
import AuthenticateHeading from "@/components/reusable/AuthenticateHeading";
import { Link } from "react-router-dom";

const otpSchema = z.object({
  mobile: z.string().min(10, "Mobile number is required"),
  email: z.string().email("Invalid email address"),
});

type OtpFormInputs = z.infer<typeof otpSchema>;

const OTP = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpFormInputs>({
    resolver: zodResolver(otpSchema),
  });

  const onSubmit = (data: OtpFormInputs) => {
    console.log("OTP Data:", data);
  };

  return (
    <CommonWrapper>
      <div className="flex justify-center items-center mx-auto my-[64px]">
        <div className="w-3/4 bg-white">
          <AuthenticateHeading title="Choose OTP Delivery Method" />
          <p className="text-[18px] text-center text-basic-dark mt-4 mb-6">
            We've sent a verification link to your email:
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Mobile Input */}
            <div>
              <input
                type="tel"
                placeholder="+000********985"
                {...register("mobile")}
                className="w-full px-4 py-3 bg-[#F4F7FC] rounded-[8px] text-center"
              />
              {errors.mobile && (
                <p className="text-red-500 text-sm mt-1">{errors.mobile.message}</p>
              )}
            </div>

            {/* Email Input */}
            <div>
              <input
                type="email"
                placeholder="j****e@example.com"
                {...register("email")}
                className="w-full bg-[#3174CD] text-white p-3 rounded-md placeholder-white text-center"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
          </form>

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
