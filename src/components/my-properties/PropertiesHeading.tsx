import { MoveLeft } from "lucide-react";
import { Link } from "react-router-dom";

const PropertiesHeading = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 text-center lg:text-left items-center justify-center gap-4">
      <div>
        <h1 className="font-semibold text-primary-blue text-[40px]">
         My Property list
        </h1>
      </div>
      <div className="flex justify-center lg:justify-end">
        <Link
          to="/dashboard"
          className="relative overflow-hidden rounded-full transition-colors text-lg font-medium cursor-pointer px-6 py-2 bg-[#E8E8E8] text-dark-3 flex items-center justify-center gap-2.5"
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

export default PropertiesHeading;
