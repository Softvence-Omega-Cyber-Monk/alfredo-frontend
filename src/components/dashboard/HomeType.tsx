import home from "@/assets/icons/Home.svg";
import apartment from "@/assets/icons/open-door.svg";
import residence from "@/assets/icons/building-three.svg";
import casual from "@/assets/icons/city-one.svg";

const HomeType = () => {
  return (
    <div>
      <div className="mt-10">
        <h2 className="text-2xl text-primary-blue font-semibold">
          What is your home like?
        </h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 ">
          <div className="p-6 flex flex-col gap-2.5 border border-primary-blue rounded-lg bg-[#F4F7FC] shadow-[0_0_24px_0_rgba(49,116,205,0.25)]">
            <div className="flex items-center gap-2 ">
              <img src={home} alt="" />
              <p className="text-lg text-primary-blue font-medium">Home</p>
            </div>
            <p className="text-base text-dark-3 font-regular">
              Your home is an independent property.
            </p>
          </div>

          <div className="p-6 flex flex-col gap-2.5 border border-[#EAF1FA] rounded-lg">
            <div className="flex items-center gap-2 ">
              <img src={apartment} alt="" />
              <p className="text-lg text-primary-blue font-medium">Apartment</p>
            </div>
            <p className="text-base text-dark-3 font-regular">
              our home is in a building shared by several apartments.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl text-primary-blue font-semibold">
          Is it your main residence?
        </h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 ">
          <div className="p-6 flex flex-col gap-2.5 border border-primary-blue rounded-lg bg-[#F4F7FC] shadow-[0_0_24px_0_rgba(49,116,205,0.25)]">
            <div className="flex items-center gap-2 ">
              <img src={residence} alt="" />
              <p className="text-lg text-primary-blue font-medium">
                Yes, I live there all year round
              </p>
            </div>
            <p className="text-base text-dark-3 font-regular">
              Your home is an independent property.
            </p>
          </div>

          <div className="p-6 flex flex-col gap-2.5 border border-[#EAF1FA] rounded-lg">
            <div className="flex items-center gap-2 ">
              <img src={casual} alt="" />
              <p className="text-lg text-primary-blue font-medium">
                Nor I go there occasionally
              </p>
            </div>
            <p className="text-base text-dark-3 font-regular">
              Your home is in a building shared by several apartments.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeType;
