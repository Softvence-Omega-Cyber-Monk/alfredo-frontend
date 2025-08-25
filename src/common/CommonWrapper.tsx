import React, { ReactNode } from "react";

// Define the props interface
interface CommonWrapperProps {
  children: ReactNode; // Type for children (can be any valid React node)
  className?: string; // Optional className prop
}

// Define the component
const CommonWrapper: React.FC<CommonWrapperProps> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`max-w-[1300px] mx-auto my-auto px-4 md:px-2 lg:px-2 ${className}`}
    >
      {children}
    </div>
  );
};

export default CommonWrapper;
