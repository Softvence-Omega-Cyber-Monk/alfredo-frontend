import CommonWrapper from "@/common/CommonWrapper";
import ClientHeading from "../reusable/ClientHeading";
import CommonCard from "../reusable/CommonCard";
import PrimaryButton from "../reusable/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { properties } from "@/lib/data/properties";

const FutureList = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-16">
      <CommonWrapper>
        <ClientHeading headingText="Our Future" spanText="list" />
        <p className="text-lg md:text-xl lg:text-2xl text-dark-3 font-regular text-center max-w-md mx-auto mb-10">
          Over 360,000 homes and apartments available for an exchange
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {properties.map((card) => (
            <CommonCard
              key={card.id}
              {...card}
              onViewDetails={() => {
                navigate(`/home-details/${card.id}`);
              }}
            />
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <PrimaryButton title="Explore All" onClick={() => navigate("/")} />
        </div>
      </CommonWrapper>
    </div>
  );
};

export default FutureList;
