"use client";

import { useCurrentWeather } from "@/src/entities/weather/model/useWeather";
import { WeatherCard } from "@/src/entities/weather/ui/WeatherCard";
import { getCoordinatesBySearch } from "@/src/shared/lib/geocoding";
import { useEffect, useState } from "react";

interface WeatherCurrentProps {
  coords: { lat: number; lon: number } | null;
  selectedLocation: string | null;
}

export const WeatherCurrent = ({
  coords: initialCoords,
  selectedLocation,
}: WeatherCurrentProps) => {
  const [coords, setCoords] = useState(initialCoords);

  useEffect(() => {
    if (selectedLocation) {
      getCoordinatesBySearch(selectedLocation).then((newCoords) => {
        if (newCoords) {
          setCoords(newCoords);
        }
      });
    } else if (initialCoords) {
      setCoords(initialCoords);
    }
  }, [selectedLocation, initialCoords]);

  const {
    data: weather,
    isLoading,
    error,
  } = useCurrentWeather(coords?.lat ?? 0, coords?.lon ?? 0);

  if (isLoading) {
    return (
      <div className="rounded-2xl bg-white p-12 text-center text-lg text-[#6B7280]">
        날씨 정보를 불러오는 중...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-[#EF4444] p-8 text-center leading-relaxed text-white">
        날씨 정보를 불러올 수 없습니다.
        <br />
        잠시 후 다시 시도해주세요.
      </div>
    );
  }

  if (!weather) {
    return null;
  }

  return <WeatherCard weather={weather} />;
};
