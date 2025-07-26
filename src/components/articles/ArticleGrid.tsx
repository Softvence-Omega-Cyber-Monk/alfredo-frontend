import { articles } from "@/lib/data/articles";
import ArticleCard from "../reusable/ArticleCard";

const ArticleGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 md:mt-16 lg:mt-20">
      {articles.map((article, index) => (
        <ArticleCard key={index} {...article} />
      ))}
    </div>
  );
};

export default ArticleGrid;
