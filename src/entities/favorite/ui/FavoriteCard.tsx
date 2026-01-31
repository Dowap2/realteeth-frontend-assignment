"use client";

import { useRouter } from "next/navigation";
import { MapPin, Edit2, Trash2 } from "lucide-react";
import { useState } from "react";
import { useCurrentWeather } from "@/src/entities/weather/model/useWeather";
import type { Favorite } from "@/src/entities/favorite/model/useFavoriteStore";

interface FavoriteCardProps {
  favorite: Favorite;
  onRemove: (id: string) => void;
  onUpdateName: (id: string, name: string) => void;
}

export const FavoriteCard = ({
  favorite,
  onRemove,
  onUpdateName,
}: FavoriteCardProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(favorite.name);

  const { data: weather, isLoading } = useCurrentWeather(
    favorite.lat,
    favorite.lon,
  );

  const handleClick = () => {
    if (!isEditing) {
      router.push(
        `/detail/${encodeURIComponent(favorite.location)}?lat=${favorite.lat}&lon=${favorite.lon}`,
      );
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editName.trim()) {
      onUpdateName(favorite.id, editName.trim());
      setIsEditing(false);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(`"${favorite.name}"을(를) 즐겨찾기에서 삭제하시겠습니까?`)) {
      onRemove(favorite.id);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setEditName(favorite.name);
      setIsEditing(false);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer rounded-2xl bg-white p-5 shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="mb-4 flex items-center justify-between border-b border-[#E5E7EB] pb-3">
        {isEditing ? (
          <input
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            onBlur={handleSave}
            onKeyDown={handleKeyPress}
            autoFocus
            className="flex-1 rounded-lg border-2 border-[#4A90E2] p-2 text-base font-semibold outline-none"
          />
        ) : (
          <div className="flex items-center gap-2 text-base font-semibold text-[#1A1A1A]">
            <MapPin size={16} />
            {favorite.name}
          </div>
        )}
        <div className="flex gap-2">
          {!isEditing && (
            <button
              onClick={handleEdit}
              title="이름 변경"
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-[#6B7280] transition-all duration-200 hover:bg-[#F5F7FA] hover:text-[#4A90E2]"
            >
              <Edit2 size={16} />
            </button>
          )}
          <button
            onClick={handleRemove}
            title="삭제"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-[#6B7280] transition-all duration-200 hover:bg-[#F5F7FA] hover:text-[#4A90E2]"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="py-6 text-center text-[#6B7280]">로딩 중...</div>
      ) : weather ? (
        <div className="text-center">
          <div className="mb-2 text-3xl font-bold text-[#4A90E2]">
            {Math.round(weather.main.temp)}°C
          </div>
          <div className="mb-3 text-base capitalize text-[#6B7280]">
            {weather.weather[0].description}
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-[#6B7280]">
            <span>최저 {Math.round(weather.main.temp_min)}°</span>
            <span className="text-[#D1D5DB]">•</span>
            <span>최고 {Math.round(weather.main.temp_max)}°</span>
          </div>
        </div>
      ) : (
        <div className="p-4 text-center text-sm text-[#EF4444]">
          날씨 정보를 불러올 수 없습니다
        </div>
      )}
    </div>
  );
};
