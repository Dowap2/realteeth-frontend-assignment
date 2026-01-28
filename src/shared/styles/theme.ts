export const theme = {
  colors: {
    primary: "#4A90E2",
    secondary: "#50C878",
    background: "#F5F7FA",
    text: "#1A1A1A",
  },
  spacing: {
    sm: "8px",
    md: "16px",
    lg: "24px",
  },
  borderRadius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
  },
} as const;

export type Theme = typeof theme;
