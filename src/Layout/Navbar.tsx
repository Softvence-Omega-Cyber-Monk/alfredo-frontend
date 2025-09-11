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
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const { favorites } = useAppSelector((state) => state.favorites);

  // Fetch favorites when user authenticates
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchFavorites());
    }
  }, [isAuthenticated, dispatch]);

  return (
    <nav className="bg-[#F4F7FC] text-dark-3 w-full sticky top-0 z-60">
      <CommonWrapper>
        <div className="mx-auto px-2 py-2 md:py-4 lg:py-6">
          <div className="flex items-center justify-between relative">
            <Logo />
            <DesktopNavLinks currentPath={location.pathname} />

            {/* Desktop Auth Section */}
            <div className="flex items-center gap-3">
              {isAuthenticated && (
                <Link to="/my-favorite">
                  <div className="relative inline-block">
                    <MdOutlineFavorite className="text-3xl text-primary-blue cursor-pointer" />
                    {favorites.length > 0 && (
                      <span className="absolute -top-2 -right-3 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full shadow-lg">
                        {favorites.length}
                      </span>
                    )}
                  </div>
                </Link>
              )}

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

/* Part-2 */

// // src/components/navbar/Navbar.tsx
// import React, { useState } from "react";
// import { useAppSelector } from "@/hooks/useRedux";
// import CommonWrapper from "@/common/CommonWrapper";
// import { Link, useLocation } from "react-router-dom";
// import { Menu } from "lucide-react";
// import Logo from "../components/navbar/Logo";
// import DesktopNavLinks from "../components/navbar/DesktopNavLinks";
// import AuthSection from "../components/navbar/AuthSection";
// import MobileMenu from "../components/navbar/MobileMenu";
// import { MdOutlineFavorite } from "react-icons/md";

// const Navbar: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const location = useLocation();
//   const { isAuthenticated, user } = useAppSelector((state) => state.auth);
//   const { favorites } = useAppSelector((state) => state.favorites);

//   return (
//     <nav className="bg-[#F4F7FC] text-dark-3 w-full sticky top-0 z-60">
//       <CommonWrapper>
//         <div className="mx-auto px-2 py-2 md:py-4 lg:py-6">
//           <div className="flex items-center justify-between relative">
//             <Logo />
//             <DesktopNavLinks currentPath={location.pathname} />

//             {/* Desktop Auth Section */}
//             <div className="flex items-center gap-3">
//               {isAuthenticated && (
//                 <Link to="/my-favorite">
//                   <div className="relative inline-block">
//                     <MdOutlineFavorite className="text-3xl text-red-500 cursor-pointer" />
//                     {favorites.length > 0 && (
//                       <span className="absolute -top-2 -right-3 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-black rounded-full shadow-lg">
//                         {favorites.length}
//                       </span>
//                     )}
//                   </div>
//                 </Link>
//               )}

//               <AuthSection
//                 isAuthenticated={isAuthenticated}
//                 user={user}
//                 setMobileMenuOpen={setIsOpen}
//               />
//               <button
//                 onClick={() => setIsOpen(!isOpen)}
//                 type="button"
//                 className="text-primary-blue hover:text-primary-blue/80 focus:outline-none lg:hidden"
//               >
//                 <Menu className="w-6 h-6 md:w-8 md:h-8" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </CommonWrapper>

//       <MobileMenu
//         isOpen={isOpen}
//         setIsOpen={setIsOpen}
//         isAuthenticated={isAuthenticated}
//         user={user}
//         currentPath={location.pathname}
//       />
//     </nav>
//   );
// };

// export default Navbar;

/* Part-2 */

// import React, { useState } from "react";
// import { useAppSelector } from "@/hooks/useRedux";
// import CommonWrapper from "@/common/CommonWrapper";
// import { Link, useLocation } from "react-router-dom";
// import { Menu } from "lucide-react";
// import Logo from "../components/navbar/Logo";
// import DesktopNavLinks from "../components/navbar/DesktopNavLinks";
// import AuthSection from "../components/navbar/AuthSection";
// import MobileMenu from "../components/navbar/MobileMenu";
// import { MdOutlineFavorite } from "react-icons/md";
// const Navbar: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const location = useLocation();
//   const { isAuthenticated, user } = useAppSelector((state) => state.auth);

//   return (
//     <nav className="bg-[#F4F7FC] text-dark-3 w-full sticky top-0 z-60">
//       <CommonWrapper>
//         <div className="mx-auto px-2 py-2 md:py-4 lg:py-6">
//           <div className="flex items-center justify-between relative">
//             <Logo />
//             <DesktopNavLinks currentPath={location.pathname} />

//             {/* Desktop Auth Section */}
//             <div className="flex items-center gap-3">
//               <Link to="/my-favorite">
//                 <div className="relative inline-block">
//                   {/* Favorite Icon */}
//                   <MdOutlineFavorite className="text-3xl text-red-500 cursor-pointer" />

//                   {/* Static Badge */}
//                   <span className="absolute -top-2 -right-3 inline-flex items-center justify-center px-1 py-0.6 text-xs font-bold text-white bg-black rounded-full shadow-lg">
//                     3
//                   </span>
//                 </div>
//               </Link>

//               <AuthSection
//                 isAuthenticated={isAuthenticated}
//                 user={user}
//                 setMobileMenuOpen={setIsOpen}
//               />
//               <button
//                 onClick={() => setIsOpen(!isOpen)}
//                 type="button"
//                 className="text-primary-blue hover:text-primary-blue/80 focus:outline-none lg:hidden"
//               >
//                 <Menu className="w-6 h-6 md:w-8 md:h-8" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </CommonWrapper>

//       <MobileMenu
//         isOpen={isOpen}
//         setIsOpen={setIsOpen}
//         isAuthenticated={isAuthenticated}
//         user={user}
//         currentPath={location.pathname}
//       />
//     </nav>
//   );
// };

// export default Navbar;
