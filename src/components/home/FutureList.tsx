// src/components/FutureList.tsx
import CommonWrapper from "@/common/CommonWrapper";
import ClientHeading from "../reusable/ClientHeading";
import CommonCard from "../reusable/CommonCard";
import PrimaryButton from "../reusable/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { useEffect } from "react";
import { fetchAllProperties } from "@/store/Slices/PropertySlice/propertySlice";
import { fetchFavorites } from "@/store/Slices/FavoritesSlice/favoritesSlice";

const FutureList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { allProperties } = useAppSelector((state) => state.property);

  console.log("All data ", allProperties);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { t } = useTranslation("futureList");

  useEffect(() => {
    dispatch(fetchAllProperties());

    // Fetch favorites if user is authenticated
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
          {allProperties.map((card) => (
            <CommonCard
              key={card.id}
              id={card.id}
              image={card.images?.[0]?.url || "/placeholder.jpg"}
              avatarImage={card.images?.[0]?.url || "/avatar-placeholder.png"}
              rating={"5.0"}
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

// // src/components/FutureList.tsx
// import CommonWrapper from "@/common/CommonWrapper";
// import ClientHeading from "../reusable/ClientHeading";
// import CommonCard from "../reusable/CommonCard";
// import PrimaryButton from "../reusable/PrimaryButton";
// import { useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
// import { useEffect } from "react";
// import { fetchAllProperties } from "@/store/Slices/PropertySlice/propertySlice";
// import { fetchFavorites } from "@/store/Slices/FavoritesSlice/favoritesSlice";

// const FutureList = () => {
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();
//   const { allProperties } = useAppSelector((state) => state.property);

//   console.log("All data ", allProperties);
//   const { isAuthenticated } = useAppSelector((state) => state.auth);
//   const { t } = useTranslation("futureList");

//   useEffect(() => {
//     dispatch(fetchAllProperties());

//     // Fetch favorites if user is authenticated
//     if (isAuthenticated) {
//       dispatch(fetchFavorites());
//     }
//   }, [dispatch, isAuthenticated]);

//   return (
//     <div className="mt-16">
//       <CommonWrapper>
//         <ClientHeading headingText={t("title")} spanText={t("highlight")} />
//         <p className="text-lg md:text-xl lg:text-2xl text-dark-3 font-regular text-center max-w-md mx-auto mb-10">
//           {t("para")}
//         </p>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
//           {Array.isArray(allProperties) && allProperties.length > 0 ? (
//             allProperties.map((card) => (
//               <CommonCard
//                 key={card.id}
//                 id={card.id}
//                 image={card.images?.[0]?.url || "/placeholder.jpg"}
//                 avatarImage={card.owner?.photo || "/avatar-placeholder.png"}
//                 rating={"5.0"}
//                 ownerName={card.owner?.fullName || "Unknown"}
//                 location={card.location}
//                 title={card.title}
//                 price={card.price}
//                 features={{
//                   beds: card.bedrooms,
//                   baths: card.bathrooms,
//                   sqft: Math.floor(card.size),
//                 }}
//                 onViewDetails={() => navigate(`/home-details/${card.id}`)}
//               />
//             ))
//           ) : (
//             <p className="text-center text-gray-500">No properties found</p>
//           )}
//         </div>

//         <div className="mt-8 flex justify-center">
//           <PrimaryButton
//             title={t("exploreMore")}
//             onClick={() => navigate("/")}
//           />
//         </div>
//       </CommonWrapper>
//     </div>
//   );
// };

// export default FutureList;

// // src/components/FutureList.tsx
// import CommonWrapper from "@/common/CommonWrapper";
// import ClientHeading from "../reusable/ClientHeading";
// import CommonCard from "../reusable/CommonCard";
// import PrimaryButton from "../reusable/PrimaryButton";
// import { useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
// import { useEffect } from "react";
// import { fetchAllProperties } from "@/store/Slices/PropertySlice/propertySlice";
// import { fetchFavorites } from "@/store/Slices/FavoritesSlice/favoritesSlice";

// const FutureList = () => {
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();
//   const { allProperties } = useAppSelector((state) => state.property);
//   console.log("up data ", allProperties);
//   const { isAuthenticated } = useAppSelector((state) => state.auth);
//   const { t } = useTranslation("futureList");

//   useEffect(() => {
//     dispatch(fetchAllProperties());

//     if (isAuthenticated) {
//       dispatch(fetchFavorites());
//     }
//   }, [dispatch, isAuthenticated]);

//   // Ensure it's always an array
//   const properties = Array.isArray(allProperties) ? allProperties : [];
//   console.log("below data ", properties);
//   return (
//     <div className="mt-16">
//       <CommonWrapper>
//         <ClientHeading headingText={t("title")} spanText={t("highlight")} />
//         <p className="text-lg md:text-xl lg:text-2xl text-dark-3 font-regular text-center max-w-md mx-auto mb-10">
//           {t("para")}
//         </p>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
//           {properties.map((card) => (
//             <CommonCard
//               key={card.id}
//               id={card.id}
//               image={card.images?.[0] || "/placeholder.jpg"}
//               avatarImage={card.owner?.photo || "/avatar-placeholder.png"}
//               rating={"5.0"}
//               ownerName={card.owner?.fullName || "Unknown"}
//               location={card.location}
//               title={card.title}
//               price={card.price}
//               features={{
//                 beds: card.bedrooms,
//                 baths: card.bathrooms,
//                 sqft: Math.floor(card.size),
//               }}
//               onViewDetails={() => navigate(`/home-details/${card.id}`)}
//             />
//           ))}
//         </div>

//         <div className="mt-8 flex justify-center">
//           <PrimaryButton
//             title={t("exploreMore")}
//             onClick={() => navigate("/")}
//           />
//         </div>
//       </CommonWrapper>
//     </div>
//   );
// };

// export default FutureList;

// import CommonWrapper from "@/common/CommonWrapper";
// import ClientHeading from "../reusable/ClientHeading";
// import CommonCard from "../reusable/CommonCard";
// import PrimaryButton from "../reusable/PrimaryButton";
// import { useNavigate } from "react-router-dom";
// // import { propertiess } from "@/lib/data/properties";
// import { useTranslation } from "react-i18next";
// import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
// import { useEffect } from "react";
// import { fetchAllProperties } from "@/store/Slices/PropertySlice/propertySlice";

// const FutureList = () => {
//   const navigate = useNavigate();

//   const dispatch = useAppDispatch();
//   const { allProperties } = useAppSelector((state) => state.property);
//   console.log("properties", allProperties);

//   useEffect(() => {
//     dispatch(fetchAllProperties());
//   }, [dispatch]);

//   console.log("myProperties", allProperties);

//   const { t } = useTranslation("futureList");

//   return (
//     <div className="mt-16">
//       <CommonWrapper>
//         <ClientHeading headingText={t("title")} spanText={t("highlight")} />
//         <p className="text-lg md:text-xl lg:text-2xl text-dark-3 font-regular text-center max-w-md mx-auto mb-10">
//           {t("para")}
//         </p>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
//           {allProperties.map((card) => (
//             <CommonCard
//               key={card.id}
//               id={card.id}
//               image={card.images[0] || "/placeholder.jpg"} // backend returns `images: []`
//               avatarImage={card.owner?.photo || "/avatar-placeholder.png"}
//               rating={"5.0"} // your backend doesn’t send ratings → fake it for now
//               ownerName={card.owner?.fullName || "Unknown"}
//               location={card.location}
//               title={card.title}
//               price={card.price}
//               features={{
//                 beds: card.bedrooms,
//                 baths: card.bathrooms,
//                 sqft: Math.floor(card.size),
//               }}
//               onViewDetails={() => navigate(`/home-details/${card.id}`)}
//             />
//           ))}
//         </div>
//         <div className="mt-8 flex justify-center">
//           <PrimaryButton
//             title={t("exploreMore")}
//             onClick={() => navigate("/")}
//           />
//         </div>
//       </CommonWrapper>
//     </div>
//   );
// };

// export default FutureList;
