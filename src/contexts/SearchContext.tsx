import React, { createContext, useContext, useState, ReactNode } from "react";
import { SearchParams, PropertyData, searchOnboarding } from "../services/api";

interface SearchContextType {
  searchParams: SearchParams;
  setSearchParams: (params: SearchParams) => void;
  searchResults: PropertyData[];
  isLoading: boolean;
  error: string | null;
  hasSearched: boolean;
  performSearch: (paramsOverride?: SearchParams) => Promise<void>; // ✅ allow optional param
  clearSearch: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};

interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [searchParams, setSearchParams] = useState<SearchParams>({});
  const [searchResults, setSearchResults] = useState<PropertyData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const performSearch = async (paramsOverride?: SearchParams) => {
    setHasSearched(true);
    setIsLoading(true);
    setError(null);

    try {
      // Use either provided params OR the current state
      const effectiveParams = paramsOverride ?? searchParams;

      // Remove empty values
      const filteredParams: SearchParams = {};
      Object.entries(effectiveParams).forEach(([key, value]) => {
        if (value !== "" && value !== undefined && value !== null) {
          filteredParams[key as keyof SearchParams] = value as any;
        }
      });

      const response = await searchOnboarding(filteredParams);
      setSearchResults(response.data);
    } catch (err) {
      setError("Failed to fetch search results");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };


  const clearSearch = () => {
    setSearchParams({});
    setSearchResults([]);
    setError(null);
    setHasSearched(false); // ✅ reset
  };

  const value = {
    searchParams,
    setSearchParams,
    searchResults,
    isLoading,
    error,
    hasSearched,
    performSearch,
    clearSearch,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};
