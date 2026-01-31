"use client";

import Image from "next/image";
import type { ForecastData } from "@/src/entities/weather/model/types";

interface WeatherHourlyProps {
  forecast: ForecastData;
}

export const WeatherHourly = ({ forecast }: WeatherHourlyProps) => {
  const hourlyData = forecast.list.slice(0, 8).map((item) => {
    const date = new Date(item.dt * 1000);
    const hour = date.getHours();
    const period = hour >= 12 ? "오후" : "오전";
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;

    return {
      time: `${period} ${displayHour}시`,
      temperature: Math.round(item.main.temp),
      feelsLike: Math.round(item.main.feels_like),
      description: item.weather[0].description,
      icon: item.weather[0].icon,
    };
  });

  return (
    <div className="overflow-hidden rounded-2xl bg-white p-6 shadow-md md:rounded-lg md:p-4">
      <div className="flex gap-3 overflow-x-auto overflow-y-hidden py-2 [-webkit-overflow-scrolling:touch] [scrollbar-color:#D1D5DB_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar-thumb:hover]:bg-[#9CA3AF] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#D1D5DB] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:h-1.5">
        {hourlyData.map((item, index) => (
          <div
            key={index}
            className="flex min-w-[120px] flex-col items-center rounded-lg border border-[#E5E7EB] bg-[#FAFBFC] p-4 transition-all duration-200 hover:-translate-y-1 hover:border-[#6BA3E8] hover:shadow-lg sm:min-w-[100px] sm:p-3"
          >
            <div className="mb-3 whitespace-nowrap text-sm font-semibold text-[#1A1A1A]">
              {item.time}
            </div>

            <div className="mb-2 flex items-center justify-center [&_img]:block [&_img]:drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)] sm:[&_img]:h-[50px] sm:[&_img]:w-[50px]">
              <Image
                src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
                alt={item.description}
                width={60}
                height={60}
                unoptimized
              />
            </div>

            <div className="mb-2 text-2xl font-bold text-[#1A1A1A]">
              {item.temperature}°
            </div>

            <div className="mb-2 flex min-h-[28px] items-center text-center text-xs leading-tight text-[#6B7280]">
              {item.description}
            </div>

            <div className="rounded-lg bg-[#F5F7FA] px-2 py-1 text-xs text-[#D1D5DB]">
              체감 {item.feelsLike}°
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
