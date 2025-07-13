import React from "react";
import clsx from "clsx";

interface PrimaryButtonProps {
  title: string;
  bgImage?: string;
  textColor?: string;
  bgColor?: string;
  borderColor?: string;
  padding?: string;
  onClick?: () => void;
  className?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  bgImage = "/buttonHomeIcon.svg",
  textColor = "text-white",
  bgColor = "bg-primary-blue",
  borderColor = "",
  padding = "px-8 py-2",
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "relative overflow-hidden rounded-full transition-colors text-lg font-medium cursor-pointer",
        padding,
        textColor,
        bgColor,
        borderColor && `border ${borderColor}`,
        className
      )}
    >
      <span className="relative z-10">{title}</span>
      {bgImage && (
        <div className="absolute bottom-0 right-0 opacity-80 items-center justify-center overflow-hidden">
          <img src={bgImage} alt="icon" className="full" />
        </div>
      )}
    </button>
  );
};

export default PrimaryButton;
