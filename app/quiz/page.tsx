"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { pageContent } from "@/lib/i18n";

export default function Quiz() {
	const { locale } = useLanguage();
	const content = pageContent.quiz;

	return (
		<div>
			<h1>{content.heading[locale]}</h1>
			<p>{content.description[locale]}</p>
		</div>
	);
}
