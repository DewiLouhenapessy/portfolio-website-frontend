"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextType {
	theme: "light" | "dark";
	toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function getInitialTheme(): "light" | "dark" {
	if (typeof document === "undefined") return "light";
	return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [theme, setTheme] = useState<"light" | "dark">("light");

	useEffect(() => {
		const nextTheme = getInitialTheme();
		// Hydration-safe: keep the initial server/client render identical and sync the real
		// theme after mount when the browser has final DOM state.
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setTheme(nextTheme);
	}, []);

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
