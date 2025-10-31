import { useTranslation } from "react-i18next";

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
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  return (
    <h1 className="text-3xl lg:text-[60px] text-[#505050] text-center">
      {headingText}
      <span
        className={`font-Grand-Hotel text-3xl lg:text-[60px] text-primary-blue  ${
          currentLanguage === "el" ? "ml-0 -tracking-[2px]" : "ml-3"
        }`}
      >
        {spanText}
      </span>
      <span> {last}</span>
    </h1>
  );
};

export default ClientHeading;
