import OnboardingWrapper from "@/common/OnboardingWrapper";
import GetStarted from "@/components/onboarding/GetStarted";
import HomeAvailability from "@/components/onboarding/HomeAvailability";
import MultiStepForm from "@/components/onboarding/MultiStepForm";
import SelectType from "@/components/onboarding/SelectType";
import VerificationProcess from "@/components/onboarding/VerificationProcess";

const OnboardingPage = () => {
  return (
    <OnboardingWrapper>
      <MultiStepForm />
      <GetStarted />
      <VerificationProcess />
      <SelectType />
      <HomeAvailability />
    </OnboardingWrapper>
  );
};

export default OnboardingPage;
