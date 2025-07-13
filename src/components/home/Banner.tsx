import CommonWrapper from "@/common/CommonWrapper";
import SearchFilter from "./SearchFilter";

const Banner = () => {
  return (
    <div
      className="w-full bg-bottom bg-repeat-x min-h-[60vh] md:h-[70vh] lg:h-[80vh] flex flex-col items-center justify-center relative"
      style={{
        backgroundImage: `url('/cityscape.svg')`,
      }}
    >
      <div className="inset-0 absolute bg-[#F4F7FC] -z-20"></div>
      <CommonWrapper>
        <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-12 lg:py-20">
          <div className="text-center font-normal text-dark-3 px-4 md:px-6">
            <h1 className="capitalize text-4xl md:text-5xl lg:text-[80px] max-w-[700px] mx-auto leading-[1.2]">
              Find your perfect home{" "}
              <span className="font-Grand-Hotel text-primary-blue">
                exchange partner
              </span>
            </h1>
            <p className="text-base md:text-lg lg:text-xl font-medium mt-3 md:mt-4 lg:mt-6">
              Exchange your home with travelers from around the world — safe,
              easy, and flexible.
            </p>
          </div>
          <div className="mt-6 md:mt-8 lg:mt-10 w-full">
            <SearchFilter />
          </div>
        </div>
      </CommonWrapper>
    </div>
  );
};

export default Banner;