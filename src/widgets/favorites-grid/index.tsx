"use client";

import { useFavoriteStore } from "@/src/entities/favorite/model/useFavoriteStore";
import { FavoriteCard } from "@/src/entities/favorite/ui/FavoriteCard";

export const FavoritesGrid = () => {
  const { favorites, removeFavorite, updateFavoriteName } = useFavoriteStore();

  if (favorites.length === 0) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-[#D1D5DB] bg-white px-6 py-12 text-center">
        <div className="mb-4 text-4xl">📍</div>
        <p className="mb-2 text-lg font-medium text-[#1A1A1A]">
          즐겨찾기한 장소가 없습니다.
        </p>
        <p className="text-base text-[#6B7280]">
          장소를 검색하고 별 아이콘을 눌러 즐겨찾기에 추가해보세요!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4 md:grid-cols-[repeat(auto-fill,minmax(240px,1fr))] md:gap-3 sm:grid-cols-1">
      {favorites.map((favorite) => (
        <FavoriteCard
          key={favorite.id}
          favorite={favorite}
          onRemove={removeFavorite}
          onUpdateName={updateFavoriteName}
        />
      ))}
    </div>
  );
};
