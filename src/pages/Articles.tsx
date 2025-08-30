import CommonWrapper from "@/common/CommonWrapper";
import TopArticle from "../components/articles/TopArticle";
import ArticleGrid from "../components/articles/ArticleGrid";
import Testimonial from "@/components/reusable/Testimonial";
import { useTranslation } from "react-i18next";

const Articles = () => {
  const { t } = useTranslation("articles");

  return (
    <div className="">
      <CommonWrapper>
        <div>
          <h1 className="font-Grand-Hotel text-[96px] ml-4 text-primary-blue text-center">
            {t("articles.title")}
          </h1>
        </div>
        <div className="w-full mt-5">
          <div className="p-4 mt-10">
            <TopArticle />
            <ArticleGrid />
          </div>
        </div>
        <div>
          <Testimonial />
        </div>
      </CommonWrapper>
    </div>
  );
};

export default Articles;
