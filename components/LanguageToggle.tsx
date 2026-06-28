"use client";

import { useLanguage } from "@/components/LanguageProvider";

export function LanguageToggle() {
	const { locale, setLocale } = useLanguage();

	const getTargetHostname = (loc: string) => {
		const host = window.location.hostname;
		if (loc === "en") {
			return host.endsWith(".nl") ? host.replace(/\.nl$/, ".com") : host;
		}
		return host.endsWith(".com") ? host.replace(/\.com$/, ".nl") : host;
	};

	const switchLocale = (loc: string) => {
		if (typeof window === "undefined") {
			return;
		}
		const targetHost = getTargetHostname(loc);
		const targetUrl = `${window.location.protocol}//${targetHost}${window.location.pathname}${window.location.search}${window.location.hash}`;
		if (targetHost !== window.location.hostname) {
			window.location.href = targetUrl;
			return;
		}
		setLocale(loc as typeof locale);
	};

	return (
		<div className="flex items-center gap-2">
			{(() => {
				const other = locale === "en" ? "nl" : "en";
				return (
					<button
						onClick={() => switchLocale(other)}
						className="rounded-lg p-2 text-sm transition-colors border border-border/50 md:border-none bg-background/10 hover:bg-background/20"
						aria-label={`Switch language to ${other.toUpperCase()}`}
					>
						{other.toUpperCase()}
					</button>
				);
			})()}
		</div>
	);
}
