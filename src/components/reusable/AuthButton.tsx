import { FC } from "react";

interface ReusableButtonProps {
  title: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

const AuthButton: FC<ReusableButtonProps> = ({
  title,
  type = "button",
  onClick,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full bg-primary-blue text-white p-3  hover:bg-[#004AAD]  rounded-full  font-semibold text-base transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {title}
    </button>
  );
};

export default AuthButton;
