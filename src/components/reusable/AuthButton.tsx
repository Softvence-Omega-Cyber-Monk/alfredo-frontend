import { FC } from "react";

interface ReusableButtonProps {
  title: string;
  onClick: () => void;
}

const AuthButton: FC <ReusableButtonProps> = ({ title, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-all cursor-pointer"
    >
      {title}
    </button>
  );
};

export default AuthButton;
