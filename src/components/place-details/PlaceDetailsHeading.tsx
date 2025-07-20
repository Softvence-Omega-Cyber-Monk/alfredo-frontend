import { MoveLeft } from "lucide-react";
import { Link } from "react-router-dom";

const PlaceDetailsHeading = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 text-center md:text-left items-center justify-center gap-4">
      <h1 className="font-semibold text-primary-blue text-3xl md:text-4xl lg:text-[40px]">
        Place Details
      </h1>

      <div className="flex justify-center md:justify-end">
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
      </div>
    </div>
  );
};

export default PlaceDetailsHeading;
