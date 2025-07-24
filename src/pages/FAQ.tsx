import CommonWrapper from "@/common/CommonWrapper";
import AccordionComponent from "@/components/reusable/AccordionComponent";
import ClientHeading from "@/components/reusable/ClientHeading";
import ServicePlan from "@/components/reusable/ServicePlan";
import Subscribe from "@/components/reusable/Subscribe";
import Testimonial from "@/components/reusable/Testimonial";
import {
  aboutPrgram,
  aboutProfile,
  aboutProperties,
  bonus,
} from "@/lib/AccordionData/accordionData";
import { useTranslation } from "react-i18next";

const FAQ = () => {
  const { t } = useTranslation("faq");
  return (
    <div>
      <CommonWrapper>
        <div className="mt-[64px] max-[767px]:mt-[34px] max-[767px]:text-center border-b border-[#BFD4F0] pb-3 mb-6">
          {/* <ClientHeading headingText="Frequently ask" spanText="questions" /> */}
          <ClientHeading
            headingText={t("faq.title")}
            spanText={t("faq.highlight")}
          />
          <p className="text-[24px] py-6 font-normal text-basic-dark max-[767px]:text-base text-center">
            {t("faq.subtitle")} <br className="max-[767px]:hidden" />
            {t("faq.subtitle1")}
          </p>
        </div>

        <div className="mt-[80px] max-[767px]:mb-[70px] mb-[140px] space-y-[64px] max-[767px]:space-y-[30px]">
          {/* About Vacanza */}
          <div className="w-full flex justify-between max-[767px]:flex-col max-[767px]:gap-4">
            <div className="w-1/3 max-[767px]:w-full">
              <h4 className="text-[24px] font-semibold text-primary-blue">
                {t("faq.title")}
              </h4>
            </div>
            <div className="w-2/3 max-[767px]:w-full">
              <AccordionComponent items={bonus} />
            </div>
          </div>

          {/* About My Profile */}
          <div className="w-full flex justify-between max-[767px]:flex-col max-[767px]:gap-4">
            <div className="w-1/3 max-[767px]:w-full">
              <h4 className="text-[24px] font-semibold text-primary-blue">
                {t("profile.title")}
              </h4>
            </div>
            <div className="w-2/3 max-[767px]:w-full">
              <AccordionComponent items={aboutProfile} />
            </div>
          </div>

          {/* About Properties */}
          <div className="w-full flex justify-between max-[767px]:flex-col max-[767px]:gap-4">
            <div className="w-1/3 max-[767px]:w-full">
              <h4 className="text-[24px] font-semibold text-primary-blue">
                {t("properties.title")}
              </h4>
            </div>
            <div className="w-2/3 max-[767px]:w-full">
              <AccordionComponent items={aboutProperties} />
            </div>
          </div>

          {/* About Program */}
          <div className="w-full flex justify-between max-[767px]:flex-col max-[767px]:gap-4">
            <div className="w-1/3 max-[767px]:w-full">
              <h4 className="text-[24px] font-semibold text-primary-blue">
                {t("program.title")}
              </h4>
            </div>
            <div className="w-2/3 max-[767px]:w-full">
              <AccordionComponent items={aboutPrgram} />
            </div>
          </div>
        </div>

        {/* Plans Section */}
        <div className="">
          <ClientHeading headingText="Our" spanText="plans" />
          <p className="text-[24px] font-normal text-basic-dark max-[767px]:text-base py-6 text-center">
            Flexible membership options designed to fit every traveler’s needs—
            <br className="max-[767px]:hidden" />
            whether you exchange once a year or every month.
          </p>
        </div>

        <div className="mt-[80px]">
          <ServicePlan />
        </div>
      </CommonWrapper>

      {/* Outside wrapper elements */}
      <div className="max-[767px]:my-20">
        <Testimonial />
      </div>
      <Subscribe />
    </div>
  );
};

export default FAQ;
