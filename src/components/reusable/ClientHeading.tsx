interface ClientHeadingProps {
  headingText: string;
  spanText: string;
  last?: string;
}

const ClientHeading: React.FC<ClientHeadingProps> = ({
  headingText,
  spanText,
  last,
}) => {
  return (
    <h1 className="text-3xl lg:text-[60px] text-[#505050] text-center">
      {headingText}
      <span className="font-Grand-Hotel text-3xl lg:text-[60px] ml-4 text-primary-blue">
        {spanText}
      </span>
      <span> {last}</span>
    </h1>
  );
};

export default ClientHeading;
