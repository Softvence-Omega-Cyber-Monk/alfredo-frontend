import clsx from "clsx";
import { ReactNode } from "react";

interface PrimaryButtonProps {
  title: string | ReactNode;
  bgImage?: string;
  textColor?: string;
  bgColor?: string;
  borderColor?: string;
  padding?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
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
  disabled,
}) => {
  return (
    <button
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      className={clsx(
        "relative overflow-hidden rounded-full transition-all text-lg font-medium flex items-center justify-center",
        disabled ? "opacity-50 cursor-not-allowed" : "hover:brightness-90 cursor-pointer",
        padding,
        textColor,
        bgColor,
        borderColor && `border ${borderColor}`,
        className
      )}
    >
      <div className="relative z-10 flex items-center justify-center gap-2">
        {title}
      </div>

      {bgImage && (
        <div className="absolute bottom-0 right-0 opacity-20 pointer-events-none">
          <img src={bgImage} alt="icon" />
        </div>
      )}
    </button>
  );
};

export default PrimaryButton;
