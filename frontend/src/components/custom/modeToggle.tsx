import { Button } from "@/components/ui/button";
import { useTheme } from "@/theme/ThemeProvider";
import { Moon, Sun } from "lucide-react";

export default function ModeToggle() {
  const { setTheme, theme } = useTheme();

  const toggleMode = () => {
    // Toggle between light and dark mode
    const newMode = theme.mode === "light" ? "dark" : "light";
    setTheme({ ...theme, mode: newMode });
  };

  return (
    <div className="flex gap-4 p-4">
      {/* Mode Toggle Button */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMode}
          id="mode-toggle"
          aria-label={`Switch to ${theme.mode === "light" ? "dark" : "light"} mode`}
          // className="bg-bg-accent"
        >
          {theme.mode === "light" ? (
            <Sun className="text-text-accent h-[1.2rem] w-[1.2rem]" />
          ) : (
            <Moon className="text-text-accent h-[1.2rem] w-[1.2rem]" />
          )}
        </Button>
      </div>
    </div>
  );
}
