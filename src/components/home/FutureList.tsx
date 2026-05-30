// src/components/FutureList.tsx
import CommonWrapper from "@/common/CommonWrapper";
import ClientHeading from "../reusable/ClientHeading";
import CommonCard from "../reusable/CommonCard";
import PrimaryButton from "../reusable/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { useEffect } from "react";
import {
  fetchFeaturedProperties,
  fetchMyProperties,
} from "@/store/Slices/PropertySlice/propertySlice";
import { fetchFavorites } from "@/store/Slices/FavoritesSlice/favoritesSlice";

const FutureList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { featuredProperties } = useAppSelector((state) => state.property);

  const displayProperties = featuredProperties;

  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { t } = useTranslation("futureList");

  const storedUser = localStorage.getItem("user");
  const currentUser = storedUser ? JSON.parse(storedUser) : null;
  const isUserSubscribed = currentUser?.isSubscribed || false;

  useEffect(() => {
    dispatch(fetchFeaturedProperties());
    dispatch(fetchMyProperties());

    if (isAuthenticated) {
      dispatch(fetchFavorites());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <div className="mt-16">
      <CommonWrapper>
        <ClientHeading headingText={t("title")} spanText={t("highlight")} />
        <p className="text-lg md:text-xl lg:text-2xl text-dark-3 font-regular text-center max-w-md mx-auto mb-10">
          {t("para")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {displayProperties.map((card: any) => (
            <CommonCard
              key={card.id}
              id={card.id}
              image={card.images?.[0]?.url || "/placeholder.jpg"}
              coverImage={card.coverImage}
              avatarImage={card.images?.[0]?.url || "/avatar-placeholder.png"}
              rating={"5.0"}
              ownerName={
                isUserSubscribed
                  ? card.owner?.fullName || "Unknown"
                  : (card.owner?.fullName || "Unknown").split(" ")[0]
              }
              location={card.location}
              title={card.title}
              price={card.price}
              features={{
                maxPeople: card.maxPeople,
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
            onClick={() => {
              if (isUserSubscribed) {
                navigate("/places");
              } else {
                navigate("/signup");
              }
            }}
          />
        </div>
      </CommonWrapper>
    </div>
  );
};

export default FutureList;
