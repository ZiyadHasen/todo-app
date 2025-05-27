// ThemeProvider.tsx
import { createContext, useContext, useState, useEffect } from "react";
import { Theme, ThemeProviderProps, ThemeProviderState } from "./theme";

const initialState: ThemeProviderState = {
  theme: { mode: "system" },
  setTheme: () => {},
};

const ThemeContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = { mode: "dark" },
  storageKey = "app-theme",
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    // try reading from localStorage
    if (typeof window !== "undefined") {
      const stored = window.localStorage.getItem(storageKey);
      if (stored === "light" || stored === "dark" || stored === "system") {
        return { mode: stored };
      }
    }
    return defaultTheme;
  });

  // persist changes
  useEffect(() => {
    if (theme.mode !== "system") {
      window.localStorage.setItem(storageKey, theme.mode);
    } else {
      window.localStorage.removeItem(storageKey);
    }
  }, [theme.mode, storageKey]);

  // determine actual applied mode
  const appliedMode =
    theme.mode === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme.mode;

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div data-theme={appliedMode}>{children}</div>
    </ThemeContext.Provider>
  );
}

/**
 * Hook to read & change theme
 */
export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be inside ThemeProvider");
  return ctx;
};
