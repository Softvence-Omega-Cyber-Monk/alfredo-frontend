import { useState } from "react";
import {
  addMonths,
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import clsx from "clsx";
// import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
// import { useTranslation } from "react-i18next";

const weekDays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

const CalendarRangePickerNew = ({
  availabilityDates,
  onAvailabilityChange,
}: {
  availabilityDates: { start: Date | null; end: Date | null };
  onAvailabilityChange: (dates: {
    start: Date | null;
    end: Date | null;
  }) => void;
}) => {
  const [currentMonth] = useState(new Date());
  const [monthOffset, setMonthOffset] = useState(0);
  const [slideDirection, setSlideDirection] = useState<"left" | "right" | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);


  const handleMonthChange = (direction: "prev" | "next") => {
    if (isAnimating) return;

    setIsAnimating(true);
    setSlideDirection(direction === "prev" ? "right" : "left");

    setTimeout(() => {
      setMonthOffset((prev) => direction === "prev" ? prev - 1 : prev + 1);
      setSlideDirection(null);
      setIsAnimating(false);
    }, 300);
  };

  const handleDayClick = (day: Date) => {
    if (
      !availabilityDates.start ||
      (availabilityDates.start && availabilityDates.end)
    ) {
      onAvailabilityChange({ start: day, end: null });
    } else if (availabilityDates.start && !availabilityDates.end) {
      if (day < availabilityDates.start) {
        onAvailabilityChange({ start: day, end: availabilityDates.start });
      } else {
        onAvailabilityChange({ start: availabilityDates.start, end: day });
      }
    }
  };

  const renderCalendar = (offset: number) => {
    const monthDate = addMonths(currentMonth, monthOffset + offset);
    const start = startOfMonth(monthDate);
    const end = endOfMonth(monthDate);
    const days = eachDayOfInterval({ start, end });
    const blanks = Array.from({ length: (start.getDay() + 6) % 7 });

    const isFirstCalendar = offset === 0;

    return (
      <div className="w-full z-80">
        <div className="flex justify-between items-center mb-4">
          {isFirstCalendar ? (
            <button
              type="button"
              onClick={() => handleMonthChange("prev")}
              disabled={isAnimating}
              className="p-2 rounded-full hover:bg-blue-100 transition-all duration-200 hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <ChevronLeftIcon className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
            </button>
          ) : (
            <div className="w-9 h-9 hidden md:block" />
          )}

          <h2 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            {format(monthDate, "MMMM yyyy")}
          </h2>

          {!isFirstCalendar ? (
            <button
              type="button"
              onClick={() => handleMonthChange("next")}
              disabled={isAnimating}
              className="p-2 rounded-full hover:bg-blue-100 transition-all duration-200 hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <ChevronRightIcon className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => handleMonthChange("next")}
                disabled={isAnimating}
                className="p-2 rounded-full hover:bg-blue-100 transition-all duration-200 hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group md:hidden"
              >
                <ChevronRightIcon className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
              </button>
              <div className="w-9 h-9 hidden md:block" />
            </>
          )}
        </div>

        <div className="h-[1px] bg-gradient-to-r from-transparent via-blue-200 to-transparent mb-6" />

        <div className="grid grid-cols-7 text-xs font-semibold text-blue-500/70 mb-3">
          {weekDays.map((day) => (
            <div key={day} className="text-center py-2">
              {day}
            </div>
          ))}
        </div>

        <div
          className={clsx(
            "grid grid-cols-7 gap-1 text-sm transition-all duration-300 ease-in-out",
            slideDirection === "left" && "animate-slideOutLeft",
            slideDirection === "right" && "animate-slideOutRight"
          )}
        >
          {blanks.map((_, index) => (
            <div key={`blank-${index}`} className="aspect-square w-full max-w-[40px]" />
          ))}
          {days.map((day, index) => {
            const isSelected =
              (availabilityDates.start &&
                isSameDay(day, availabilityDates.start)) ||
              (availabilityDates.end && isSameDay(day, availabilityDates.end));

            const isInRange =
              availabilityDates.start &&
              availabilityDates.end &&
              isWithinInterval(day, {
                start: availabilityDates.start,
                end: availabilityDates.end,
              });

            const isStartDate = availabilityDates.start && isSameDay(day, availabilityDates.start);
            const isEndDate = availabilityDates.end && isSameDay(day, availabilityDates.end);

            return (
              <button
                type="button"
                key={day.toISOString()}
                onClick={() => handleDayClick(day)}
                style={{
                  animationDelay: `${index * 15}ms`
                }}
                className={clsx(
                  "aspect-square w-full max-w-[40px] flex items-center justify-center mx-auto rounded-full transition-all duration-300 ease-out font-medium relative overflow-hidden group",
                  "animate-fadeInScale",
                  isSelected && "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/50 scale-105 z-10",
                  isInRange && !isSelected && "bg-blue-50 text-blue-700",
                  !isSelected && !isInRange && "hover:bg-blue-50 hover:scale-110 hover:shadow-md text-gray-700",
                  isStartDate && "rounded-r-none",
                  isEndDate && "rounded-l-none"
                )}
              >
                <span className="relative z-10">{format(day, "d")}</span>
                {!isSelected && !isInRange && (
                  <span className="absolute inset-0 bg-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  // const { t } = useTranslation("onboarding");

  return (
    <div className="w-full mx-auto p-8 rounded-3xl shadow-xl bg-gradient-to-br from-white to-blue-50/30 border border-blue-100/50 backdrop-blur-sm">
      {/* <div className="flex items-center justify-between mb-6 bg-gradient-to-r from-blue-50 to-blue-100/50 px-6 py-3 rounded-2xl border border-blue-200/50 shadow-sm">
        <span className="flex items-center gap-3 text-blue-700 font-medium">
          <span className="animate-pulse">{t("onboarding.part7.date1")}</span>
          <HiOutlineArrowNarrowRight className="text-blue-500 animate-bounce-horizontal" />
          <span className="animate-pulse" style={{ animationDelay: "0.5s" }}>{t("onboarding.part7.date2")}</span>
        </span>
      </div> */}

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          {renderCalendar(0)}
        </div>
        <div className="hidden md:block w-full md:w-1/2">
          {renderCalendar(1)}
        </div>
      </div>

      <style>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideOutLeft {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(-30px);
            opacity: 0;
          }
        }

        @keyframes slideOutRight {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(30px);
            opacity: 0;
          }
        }

        @keyframes bounceHorizontal {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(5px);
          }
        }

        .animate-fadeInScale {
          animation: fadeInScale 0.4s ease-out forwards;
        }

        .animate-slideOutLeft {
          animation: slideOutLeft 0.3s ease-in-out forwards;
        }

        .animate-slideOutRight {
          animation: slideOutRight 0.3s ease-in-out forwards;
        }

        .animate-bounce-horizontal {
          animation: bounceHorizontal 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default CalendarRangePickerNew;