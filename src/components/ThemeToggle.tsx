import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <button
      onClick={() => setDark((d) => !d)}
      className="relative flex h-8 w-14 items-center rounded-full bg-secondary border border-border/50 p-1 transition-colors duration-300"
      aria-label="Toggle theme"
    >
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm transition-transform duration-300 ${
          dark ? "translate-x-6" : "translate-x-0"
        }`}
      >
        {dark ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
      </span>
    </button>
  );
};

export default ThemeToggle;
