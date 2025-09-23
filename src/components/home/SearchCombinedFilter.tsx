import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
// import { useSearch } from "@/contexts/SearchContext";
import {
  getAmenities,
  getTransports,
  getSurroundings,
  // SearchParams,
} from "@/services/api";
import { X } from "lucide-react"; // optional: for remove icon on selected tag
import { useTranslation } from "react-i18next";

interface Item {
  id: string;
  name: string;
}

const SearchCombinedFilter = () => {
  // const { performSearch, setSearchParams } = useSearch();

  const { t } = useTranslation("banner");

  const [amenities, setAmenities] = useState<Item[]>([]);
  const [transports, setTransports] = useState<Item[]>([]);
  const [surroundings, setSurroundings] = useState<Item[]>([]);

  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedTransports, setSelectedTransports] = useState<string[]>([]);
  const [selectedSurroundings, setSelectedSurroundings] = useState<string[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [a, t, s] = await Promise.all([
          getAmenities(),
          getTransports(),
          getSurroundings(),
        ]);
        setAmenities(a);
        setTransports(t);
        setSurroundings(s);
      } catch (error) {
        console.error("Failed to load filter options:", error);
      }
    };
    fetchData();
  }, []);

  const toggleSelection = (
    id: string,
    type: "amenity" | "transport" | "surrounding"
  ) => {
    const stateMap: Record<
      "amenity" | "transport" | "surrounding",
      [string[], React.Dispatch<React.SetStateAction<string[]>>]
    > = {
      amenity: [selectedAmenities, setSelectedAmenities],
      transport: [selectedTransports, setSelectedTransports],
      surrounding: [selectedSurroundings, setSelectedSurroundings],
    };

    const [current, setCurrent] = stateMap[type];
    setCurrent(
      current.includes(id) ? current.filter((x) => x !== id) : [...current, id]
    );
  };

  // const applyFilters = async () => {
  //   const params: SearchParams = {
  //     amenities: selectedAmenities.length
  //       ? selectedAmenities.join(",")
  //       : undefined,
  //     transports: selectedTransports.length
  //       ? selectedTransports.join(",")
  //       : undefined,
  //     surroundings: selectedSurroundings.length
  //       ? selectedSurroundings.join(",")
  //       : undefined,
  //   };
  //   setSearchParams(params);
  //   await performSearch(params);
  // };

  const renderFilterSection = (
    title: string,
    items: Item[],
    selected: string[],
    type: "amenity" | "transport" | "surrounding"
  ) => (
    <div>
      <h4 className="text-sm font-semibold text-gray-700 mb-2 cursor-pointer">
        {title}
      </h4>
      <div className="max-h-24 overflow-y-auto space-y-1 px-1">
        {items.map((item) => (
          <label
            key={item.id}
            className="flex items-center gap-3 p-2 rounded-lg  hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <input
              type="checkbox"
              className="w-4 h-4 accent-primary-blue"
              checked={selected.includes(item.id)}
              onChange={() => toggleSelection(item.id, type)}
            />
            <span className="text-sm text-gray-800">{item.name}</span>
          </label>
        ))}
      </div>
    </div>
  );

  const renderSelectedTags = (selected: string[], items: Item[], type: any) =>
    selected.map((id) => {
      const item = items.find((i) => i.id === id);
      if (!item) return null;
      return (
        <span
          key={id}
          className="inline-flex items-center px-2 py-1 bg-primary-blue text-white text-xs rounded-full mr-2 mb-2"
        >
          {item.name}
          <X
            size={12}
            className="ml-1 cursor-pointer"
            onClick={() => toggleSelection(id, type)}
          />
        </span>
      );
    });

  return (
    <Popover>
      <PopoverTrigger asChild className="bg-white">
        <Button
          variant="outline"
          className="w-full border-gray-300 text-dark-3 font-DM-sans  cursor-pointer"
        >
          {t("search.selectFilters")}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="bg-white w-80 p-5 space-y-1 shadow-lg border border-gray-200 rounded-lg">
        {/* Display selected tags */}
        <div className="flex flex-wrap mb-3 ">
          {renderSelectedTags(selectedAmenities, amenities, "amenity")}
          {renderSelectedTags(selectedTransports, transports, "transport")}
          {renderSelectedTags(
            selectedSurroundings,
            surroundings,
            "surrounding"
          )}
        </div>

        {renderFilterSection(
          t("search.amenities"),
          amenities,
          selectedAmenities,
          "amenity"
        )}
        {renderFilterSection(
          t("search.transports"),
          transports,
          selectedTransports,
          "transport"
        )}
        {renderFilterSection(
          t("search.surroundings"),
          surroundings,
          selectedSurroundings,
          "surrounding"
        )}

        {/* <Button
          className="w-full bg-primary-blue text-white hover:bg-blue-600 transition-colors cursor-pointer"
          onClick={applyFilters}
        >
          Apply Filters
        </Button> */}
      </PopoverContent>
    </Popover>
  );
};

