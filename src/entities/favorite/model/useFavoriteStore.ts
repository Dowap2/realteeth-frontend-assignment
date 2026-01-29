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
  isFavorite: (location: string) => boolean;
  getFavoriteByLocation: (location: string) => Favorite | undefined;
}

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

        if (favorites.some((f) => f.location === favorite.location)) {
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

      isFavorite: (location) => {
        return get().favorites.some((f) => f.location === location);
      },

      getFavoriteByLocation: (location) => {
        return get().favorites.find((f) => f.location === location);
      },
    }),
    {
      name: "weather-favorites",
    },
  ),
);
