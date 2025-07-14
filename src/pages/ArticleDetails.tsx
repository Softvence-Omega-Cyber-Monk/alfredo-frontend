import { useParams } from "react-router-dom";
import articleImage from "@/assets/articleImg.png";
import testimonealPerson from "@/assets/testimonailPerson.jpg";
import PrimaryButton from "../components/reusable/PrimaryButton";
import RelatedArticles from "../components/articles/RelatedArticles";
import CommonWrapper from "@/common/CommonWrapper";
import Testimonial from '@/components/reusable/Testimonial';
import Breadcrumb from '../components/articles/Breadcrumb';

const allArticles = [
  {
    id: "1",
    image: articleImage,
    lastUpdate: "20-June-2024",
    title: "Vacanza 101...",
    content: "Full detailed content here...",
    author: {
      name: "Mr. Jhon Don",
      role: "Manager of IT",
      avatar: testimonealPerson,
    },
  },
  // ...other articles
];

const ArticleDetails = () => {
  const { id } = useParams();
  const article = allArticles.find((a) => a.id === id || a.id === "1"); // Fallback to first article if not found



  return (
    <div>
      <CommonWrapper>
        <div className="max-w-[996px] mx-auto px-4">
          <div className="mt-8 md:mt-12 lg:mt-16 mb-6 md:mb-8 lg:mb-10 text-center">
           <Breadcrumb
    items={[
      { label: "Article", href: "/articles" },
      { label: "Details" },
    ]}
  />
          </div>
          <p className="text-sm lg:text-base  mb-2 lg:mb-3 font-normal text-dark-3 text-center">
            Last Update: {article.lastUpdate}
          </p>
          <h1 className="text-2xl lg:text-[32px] font-medium text-primary-blue mb-6 lg:mb-8 max-w-[700px] mx-auto text-center">
            {article.title}
          </h1>
          <div className="relative">
            <img
              src={article.image}
              alt={article.title}
              className="rounded-2xl w-full"
            />
            <div className="p-4 bg-[#FFFFFFB2] backdrop-blur-[10px] flex items-center gap-4 absolute bottom-4 left-4 rounded-2xl">
              <img
                src={article.author.avatar}
                className="w-12 lg:w-16 h-12 lg:h-16 rounded-full object-cover object-center"
                alt={article.author.name}
              />
              <div className="flex flex-col gap-1">
                <h3 className="text-base lg:text-[20px] font-bold text-primary-blue">
                  {article.author.name}
                </h3>
                <p className="text-sm font-normal">{article.author.role}</p>
              </div>
            </div>
          </div>
          <div className="text-base lg:text-lg text-dark-3 font-normal py-6 md:py-8 lg:py-10">
            There are so many great reasons to travel in November. Some of us
            are eager to get in the spirit of the season, while others need a
            relaxing escape before the hectic holidays. A destination
            Thanksgiving celebration is also a great reason to getaway in
            November, or simply just enjoying fall foliage and the first
            snowfalls! There are so many great reasons to travel in November.{" "}
            <br />
            In November,{" "}
            <span className="text-primary-blue underline">New York City </span>
            transitions into the holiday season, and there is no place quite
            like it to immerse yourself in the magic of this time of year.
            Imagine roaming the iconic Central Park with its vibrant fall
            foliage and strolling down 5th Avenue to admire holiday window
            displays as they go up. The crisp air is invigorating, making you
            want to get out and explore all New York City has to offer,
            including world class museums, dining, shopping and entertainment.
            At Thanksgiving you can enjoy the famed Macy's Thanksgiving Day
            Parade, with its giant balloons soaring through the streets of
            Manhattan. November also marks the opening of the city's ice skating
            rinks, including the iconic rink at Rockefeller Center, where you
            can glide across the ice surrounded by the sparkling lights of the
            towering Christmas tree. Additionally, November offers the
            opportunity to get a head start on holiday shopping in renowned
            department stores or browse the unique boutiques in neighborhoods
            such as SoHo and Greenwich Village. <br /> Visiting Denver, Colorado
            in November offers a delightful combination of outdoor adventures
            and cultural experiences amidst the stunning Rocky Mountain scenery.
            Enjoy the autumn colors by embarking on breathtaking hikes in nearby
            areas such as Rocky Mountain National Park or take a scenic drive
            along the Peak to Peak Highway. In the city itself, you can explore
            the vibrant neighborhoods like LoDo (Lower Downtown) and RiNo (River
            North), which are home to numerous art galleries, craft breweries,
            and trendy eateries. <br /> As the holiday season approaches, Denver
            lights up with festive events and markets. The Denver Christkindl
            Market offers a taste of European holiday traditions with its
            charming wooden stalls selling crafts and culinary delights. For a
            unique experience, take a ride on the historic Denver Union
            Station's light rail and explore its trendy shops and restaurants.
            November also marks the start of the ski season, and you can hit the
            slopes at nearby ski resorts like Breckenridge or Winter Park.
          </div>

          <div className="text-center">
            <PrimaryButton title="Read More" />
          </div>
        </div>
        <div className=" mt-24 md:mt-32 lg:mt-36">
          <RelatedArticles />
        </div>
        <Testimonial/>
      </CommonWrapper>
    </div>
  );
};

export default ArticleDetails;
