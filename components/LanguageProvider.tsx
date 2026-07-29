"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { defaultLocale, Locale } from "@/lib/i18n";

interface LanguageContextType {
	locale: Locale;
	setLocale: (locale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
	undefined,
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
	const [locale, setLocaleState] = useState<Locale>(defaultLocale);

	useEffect(() => {
		document.documentElement.lang = locale;
		localStorage.setItem("locale", locale);
	}, [locale]);

	const setLocale = (newLocale: Locale) => {
		setLocaleState(newLocale);
		localStorage.setItem("locale", newLocale);
	};

	return (
		<LanguageContext.Provider value={{ locale, setLocale }}>
			{children}
		</LanguageContext.Provider>
	);
}

export function useLanguage() {
	const context = useContext(LanguageContext);
	if (!context) {
		throw new Error("useLanguage must be used within a LanguageProvider");
	}
	return context;
}
