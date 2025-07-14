import { FC } from "react";

interface AuthenticateHeadingProps {
  title: string;
}

const AuthenticateHeading: FC <AuthenticateHeadingProps> = ({ title }) => {
  return (
    <div className="text-[40px] font-semibold text-center text-primary-blue max-[767px]:text-[24px]">
      {title}
    </div>
  );
};

export default AuthenticateHeading;
