import Banner from "../components/home/Banner";
import CommunityStats from "../components/home/CommunityStats";
import HowItWorks from "../components/home/HowItWorks";
import Discover from "../components/home/Discover";
import WhyChooseUs from "../components/home/WhyChooseUs";
import ChooseYourPlan from "../components/home/ChooseYourPlan";
import FutureList from "../components/home/FutureList";
import Testimonial from "../components/reusable/Testimonial";
import Subscribe from "../components/reusable/Subscribe";

const Home = () => {
  return (
    <>
      <Banner />
      <CommunityStats />
      <HowItWorks />
      <Discover />
      <WhyChooseUs />
      <ChooseYourPlan />
      <FutureList />
      <Testimonial />
      <Subscribe />
    </>
  );
};

export default Home;
