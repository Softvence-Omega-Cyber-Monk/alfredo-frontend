import CommonWrapper from "@/common/CommonWrapper";
import ClientHeading from "@/components/reusable/ClientHeading";
import Conversation from "@/components/reusable/Conversation";
import Subscribe from "@/components/reusable/Subscribe";
import { FormData } from "@/types";
import { useForm } from "react-hook-form";

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
  };

  return (
    <div>
      <CommonWrapper>
        {/* top heading section */}
        <div className="my-[64px] max-[767px]:my-[32px]">
          <ClientHeading headingText="Contact" spanText="us" />
          <p className="text-[24px] not-italic font-normal text-center text-basic-dark max-[767px]:text-[18px] max-[767px]:leading-[28px]">
            Questions? We're here to help.
          </p>
        </div>

        {/* contact form section */}
        <div className="lg:flex items-center justify-between gap-10">
          {/* contact details */}
          <div className="w-full lg:w-1/2 space-y-[32px] max-[767px]:space-y-[24px]">
            <div className="space-y-[16px] max-[767px]:space-y-[10px]">
              <h4 className="text-[24px] font-semibold text-primary-blue max-[767px]:text-[20px]">
                We are here to help you:
              </h4>
              <p className="text-[24px] font-normal text-basic-dark max-[767px]:text-[16px] leading-[26px]">
                Our experts are available to answer any questions you might have. We’ve got the answers.
              </p>
            </div>
            <div className="space-y-[16px] max-[767px]:space-y-[10px]">
              <h4 className="text-[24px] font-semibold text-primary-blue max-[767px]:text-[20px]">
                Current Office:
              </h4>
              <p className="text-[24px] font-normal text-basic-dark max-[767px]:text-[16px] leading-[26px]">
                123 Green Hill Avenue, Lakeview Heights, Central District, Maplewood County, United States of America
              </p>
            </div>
            <div className="space-y-[16px] max-[767px]:space-y-[10px]">
              <h4 className="text-[24px] font-semibold text-primary-blue max-[767px]:text-[20px]">
                Office Hours
              </h4>
              <p className="text-[24px] font-normal text-basic-dark max-[767px]:text-[16px] leading-[26px]">
                Sunday – Friday (10:00Am - 07:00Pm)
              </p>
            </div>
          </div>

          {/* contact form */}
          <div className="w-full lg:w-1/2 mt-10 lg:mt-0">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-primary-gray-bg border border-primary-border-color rounded-[40px] p-10 space-y-4 max-[767px]:p-6"
            >
              <h3 className="text-primary-blue font-semibold text-[24px] mb-4 max-[767px]:text-[20px]">
                Directly mail us.
              </h3>

              {/* First & Last Name */}
              <div className="lg:flex gap-6">
                <div className="w-full lg:w-1/2 mb-4 lg:mb-0">
                  <input
                    type="text"
                    placeholder="First Name*"
                    className="w-full border border-primary-border-color py-3 px-3 rounded-[25px] text-[16px]"
                    {...register("firstName", { required: "First name is required" })}
                  />
                  {errors.firstName && (
                    <p className="text-red-600 text-sm mt-1">{errors.firstName.message}</p>
                  )}
                </div>
                <div className="w-full lg:w-1/2">
                  <input
                    type="text"
                    placeholder="Last Name*"
                    className="w-full border border-primary-border-color py-3 px-3 rounded-[25px] text-[16px]"
                    {...register("lastName", { required: "Last name is required" })}
                  />
                  {errors.lastName && (
                    <p className="text-red-600 text-sm mt-1">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              {/* Email & Phone */}
              <div className="lg:flex gap-6">
                <div className="w-full lg:w-1/2 mb-4 lg:mb-0">
                  <input
                    type="email"
                    placeholder="Enter email here*"
                    className="w-full border border-primary-border-color py-3 px-3 rounded-[25px] text-[16px]"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
                <div className="w-full lg:w-1/2">
                  <input
                    type="tel"
                    placeholder="Phone Number*"
                    className="w-full border border-primary-border-color py-3 px-3 rounded-[25px] text-[16px]"
                    {...register("phone", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^[0-9+\-\s()]*$/,
                        message: "Invalid phone number",
                      },
                    })}
                  />
                  {errors.phone && (
                    <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              {/* Message */}
              <div>
                <textarea
                  placeholder="Write a message*"
                  rows={4}
                  className="w-full border border-primary-border-color py-3 px-3 rounded-[25px] resize-none text-[16px]"
                  {...register("message", { required: "Message is required" })}
                ></textarea>
                {errors.message && (
                  <p className="text-red-600 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="text-[18px] md:text-[24px] w-full bg-primary-blue text-white font-semibold py-2 px-6 rounded-full"
              >
                Book Now
              </button>
            </form>
          </div>
        </div>

        {/* live chat support section */}
        <div className="my-[140px] max-[767px]:my-[64px]">
          <Conversation />
        </div>
      </CommonWrapper>
      <Subscribe />
    </div>
  );
};

export default Contact;
