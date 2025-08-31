import CommonWrapper from "@/common/CommonWrapper";
import { useState } from "react";
import ChangePassword from "./ChangePassword";
import Notification from "./Notification";
import Language from "./Language";
import Payment from "./Payment";
import { useTranslation } from "react-i18next";

const ProfileTab = () => {
  const [activeTab, setActiveTab] = useState(0);

  const { t } = useTranslation("settings");

  const tabs = [
    {
      id: 0,
      label: t("settings.password.title"),
      content: (
        <>
          <ChangePassword />
        </>
      ),
    },
    {
      id: 1,
      label: t("settings.notification.title"),
      content: (
        <>
          <Notification />
        </>
      ),
    },
    {
      id: 2,
      label: t("settings.language.title"),
      content: (
        <>
          <Language />
        </>
      ),
    },
    {
      id: 3,
      label: t("settings.payment.title"),
      content: (
        <>
          <Payment />
        </>
      ),
    },
  ];
  return (
    <div>
      <CommonWrapper>
        {/* tab component  */}
        <div className="w-full mt-5 ">
          <div className=" grid grid-cols-3 md:flex border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`w-full py-2 text-sm font-medium transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-primary-gray-bg border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <p className="text-lg">{tab.label}</p>
              </button>
            ))}
          </div>
          <div className="mt-6 md:mt-8 lg:mt-10">{tabs[activeTab].content}</div>
        </div>
      </CommonWrapper>
    </div>
  );
};

export default ProfileTab;
