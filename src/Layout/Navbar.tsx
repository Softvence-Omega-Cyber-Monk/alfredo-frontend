import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/hooks/useRedux";
import { logout } from "@/store/Slices/AuthSlice/authSlice";
import UserAvatar from "@/ui/UserAvatar";
import CommonWrapper from "@/common/CommonWrapper";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useAppDispatch();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="bg-primary-blue shadow-lg w-full">
      <CommonWrapper>
        <div className=" mx-auto px-4 lg:px-0 ">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="text-white text-2xl font-bold">
                MyApp
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-4">
              <Link
                to="/"
                className="text-white hover:bg-website-color-lightGray hover:text-black px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>
              <Link
                to="/faq"
                className="text-white hover:bg-website-color-lightGray hover:text-black px-3 py-2 rounded-md text-sm font-medium"
              >
                FAQ
              </Link>
              <Link
                to="/articles"
                className="text-white hover:bg-website-color-lightGray hover:text-black px-3 py-2 rounded-md text-sm font-medium"
              >
                Articles
              </Link>
              <Link
                to="/contact"
                className="text-white hover:bg-website-color-lightGray hover:text-black px-3 py-2 rounded-md text-sm font-medium"
              >
                Contact Us
              </Link>
              <Link
                to="/bonus-program"
                className="text-white hover:bg-website-color-lightGray hover:text-black px-3 py-2 rounded-md text-sm font-medium"
              >
                Bonus Program
              </Link>
              <Link
                to="/plans"
                className="text-white hover:bg-website-color-lightGray hover:text-black px-3 py-2 rounded-md text-sm font-medium"
              >
                Plan
              </Link>

              <Popover>
                <PopoverTrigger>
                  <UserAvatar userName="Mahim" />
                </PopoverTrigger>
                <PopoverContent className="mr-3 bg-website-color-darkGray border-none text-white">
                  <Button
                    onClick={handleLogout}
                    className="bg-website-color-lightGray text-black w-full"
                  >
                    Logout
                  </Button>
                </PopoverContent>
              </Popover>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMenu}
                type="button"
                className="text-white hover:text-gray-300 focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </CommonWrapper>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="text-white block hover:bg-purple-700 px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </Link>
            <Link
              to="/faq"
              className="text-white block hover:bg-purple-700 px-3 py-2 rounded-md text-base font-medium"
            >
              FAQ
            </Link>
            <Link
              to="/articles"
              className="text-white block hover:bg-purple-700 px-3 py-2 rounded-md text-base font-medium"
            >
              Articles
            </Link>
            <Link
              to="/contact"
              className="text-white block hover:bg-purple-700 px-3 py-2 rounded-md text-base font-medium"
            >
              Contact Us
            </Link>
            <Link
              to="/bonus-program"
              className="text-white block hover:bg-purple-700 px-3 py-2 rounded-md text-base font-medium"
            >
              Bonus Program
            </Link>
            <Link
              to="/plans"
              className="text-white block hover:bg-purple-700 px-3 py-2 rounded-md text-base font-medium"
            >
              Plan
            </Link>

            <div className="mt-8 flex items-center gap-4">
              <button className="bg-white w-[150px] py-2 rounded-full">
                Login
              </button>
              <button className="bg-white w-[150px] py-2 rounded-full">
                Join Us
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
