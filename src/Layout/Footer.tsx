import footerBg from "../assets/footer/footer-bg.svg";
import facebook from "../assets/footer/fb.svg";
import instagram from "../assets/footer/instagram.svg";
import linkedin from "../assets/footer/linkedin.svg";
import cityscape from "../assets/footer/cityscape.svg";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="pb-10 border border-t-black">
      {/* Overlay for better text readability */}

      <div className="max-w-7xl mx-auto py-10">
        <img src={cityscape} alt="" className="max-w-[1132px] mx-auto" />

        <div
          className="relative z-10 border border-black px-6 md:px-10 lg:px-20 py-6 md:py-8 lg:py-10 rounded-xl md:rounded-2xl lg:rounded-[40px]"
          style={{
            backgroundImage: `url(${footerBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            {/* First Column - Takes 2/5 on large screens */}
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold mb-6 text-primary-blue">
                Logo
              </h3>
              <p className="text-dark-2 lg:text-xl leading-relaxed lg:max-w-md">
                "HomeExchange transformed our family vacations! We've stayed in
                amazing places without breaking the bank."
              </p>
            </div>

            {/* Second Column - Quick Links */}
            <div>
              <h3 className="text-lg lg:text-xl text-primary-blue font-semibold mb-4">
                Pages
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/" className="font-regular lg:text-xl">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/" className="font-regular lg:text-xl">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/" className="font-regular lg:text-xl">
                    Home
                  </Link>
                </li>
              </ul>
            </div>

            {/* Third Column - Services */}
            <div>
              <h3 className="text-lg lg:text-xl text-primary-blue font-semibold mb-4">
                Pages
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/" className="font-regular lg:text-xl ">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/" className="font-regular lg:text-xl ">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/" className="font-regular lg:text-xl ">
                    Home
                  </Link>
                </li>
              </ul>
            </div>

            {/* Fourth Column - Newsletter */}
            <div>
              <h3 className="text-lg lg:text-xl text-primary-blue font-semibold mb-4">
                Social Media
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
        <p>Copyright WP Estate. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
