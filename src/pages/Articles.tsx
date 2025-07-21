import CommonWrapper from "@/common/CommonWrapper";
import { useState } from "react";
import TopArticle from "../components/articles/TopArticle";
import ArticleGrid from "../components/articles/ArticleGrid";
import Testimonial from "@/components/reusable/Testimonial";

const Articles = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      id: 0,
      label: "Topic Name 1",
      content: (
        <div>
          <TopArticle />
          <ArticleGrid />
        </div>
      ),
    },
    {
      id: 1,
      label: "Topic Name 2",
      content: (
        <div>
          <TopArticle />
          <ArticleGrid />
        </div>
      ),
    },
    {
      id: 2,
      label: "Topic Name 3",
      content: (
        <div>
          <TopArticle />
          <ArticleGrid />
        </div>
      ),
    },
    {
      id: 3,
      label: "Topic Name 4",
      content: (
        <div>
          <TopArticle />
          <ArticleGrid />
        </div>
      ),
    },
    {
      id: 4,
      label: "Topic Name 5",
      content: (
        <div>
          <TopArticle />
          <ArticleGrid />
        </div>
      ),
    },
    {
      id: 5,
      label: "Topic Name 6",
      content: (
        <div>
          <TopArticle />
          <ArticleGrid />
        </div>
      ),
    },
  ];
  return (
    <div className="">
      <CommonWrapper>
        <div>
          <h1 className="font-Grand-Hotel text-[96px] ml-4 text-primary-blue text-center">
            Articles
          </h1>
          <p className="mx-auto text-center text-basic-dark">
            Explore our most frequently asked questions to understand how
            Vacanza works, how to get started, and how we ensure a safe and
            trusted travel experience for all our members.
          </p>
        </div>

        {/* tab component  */}
        <div className="w-full mt-5">
          <div className=" grid grid-cols-3 md:flex border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`w-full py-2 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-primary-gray-bg border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="p-4 mt-10">{tabs[activeTab].content}</div>
        </div>
        <div>
          <Testimonial />
        </div>
      </CommonWrapper>
    </div>
  );
};

export default Articles;
