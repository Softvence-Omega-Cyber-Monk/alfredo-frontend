import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout: React.FC = () => {
  const location = useLocation();

  // List of exact paths where Footer should be hidden
  const hideFooterPaths = ["/profile", "/setting-password", "/messages"];

  const shouldHideFooter = hideFooterPaths.includes(location.pathname);

  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
      {!shouldHideFooter && <Footer />}
    </div>
  );
};

export default Layout;
