import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface ArticleDescriptionProps {
  text: string;
}

const ArticleDescription: React.FC<ArticleDescriptionProps> = ({ text }) => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  // Define keywords for English and Greek
  const keyword = lang === "el" ? "ΕΔΩ" : "HERE";

  if (!text.includes(keyword)) {
    return <p className="whitespace-pre-line">{text}</p>;
  }

  // Split before and after the keyword
  const [beforeText] = text.split(keyword);

  return (
    <p className="whitespace-pre-line">
      {beforeText}
      <Link
        to="/plans"
        className="text-primary-blue underline font-semibold hover:text-blue-700"
      >
        {keyword}
      </Link>
    </p>
  );
};

export default ArticleDescription;
