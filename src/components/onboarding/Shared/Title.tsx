type SectionTitleProps = {
  title: string;
};

export const Title = ({ title }: SectionTitleProps) => {
  return (
    <div>
      <h1 className="text-[#3174CD] font-dm-sans text-3xl md:text-4xl lg:text-[40px] lg:leading-[60px] not-italic font-DM-sans text-center md:text-left">
        {title}
      </h1>
    </div>
  );
};

export default Title;
