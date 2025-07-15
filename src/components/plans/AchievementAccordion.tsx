import { useState, useRef } from "react";
import icn from "@/assets/icons/arrowDownBlack.svg";

interface Achievement {
  id: number;
  borderColor?: string;
  bgColor?: string;
  icon: string;
  title?: string;
  description: string;
  titleColor?: string;
  descriptionColor?: string;
  cardType?: "default" | "iconOnly" | "bgImage";
  bgImage?: string;
  bgTitle?: string;
}

interface AccordionItem {
  id: number;
  achievementsType: string;
  achievementsTypeIcon: string;
  achievements: Achievement[];
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultipleOpen?: boolean;
}

const AchievementAccordion: React.FC<AccordionProps> = ({
  items,
  allowMultipleOpen = true,
}) => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleIndex = (index: number) => {
    if (allowMultipleOpen) {
      setOpenIndexes((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index]
      );
    } else {
      setOpenIndexes(openIndexes[0] === index ? [] : [index]);
    }
  };

  return (
    <div className="w-full flex flex-col gap-8 max-[767px]:gap-5 p-4 lg:p-6 bg-[#FBFBFB] rounded-[32px]">
      {items.map((item, index) => {
        const isOpen = openIndexes.includes(index);
        return (
          <div
            key={index}
            className="w-full p-3 lg:p-6 border border-[#BFD4F0] rounded-2xl bg-white"
          >
            {/* Title Row */}
            <button
              onClick={() => toggleIndex(index)}
              className="w-full flex justify-between items-center text-left cursor-pointer gap-4 max-[767px]:gap-3"
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${index}`}
              id={`accordion-header-${index}`}
            >
              <div className="flex items-center gap-2 font-semibold text-[20px] lg:text-[24px] text-dark-2 max-[767px]:text-[16px] max-[767px]:leading-snug">
                <img
                  src={item.achievementsTypeIcon}
                  className="w-7 h-7"
                  alt=""
                />
                <p>{item.achievementsType}</p>
              </div>
              <div className="p-2 rounded-lg">
                <img
                  src={icn}
                  alt="arrow"
                  className={`h-4 w-4 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
            </button>

            {/* Content */}
            <div
              ref={(el) => {
                contentRefs.current[index] = el;
              }}
              id={`accordion-content-${index}`}
              role="region"
              aria-labelledby={`accordion-header-${index}`}
              style={{
                maxHeight: isOpen
                  ? contentRefs.current[index]?.scrollHeight + "px"
                  : "0px",
              }}
              className="overflow-hidden transition-[max-height] h-auto duration-300"
            >
              <div className="pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {item.achievements.map((achievement) => {
                    const {
                      id,
                      icon,
                      title,
                      description,
                      borderColor,
                      bgColor,
                      titleColor,
                      descriptionColor,
                      cardType = "default",
                      bgImage,
                      bgTitle,
                    } = achievement;

                    if (cardType === "iconOnly") {
                      return (
                        <div
                          key={id}
                          className="flex flex-col items-center justify-center gap-2 text-center"
                        >
                          <img src={icon} alt={title} className="w-10 h-10" />
                          <h3 className="text-base font-semibold">{title}</h3>
                          <p className="text-sm text-gray-500">{description}</p>
                        </div>
                      );
                    }

                    if (cardType === "bgImage" && bgImage) {
                      return (
                        <div
                        key={id}
                        className="rounded-xl p-6 border"
                        style={{
                          backgroundColor: bgColor,
                          borderColor: borderColor,
                        }}
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <div
                            className="w-10 h-10 flex justify-center items-center rounded-full relative overflow-hidden"
                            
                          >
                            <img src={bgImage} alt={title} className="w-full" />
                            <p className="absolute text-white">{bgTitle}</p>
                          </div>
                          <h3
                            className="text-[20px] font-semibold"
                            style={{ color: titleColor }}
                          >
                            {title}
                          </h3>
                        </div>
                        <p
                          className="text-base font-normal"
                          style={{ color: descriptionColor }}
                        >
                          {description}
                        </p>
                      </div>
                      );
                    }

                    // Default Card
                    return (
                      <div
                        key={id}
                        className="rounded-xl p-6 border"
                        style={{
                          backgroundColor: bgColor,
                          borderColor: borderColor,
                        }}
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <div
                            className="w-10 h-10 flex justify-center items-center rounded-full"
                            style={{
                              backgroundColor: descriptionColor,
                            }}
                          >
                            <img src={icon} alt={title} className="w-4 h-4" />
                          </div>
                          <h3
                            className="text-[20px] font-semibold"
                            style={{ color: titleColor }}
                          >
                            {title}
                          </h3>
                        </div>
                        <p
                          className="text-base font-normal"
                          style={{ color: descriptionColor }}
                        >
                          {description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AchievementAccordion;
