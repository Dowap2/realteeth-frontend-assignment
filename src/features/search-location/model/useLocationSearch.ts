"use client";

import { useState, useCallback } from "react";
import { searchDistricts } from "@entities/location/model/locationUtils";

export const useLocationSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = useCallback((searchQuery: string) => {
    setQuery(searchQuery);

    if (!searchQuery.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const filtered = searchDistricts(searchQuery);
    setResults(filtered);
    setIsOpen(filtered.length > 0);
  }, []);

  const handleSelect = useCallback((location: string) => {
    setQuery(location);
    setIsOpen(false);
  }, []);

  const handleClear = useCallback(() => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
  }, []);

  return {
    query,
    results,
    isOpen,
    handleSearch,
    handleSelect,
    handleClear,
  };
};
