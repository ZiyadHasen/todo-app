import { type Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Josefin Sans'", "sans-serif"],
      },
      extend: {
        colors: {
          // Core semantic tokens
          text: {
            base: "var(--color-text)",
            muted: "var(--color-text-muted)",
            placeholder: "var(--color-placeholder)",
            inverted: "var(--color-text-inverted)",
          },
          icon: {
            base: "var(--color-icon)",
          },
          background: {
            base: "var(--color-bg)",
            subtle: "var(--color-bg-subtle)",
          },
          button: {
            primary: "var(--color-btn-primary)",
            secondary: "var(--color-btn-secondary)",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
