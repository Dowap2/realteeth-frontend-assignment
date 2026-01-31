"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { WeatherCard } from "@/src/entities/weather/ui/WeatherCard";
import { WeatherHourly } from "@/src/widgets/weather-hourly";
import { FavoriteButton } from "@/src/features/add-favorite/ui/FavoriteButton";
import {
  useCurrentWeather,
  useForecast,
} from "@/src/entities/weather/model/useWeather";
import type { WeatherData } from "@/src/entities/weather/model/types";
import { getCoordinatesBySearch } from "@/src/shared/lib/geocoding";

export default function DetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const location = decodeURIComponent(params.location as string);

  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null,
  );

  useEffect(() => {
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    if (lat && lon) {
      setCoords({
        lat: parseFloat(lat),
        lon: parseFloat(lon),
      });
    } else {
      getCoordinatesBySearch(location).then((result) => {
        if (result) {
          setCoords(result);
        } else {
          setCoords({ lat: 37.5665, lon: 126.978 });
        }
      });
    }
  }, [location, searchParams]);

  const { data: weather, isLoading: weatherLoading } = useCurrentWeather(
    coords?.lat ?? 0,
    coords?.lon ?? 0,
  );

  const { data: forecast, isLoading: forecastLoading } = useForecast(
    coords?.lat ?? 0,
    coords?.lon ?? 0,
  );

  const handleBack = () => {
    router.back();
  };

  if (!coords) {
    return (
      <div className="min-h-screen bg-[#F5F7FA]">
        <div className="rounded-2xl bg-white p-8 text-center text-[#6B7280]">
          위치 정보를 불러오는 중...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <header className="sticky top-0 z-[1100] flex items-center justify-between bg-white px-6 py-4 shadow-sm">
        <button
          onClick={handleBack}
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-transparent text-[#1A1A1A] transition-colors duration-200 hover:bg-[#F5F7FA]"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="flex-1 text-center text-xl font-semibold text-[#1A1A1A]">
          {location}
        </h1>
        <FavoriteButton location={location} lat={coords.lat} lon={coords.lon} />
      </header>

      <main className="mx-auto max-w-[800px] px-6 py-6 md:px-4 md:py-4">
        <section className="mb-8">
          {weatherLoading ? (
            <div className="rounded-2xl bg-white p-8 text-center text-[#6B7280]">
              날씨 정보를 불러오는 중...
            </div>
          ) : weather ? (
            <WeatherCardWithKoreanName
              weather={weather}
              koreanName={location}
            />
          ) : null}
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold text-[#1A1A1A]">
            시간대별 날씨
          </h2>
          {forecastLoading ? (
            <div className="rounded-2xl bg-white p-8 text-center text-[#6B7280]">
              예보 정보를 불러오는 중...
            </div>
          ) : forecast ? (
            <WeatherHourly forecast={forecast} />
          ) : null}
        </section>
      </main>
    </div>
  );
}

function WeatherCardWithKoreanName({
  weather,
  koreanName,
}: {
  weather: WeatherData;
  koreanName: string;
}) {
  const weatherWithKoreanName = {
    ...weather,
    name: koreanName,
  };

  return <WeatherCard weather={weatherWithKoreanName} />;
}
