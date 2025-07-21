import { useState } from "react";
import { format } from "date-fns";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import PrimaryButton from "../reusable/PrimaryButton";
import map from "@/assets/icons/Location.svg";
import user from "@/assets/icons/userRounded.svg";
import home from "@/assets/icons/homeType.svg";
import calendar from "@/assets/icons/Calendar.svg";

const SearchFilter = () => {
  const [date, setDate] = useState<Date>();

  return (
    <div
      className="w-full max-w-[1066px] mx-auto px-[26px] py-5 sm:px-4 md:px-6 bg-transparent rounded-xl lg:rounded-full"
      style={{
        backgroundImage: `url("/footerBg.svg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="bg-white rounded-xl lg:rounded-full lg:px-10 lg:py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 divide-y lg:divide-y-0 lg:divide-x divide-[#BFD4F0] p-4">
          <div className="w-full sm:px-4">
            <label
              htmlFor="location"
              className="block text-sm text-dark-3 mb-1"
            >
              Where you go?
            </label>
            <div className="flex items-center gap-1 text-dark-2 text-base">
              <img src={map} alt="map icon" className="w-4 h-4 md:w-5 md:h-5" />
              <Input
                id="location"
                placeholder="Place in Greece"
                className="outline-none w-full text-sm md:text-base bg-transparent border-none focus:border-none focus:ring-0 focus:ring-transparent shadow-none p-0 placeholder:text-base text-dark-2 placeholder:text-dark-2 cursor-pointer"
              />
            </div>
          </div>

          <div className="w-full sm:px-4">
            <label htmlFor="people" className="block text-sm text-dark-3 mb-1">
              Guests
            </label>
            <div className="flex items-center gap-1 text-dark-2 text-base">
              <img
                src={user}
                alt="user icon"
                className="w-4 h-4 md:w-5 md:h-5"
              />
              <Input
                id="people"
                type="number"
                min={1}
                placeholder="Select Here"
                className="outline-none w-full text-sm md:text-base bg-transparent border-none focus:border-none focus:ring-0 focus:ring-transparent shadow-none p-0 placeholder:text-base text-dark-2 placeholder:text-dark-2 cursor-pointer"
              />
            </div>
          </div>

          <div className="w-full sm:px-4">
            <label htmlFor="type" className="block text-sm text-dark-3 mb-2">
              Property Type
            </label>
            <div className="flex items-center gap-2 text-dark-2 text-base">
              <img
                src={home}
                alt="home icon"
                className="w-4 h-4 md:w-5 md:h-5"
              />
              <Select>
                <SelectTrigger className="outline-none w-full text-sm md:text-base bg-transparent border-none focus:border-none focus:ring-0 focus:ring-transparent shadow-none p-0 placeholder:text-base">
                  <SelectValue placeholder="Home" />
                </SelectTrigger>
                <SelectContent className="bg-white border-primary-border-color">
                  <SelectItem value="home">Home</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="cabin">Cabin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="w-full sm:px-4">
            <label
              htmlFor="homeDate"
              className="block text-sm text-dark-3 mb-2"
            >
              Check-in Date
            </label>
            <div className="flex items-center gap-2 text-dark-2 text-base">
              <img
                src={calendar}
                alt="calendar icon"
                className="w-4 h-7 md:w-5 md:h-7"
              />
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    data-empty={!date}
                    className="data-[empty=true]:text-muted-foreground justify-start text-left font-normal col-span-3 outline-none w-full text-sm md:text-base bg-transparent border-none focus:border-none focus:ring-0 focus:ring-transparent shadow-none p-0 placeholder:text-base"
                  >
                    {date ? format(date, "PP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white border-primary-border-color">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="w-full lg:pl-6 sm:col-span-2 md:mt-6 lg:mt-0 lg:col-span-1 flex items-center justify-end">
            <PrimaryButton
              title="Search"
              textColor="text-white w-full text-sm md:text-base lg:text-lg"
              bgColor="bg-primary-blue hover:brightness-80"
              borderColor=""
              bgImage="/buttonHomeIcon.svg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
