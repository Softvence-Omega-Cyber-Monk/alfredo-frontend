import CommonWrapper from "@/common/CommonWrapper";
import ClientHeading from "../reusable/ClientHeading";
import { useTranslation } from "react-i18next";
import ServicePlan from "../reusable/ServicePlan";

const ChooseYourPlan = () => {
  const { t } = useTranslation("plan");
  return (
    <div
      className="py-8 lg:py-10 lg:mb-32 bg-bottom bg-repeat-x relative"
      style={{
        backgroundImage: `url('/cityscape.svg')`,
      }}
    >
      {/* Background overlay */}
      <div className="inset-0 absolute bg-[#F4F7FC] -z-10"></div>

      <CommonWrapper>
        <ClientHeading
          headingText={t("title")}
          spanText={t("highlight")}
          last={t("last")}
        />

        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-dark-3 font-regular text-center max-w-4xl mx-auto mb-24 px-4 pt-6">
          {t("para")}
        </p>
        <ServicePlan />
      </CommonWrapper>
    </div>
  );
};

export default ChooseYourPlan;
