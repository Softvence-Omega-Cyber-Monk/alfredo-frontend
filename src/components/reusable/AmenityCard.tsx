import { useTranslation } from "react-i18next";

interface AmenityItem {
  icon: string;
  title: string;
  greek_name: string;
}

const AmenityCard = ({ icon, title, greek_name }: AmenityItem) => {
  const { i18n } = useTranslation();

  const currentLanguage = i18n.language;

  return (
    <div className="rounded-2xl">
      <div className="flex gap-2 items-center ">
        <img src={icon} className="w-5 h-5  md:w-8 md:h-8" alt={title} />
        {currentLanguage === "en" ? (
          <h3 className="text-base md:text-xl font-regular text-dark-2">
            {title}
          </h3>
        ) : (
          <h3 className="text-base md:text-xl font-regular text-dark-2">
            {greek_name}
          </h3>
        )}
        {/* <h3 className="text-base md:text-xl font-regular text-dark-2">
          {title}
        </h3> */}
      </div>
    </div>
  );
};

export default AmenityCard;
