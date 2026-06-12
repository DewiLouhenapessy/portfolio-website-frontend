"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextType {
	theme: "light" | "dark";
	toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [theme, setTheme] = useState<"light" | "dark">("light");
	const [mounted, setMounted] = useState(false);

	// Initialize theme from localStorage and system preference
	useEffect(() => {
		const stored = localStorage.getItem("theme") as "light" | "dark" | null;
		const prefersDark = window.matchMedia(
			"(prefers-color-scheme: dark)",
		).matches;

		let initialTheme: "light" | "dark" = "light";
		if (stored) {
			initialTheme = stored;
		} else if (prefersDark) {
			initialTheme = "dark";
		}

		setTheme(initialTheme);
		applyTheme(initialTheme);
		setMounted(true);
	}, []);

	const applyTheme = (newTheme: "light" | "dark") => {
		const root = document.documentElement;
		if (newTheme === "dark") {
			root.classList.add("dark");
		} else {
			root.classList.remove("dark");
		}
	};

	const toggleTheme = () => {
		const newTheme = theme === "light" ? "dark" : "light";
		setTheme(newTheme);
		applyTheme(newTheme);
		localStorage.setItem("theme", newTheme);
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	const context = useContext(ThemeContext);
	if (context === undefined) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
}
