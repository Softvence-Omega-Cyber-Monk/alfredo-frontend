import { TbChecklist } from "react-icons/tb";
import { Button } from "../ui/button";
import Title from "./Shared/Title";
import PhotoUpload from "../dashboard/PhotoUpload";

const UploadPhoto = () => {
  return (
    <div className="w-full  md:py-10 space-y-6 ">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-center mb-10 w-full gap-4">
        <div className="w-full lg:w-auto flex-1">
          <Title title="Select Amenities" />
        </div>
        <div className="w-full lg:w-auto flex justify-end">
          <Button
            variant="secondary"
            className="flex items-center gap-2 px-5 py-3 rounded-lg border border-[#CAD2DB] text-[#3174CD] text-base font-medium hover:bg-gray-100"
          >
            Save Draft
            <TbChecklist className="w-5 h-5" />
          </Button>
        </div>
      </div>
      <hr className="text-[#EAF1FA]" />
      {/* Aprt-2 */}
      <div>
        <div className="mt-10">
          <h3 className="text-lg text-primary-blue font-semibold ">
            Add at least 5 pictures
          </h3>
          <p className="text-base text-dark-3 font-regular mt-3 ">
            Showcase your home from every angle by uploading at least 5
            high-quality photos — include key spaces like the living area,
            kitchen, bedroom.
          </p>

          <PhotoUpload />
        </div>
      </div>
    </div>
  );
};

export default UploadPhoto;
