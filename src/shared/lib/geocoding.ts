/**
 * 지오코딩 유틸리티
 */

import { kakaoGeocodingApi } from "../api/kakaoGeocoding";
import { geocodingApi } from "../api/geocoding";

interface Coordinates {
  lat: number;
  lon: number;
  address?: string;
}

export const getCoordinatesBySearch = async (
  query: string,
): Promise<Coordinates | null> => {
  try {
    const kakaoResult = await kakaoGeocodingApi.searchByAddress(query);
    if (kakaoResult) {
      return {
        lat: kakaoResult.lat,
        lon: kakaoResult.lon,
        address: kakaoResult.address,
      };
    }

    const owmResults = await geocodingApi.searchByName(query);
    if (owmResults.length > 0) {
      const result = owmResults[0];
      return {
        lat: result.lat,
        lon: result.lon,
        address: query,
      };
    }

    return null;
  } catch (error) {
    console.error("❌ 좌표 검색 실패:", error);
    return null;
  }
};

export const getCoordinatesFromLocation = (location: string): Coordinates => {
  return { lat: 37.5665, lon: 126.978, address: "서울특별시" };
};
