interface DescriptionProps {
  dates: {
    from: string;
    to: string;
  };
  description: {
    text: string;
    homeId: string;
  };
}

const Description = ({ dates, description }: DescriptionProps) => {
  return (
    <div>
      <h2 className="text-lg md:text-xl text-dark-2 font-regular mb-6 md:mb-10">
        <span className="font-semibold text-primary-blue pr-3">
          Available From:
        </span>
        {dates.from} to {dates.to}
      </h2>

      <h2 className="font-semibold text-primary-blue text-lg md:text-xl pb-1 md:pb-3 border-b border-[#BFD4F0] font-regular mb-3 md:mb-6">
        Description
      </h2>
      <p className="text-sm md:text-lg font-regular text-dark-3 whitespace-pre-line">
        {description.text}
      </p>
      <br />
      <p className="text-md md:text-lg font-regular text-dark-3">
        <span className="text-dark-2">Home ID:</span> <br />
        {description.homeId} Copied URL!
      </p>
    </div>
  );
};

export default Description;
