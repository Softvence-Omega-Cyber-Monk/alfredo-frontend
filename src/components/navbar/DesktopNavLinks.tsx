import { Link } from "react-router-dom";
import clsx from "clsx";
import { navigationConfig } from "@/config/navigationConfig";
import { useAppSelector } from "@/hooks/useRedux";
import { useTranslation } from "react-i18next";

interface Props {
  currentPath: string;
  transparent: boolean;
}

const DesktopNavLinks: React.FC<Props> = ({ currentPath, transparent }) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const { t } = useTranslation("navigation");

  return (
    <div className="hidden lg:flex items-center space-x-1 xl:space-x-4 absolute left-1/2 -translate-x-1/2">
      {navigationConfig.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={clsx(
            "px-2 py-1 text-base xl:text-sm font-bold transition-colors whitespace-nowrap",
            transparent ? "text-white" : "text-[#0E110C]",
            currentPath === item.path
              ? "border-b-2 border-b-primary-blue"
              : "hover:border-b-2 hover:border-b-primary-blue",
            item.isPrivate && !isAuthenticated && "hidden"
          )}
        >
          {t(item.title)}
        </Link>
      ))}
    </div>
  );
};

export default DesktopNavLinks;