export default SearchCombinedFilter;

// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Popover,
//   PopoverTrigger,
//   PopoverContent,
// } from "@/components/ui/popover";
// import {
//   getAmenities,
//   getTransports,
//   getSurroundings,
//   SearchParams,
// } from "@/services/api";
// import { useSearch } from "@/contexts/SearchContext";

// interface Item {
//   id: string;
//   name: string;
// }

// const SearchCombinedFilter = () => {
//   const { performSearch, setSearchParams } = useSearch();

//   const [amenities, setAmenities] = useState<Item[]>([]);
//   const [transports, setTransports] = useState<Item[]>([]);
//   const [surroundings, setSurroundings] = useState<Item[]>([]);

//   const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
//   const [selectedTransports, setSelectedTransports] = useState<string[]>([]);
//   const [selectedSurroundings, setSelectedSurroundings] = useState<string[]>(
//     []
//   );

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [a, t, s] = await Promise.all([
//           getAmenities(),
//           getTransports(),
//           getSurroundings(),
//         ]);
//         setAmenities(a);
//         setTransports(t);
//         setSurroundings(s);
//       } catch (err) {
//         console.error("Failed to fetch filter data:", err);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleChange = (
//     id: string,
//     type: "amenity" | "transport" | "surrounding"
//   ) => {
//     const updater = {
//       amenity: setSelectedAmenities,
//       transport: setSelectedTransports,
//       surrounding: setSelectedSurroundings,
//     }[type];

//     const current = {
//       amenity: selectedAmenities,
//       transport: selectedTransports,
//       surrounding: selectedSurroundings,
//     }[type];

//     if (current.includes(id)) {
//       updater(current.filter((x) => x !== id));
//     } else {
//       updater([...current, id]);
//     }
//   };

//   const runSearch = async () => {
//     const params: SearchParams = {
//       amenities: selectedAmenities.length
//         ? selectedAmenities.join(",")
//         : undefined,
//       transports: selectedTransports.length
//         ? selectedTransports.join(",")
//         : undefined,
//       surroundings: selectedSurroundings.length
//         ? selectedSurroundings.join(",")
//         : undefined,
//     };
//     setSearchParams(params);
//     await performSearch(params);
//   };

//   return (
//     <Popover>
//       <PopoverTrigger asChild>
//         <Button variant="outline" className="w-full">
//           Select Filters
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-64 p-4 space-y-4">
//         {/* Amenities */}
//         <div>
//           <h4 className="text-sm font-semibold mb-2">Amenities</h4>
//           <div className="space-y-1 max-h-32 overflow-y-auto">
//             {amenities.map((item) => (
//               <label key={item.id} className="flex items-center gap-2 text-sm">
//                 <input
//                   type="checkbox"
//                   checked={selectedAmenities.includes(item.id)}
//                   onChange={() => handleChange(item.id, "amenity")}
//                 />
//                 {item.name}
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Transports */}
//         <div>
//           <h4 className="text-sm font-semibold mb-2">Transports</h4>
//           <div className="space-y-1 max-h-32 overflow-y-auto">
//             {transports.map((item) => (
//               <label key={item.id} className="flex items-center gap-2 text-sm">
//                 <input
//                   type="checkbox"
//                   checked={selectedTransports.includes(item.id)}
//                   onChange={() => handleChange(item.id, "transport")}
//                 />
//                 {item.name}
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Surroundings */}
//         <div>
//           <h4 className="text-sm font-semibold mb-2">Surroundings</h4>
//           <div className="space-y-1 max-h-32 overflow-y-auto">
//             {surroundings.map((item) => (
//               <label key={item.id} className="flex items-center gap-2 text-sm">
//                 <input
//                   type="checkbox"
//                   checked={selectedSurroundings.includes(item.id)}
//                   onChange={() => handleChange(item.id, "surrounding")}
//                 />
//                 {item.name}
//               </label>
//             ))}
//           </div>
//         </div>

//         <Button
//           className="w-full bg-primary-blue text-white"
//           onClick={runSearch}
//         >
//           Apply Filters
//         </Button>
//       </PopoverContent>
//     </Popover>
//   );
// };

// export default SearchCombinedFilter;
