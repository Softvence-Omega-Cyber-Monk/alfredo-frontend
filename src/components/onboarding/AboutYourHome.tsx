import { TbChecklist } from "react-icons/tb";
import { Button } from "../ui/button";
import Title from "./Shared/Title";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { useTranslation } from "react-i18next";

interface AboutYourHomeProps {
  homeName: string;
  homeDescription: string;
  areaDescription: string;
  availabilityType: "home" | "apartment" | null;
  onDataChange: (updates: {
    homeName?: string;
    homeDescription?: string;
    areaDescription?: string;
  }) => void;
}

const AboutYourHome = ({
  homeName,
  homeDescription,
  areaDescription,
  onDataChange,
}: AboutYourHomeProps) => {
  const { t } = useTranslation("onboarding");
  return (
    <div className="w-full py-6 md:py-10 space-y-6 ">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-center mb-10 w-full gap-4">
        <div className="w-full lg:w-auto flex-1">
          <Title title={t("onboarding.part5.headTitle")} />
        </div>
        <div className="w-full lg:w-auto flex justify-center md:justify-end">
          <Button
            variant="secondary"
            className="flex items-center gap-2 px-5 py-3 rounded-lg border border-[#CAD2DB] text-[#3174CD] text-base font-medium hover:bg-gray-100"
          >
            {t("onboarding.part5.headButton")}
            <TbChecklist className="w-5 h-5" />
          </Button>
        </div>
      </div>
      <hr className="text-[#EAF1FA]" />
      {/* Home Name */}
      <div>
        <div>
          <h3 className="text-lg text-primary-blue font-semibold ">
            {t("onboarding.part5.title1")}
          </h3>
          <p className="text-base text-dark-3 font-regular mt-3 ">
            {t("onboarding.part5.subtitle1")}
          </p>

          <Input
            name="text"
            value={homeName}
            onChange={(e) => onDataChange({ homeName: e.target.value })}
            placeholder={t("onboarding.part5.subtitle1p")}
            className="  px-4 py-3 h-auto items-center gap-2 text-sm rounded-lg border border-dark-3 bg-white/5 backdrop-blur-sm placeholder:text-gray-500 focus:outline-none focus:ring-transparent  mt-4"
          />
        </div>

        <div className="mt-10">
          <h3 className="text-lg text-primary-blue font-semibold ">
            {t("onboarding.part5.title2")}
          </h3>
          <p className="text-base text-dark-3 font-regular mt-3 ">
            {t("onboarding.part5.subtitle2")}
          </p>

          <Textarea
            value={homeDescription}
            onChange={(e) => onDataChange({ homeDescription: e.target.value })}
            placeholder={t("onboarding.part5.subtitle2p")}
            className="min-h-[100px] border-dark-3 focus:outline-none focus:ring-transparent  mt-4"
          />
        </div>

        <div className="mt-10">
          <h3 className="text-lg text-primary-blue font-semibold ">
            {t("onboarding.part5.title3")}
          </h3>
          <p className="text-base text-dark-3 font-regular mt-3 ">
            {t("onboarding.part5.subtitle3")}
          </p>

          <Textarea
            value={areaDescription}
            onChange={(e) => onDataChange({ areaDescription: e.target.value })}
            placeholder={t("onboarding.part5.subtitle3p")}
            className="min-h-[100px] border-dark-3 focus:outline-none focus:ring-transparent  mt-4"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutYourHome;
