// AddPlaceHeading.tsx
import { MoveLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface AddPlaceHeadingProps {
  onSubmit: () => void;
}

const AddPlaceHeading = ({ onSubmit }: AddPlaceHeadingProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 text-center md:text-left items-center justify-center gap-4">
      <div>
        <h1 className="font-semibold text-primary-blue text-3xl md:text-4xl lg:text-[40px]">
          Add more place
        </h1>
      </div>
      <div className="flex items-center justify-center gap-4 md:justify-end">
        <Link
          to="/places"
          className="relative overflow-hidden rounded-full transition-colors text-sm md:text-base lg:text-lg font-medium cursor-pointer px-6 py-2 bg-[#E8E8E8] text-dark-3 flex items-center justify-center gap-2.5"
        >
          <MoveLeft className="relative z-10 w-5 h-5" />
          <p className="relative z-10">Back</p>
          <div className="absolute bottom-0 right-0 opacity-80 items-center justify-center overflow-hidden">
            <img src="/buttonHomeWhite.svg" alt="icon" className="w-full" />
          </div>
        </Link>

        <button
          onClick={onSubmit}
          className="relative overflow-hidden rounded-full transition-colors text-sm md:text-base lg:text-lg font-medium cursor-pointer px-6 py-2 bg-primary-blue text-white flex items-center justify-center gap-2.5"
        >
          <p className="relative z-10">Submit</p>
          <div className="absolute bottom-0 right-0 opacity-80 items-center justify-center overflow-hidden">
            <img src="/buttonHomeIcon.svg" alt="icon" className="w-full" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default AddPlaceHeading;
