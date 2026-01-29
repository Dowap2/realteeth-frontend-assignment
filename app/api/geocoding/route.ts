import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const KAKAO_API_KEY = process.env.KAKAO_REST_API_KEY;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "Query is required" }, { status: 400 });
  }

  if (!KAKAO_API_KEY) {
    return NextResponse.json(
      { error: "Kakao API key not configured" },
      { status: 500 },
    );
  }

  try {
    const searchQuery = query.replace(/-/g, " ");

    const addressResponse = await axios.get(
      "https://dapi.kakao.com/v2/local/search/address.json",
      {
        headers: {
          Authorization: `KakaoAK ${KAKAO_API_KEY}`,
        },
        params: {
          query: searchQuery,
        },
      },
    );

    if (
      addressResponse.data.documents &&
      addressResponse.data.documents.length > 0
    ) {
      const result = addressResponse.data.documents[0];
      return NextResponse.json({
        lat: parseFloat(result.y),
        lon: parseFloat(result.x),
        address: result.address_name,
      });
    }

    const keywordResponse = await axios.get(
      "https://dapi.kakao.com/v2/local/search/keyword.json",
      {
        headers: {
          Authorization: `KakaoAK ${KAKAO_API_KEY}`,
        },
        params: {
          query: searchQuery,
        },
      },
    );

    if (
      keywordResponse.data.documents &&
      keywordResponse.data.documents.length > 0
    ) {
      const result = keywordResponse.data.documents[0];
      return NextResponse.json({
        lat: parseFloat(result.y),
        lon: parseFloat(result.x),
        address: result.place_name || result.address_name,
      });
    }

    return NextResponse.json({ error: "No results found" }, { status: 404 });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("❌ Kakao API Error:", {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        headers: error.response?.headers,
      });

      return NextResponse.json(
        {
          error: "Geocoding failed",
          details: error.message,
          status: error.response?.status,
          kakaoError: error.response?.data,
        },
        { status: 500 },
      );
    } else {
      console.error("❌ 알 수 없는 에러:", error);

      return NextResponse.json(
        { error: "Unknown error occurred" },
        { status: 500 },
      );
    }
  }
}
