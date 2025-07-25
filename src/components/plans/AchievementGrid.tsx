import ClientHeading from "@/components/reusable/ClientHeading";
import AchievementAccordion from "./AchievementAccordion";
import achievementsData from "../../lib/data/achievements";
import { useTranslation } from "react-i18next";

const AchievementGrid = () => {
  const { t } = useTranslation("bonus");
  return (
    <div>
      <ClientHeading
        headingText={t("bonus.achivement.title")}
        spanText={t("bonus.achivement.highlight")}
      />
      <p className="text-lg md:text-xl lg:text-2xl text-dark-3 font-regular text-center max-w-4xl mx-auto mb-10 mt-3">
        {t("bonus.achivement.subtitle")}
      </p>
      <AchievementAccordion items={achievementsData} />
    </div>
  );
};

export default AchievementGrid;

// import ClientHeading from "@/components/reusable/ClientHeading";
// import AchievementAccordion from "./AchievementAccordion";
// import achievementsData from "../../lib/data/achievements";

// const AchievementGrid = () => {
//   return (
//     <div>
//       <ClientHeading headingText="Achievement" spanText="Badges" />
//       <p className="text-lg md:text-xl lg:text-2xl text-dark-3 font-regular text-center max-w-4xl mx-auto mb-10 mt-3">
//         Unlock badges by completing activities and milestones .
//       </p>
//       <AchievementAccordion items={achievementsData} />
//     </div>
//   );
// };

// export default AchievementGrid;
