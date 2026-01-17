"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => "dark");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved === "light" || saved === "dark") {
        setThemeState(saved);
        document.documentElement.setAttribute("data-theme", saved);
      } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
        setThemeState("light");
        document.documentElement.setAttribute("data-theme", "light");
      }
    } catch (e) {}
  }, []);

  useEffect(() => {
    try {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    } catch (e) {}
  }, [theme]);

  function toggleTheme() {
    setThemeState((t) => (t === "light" ? "dark" : "light"));
  }

  function setTheme(t: Theme) {
    setThemeState(t);
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>{children}</ThemeContext.Provider>
  );
}
