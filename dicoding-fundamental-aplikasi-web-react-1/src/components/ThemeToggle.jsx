import { Moon, Sun } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import Button from "./ui/button";
import "./ThemeToggle.css";

export default function ThemeToggle() {
  const { toggleTheme, isDark } = useTheme();

  return (
    <Button
      variant="ghost"
      size="small"
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
    >
      {isDark ? (
        <Sun size={18} className="theme-icon" />
      ) : (
        <Moon size={18} className="theme-icon" />
      )}
      <span className="theme-text">{isDark ? "Light" : "Dark"}</span>
    </Button>
  );
}
