import OnboardingWrapper from "@/common/OnboardingWrapper";
import MultiStepForm from "@/components/onboarding/MultiStepForm";

const OnboardingPage = () => {
  return (
    <div className="mt-16">
      <OnboardingWrapper>
        <MultiStepForm />
      </OnboardingWrapper>
    </div>
  );
};

export default OnboardingPage;
