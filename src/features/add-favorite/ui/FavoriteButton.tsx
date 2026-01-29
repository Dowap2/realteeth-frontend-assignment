"use client";

import styled from "@emotion/styled";
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
    <Button onClick={handleClick} isFavorite={isAlreadyFavorite}>
      <Star size={24} fill={isAlreadyFavorite ? "currentColor" : "none"} />
    </Button>
  );
};

const Button = styled.button<{ isFavorite: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: transparent;
  color: ${({ theme, isFavorite }) =>
    isFavorite ? theme.colors.weather.sunny : theme.colors.text.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.background.default};
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;
