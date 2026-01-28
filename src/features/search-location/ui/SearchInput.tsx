"use client";

import styled from "@emotion/styled";
import { Search, X } from "lucide-react";
import { useLocationSearch } from "../model/useLocationSearch";

interface SearchInputProps {
  onSelectLocation: (location: string) => void;
}

export const SearchInput = ({ onSelectLocation }: SearchInputProps) => {
  const { query, results, isOpen, handleSearch, handleSelect, handleClear } =
    useLocationSearch();

  const onSelect = (location: string) => {
    handleSelect(location);
    onSelectLocation(location);
  };

  return (
    <Container>
      <InputWrapper>
        <SearchIcon size={20} />
        <Input
          type="text"
          placeholder="지역을 검색하세요 (예: 서울, 강남구, 역삼동)"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
        />
        {query && (
          <ClearButton onClick={handleClear}>
            <X size={20} />
          </ClearButton>
        )}
      </InputWrapper>

      {isOpen && results.length > 0 && (
        <ResultsList>
          {results.map((location) => (
            <ResultItem key={location} onClick={() => onSelect(location)}>
              {location}
            </ResultItem>
          ))}
        </ResultsList>
      )}

      {isOpen && results.length === 0 && query && (
        <NoResults>검색 결과가 없습니다.</NoResults>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing[4]};
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition: box-shadow 0.2s;

  &:focus-within {
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

const SearchIcon = styled(Search)`
  color: ${({ theme }) => theme.colors.text.secondary};
  flex-shrink: 0;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  margin: 0 ${({ theme }) => theme.spacing[3]};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  background: transparent;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.disabled};
  }
`;

const ClearButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing[1]};
  background: transparent;
  color: ${({ theme }) => theme.colors.text.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: background-color 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.background.default};
  }
`;

const ResultsList = styled.ul`
  position: absolute;
  top: calc(100% + ${({ theme }) => theme.spacing[2]});
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  max-height: 400px;
  overflow-y: auto;
  z-index: ${({ theme }) => theme.zIndex.dropdown};
  list-style: none;
`;

const ResultItem = styled.li`
  padding: ${({ theme }) => theme.spacing[4]};
  cursor: pointer;
  transition: background-color 0.2s;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.background.default};
  }
`;

const NoResults = styled.div`
  position: absolute;
  top: calc(100% + ${({ theme }) => theme.spacing[2]});
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  padding: ${({ theme }) => theme.spacing[6]};
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
`;
