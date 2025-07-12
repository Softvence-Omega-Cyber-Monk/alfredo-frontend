import React, { ReactNode, MouseEvent } from "react";
import homeImage from "@/assets/Vector1.svg";

type ButtonProps = {
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  icon?: React.ComponentType<{ className?: string }>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

const ReusableButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = "",
  icon: Icon,
  ...props
}) => {
  return (
    <div className="">
      <button
        onClick={onClick}
        className={`
        flex 
        relative
        z-50
        px-8
        h-[43px] 
        justify-center 
        items-center 
        gap-2.5
        overflow-hidden
        rounded-[35px] 
        bg-[#3174CD]
        text-white
        font-[18px]
        hover:bg-[#2a66b5]
        transition-colors
        ${className}
      `}
        {...props}
      >
        {children}
        {Icon && <Icon className="ml-2" />}
        <img
          src={homeImage}
          alt=""
          className="absolute right-0 -bottom-2 -z-10 w-12 h-12 object-contain"
        />
      </button>
    </div>
  );
};

export default ReusableButton;
