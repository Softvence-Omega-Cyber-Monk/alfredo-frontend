import CommonWrapper from "@/common/CommonWrapper";
import ClientHeading from "../reusable/ClientHeading";
import CommonCard from "../reusable/CommonCard";
import PrimaryButton from "../reusable/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { properties } from "@/lib/data/properties";
import { useTranslation } from "react-i18next";

const FutureList = () => {
  const navigate = useNavigate();

  const { t } = useTranslation("futureList");

  return (
    <div className="mt-16">
      <CommonWrapper>
        <ClientHeading headingText={t("title")} spanText={t("highlight")} />
        <p className="text-lg md:text-xl lg:text-2xl text-dark-3 font-regular text-center max-w-md mx-auto mb-10">
          {t("para")}
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
          <PrimaryButton
            title={t("exploreMore")}
            onClick={() => navigate("/")}
          />
        </div>
      </CommonWrapper>
    </div>
  );
};

export default FutureList;
