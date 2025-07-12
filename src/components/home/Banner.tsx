import CommonWrapper from "@/common/CommonWrapper";
import SearchFilter from "./SearchFilter";
const Banner = () => {
  return (
    <div
      className="w-full bg-bottom bg-repeat-x h-[80vh] flex flex-col items-center justify-center relative"
      style={{
        backgroundImage: `url('/cityscape.svg')`,
      }}
    >
        <div className="inset-0 absolute bg-[#F4F7FC] -z-20"></div>
      <CommonWrapper>
        <div className="flex flex-col items-center justify-center gap-4 py-20">
          <div className="text-center font-normal  text-dark-3">
            <h1 className="capitalize lg:text-[80px] max-w-[700px] mx-auto leading-[1.2]">
              Find your perfect home{" "}
              <span className="font-Grand-Hotel text-primary-blue">
                exchange partner
              </span>
            </h1>
            <p className="lg:text-xl font-medium mt-4 lg:mt-6">
              Exchange your home with travelers from around the world — safe,
              easy, and flexible.
            </p>
          </div>
          <div className="lg:mt-10">
            <SearchFilter />
          </div>
        </div>
      </CommonWrapper>
    </div>
  );
};

export default Banner;
