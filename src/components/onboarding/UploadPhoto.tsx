import { TbChecklist } from "react-icons/tb";
import { Button } from "../ui/button";
import Title from "./Shared/Title";
import PhotoUpload from "../dashboard/PhotoUpload";
import { useTranslation } from "react-i18next";

interface UploadPhotoProps {
  photos: File[];
  onDataChange: (updates: { photos?: File[] }) => void;
}

const UploadPhoto = ({ photos, onDataChange }: UploadPhotoProps) => {
  const { t } = useTranslation("onboarding");
  return (
    <div className="w-full py-6 md:py-10 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-center mb-10 w-full gap-4">
        <div className="w-full lg:w-auto flex-1">
          <Title title={t("onboarding.part6.headTitle")} />
        </div>
        <div className="w-full lg:w-auto flex justify-center md:justify-end">
          <Button
            variant="secondary"
            className="flex items-center gap-2 px-5 py-3 rounded-lg border border-[#CAD2DB] text-[#3174CD] text-base font-medium hover:bg-gray-100"
          >
            {t("onboarding.part6.headButton")}
            <TbChecklist className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <hr className="text-[#EAF1FA]" />

      {/* Section */}
      <div className="mt-10">
        <h3 className="text-lg text-primary-blue font-semibold ">
          {t("onboarding.part6.title4")}
        </h3>
        <p className="text-base text-dark-3 font-regular mt-3 ">
          {t("onboarding.part6.subtitle4")}
        </p>

        <PhotoUpload
          photos={photos}
          onPhotosChange={(newPhotos) => onDataChange({ photos: newPhotos })}
        />
      </div>
    </div>
  );
};

export default UploadPhoto;
