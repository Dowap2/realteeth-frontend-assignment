"use client";

import { SearchInput } from "@/src/features/search-location/ui/SearchInput";

interface SearchBarProps {
  onSelectLocation: (
    location: string,
    coords: { lat: number; lon: number } | null,
  ) => void;
}

export const SearchBar = ({ onSelectLocation }: SearchBarProps) => {
  return <SearchInput onSelectLocation={onSelectLocation} />;
};
