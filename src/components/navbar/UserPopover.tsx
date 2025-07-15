import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import clsx from "clsx";
import UserAvatar from "@/ui/UserAvatar";
import messageIcon from "@/assets/icons/message-multiple-02.svg";
import arrow from "@/assets/icons/arrowdown.svg";
import logoutIcon from "@/assets/icons/logout.svg";
import logoutHover from "@/assets/icons/logoutHover.svg";
import { userMenuItems } from "@/config/navigationConfig";
import { useAppDispatch } from "@/hooks/useRedux";
import { logout } from "@/store/Slices/AuthSlice/authSlice";

const UserPopover = ({ user }: { user: { name: string } }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [hoveredLogout, setHoveredLogout] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>
        <div className="bg-white rounded-2xl p-2 flex items-center gap-3 cursor-pointer">
          <div className="p-2.5 rounded-full bg-white shadow-[0_0_10px_0_#B9D7FF]">
            <img src={messageIcon} className="w-6 h-6" alt="" />
          </div>
          <UserAvatar userName={user.name} />
          <p className="text-primary-blue font-medium text-lg">{user.name}</p>
          <div className="p-2">
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
      <PopoverContent className="bg-white text-dark-3 w-[240px] z-70 border-none rounded-xl p-4">
        {userMenuItems.map((item) => (
          <div
            key={item.path}
            className="flex gap-2 items-center p-4 rounded-xl transition-all duration-300 cursor-pointer hover:bg-[#EAF1FA]"
            onMouseEnter={() => setHoveredItem(item.path)}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={() => {
              setPopoverOpen(false);
              navigate(item.path);
            }}
          >
            <img
              src={hoveredItem === item.path && item.hoverIcon ? item.hoverIcon : item.icon}
              className="w-5 h-5 transition-all duration-300"
              alt=""
            />
            <span
              className={clsx(
                "text-lg transition-colors duration-300",
                hoveredItem === item.path ? "text-dark-2" : "text-dark-3"
              )}
            >
              {item.title}
            </span>
          </div>
        ))}
        <div
          className="flex gap-2 items-center p-4 rounded-xl transition-all duration-300 cursor-pointer hover:bg-[#EAF1FA]"
          onMouseEnter={() => setHoveredLogout(true)}
          onMouseLeave={() => setHoveredLogout(false)}
          onClick={handleLogout}
        >
          <img
            src={hoveredLogout ? logoutHover : logoutIcon}
            className="w-5 h-5 transition-all duration-300"
            alt=""
          />
          <span
            className={clsx(
              "text-lg transition-colors duration-300",
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

export default UserPopover;
