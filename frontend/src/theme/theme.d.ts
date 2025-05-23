type ThemeColors =
  | "zinc"
  | "rose"
  | "blue"
  | "green"
  | "orange"
  | "red"
  | "yellow"
  | "violet";

interface Theme {
  mode: "light" | "dark" | "system";
  color: ThemeColors;
}

interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}
