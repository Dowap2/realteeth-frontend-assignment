import axios from "axios";

interface ReverseGeocodingResult {
  address: string;
  city: string;
  district: string;
  neighborhood: string;
}

export const reverseGeocodingApi = {
  getAddressFromCoords: async (
    lat: number,
    lon: number,
  ): Promise<ReverseGeocodingResult | null> => {
    try {
      const { data } = await axios.get<ReverseGeocodingResult>(
        "/api/reverse-geocoding",
        {
          params: { lat, lon },
        },
      );
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "❌ 역지오코딩 실패:",
          error.response?.data || error.message,
        );
      } else {
        console.error("❌ 역지오코딩 실패:", error);
      }
      return null;
    }
  },
};
