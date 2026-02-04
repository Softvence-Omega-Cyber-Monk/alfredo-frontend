"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { getAmenities, getTransports, getSurroundings } from "@/services/api";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Item {
  id: string;
  name: string;
  greek_name?: string;
  icon?: string;
}

const SearchCombinedFilter = () => {
  const { t, i18n } = useTranslation("sbanner");
  const currentLanguage = i18n.language;

  const [amenities, setAmenities] = useState<Item[]>([]);
  const [transports, setTransports] = useState<Item[]>([]);
  const [surroundings, setSurroundings] = useState<Item[]>([]);

  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedTransports, setSelectedTransports] = useState<string[]>([]);
  const [selectedSurroundings, setSelectedSurroundings] = useState<string[]>(
    []
  );

  // Fetch data and map according to current language
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [aRes, tRes, sRes] = await Promise.all([
          getAmenities(),
          getTransports(),
          getSurroundings(),
        ]);

        const mapTranslatedData = (data: Item[]) =>
          data.map((item) => ({
            ...item,
            name:
              currentLanguage === "el" && item.greek_name
                ? item.greek_name
                : item.name,
          }));

        setAmenities(mapTranslatedData(aRes));
        setTransports(mapTranslatedData(tRes));
        setSurroundings(mapTranslatedData(sRes));
      } catch (error) {
        console.error("Failed to load filter options:", error);
      }
    };

    fetchData();
  }, [currentLanguage]); // ✅ Refetch and remap when language changes

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

  const renderFilterSection = (
    title: string,
    items: Item[],
    selected: string[],
    type: "amenity" | "transport" | "surrounding"
  ) => (
    <div>
      <h4 className="text-sm font-semibold text-gray-700 mb-2 cursor-pointer ">
        {title}
      </h4>
      <div className="max-h-24 overflow-y-auto space-y-1 px-1 ">
        {items.map((item) => (
          <label
            key={item.id}
            className="flex items-center gap-3 p-2  rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <input
              type="checkbox"
              className="w-4 h-4 accent-primary-blue "
              checked={selected.includes(item.id)}
              onChange={() => toggleSelection(item.id, type)}
            />
            <span className="text-sm text-gray-800">
              {currentLanguage === "el" ? item.greek_name : item.name}
            </span>
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
          {currentLanguage === "el" ? item.greek_name : item.name}
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
          className="w-full border-[#C4D7F1] py-4.5 text-dark-3 cursor-pointer flex justify-start text-xs"
        >
          {t("search.filtersButton")}
        </Button>
      </PopoverTrigger>

      <PopoverContent className=" bg-white w-80 p-5 space-y-3 shadow-lg border border-gray-200 rounded-lg">
        {/* Selected Tags */}
        <div className="flex flex-wrap mb-3">
          {renderSelectedTags(selectedAmenities, amenities, "amenity")}
          {renderSelectedTags(selectedTransports, transports, "transport")}
          {renderSelectedTags(
            selectedSurroundings,
            surroundings,
            "surrounding"
          )}
        </div>

        {/* Filter Sections */}
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
      </PopoverContent>
    </Popover>
  );
};

export default SearchCombinedFilter;
