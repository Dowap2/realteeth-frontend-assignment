import axios from "axios";

interface GeocodingResult {
  lat: number;
  lon: number;
  address: string;
}

export const kakaoGeocodingApi = {
  searchByAddress: async (query: string): Promise<GeocodingResult | null> => {
    try {
      const { data } = await axios.get<GeocodingResult>("/api/geocoding", {
        params: { query },
      });

      return data;
    } catch (error: any) {
      return null;
    }
  },
};
