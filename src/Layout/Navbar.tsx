// src/components/navbar/Navbar.tsx
import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux";
import CommonWrapper from "@/common/CommonWrapper";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import Logo from "../components/navbar/Logo";
import DesktopNavLinks from "../components/navbar/DesktopNavLinks";
import AuthSection from "../components/navbar/AuthSection";
import MobileMenu from "../components/navbar/MobileMenu";
import { MdOutlineFavorite } from "react-icons/md";
import { fetchFavorites } from "@/store/Slices/FavoritesSlice/favoritesSlice";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const { favorites } = useAppSelector((state) => state.favorites);

  // Detect scroll to toggle between transparent and solid
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchFavorites());
    }
  }, [isAuthenticated, dispatch]);

  // Only show transparent navbar on the home route
  const isHome = location.pathname === "/";
  const isTransparent = isHome && !isScrolled;

  return (
    <nav
      className={`w-full fixed top-0 z-[100] transition-all duration-300 ease-in-out
        ${isTransparent
          ? "bg-transparent"
          : "bg-[#F4F7FC] shadow-sm"
        }`}
    >
      <CommonWrapper>
        <div className="mx-auto px-2 py-2 md:py-4 lg:py-6">
          <div className="flex items-center justify-between relative">
            {/* Logo — white when transparent, brand colour when solid */}
            <div className={isTransparent ? "brightness-0 invert" : ""}>
              <Logo />
            </div>

            {/* Nav Links */}
            <DesktopNavLinks
              currentPath={location.pathname}
              transparent={isTransparent}
            />

            {/* Right section */}
            <div className="flex items-center gap-3">
              {isAuthenticated && (
                <Link to="/my-favorite">
                  <div className="relative inline-block">
                    <MdOutlineFavorite
                      className={`text-3xl cursor-pointer transition-colors
                        ${isTransparent ? "text-white" : "text-primary-blue"}`}
                    />
                    {favorites.length > 0 && (
                      <span className="absolute -top-2 -right-3 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full shadow-lg">
                        {favorites.length}
                      </span>
                    )}
                  </div>
                </Link>
              )}

              {/* Auth section — pass transparent flag so it can style icons accordingly */}
              <AuthSection
                isAuthenticated={isAuthenticated}
                user={user}
                setMobileMenuOpen={setIsOpen}
                transparent={isTransparent}
              />

              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className={`hover:opacity-70 focus:outline-none lg:hidden transition-colors
                  ${isTransparent ? "text-white" : "text-primary-blue"}`}
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