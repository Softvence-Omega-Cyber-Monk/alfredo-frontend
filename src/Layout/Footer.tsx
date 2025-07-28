import { useTranslation } from "react-i18next";
import facebook from "../assets/footer/fb.svg";
import instagram from "../assets/footer/instagram.svg";
import linkedin from "../assets/footer/linkedin.svg";

import { Link } from "react-router-dom";

const Footer = () => {
  const { t } = useTranslation("footer");
  return (
    <footer className="relative ">
      <div className="absolute bottom-0 right-0 flex -z-5 opacity-80 items-center justify-center">
        <img src="/homeIcon.svg" className="w-full" alt="" />
      </div>
      {/* Overlay for better text readability */}

      <div className="max-w-7xl mx-auto pt-10 px-4">
        <div className="max-w-[1132px] mx-auto -mb-2">
          <img src="/cityscape.svg" alt="" className="w-full mx-auto" />
        </div>

        <div
          className="px-6 md:px-10 lg:px-20 py-6 md:py-8 lg:py-10 rounded-xl md:rounded-2xl lg:rounded-[40px] h-auto"
          style={{
            backgroundImage: `url("/footerBg.svg")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* First Column - Takes 2/5 on large screens */}
            <div className="lg:col-span-2">
              <div className="w-36 mb-4 lg:mb-6">
                <img src="/logo.svg" alt="" />
              </div>
              <p className="text-dark-2 lg:text-xl leading-relaxed lg:max-w-md pr-6">
                "{t("description")}"
              </p>
            </div>

            {/* Second Column - Quick Links */}
            <div>
              <h3 className="text-lg lg:text-xl text-primary-blue font-semibold mb-2 md:mb-4">
                {t("pages")}
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/" className="font-regular lg:text-xl">
                    {t("home")}
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="font-regular lg:text-xl">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/articles" className="font-regular lg:text-xl">
                    {t("article")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Third Column - Services */}
            <div>
              <h3 className="text-lg lg:text-xl text-primary-blue font-semibold mb-2 md:mb-4">
                {t("pages")}
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/contact" className="font-regular lg:text-xl ">
                    {t("contactUs")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/bonus-program"
                    className="font-regular lg:text-xl "
                  >
                    {t("bonusProgram")}
                  </Link>
                </li>
                <li>
                  <Link to="/plans" className="font-regular lg:text-xl ">
                    {t("plans")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Fourth Column - Newsletter */}
            <div>
              <h3 className="text-lg lg:text-xl text-primary-blue font-semibold mb-2 md:mb-4">
                {t("socialMedia")}
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/"
                    className="font-regular lg:text-xl flex gap-2 items-center"
                  >
                    <img src={facebook} alt="" className="w-5 h-5" />
                    <p>Facebook</p>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="font-regular lg:text-xl flex gap-2 items-center"
                  >
                    <img src={instagram} alt="" className="w-5 h-5" />
                    <p>Instagram</p>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="font-regular lg:text-xl flex gap-2 items-center"
                  >
                    <img src={linkedin} alt="" className="w-5 h-5" />
                    <p>Linkedin</p>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Footer Bottom Section */}
      <div className="relative text-center py-6 md:py-8 lg:py-10 text-dark-2 font-normal text-base">
        <div className="absolute inset-0 -z-10 backdrop-blur-[50px] bg-gradient-to-b from-white via-[rgba(255,255,255,0.5)] via-50%  to-[rgba(49,116,205,0.3)]"></div>
        <p>{t("copyright")}</p>
      </div>
    </footer>
  );
};

export default Footer;
