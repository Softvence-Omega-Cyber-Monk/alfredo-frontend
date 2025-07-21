import { TbChecklist } from "react-icons/tb";
import { Button } from "../ui/button";
import Title from "./Shared/Title";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";

const AboutYourHome = () => {
  return (
    <div className="w-full py-6 md:py-10 space-y-6 ">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-center mb-10 w-full gap-4">
        <div className="w-full lg:w-auto flex-1">
          <Title title="About Your Home" />
        </div>
          <div className="w-full lg:w-auto flex justify-center md:justify-end">
          <Button
            variant="secondary"
            className="flex items-center gap-2 px-5 py-3 rounded-lg border border-[#CAD2DB] text-[#3174CD] text-base font-medium hover:bg-gray-100"
          >
            Save Draft
            <TbChecklist className="w-5 h-5" />
          </Button>
        </div>
      </div>
      <hr className="text-[#EAF1FA]" />
      {/* Aprt-2 */}
      <div>
        <div>
          <h3 className="text-lg text-primary-blue font-semibold ">
            Give your home a Name
          </h3>
          <p className="text-base text-dark-3 font-regular mt-3 ">
            Pick a name that reflects the personality or charm of your home —
            it’s the first thing guests will see!
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
      </div>
    </div>
  );
};

export default AboutYourHome;
