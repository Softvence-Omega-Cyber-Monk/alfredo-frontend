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

const weekDays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

const CalendarRangePicker = () => {
  const [currentMonth] = useState(new Date());
  const [selectedRange, setSelectedRange] = useState<{
    start: Date | null;
    end: Date | null;
  }>({
    start: null,
    end: null,
  });

  const handleDayClick = (day: Date) => {
    if (!selectedRange.start || (selectedRange.start && selectedRange.end)) {
      setSelectedRange({ start: day, end: null });
    } else if (selectedRange.start && !selectedRange.end) {
      if (day < selectedRange.start) {
        setSelectedRange({ start: day, end: selectedRange.start });
      } else {
        setSelectedRange({ ...selectedRange, end: day });
      }
    }
  };

  const renderCalendar = (monthOffset: number) => {
    const monthDate = addMonths(currentMonth, monthOffset);
    const start = startOfMonth(monthDate);
    const end = endOfMonth(monthDate);
    const days = eachDayOfInterval({ start, end });
    const blanks = Array.from({ length: (start.getDay() + 6) % 7 });

    return (
      <div className="w-full">
        <h2 className="text-center text-base font-semibold text-gray-800 mb-2">
          {format(monthDate, "MMMM yyyy")}
        </h2>
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
              (selectedRange.start && isSameDay(day, selectedRange.start)) ||
              (selectedRange.end && isSameDay(day, selectedRange.end));

            const isInRange =
              selectedRange.start &&
              selectedRange.end &&
              isWithinInterval(day, {
                start: selectedRange.start,
                end: selectedRange.end,
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
    <div className="w-full max-w-4xl mx-auto p-6  rounded-2xl shadow-sm bg-white">
      <div className="flex items-center justify-between mb-4 bg-blue-50 px-4 py-2 rounded-md text-blue-600">
        <span className="flex justify-baseline items-center gap-2">
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
