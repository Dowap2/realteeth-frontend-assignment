"use client";

import styled from "@emotion/styled";
import type { ForecastData } from "@/src/entities/weather/model/types";

interface WeatherHourlyProps {
  forecast: ForecastData;
}

export const WeatherHourly = ({ forecast }: WeatherHourlyProps) => {
  const hourlyData = forecast.list.slice(0, 8).map((item) => {
    const date = new Date(item.dt * 1000);
    const hour = date.getHours();
    const period = hour >= 12 ? "오후" : "오전";
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;

    return {
      time: `${period} ${displayHour}시`,
      temperature: Math.round(item.main.temp),
      feelsLike: Math.round(item.main.feels_like),
      description: item.weather[0].description,
      icon: item.weather[0].icon,
    };
  });

  return (
    <Container>
      <ScrollContainer>
        {hourlyData.map((item, index) => (
          <HourCard key={index}>
            <TimeLabel>{item.time}</TimeLabel>

            <WeatherIcon>
              <img
                src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
                alt={item.description}
                width={60}
                height={60}
              />
            </WeatherIcon>

            <Temperature>{item.temperature}°</Temperature>

            <Description>{item.description}</Description>

            <FeelsLike>체감 {item.feelsLike}°</FeelsLike>
          </HourCard>
        ))}
      </ScrollContainer>
    </Container>
  );
};

const Container = styled.div`
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing[6]};
  box-shadow: ${({ theme }) => theme.shadows.md};
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing[4]};
    border-radius: ${({ theme }) => theme.borderRadius.lg};
  }
`;

const ScrollContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[3]};
  overflow-x: auto;
  overflow-y: hidden;
  padding: ${({ theme }) => theme.spacing[2]} 0;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.colors.border.main} transparent;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border.main};
    border-radius: ${({ theme }) => theme.borderRadius.full};
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.border.dark};
  }
`;

const HourCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 120px;
  padding: ${({ theme }) => theme.spacing[4]};
  background: ${({ theme }) => theme.colors.background.elevated};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  transition: all 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
    border-color: ${({ theme }) => theme.colors.primary.light};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    min-width: 100px;
    padding: ${({ theme }) => theme.spacing[3]};
  }
`;

const TimeLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[3]};
  white-space: nowrap;
`;

const WeatherIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing[2]};

  img {
    display: block;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    img {
      width: 50px;
      height: 50px;
    }
  }
`;

const Temperature = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize["2xl"]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const Description = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  min-height: 28px;
  display: flex;
  align-items: center;
`;

const FeelsLike = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.hint};
  padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[2]};
  background: ${({ theme }) => theme.colors.background.default};
  border-radius: ${({ theme }) => theme.borderRadius.base};
`;
