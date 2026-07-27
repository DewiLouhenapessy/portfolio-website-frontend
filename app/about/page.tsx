"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { RevealCard } from "@/components/RevealCard";
import { pageContent } from "@/lib/i18n";

export default function About() {
	const { locale } = useLanguage();
	const content = pageContent.about;

	return (
		<div>
			<h1>{content.heading[locale]}</h1>
			<h2>{content.subheading[locale]}</h2>
			{content.paragraphs[locale].map((paragraph, index) => (
				<div key={index}>
					<RevealCard
						text={paragraph}
						direction={index % 2 === 0 ? "left" : "right"}
					/>
				</div>
			))}
		</div>
	);
}
