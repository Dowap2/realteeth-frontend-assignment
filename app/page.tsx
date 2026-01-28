"use client";

import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { SearchInput } from "@/src/features/search-location/ui/SearchInput";
import { WeatherCard } from "@/src/entities/weather/ui/WeatherCard";
import { useCurrentWeather } from "@/src/entities/weather/model/useWeather";
import { getCoordinatesFromLocation } from "@/src/shared/lib/geocoding";

export default function HomePage() {
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null,
  );

  const {
    data: weather,
    isLoading,
    error,
  } = useCurrentWeather(coords?.lat ?? 0, coords?.lon ?? 0);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        () => {
          setCoords({ lat: 37.5665, lon: 126.978 });
        },
      );
    }
  }, []);

  const handleSelectLocation = (location: string) => {
    setSelectedLocation(location);
    const coordinates = getCoordinatesFromLocation(location);

    if (coordinates) {
      setCoords(coordinates);
    } else {
      alert("해당 장소의 정보가 제공되지 않습니다.");
    }
  };

  return (
    <Container>
      <Header>
        <Title>날씨 앱</Title>
        <Subtitle>지역을 검색하여 날씨를 확인하세요</Subtitle>
      </Header>

      <SearchSection>
        <SearchInput onSelectLocation={handleSelectLocation} />
      </SearchSection>

      <WeatherSection>
        {isLoading && (
          <LoadingMessage>날씨 정보를 불러오는 중...</LoadingMessage>
        )}

        {error && (
          <ErrorMessage>
            날씨 정보를 불러올 수 없습니다.
            <br />
            잠시 후 다시 시도해주세요.
          </ErrorMessage>
        )}

        {weather && !isLoading && <WeatherCard weather={weather} />}
      </WeatherSection>
    </Container>
  );
}

const Container = styled.main`
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing[6]};
  background: ${({ theme }) => theme.colors.background.default};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing[4]};
  }
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing[8]};
  padding-top: ${({ theme }) => theme.spacing[8]};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize["4xl"]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[3]};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSize["3xl"]};
  }
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const SearchSection = styled.section`
  display: flex;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing[8]};
`;

const WeatherSection = styled.section`
  margin-top: ${({ theme }) => theme.spacing[6]};
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing[12]};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing[8]};
  background: ${({ theme }) => theme.colors.status.error};
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  max-width: 600px;
  margin: 0 auto;
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
`;
