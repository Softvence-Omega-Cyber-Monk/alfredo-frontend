import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { logout } from "@/store/Slices/AuthSlice/authSlice";
import UserAvatar from "@/ui/UserAvatar";
import CommonWrapper from "@/common/CommonWrapper";
import { navigationConfig, userMenuItems } from "@/config/navigationConfig";
import clsx from "clsx";
import PrimaryButton from '../components/reusable/PrimaryButton';
import { Menu } from 'lucide-react';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-[#F4F7FC] text-dark-3 w-full sticky top-0 z-50">
      <CommonWrapper>
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-2 md:py-4 lg:py-6">
          <div className="flex items-center justify-between relative">
            {/* Logo */}
            <div className="flex-shrink-0 w-24 sm:w-28 md:w-32">
              <Link to="/">
                <img src="/logo.svg" alt="" className="w-full h-auto" />
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-4 absolute left-1/2 -translate-x-1/2">
              {navigationConfig.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={clsx(
                    "px-2 py-1 text-base xl:text-lg font-medium transition-colors text-[#0E110C] whitespace-nowrap",
                    isActivePath(item.path)
                      ? "border-b-2 border-b-primary-blue"
                      : "hover:border-b-2 hover:border-b-primary-blue",
                    item.isPrivate && !isAuthenticated && "hidden"
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="hidden lg:block">
              {isAuthenticated ? (
                <Popover>
                  <PopoverTrigger>
                    <UserAvatar userName={user?.name || "User"} />
                  </PopoverTrigger>
                  <PopoverContent className="mr-3 bg-website-color-darkGray border-none text-white w-48">
                    {userMenuItems.map((item) => (
                      <Button
                        key={item.path}
                        onClick={() => navigate(item.path)}
                        className="bg-website-color-lightGray text-black w-full mb-2 last:mb-0 text-sm"
                      >
                        {item.title}
                      </Button>
                    ))}
                    <Button
                      onClick={handleLogout}
                      className="bg-website-color-lightGray text-black w-full mt-2 text-sm"
                    >
                      Logout
                    </Button>
                  </PopoverContent>
                </Popover>
              ) : (
                <div className="flex items-center gap-2">
                  <PrimaryButton
                    title="Join"
                    onClick={() => navigate("/login")}
                    textColor="text-primary-blue"
                    bgColor="bg-white"
                    bgImage="/buttonHomeWhite.svg"
                    borderColor="border-primary-blue"
                    className="px-4 py-2"
                  />
                  <PrimaryButton
                    title="Login"
                    onClick={() => navigate("/login")}
                    textColor="text-white"
                    bgColor="bg-primary-blue"
                      
                  />
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center ml-auto">
              <button
                onClick={toggleMenu}
                type="button"
                className="text-primary-blue hover:text-primary-blue/80 focus:outline-none p-2"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </CommonWrapper>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 w-64 sm:w-80 bg-white shadow-xl z-50 overflow-y-auto">
            <div className="px-4 py-6">
              <div className="flex justify-end mb-6">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-dark-3 hover:text-black p-2"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="space-y-2">
                {navigationConfig.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={clsx(
                      "block px-4 py-2.5 text-base font-medium transition-colors rounded-lg",
                      isActivePath(item.path)
                        ? "bg-primary-blue/10 text-primary-blue"
                        : "text-dark-3 hover:bg-gray-50",
                      item.isPrivate && !isAuthenticated && "hidden"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>

              {isAuthenticated ? (
                <div className="border-t border-gray-100 mt-6 pt-6">
                  {userMenuItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="block px-4 py-2.5 text-dark-3 hover:bg-gray-50 rounded-lg text-base font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.title}
                    </Link>
                  ))}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-lg text-base font-medium mt-2"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="mt-6 px-4 space-y-3">
                  <Button
                    onClick={() => {
                      navigate("/login");
                      setIsOpen(false);
                    }}
                    className="bg-primary-blue text-white w-full py-2.5"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => {
                      navigate("/signup");
                      setIsOpen(false);
                    }}
                    className="bg-transparent text-primary-blue border border-primary-blue w-full py-2.5"
                  >
                    Join Us
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
