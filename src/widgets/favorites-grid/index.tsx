"use client";

import styled from "@emotion/styled";
import { useFavoriteStore } from "@/src/entities/favorite/model/useFavoriteStore";
import { FavoriteCard } from "@/src/entities/favorite/ui/FavoriteCard";

export const FavoritesGrid = () => {
  const { favorites, removeFavorite, updateFavoriteName } = useFavoriteStore();

  if (favorites.length === 0) {
    return (
      <EmptyMessage>
        <EmptyIcon>📍</EmptyIcon>
        <EmptyText>즐겨찾기한 장소가 없습니다.</EmptyText>
        <EmptySubText>
          장소를 검색하고 별 아이콘을 눌러 즐겨찾기에 추가해보세요!
        </EmptySubText>
      </EmptyMessage>
    );
  }

  return (
    <Grid>
      {favorites.map((favorite) => (
        <FavoriteCard
          key={favorite.id}
          favorite={favorite}
          onRemove={removeFavorite}
          onUpdateName={updateFavoriteName}
        />
      ))}
    </Grid>
  );
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing[4]};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: ${({ theme }) => theme.spacing[3]};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing[12]}
    ${({ theme }) => theme.spacing[6]};
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  border: 2px dashed ${({ theme }) => theme.colors.border.main};
`;

const EmptyIcon = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize["4xl"]};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const EmptyText = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const EmptySubText = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.text.secondary};
`;
