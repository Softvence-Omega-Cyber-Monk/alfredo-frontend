import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import check from "@/assets/icons/dashboardCheck.svg";
import cross from "@/assets/icons/dashboardCross.svg";
import PhotoUpload from "./PhotoUpload";
import DashboardCalendarRangePicker from "./DashboardCalendarRangePicker";
import { useTranslation } from "react-i18next";

interface DashboardHomeDetailsProps {
  homeName: string;
  homeDescription: string;
  areaDescription: string;
  photos: File[];
  availabilityType: "home" | "apartment" | null;
  availabilityDates: {
    start: Date | null;
    end: Date | null;
  };
  onAvailabilityChange: (dates: {
    start: Date | null;
    end: Date | null;
  }) => void;
  onDataChange: (updates: {
    homeName?: string;
    homeDescription?: string;
    areaDescription?: string;
    photos?: File[];
    availabilityType?: "home" | "apartment";
  }) => void;
}

const DashboardHomeDetails = ({
  homeName,
  homeDescription,
  areaDescription,
  photos,
  availabilityType,
  availabilityDates,
  onAvailabilityChange,
  onDataChange,
}: DashboardHomeDetailsProps) => {
  const { t } = useTranslation("dashboard");
  return (
    <div>
      <div>
        <h3 className="text-lg text-primary-blue font-semibold ">
          {t("dashboard.part4.title1")}
        </h3>
        <p className="text-base text-dark-3 font-regular mt-3 "></p>

        <Input
          name="text"
          value={homeName}
          onChange={(e) => onDataChange({ homeName: e.target.value })}
          placeholder={t("dashboard.part4.subtitle1p")}
          className="  px-4 py-3 h-auto items-center gap-2 text-sm rounded-lg border border-dark-3 bg-white/5 backdrop-blur-sm placeholder:text-gray-500 focus:outline-none focus:ring-transparent  mt-4"
        />
      </div>

      <div className="mt-10">
        <h3 className="text-lg text-primary-blue font-semibold ">
          {t("dashboard.part4.title2")}
        </h3>
        <p className="text-base text-dark-3 font-regular mt-3 ">
          {t("dashboard.part4.subtitle2")}
        </p>

        <Textarea
          value={homeDescription}
          onChange={(e) => onDataChange({ homeDescription: e.target.value })}
          placeholder={t("dashboard.part4.subtitle2p")}
          className="min-h-[100px] border-dark-3 focus:outline-none focus:ring-transparent  mt-4"
        />
      </div>

      <div className="mt-10">
        <h3 className="text-lg text-primary-blue font-semibold ">
          {t("dashboard.part4.title3")}
        </h3>
        <p className="text-base text-dark-3 font-regular mt-3 ">
          {t("dashboard.part4.subtitle3")}
        </p>

        <Textarea
          value={areaDescription}
          onChange={(e) => onDataChange({ areaDescription: e.target.value })}
          placeholder={t("dashboard.part4.subtitle3p")}
          className="min-h-[100px] border-dark-3 focus:outline-none focus:ring-transparent  mt-4"
        />
      </div>

      <div className="mt-10">
        <h3 className="text-lg text-primary-blue font-semibold ">
          {t("dashboard.part4.title4")}
        </h3>
        <p className="text-base text-dark-3 font-regular mt-3 ">
          {t("dashboard.part4.subtitle4")}
        </p>

        <PhotoUpload
          photos={photos}
          onPhotosChange={(newPhotos) => onDataChange({ photos: newPhotos })}
        />
      </div>

      <div className="mt-10">
        <h3 className="text-lg text-primary-blue font-semibold ">
          {t("dashboard.part4.titleAvailability")}
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
                {t("dashboard.part4.availabilityCard.miniTitle1")}
              </p>
            </div>
            <p className="text-lg text-dark-3 font-normal">
              {t("dashboard.part4.availabilityCard.subtitle1")}
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
                {" "}
                {t("dashboard.part4.availabilityCard.miniTitle2")}
              </p>
            </div>
            <p className="text-lg text-dark-3 font-regular">
              {t("dashboard.part4.availabilityCard.subtitle2")}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-lg text-primary-blue font-semibold ">
          {t("dashboard.part4.titleDate")}
        </h3>

        <div className="mt-6">
          <DashboardCalendarRangePicker
            availabilityDates={availabilityDates}
            onAvailabilityChange={onAvailabilityChange}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardHomeDetails;
