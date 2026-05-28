import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eefdf9",
          100: "#d5f7ef",
          200: "#afeee1",
          300: "#78decd",
          400: "#3fc5b2",
          500: "#1fa996",
          600: "#138878",
          700: "#116d61",
          800: "#11574f",
          900: "#0f4a44",
          950: "#052f2d",
        },
        ink: {
          50: "#f6f8f8",
          100: "#e7eded",
          200: "#d3dddd",
          300: "#b1c1c2",
          400: "#879fa1",
          500: "#687f82",
          600: "#53676a",
          700: "#45575a",
          800: "#3b494c",
          900: "#243134",
          950: "#102024",
        },
      },
      boxShadow: {
        soft: "0 18px 45px rgba(15, 74, 68, 0.10)",
        panel: "0 10px 24px rgba(16, 32, 36, 0.08)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
