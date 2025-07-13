import { useState, useRef } from "react";
import icn from "../../assets/Vector.svg"; // your SVG icon

interface AccordionItem {
  title: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultipleOpen?: boolean;
}

const AccordionComponent: React.FC<AccordionProps> = ({
  items,
  allowMultipleOpen = false,
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
    <div className="w-full flex flex-col gap-8">
      {items.map((item, index) => {
        const isOpen = openIndexes.includes(index);
        return (
          <div key={index} className="w-full">
            {/* Title Row */}
            <button
              onClick={() => toggleIndex(index)}
              className="w-full flex justify-between items-center text-left cursor-pointer"
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${index}`}
              id={`accordion-header-${index}`}
            >
              <div className="flex items-center gap-2 text-[20px] md:text-[24px] lg:text-[24px] text-basic-dark">
                <span>{index + 1}.</span>
                <span>{item.title}</span>
              </div>
              <img
                src={icn}
                alt="arrow"
                className={`h-6 w-6 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
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
              className="overflow-hidden transition-[max-height] duration-300 text-basic-dark text-[18px] leading-relaxed pt-4"
            >
              <p className="">{item.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AccordionComponent;
