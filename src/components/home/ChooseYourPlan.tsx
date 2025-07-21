import CommonWrapper from "@/common/CommonWrapper";
import ClientHeading from "../reusable/ClientHeading";
import PrimaryButton from "../reusable/PrimaryButton";

const ChooseYourPlan = () => {
  return (
    <div
      className="py-8 lg:py-10 lg:mb-32 bg-bottom bg-repeat-x relative"
      style={{
        backgroundImage: `url('/cityscape.svg')`,
      }}
    >
      {/* Background overlay */}
      <div className="inset-0 absolute bg-[#F4F7FC] -z-10"></div>

      <CommonWrapper>
        <ClientHeading headingText="Choose Your" spanText="plan" />

        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-dark-3 font-regular text-center max-w-4xl mx-auto mb-10 px-4 pt-6">
          Select the plan that fits your needs and start your journey with
          confidence.
        </p>

        {/* Button Group */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
          <PrimaryButton
            title="Base"
            textColor="text-primary-blue"
            bgColor="bg-white"
            borderColor="border border-primary-blue"
            bgImage="/buttonHomeWhite.svg"
            className="w-full sm:w-auto px-8 py-2 text-base md:text-lg rounded-full"
          />
          <PrimaryButton
            title="Premium"
            textColor="text-white"
            bgColor="bg-primary-blue"
            borderColor=""
            className="w-full sm:w-auto px-8 py-2 text-base md:text-lg rounded-full"
          />
        </div>
      </CommonWrapper>
    </div>
  );
};

export default ChooseYourPlan;
