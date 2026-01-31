"use client";

import { Cloud, Droplets, Wind } from "lucide-react";
import type { WeatherData } from "../model/types";

interface WeatherCardProps {
  weather: WeatherData;
}

export const WeatherCard = ({ weather }: WeatherCardProps) => {
  return (
    <div className="mx-auto max-w-[600px] rounded-2xl bg-white p-8 shadow-lg md:p-6">
      <div className="mb-6 text-center">
        <h2 className="mb-2 text-2xl font-bold text-[#1A1A1A]">
          {weather.name}
        </h2>
        <p className="text-lg capitalize text-[#6B7280]">
          {weather.weather[0].description}
        </p>
      </div>

      <div className="mb-6 border-b border-[#E5E7EB] pb-6 text-center">
        <div className="mb-4 text-5xl font-bold text-[#4A90E2]">
          {Math.round(weather.main.temp)}°C
        </div>
        <div className="flex items-center justify-center gap-4">
          <div className="text-center">
            <div className="mb-1 text-sm text-[#6B7280]">최저</div>
            <div className="text-xl font-semibold text-[#1A1A1A]">
              {Math.round(weather.main.temp_min)}°C
            </div>
          </div>
          <div className="h-10 w-px bg-[#E5E7EB]" />
          <div className="text-center">
            <div className="mb-1 text-sm text-[#6B7280]">최고</div>
            <div className="text-xl font-semibold text-[#1A1A1A]">
              {Math.round(weather.main.temp_max)}°C
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 sm:grid-cols-1">
        <div className="flex items-center gap-3 rounded-xl bg-[#F5F7FA] p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#4A90E2] text-white">
            <Cloud size={20} />
          </div>
          <div className="flex-1">
            <div className="mb-1 text-xs text-[#6B7280]">구름</div>
            <div className="text-base font-medium text-[#1A1A1A]">
              {weather.clouds.all}%
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl bg-[#F5F7FA] p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#4A90E2] text-white">
            <Droplets size={20} />
          </div>
          <div className="flex-1">
            <div className="mb-1 text-xs text-[#6B7280]">습도</div>
            <div className="text-base font-medium text-[#1A1A1A]">
              {weather.main.humidity}%
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl bg-[#F5F7FA] p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#4A90E2] text-white">
            <Wind size={20} />
          </div>
          <div className="flex-1">
            <div className="mb-1 text-xs text-[#6B7280]">풍속</div>
            <div className="text-base font-medium text-[#1A1A1A]">
              {weather.wind.speed} m/s
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
