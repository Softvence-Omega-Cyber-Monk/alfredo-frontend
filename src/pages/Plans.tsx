import CommonWrapper from "@/common/CommonWrapper";
import AccordionComponent from "@/components/reusable/AccordionComponent";
import ClientHeading from "@/components/reusable/ClientHeading";
import Conversation from "@/components/reusable/Conversation";
import ServicePlan from "@/components/reusable/ServicePlan";
import Subscribe from "@/components/reusable/Subscribe";
import { bonus } from "@/lib/AccordionData/accordionData";
import { FC } from "react";

const Plans: FC = () => {

  return (
    <div>
      <CommonWrapper>
        <div className="mt-16 max-[767px]:mt-8">
          <ClientHeading headingText="our" spanText="plans" />
          <p className="text-[24px] sm:text-[24px] text-center text-basic-dark max-sm:text-[16px] max-sm:leading-[24px]">
            Flexible membership options designed to fit every traveler’s needs—
            <br className="hidden sm:block" />
            whether you exchange once a year or every month.
          </p>
        </div>

        <div className="mt-20">
          <ServicePlan />
        </div>

        <div className="lg:w-3/4 md:w-3/4 w-full mx-auto mt-[140px] max-sm:mt-[70px]">
          <AccordionComponent items={bonus} />
        </div>

        <div className="my-[150px] max-sm:my-[80px]">
          <Conversation />
        </div>
      </CommonWrapper>

      <Subscribe />
    </div>
  );
};

export default Plans;
