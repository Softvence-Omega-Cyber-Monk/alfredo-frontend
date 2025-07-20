type SectionTitleProps = {
  title: string;
};

export const Title = ({ title }: SectionTitleProps) => {
  return (
    <div>
      <h1 className="text-[#3174CD] font-dm-sans text-[40px] leading-[60px] not-italic font-DM-sans">
        {title}
      </h1>
    </div>
  );
};

export default Title;
