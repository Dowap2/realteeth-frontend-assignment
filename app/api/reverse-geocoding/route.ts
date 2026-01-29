/**
 * 역지오코딩 API Route
 *
 * 좌표 → 한글 주소 변환
 */

import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const KAKAO_API_KEY = process.env.KAKAO_REST_API_KEY;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json(
      { error: "Latitude and longitude required" },
      { status: 400 },
    );
  }

  if (!KAKAO_API_KEY) {
    return NextResponse.json(
      { error: "Kakao API key not configured" },
      { status: 500 },
    );
  }

  try {
    const response = await axios.get(
      "https://dapi.kakao.com/v2/local/geo/coord2address.json",
      {
        headers: {
          Authorization: `KakaoAK ${KAKAO_API_KEY}`,
        },
        params: {
          x: lon,
          y: lat,
        },
      },
    );

    if (response.data.documents && response.data.documents.length > 0) {
      const result = response.data.documents[0];

      const address = result.road_address
        ? result.road_address.address_name
        : result.address.address_name;

      const region = result.address;

      return NextResponse.json({
        address,
        city: region.region_1depth_name,
        district: region.region_2depth_name,
        neighborhood: region.region_3depth_name,
      });
    }

    return NextResponse.json({ error: "No address found" }, { status: 404 });
  } catch (error: any) {
    console.error(
      "❌ Kakao 역지오코딩 에러:",
      error.response?.data || error.message,
    );

    return NextResponse.json(
      {
        error: "Reverse geocoding failed",
        details: error.message,
      },
      { status: 500 },
    );
  }
}
