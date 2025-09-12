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
      className="w-full bg-primary-blue text-white p-3 rounded-md hover:bg-[#004AAD] transition-all cursor-pointer"
    >
      {title}
    </button>
  );
};

export default AuthButton;
