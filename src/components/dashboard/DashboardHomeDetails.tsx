import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import check from "@/assets/icons/dashboardCheck.svg";
import cross from "@/assets/icons/dashboardCross.svg";
import PhotoUpload from "./PhotoUpload";

const DashboardHomeDetails = () => {
  return (
    <div>
      <div>
        <h3 className="text-lg text-primary-blue font-semibold ">
          Give your home a Name
        </h3>
        <p className="text-base text-dark-3 font-regular mt-3 ">
          Pick a name that reflects the personality or charm of your home — it’s
          the first thing guests will see!
        </p>

        <Input
          name="text"
          placeholder="Type your home name"
          className="  px-4 py-3 h-auto items-center gap-2 text-sm rounded-lg border border-dark-3 bg-white/5 backdrop-blur-sm placeholder:text-gray-500 focus:outline-none focus:ring-transparent  mt-4"
        />
      </div>

      <div className="mt-10">
        <h3 className="text-lg text-primary-blue font-semibold ">
          Describe your home
        </h3>
        <p className="text-base text-dark-3 font-regular mt-3 ">
          Tell guests what makes your home inviting — mention the style,
          atmosphere, and anything that makes it feel special.
        </p>

        <Textarea
          placeholder="Describe it here"
          className="min-h-[100px] border-dark-3 focus:outline-none focus:ring-transparent  mt-4"
        />
      </div>

      <div className="mt-10">
        <h3 className="text-lg text-primary-blue font-semibold ">
          Tell us about the area around your home
        </h3>
        <p className="text-base text-dark-3 font-regular mt-3 ">
          Help guests get a feel for your location — share nearby attractions,
          dining spots, transport options, and the overall vibe of your
          neighborhood.
        </p>

        <Textarea
          placeholder="Describe it here"
          className="min-h-[100px] border-dark-3 focus:outline-none focus:ring-transparent  mt-4"
        />
      </div>

      <div className="mt-10">
        <h3 className="text-lg text-primary-blue font-semibold ">
          Add at least 5 pictures
        </h3>
        <p className="text-base text-dark-3 font-regular mt-3 ">
          Showcase your home from every angle by uploading at least 5
          high-quality photos — include key spaces like the living area,
          kitchen, bedroom, and bathroom.
        </p>

        <PhotoUpload/>
      </div>

      <div className="mt-10">
        <h3 className="text-lg text-primary-blue font-semibold ">
          Add your home's availability
        </h3>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 ">
          <div className="p-6 flex flex-col gap-2.5 border border-[#BFD4F0] rounded-lg bg-[#F4F7FC] shadow-[0_0_24px_0_rgba(49,116,205,0.25)]">
            <div className="flex items-center gap-2 ">
              <img src={check} className="w-5 h-5" alt="" />
              <p className="text-lg text-dark-3 font-normal">Home</p>
            </div>
            <p className="text-lg text-dark-3 font-normal">
              Your home is an independent property.
            </p>
          </div>

          <div className="p-6 flex flex-col gap-2.5 border border-[#BFD4F0] rounded-lg">
            <div className="flex items-center gap-2 ">
              <img src={cross} className="w-5 h-5" alt="" />
              <p className="text-lg text-dark-3 font-normal">Apartment</p>
            </div>
            <p className="text-lg text-dark-3 font-regular">
              our home is in a building shared by several apartments.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-lg text-primary-blue font-semibold ">
          Select Your Available Dates
        </h3>

        <div></div>
      </div>
    </div>
  );
};

export default DashboardHomeDetails;
