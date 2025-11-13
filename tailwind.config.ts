import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "Inter", "Arial"],
      },
      backgroundImage: {
        "grid-s": "linear-gradient(to right, rgba(120,119,198,.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(120,119,198,.08) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid-s": "24px 24px",
      }
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
