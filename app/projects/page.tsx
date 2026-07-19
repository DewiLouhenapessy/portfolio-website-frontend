"use client";

import { useLanguage } from "@/components/LanguageProvider";
import Loader from "@/components/Loader";
import { pageContent } from "@/lib/i18n";

export default function Projects() {
	const { locale } = useLanguage();
	const content = pageContent.projects;

	return (
		<div>
			<div>
				<h1>{content.heading[locale]}</h1>
				<h2>{content.description[locale]}</h2>
			</div>
			<div className="pt-8 flex content-end">
				<p>{content.project[locale]}</p>
				<Loader size="sm" variant="dots" />
			</div>
		</div>
	);
}
