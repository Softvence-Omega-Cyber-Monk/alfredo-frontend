import clsx from "clsx";
import { ReactNode } from "react";

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
        "relative overflow-hidden rounded-full transition-colors text-lg hover:brightness-90 font-medium cursor-pointer flex items-center justify-center",
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
