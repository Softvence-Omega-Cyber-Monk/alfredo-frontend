import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps {
  userName: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ userName }) => {
  return (
    <Avatar className="w-8 h-8 md:w-10 md:h-10">
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>{userName.slice(0, 2).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
