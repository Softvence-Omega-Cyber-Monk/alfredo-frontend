import articleImage from "@/assets/articles/article-top.jpg";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import MarkdownContent from "@/components/reusable/MarkdownContent"; // ADD THIS

const TopArticle = () => {
  const { t } = useTranslation("articles");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 relative">
      <div className="absolute top-6 left-6">
        <p className="bg-[#001C4233] bg-blur-[8px] border border-[#F4F7FC] px-4 py-2 rounded-lg text-white">
          Latest Article
        </p>
      </div>
      <div className="lg:col-span-5 rounded-3xl overflow-hidden">
        <img src={articleImage} className="w-full object-cover h-full" alt="" />
      </div>
      <div className="lg:col-span-7 flex flex-col gap-8 lg:gap-4 justify-between text-dark-3">
        <div>
          <p className="text-sm lg:text-base font-normal mb-3">
            Last Update: 20-June-2024
          </p>
          <Link to="/articles/0">
            <h2 className="text-2xl lg:text-[32px] font-medium mb-4 text-primary-blue line-clamp-2">
              {t("articles.showcaseArticle.title")}
            </h2>
          </Link>
          {/* REPLACE THIS SECTION */}
          <div className="line-clamp-4 overflow-hidden">
            <MarkdownContent
              content={
                t("articles.showcaseArticle.description").split(
                  "other person."
                )[0]
              }
            />
          </div>

          {/* <div className="line-clamp-8 overflow-hidden">
            <MarkdownContent
              content={t("articles.showcaseArticle.description")}
            />
          </div> */}
          {/* END REPLACE */}
        </div>
      </div>
    </div>
  );
};

export default TopArticle;
