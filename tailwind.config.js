/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          main: "#4A90E2",
          light: "#6BA3E8",
          dark: "#3A7BC8",
        },
        secondary: {
          main: "#50C878",
          light: "#70D68F",
          dark: "#3FA662",
        },
        weather: {
          sunny: "#FDB813",
          cloudy: "#94A3B8",
          rainy: "#60A5FA",
          snowy: "#E0F2FE",
          stormy: "#6366F1",
        },
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [],
};
