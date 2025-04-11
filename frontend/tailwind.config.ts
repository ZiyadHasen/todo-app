import { type Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Josefin Sans'", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
