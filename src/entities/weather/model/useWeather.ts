"use client";

import { useQuery } from "@tanstack/react-query";
import { weatherApi } from "../api/weatherApi";

export const useCurrentWeather = (lat: number, lon: number) => {
  return useQuery({
    queryKey: ["weather", "current", lat, lon],
    queryFn: () => weatherApi.getCurrentWeatherByCoords(lat, lon),
    enabled: !!lat && !!lon,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useWeatherByCity = (city: string) => {
  return useQuery({
    queryKey: ["weather", "city", city],
    queryFn: () => weatherApi.getCurrentWeatherByCity(city),
    enabled: !!city,
    staleTime: 5 * 60 * 1000,
  });
};

export const useForecast = (lat: number, lon: number) => {
  return useQuery({
    queryKey: ["weather", "forecast", lat, lon],
    queryFn: () => weatherApi.getForecastByCoords(lat, lon),
    enabled: !!lat && !!lon,
    staleTime: 10 * 60 * 1000,
  });
};
