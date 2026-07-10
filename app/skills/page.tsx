"use client";

import { useState } from "react";
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

export default function Skills() {
	const { locale } = useLanguage();
	const [visibleSection, setVisibleSection] = useState(0);
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

			{visualisations.map((vis, index) => {
				const skills = getSkillsByCategory(vis.category);
				const categoryLabel = categoryLabels[vis.category][locale];
				const categoryColor = categoryColors[vis.category];
				// const langLevelLabel = langLevelLabels[vis.name][locale]
				const graphType = vis.graphType;
				const isVisible = index <= visibleSection;

				return (
					<section key={vis.category} className="space-y-4">
						<div>
							<h2 className="text-2xl font-bold">{categoryLabel}</h2>
						</div>
						{isVisible ? (
							<SkillMeter
								skills={skills}
								skillCategory={skills[0].category}
								graphType={graphType}
								categoryColor={categoryColor}
								width={900}
								height={Math.max(300, skills.length * 35 + 100)}
								onReady={() => {
									if (index === visibleSection) {
										setVisibleSection((prev) => prev + 1);
									}
								}}
							/>
						) : (
							<div
								className="rounded-lg border border-dashed border-border/60 bg-muted/20"
								style={{ minHeight: Math.max(300, skills.length * 35 + 100) }}
							/>
						)}
					</section>
				);
			})}
		</div>
	);
}
