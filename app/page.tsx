"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { pageContent } from "@/lib/i18n";

export default function Home() {
	const { locale } = useLanguage();
	const content = pageContent.home;

	return (
		<div>
			<h1>{content.title[locale]}</h1>
			<h2>{content.subtitle[locale]}</h2>
		</div>
	);
}
