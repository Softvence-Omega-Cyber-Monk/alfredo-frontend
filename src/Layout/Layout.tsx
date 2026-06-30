// src/Layout/Layout.tsx
import { Link, Outlet, useLocation } from "react-router-dom";
import messageIcon from "@/assets/icons/message-multiple-02.svg";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "@/utils/ScrollToTop";

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

  const hideMessageButtonPaths = ["/messages"];
  const shouldHideMessageButton = hideMessageButtonPaths.includes(
    location.pathname
  );

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const token = localStorage.getItem("token");
  // console.log(token, "token in layout");
  // const parsedUser = user ? JSON.parse(user) : null;

  return (
    <div>
      <Navbar />
      <main>
        <ScrollToTop />
        <Outlet />
      </main>
      {!shouldHideFooter && <Footer />}

      {!shouldHideMessageButton && token && (
        <Link
          to={`${user.isSubscribed ? "/messages" : "/plans"}`}
          className="p-2 md:p-3 rounded-[14px] bg-primary-blue shadow-[0_0_10px_0_#B9D7FF] fixed bottom-10 right-8 z-100 flex items-center gap-2"
        >
          <img src={messageIcon} className="w-4 h-4 md:w-6 md:h-6" alt="" />
          <span className="text-white">Chat</span>
        </Link>
      )}
    </div>
  );
};

export default Layout;
