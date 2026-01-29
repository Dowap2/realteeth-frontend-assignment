"use client";

import styled from "@emotion/styled";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { WeatherCard } from "@/src/entities/weather/ui/WeatherCard";
import { WeatherHourly } from "@/src/widgets/weather-hourly";
import { FavoriteButton } from "@/src/features/add-favorite/ui/FavoriteButton";
import {
  useCurrentWeather,
  useForecast,
} from "@/src/entities/weather/model/useWeather";
import type { WeatherData } from "@/src/entities/weather/model/types";
import { getCoordinatesBySearch } from "@/src/shared/lib/geocoding";

export default function DetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const location = decodeURIComponent(params.location as string);

  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null,
  );

  useEffect(() => {
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    if (lat && lon) {
      setCoords({
        lat: parseFloat(lat),
        lon: parseFloat(lon),
      });
    } else {
      getCoordinatesBySearch(location).then((result) => {
        if (result) {
          setCoords(result);
        } else {
          setCoords({ lat: 37.5665, lon: 126.978 });
        }
      });
    }
  }, [location, searchParams]);

  const { data: weather, isLoading: weatherLoading } = useCurrentWeather(
    coords?.lat ?? 0,
    coords?.lon ?? 0,
  );

  const { data: forecast, isLoading: forecastLoading } = useForecast(
    coords?.lat ?? 0,
    coords?.lon ?? 0,
  );

  const handleBack = () => {
    router.back();
  };

  if (!coords) {
    return (
      <Container>
        <LoadingMessage>위치 정보를 불러오는 중...</LoadingMessage>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <BackButton onClick={handleBack}>
          <ArrowLeft size={24} />
        </BackButton>
        <Title>{location}</Title>
        <FavoriteButton location={location} lat={coords.lat} lon={coords.lon} />
      </Header>

      <Content>
        <WeatherSection>
          {weatherLoading ? (
            <LoadingMessage>날씨 정보를 불러오는 중...</LoadingMessage>
          ) : weather ? (
            <WeatherCardWithKoreanName
              weather={weather}
              koreanName={location}
            />
          ) : null}
        </WeatherSection>

        <HourlySection>
          <SectionTitle>시간대별 날씨</SectionTitle>
          {forecastLoading ? (
            <LoadingMessage>예보 정보를 불러오는 중...</LoadingMessage>
          ) : forecast ? (
            <WeatherHourly forecast={forecast} />
          ) : null}
        </HourlySection>
      </Content>
    </Container>
  );
}

function WeatherCardWithKoreanName({
  weather,
  koreanName,
}: {
  weather: WeatherData;
  koreanName: string;
}) {
  const weatherWithKoreanName = {
    ...weather,
    name: koreanName,
  };

  return <WeatherCard weather={weatherWithKoreanName} />;
}

const Container = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background.default};
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[6]};
  background: ${({ theme }) => theme.colors.background.paper};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.sticky};
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: transparent;
  color: ${({ theme }) => theme.colors.text.primary};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  transition: background-color 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.background.default};
  }
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  flex: 1;
  text-align: center;
`;

const Content = styled.main`
  max-width: 800px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing[6]};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing[4]};
  }
`;

const WeatherSection = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing[8]};
`;

const HourlySection = styled.section``;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing[8]};
  color: ${({ theme }) => theme.colors.text.secondary};
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
`;
