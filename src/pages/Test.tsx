import CommonWrapper from "@/common/CommonWrapper";
import Conversation from "@/components/reusable/Conversation";
import Subscribe from "@/components/reusable/Subscribe";
import Testimonial from "@/components/reusable/Testimonial";

const Test = () => {
  return (
    <div className="">
      <Subscribe />
      <div className="mt-5">
        <CommonWrapper>
          <Testimonial />
        </CommonWrapper>
      </div>
    </div>
  );
};

export default Test;
