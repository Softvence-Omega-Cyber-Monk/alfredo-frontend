import CommonWrapper from "@/common/CommonWrapper";
import Conversation from "@/components/reusable/Conversation";
import Subscribe from "@/components/reusable/Subscribe";
import Testimonial from "@/components/reusable/Testimonial";
import AchievementGrid from '../components/plans/AchievementGrid';


const Test = () => {
  return (
    <div className="">
      <Subscribe />
      <div className="mt-5">
        <CommonWrapper>
          <Testimonial />
          <AchievementGrid/>
        </CommonWrapper>
      </div>
    </div>
  );
};

export default Test;
