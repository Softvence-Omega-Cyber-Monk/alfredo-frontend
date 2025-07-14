import ClientHeading from "@/components/reusable/ClientHeading";
import ArticleCard from '../reusable/ArticleCard';
import articleImage from "@/assets/articleImg.png";
import testimonealPerson from "@/assets/testimonailPerson.jpg";

const articles = [
  {
    id: "1",
    image: articleImage,
    lastUpdate: "20-June-2024",
    title: "Vacanza 101: How to travel without paying for accommodation",
    excerpt:
      "Vacanza is the first greek platform that brings to Greece exclusively the home exchange model. It has been proved to be very successful in other countries of Europe mainly for traveling without paying for accommodation, but also for forming bonds with new people...",
    author: {
      name: "Mr. Jhon Don",
      role: "Manager of IT",
      avatar: testimonealPerson,
    },
  },
  {
    id: "2",
    image: articleImage,
    lastUpdate: "10-July-2024",
    title: "The Rise of Remote Work and Digital Nomads",
    excerpt:
      "Discover how remote work is reshaping the job market and enabling more people to travel the world as digital nomads. Explore tools, platforms, and strategies used by professionals around the globe.",
    author: {
      name: "Sarah Khan",
      role: "Tech Journalist",
      avatar: testimonealPerson,
    },
  },
  {
    id: "3",
    image: articleImage,
    lastUpdate: "02-July-2024",
    title: "5 Ways to Stay Productive While Traveling",
    excerpt:
      "Balancing work and travel can be challenging. Here are 5 proven tips to remain productive on the go, from coworking spaces to time management tools.",
    author: {
      name: "David Lin",
      role: "Travel Blogger",
      avatar: testimonealPerson,
    },
  },]

const RelatedArticles = () => {
  return (
    <div>
      <ClientHeading headingText="Related" spanText="articles" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 md:mt-16 lg:mt-20">
      {articles.map((article) => (
        <ArticleCard key={article.id} {...article} />
      ))}
    </div>
     
    </div>
  );
};

export default RelatedArticles;
