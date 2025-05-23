"use client";

import { useTheme } from "@/theme/ThemeProvider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

type ThemeColors =
  | "zinc"
  | "rose"
  | "blue"
  | "green"
  | "orange"
  | "red"
  | "yellow"
  | "violet";

export default function ModeToggle() {
  const { setTheme, theme } = useTheme();

  const colors: ThemeColors[] = [
    "zinc",
    "rose",
    "blue",
    "green",
    "orange",
    "red",
    "yellow",
    "violet",
  ];

  const toggleMode = () => {
    // Toggle between light and dark mode
    const newMode = theme.mode === "light" ? "dark" : "light";
    setTheme({ ...theme, mode: newMode });
  };

  const handleColorChange = (color: ThemeColors) => {
    setTheme({ ...theme, color });
  };

  return (
    <div className="flex gap-4 p-4">
      {/* Mode Toggle Button */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleMode}
          id="mode-toggle"
          aria-label={`Switch to ${theme.mode === "light" ? "dark" : "light"} mode`}
          // className="bg-bg-accent"
        >
          {theme.mode === "light" ? (
            <Sun className="text-text-accent h-[1.2rem] w-[1.2rem]" />
          ) : (
            <Moon className="h-[1.2rem] w-[1.2rem]" />
          )}
        </Button>
      </div>

      {/* Color Dropdown */}
      <div className="flex items-center gap-2">
        <Label htmlFor="color-select">Color</Label>
        <Select value={theme.color} onValueChange={handleColorChange}>
          <SelectTrigger id="color-select" className="w-[180px]">
            <SelectValue placeholder="Select color" />
          </SelectTrigger>
          <SelectContent>
            {colors.map((color) => (
              <SelectItem key={color} value={color}>
                {color.charAt(0).toUpperCase() + color.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
