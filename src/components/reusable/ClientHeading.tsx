import React from "react";

interface ClientHeadingProps {
  headingText: string;
  spanText: string;
}

const ClientHeading: React.FC<ClientHeadingProps> = ({
  headingText,
  spanText,
}) => {
  return (
    <h1 className="text-4xl lg:text-[64px] text-[#505050] text-center">
      {headingText}
      <span className="font-Grand-Hotel text-5xl lg:text-[96px] ml-4 text-primary-blue">
        {spanText}
      </span>
    </h1>
  );
};

export default ClientHeading;
