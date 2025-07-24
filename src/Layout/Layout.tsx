// src/Layout/Layout.tsx
import { Link, Outlet, useLocation } from "react-router-dom";
import messageIcon from "@/assets/icons/message-multiple-02.svg";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout: React.FC = () => {
  const location = useLocation();

  // List of paths where Footer should be hidden
  const hideFooterPaths = [
    "/profile",
    "/setting-password",
    "/messages",
    "/onboarding",
  ];
  const shouldHideFooter = hideFooterPaths.includes(location.pathname);

  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
      {!shouldHideFooter && <Footer />}

      <Link
        to="/messages"
        className="p-2 md:p-2.5 rounded-full bg-white shadow-[0_0_10px_0_#B9D7FF]  fixed bottom-10 right-8 z-100"
      >
        <img src={messageIcon} className="w-4 h-4 md:w-6 md:h-6" alt="" />
      </Link>
    </div>
  );
};

export default Layout;
