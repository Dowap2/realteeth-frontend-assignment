"use client";

import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import { MapPin, Edit2, Trash2 } from "lucide-react";
import { useState } from "react";
import { useCurrentWeather } from "@/src/entities/weather/model/useWeather";
import type { Favorite } from "@/src/entities/favorite/model/useFavoriteStore";

interface FavoriteCardProps {
  favorite: Favorite;
  onRemove: (id: string) => void;
  onUpdateName: (id: string, name: string) => void;
}

export const FavoriteCard = ({
  favorite,
  onRemove,
  onUpdateName,
}: FavoriteCardProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(favorite.name);

  const { data: weather, isLoading } = useCurrentWeather(
    favorite.lat,
    favorite.lon,
  );

  const handleClick = () => {
    if (!isEditing) {
      router.push(
        `/detail/${encodeURIComponent(favorite.location)}?lat=${favorite.lat}&lon=${favorite.lon}`,
      );
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editName.trim()) {
      onUpdateName(favorite.id, editName.trim());
      setIsEditing(false);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(`"${favorite.name}"을(를) 즐겨찾기에서 삭제하시겠습니까?`)) {
      onRemove(favorite.id);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setEditName(favorite.name);
      setIsEditing(false);
    }
  };

  return (
    <Card onClick={handleClick}>
      <Header>
        {isEditing ? (
          <NameInput
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            onBlur={handleSave}
            onKeyDown={handleKeyPress}
            autoFocus
          />
        ) : (
          <Name>
            <MapPin size={16} />
            {favorite.name}
          </Name>
        )}
        <Actions>
          {!isEditing && (
            <ActionButton onClick={handleEdit} title="이름 변경">
              <Edit2 size={16} />
            </ActionButton>
          )}
          <ActionButton onClick={handleRemove} title="삭제">
            <Trash2 size={16} />
          </ActionButton>
        </Actions>
      </Header>

      {isLoading ? (
        <Loading>로딩 중...</Loading>
      ) : weather ? (
        <WeatherInfo>
          <MainTemp>{Math.round(weather.main.temp)}°C</MainTemp>
          <Description>{weather.weather[0].description}</Description>
          <TempRange>
            <span>최저 {Math.round(weather.main.temp_min)}°</span>
            <Divider>•</Divider>
            <span>최고 {Math.round(weather.main.temp_max)}°</span>
          </TempRange>
        </WeatherInfo>
      ) : (
        <Error>날씨 정보를 불러올 수 없습니다</Error>
      )}
    </Card>
  );
};

const Card = styled.div`
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing[5]};
  box-shadow: ${({ theme }) => theme.shadows.md};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.xl};
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  padding-bottom: ${({ theme }) => theme.spacing[3]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
`;

const Name = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const NameInput = styled.input`
  flex: 1;
  padding: ${({ theme }) => theme.spacing[2]};
  border: 2px solid ${({ theme }) => theme.colors.primary.main};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  outline: none;
`;

const Actions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: transparent;
  color: ${({ theme }) => theme.colors.text.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.background.default};
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

const WeatherInfo = styled.div`
  text-align: center;
`;

const MainTemp = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize["3xl"]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary.main};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const Description = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing[3]};
  text-transform: capitalize;
`;

const TempRange = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const Divider = styled.span`
  color: ${({ theme }) => theme.colors.border.main};
`;

const Loading = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing[6]};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const Error = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.status.error};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;
