import { MoveRight } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import AddPlaceModal from "../modals/AddPlaceModal";

// interface DashboardHeadingProps {
//   onSubmit: () => void;
// }
// const DashboardHeading = ({ onSubmit }: DashboardHeadingProps) => {

const DashboardHeading = () => {
  const { t } = useTranslation("dashboard");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleAddPlace = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // const handleFormSubmit = (data: any) => {
  //   console.log("Payload to send:", data);
  //   // TODO: call your backend API here
  // };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 text-center lg:text-left items-center justify-center gap-4">
      <div>
        <h1 className="font-semibold text-primary-blue text-3xl md:text-4xl lg:text-[40px]">
          {t("dashboard.title")} Mahim,
        </h1>
        <p className="text-sm md:text-base text-dark-3 font-regular mt-3 max-w-[588px] mx-auto lg:mx-0">
          {t("dashboard.subtitle")}
        </p>
      </div>
      <div className="flex justify-center gap-4 lg:justify-end">
        <div className="lg:flex flex-col gap-3">
          <button
            onClick={() => {
              handleAddPlace();
            }}
            className="relative overflow-hidden rounded-full hover:brightness-80 transition-colors text-sm md:text-base lg:text-lg font-medium cursor-pointer px-6 py-2 bg-primary-blue text-white flex items-center justify-center gap-2.5"
          >
            <p className="relative z-10">{t("dashboard.button1")}</p>
            <div className="absolute bottom-0 right-0 opacity-80 items-center justify-center overflow-hidden">
              <img src="/buttonHomeIcon.svg" alt="icon" className="w-full" />
            </div>
          </button>
          {/* favorite places button  */}
          <Link
            to="/my-favorite"
            className="relative overflow-hidden rounded-full hover:brightness-80 transition-colors text-sm md:text-base lg:text-lg font-medium cursor-pointer px-6 py-2 bg-primary-blue text-white flex items-center justify-center gap-2.5"
          >
            <p className="relative z-10">{t("dashboard.button2")}</p>
            {/* <MoveRight className="relative z-10 w-5 h-5" /> */}
            <div className="absolute bottom-0 right-0 opacity-80 items-center justify-center overflow-hidden">
              <img src="/buttonHomeIcon.svg" alt="icon" className="w-full" />
            </div>
          </Link>
        </div>
        <div className="lg:flex flex-col gap-3">
          {/* my places button  */}
          <Link
            to="/my-properties"
            className="relative overflow-hidden rounded-full hover:brightness-80 transition-colors text-sm md:text-base lg:text-lg font-medium cursor-pointer px-6 py-2 bg-primary-blue text-white flex items-center justify-center gap-2.5"
          >
            <p className="relative z-10">{t("dashboard.button4")}</p>
            <MoveRight className="relative z-10 w-5 h-5" />
            <div className="absolute bottom-0 right-0 opacity-80 items-center justify-center overflow-hidden">
              <img src="/buttonHomeIcon.svg" alt="icon" className="w-full" />
            </div>
          </Link>
          {/* Exchange Request button  */}
          <Link to="/exchange-request">
            <button
              onClick={() => {}}
              className="relative overflow-hidden rounded-full hover:brightness-80 transition-colors text-sm md:text-base lg:text-lg font-medium cursor-pointer px-6 py-2 bg-primary-blue text-white flex items-center justify-center gap-2.5"
            >
              <p className="relative z-10">{t("dashboard.button3")}</p>
              <div className="absolute bottom-0 right-0 opacity-80 items-center justify-center overflow-hidden">
                <img src="/buttonHomeIcon.svg" alt="icon" className="w-full" />
              </div>
            </button>
          </Link>
        </div>
      </div>
      <AddPlaceModal isOpen={isModalOpen} onClose={handleModalClose} />
    </div>
  );
};

export default DashboardHeading;
