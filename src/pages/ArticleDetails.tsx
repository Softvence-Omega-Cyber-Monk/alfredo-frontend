import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CommonWrapper from "@/common/CommonWrapper";
import MarkdownContent from "@/components/reusable/MarkdownContent";
import { articleImages } from "@/services/articleAssets";

const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation("articles");

  // Get the article key based on ID
  // Since your JSON has "showcaseArticle", "firstArticle", "secondArticle"
  // Map the ID to the correct key
  const getArticleKey = (articleId: string | undefined) => {
    switch (articleId) {
      case "0":
        return "showcaseArticle";
      case "1":
        return "firstArticle";
      case "2":
        return "secondArticle";
      case "3":
        return "thirdArticle";
      case "4":
        return "fourthArticle";
      case "5":
        return "fifthArticle";
      case "6":
        return "sixthArticle";
      case "7":
        return "seventhArticle";
      case "8":
        return "eighthArticle";
      case "9":
        return "ninthArticle";
      case "10":
        return "tenthArticle";
      case "11":
        return "eleventhArticle";
      case "12":
        return "twelfthArticle";
      case "13":
        return "thirteenthArticle";
      case "14":
        return "fourteenthArticle";
      default:
        return "showcaseArticle";
    }
  };

  const articleKey = getArticleKey(id);
  const articleTitle = t(`articles.${articleKey}.title`);
  const articleContent = t(`articles.${articleKey}.description`);

  const image = articleImages[articleKey];

  return (
    <CommonWrapper>
      <div className="max-w-4xl mx-auto p-4 lg:p-8">
        <h1 className="text-4xl font-bold text-primary-blue mb-12">
          {articleTitle}
        </h1>

        {/* RENDER MARKDOWN CONTENT */}
        {image && (
          <img
            src={image}
            alt={articleTitle}
            className="w-full h-[600px] object-cover rounded-2xl mb-8"
          />
        )}
        <MarkdownContent content={articleContent} />
      </div>
    </CommonWrapper>
  );
};

export default ArticleDetail;
