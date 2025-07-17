import MiniWrapper from "@/common/MiniWrapper";
import ProfileTab from "@/components/ProfileComponent/ProfileTab";

const SettingPassword = () => {
  return (
    <div className="mt-6 md:mt-10">
      <MiniWrapper>
        <ProfileTab />
      </MiniWrapper>
      <div className="hidden md:block bottom-0 w-full  mx-auto -mb-40">
        <img src="/cityscape.svg" alt="" className="w-full mx-auto" />
      </div>
    </div>
  );
};

export default SettingPassword;
