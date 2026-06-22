"use client";

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

	const categories = ["technology", "language", "sport", "hobby"] as const;

	return (
		<div className="space-y-12">
			<div>
				<h1>{content.heading[locale]}</h1>
				<p className="text-muted-foreground">{content.description[locale]}</p>
			</div>

			{categories.map((category) => {
				const skills = getSkillsByCategory(category);
				const categoryLabel = categoryLabels[category][locale];
				const categoryColor = categoryColors[category];

				return (
					<section key={category} className="space-y-4">
						<div>
							<h2 className="text-2xl font-bold">{categoryLabel}</h2>
							<p className="text-sm text-muted-foreground">
								{skills.length}{" "}
								{locale === "nl" ? "vaardigheden" : "skills"}
							</p>
						</div>
						<SkillMeter
							skills={skills}
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
