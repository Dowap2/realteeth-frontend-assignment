"use client";

import { Search, X, Loader } from "lucide-react";
import { useLocationSearch } from "../model/useLocationSearch";

interface SearchInputProps {
  onSelectLocation: (
    location: string,
    coords: { lat: number; lon: number } | null,
  ) => void;
}

export const SearchInput = ({ onSelectLocation }: SearchInputProps) => {
  const {
    query,
    results,
    isOpen,
    isSearching,
    handleSearch,
    handleSelect,
    handleClear,
  } = useLocationSearch();

  const onSelect = async (location: string) => {
    const result = await handleSelect(location);
    onSelectLocation(location, result);
  };

  return (
    <div className="relative w-full max-w-[600px]">
      <div className="flex items-center rounded-lg bg-white p-4 shadow-md transition-shadow duration-200 focus-within:shadow-lg">
        <Search size={20} className="shrink-0 text-[#6B7280]" />
        <input
          type="text"
          placeholder="지역을 검색하세요 (예: 서울, 강남구, 역삼동)"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="mx-3 flex-1 border-none bg-transparent text-base outline-none placeholder:text-[#9CA3AF]"
        />
        {isSearching ? (
          <div className="flex items-center text-[#4A90E2]">
            <Loader size={20} className="animate-spin" />
          </div>
        ) : query ? (
          <button
            onClick={handleClear}
            className="flex items-center justify-center rounded p-1 bg-transparent text-[#6B7280] transition-colors duration-200 hover:bg-[#F5F7FA]"
          >
            <X size={20} />
          </button>
        ) : null}
      </div>

      {isOpen && results.length > 0 && (
        <ul className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-[1000] max-h-[400px] list-none overflow-y-auto rounded-lg bg-white shadow-lg">
          {results.map((location) => (
            <li
              key={location}
              onClick={() => onSelect(location)}
              className="cursor-pointer border-b border-[#E5E7EB] p-4 transition-colors duration-200 last:border-b-0 hover:bg-[#F5F7FA]"
            >
              {location}
            </li>
          ))}
        </ul>
      )}

      {isOpen && results.length === 0 && query && (
        <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] rounded-lg bg-white p-6 text-center text-[#6B7280] shadow-lg">
          검색 결과가 없습니다.
        </div>
      )}
    </div>
  );
};
