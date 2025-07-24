import OnboardingWrapper from "@/common/OnboardingWrapper";
import MultiStepForm from "@/components/onboarding/MultiStepForm";

const OnboardingPage = () => {
  const background = {
    backgroundImage: 'url("/cityscape.svg")',
  };

  return (
    <div
      className=" min-h-screen bg-bottom bg-no-repeat bg-contain"
      style={background}
    >
      <div className=" bg-white/60 py-16">
        <OnboardingWrapper>
          <MultiStepForm />
        </OnboardingWrapper>
      </div>
    </div>
  );
};

export default OnboardingPage;
