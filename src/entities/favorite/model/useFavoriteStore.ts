import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Favorite {
  id: string;
  location: string;
  name: string;
  lat: number;
  lon: number;
  addedAt: number;
}

interface FavoriteStore {
  favorites: Favorite[];
  addFavorite: (favorite: Omit<Favorite, "id" | "addedAt">) => void;
  removeFavorite: (id: string) => void;
  updateFavoriteName: (id: string, name: string) => void;
  isFavorite: (lat: number, lon: number) => boolean;
  getFavoriteByCoords: (lat: number, lon: number) => Favorite | undefined;
}

const coordsEqual = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): boolean => {
  const round = (num: number) => Math.round(num * 10) / 10;
  return round(lat1) === round(lat2) && round(lon1) === round(lon2);
};

export const useFavoriteStore = create<FavoriteStore>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (favorite) => {
        const { favorites } = get();

        if (favorites.length >= 6) {
          alert("즐겨찾기는 최대 6개까지 추가할 수 있습니다.");
          return;
        }

        if (
          favorites.some((f) =>
            coordsEqual(f.lat, f.lon, favorite.lat, favorite.lon),
          )
        ) {
          alert("이미 즐겨찾기에 추가된 장소입니다.");
          return;
        }

        const newFavorite: Favorite = {
          ...favorite,
          id: `${Date.now()}-${Math.random()}`,
          addedAt: Date.now(),
        };

        set({ favorites: [...favorites, newFavorite] });
      },

      removeFavorite: (id) => {
        set((state) => ({
          favorites: state.favorites.filter((f) => f.id !== id),
        }));
      },

      updateFavoriteName: (id, name) => {
        set((state) => ({
          favorites: state.favorites.map((f) =>
            f.id === id ? { ...f, name } : f,
          ),
        }));
      },

      isFavorite: (lat, lon) => {
        return get().favorites.some((f) => coordsEqual(f.lat, f.lon, lat, lon));
      },

      getFavoriteByCoords: (lat, lon) => {
        return get().favorites.find((f) => coordsEqual(f.lat, f.lon, lat, lon));
      },
    }),
    {
      name: "weather-favorites",
    },
  ),
);
