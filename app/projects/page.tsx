"use client";

import Image from "next/image";
import { useLanguage } from "@/components/LanguageProvider";
import { ProjectCard } from "@/components/ProjectCard";
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
			<section aria-labelledby="featured-projects-heading">
				<h2 id="featured-projects-heading">
					{content.featuredHeading[locale]}
				</h2>
				<div className="grid gap-4">
					{content.featured[locale].map((project) => (
						<ProjectCard key={project.name} project={project} locale={locale} />
					))}
				</div>
			</section>
			<section className="mt-24" aria-labelledby="other-projects-heading">
				<h2 id="other-projects-heading">{content.project[locale]}</h2>
				<div className="md:flex md:gap-8">
					<div className="md:w-full">
						<ul className="list-decimal list-inside pl-4">
							{content.items[locale].map((item) => (
								<li key={item} className="flex gap-4 mb-4">
									<span aria-hidden="true">→</span>
									<span>{item}</span>
								</li>
							))}
						</ul>
					</div>
					<div className="p-4 flex justify-center md:block">
						<Image
							src="https://media.tenor.com/MRCIli40TYoAAAAi/under-construction90s-90s.gif"
							alt="Under construction GIF"
							width={480}
							height={360}
							unoptimized
						/>
					</div>
				</div>
			</section>
		</div>
	);
}
