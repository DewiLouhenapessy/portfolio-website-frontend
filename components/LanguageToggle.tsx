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
						className="rounded-full px-3 py-1 text-sm font-semibold transition border border-border/40 bg-transparent text-muted"
						aria-label={`Switch language to ${other.toUpperCase()}`}
					>
						{other.toUpperCase()}
					</button>
				);
			})()}
		</div>
	);
}
