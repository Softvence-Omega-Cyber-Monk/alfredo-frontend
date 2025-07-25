import conversationImage from "@/assets/conversation.svg";
import { useTranslation } from "react-i18next";

const Conversation = () => {
  const { t } = useTranslation("bonus");
  return (
    <div className="w-full h-[220px] bg-primary-gray-bg flex items-center gap-2 rounded-3xl px-7 max-[767px]:flex-col max-[767px]:h-auto max-[767px]:py-6 max-[767px]:gap-4 max-[767px]:px-4 text-center">
      {/* Image Section */}
      <div className="max-[767px]:w-[100px] max-[767px]:mx-auto">
        <img
          src={conversationImage}
          alt="Live Chat"
          className="max-w-full h-auto"
        />
      </div>

      {/* Text Section */}
      <div className="flex-1 px-12 max-[767px]:px-0 max-[767px]:mt-3">
        <h1 className="text-primary-blue text-[32px] font-semibold max-[767px]:text-[20px]">
          {t("bonus.liveChat.title")}
        </h1>
        <p className="text-basic-dark mt-3 font-extralight max-[767px]:text-sm">
          {t("bonus.liveChat.subtitle")}
        </p>
      </div>

      {/* Button Section */}
      <div className="max-[767px]:mt-4 max-[767px]:w-full">
        <button className="bg-white border border-primary-blue text-primary-blue w-[251px] h-[50px] rounded-full max-[767px]:w-full max-[767px]:h-[45px] max-[767px]:text-sm">
          {t("bonus.liveChat.button")}
        </button>
      </div>
    </div>
  );
};

export default Conversation;
