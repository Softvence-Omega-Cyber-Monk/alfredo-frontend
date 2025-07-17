import MiniWrapper from "@/common/MiniWrapper";
import ProfileForm from "@/components/ProfileComponent/ProfileForm";

const Profile = () => {
  return (
    <div>
      <div className="mt-6 md:mt-10 ">
        <MiniWrapper>
          <ProfileForm />
        </MiniWrapper>
      </div>
      <div className="hidden md:block bottom-0 w-full mx-auto -mb-40">
        <img src="/cityscape.svg" alt="" className="w-full mx-auto" />
      </div>
    </div>
  );
};

export default Profile;
