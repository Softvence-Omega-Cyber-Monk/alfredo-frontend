import CommonWrapper from "@/common/CommonWrapper";
import ClientHeading from "../reusable/ClientHeading";
import CommonCard from "../reusable/CommonCard";
import PrimaryButton from "../reusable/PrimaryButton";
import { useNavigate } from "react-router-dom";
// import { propertiess } from "@/lib/data/properties";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { useEffect } from "react";
import { fetchAllProperties } from "@/store/Slices/PropertySlice/propertySlice";

const FutureList = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { allProperties } = useAppSelector((state) => state.property);
  console.log("properties", allProperties);

  useEffect(() => {
    dispatch(fetchAllProperties());
  }, [dispatch]);

  console.log("myProperties", allProperties);

  const { t } = useTranslation("futureList");

  return (
    <div className="mt-16">
      <CommonWrapper>
        <ClientHeading headingText={t("title")} spanText={t("highlight")} />
        <p className="text-lg md:text-xl lg:text-2xl text-dark-3 font-regular text-center max-w-md mx-auto mb-10">
          {t("para")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {allProperties.map((card) => (
            <CommonCard
              key={card.id}
              id={card.id}
              image={card.images[0] || "/placeholder.jpg"} // backend returns `images: []`
              avatarImage={card.owner?.photo || "/avatar-placeholder.png"}
              rating={"5.0"} // your backend doesn’t send ratings → fake it for now
              ownerName={card.owner?.fullName || "Unknown"}
              location={card.location}
              title={card.title}
              price={card.price}
              features={{
                beds: card.bedrooms,
                baths: card.bathrooms,
                sqft: Math.floor(card.size),
              }}
              onViewDetails={() => navigate(`/home-details/${card.id}`)}
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
