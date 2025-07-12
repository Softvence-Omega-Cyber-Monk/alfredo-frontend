import CommonWrapper from "@/common/CommonWrapper";
import testimonailPerson from "@/assets/testimonailPerson.jpg";
import comma from "@/assets/comma.svg";
import ClientHeading from "./ClientHeading";

const Testimonial = () => {
  return (
    <div className="lg:h-[751px] lg:py-[140px]">
      <CommonWrapper>
        <div className="">
          {/* <h1 className="text-[64px] text-[#505050] text-center">
            What Our Client{" "}
            <span className="font-Grand-Hotel text-[96px] text-primary-blue">
              Say
            </span>
          </h1> */}
          <ClientHeading headingText="What Our Client" spanText="Say" />
          <p className="text-basic-dark text-center text-[24px] lg:w-[641px] mx-auto">
            A trusted community of verified homeowners and passionate travelers.
          </p>
        </div>
        <div className="mt-10 lg:flex items-start gap-6 justify-center">
          {/* first card */}
          <div className="flex flex-col gap-3 w-full sm:w-[350px] lg:w-[384px] bg-[url(/src/assets/Rectangle3.svg)] px-5 py-5 rounded-3xl text-basic-dark -rotate-2 hover:rotate-0 transition-transform duration-300 mb-8 lg:mb-0 transform origin-bottom">
            <p>
              HomeExchange transformed our family vacations! We've stayed in
              amazing places without breaking the bank
            </p>
            <div className="bg-white h-px w-full"></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 my-2">
                <img
                  src={testimonailPerson}
                  alt=""
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <h1 className="text-black font-bold">Mr. Alfredo</h1>
                  <p>Software Engineer</p>
                </div>
              </div>
              <div className="flex items-center">
                <img src={comma} alt="" className="w-5" />
                <img src={comma} alt="" className="w-5" />
              </div>
            </div>
          </div>

          {/* middle card */}
          <div className="flex flex-col gap-3 w-full sm:w-[350px] lg:w-[384px] bg-[url(/src/assets/Rectangle3.svg)] px-5 py-5 rounded-3xl text-basic-dark mb-8 lg:mb-0">
            <p>
              HomeExchange transformed our family vacations! We've stayed in
              amazing places without breaking the bank
            </p>
            <div className="bg-white h-px w-full"></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 my-2">
                <img
                  src={testimonailPerson}
                  alt=""
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <h1 className="text-black font-bold">Mr. Alfredo</h1>
                  <p>Software Engineer</p>
                </div>
              </div>
              <div className="flex items-center">
                <img src={comma} alt="" className="w-5" />
                <img src={comma} alt="" className="w-5" />
              </div>
            </div>
          </div>

          {/* third card */}
          <div className="flex flex-col gap-3 w-full sm:w-[350px] lg:w-[384px] bg-[url(/src/assets/Rectangle3.svg)] px-5 py-5 rounded-3xl text-basic-dark rotate-2 hover:rotate-0 transition-transform duration-300 transform origin-bottom">
            <p>
              HomeExchange transformed our family vacations! We've stayed in
              amazing places without breaking the bank
            </p>
            <div className="bg-white h-px w-full"></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 my-2">
                <img
                  src={testimonailPerson}
                  alt=""
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <h1 className="text-black font-bold">Mr. Alfredo</h1>
                  <p>Software Engineer</p>
                </div>
              </div>
              <div className="flex items-center">
                <img src={comma} alt="" className="w-5" />
                <img src={comma} alt="" className="w-5" />
              </div>
            </div>
          </div>
        </div>
      </CommonWrapper>
    </div>
  );
};

export default Testimonial;
