import React from 'react';

interface HowItWorksCardProps {
  mainImage: string;
  backgroundImage: string;
  title: string;
  description: string;
  backgroundColor: string;
  titleColor: string;
}

const HowItWorksCard: React.FC<HowItWorksCardProps> = ({
  mainImage,
  backgroundImage,
  title,
  description,
  backgroundColor,
  titleColor,
}) => {
  return (
    <div 
      className="relative rounded-xl md:rounded-2xl lg:rounded-[40px] p-4 sm:p-6 md:p-8 lg:p-10"
      style={{ backgroundColor }}
    >
      {/* Background Image */}
      <div className="absolute bottom-0 right-0 z-0 opacity-100">
        <img
          src={backgroundImage}
          className="w-24 md:w-32 lg:w-48 object-contain"
          alt=""
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center gap-2 text-center">
        <img
          src={mainImage}
          className="h-20 w-20 md:h-24 md:w-24 lg:h-28 lg:w-28 object-contain"
          alt=""
        />
        <h3
          className="font-semibold text-base sm:text-lg md:text-xl lg:text-2xl"
          style={{ color: titleColor }}
        >
          {title}
        </h3>
        <p className="text-dark-3 font-normal text-sm sm:text-base md:text-base px-2 md:px-0">
          {description}
        </p>
      </div>
    </div>
  );
};

export default HowItWorksCard;
