import MiniWrapper from "@/common/MiniWrapper";
import { Button } from "../ui/button";
import { FaCcStripe } from "react-icons/fa";

const Payment = () => {
  return (
    <MiniWrapper>
      <div className="space-y-8">
        <div>
          <Button className="w-full text-2xl font-DM-sans flex h-14 justify-center items-center gap-2 self-stretch rounded-xl bg-[var(--Primary-P-25,#F4F7FC)] text-[var(--color-primary-blue)] hover:bg-[#e1e9f5] transition-colors duration-200 cursor-pointer">
            Payment Setup
          </Button>
        </div>
        <div className="space-y-3">
          <div>
            <Button className="w-full flex h-14 justify-between items-center bg-[#3174CD] text-white rounded-xl px-4">
              <div className="flex justify-start items-center space-x-2">
                <p>
                  <FaCcStripe className="h-10 w-16" />
                </p>
                <span>220********052</span>
              </div>

              <label className="relative w-5 h-5 cursor-pointer">
                <input
                  type="checkbox"
                  className="peer appearance-none w-5 h-5 rounded-full border-2 border-white bg-transparent checked:bg-white checked:border-white"
                />
                {/* Selector dot when checked */}
                <span className="absolute top-1 left-1 w-3 h-3 bg-[#3174CD] rounded-full scale-0 peer-checked:scale-100 transition-transform"></span>
              </label>
            </Button>
          </div>
        </div>

        <div>
          <Button className="w-full text-lg font-DM-sans flex h-14 justify-center items-center gap-2 self-stretch rounded-xl bg-[#E9E9E9] text-[var(--color-basic-dark)] hover:bg-[#d4d3d3] transition-colors duration-200 cursor-pointer">
            + Add New Card
          </Button>
        </div>
      </div>
    </MiniWrapper>
  );
};

export default Payment;
