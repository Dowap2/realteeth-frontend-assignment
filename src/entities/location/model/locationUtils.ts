import districts from "./korea_districts.json";

export const getAllDistricts = (): string[] => {
  return districts;
};

export const searchDistricts = (query: string): string[] => {
  if (!query.trim()) return [];

  const normalizedQuery = query.trim().replace(/\s+/g, "");

  const results = districts
    .filter((district) => {
      const normalizedDistrict = district.replace(/-/g, "").replace(/\s+/g, "");
      return normalizedDistrict.includes(normalizedQuery);
    })
    .slice(0, 10);

  return results;
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
