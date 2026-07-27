"use client";

import { useLanguage } from "@/components/LanguageProvider";
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
			<div className="md:flex md:gap-16">
				<div className="pt-8">
					<p className="italic mb-6">{content.project[locale]}</p>
					<ul className="list-decimal list-inside pl-4">
						{content.items[locale].map((item) => (
							<li key={item} className="flex gap-4 mb-4">
								<span aria-hidden="true">→</span>
								<span>{item}</span>
							</li>
						))}
					</ul>
				</div>
				<div className="p-8 flex justify-center md:block">
					<img
						src="https://media.tenor.com/MRCIli40TYoAAAAi/under-construction90s-90s.gif"
						alt="Under construction GIF"
					/>
				</div>
			</div>
		</div>
	);
}
