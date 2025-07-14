
import CommonWrapper from "@/common/CommonWrapper";
import testimonailPerson from "@/assets/testimonailPerson.jpg";
import penIcon from "@/assets/icons/pen-icon.svg";
import MiniWrapper from "@/common/MiniWrapper";
import ProfileForm from "@/components/ProfileComponent/ProfileForm";

const Profile = () => {
  return (
    <div className="mt-6 md:mt-10">
      <MiniWrapper>
        <ProfileForm />
      </MiniWrapper>
    </div>
  );
};

export default Profile;
