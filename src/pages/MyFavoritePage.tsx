import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import CommonWrapper from "@/common/CommonWrapper";
import { useTranslation } from "react-i18next";
import { Loader2 } from "lucide-react";
import { fetchFavorites } from "@/store/Slices/FavoritesSlice/favoritesSlice";
import { useNavigate } from "react-router-dom";
import FavoriteHeading from "@/components/my-favorite/FavoriteHeading";
import FavoriteGrid from "@/components/my-favorite/FavoriteGrid";

const MyFavoritePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { favorites, loading, error } = useAppSelector(
    (state) => state.favorites
  );
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { t } = useTranslation("favorites");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    dispatch(fetchFavorites());
  }, [dispatch, isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  if (loading) {
    return (
      <CommonWrapper>
        <div className="flex justify-center items-center min-h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary-blue" />
        </div>
      </CommonWrapper>
    );
  }

  if (error) {
    return (
      <CommonWrapper>
        <div className="text-center text-red-500 py-10">{error}</div>
      </CommonWrapper>
    );
  }

  return (
    <div className="mt-16">
      <CommonWrapper>
        <FavoriteHeading />

        {favorites.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-lg text-dark-3">{t("noFavorites")}</p>
          </div>
        ) : (
          <FavoriteGrid favorites={favorites} />
        )}
      </CommonWrapper>
    </div>
  );
};

export default MyFavoritePage;

// import CommonWrapper from "@/common/CommonWrapper";
// import FavoriteGrid from "@/components/my-favorite/FavoriteGrid";
// import FavoriteHeading from "@/components/my-favorite/FavoriteHeading";
// import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
// import { useNavigate } from "react-router-dom";

// const MyFavoritePage = () => {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const { favorites, loading, error } = useAppSelector(
//     (state) => state.favorites
//   );
//   return (
//     <div className="">
//       <CommonWrapper>
//         <div className="p-6">
//           <FavoriteHeading />
//           <FavoriteGrid favorites={favorites} />
//         </div>
//       </CommonWrapper>
//     </div>
//   );
// };

// export default MyFavoritePage;
