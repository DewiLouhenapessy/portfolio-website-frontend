export interface Skill {
	name: string;
	level: number; // 0-100
	category: "technology" | "language" | "sport" | "hobby";
}

export const skillsData: Skill[] = [
	// Technologies
	{ name: "JavaScript", level: 90, category: "technology" },
	{ name: "TypeScript", level: 85, category: "technology" },
	{ name: "React", level: 88, category: "technology" },
	{ name: "Vue", level: 80, category: "technology" },
	{ name: "HTML", level: 95, category: "technology" },
	{ name: "CSS", level: 92, category: "technology" },
	{ name: "Tailwind", level: 90, category: "technology" },
	{ name: "Next.js", level: 85, category: "technology" },
	{ name: "PHP", level: 75, category: "technology" },
	{ name: "Node.js", level: 80, category: "technology" },
	{ name: "SQL", level: 78, category: "technology" },
	{ name: "Git", level: 85, category: "technology" },

	// Languages
	{ name: "Nederlands", level: 100, category: "language" },
	{ name: "Engels", level: 90, category: "language" },
	{ name: "Duits", level: 70, category: "language" },
	{ name: "Frans", level: 60, category: "language" },

	// Sports
	{ name: "Voetbal", level: 75, category: "sport" },
	{ name: "Hardlopen", level: 80, category: "sport" },
	{ name: "Zwemmen", level: 85, category: "sport" },
	{ name: "Fitness", level: 82, category: "sport" },

	// Hobbies
	{ name: "Programmeren", level: 95, category: "hobby" },
	{ name: "Gaming", level: 85, category: "hobby" },
	{ name: "Lezen", level: 80, category: "hobby" },
	{ name: "Fotografie", level: 75, category: "hobby" },
	{ name: "Muziek", level: 70, category: "hobby" },
];

export const categoryLabels = {
	technology: { nl: "Technologieën", en: "Technologies" },
	language: { nl: "Talen", en: "Languages" },
	sport: { nl: "Sporten", en: "Sports" },
	hobby: { nl: "Hobby's", en: "Hobbies" },
};

export const categoryColors = {
	technology: "#3b82f6", // blue
	language: "#10b981", // emerald
	sport: "#f59e0b", // amber
	hobby: "#8b5cf6", // violet
};

export function getSkillsByCategory(category: Skill["category"]): Skill[] {
	return skillsData.filter((skill) => skill.category === category);
}
