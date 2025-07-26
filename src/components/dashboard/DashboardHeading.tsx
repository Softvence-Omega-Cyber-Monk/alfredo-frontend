import { MoveRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface DashboardHeadingProps {
  onSubmit: () => void;
}

const DashboardHeading = ({ onSubmit }: DashboardHeadingProps) => {
  const { t } = useTranslation("dashboard");
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 text-center lg:text-left items-center justify-center gap-4">
      <div>
        <h1 className="font-semibold text-primary-blue text-3xl md:text-4xl lg:text-[40px]">
          {t("dashboard.title")}
        </h1>
        <p className="text-sm md:text-base text-dark-3 font-regular mt-3 max-w-[588px] mx-auto lg:mx-0">
          {t("dashboard.subtitle")}
        </p>
      </div>
      <div className="flex justify-center gap-4 lg:justify-end">
        <button
          onClick={onSubmit}
          className="relative overflow-hidden rounded-full hover:brightness-80 transition-colors text-sm md:text-base lg:text-lg font-medium cursor-pointer px-6 py-2 bg-primary-blue text-white flex items-center justify-center gap-2.5"
        >
          <p className="relative z-10">{t("dashboard.button1")}</p>
          <div className="absolute bottom-0 right-0 opacity-80 items-center justify-center overflow-hidden">
            <img src="/buttonHomeIcon.svg" alt="icon" className="w-full" />
          </div>
        </button>
        <Link
          to="/my-properties"
          className="relative overflow-hidden rounded-full hover:brightness-80 transition-colors text-sm md:text-base lg:text-lg font-medium cursor-pointer px-6 py-2 bg-primary-blue text-white flex items-center justify-center gap-2.5"
        >
          <p className="relative z-10">{t("dashboard.button2")}</p>
          <MoveRight className="relative z-10 w-5 h-5" />
          <div className="absolute bottom-0 right-0 opacity-80 items-center justify-center overflow-hidden">
            <img src="/buttonHomeIcon.svg" alt="icon" className="w-full" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default DashboardHeading;

// import { MoveRight } from "lucide-react";
// import { Link } from "react-router-dom";

// interface DashboardHeadingProps {
//   onSubmit: () => void;
// }

// const DashboardHeading = ({ onSubmit }: DashboardHeadingProps) => {
//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-2 text-center lg:text-left items-center justify-center gap-4">
//       <div>
//         <h1 className="font-semibold text-primary-blue text-3xl md:text-4xl lg:text-[40px]">
//           Hi JonDon,
//         </h1>
//         <p className="text-sm md:text-base text-dark-3 font-regular mt-3 max-w-[588px] mx-auto lg:mx-0">
//           You can preview how your home appears to others, make updates, and get
//           ready to welcome guests for a home exchange.
//         </p>
//       </div>
//       <div className="flex justify-center gap-4 lg:justify-end">
//         <button
//           onClick={onSubmit}
//           className="relative overflow-hidden rounded-full hover:brightness-80 transition-colors text-sm md:text-base lg:text-lg font-medium cursor-pointer px-6 py-2 bg-primary-blue text-white flex items-center justify-center gap-2.5"
//         >
//           <p className="relative z-10">Submit</p>
//           <div className="absolute bottom-0 right-0 opacity-80 items-center justify-center overflow-hidden">
//             <img src="/buttonHomeIcon.svg" alt="icon" className="w-full" />
//           </div>
//         </button>
//         <Link
//           to="/my-properties"
//           className="relative overflow-hidden rounded-full hover:brightness-80 transition-colors text-sm md:text-base lg:text-lg font-medium cursor-pointer px-6 py-2 bg-primary-blue text-white flex items-center justify-center gap-2.5"
//         >
//           <p className="relative z-10">My Properties</p>
//           <MoveRight className="relative z-10 w-5 h-5" />
//           <div className="absolute bottom-0 right-0 opacity-80 items-center justify-center overflow-hidden">
//             <img src="/buttonHomeIcon.svg" alt="icon" className="w-full" />
//           </div>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default DashboardHeading;
