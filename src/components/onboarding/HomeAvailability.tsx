import { TbChecklist } from "react-icons/tb";
import { Button } from "../ui/button";
import Title from "./Shared/Title";
import check from "@/assets/icons/dashboardCheck.svg";
import cross from "@/assets/icons/dashboardCross.svg";
import CalendarRangePicker from "./CalendarRangePicker";
import { useTranslation } from "react-i18next";

interface HomeAvailabilityProps {
  availabilityType: "home" | "apartment" | null;
  availabilityDates: {
    start: Date | null;
    end: Date | null;
  };
  onAvailabilityChange: (dates: {
    start: Date | null;
    end: Date | null;
  }) => void;

  onDataChange: (updates: { availabilityType?: "home" | "apartment" }) => void;
}

const HomeAvailability = ({
  availabilityType,
  availabilityDates,
  onAvailabilityChange,
  onDataChange,
}: HomeAvailabilityProps) => {
  const { t } = useTranslation("onboarding");
  return (
    <div className="w-full py-6 md:py-10 space-y-6 ">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-center mb-10 w-full gap-4">
        <div className="w-full lg:w-auto flex-1">
          <Title title={t("onboarding.part7.headTitle")} />
        </div>
        <div className="w-full lg:w-auto flex justify-center md:justify-end">
          <Button
            variant="secondary"
            className="flex items-center gap-2 px-5 py-3 rounded-lg border border-[#CAD2DB] text-[#3174CD] text-base font-medium hover:bg-gray-100"
          >
            {t("onboarding.part7.headButton")}
            <TbChecklist className="w-5 h-5" />
          </Button>
        </div>
      </div>
      <hr className="text-[#EAF1FA]" />
      {/* 33 */}
      <div>
        <div className="mt-10">
          <h3 className="text-lg text-primary-blue font-semibold ">
            {t("onboarding.part7.titleAvailability")}
          </h3>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 ">
            <div
              onClick={() => onDataChange({ availabilityType: "home" })}
              className={`p-6 flex flex-col gap-2.5 border rounded-lg cursor-pointer transition-all ${
                availabilityType === "home"
                  ? "border-[#BFD4F0] bg-[#F4F7FC] shadow-[0_0_24px_0_rgba(49,116,205,0.25)]"
                  : "border-[#BFD4F0] hover:bg-[#F4F7FC] hover:shadow-[0_0_24px_0_rgba(49,116,205,0.25)]"
              }`}
            >
              <div className="flex items-center gap-2 ">
                <img
                  src={availabilityType === "home" ? check : cross}
                  className="w-5 h-5"
                  alt=""
                />
                <p className="text-lg text-dark-3 font-normal">
                  {t("onboarding.part7.availabilityCard.miniTitle1")}
                </p>
              </div>
              <p className="text-lg text-dark-3 font-normal">
                {t("onboarding.part7.availabilityCard.subtitle1")}
              </p>
            </div>

            <div
              onClick={() => onDataChange({ availabilityType: "apartment" })}
              className={`p-6 flex flex-col gap-2.5 border rounded-lg cursor-pointer transition-all ${
                availabilityType === "apartment"
                  ? "border-[#BFD4F0] bg-[#F4F7FC] shadow-[0_0_24px_0_rgba(49,116,205,0.25)]"
                  : "border-[#BFD4F0] hover:bg-[#F4F7FC] hover:shadow-[0_0_24px_0_rgba(49,116,205,0.25)]"
              }`}
            >
              <div className="flex items-center gap-2 ">
                <img
                  src={availabilityType === "apartment" ? check : cross}
                  className="w-5 h-5"
                  alt=""
                />
                <p className="text-lg text-dark-3 font-normal">
                  {t("onboarding.part7.availabilityCard.miniTitle2")}
                </p>
              </div>
              <p className="text-lg text-dark-3 font-regular">
                {t("onboarding.part7.availabilityCard.subtitle2")}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      <div className=" space-y-6">
        <h1 className="text-[#3174CD] font-dmSans text-[18px] font-semibold leading-[27px]">
          {t("onboarding.part7.titleDate")}
        </h1>
        <CalendarRangePicker
          availabilityDates={availabilityDates}
          onAvailabilityChange={onAvailabilityChange}
        />
      </div>
    </div>
  );
};

export default HomeAvailability;
