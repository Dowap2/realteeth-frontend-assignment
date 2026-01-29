"use client";

import styled from "@emotion/styled";
import { useCurrentWeather } from "@/src/entities/weather/model/useWeather";
import { WeatherCard } from "@/src/entities/weather/ui/WeatherCard";
import { getCoordinatesBySearch } from "@/src/shared/lib/geocoding";
import { useEffect, useState } from "react";

interface WeatherCurrentProps {
  coords: { lat: number; lon: number } | null;
  selectedLocation: string | null;
}

export const WeatherCurrent = ({
  coords: initialCoords,
  selectedLocation,
}: WeatherCurrentProps) => {
  const [coords, setCoords] = useState(initialCoords);

  useEffect(() => {
    if (selectedLocation) {
      // async 함수로 좌표 검색
      getCoordinatesBySearch(selectedLocation).then((newCoords) => {
        if (newCoords) {
          setCoords(newCoords);
        }
      });
    } else if (initialCoords) {
      setCoords(initialCoords);
    }
  }, [selectedLocation, initialCoords]);

  const {
    data: weather,
    isLoading,
    error,
  } = useCurrentWeather(coords?.lat ?? 0, coords?.lon ?? 0);

  if (isLoading) {
    return <LoadingMessage>날씨 정보를 불러오는 중...</LoadingMessage>;
  }

  if (error) {
    return (
      <ErrorMessage>
        날씨 정보를 불러올 수 없습니다.
        <br />
        잠시 후 다시 시도해주세요.
      </ErrorMessage>
    );
  }

  if (!weather) {
    return null;
  }

  return <WeatherCard weather={weather} />;
};

const LoadingMessage = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing[12]};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing[8]};
  background: ${({ theme }) => theme.colors.status.error};
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
`;
