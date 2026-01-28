import { weatherClient } from "@shared/api/client";
import type { WeatherData, ForecastData } from "../model/types";

export const weatherApi = {
  getCurrentWeatherByCoords: async (lat: number, lon: number) => {
    const { data } = await weatherClient.get<WeatherData>("/weather", {
      params: { lat, lon },
    });
    return data;
  },

  getCurrentWeatherByCity: async (city: string) => {
    const { data } = await weatherClient.get<WeatherData>("/weather", {
      params: { q: city },
    });
    return data;
  },

  getForecastByCoords: async (lat: number, lon: number) => {
    const { data } = await weatherClient.get<ForecastData>("/forecast", {
      params: { lat, lon },
    });
    return data;
  },

  getForecastByCity: async (city: string) => {
    const { data } = await weatherClient.get<ForecastData>("/forecast", {
      params: { q: city },
    });
    return data;
  },
};
