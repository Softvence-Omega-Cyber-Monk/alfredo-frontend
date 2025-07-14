import CommonWrapper from "@/common/CommonWrapper";
import ClientHeading from "../reusable/ClientHeading";
import PrimaryButton from '../reusable/PrimaryButton';

const ChooseYourPlan = () => {
  return (
    <div
      className="px-4 py-8 lg:py-10 lg:mb-32 bg-bottom bg-repeat-x relative"
      style={{
        backgroundImage: `url('/cityscape.svg')`,
      }}
    >
      <div className="inset-0 absolute bg-[#F4F7FC] -z-10"></div>
      <CommonWrapper>
        <ClientHeading headingText="Choose Your" spanText="plan" />
        <p className="text-lg md:text-xl lg:text-2xl text-dark-3 font-regular text-center max-w-4xl mx-auto mb-10">
          Select the plan that fits your needs and start your journey with
          confidence.
        </p>

        <div className="mt-10 flex justify-center items-center gap-6">
            <PrimaryButton
            title="Base"
            textColor="text-primary-blue"
            bgColor="bg-white"
            borderColor="border border-primary-blue"
            bgImage="/buttonHomeWhite.svg"
            />
          <PrimaryButton
            title="Premium"
            textColor="text-white"
            bgColor="bg-primary-blue"
            borderColor=""
            className="px-8 py-3 lg:px-10 lg:py-4 text-lg md:text-xl lg:text-2xl font-semibold rounded-full"
          />
        </div>
      </CommonWrapper>
    </div>
  );
};

export default ChooseYourPlan;
