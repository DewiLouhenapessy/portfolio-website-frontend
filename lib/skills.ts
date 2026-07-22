import { Locale } from "./i18n";

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
	{ name: "GitHub", level: 50, category: "technology" },
	{ name: "GitLab", level: 50, category: "technology" },

	// Languages --> bar graph met op de y as fluent (100), good (75), sufficient (50), basic (25)
	{ name: "NL", level: 100, category: "language" },
	{ name: "EN", level: 95, category: "language" },
	{ name: "FR", level: 65, category: "language" },
	{ name: "IT", level: 65, category: "language" },
	{ name: "DE", level: 50, category: "language" },
	{ name: "ES", level: 35, category: "language" },
	{ name: "PO", level: 35, category: "language" },
	{ name: "ID", level: 35, category: "language" },

	// Interests --> radial bar with zoom
	{ name: "yoga", level: 13, category: "interests" },
	{ name: "pilates", level: 7, category: "interests" },
	{ name: "walk", level: 11, category: "interests" },
	{ name: "cycle", level: 6, category: "interests" },
	{ name: "boulder", level: 1, category: "interests" },
	{ name: "run", level: 3, category: "interests" },
	{ name: "listenMusic", level: 14, category: "interests" },
	{ name: "makeMusic", level: 5, category: "interests" },
	{ name: "sing", level: 10, category: "interests" },
	{ name: "program", level: 12, category: "interests" },
	{ name: "sew", level: 2, category: "interests" },
	{ name: "read", level: 4, category: "interests" },
	{ name: "travel", level: 9, category: "interests" },
	{ name: "humor", level: 8, category: "interests" },
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

export const langLevelLabels = {
	fluent: { nl: "Vloeiend", en: "Fluent" },
	good: { nl: "Goed", en: "Good" },
	sufficient: { nl: "Voldoende", en: "Sufficient" },
	basic: { nl: "Basis", en: "Basic" },
};

export const interestsLabels = {
	yoga: { nl: "Yoga", en: "Yoga" },
	pilates: { nl: "Pilates", en: "Pilates" },
	walk: { nl: "Wandelen", en: "Walking/Hiking" },
	cycle: { nl: "Fietsen", en: "Cycling" },
	boulder: { nl: "Boulderen", en: "Bouldering" },
	run: { nl: "Hardlopen", en: "Running" },
	listenMusic: { nl: "Muziek luisteren", en: "Listening to music" },
	makeMusic: { nl: "Muziek maken", en: "Making music" },
	sing: { nl: "Zingen", en: "Singing" },
	program: { nl: "Programmeren", en: "Programming" },
	sew: { nl: "Naaien", en: "Sewing" },
	read: { nl: "Lezen", en: "Reading" },
	travel: { nl: "Reizen", en: "Traveling" },
	humor: { nl: "Comedy/humor", en: "Comedy/humor" },
};

export function getSkillsByCategory(category: Skill["category"]): Skill[] {
	return skillsData.filter((skill) => skill.category === category);
}

export function getLangLevelLabels() {
	return "";
}

export function getLocalizedSubLabel(
	name: string,
	labels: Record<string, { nl: string; en: string }>,
	locale: Locale,
): string {
	return labels[name]?.[locale] ?? name;
}
