import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import PrimaryButton from "@/components/reusable/PrimaryButton";
import UserAvatar from "@/ui/UserAvatar";
import clsx from "clsx";
import { userMenuItems } from "@/config/navigationConfig";
import messageIcon from "@/assets/icons/message-multiple-02.svg";
import arrow from "@/assets/icons/arrowdown.svg";
import logoutIcon from "@/assets/icons/logout.svg";
import logoutHover from "@/assets/icons/logoutHover.svg";
import { useAppDispatch } from "@/hooks/useRedux";
import { logout } from "@/store/Slices/AuthSlice/authSlice";

interface Props {
  isAuthenticated: boolean;
  user: {
    name: string;
    role: string;
  };
  setMobileMenuOpen: (state: boolean) => void;
}

const AuthSection: React.FC<Props> = ({
  isAuthenticated,
  user,
  setMobileMenuOpen,
}) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [hoveredLogout, setHoveredLogout] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    setMobileMenuOpen(false);
  };

  if (!isAuthenticated)
    return (
      <div className="flex items-center gap-2">
        <PrimaryButton
          title="Join"
          onClick={() => navigate("/signup")}
          textColor="text-primary-blue text-sm md:text-base"
          bgColor="bg-white"
          bgImage="/buttonHomeWhite.svg"
          borderColor="border-primary-blue"
          className="px-4 py-2"
        />
        <PrimaryButton
          title="Login"
          onClick={() => navigate("/login")}
          textColor="text-white text-sm md:text-base"
          bgColor="bg-primary-blue"
        />
      </div>
    );

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>
        <div className="bg-white rounded-2xl p-2 flex items-center gap-2 md:gap-3 cursor-pointer">
          <div className="p-2 md:p-2.5 rounded-full bg-white shadow-[0_0_10px_0_#B9D7FF]">
            <img src={messageIcon} className="w-4 h-4 md:w-6 md:h-6" alt="" />
          </div>
          <UserAvatar userName={user?.name} />
          <p className="text-primary-blue font-medium text-sm sm:text-base md:text-lg">
            {user?.name.split(" ")[0]}
          </p>
          <div className="p-1 md:p-2">
            <img
              src={arrow}
              alt=""
              className={clsx(
                "transition-transform duration-300",
                popoverOpen ? "rotate-180" : "rotate-0"
              )}
            />
          </div>
        </div>
      </PopoverTrigger>

      <PopoverContent className="bg-white text-dark-3 w-[190px] md:w-[240px] z-70 border-none rounded-xl p-4">
        {userMenuItems.map((item) => (
          <div
            key={item.path}
            className="flex gap-2 items-center p-2 md:p-4 rounded-xl cursor-pointer hover:bg-[#EAF1FA]"
            onMouseEnter={() => setHoveredItem(item.path)}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={() => {
              setPopoverOpen(false);
              navigate(item.path);
            }}
          >
            <img
              src={
                hoveredItem === item.path && item.hoverIcon
                  ? item.hoverIcon
                  : item.icon
              }
              className="w-4 h-4 md:w-5 md:h-5"
              alt=""
            />
            <span
              className={clsx(
                "text-base md:text-lg",
                hoveredItem === item.path ? "text-dark-2" : "text-dark-3"
              )}
            >
              {item.title}
            </span>
          </div>
        ))}
        <div
          className="flex gap-2 items-center p-2 md:p-4 rounded-xl cursor-pointer hover:bg-[#EAF1FA]"
          onMouseEnter={() => setHoveredLogout(true)}
          onMouseLeave={() => setHoveredLogout(false)}
          onClick={handleLogout}
        >
          <img
            src={hoveredLogout ? logoutHover : logoutIcon}
            className="w-4 h-4 md:w-5 md:h-5"
            alt=""
          />
          <span
            className={clsx(
              "text-base md:text-lg",
              hoveredLogout ? "text-[#E33A4B]" : "text-dark-3"
            )}
          >
            Logout
          </span>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AuthSection;
