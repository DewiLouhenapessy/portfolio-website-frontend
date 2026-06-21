"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { pageContent } from "@/lib/i18n";

export default function Skills() {
	const { locale } = useLanguage();
	const content = pageContent.skills;

	return (
		<div>
			<h1>{content.heading[locale]}</h1>
			<p>{content.description[locale]}</p>
		</div>
	);
}
