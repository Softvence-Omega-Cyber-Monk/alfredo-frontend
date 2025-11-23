import { Link } from "react-router-dom";
import { ReactNode, ComponentType, SVGProps } from "react";

interface CardButton {
  label: string;
  icon?: string | ComponentType<SVGProps<SVGSVGElement>>;
  rightIcon?: ComponentType<SVGProps<SVGSVGElement>>;
  onClick?: () => void;
  to?: string;
  type: "button" | "link";
}

interface CardButtonsProps {
  buttons: CardButton[];
  className?: string;
}

const CardButtons = ({ buttons, className = "" }: CardButtonsProps) => {
  const renderButton = (button: CardButton, index: number) => {
    // Prepare content node
    const content: ReactNode = (
      <div className="flex items-center gap-2 h-[64px]">
        {button.icon &&
          (typeof button.icon === "string" ? (
            <img src={button.icon} alt="icon" className="w-8 h-8" />
          ) : (
            // It's a React component
            <button.icon className="w-10 h-10 text-primary-blue" />
          ))}
        <p className="text-lg font-medium text-primary-blue ml-5">
          {button.label}
        </p>
        {button.rightIcon && (
          <button.rightIcon className="w-5 h-5 text-primary-blue ml-auto" />
        )}
      </div>
    );

    const baseClasses =
      "p-6 flex flex-col gap-2.5 border rounded-lg cursor-pointer transition-all border-gray-200 hover:bg-[#F4F7FC] hover:border-primary-blue hover:shadow-[0_0_24px_0_rgba(49,116,205,0.25)]";

    if (button.type === "link" && button.to) {
      return (
        <Link key={index} to={button.to} className={baseClasses}>
          {content}
        </Link>
      );
    }
    // button
    return (
      <div key={index} onClick={button.onClick} className={baseClasses}>
        {content}
      </div>
    );
  };

  return (
    <div className={`mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 ${className}`}>
      {buttons.map((button, i) => renderButton(button, i))}
    </div>
  );
};

export default CardButtons;
