import { useState, useRef } from "react";

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
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else {
      setOpenIndexes(openIndexes[0] === index ? [] : [index]);
    }
  };

  return (
    <div className="w-full flex flex-col gap-8 max-[767px]:gap-5">
      {items.map((item, index) => {
        const isOpen = openIndexes.includes(index);

        return (
          <div key={index} className="w-full">
            {/* Title Button */}
            <button
              onClick={() => toggleIndex(index)}
              className="w-full flex justify-between items-center text-left cursor-pointer gap-4 max-[767px]:gap-3"
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${index}`}
              id={`accordion-header-${index}`}
            >
              <div
                className={`flex items-start gap-2 text-[20px] md:text-[24px] max-[767px]:text-[16px] max-[767px]:leading-snug ${
                  isOpen ? "text-[#3174cd]" : "text-basic-dark"
                }`}
              >
                <span>{index + 1}.</span>
                <span>{item.title}</span>
              </div>

              {/* Inline SVG Arrow */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="11"
                viewBox="0 0 18 11"
                className={`transition-transform duration-300 ease-in-out ${
                  isOpen ? "rotate-180 fill-[#3174cd]" : "fill-[#505050]"
                } h-6 w-6 max-[767px]:h-5 max-[767px]:w-5`}
              >
                <path d="M16.7388 2.40021L17.4888 2.40021L17.4888 0.900209L16.7388 0.900209L16.7388 2.40021ZM8.38073 8.99069C8.18239 9.35433 8.31639 9.8099 8.68003 10.0082C9.04367 10.2066 9.49925 10.0726 9.69759 9.70894L8.38073 8.99069ZM8.26561 9.63073C8.42079 10.0148 8.85792 10.2003 9.24197 10.0451C9.62601 9.88996 9.81155 9.45283 9.65637 9.06878L8.26561 9.63073ZM1.26138 0.900146L0.511385 0.900146L0.511385 2.40015L1.26138 2.40015L1.26138 0.900146ZM16.7388 1.65021L16.7388 0.900209C15.6032 0.900209 14.5157 1.51385 13.5854 2.27184C12.6368 3.0448 11.7436 4.05706 10.983 5.04143C10.2189 6.03022 9.56997 7.01528 9.11295 7.751C8.884 8.11956 8.70218 8.42724 8.57709 8.6437C8.51452 8.75198 8.46608 8.83753 8.43296 8.8966C8.41641 8.92614 8.40367 8.94906 8.39492 8.9649C8.39054 8.97282 8.38716 8.97896 8.38479 8.98328C8.38361 8.98544 8.38267 8.98714 8.382 8.98838C8.38166 8.989 8.38138 8.9895 8.38117 8.98988C8.38107 8.99008 8.38096 8.99028 8.3809 8.99037C8.38081 8.99055 8.38073 8.99069 9.03916 9.34982C9.69759 9.70894 9.69754 9.70903 9.69751 9.70908C9.69753 9.70906 9.69751 9.70908 9.69754 9.70904C9.69758 9.70896 9.69769 9.70876 9.69786 9.70845C9.6982 9.70782 9.6988 9.70673 9.69965 9.70519C9.70134 9.7021 9.70403 9.69721 9.70771 9.69056C9.71506 9.67726 9.72634 9.65694 9.7414 9.63009C9.77151 9.57637 9.81671 9.49651 9.87581 9.39424C9.99405 9.18964 10.1677 8.89578 10.3871 8.54251C10.8269 7.83454 11.4466 6.89471 12.1699 5.95859C12.8967 5.01806 13.7097 4.10542 14.5329 3.4347C15.3744 2.74901 16.1243 2.40021 16.7388 2.40021L16.7388 1.65021ZM8.96099 9.34975C9.65637 9.06878 9.65629 9.06857 9.65619 9.06834C9.65615 9.06823 9.65604 9.06796 9.65595 9.06773C9.65576 9.06726 9.65552 9.06668 9.65523 9.06597C9.65466 9.06457 9.6539 9.0627 9.65295 9.06038C9.65105 9.05572 9.64839 9.04924 9.64497 9.04097C9.63813 9.02445 9.62828 9.00082 9.61545 8.97056C9.58979 8.91004 9.55223 8.82294 9.50315 8.71306C9.40504 8.49339 9.26065 8.18205 9.0731 7.80947C8.69894 7.06619 8.14843 6.07 7.44571 5.06902C6.74571 4.07191 5.87654 3.04384 4.85795 2.25909C3.83829 1.4735 2.62633 0.900146 1.26138 0.900146L1.26138 1.65015L1.26138 2.40015C2.19069 2.40015 3.0883 2.78924 3.94249 3.44733C4.79775 4.10626 5.5667 5.00309 6.21804 5.93088C6.86665 6.8548 7.3807 7.78351 7.73327 8.48391C7.90908 8.83317 8.04359 9.12336 8.13355 9.32476C8.1785 9.42541 8.21226 9.50374 8.23442 9.55601C8.24549 9.58214 8.25367 9.60175 8.25889 9.61436C8.26149 9.62066 8.26336 9.62522 8.26449 9.62797C8.26505 9.62934 8.26542 9.63027 8.26561 9.63073C8.2657 9.63096 8.26575 9.63108 8.26575 9.63108C8.26575 9.63108 8.26572 9.63099 8.26572 9.63099C8.26567 9.63087 8.26561 9.63073 8.96099 9.34975Z" />
              </svg>
            </button>

            {/* Accordion Content */}
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
              className="overflow-hidden transition-all duration-400 ease-in-out text-basic-dark text-[18px] leading-relaxed pt-4 max-[767px]:text-sm max-[767px]:leading-[1.6rem]"
            >
              <p>{item.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AccordionComponent;
