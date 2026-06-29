export interface Skill {
	name: string;
	level: number; // 0-100
	category: "technology" | "language" | "interests";
}

export const skillsData: Skill[] = [
	// Technologies --> huidige bar graph
	{ name: "JavaScript", level: 70, category: "technology" },
	{ name: "TypeScript", level: 80, category: "technology" },
	{ name: "React", level: 90, category: "technology" },
	{ name: "Vue", level: 75, category: "technology" },
	{ name: "HTML", level: 95, category: "technology" },
	{ name: "CSS", level: 65, category: "technology" },
	{ name: "Tailwind", level: 75, category: "technology" },
	{ name: "Next.js", level: 60, category: "technology" },
	{ name: "PHP", level: 90, category: "technology" },
	{ name: "Node.js", level: 55, category: "technology" },
	{ name: "SQL", level: 90, category: "technology" },
	{ name: "Git", level: 50, category: "technology" },

	// Languages --> bar graph met op de y as fluent (100), good (75), sufficient (50), basic (25)
	{ name: "Nederlands", level: 100, category: "language" },
	{ name: "Engels", level: 95, category: "language" },
	{ name: "Frans", level: 70, category: "language" },
	{ name: "Italiaans", level: 65, category: "language" },
	{ name: "Duits", level: 60, category: "language" },
	{ name: "Indonesisch", level: 40, category: "language" },
	{ name: "Spaans", level: 30, category: "language" },
	{ name: "Portugees", level: 30, category: "language" },

	// Interests --> radial bar with zoom
	{ name: "Yoga", level: 75, category: "interests" },
	{ name: "Pilates", level: 80, category: "interests" },
	{ name: "Wandelen", level: 85, category: "interests" },
	{ name: "Fietsen", level: 82, category: "interests" },
	{ name: "Boulderen", level: 82, category: "interests" },
	{ name: "Hardlopen", level: 82, category: "interests" },
	{ name: "Muziek luisteren", level: 95, category: "interests" },
	{ name: "Muziek maken", level: 95, category: "interests" },
	{ name: "Zingen", level: 95, category: "interests" },
	{ name: "Programmeren", level: 85, category: "interests" },
	{ name: "Naaien", level: 80, category: "interests" },
	{ name: "Lezen", level: 75, category: "interests" },
	{ name: "Comedy/Humor", level: 70, category: "interests" },
];

export const categoryLabels = {
	technology: { nl: "Technologieën", en: "Technologies" },
	language: { nl: "Talen", en: "Languages" },
	interests: { nl: "Interesses", en: "Interests" },
};

export const categoryColors = {
	technology: "var(--skill-technology)",
	language: "var(--skill-language)",
	interests: "var(--skill-interests)",
};

export function getSkillsByCategory(category: Skill["category"]): Skill[] {
	return skillsData.filter((skill) => skill.category === category);
}
