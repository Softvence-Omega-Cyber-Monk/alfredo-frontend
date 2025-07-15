import { FaMapMarkerAlt, FaUser, FaHome, FaCalendarAlt } from "react-icons/fa";
import PrimaryButton from "../reusable/PrimaryButton";

const SearchFilter = () => {
  return (
    <div
      className="w-full max-w-5xl mx-auto px-[26px] py-5 sm:px-4 md:px-6 bg-transparent lg:rounded-full"
      style={{
        backgroundImage: `url("/footerBg.svg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="bg-white rounded-lg lg:rounded-full lg:px-10 lg:py-6">
        {/* Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-5 sm:gap-y-0 lg:divide-x divide-[#BFD4F0] p-4">
          {/* Location */}
          <div className="w-full sm:px-4">
            <label htmlFor="location" className="block text-sm text-dark-3 mb-2">
              Location
            </label>
            <div className="flex items-center gap-2 text-dark-2 placeholder:text-dark-2 text-base">
              <FaMapMarkerAlt className="text-primary-blue w-4 h-4 md:w-5 md:h-5" />
              <input
                id="location"
                type="text"
                placeholder="Where to go?"
                className="outline-none w-full text-sm md:text-base bg-transparent"
              />
            </div>
          </div>

          {/* People */}
          <div className="w-full sm:px-4">
            <label htmlFor="people" className="block text-sm text-dark-3 mb-2">
              Guests
            </label>
            <div className="flex items-center gap-2 text-dark-2 placeholder:text-dark-2 text-base">
              <FaUser className="text-primary-blue w-4 h-4 md:w-5 md:h-5" />
              <input
                id="people"
                type="number"
                min={1}
                placeholder="Number of people"
                className="outline-none w-full text-sm md:text-base bg-transparent"
              />
            </div>
          </div>

          {/* Type */}
          <div className="w-full sm:px-4">
            <label htmlFor="type" className="block text-sm text-dark-3 mb-2">
              Property Type
            </label>
            <div className="flex items-center gap-2 text-dark-2 text-base">
              <FaHome className="text-primary-blue w-4 h-4 md:w-5 md:h-5" />
              <select
                id="type"
                className="outline-none w-full text-sm md:text-base bg-transparent cursor-pointer"
              >
                <option value="">Home</option>
                <option value="apartment">Apartment</option>
                <option value="villa">Villa</option>
                <option value="cabin">Cabin</option>
              </select>
            </div>
          </div>

          {/* Date */}
          <div className="w-full sm:px-4">
            <label htmlFor="homeDate" className="block text-sm text-dark-3 mb-2">
              Check-in Date
            </label>
            <div className="flex items-center gap-2 text-dark-2 text-base">
              <FaCalendarAlt className="text-primary-blue w-4 h-4 md:w-5 md:h-5" />
              <input
                id="homeDate"
                type="date"
                className="outline-none w-full text-sm md:text-base bg-transparent cursor-pointer"
              />
            </div>
          </div>

          {/* Search Button */}
          <div className="w-full sm:px-4 sm:col-span-2 md:mt-6 lg:mt-0 lg:col-span-1 flex items-end">
            <PrimaryButton
              title="Search"
              textColor="text-white w-full text-sm md:text-base lg:text-lg"
              bgColor="bg-primary-blue"
              borderColor=""
              bgImage="/buttonHomeIcon.svg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
