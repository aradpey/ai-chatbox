"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

// This component provides a button to toggle between light and dark themes.
// It uses the next-themes library to manage theme state.
export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  // Function to toggle between light and dark themes.
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    // The theme switcher button with appropriate icon based on current theme.
    <Button
      onClick={toggleTheme}
      size="icon"
      variant="ghost"
      className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </Button>
  );
};

export default ThemeSwitcher;
