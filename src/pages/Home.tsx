import Banner from "../components/home/Banner";
import CommunityStats from "../components/home/CommunityStats";
import HowItWorks from "../components/home/HowItWorks";
import Discover from "../components/home/Discover";
import WhyChooseUs from "../components/home/WhyChooseUs";
import ChooseYourPlan from "../components/home/ChooseYourPlan";
import FutureList from "../components/home/FutureList";
import Testimonial from "../components/reusable/Testimonial";
import Subscribe from "../components/reusable/Subscribe";
import Social from "@/components/reusable/Social";
import CalculatorSection from "@/components/calculator/CalculatorSection";
import CtaButton from "@/components/reusable/CtaButton/CtaButton";

const Home = () => {
  return (
    <>
      <Banner />
      <CalculatorSection isHome={true} />
      <div className="flex items-center justify-center">
        <CtaButton />
      </div>
      <HowItWorks />
      <CommunityStats />
      <Discover />
      <WhyChooseUs />
      <FutureList />
      <Testimonial />
      <ChooseYourPlan />
      <Subscribe />
      <Social />
    </>
  );
};

export default Home;
