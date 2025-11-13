import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface ArticleDescriptionProps {
  text: string;
}

const ArticleDescription: React.FC<ArticleDescriptionProps> = ({ text }) => {
  const { i18n } = useTranslation();

  // Match patterns like <Link:/plans>BASIC</Link>
  const linkRegex = /<Link:([^>]+)>(.*?)<\/Link>/g;

  const parts: (string | { path: string; label: string })[] = [];
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    const [fullMatch, path, label] = match;
    const start = match.index;

    if (start > lastIndex) {
      parts.push(text.substring(lastIndex, start));
    }

    parts.push({ path, label });
    lastIndex = start + fullMatch.length;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return (
    <p className="whitespace-pre-line">
      {parts.map((part, index) =>
        typeof part === "string" ? (
          part
        ) : (
          <Link
            key={index}
            to={
              part.path.startsWith("/")
                ? part.path
                : /^\d+$/.test(part.path)
                ? `/articles/${part.path}`
                : `/${part.path}`
            }
            className="text-primary-blue underline font-semibold hover:text-blue-700"
          >
            {part.label}
          </Link>
        )
      )}
    </p>
  );
};

export default ArticleDescription;
