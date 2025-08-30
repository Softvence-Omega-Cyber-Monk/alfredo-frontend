import React, { createContext, useContext, useState, ReactNode } from 'react';
import { SearchParams, OnboardingData, searchOnboarding } from '../services/api';

interface SearchContextType {
  searchParams: SearchParams;
  setSearchParams: (params: SearchParams) => void;
  searchResults: OnboardingData[];
  isLoading: boolean;
  error: string | null;
  performSearch: () => Promise<void>;
  clearSearch: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [searchParams, setSearchParams] = useState<SearchParams>({});
  const [searchResults, setSearchResults] = useState<OnboardingData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const performSearch = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await searchOnboarding(searchParams);
      setSearchResults(response.data);
    } catch (err) {
      setError('Failed to fetch search results');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchParams({});
    setSearchResults([]);
    setError(null);
  };

  const value = {
    searchParams,
    setSearchParams,
    searchResults,
    isLoading,
    error,
    performSearch,
    clearSearch,
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};