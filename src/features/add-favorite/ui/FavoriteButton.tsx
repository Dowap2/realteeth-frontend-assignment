"use client";

import { Star } from "lucide-react";
import { useFavoriteStore } from "@/src/entities/favorite/model/useFavoriteStore";

interface FavoriteButtonProps {
  location: string;
  lat: number;
  lon: number;
}

export const FavoriteButton = ({ location, lat, lon }: FavoriteButtonProps) => {
  const { favorites, addFavorite, removeFavorite, isFavorite } =
    useFavoriteStore();

  const isAlreadyFavorite = isFavorite(location);
  const favorite = favorites.find((f) => f.location === location);

  const handleClick = () => {
    if (isAlreadyFavorite && favorite) {
      removeFavorite(favorite.id);
    } else {
      addFavorite({
        location,
        name: location,
        lat,
        lon,
      });
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`flex h-10 w-10 items-center justify-center rounded-lg bg-transparent transition-all duration-200 hover:scale-110 hover:bg-[#F5F7FA] active:scale-95 ${
        isAlreadyFavorite ? "text-[#FDB813]" : "text-[#6B7280]"
      }`}
    >
      <Star size={24} fill={isAlreadyFavorite ? "currentColor" : "none"} />
    </button>
  );
};
