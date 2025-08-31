import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { navigationConfig, userMenuItems } from "@/config/navigationConfig";
import clsx from "clsx";
import { logout } from "@/store/Slices/AuthSlice/authSlice";
import { useAppDispatch } from "@/hooks/useRedux";
import { useTranslation } from "react-i18next";
import type { User as AuthUser } from "@/store/Slices/AuthSlice/authSlice";

interface Props {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  isAuthenticated: boolean;
  user: AuthUser | null;
  currentPath: string;
}

const MobileMenu: React.FC<Props> = ({
  isOpen,
  setIsOpen,
  isAuthenticated,
  user,
  currentPath,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation("navigation");

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
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
                  currentPath === item.path
                    ? "bg-primary-blue/10 text-primary-blue"
                    : "text-dark-3 hover:bg-gray-50",
                  item.isPrivate && !isAuthenticated && "hidden"
                )}
                onClick={() => setIsOpen(false)}
              >
                {t(item.title)}
              </Link>
            ))}
          </div>

          {isAuthenticated && user ? (
            <div className="border-t border-gray-100 mt-6 pt-6">
              {userMenuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="block px-4 py-2.5 text-dark-3 hover:bg-gray-50 rounded-lg text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {t(item.title)}
                </Link>
              ))}
              <button
                onClick={handleLogout}
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
  );
};

export default MobileMenu;
