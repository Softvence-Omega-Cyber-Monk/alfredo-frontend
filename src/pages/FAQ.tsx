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
  const { t, i18n } = useTranslation("faq");
  const { t: t2 } = useTranslation("ourplan");

  const currentLanguage = i18n.language;

  return (
    <div>
      <CommonWrapper>
        <div className="mt-[150px] max-[767px]:mt-[104px] max-[767px]:text-center border-b border-[#BFD4F0] pb-3 mb-6">
          {/*  Dynamic Heading */}
          {currentLanguage === "el" ? (
            <h1 className="text-center font-Grand-Hotel text-4xl lg:text-[60px] text-primary-blue mb-2">
              Ερωτήσεις
              <span className="text-3xl lg:text-[60px] text-[#505050] text-center font-sans">
                {" "}
                σχετικά με την Vacanza
              </span>
            </h1>
          ) : (
            <ClientHeading
              headingText={t("faq.title")} // "About Vacanza"
              spanText={t("faq.highlight")} // "questions"
            />
          )}

          <p className="text-[24px] py-6 font-normal text-basic-dark max-[767px]:text-base text-center">
            {t("faq.subtitle")}
            <br className="max-[767px]:hidden" />
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
        <div>
          <ClientHeading
            headingText={t2("ourplan.title")}
            spanText={t2("ourplan.highlight")}
          />
          <p className="text-[24px] sm:text-[24px] py-6 text-center text-basic-dark max-sm:text-[16px] max-sm:leading-[24px]">
            {t2("ourplan.subtitle1")}
            <br className="hidden sm:block" />
            {t2("ourplan.subtitle2")}
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
