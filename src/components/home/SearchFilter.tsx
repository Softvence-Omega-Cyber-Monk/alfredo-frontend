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
import { useTranslation } from "react-i18next";
import { DateRange } from "react-day-picker";
import { useSearch } from "@/contexts/SearchContext";

const SearchFilter = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const { t } = useTranslation("banner");
  const { setSearchParams, performSearch } = useSearch();

  const [localSearch, setLocalSearch] = useState({
    destination: "",
    maxPeople: "",
    propertyType: "",
    availabilityStartDate: "",
    amenities: [] as string[],
    isTravelWithPets: false,
  });

  const handleInputChange = (
    field: string,
    value: string | string[] | boolean
  ) => {
    setLocalSearch((prev) => ({ ...prev, [field]: value }));
  };

  const handleSearch = () => {
    const params: any = {};

    if (localSearch.destination) params.location = localSearch.destination;
    if (localSearch.maxPeople)
      params.maxPeople = parseInt(localSearch.maxPeople);
    if (localSearch.propertyType)
      params.propertyType = localSearch.propertyType;
    if (dateRange?.from)
      params.availabilityStartDate = dateRange.from.toISOString();
    if (dateRange?.to) params.availabilityEndDate = dateRange.to.toISOString();
    if (localSearch.amenities.length > 0)
      params.amenities = localSearch.amenities.join(",");
    params.isTravelWithPets = localSearch.isTravelWithPets;

    setSearchParams(params);
    performSearch();
  };

  return (
    <div
      className="w-full max-w-[2066px] mx-auto px-4 py-6 rounded-xl lg:rounded-full"
      style={{
        backgroundImage: `url("/footerBg.svg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="bg-white rounded-xl lg:rounded-full px-4 lg:px-8 py-6 shadow-md">
        {/* Responsive row */}
        <div className="flex flex-col lg:flex-row items-stretch gap-6">
          {/* Destination */}
          <div className="flex-1">
            <label
              htmlFor="location"
              className="block text-sm text-dark-3 mb-1"
            >
              {t("search.placeholder")}
            </label>
            <div className="flex items-center gap-2">
              <img src={map} alt="map icon" className="w-5 h-5" />
              <Input
                id="location"
                value={localSearch.destination}
                onChange={(e) =>
                  handleInputChange("destination", e.target.value)
                }
                placeholder={t("search.placeInGreece")}
                className="w-full text-sm md:text-base bg-transparent border-none focus:ring-0 shadow-none"
              />
            </div>
          </div>

          {/* Guests */}
          <div className="flex-1">
            <label htmlFor="people" className="block text-sm text-dark-3 mb-1">
              {t("search.guest")}
            </label>
            <div className="flex items-center gap-2">
              <img src={user} alt="user icon" className="w-5 h-5" />
              <Input
                id="people"
                value={localSearch.maxPeople}
                onChange={(e) => handleInputChange("maxPeople", e.target.value)}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder={t("search.selectHere")}
                className="w-full text-sm md:text-base bg-transparent border-none focus:ring-0 shadow-none"
                onKeyPress={(e) => {
                  if (!/[0-9]/.test(e.key)) e.preventDefault();
                }}
              />
            </div>
          </div>

          {/* Property Type */}
          <div className="flex-1">
            <label htmlFor="type" className="block text-sm text-dark-3 mb-1">
              {t("search.propertyType")}
            </label>
            <div className="flex items-center gap-2">
              <img src={home} alt="home icon" className="w-5 h-5" />
              <Select
                value={localSearch.propertyType}
                onValueChange={(value) =>
                  handleInputChange("propertyType", value)
                }
              >
                <SelectTrigger className="w-full border-[#C4D7F1] cursor-pointer">
                  <SelectValue placeholder={t("search.home")} />
                </SelectTrigger>
                <SelectContent className="bg-white border-none cursor-pointer">
                  <SelectItem className="cursor-pointer" value="HOME">
                    {t("search.home")}
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="APARTMENT">
                    {t("search.apartment")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Dates */}
          <div className="flex-1">
            <label
              htmlFor="homeDate"
              className="block text-sm text-dark-3 mb-1"
            >
              {t("search.dates")}
            </label>
            <div className="flex items-center gap-2">
              <img src={calendar} alt="calendar icon" className="w-5 h-5" />
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    data-empty={!dateRange?.from}
                    className="w-full text-left font-normal bg-transparent border-none focus:ring-0 shadow-none"
                  >
                    {dateRange?.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "LLL dd, y")} -{" "}
                          {format(dateRange.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      <span>{t("search.pickADateRange")}</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white border">
                  <Calendar
                    mode="range"
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={1}
                    className="[--rdp-accent-color:#3174cd] [--rdp-background-color:theme(colors.blue.200)]"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Amenities */}
          <div className="flex-1">
            <label
              htmlFor="amenities"
              className="block text-sm text-dark-3 mb-1"
            >
              Amenities
            </label>
            <Select
              onValueChange={(value) =>
                handleInputChange("amenities", [
                  ...localSearch.amenities,
                  value,
                ])
              }
            >
              <SelectTrigger className="w-full  border-[#C4D7F1]">
                <SelectValue placeholder="amenities" />
              </SelectTrigger>
              <SelectContent className="bg-white border-none cursor-pointer">
                <SelectItem value="cmf81o2za0000mk1vw8xydieg">BBQ</SelectItem>
                <SelectItem
                  className=" cursor-pointer"
                  value="cmf81ozcx0001mk1varpgxbxd"
                >
                  Air Conditioner
                </SelectItem>
                <SelectItem
                  className=" cursor-pointer"
                  value="cmf81r9dt0002mk1vtla7e70y"
                >
                  Bicycle
                </SelectItem>
                <SelectItem
                  className=" cursor-pointer"
                  value="cmf81sidv0003mk1vhfujvaqi"
                >
                  Park
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Pets */}
          <div className="flex-1 flex items-center gap-2">
            <input
              id="pets"
              type="checkbox"
              checked={localSearch.isTravelWithPets}
              onChange={(e) =>
                handleInputChange("isTravelWithPets", e.target.checked)
              }
              className="w-5 h-5 cursor-pointer"
            />
            <label htmlFor="pets" className="text-sm text-dark-3">
              Travel with Pets
            </label>
          </div>

          {/* Search Button */}
          <div className="flex-1 flex items-end">
            <PrimaryButton
              onClick={handleSearch}
              title={t("search.search")}
              textColor="text-white w-full text-sm md:text-base text-center lg:text-lg"
              bgColor="bg-primary-blue hover:brightness-90"
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

// import { useState } from "react";
// import { format } from "date-fns";

// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Popover,
//   PopoverTrigger,
//   PopoverContent,
// } from "@/components/ui/popover";

// import PrimaryButton from "../reusable/PrimaryButton";
// import map from "@/assets/icons/Location.svg";
// import user from "@/assets/icons/userRounded.svg";
// import home from "@/assets/icons/homeType.svg";
// import calendar from "@/assets/icons/Calendar.svg";
// import { useTranslation } from "react-i18next";
// import { DateRange } from "react-day-picker";
// import { useSearch } from "@/contexts/SearchContext";

// const SearchFilter = () => {
//   const [dateRange, setDateRange] = useState<DateRange | undefined>();
//   const { t } = useTranslation("banner");
//   const { setSearchParams, performSearch } = useSearch();

//   const [localSearch, setLocalSearch] = useState({
//     destination: "",
//     maxPeople: "",
//     propertyType: "",
//     availabilityStartDate: "",
//     amenities: [] as string[], // multiple amenity IDs
//     isTravelWithPets: false, // boolean
//   });

//   const handleInputChange = (
//     field: string,
//     value: string | string[] | boolean
//   ) => {
//     setLocalSearch((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleSearch = () => {
//     const params: any = {};

//     if (localSearch.destination) params.location = localSearch.destination;
//     if (localSearch.maxPeople)
//       params.maxPeople = parseInt(localSearch.maxPeople);
//     if (localSearch.propertyType)
//       params.propertyType = localSearch.propertyType;
//     if (dateRange?.from)
//       params.availabilityStartDate = dateRange.from.toISOString();
//     if (dateRange?.to) params.availabilityEndDate = dateRange.to.toISOString();

//     // ✅ add amenities (comma-separated IDs)
//     if (localSearch.amenities.length > 0)
//       params.amenities = localSearch.amenities.join(",");

//     // ✅ add pets option
//     params.isTravelWithPets = localSearch.isTravelWithPets;

//     setSearchParams(params);
//     performSearch();
//   };

//   return (
//     <div
//       className="w-full max-w-[2066px] mx-auto px-[26px] py-5 sm:px-4 md:px-6 bg-transparent rounded-xl lg:rounded-full"
//       style={{
//         backgroundImage: `url("/footerBg.svg")`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//       }}
//     >
//       <div className="bg-white rounded-xl lg:rounded-full lg:px-10 lg:py-6">
//         <div className="lg:grid grid-cols-1 lg:grid-cols-12 gap-3 divide-y lg:divide-y-0  divide-[#BFD4F0]">
//           {/* Destination */}
//           <div className="w-full p-4 lg:col-span-3 sm:px-4 border-r-1">
//             <label
//               htmlFor="location"
//               className="block text-sm text-dark-3 mb-1"
//             >
//               {t("search.placeholder")}
//             </label>
//             <div className="flex items-center gap-1 text-dark-2 text-base">
//               <img src={map} alt="map icon" className="w-4 h-4 md:w-5 md:h-5" />
//               <Input
//                 id="location"
//                 value={localSearch.destination}
//                 onChange={(e) =>
//                   handleInputChange("destination", e.target.value)
//                 }
//                 placeholder={t("search.placeInGreece")}
//                 className="outline-none w-full text-sm md:text-base bg-transparent border-none focus:border-none focus:ring-0 focus:ring-transparent shadow-none p-0 placeholder:text-base text-dark-2 placeholder:text-dark-2 cursor-pointer"
//               />
//             </div>
//           </div>

//           {/* Guests */}
//           <div className="w-full p-4 lg:col-span-2 px-4 lg:px-2 border-r-1">
//             <label htmlFor="people" className="block text-sm text-dark-3 mb-1">
//               {t("search.guest")}
//             </label>
//             <div className="flex items-center gap-1 text-dark-2 text-base">
//               <img
//                 src={user}
//                 alt="user icon"
//                 className="w-4 h-4 md:w-5 md:h-5"
//               />
//               <Input
//                 id="people"
//                 value={localSearch.maxPeople}
//                 onChange={(e) => handleInputChange("maxPeople", e.target.value)}
//                 type="text"
//                 inputMode="numeric"
//                 pattern="[0-9]*"
//                 min={1}
//                 placeholder={t("search.selectHere")}
//                 className="outline-none w-full text-sm md:text-base bg-transparent border-none focus:border-none focus:ring-0 focus:ring-transparent shadow-none p-0 placeholder:text-base text-dark-2 placeholder:text-dark-2 cursor-pointer"
//                 onKeyPress={(e) => {
//                   if (!/[0-9]/.test(e.key)) e.preventDefault();
//                 }}
//               />
//             </div>
//           </div>

//           {/* Property Type */}
//           <div className="w-full p-4 lg:col-span-2 px-4 lg:px-2 border-r-1">
//             <label htmlFor="type" className="block text-sm text-dark-3 mb-2">
//               {t("search.propertyType")}
//             </label>
//             <div className="flex items-center gap-2 text-dark-2 text-base">
//               <img
//                 src={home}
//                 alt="home icon"
//                 className="w-4 h-4 md:w-5 md:h-5"
//               />
//               <Select
//                 value={localSearch.propertyType}
//                 onValueChange={(value) =>
//                   handleInputChange("propertyType", value)
//                 }
//               >
//                 <SelectTrigger className="outline-none w-full text-sm md:text-base bg-transparent border-none focus:border-none focus:ring-0 focus:ring-transparent shadow-none p-0">
//                   <SelectValue placeholder={t("search.home")} />
//                 </SelectTrigger>
//                 <SelectContent className="bg-white border-primary-border-color">
//                   <SelectItem value="HOME">{t("search.home")}</SelectItem>
//                   <SelectItem value="APARTMENT">
//                     {t("search.apartment")}
//                   </SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>

//           {/* Dates */}
//           <div className="w-full p-4 px-4 lg:px-2  lg:col-span-3 col-span-2 border-r-1">
//             <label
//               htmlFor="homeDate"
//               className="block text-sm text-dark-3 mb-2"
//             >
//               {t("search.dates")}
//             </label>
//             <div className="flex items-center gap-2 text-dark-2 text-base">
//               <img
//                 src={calendar}
//                 alt="calendar icon"
//                 className="w-4 h-7 md:w-5 md:h-7"
//               />
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <Button
//                     variant="outline"
//                     data-empty={!dateRange?.from}
//                     className="data-[empty=true]:text-muted-foreground justify-start text-left font-normal col-span-3 outline-none w-full text-sm bg-transparent border-none focus:border-none focus:ring-0 focus:ring-transparent shadow-none p-0"
//                   >
//                     {dateRange?.from ? (
//                       dateRange.to ? (
//                         <>
//                           {format(dateRange.from, "LLL dd, y")} -{" "}
//                           {format(dateRange.to, "LLL dd, y")}
//                         </>
//                       ) : (
//                         format(dateRange.from, "LLL dd, y")
//                       )
//                     ) : (
//                       <span>{t("search.pickADateRange")}</span>
//                     )}
//                   </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-auto p-0 bg-white border-primary-border-color">
//                   <Calendar
//                     mode="range"
//                     selected={dateRange}
//                     onSelect={setDateRange}
//                     numberOfMonths={1}
//                     className="[--rdp-accent-color:#3174cd] [--rdp-background-color:theme(colors.blue.200)]"
//                   />
//                 </PopoverContent>
//               </Popover>
//             </div>
//           </div>

//           {/* Amenities */}
//           <div className="w-full p-4 lg:col-span-2 border-r-1">
//             <label
//               htmlFor="amenities"
//               className="block text-sm text-dark-3 mb-2"
//             >
//               Amenities
//             </label>
//             <Select
//               onValueChange={(value) =>
//                 handleInputChange("amenities", [
//                   ...localSearch.amenities,
//                   value,
//                 ])
//               }
//             >
//               <SelectTrigger className="w-full border-[#BFD4F0] text-[#607688]">
//                 <SelectValue placeholder="Select amenities" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="cmf81o2za0000mk1vw8xydieg">BBQ</SelectItem>
//                 <SelectItem value="cmf81ozcx0001mk1varpgxbxd">
//                   Air Conditioner
//                 </SelectItem>
//                 <SelectItem value="cmf81r9dt0002mk1vtla7e70y">
//                   Bicycle
//                 </SelectItem>
//                 <SelectItem value="cmf81sidv0003mk1vhfujvaqi">Park</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           {/* Pets */}
//           <div className="w-full p-4 lg:col-span-1 border-r-1">
//             <label htmlFor="pets" className="block text-sm text-dark-3 mb-2">
//               Travel with Pets
//             </label>
//             <input
//               id="pets"
//               type="checkbox"
//               checked={localSearch.isTravelWithPets}
//               onChange={(e) =>
//                 handleInputChange("isTravelWithPets", e.target.checked)
//               }
//               className="w-5 h-5 cursor-pointer"
//             />
//           </div>

//           {/* Search Button */}
//           <div className="w-full lg:col-span-2 lg:pl-8 sm:col-span-2 my-6 md:my-0 flex items-center justify-end">
//             <PrimaryButton
//               onClick={handleSearch}
//               title={t("search.search")}
//               textColor="text-white w-full text-sm md:text-base text-center lg:text-lg"
//               bgColor="bg-primary-blue hover:brightness-80"
//               borderColor=""
//               bgImage="/buttonHomeIcon.svg"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SearchFilter;

// import { useState } from "react";
// import { format } from "date-fns";

// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Popover,
//   PopoverTrigger,
//   PopoverContent,
// } from "@/components/ui/popover";

// import PrimaryButton from "../reusable/PrimaryButton";
// import map from "@/assets/icons/Location.svg";
// import user from "@/assets/icons/userRounded.svg";
// import home from "@/assets/icons/homeType.svg";
// import calendar from "@/assets/icons/Calendar.svg";
// import { useTranslation } from "react-i18next";
// import { DateRange } from "react-day-picker";
// import { useSearch } from "@/contexts/SearchContext";

// const SearchFilter = () => {
//   const [dateRange, setDateRange] = useState<DateRange | undefined>();
//   const { t } = useTranslation("banner");
//   const { setSearchParams, performSearch } = useSearch();

//   const [localSearch, setLocalSearch] = useState({
//     destination: "",
//     maxPeople: "",
//     propertyType: "",
//     availabilityStartDate: "",
//   });

//   const handleInputChange = (field: string, value: string) => {
//     setLocalSearch((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleSearch = () => {
//     // Prepare search parameters
//     const params: any = {};

//     if (localSearch.destination) params.destination = localSearch.destination;
//     if (localSearch.maxPeople)
//       params.maxPeople = parseInt(localSearch.maxPeople);
//     if (localSearch.propertyType)
//       params.propertyType = localSearch.propertyType;
//     if (dateRange?.from)
//       params.availabilityStartDate = dateRange.from.toISOString();

//     setSearchParams(params);
//     performSearch();
//   };

//   return (
//     <div
//       className="w-full max-w-[1066px] mx-auto px-[26px] py-5 sm:px-4 md:px-6 bg-transparent rounded-xl lg:rounded-full"
//       style={{
//         backgroundImage: `url("/footerBg.svg")`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//       }}
//     >
//       <div className="bg-white rounded-xl lg:rounded-full lg:px-10 lg:py-6">
//         <div className="lg:grid grid-cols-1 lg:grid-cols-12 gap-3 divide-y lg:divide-y-0  divide-[#BFD4F0]">
//           <div className="w-full p-4 lg:col-span-3 sm:px-4 border-r-1">
//             <label
//               htmlFor="location"
//               className="block text-sm text-dark-3 mb-1"
//             >
//               {t("search.placeholder")}
//             </label>
//             <div className="flex items-center gap-1 text-dark-2 text-base">
//               <img src={map} alt="map icon" className="w-4 h-4 md:w-5 md:h-5" />
//               <Input
//                 id="location"
//                 value={localSearch.destination}
//                 onChange={(e) =>
//                   handleInputChange("destination", e.target.value)
//                 }
//                 placeholder={t("search.placeInGreece")}
//                 className="outline-none w-full text-sm md:text-base bg-transparent border-none focus:border-none focus:ring-0 focus:ring-transparent shadow-none p-0 placeholder:text-base text-dark-2 placeholder:text-dark-2 cursor-pointer"
//               />
//             </div>
//           </div>

//           <div className="w-full p-4 lg:col-span-2 px-4 lg:px-2 border-r-1">
//             <label htmlFor="people" className="block text-sm text-dark-3 mb-1">
//               {t("search.guest")}
//             </label>
//             <div className="flex items-center gap-1 text-dark-2 text-base">
//               <img
//                 src={user}
//                 alt="user icon"
//                 className="w-4 h-4 md:w-5 md:h-5"
//               />
//               <Input
//                 id="people"
//                 value={localSearch.maxPeople}
//                 onChange={(e) => handleInputChange("maxPeople", e.target.value)}
//                 type="text"
//                 inputMode="numeric"
//                 pattern="[0-9]*"
//                 min={1}
//                 placeholder={t("search.selectHere")}
//                 className="outline-none w-full text-sm md:text-base bg-transparent border-none focus:border-none focus:ring-0 focus:ring-transparent shadow-none p-0 placeholder:text-base text-dark-2 placeholder:text-dark-2 cursor-pointer"
//                 onKeyPress={(e) => {
//                   if (!/[0-9]/.test(e.key)) {
//                     e.preventDefault();
//                   }
//                 }}
//               />
//             </div>
//           </div>

//           <div className="w-full p-4 lg:col-span-2 px-4 lg:px-2 border-r-1">
//             <label htmlFor="type" className="block text-sm text-dark-3 mb-2">
//               {t("search.propertyType")}
//             </label>
//             <div className="flex items-center gap-2 text-dark-2 text-base">
//               <img
//                 src={home}
//                 alt="home icon"
//                 className="w-4 h-4 md:w-5 md:h-5"
//               />
//               <Select
//                 value={localSearch.propertyType}
//                 onValueChange={(value) =>
//                   handleInputChange("propertyType", value)
//                 }
//               >
//                 <SelectTrigger className="outline-none w-full text-sm md:text-base bg-transparent border-none focus:border-none focus:ring-0 focus:ring-transparent shadow-none p-0 placeholder:text-base">
//                   <SelectValue placeholder={t("search.home")} />
//                 </SelectTrigger>
//                 <SelectContent className="bg-white border-primary-border-color">
//                   <SelectItem value="HOME">{t("search.home")}</SelectItem>
//                   <SelectItem value="APARTMENT">
//                     {t("search.apartment")}
//                   </SelectItem>
//                   <SelectItem value="BOAT">{t("search.boat")}</SelectItem>
//                   <SelectItem value="VAN">{t("search.van")}</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>

//           <div className="w-full p-4 px-4 lg:px-2  lg:col-span-3 col-span-2 border-r-1">
//             <label
//               htmlFor="homeDate"
//               className="block text-sm text-dark-3 mb-2"
//             >
//               {t("search.dates")}
//             </label>
//             <div className="flex items-center gap-2 text-dark-2 text-base">
//               <img
//                 src={calendar}
//                 alt="calendar icon"
//                 className="w-4 h-7 md:w-5 md:h-7"
//               />
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <Button
//                     variant="outline"
//                     data-empty={!dateRange?.from}
//                     className="data-[empty=true]:text-muted-foreground justify-start text-left font-normal col-span-3 outline-none w-full text-sm bg-transparent border-none focus:border-none focus:ring-0 focus:ring-transparent shadow-none p-0 placeholder:text-base"
//                   >
//                     {dateRange?.from ? (
//                       dateRange.to ? (
//                         <>
//                           {format(dateRange.from, "LLL dd, y")} -{" "}
//                           {format(dateRange.to, "LLL dd, y")}
//                         </>
//                       ) : (
//                         format(dateRange.from, "LLL dd, y")
//                       )
//                     ) : (
//                       <span>{t("search.pickADateRange")}</span>
//                     )}
//                   </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-auto p-0 bg-white border-primary-border-color">
//                   <Calendar
//                     mode="range"
//                     selected={dateRange}
//                     onSelect={setDateRange}
//                     numberOfMonths={1}
//                     className="[--rdp-accent-color:#3174cd] [--rdp-background-color:theme(colors.blue.200)]"
//                     classNames={{
//                       day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
//                       day_range_start:
//                         "!bg-primary-blue/80 !text-white rounded-l-full",
//                       day_range_end:
//                         "!bg-primary-blue/80 !text-white rounded-r-full",
//                       day_range_middle: "!bg-blue-200 !text-blue-800",
//                       day_selected:
//                         "!bg-primary-blue/80 !text-white hover:!bg-blue-700 focus:!bg-blue-700",
//                       day_today: "bg-gray-100 border border-gray-300",
//                       day_outside: "text-gray-400 opacity-50",
//                     }}
//                     modifiersStyles={{
//                       selected: {
//                         backgroundColor: "var(--rdp-accent-color)",
//                         color: "white",
//                       },
//                       range_start: {
//                         backgroundColor: "var(--rdp-accent-color)",
//                         color: "white",
//                         borderRadius: "9999px 9999px",
//                       },
//                       range_end: {
//                         backgroundColor: "var(--rdp-accent-color)",
//                         color: "white",
//                         borderRadius: " 9999px 9999px ",
//                       },
//                       range_middle: {
//                         backgroundColor: "var(--rdp-background-color)",
//                         color: "var(--rdp-accent-color)",
//                         borderRadius: " 9999px 9999px ",
//                       },
//                     }}
//                   />
//                 </PopoverContent>
//               </Popover>
//             </div>
//           </div>

//           <div className="w-full lg:col-span-2 lg:pl-8 sm:col-span-2 my-6  md:my-0 flex items-center justify-end">
//             <PrimaryButton
//               onClick={handleSearch}
//               title={t("search.search")}
//               textColor="text-white w-full text-sm md:text-base text-center lg:text-lg"
//               bgColor="bg-primary-blue hover:brightness-80"
//               borderColor=""
//               bgImage="/buttonHomeIcon.svg"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SearchFilter;

// import { useState } from "react";
// import { format } from "date-fns";

// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Popover,
//   PopoverTrigger,
//   PopoverContent,
// } from "@/components/ui/popover";

// import PrimaryButton from "../reusable/PrimaryButton";
// import map from "@/assets/icons/Location.svg";
// import user from "@/assets/icons/userRounded.svg";
// import home from "@/assets/icons/homeType.svg";
// import calendar from "@/assets/icons/Calendar.svg";
// import { useTranslation } from "react-i18next";
// import { DateRange } from "react-day-picker";

// const SearchFilter = () => {
//   const [dateRange, setDateRange] = useState<DateRange | undefined>();
//   const { t } = useTranslation("banner");

//   return (
//     <div
//       className="w-full max-w-[1066px] mx-auto px-[26px] py-5 sm:px-4 md:px-6 bg-transparent rounded-xl lg:rounded-full"
//       style={{
//         backgroundImage: `url("/footerBg.svg")`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//       }}
//     >
//       <div className="bg-white rounded-xl lg:rounded-full lg:px-10 lg:py-6">
//         <div className="lg:grid grid-cols-1 lg:grid-cols-12 gap-3 divide-y lg:divide-y-0  divide-[#BFD4F0]">
//           <div className="w-full p-4 lg:col-span-3 sm:px-4 border-r-1">
//             <label
//               htmlFor="location"
//               className="block text-sm text-dark-3 mb-1"
//             >
//               {t("search.placeholder")}
//             </label>
//             <div className="flex items-center gap-1 text-dark-2 text-base">
//               <img src={map} alt="map icon" className="w-4 h-4 md:w-5 md:h-5" />
//               <Input
//                 id="location"
//                 placeholder={t("search.placeInGreece")}
//                 className="outline-none w-full text-sm md:text-base bg-transparent border-none focus:border-none focus:ring-0 focus:ring-transparent shadow-none p-0 placeholder:text-base text-dark-2 placeholder:text-dark-2 cursor-pointer"
//               />
//             </div>
//           </div>

//           <div className="w-full p-4 lg:col-span-2 px-4 lg:px-2 border-r-1">
//             <label htmlFor="people" className="block text-sm text-dark-3 mb-1">
//               {t("search.guest")}
//             </label>
//             <div className="flex items-center gap-1 text-dark-2 text-base">
//               <img
//                 src={user}
//                 alt="user icon"
//                 className="w-4 h-4 md:w-5 md:h-5"
//               />
//               <Input
//                 id="people"
//                 type="text" // Use text type to avoid spinners
//                 inputMode="numeric" // Shows numeric keyboard on mobile
//                 pattern="[0-9]*" // Restricts input to numbers
//                 min={1}
//                 placeholder={t("search.selectHere")}
//                 className="outline-none w-full text-sm md:text-base bg-transparent border-none focus:border-none focus:ring-0 focus:ring-transparent shadow-none p-0 placeholder:text-base text-dark-2 placeholder:text-dark-2 cursor-pointer"
//                 onKeyPress={(e) => {
//                   // Prevent non-numeric characters
//                   if (!/[0-9]/.test(e.key)) {
//                     e.preventDefault();
//                   }
//                 }}
//               />
//             </div>
//           </div>

//           <div className="w-full p-4 lg:col-span-2 px-4 lg:px-2 border-r-1">
//             <label htmlFor="type" className="block text-sm text-dark-3 mb-2">
//               {t("search.propertyType")}
//             </label>
//             <div className="flex items-center gap-2 text-dark-2 text-base">
//               <img
//                 src={home}
//                 alt="home icon"
//                 className="w-4 h-4 md:w-5 md:h-5"
//               />
//               <Select>
//                 <SelectTrigger className="outline-none w-full text-sm md:text-base bg-transparent border-none focus:border-none focus:ring-0 focus:ring-transparent shadow-none p-0 placeholder:text-base">
//                   <SelectValue placeholder={t("search.home")} />
//                 </SelectTrigger>
//                 <SelectContent className="bg-white border-primary-border-color">
//                   <SelectItem value="home">{t("search.home")}</SelectItem>
//                   <SelectItem value="apartment">
//                     {t("search.apartment")}
//                   </SelectItem>
//                   <SelectItem value="boat">{t("search.boat")}</SelectItem>
//                   <SelectItem value="van">{t("search.van")}</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>

//           <div className="w-full p-4 px-4 lg:px-2  lg:col-span-3 col-span-2 border-r-1">
//             <label
//               htmlFor="homeDate"
//               className="block text-sm text-dark-3 mb-2"
//             >
//               {t("search.dates")}
//             </label>
//             <div className="flex items-center gap-2 text-dark-2 text-base">
//               <img
//                 src={calendar}
//                 alt="calendar icon"
//                 className="w-4 h-7 md:w-5 md:h-7"
//               />
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <Button
//                     variant="outline"
//                     data-empty={!dateRange?.from}
//                     className="data-[empty=true]:text-muted-foreground justify-start text-left font-normal col-span-3 outline-none w-full text-sm bg-transparent border-none focus:border-none focus:ring-0 focus:ring-transparent shadow-none p-0 placeholder:text-base"
//                   >
//                     {dateRange?.from ? (
//                       dateRange.to ? (
//                         <>
//                           {format(dateRange.from, "LLL dd, y")} -{" "}
//                           {format(dateRange.to, "LLL dd, y")}
//                         </>
//                       ) : (
//                         format(dateRange.from, "LLL dd, y")
//                       )
//                     ) : (
//                       <span>{t("search.pickADateRange")}</span>
//                     )}
//                   </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-auto p-0 bg-white border-primary-border-color">
//                   <Calendar
//                     mode="range"
//                     selected={dateRange}
//                     onSelect={setDateRange}
//                     numberOfMonths={1}
//                     className="[--rdp-accent-color:#3174cd] [--rdp-background-color:theme(colors.blue.200)]"
//                     classNames={{
//                       day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
//                       day_range_start:
//                         "!bg-primary-blue/80 !text-white rounded-l-full",
//                       day_range_end:
//                         "!bg-primary-blue/80 !text-white rounded-r-full",
//                       day_range_middle: "!bg-blue-200 !text-blue-800",
//                       day_selected:
//                         "!bg-primary-blue/80 !text-white hover:!bg-blue-700 focus:!bg-blue-700",
//                       day_today: "bg-gray-100 border border-gray-300",
//                       day_outside: "text-gray-400 opacity-50",
//                     }}
//                     modifiersStyles={{
//                       selected: {
//                         backgroundColor: "var(--rdp-accent-color)",
//                         color: "white",
//                       },
//                       range_start: {
//                         backgroundColor: "var(--rdp-accent-color)",
//                         color: "white",
//                         borderRadius: "9999px 9999px",
//                       },
//                       range_end: {
//                         backgroundColor: "var(--rdp-accent-color)",
//                         color: "white",
//                         borderRadius: " 9999px 9999px ",
//                       },
//                       range_middle: {
//                         backgroundColor: "var(--rdp-background-color)",
//                         color: "var(--rdp-accent-color)",
//                         borderRadius: " 9999px 9999px ",
//                       },
//                     }}
//                   />
//                 </PopoverContent>
//               </Popover>
//             </div>
//           </div>

//           <div className="w-full lg:col-span-2 lg:pl-8 sm:col-span-2 my-6  md:my-0 flex items-center justify-end">
//             <PrimaryButton
//               title={t("search.search")}
//               textColor="text-white w-full text-sm md:text-base text-center lg:text-lg"
//               bgColor="bg-primary-blue hover:brightness-80"
//               borderColor=""
//               bgImage="/buttonHomeIcon.svg"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SearchFilter;
