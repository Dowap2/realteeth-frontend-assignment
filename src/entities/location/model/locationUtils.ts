import districts from "./korea_districts.json";

export const getAllDistricts = (): string[] => {
  return districts;
};

export const searchDistricts = (query: string): string[] => {
  if (!query.trim()) return [];

  const normalizedQuery = query.trim();

  return districts
    .filter((district) => district.includes(normalizedQuery))
    .slice(0, 10);
};

export const parseDistrict = (districtStr: string) => {
  const parts = districtStr.split("-");
  return {
    full: districtStr,
    city: parts[0] || undefined,
    district: parts[1] || undefined,
    dong: parts[2] || undefined,
  };
};
