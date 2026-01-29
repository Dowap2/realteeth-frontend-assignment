import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/geo/1.0";

interface GeocodingResult {
  name: string;
  local_names?: {
    ko?: string;
  };
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export const geocodingApi = {
  searchByName: async (query: string): Promise<GeocodingResult[]> => {
    try {
      const searchQuery = query.includes("-")
        ? query.split("-").pop() || query
        : query;

      const { data } = await axios.get<GeocodingResult[]>(
        `${BASE_URL}/direct`,
        {
          params: {
            q: `${searchQuery},KR`,
            limit: 5,
            appid: API_KEY,
          },
        },
      );

      return data;
    } catch (error) {
      console.error("❌ Geocoding API 에러:", error);
      return [];
    }
  },
};
