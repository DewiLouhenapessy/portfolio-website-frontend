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

	// Effect 1: Check what the blocking script has applied
	// no computation, no DOM modification, only synchronises React's state.
	useEffect(() => {
		const isDark = document.documentElement.classList.contains("dark");
		setTheme(isDark ? "dark" : "light");
		setMounted(true);
	}, []);

	// Effect 2: watch live for system preference changes
	// only if the user has not made an explicit choice yet
	useEffect(() => {
		if (localStorage.getItem("theme")) return;

		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

		const handleChange = (e: MediaQueryListEvent) => {
			const newTheme = e.matches ? "dark" : "light";
			document.documentElement.classList.toggle("dark", newTheme === "dark");
			setTheme(newTheme);
		};

		mediaQuery.addEventListener("change", handleChange);
		return () => mediaQuery.removeEventListener("change", handleChange);
	}, []);

	const toggleTheme = () => {
		setTheme((prev) => {
			const next = prev === "light" ? "dark" : "light";

			document.documentElement.classList.toggle("dark", next === "dark");
			localStorage.setItem("theme", next);

			return next;
		});
	};

	// Prevent flashing of incorrect content in the UI during the very first
	// render before hydration is complete
	if (!mounted) {
		return null; // of een skeleton/placeholder, afhankelijk van je UX-voorkeur
	}

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
