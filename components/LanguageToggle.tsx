"use client";

import { useLanguage } from "@/components/LanguageProvider";

export function LanguageToggle() {
	const { locale, setLocale } = useLanguage();
	const other = locale === "en" ? "nl" : "en";

	return (
		<div className="flex items-center gap-2">
			<button
				onClick={() => setLocale(other as typeof locale)}
				className="rounded-lg p-2 text-sm transition-colors border border-border/50 md:border-none bg-background/10 hover:bg-background/20"
				aria-label={`Switch language to ${other.toUpperCase()}`}
			>
				{other.toUpperCase()}
			</button>
		</div>
	);
}
