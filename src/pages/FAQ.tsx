import CommonWrapper from "@/common/CommonWrapper";
import AccordionComponent from "@/components/reusable/AccordionComponent";
import ClientHeading from "@/components/reusable/ClientHeading";
import ServicePlan from "@/components/reusable/ServicePlan";
import Subscribe from "@/components/reusable/Subscribe";
import Testimonial from "@/components/reusable/Testimonial";
import { aboutPrgram, aboutProfile, aboutProperties, bonus } from "@/lib/AccordionData/accordionData";

const FAQ = () => {
  return (
    <div>
      <CommonWrapper>
        <div className="mt-[64px]">
          <ClientHeading headingText="Frequently ask" spanText="questions" />
          <p className="text-[24px] font-normal text-basic-dark max-[767px]:text-sm text-center">
            Explore our most frequently asked questions to understand how home exchange works, how to get started, <br /> and how we ensure a safe and trusted travel experience for all our members.
          </p>
        </div>
        <div className="mt-[80px] mb-[140px]">
          <div className="w-full flex justify-between">
            <div className="w-1/3">
              <h4 className="text-[24px] font-semibold text-primary-blue">About Vacanza</h4>
            </div>
            <div className="w-2/3">
              <AccordionComponent items={bonus} />
            </div>
          </div>
          <div className="w-full flex justify-between my-[64px]">
            <div className="w-1/3">
              <h4 className="text-[24px] font-semibold text-primary-blue">About my profile</h4>
            </div>
            <div className="w-2/3">
              <AccordionComponent items={aboutProfile} />
            </div>
          </div>
          <div className="w-full flex justify-between">
            <div className="w-1/3">
              <h4 className="text-[24px] font-semibold text-primary-blue">About properties</h4>
            </div>
            <div className="w-2/3">
              <AccordionComponent items={aboutProperties} />
            </div>
          </div>
          <div className="w-full flex justify-between mt-[64px]">
            <div className="w-1/3">
              <h4 className="text-[24px] font-semibold text-primary-blue">About properties</h4>
            </div>
            <div className="w-2/3">
              <AccordionComponent items={aboutPrgram} />
            </div>
          </div>
        </div>
        <div>
          <ClientHeading headingText="Our" spanText="plans" />
          <p className="text-[24px] font-normal text-basic-dark max-[767px]:text-sm text-center">
            Flexible membership options designed to fit every traveler’s needs—<br />
            whether you exchange once a year or every month.
          </p>
        </div>
        <div className="mt-[80px]">
          <ServicePlan />
        </div>
      </CommonWrapper>
      <Testimonial />
      <Subscribe />
    </div>
  );
};

export default FAQ;
