import { MoveRight } from "lucide-react";
import { Link } from "react-router-dom";

interface PlacesHeadingProps {
  hasPlaces: boolean;
}

const PlacesHeading = ({ hasPlaces }: PlacesHeadingProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 text-center lg:text-left items-center justify-center gap-4">
      <div>
        <h1 className="font-semibold text-primary-blue text-3xl md:text-4xl lg:text-[40px]">
          Hi JonDon,
        </h1>
        <p className="text-sm md:text-base text-dark-3 font-regular mt-3 max-w-[588px] mx-auto lg:mx-0">
          {hasPlaces
            ? "You can preview how your home appears to others, make updates, and get ready to welcome guests for a home exchange."
            : `You Haven't Listed Any Places Yet.`}
        </p>
      </div>
      <div className="flex justify-center lg:justify-end">
        <Link
          to="/add-place"
          className="relative overflow-hidden rounded-full transition-colors text-sm md:text-base lg:text-lg font-medium cursor-pointer px-6 py-2 bg-primary-blue text-white flex items-center justify-center gap-2.5"
        >
          <p className="relative z-10">Add a Place</p>
          <MoveRight className="relative z-10 w-5 h-5" />
          <div className="absolute bottom-0 right-0 opacity-80 items-center justify-center overflow-hidden">
            <img src="/buttonHomeIcon.svg" alt="icon" className="w-full" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PlacesHeading;
