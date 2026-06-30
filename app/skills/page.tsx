"use client";

import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { pageContent } from "@/lib/i18n";
import { SkillMeter } from "@/components/SkillMeter";
import {
	categoryLabels,
	categoryColors,
	getSkillsByCategory,
} from "@/lib/skills";

export default function Skills() {
	const { locale } = useLanguage();
	const content = pageContent.skills;
	const [sortType, setSortType] = useState<"original" | "alphabetical">(
		"original",
	);

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
				<button
					onClick={() =>
						setSortType(sortType === "original" ? "alphabetical" : "original")
					}
					className="mt-4 px-4 py-2 rounded-md border border-border bg-card hover:bg-muted transition-colors"
				>
					{sortType === "original"
						? "Sorteren: Origineel"
						: "Sorteren: Alfabetisch"}
				</button>
			</div>

			{visualisations.map((vis) => {
				const skills = getSkillsByCategory(vis.category);
				const categoryLabel = categoryLabels[vis.category][locale];
				const categoryColor = categoryColors[vis.category];
				const graphType = vis.graphType;

				return (
					<section key={vis.category} className="space-y-4">
						<div>
							<h2 className="text-2xl font-bold">{categoryLabel}</h2>
						</div>
						<SkillMeter
							skills={skills}
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
