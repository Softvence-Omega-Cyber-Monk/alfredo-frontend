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
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

const weekDays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

const CalendarRangePicker = ({
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

  console.log("Selected Range:", availabilityDates);

  const renderCalendar = (offset: number) => {
    const monthDate = addMonths(currentMonth, monthOffset + offset);
    const start = startOfMonth(monthDate);
    const end = endOfMonth(monthDate);
    const days = eachDayOfInterval({ start, end });
    const blanks = Array.from({ length: (start.getDay() + 6) % 7 });

    const isFirstCalendar = offset === 0;

    return (
      <div className="w-full ">
        <div className="flex justify-between items-center mb-2">
          {isFirstCalendar ? (
            <button
              onClick={() => setMonthOffset((prev) => prev - 1)}
              className="p-1 rounded hover:bg-[#808080]"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
          ) : (
            <div className="w-5 h-5" /> // placeholder to align
          )}

          <h2 className="text-center text-base font-semibold text-[#808080]">
            {format(monthDate, "MMMM yyyy")}
          </h2>

          {!isFirstCalendar ? (
            <button
              onClick={() => setMonthOffset((prev) => prev + 1)}
              className="p-1 rounded hover:bg-[#808080]"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          ) : (
            <div className="w-5 h-5" /> // placeholder to align
          )}
        </div>

        <hr className="text-[#808080] mb-5" />
        <div className="grid grid-cols-7 text-xs font-medium text-blue-600 mb-2">
          {weekDays.map((day) => (
            <div key={day} className="text-center">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 text-sm">
          {blanks.map((_, index) => (
            <div key={`blank-${index}`} className="text-center h-8" />
          ))}
          {days.map((day) => {
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

            return (
              <button
                key={day.toISOString()}
                onClick={() => handleDayClick(day)}
                className={clsx(
                  "h-8 w-8 text-center rounded-full transition-all",
                  isSelected && "bg-blue-500 text-white",
                  isInRange && !isSelected && "bg-blue-100 text-blue-700",
                  !isSelected && !isInRange && "hover:bg-blue-50"
                )}
              >
                {format(day, "d")}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full mx-auto p-6 rounded-2xl shadow-sm bg-white">
      <div className="flex items-center justify-between mb-4 bg-blue-50 px-4 py-2 rounded-md text-blue-600">
        <span className="flex items-center gap-2">
          Start date <HiOutlineArrowNarrowRight /> End date
        </span>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {renderCalendar(0)}
        {renderCalendar(1)}
      </div>
    </div>
  );
};

export default CalendarRangePicker;
