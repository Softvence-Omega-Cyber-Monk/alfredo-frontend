import MiniWrapper from "@/common/MiniWrapper";
import { Button } from "../ui/button";

const Payment = () => {
  return (
    <MiniWrapper>
      <div className="space-y-8">
        <div>
          <Button className="w-full text-2xl font-DM-sans flex h-14 justify-center items-center gap-2 self-stretch rounded-xl bg-[var(--Primary-P-25,#F4F7FC)] text-[var(--color-primary-blue)] hover:bg-[#e1e9f5] transition-colors duration-200 cursor-pointer">
            Payment Setup
          </Button>
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
