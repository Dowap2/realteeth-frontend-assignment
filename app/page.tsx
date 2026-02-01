"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SearchBar } from "@/src/widgets/search-bar";
import { WeatherCurrentSimple } from "@/src/widgets/weather-current-simple";
import { FavoritesGrid } from "@/src/widgets/favorites-grid";
import { reverseGeocodingApi } from "@/src/shared/api/reverseGeocoding";

export default function HomePage() {
  const router = useRouter();
  const [currentCoords, setCurrentCoords] = useState<{
    lat: number;
    lon: number;
  } | null>(null);
  const [currentLocationName, setCurrentLocationName] =
    useState<string>("현재 위치");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const coords = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          };
          setCurrentCoords(coords);

          const address = await reverseGeocodingApi.getAddressFromCoords(
            coords.lat,
            coords.lon,
          );

          if (address) {
            const displayName =
              address.district && address.neighborhood
                ? `${address.district} ${address.neighborhood}`
                : address.city || "현재 위치";

            setCurrentLocationName(displayName);
          }
        },
        () => {
          setCurrentCoords({ lat: 37.5665, lon: 126.978 });
          setCurrentLocationName("서울특별시");
        },
      );
    }
  }, []);

  const handleSelectLocation = (
    location: string,
    coords: { lat: number; lon: number; address?: string } | null,
  ) => {
    if (coords) {
      const displayName = coords.address || location;
      router.push(
        `/detail/${encodeURIComponent(displayName)}?lat=${coords.lat}&lon=${coords.lon}`,
      );
    } else {
      alert("해당 장소의 좌표를 찾을 수 없습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <div className="flex flex-col items-center px-6 py-6">
        <h1 className="mb-4 text-center text-2xl font-bold text-[#1A1A1A] md:text-xl">
          날씨
        </h1>
        <SearchBar onSelectLocation={handleSelectLocation} />
      </div>
      <main className="mx-auto max-w-[1200px] px-6 py-6 md:px-4 md:py-4">
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-semibold text-[#1A1A1A]">
            현재 위치
          </h2>
          <WeatherCurrentSimple
            coords={currentCoords}
            locationName={currentLocationName}
          />
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold text-[#1A1A1A]">
            즐겨찾기
          </h2>
          <FavoritesGrid />
        </section>
      </main>
    </div>
  );
}
