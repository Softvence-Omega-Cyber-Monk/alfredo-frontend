import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { fetchUser } from "@/store/Slices/Profile/ProfileSlice";
import { useEffect } from "react";

interface UserAvatarProps {
  userName: string;
  photo?: string | null;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ userName, photo }) => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  return (
    <Avatar className="w-8 h-8 md:w-10 md:h-10">
      <AvatarImage src={photo || data?.photo || undefined} className="object-cover" />
      <AvatarFallback>{userName}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
