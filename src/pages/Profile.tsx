import MiniWrapper from "@/common/MiniWrapper";
import ProfileForm from "@/components/ProfileComponent/ProfileForm";

const background = {
  backgroundImage: 'url("/cityscape.svg")',
};

const Profile = () => {
  return (
    <div className=" bg-bottom bg-repeat-x bg-contain" style={background}>
      <div className="min-h-screen  bg-bottom bg-repeat-x bg-contain">
        <div className="mt-6 md:mt-10  z-10">
          <MiniWrapper>
            <ProfileForm />
          </MiniWrapper>
        </div>
      </div>
    </div>
  );
};

export default Profile;
