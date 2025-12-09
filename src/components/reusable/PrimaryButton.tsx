import clsx from "clsx";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

interface PrimaryButtonProps {
  title: string | ReactNode; // Changed to accept both string and ReactNode
  bgImage?: string;
  textColor?: string;
  bgColor?: string;
  borderColor?: string;
  padding?: string;
  onClick?: () => void;
  className?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  bgImage = "/buttonHomeIcon.svg",
  textColor = "text-white",
  bgColor = "bg-primary-blue",
  borderColor = "",
  padding = "px-8 py-2",
  onClick,
  className,
}) => {
  const { t } = useTranslation("homeDetails");

  return (
    <button
      onClick={onClick}
      className={clsx(
        "relative overflow-hidden rounded-full transition-colors text-lg hover:brightness-90 font-medium cursor-pointer",
        padding,
        textColor,
        bgColor,
        borderColor && `border ${borderColor}`,
        className
      )}
    >
      <span className="relative z-10">{t("contact")}</span>
      {bgImage && (
        <div className="absolute bottom-0 right-0 opacity-20 items-center justify-center overflow-hidden">
          <img
            src={bgImage}
            alt="icon"
            className="w-full hover:text-primary-blue"
          />
        </div>
      )}
    </button>
  );
};

export default PrimaryButton;
