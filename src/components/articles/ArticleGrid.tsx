import { articles } from "@/lib/data/articles";
import ArticleCard from "../reusable/ArticleCard";
import { useTranslation } from "react-i18next";

const ArticleGrid = () => {
  const { t } = useTranslation("articles");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const isSubscribed = user?.isSubscribed;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 md:mt-16 lg:mt-20">
      {articles.map((article, index) => {
        const translatedTitle = t(article.title);
        const isReserved =
          translatedTitle.includes("(RESERVED TO MEMBERS)") ||
          translatedTitle.includes("(ΑΠΟΚΛΕΙΣΤΙΚΟ ΓΙΑ ΜΕΛΗ)");

        return (
          <ArticleCard
            key={index}
            {...article}
            isReserved={isReserved}
            isLocked={isReserved && !isSubscribed}
          />
        );
      })}
    </div>
  );
};

export default ArticleGrid;
