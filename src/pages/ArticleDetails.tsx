import { useParams } from "react-router-dom";
// import PrimaryButton from "../components/reusable/PrimaryButton";
// import RelatedArticles from "../components/articles/RelatedArticles";
import CommonWrapper from "@/common/CommonWrapper";
import Testimonial from "@/components/reusable/Testimonial";
import Breadcrumb from "../components/articles/Breadcrumb";
import { useTranslation } from "react-i18next";
import { articles } from "@/lib/data/articles";
import ArticleDescription from "@/components/articles/ArticleDescription";

// const allArticles = [
//   {
//     id: "1",
//     image: articleImage,
//     lastUpdate: "20-June-2024",
//     title: "Vacanza 101: How to travel without paying for accommodation",
//     excerpt:
//       "Vacanza is the first greek platform that brings to Greece exclusively the home exchange model. It has been proved to be very successful in other countries of Europe mainly for traveling without paying for accommodation, but also for forming bonds with new people...",
//     author: {
//       name: "Mr. Jhon Don",
//       role: "Manager of IT",
//       avatar: testimonealPerson,
//     },
//   },
//   // ...other articles
// ];

const ArticleDetails = () => {
  const { id } = useParams();
  const article = articles.find((a) => a.id === id) ?? articles[0];
  const { t } = useTranslation("articles");

  // console.log(article, "article details");

  return (
    <div>
      <CommonWrapper>
        <div className="max-w-[996px] mx-auto px-4">
          <div className="mt-8 md:mt-12 lg:mt-16 mb-6 md:mb-8 lg:mb-10 text-center">
            <Breadcrumb
              items={[
                { label: "Articles", href: "/articles" },
                { label: "Details" },
              ]}
            />
          </div>
          <h1 className="text-2xl lg:text-[32px] font-medium text-primary-blue mb-6 lg:mb-8 max-w-[700px] mx-auto text-center">
            {t(article.title)}
          </h1>
          <div className="relative">
            <img
              src={article.image}
              alt={article.title}
              className="rounded-2xl w-full"
            />
          </div>
          <div className="text-base lg:text-lg text-dark-3 font-normal py-6 md:py-8 lg:py-10">
            <ArticleDescription text={t(article.excerpt)} />
          </div>

          {/* <div className="text-center">
            <PrimaryButton title="Read More" />
          </div> */}
        </div>
        <div className=" mt-24 md:mt-32 lg:mt-36">
          {/* <RelatedArticles /> */}
        </div>
        <Testimonial />
      </CommonWrapper>
    </div>
  );
};

export default ArticleDetails;
