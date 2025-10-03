"use client"
import { createContext } from 'react';

// Create context for search functionality
export const SearchContext = createContext<{
  searchInput: string;
  setSearchInput: (value: string) => void;
}>({
  searchInput: '',
  setSearchInput: () => {}
});
