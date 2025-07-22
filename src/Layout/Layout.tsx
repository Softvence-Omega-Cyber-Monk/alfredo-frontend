// src/Layout/Layout.tsx
import { Outlet, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Import useTranslation hook
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout: React.FC = () => {
  const location = useLocation();
  const { t } = useTranslation(); // Initialize translation hook

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
      <div>
        {/* Example usage of translation */}
        <p>{t("welcome")}</p> {/* Example translated text */}
        <p>{t("description")}</p>
      </div>
    </div>
  );
};

export default Layout;
