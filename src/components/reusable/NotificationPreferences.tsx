// NotificationPreferences.tsx
import { useState } from "react";

const NotificationPreferences = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);

  const handleToggle = () => {
    setEmailNotifications(!emailNotifications);
    // Optionally dispatch to backend or redux:
    // dispatch(updateUserSettings({ emailNotifications: !emailNotifications }));
  };

  return (
    <div className="flex justify-between items-center p-4 border-b border-gray-200">
      <span className="font-medium text-gray-800">Email Notifications</span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={emailNotifications}
          onChange={handleToggle}
          className="sr-only peer"
        />
        <div
          className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4
          peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full
          peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px]
          after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full
          after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
        ></div>
      </label>
    </div>
  );
};

export default NotificationPreferences;
