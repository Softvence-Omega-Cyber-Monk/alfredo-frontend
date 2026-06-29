import MiniWrapper from "@/common/MiniWrapper";
import ProfileTab from "@/components/ProfileComponent/ProfileTab";

const background = {
  backgroundImage: 'url("/cityscape.svg")',
};

const SettingPassword = () => {
  return (
    <div
      className="min-h-screen bg-bottom bg-repeat-x bg-contain mt-[120px] max-[767px]:mt-[100px]"
      style={background}
    >
      <div className="mt-6 md:mt-10">
        <MiniWrapper>
          <ProfileTab />
        </MiniWrapper>
      </div>
    </div>
  );
};

export default SettingPassword;
