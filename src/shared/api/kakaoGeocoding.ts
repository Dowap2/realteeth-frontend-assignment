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
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          console.log("🔍 검색 결과 없음:", query);
        } else {
          console.error(
            "❌ Geocoding 에러:",
            error.response?.data || error.message,
          );
        }
      } else {
        console.error("❌ 알 수 없는 에러:", error);
      }
      return null;
    }
  },
};
