"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { pageContent } from "@/lib/i18n";

export default function About() {
	const { locale } = useLanguage();
	const content = pageContent.about;

	return (
		<div>
			<h1>{content.heading[locale]}</h1>
			<h2>{content.subheading[locale]}</h2>
			{content.paragraphs[locale].map((paragraph, index) => (
				<p className="mb-4" key={index}>
					{paragraph}
				</p>
			))}
		</div>
	);
}
