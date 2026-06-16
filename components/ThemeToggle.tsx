"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
	const { theme, toggleTheme } = useTheme();

	return (
		<button
			onClick={toggleTheme}
			className="p-2 rounded-lg transition-colors border border-border/50 md:border-none bg-background/10 hover:bg-background/20"
			aria-label="Toggle theme"
		>
			{theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
		</button>
	);
}
