"use client";

import { Star } from "lucide-react";
import { useFavoriteStore } from "@/src/entities/favorite/model/useFavoriteStore";

interface FavoriteButtonProps {
  location: string;
  lat: number;
  lon: number;
}

export const FavoriteButton = ({ location, lat, lon }: FavoriteButtonProps) => {
  const { addFavorite, removeFavorite, isFavorite, getFavoriteByCoords } =
    useFavoriteStore();

  const isAlreadyFavorite = isFavorite(lat, lon);
  const favorite = getFavoriteByCoords(lat, lon);

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
      className={`flex items-center justify-center w-10 h-10 rounded transition-all ${
        isAlreadyFavorite ? "text-yellow-500" : "text-gray-500"
      } hover:bg-gray-100 hover:scale-110 active:scale-95`}
    >
      <Star size={24} fill={isAlreadyFavorite ? "currentColor" : "none"} />
    </button>
  );
};
