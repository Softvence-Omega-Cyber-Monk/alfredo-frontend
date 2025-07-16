import { Link } from "react-router-dom";
import { FC } from "react";

interface ArticleProps {
  id: string;
  image: string;
  lastUpdate: string;
  title: string;
  excerpt: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
}

const ArticleCard: FC<ArticleProps> = ({
  id,
  image,
  lastUpdate,
  title,
  excerpt,
  author,
}) => {
  return (
    <Link to={`/articles/${id}`} className="block">
      <div
        className="border border-[#F4F7FC] rounded-xl lg:rounded-3xl overflow-hidden relative hover:border-[#75A2DE] hover:shadow-[0_0_25px_0_#B9D7FF] transition-all ease-in-out duration-300 bg-transparent hover:bg-[#EAF1FA]/40 "
      >
        <div className="absolute bottom-0 right-0 -z-10">
          <img src="/articleHomeIcon.svg" alt="" />
        </div>
        <div className="rounded-xl lg:rounded-3xl overflow-hidden">
          <img
            src={image}
            className="w-full lg:h-[388px] object-cover"
            alt={title}
          />
        </div>
        <div className="flex flex-col gap-8 text-dark-3 p-4 lg:p-6">
          <div>
            <p className="text-base mb-4">Last Update: {lastUpdate}</p>
            <h2 className="text-2xl font-medium mb-3 text-primary-blue line-clamp-2">
              {title}
            </h2>
            <p className="text-base mb-3 line-clamp-4">{excerpt}</p>
          </div>
          <div className="flex items-center gap-4">
            <img
              src={author.avatar}
              className="w-12 h-12 rounded-full object-cover"
              alt={author.name}
            />
            <div>
              <h3 className="text-lg font-bold text-primary-blue">
                {author.name}
              </h3>
              <p className="text-sm">{author.role}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
