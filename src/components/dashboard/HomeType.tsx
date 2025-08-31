import home from "@/assets/icons/Home.svg";
import apartment from "@/assets/icons/open-door.svg";
import residence from "@/assets/icons/building-three.svg";
import casual from "@/assets/icons/city-one.svg";
import { useTranslation } from "react-i18next";

interface HomeTypeProps {
  homeType: "home" | "apartment" | null;
  residenceType: "main" | "occasional" | null;
  onHomeTypeChange: (homeType: "home" | "apartment") => void;
  onResidenceTypeChange: (residenceType: "main" | "occasional") => void;
}

const HomeType = ({
  homeType,
  residenceType,
  onHomeTypeChange,
  onResidenceTypeChange,
}: HomeTypeProps) => {
  const { t } = useTranslation("dashboard");
  return (
    <div>
      <div className="mt-10">
        <h2 className="text-2xl text-primary-blue font-semibold">
          {t("dashboard.part2.title1")}
        </h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 ">
          <div
            onClick={() => onHomeTypeChange("home")}
            className={`p-6 flex flex-col gap-2.5 border rounded-lg cursor-pointer transition-all ${
              homeType === "home"
                ? "border-primary-blue bg-[#F4F7FC] shadow-[0_0_24px_0_rgba(49,116,205,0.25)]"
                : "border-[#EAF1FA] hover:bg-[#F4F7FC] hover:border-primary-blue"
            }`}
          >
            <div className="flex items-center gap-2 ">
              <img src={home} alt="" />
              <p
                className={`text-lg font-medium ${
                  homeType === "home"
                    ? "text-primary-blue"
                    : "text-primary-blue"
                }`}
              >
                {t("dashboard.part2.card1.miniTitle1")}
              </p>
            </div>
            <p className="text-base text-dark-3 font-regular">
              {t("dashboard.part2.card1.subtitle1")}
            </p>
          </div>

          <div
            onClick={() => onHomeTypeChange("apartment")}
            className={`p-6 flex flex-col gap-2.5 border rounded-lg cursor-pointer transition-all ${
              homeType === "apartment"
                ? "border-primary-blue bg-[#F4F7FC] shadow-[0_0_24px_0_rgba(49,116,205,0.25)]"
                : "border-[#EAF1FA] hover:bg-[#F4F7FC] hover:border-primary-blue"
            }`}
          >
            <div className="flex items-center gap-2 ">
              <img src={apartment} alt="" />
              <p
                className={`text-lg font-medium ${
                  homeType === "apartment"
                    ? "text-primary-blue"
                    : "text-primary-blue"
                }`}
              >
                {t("dashboard.part2.card1.miniTitle2")}
              </p>
            </div>
            <p className="text-base text-dark-3 font-regular">
              {t("dashboard.part2.card1.subtitle2")}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl text-primary-blue font-semibold">
          {t("dashboard.part2.title2")}
        </h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 ">
          <div
            onClick={() => onResidenceTypeChange("main")}
            className={`p-6 flex flex-col gap-2.5 border rounded-lg cursor-pointer transition-all ${
              residenceType === "main"
                ? "border-primary-blue bg-[#F4F7FC] shadow-[0_0_24px_0_rgba(49,116,205,0.25)]"
                : "border-[#EAF1FA] hover:bg-[#F4F7FC] hover:border-primary-blue"
            }`}
          >
            <div className="flex items-center gap-2 ">
              <img src={residence} alt="" />
              <p
                className={`text-lg font-medium ${
                  residenceType === "main"
                    ? "text-primary-blue"
                    : "text-primary-blue"
                }`}
              >
                {t("dashboard.part2.card2.miniTitle1")}
              </p>
            </div>
            <p className="text-base text-dark-3 font-regular">
              {t("dashboard.part2.card2.subtitle1")}
            </p>
          </div>

          <div
            onClick={() => onResidenceTypeChange("occasional")}
            className={`p-6 flex flex-col gap-2.5 border rounded-lg cursor-pointer transition-all ${
              residenceType === "occasional"
                ? "border-primary-blue bg-[#F4F7FC] shadow-[0_0_24px_0_rgba(49,116,205,0.25)]"
                : "border-[#EAF1FA] hover:bg-[#F4F7FC] hover:border-primary-blue"
            }`}
          >
            <div className="flex items-center gap-2 ">
              <img src={casual} alt="" />
              <p
                className={`text-lg font-medium ${
                  residenceType === "occasional"
                    ? "text-primary-blue"
                    : "text-primary-blue"
                }`}
              >
                {t("dashboard.part2.card2.miniTitle2")}
              </p>
            </div>
            <p className="text-base text-dark-3 font-regular">
              {t("dashboard.part2.card2.subtitle2")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeType;

// import home from "@/assets/icons/Home.svg";
// import apartment from "@/assets/icons/open-door.svg";
// import residence from "@/assets/icons/building-three.svg";
// import casual from "@/assets/icons/city-one.svg";

// interface HomeTypeProps {
//   homeType: "home" | "apartment" | null;
//   residenceType: "main" | "occasional" | null;
//   onHomeTypeChange: (homeType: "home" | "apartment") => void;
//   onResidenceTypeChange: (residenceType: "main" | "occasional") => void;
// }

// const HomeType = ({
//   homeType,
//   residenceType,
//   onHomeTypeChange,
//   onResidenceTypeChange,
// }: HomeTypeProps) => {
//   return (
//     <div>
//       <div className="mt-10">
//         <h2 className="text-2xl text-primary-blue font-semibold">
//           What is your home like?
//         </h2>
//         <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 ">
//           <div
//             onClick={() => onHomeTypeChange("home")}
//             className={`p-6 flex flex-col gap-2.5 border rounded-lg cursor-pointer transition-all ${
//               homeType === "home"
//                 ? "border-primary-blue bg-[#F4F7FC] shadow-[0_0_24px_0_rgba(49,116,205,0.25)]"
//                 : "border-[#EAF1FA] hover:bg-[#F4F7FC] hover:border-primary-blue"
//             }`}
//           >
//             <div className="flex items-center gap-2 ">
//               <img src={home} alt="" />
//               <p
//                 className={`text-lg font-medium ${
//                   homeType === "home"
//                     ? "text-primary-blue"
//                     : "text-primary-blue"
//                 }`}
//               >
//                 Home
//               </p>
//             </div>
//             <p className="text-base text-dark-3 font-regular">
//               Your home is an independent property.
//             </p>
//           </div>

//           <div
//             onClick={() => onHomeTypeChange("apartment")}
//             className={`p-6 flex flex-col gap-2.5 border rounded-lg cursor-pointer transition-all ${
//               homeType === "apartment"
//                 ? "border-primary-blue bg-[#F4F7FC] shadow-[0_0_24px_0_rgba(49,116,205,0.25)]"
//                 : "border-[#EAF1FA] hover:bg-[#F4F7FC] hover:border-primary-blue"
//             }`}
//           >
//             <div className="flex items-center gap-2 ">
//               <img src={apartment} alt="" />
//               <p
//                 className={`text-lg font-medium ${
//                   homeType === "apartment"
//                     ? "text-primary-blue"
//                     : "text-primary-blue"
//                 }`}
//               >
//                 Apartment
//               </p>
//             </div>
//             <p className="text-base text-dark-3 font-regular">
//               our home is in a building shared by several apartments.
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="mt-10">
//         <h2 className="text-2xl text-primary-blue font-semibold">
//           Is it your main residence?
//         </h2>
//         <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 ">
//           <div
//             onClick={() => onResidenceTypeChange("main")}
//             className={`p-6 flex flex-col gap-2.5 border rounded-lg cursor-pointer transition-all ${
//               residenceType === "main"
//                 ? "border-primary-blue bg-[#F4F7FC] shadow-[0_0_24px_0_rgba(49,116,205,0.25)]"
//                 : "border-[#EAF1FA] hover:bg-[#F4F7FC] hover:border-primary-blue"
//             }`}
//           >
//             <div className="flex items-center gap-2 ">
//               <img src={residence} alt="" />
//               <p
//                 className={`text-lg font-medium ${
//                   residenceType === "main"
//                     ? "text-primary-blue"
//                     : "text-primary-blue"
//                 }`}
//               >
//                 Yes, I live there all year round
//               </p>
//             </div>
//             <p className="text-base text-dark-3 font-regular">
//               Your home is an independent property.
//             </p>
//           </div>

//           <div
//             onClick={() => onResidenceTypeChange("occasional")}
//             className={`p-6 flex flex-col gap-2.5 border rounded-lg cursor-pointer transition-all ${
//               residenceType === "occasional"
//                 ? "border-primary-blue bg-[#F4F7FC] shadow-[0_0_24px_0_rgba(49,116,205,0.25)]"
//                 : "border-[#EAF1FA] hover:bg-[#F4F7FC] hover:border-primary-blue"
//             }`}
//           >
//             <div className="flex items-center gap-2 ">
//               <img src={casual} alt="" />
//               <p
//                 className={`text-lg font-medium ${
//                   residenceType === "occasional"
//                     ? "text-primary-blue"
//                     : "text-primary-blue"
//                 }`}
//               >
//                 Nor I go there occasionally
//               </p>
//             </div>
//             <p className="text-base text-dark-3 font-regular">
//               Your home is in a building shared by several apartments.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomeType;
