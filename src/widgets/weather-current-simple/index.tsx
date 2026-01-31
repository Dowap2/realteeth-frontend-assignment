"use client";

import { useRouter } from "next/navigation";
import { MapPin } from "lucide-react";
import { useCurrentWeather } from "@/src/entities/weather/model/useWeather";

interface WeatherCurrentSimpleProps {
  coords: { lat: number; lon: number } | null;
  locationName?: string;
}

export const WeatherCurrentSimple = ({
  coords,
  locationName,
}: WeatherCurrentSimpleProps) => {
  const router = useRouter();
  const {
    data: weather,
    isLoading,
    error,
  } = useCurrentWeather(coords?.lat ?? 0, coords?.lon ?? 0);

  if (isLoading) {
    return (
      <div className="rounded-2xl bg-white p-12 text-center text-[#6B7280]">
        날씨 정보를 불러오는 중...
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="rounded-2xl bg-[#EF4444] p-12 text-center text-white">
        날씨 정보를 불러올 수 없습니다.
      </div>
    );
  }

  const displayName = locationName || weather.name;

  const handleClick = () => {
    router.push(
      `/detail/${encodeURIComponent(displayName)}?lat=${coords?.lat}&lon=${coords?.lon}`,
    );
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer rounded-2xl bg-white p-6 shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="mb-4 flex items-center gap-2 text-[#6B7280]">
        <MapPin size={20} />
        <span className="text-lg font-medium">{displayName}</span>
      </div>

      <div className="mb-4 text-center">
        <div className="mb-2 text-4xl font-bold text-[#4A90E2]">
          {Math.round(weather.main.temp)}°C
        </div>
        <div className="text-base capitalize text-[#6B7280]">
          {weather.weather[0].description}
        </div>
      </div>

      <div className="mb-4 flex justify-around border-y border-[#E5E7EB] py-4">
        <div className="text-center">
          <div className="mb-1 text-sm text-[#6B7280]">최저</div>
          <div className="text-lg font-semibold text-[#1A1A1A]">
            {Math.round(weather.main.temp_min)}°C
          </div>
        </div>
        <div className="text-center">
          <div className="mb-1 text-sm text-[#6B7280]">최고</div>
          <div className="text-lg font-semibold text-[#1A1A1A]">
            {Math.round(weather.main.temp_max)}°C
          </div>
        </div>
      </div>

      <div className="text-center font-medium text-[#4A90E2]">상세 보기 →</div>
    </div>
  );
};
