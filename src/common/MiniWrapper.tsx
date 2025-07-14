import React, { ReactNode } from "react";

interface MiniWrapperProps {
  children: ReactNode;
  className?: string;
}

const MiniWrapper: React.FC<MiniWrapperProps> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`max-w-[792px] mx-auto my-auto px-4 md:px-2 lg:px-0 ${className}`}
    >
      {children}
    </div>
  );
};

export default MiniWrapper;
