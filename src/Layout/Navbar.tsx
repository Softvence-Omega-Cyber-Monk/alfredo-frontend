import React, { useState } from "react";
import { useAppSelector } from "@/hooks/useRedux";
import CommonWrapper from "@/common/CommonWrapper";
import { useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import Logo from "../components/navbar/Logo";
import DesktopNavLinks from "../components/navbar/DesktopNavLinks";
import AuthSection from "../components/navbar/AuthSection";
import MobileMenu from "../components/navbar/MobileMenu";
const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  return (
    <nav className="bg-[#F4F7FC] text-dark-3 w-full sticky top-0 z-60">
      <CommonWrapper>
        <div className="mx-auto px-2 py-2 md:py-4 lg:py-6">
          <div className="flex items-center justify-between relative">
            <Logo />
            <DesktopNavLinks currentPath={location.pathname} />

            {/* Desktop Auth Section */}
            <div className="flex items-center gap-2">
              <AuthSection
                isAuthenticated={isAuthenticated}
                user={user}
                setMobileMenuOpen={setIsOpen}
              />
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="text-primary-blue hover:text-primary-blue/80 focus:outline-none lg:hidden"
              >
                <Menu className="w-6 h-6 md:w-8 md:h-8" />
              </button>
            </div>
          </div>
        </div>
      </CommonWrapper>

      <MobileMenu
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isAuthenticated={isAuthenticated}
        user={user}
        currentPath={location.pathname}
      />
    </nav>
  );
};

export default Navbar;
