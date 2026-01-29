"use client";

import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import { MapPin } from "lucide-react";
import { useCurrentWeather } from "@/src/entities/weather/model/useWeather";

interface WeatherCurrentSimpleProps {
  coords: { lat: number; lon: number } | null;
  locationName?: string;
}

export const WeatherCurrentSimple = ({
  coords,
  locationName,
}: WeatherCurrentSimpleProps) => {
  const router = useRouter();
  const {
    data: weather,
    isLoading,
    error,
  } = useCurrentWeather(coords?.lat ?? 0, coords?.lon ?? 0);

  if (isLoading) {
    return <LoadingCard>날씨 정보를 불러오는 중...</LoadingCard>;
  }

  if (error || !weather) {
    return <ErrorCard>날씨 정보를 불러올 수 없습니다.</ErrorCard>;
  }

  const displayName = locationName || weather.name;

  const handleClick = () => {
    router.push(
      `/detail/${encodeURIComponent(displayName)}?lat=${coords?.lat}&lon=${coords?.lon}`,
    );
  };

  return (
    <Card onClick={handleClick}>
      <LocationSection>
        <MapPin size={20} />
        <Location>{displayName}</Location>
      </LocationSection>

      <WeatherInfo>
        <MainTemp>{Math.round(weather.main.temp)}°C</MainTemp>
        <Description>{weather.weather[0].description}</Description>
      </WeatherInfo>

      <TempRange>
        <TempItem>
          <Label>최저</Label>
          <Value>{Math.round(weather.main.temp_min)}°C</Value>
        </TempItem>
        <TempItem>
          <Label>최고</Label>
          <Value>{Math.round(weather.main.temp_max)}°C</Value>
        </TempItem>
      </TempRange>

      <ViewDetail>상세 보기 →</ViewDetail>
    </Card>
  );
};

const Card = styled.div`
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing[6]};
  box-shadow: ${({ theme }) => theme.shadows.md};
  cursor: pointer;
  transition:
    transform 0.2s,
    box-shadow 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.xl};
  }
`;

const LocationSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const Location = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const WeatherInfo = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const MainTemp = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize["4xl"]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary.main};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const Description = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-transform: capitalize;
`;

const TempRange = styled.div`
  display: flex;
  justify-content: space-around;
  padding: ${({ theme }) => theme.spacing[4]} 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const TempItem = styled.div`
  text-align: center;
`;

const Label = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing[1]};
`;

const Value = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const ViewDetail = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.primary.main};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const LoadingCard = styled.div`
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing[12]};
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const ErrorCard = styled(LoadingCard)`
  background: ${({ theme }) => theme.colors.status.error};
  color: white;
`;
