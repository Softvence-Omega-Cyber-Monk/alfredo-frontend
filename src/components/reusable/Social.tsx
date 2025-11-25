import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import fb from "@/assets/footer/fb.svg";
import insta from "@/assets/footer/instagram.svg";
import linkedin from "@/assets/footer/linkedin.svg";

const Social = () => {
  const { t } = useTranslation("bonus");

  return (
    <div className="flex flex-row items-center justify-center gap-[24px] mt-[150px]   max-[767px]:mt-[120px] text-center">
      <h3 className="text-lg md:text-[24px] text-basic-dark">
        {t("bonus.referralLink.share")}
      </h3>
      <ul className="flex flex-row items-center gap-[15px] justify-center sm:mt-0">
        <li>
          <Link
            to="/"
            className="font-regular lg:text-xl flex gap-2 items-center"
          >
            <img
              src={fb}
              alt="facebook"
              className="w-8 h-8 max-[767px]:w-6 max-[767px]:h-6"
            />
          </Link>
        </li>
        <li>
          <a
            href="https://www.instagram.com/vacanzagreece/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-regular lg:text-xl flex gap-2 items-center"
          >
            <img
              src={insta}
              alt="instagram"
              className="w-8 h-8 max-[767px]:w-6 max-[767px]:h-6"
            />
          </a>
        </li>
        <li>
          <Link
            to="/"
            className="font-regular lg:text-xl flex gap-2 items-center"
          >
            <img
              src={linkedin}
              alt="linkedin"
              className="w-8 h-8 max-[767px]:w-6 max-[767px]:h-6"
            />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Social;
