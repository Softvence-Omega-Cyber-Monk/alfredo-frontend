import { Link } from "react-router-dom";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Lock } from "lucide-react";
import MarkdownContent from "./MarkdownContent"; // ADD THIS

interface ArticleProps {
  id: string;
  image: string;
  lastUpdate: string;
  title: string;
  excerpt: string;
  isReserved?: boolean;
  isLocked?: boolean;
}

const ArticleCard: FC<ArticleProps> = ({
  id,
  image,
  title,
  excerpt,
  isLocked = false,
}) => {
  const { t } = useTranslation("articles");
  const targetLink = isLocked ? "/plans" : `/articles/${id}`;

  return (
    <Link to={targetLink} className="block">
      <div
        className={`border border-[#F4F7FC] rounded-xl lg:rounded-3xl overflow-hidden relative transition-all ease-in-out duration-300 
        ${
          isLocked
            ? "opacity-70 hover:opacity-80"
            : "hover:border-[#75A2DE] hover:shadow-[0_0_25px_0_#B9D7FF] hover:bg-[#EAF1FA]/40"
        }
        bg-transparent`}
      >
        <div className="absolute bottom-0 right-0 -z-10">
          <img src="/articleHomeIcon.svg" alt="" />
        </div>

        <div className="rounded-xl lg:rounded-3xl overflow-hidden relative">
          <img
            src={image}
            className="w-full lg:h-[388px] object-cover"
            alt={title}
          />

          {isLocked && (
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white text-center p-4">
              <Lock className="w-10 h-10 mb-2" />
              <p className="text-sm font-medium">
                Subscribe to unlock this article
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between gap-8 text-dark-3 p-4 lg:p-6">
          <div>
            <h2 className="text-2xl font-medium mb-3 text-primary-blue line-clamp-2 h-[64px]">
              {t(title)}
            </h2>
            {/* REPLACE THIS SECTION */}
            <div className="line-clamp-4 overflow-hidden">
              <MarkdownContent content={t(excerpt)} />
            </div>
            {/* END REPLACE */}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
