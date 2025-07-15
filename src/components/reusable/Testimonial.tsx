import CommonWrapper from "@/common/CommonWrapper";
import testimonailPerson from "@/assets/testimonailPerson.jpg";
import comma from "@/assets/comma.svg";
import ClientHeading from "./ClientHeading";

const Testimonial = () => {
  return (
    <div className="lg:h-[751px] lg:py-[140px] py-16">
      <CommonWrapper>
        <div>
          <ClientHeading headingText="What Our Client" spanText="Say" />
          <p className="text-basic-dark text-center text-base sm:text-lg md:text-xl lg:w-[641px] mx-auto">
            A trusted community of verified homeowners and passionate travelers.
          </p>
        </div>

        {/* Cards container */}
        <div className="mt-10 flex flex-col lg:flex-row items-center lg:items-start gap-6 justify-center">
          {/* First card */}
          <div className="flex flex-col gap-3 w-full sm:w-[350px] lg:w-[384px] bg-[url(/src/assets/Rectangle3.svg)] bg-cover bg-no-repeat px-5 py-5 rounded-3xl text-basic-dark -rotate-2 hover:rotate-0 transition-transform duration-300 transform origin-bottom">
            <p>
              HomeExchange transformed our family vacations! We've stayed in
              amazing places without breaking the bank
            </p>
            <div className="bg-white h-px w-full" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 my-2">
                <img
                  src={testimonailPerson}
                  alt="Client"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <h1 className="text-black font-bold">Mr. Alfredo</h1>
                  <p>Software Engineer</p>
                </div>
              </div>
              <div className="flex items-center">
                <img src={comma} alt="Quote" className="w-5" />
                <img src={comma} alt="Quote" className="w-5" />
              </div>
            </div>
          </div>

          {/* Middle card */}
          <div className="flex flex-col gap-3 w-full sm:w-[350px] lg:w-[384px] bg-[url(/src/assets/Rectangle3.svg)] bg-cover bg-no-repeat px-5 py-5 rounded-3xl text-basic-dark">
            <p>
              HomeExchange transformed our family vacations! We've stayed in
              amazing places without breaking the bank
            </p>
            <div className="bg-white h-px w-full" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 my-2">
                <img
                  src={testimonailPerson}
                  alt="Client"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <h1 className="text-black font-bold">Mr. Alfredo</h1>
                  <p>Software Engineer</p>
                </div>
              </div>
              <div className="flex items-center">
                <img src={comma} alt="Quote" className="w-5" />
                <img src={comma} alt="Quote" className="w-5" />
              </div>
            </div>
          </div>

          {/* Third card */}
          <div className="flex flex-col gap-3 w-full sm:w-[350px] lg:w-[384px] bg-[url(/src/assets/Rectangle3.svg)] bg-cover bg-no-repeat px-5 py-5 rounded-3xl text-basic-dark rotate-2 hover:rotate-0 transition-transform duration-300 transform origin-bottom">
            <p>
              HomeExchange transformed our family vacations! We've stayed in
              amazing places without breaking the bank
            </p>
            <div className="bg-white h-px w-full" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 my-2">
                <img
                  src={testimonailPerson}
                  alt="Client"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <h1 className="text-black font-bold">Mr. Alfredo</h1>
                  <p>Software Engineer</p>
                </div>
              </div>
              <div className="flex items-center">
                <img src={comma} alt="Quote" className="w-5" />
                <img src={comma} alt="Quote" className="w-5" />
              </div>
            </div>
          </div>
        </div>
      </CommonWrapper>
    </div>
  );
};

export default Testimonial;
