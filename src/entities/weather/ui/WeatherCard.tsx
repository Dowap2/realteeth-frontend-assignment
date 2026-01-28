"use client";

import styled from "@emotion/styled";
import { Cloud, Droplets, Wind } from "lucide-react";
import type { WeatherData } from "../model/types";

interface WeatherCardProps {
  weather: WeatherData;
}

export const WeatherCard = ({ weather }: WeatherCardProps) => {
  return (
    <Card>
      <Header>
        <Location>{weather.name}</Location>
        <Description>{weather.weather[0].description}</Description>
      </Header>

      <TempSection>
        <MainTemp>{Math.round(weather.main.temp)}°C</MainTemp>
        <TempRange>
          <TempItem>
            <Label>최저</Label>
            <Value>{Math.round(weather.main.temp_min)}°C</Value>
          </TempItem>
          <Divider />
          <TempItem>
            <Label>최고</Label>
            <Value>{Math.round(weather.main.temp_max)}°C</Value>
          </TempItem>
        </TempRange>
      </TempSection>

      <InfoGrid>
        <InfoItem>
          <IconWrapper>
            <Cloud size={20} />
          </IconWrapper>
          <InfoContent>
            <InfoLabel>구름</InfoLabel>
            <InfoValue>{weather.clouds.all}%</InfoValue>
          </InfoContent>
        </InfoItem>

        <InfoItem>
          <IconWrapper>
            <Droplets size={20} />
          </IconWrapper>
          <InfoContent>
            <InfoLabel>습도</InfoLabel>
            <InfoValue>{weather.main.humidity}%</InfoValue>
          </InfoContent>
        </InfoItem>

        <InfoItem>
          <IconWrapper>
            <Wind size={20} />
          </IconWrapper>
          <InfoContent>
            <InfoLabel>풍속</InfoLabel>
            <InfoValue>{weather.wind.speed} m/s</InfoValue>
          </InfoContent>
        </InfoItem>
      </InfoGrid>
    </Card>
  );
};

const Card = styled.div`
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing[8]};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  max-width: 600px;
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing[6]};
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const Location = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize["2xl"]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-transform: capitalize;
`;

const TempSection = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  padding-bottom: ${({ theme }) => theme.spacing[6]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
`;

const MainTemp = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize["5xl"]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary.main};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const TempRange = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[4]};
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
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Divider = styled.div`
  width: 1px;
  height: 40px;
  background: ${({ theme }) => theme.colors.border.light};
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing[4]};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => theme.spacing[3]};
  background: ${({ theme }) => theme.colors.background.default};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.primary.contrast};
  border-radius: ${({ theme }) => theme.borderRadius.base};
`;

const InfoContent = styled.div`
  flex: 1;
`;

const InfoLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing[1]};
`;

const InfoValue = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
`;
