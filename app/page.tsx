"use client";

import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SearchBar } from "@/src/widgets/search-bar";
import { WeatherCurrentSimple } from "@/src/widgets/weather-current-simple";
import { FavoritesGrid } from "@/src/widgets/favorites-grid";
import { reverseGeocodingApi } from "@/src/shared/api/reverseGeocoding";

export default function HomePage() {
  const router = useRouter();
  const [currentCoords, setCurrentCoords] = useState<{
    lat: number;
    lon: number;
  } | null>(null);
  const [currentLocationName, setCurrentLocationName] =
    useState<string>("현재 위치");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const coords = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          };
          setCurrentCoords(coords);

          const address = await reverseGeocodingApi.getAddressFromCoords(
            coords.lat,
            coords.lon,
          );

          if (address) {
            const displayName =
              address.district && address.neighborhood
                ? `${address.district} ${address.neighborhood}`
                : address.city || "현재 위치";

            setCurrentLocationName(displayName);
          }
        },
        () => {
          setCurrentCoords({ lat: 37.5665, lon: 126.978 });
          setCurrentLocationName("서울특별시");
        },
      );
    }
  }, []);

  const handleSelectLocation = (
    location: string,
    coords: { lat: number; lon: number; address?: string } | null,
  ) => {
    if (coords) {
      const displayName = coords.address || location;
      router.push(
        `/detail/${encodeURIComponent(displayName)}?lat=${coords.lat}&lon=${coords.lon}`,
      );
    } else {
      alert("해당 장소의 좌표를 찾을 수 없습니다.");
    }
  };

  return (
    <Container>
      <Header>
        <Title>날씨</Title>
        <SearchBar onSelectLocation={handleSelectLocation} />
      </Header>

      <MainContent>
        <CurrentWeatherSection>
          <SectionTitle>현재 위치</SectionTitle>
          <WeatherCurrentSimple
            coords={currentCoords}
            locationName={currentLocationName}
          />
        </CurrentWeatherSection>

        <FavoritesSection>
          <SectionTitle>즐겨찾기</SectionTitle>
          <FavoritesGrid />
        </FavoritesSection>
      </MainContent>
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background.default};
`;

const Header = styled.header`
  background: ${({ theme }) => theme.colors.background.paper};
  padding: ${({ theme }) => theme.spacing[6]};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.sticky};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing[4]};
  }
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize["2xl"]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing[4]};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
  }
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing[6]};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing[4]};
  }
`;

const CurrentWeatherSection = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing[8]};
`;

const FavoritesSection = styled.section``;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;
