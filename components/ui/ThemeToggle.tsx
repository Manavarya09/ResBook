"use client";

import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

type Theme = "light" | "dark" | "system";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("system");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const stored = localStorage.getItem("resbook-theme") as Theme | null;
    if (stored) {
      setTheme(stored);
    }
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const root = document.documentElement;
    
    if (theme === "system") {
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.toggle("dark", systemDark);
    } else {
      root.classList.toggle("dark", theme === "dark");
    }
    
    localStorage.setItem("resbook-theme", theme);
  }, [theme, isClient]);

  if (!isClient) return null;

  const toggle = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  return (
    <button
      onClick={toggle}
      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded transition-colors"
      aria-label={`Current theme: ${theme}. Click to toggle.`}
      title={`Theme: ${theme}`}
    >
      {theme === "light" && <Sun className="w-4 h-4" />}
      {theme === "dark" && <Moon className="w-4 h-4" />}
      {theme === "system" && (
        <span className="w-4 h-4 flex items-center justify-center text-xs">◐</span>
      )}
    </button>
  );
}
