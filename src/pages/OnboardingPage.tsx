
import MultiStepForm from "@/components/onboarding/MultiStepForm";
import OnboardingWrapper from '@/common/OnboardingWrapper';

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