import { TbChecklist } from "react-icons/tb";
import { Button } from "../ui/button";
import Title from "./Shared/Title";
import home from "@/assets/icons/Home.svg";
import apartment from "@/assets/icons/open-door.svg";
import residence from "@/assets/icons/building-three.svg";
import casual from "@/assets/icons/city-one.svg";
import { useTranslation } from "react-i18next";
interface HomeTypeProps {
  homeType: "HOME" | "APARTMENT" | null;
  residenceType: boolean | null;
  onHomeTypeChange: (homeType: "HOME" | "APARTMENT") => void;
  onResidenceTypeChange: (residenceType: boolean) => void;
}
const SelectType = ({
  homeType,
  residenceType,
  onHomeTypeChange,
  onResidenceTypeChange,
}: HomeTypeProps) => {
  const { t } = useTranslation("onboarding");

  return (
    <div className="w-full py-6 md:py-10 space-y-6 ">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-center mb-10 w-full gap-4">
        <div className="w-full lg:w-auto flex-1">
          <Title title={t("onboarding.part3.headTitle")} />
        </div>
        <div className="w-full lg:w-auto flex justify-center md:justify-end">
          <Button
            variant="secondary"
            className="flex items-center gap-2 px-5 py-3 rounded-lg border border-[#CAD2DB] text-[#3174CD] text-base font-medium hover:bg-gray-100"
          >
            {t("onboarding.part3.headButton")}
            <TbChecklist className="w-5 h-5" />
          </Button>
        </div>
      </div>
      <hr className="text-[#EAF1FA]" />
      {/* Apartment-2 */}
      <div>
        <div className="mt-10">
          <h2 className="text-2xl text-primary-blue font-semibold">
            {t("onboarding.part3.title1")}
          </h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 ">
            <div
              onClick={() => onHomeTypeChange("HOME")}
              className={`p-6 flex flex-col gap-2.5 border rounded-lg cursor-pointer transition-all ${
                homeType === "HOME"
                  ? "border-primary-blue bg-[#F4F7FC] shadow-[0_0_24px_0_rgba(49,116,205,0.25)]"
                  : "border-[#EAF1FA] hover:bg-[#F4F7FC] hover:border-primary-blue"
              }`}
            >
              <div className="flex items-center gap-2 ">
                <img src={home} alt="" />
                <p
                  className={`text-lg font-medium ${
                    homeType === "HOME"
                      ? "text-primary-blue"
                      : "text-primary-blue"
                  }`}
                >
                  {t("onboarding.part3.card1.miniTitle1")}
                </p>
              </div>
              <p className="text-base text-dark-3 font-regular">
                {t("onboarding.part3.card1.subtitle1")}
              </p>
            </div>

            <div
              onClick={() => onHomeTypeChange("APARTMENT")}
              className={`p-6 flex flex-col gap-2.5 border rounded-lg cursor-pointer transition-all ${
                homeType === "APARTMENT"
                  ? "border-primary-blue bg-[#F4F7FC] shadow-[0_0_24px_0_rgba(49,116,205,0.25)]"
                  : "border-[#EAF1FA] hover:bg-[#F4F7FC] hover:border-primary-blue"
              }`}
            >
              <div className="flex items-center gap-2 ">
                <img src={apartment} alt="" />
                <p
                  className={`text-lg font-medium ${
                    homeType === "APARTMENT"
                      ? "text-primary-blue"
                      : "text-primary-blue"
                  }`}
                >
                  {t("onboarding.part3.card1.miniTitle2")}
                </p>
              </div>
              <p className="text-base text-dark-3 font-regular">
                {t("onboarding.part3.card1.subtitle2")}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl text-primary-blue font-semibold">
            {t("onboarding.part3.title2")}
          </h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 ">
            <div
              onClick={() => onResidenceTypeChange(true)}
              className={`p-6 flex flex-col gap-2.5 border rounded-lg cursor-pointer transition-all ${
                residenceType === true
                  ? "border-primary-blue bg-[#F4F7FC] shadow-[0_0_24px_0_rgba(49,116,205,0.25)]"
                  : "border-[#EAF1FA] hover:bg-[#F4F7FC] hover:border-primary-blue"
              }`}
            >
              <div className="flex items-center gap-2 ">
                <img src={residence} alt="" />
                <p
                  className={`text-lg font-medium ${
                    residenceType === true
                      ? "text-primary-blue"
                      : "text-primary-blue"
                  }`}
                >
                  {t("onboarding.part3.card2.miniTitle1")}
                </p>
              </div>
              <p className="text-base text-dark-3 font-regular">
                {t("onboarding.part3.card2.subtitle1")}Your home is an
                independent property.
              </p>
            </div>

            <div
              onClick={() => onResidenceTypeChange(false)}
              className={`p-6 flex flex-col gap-2.5 border rounded-lg cursor-pointer transition-all ${
                residenceType === false
                  ? "border-primary-blue bg-[#F4F7FC] shadow-[0_0_24px_0_rgba(49,116,205,0.25)]"
                  : "border-[#EAF1FA] hover:bg-[#F4F7FC] hover:border-primary-blue"
              }`}
            >
              <div className="flex items-center gap-2 ">
                <img src={casual} alt="" />
                <p
                  className={`text-lg font-medium ${
                    residenceType === false
                      ? "text-primary-blue"
                      : "text-primary-blue"
                  }`}
                >
                  {t("onboarding.part3.card2.miniTitle2")} Nor I go there
                  occasionally
                </p>
              </div>
              <p className="text-base text-dark-3 font-regular">
                {t("onboarding.part3.card2.subtitle2")}Your home is in a
                building shared by several apartments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectType;
