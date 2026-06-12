"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
	const { theme, toggleTheme } = useTheme();

	return (
		<button
			onClick={toggleTheme}
			className="p-2 rounded-lg transition-colors hover:bg-accent"
			aria-label="Toggle theme"
		>
			{theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
		</button>
	);
}
