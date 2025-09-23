import conversationImage from "@/assets/conversation.svg";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Conversation = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("liveChat");
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
          {t("title")}
        </h1>
        <p className="text-basic-dark mt-3 font-extralight max-[767px]:text-sm">
          {t("desc")}
        </p>
      </div>

      {/* Button Section */}
      <div className="max-[767px]:mt-4 max-[767px]:w-full">
        <button
          className="bg-white border hover:bg-primary-blue border-primary-blue text-primary-blue hover:text-white cursor-pointer w-[251px] h-[50px] rounded-full max-[767px]:w-full max-[767px]:h-[45px] max-[767px]:text-sm"
          onClick={() => {
            if (window.location.pathname === "/contact") {
              // already on contact page → just scroll to top
              window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
              // if user is on another page → navigate first
              navigate("/contact");
            }
          }}
        >
          {t("btnText")}
        </button>
      </div>
    </div>
  );
};

export default Conversation;
