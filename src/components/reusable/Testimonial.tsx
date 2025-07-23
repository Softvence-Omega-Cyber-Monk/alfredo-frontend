import CommonWrapper from "@/common/CommonWrapper";
import testimonailPerson from "@/assets/testimonailPerson.jpg";
import youngLady from "@/assets/testimonial/review-young-lady.jpg";
import oldLady from "@/assets/testimonial/review-old-lady.jpg";
import youngMan from "@/assets/testimonial//review-young-man.jpg";
import comma from "@/assets/comma.svg";
import ClientHeading from "./ClientHeading";

const Testimonial = () => {
  return (
    <div className="lg:h-[751px] lg:py-[140px] md:py-[120px] py-14">
      <CommonWrapper>
        <div>
          <ClientHeading headingText="What Our Client" spanText="Say" />
          <p className="text-basic-dark text-center text-base sm:text-lg md:text-xl lg:w-[641px] mx-auto my-6">
            A trusted community of verified homeowners and passionate travelers.
          </p>
        </div>

        {/* Hover trigger only on medium screens and up */}
        <div className="group mt-10 flex flex-col lg:flex-row items-center lg:items-start gap-6 justify-center">
          {/* First card */}
          <div
            className="flex flex-col gap-3 w-full sm:w-[350px] lg:w-[384px]
            bg-[url(/src/assets/Rectangle3.svg)] bg-cover bg-no-repeat px-5 py-5 
            rounded-3xl text-basic-dark transform origin-right transition-transform duration-300
            lg:-rotate-3 group-hover:rotate-0"
          >
            <p>
              HomeExchange transformed our family vacations! We've stayed in
              amazing places without breaking the bank
            </p>
            <div className="bg-white h-px w-full" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 my-2">
                <img
                  src={youngLady}
                  alt="Client"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <h1 className="text-black font-bold">Cassey Flower</h1>
                  <p>Business Analyst</p>
                </div>
              </div>
              <div className="flex items-center">
                <img src={comma} alt="Quote" className="w-5" />
                <img src={comma} alt="Quote" className="w-5" />
              </div>
            </div>
          </div>

          {/* Middle card (no animation) */}
          <div
            className="flex flex-col gap-3 w-full sm:w-[350px] lg:w-[384px] 
            bg-[url(/src/assets/Rectangle3.svg)] bg-cover bg-no-repeat px-5 py-5 
            rounded-3xl text-basic-dark"
          >
            <p>
              HomeExchange transformed our family vacations! We've stayed in
              amazing places without breaking the bank
            </p>
            <div className="bg-white h-px w-full" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 my-2">
                <img
                  src={youngMan}
                  alt="Client"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <h1 className="text-black font-bold">Jonathan Dews</h1>
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
          <div
            className="flex flex-col gap-3 w-full sm:w-[350px] lg:w-[384px] 
            bg-[url(/src/assets/Rectangle3.svg)] bg-cover bg-no-repeat px-5 py-5 
            rounded-3xl text-basic-dark transform origin-left transition-transform duration-300
            lg:rotate-3 group-hover:rotate-0"
          >
            <p>
              HomeExchange transformed our family vacations! We've stayed in
              amazing places without breaking the bank
            </p>
            <div className="bg-white h-px w-full" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 my-2">
                <img
                  src={oldLady}
                  alt="Client"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <h1 className="text-black font-bold">Mertha Lime</h1>
                  <p>CTO</p>
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
