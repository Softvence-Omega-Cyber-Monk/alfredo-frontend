import { MoveRight } from "lucide-react";
import { Link } from "react-router-dom";

const DashboardHeading = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 text-center lg:text-left items-center justify-center gap-4">
      <div>
        <h1 className="font-semibold text-primary-blue text-[40px]">
          Hi JonDon,
        </h1>
        <p className="text-base text-dark-3 font-regular mt-3 max-w-[588px]">
          You can preview how your home appears to others, make updates, and get
          ready to welcome guests for a home exchange.
        </p>
      </div>
      <div className="flex justify-center lg:justify-end">
        <Link
          to="/my-properties"
          className="relative overflow-hidden rounded-full transition-colors text-lg font-medium cursor-pointer px-6 py-2 bg-primary-blue text-white flex items-center justify-center gap-2.5"
        >
          <p className="relative z-10">My Properties</p>
          <MoveRight className="relative z-10 w-5 h-5" />
          <div className="absolute bottom-0 right-0 opacity-80 items-center justify-center overflow-hidden">
            <img src="/buttonHomeIcon.svg" alt="icon" className="w-full" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default DashboardHeading;
