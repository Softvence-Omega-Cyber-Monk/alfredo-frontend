import CommonWrapper from "@/common/CommonWrapper";
import { useState } from "react";
import ChangePassword from "./ChangePassword";
import Notification from "./Notification";
import Language from "./Language";
import Payment from "./Payment";

const ProfileTab = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      id: 0,
      label: "Password",
      content: (
        <>
          <ChangePassword />
        </>
      ),
    },
    {
      id: 1,
      label: "Notification",
      content: (
        <>
          <Notification />
        </>
      ),
    },
    {
      id: 2,
      label: "Language",
      content: (
        <>
          <Language />
        </>
      ),
    },
    {
      id: 3,
      label: "Payment",
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
        <div className="w-full mt-5 -mb-70 relative">
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
