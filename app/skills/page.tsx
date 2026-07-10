"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { pageContent } from "@/lib/i18n";
import { SkillMeter } from "@/components/SkillMeter";
import {
	categoryLabels,
	categoryColors,
	langLevelLabels,
	interestsLabels,
	getSkillsByCategory,
} from "@/lib/skills";
import Loader from "@/components/Loader";

export default function Skills() {
	const { locale } = useLanguage();
	const content = pageContent.skills;

	const visualisations = [
		{ category: "technology", graphType: "radar" },
		{ category: "language", graphType: "vertical" },
		{ category: "interests", graphType: "radial-bar" },
	] as const;

	return (
		<div className="space-y-12">
			<div>
				<h1>{content.heading[locale]}</h1>
				<p className="text-muted-foreground">{content.description[locale]}</p>
			</div>

			{visualisations.map((vis) => {
				const skills = getSkillsByCategory(vis.category);
				const categoryLabel = categoryLabels[vis.category][locale];
				const categoryColor = categoryColors[vis.category];
				// const langLevelLabel = langLevelLabels[vis.name][locale]
				const graphType = vis.graphType;

				return (
					<section key={vis.category} className="space-y-4">
						<div>
							<h2 className="text-2xl font-bold">{categoryLabel}</h2>
						</div>
						<SkillMeter
							skills={skills}
							skillCategory={skills[0].category}
							graphType={graphType}
							categoryColor={categoryColor}
							width={900}
							height={Math.max(300, skills.length * 35 + 100)}
						/>
					</section>
				);
			})}
		</div>
	);
}
