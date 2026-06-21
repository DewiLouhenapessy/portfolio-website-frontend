export type Locale = "nl" | "en";
export const locales: Locale[] = ["nl", "en"];
export const defaultLocale: Locale = "nl";

export const navLabels = {
	home: { nl: "Start", en: "Home" },
	about: { nl: "Over mij", en: "About Me" },
	projects: { nl: "Projecten", en: "Projects" },
	skills: { nl: "Vaardigheden", en: "Skills" },
	quiz: { nl: "Quiz", en: "Quiz" },
	contact: { nl: "Contact", en: "Contact" },
};

export const footerLabels = {
	linkedin: { nl: "LinkedIn", en: "LinkedIn" },
	github: { nl: "Github", en: "Github" },
	email: { nl: "E-mail", en: "Email" },
};

export const pageContent = {
	home: {
		title: { nl: "Welkom", en: "Welcome" },
		subtitle: {
			nl: "Dit is de portfolio website van Dewi.",
			en: "This is Dewi's portfolio website.",
		},
	},
	about: {
		heading: { nl: "Over mij", en: "About Me" },
		paragraphs: {
			nl: [
				"In dit gedeelte vertel ik meer over mij.",
				"Ik ben een enthousiaste developer met een passie voor het bouwen van indrukwekkende webtoepassingen.",
				"Met een achtergrond in softwareontwikkeling en een sterke interesse in frontend-technologieën, ben ik altijd op zoek naar nieuwe uitdagingen en kansen om mijn vaardigheden te verbeteren.",
				"Buiten het coderen ben ik ook geïnteresseerd in design en gebruikerservaring, wat me helpt bij het creëren van aantrekkelijke en gebruiksvriendelijke interfaces.",
				"Ik geloof in de kracht van samenwerking en ben altijd bereid om te leren van anderen en mijn kennis te delen.",
				"Ik kijk ernaar uit om mijn vaardigheden verder te ontwikkelen en bij te dragen aan innovatieve projecten in de toekomst.",
			],
			en: [
				"In this section I share more about myself.",
				"I am an enthusiastic developer with a passion for building impressive web applications.",
				"With a background in software development and a strong interest in frontend technologies, I am always looking for new challenges and opportunities to improve my skills.",
				"Outside of coding, I am also interested in design and user experience, which helps me create attractive and user-friendly interfaces.",
				"I believe in the power of collaboration and am always ready to learn from others and share my knowledge.",
				"I look forward to continuing to develop my skills and contributing to innovative projects in the future.",
			],
		},
	},
	projects: {
		heading: { nl: "Projecten", en: "Projects" },
		description: {
			nl: "Een overzicht van mijn werk en projecten.",
			en: "An overview of my work and projects.",
		},
	},
	skills: {
		heading: { nl: "Vaardigheden", en: "Skills" },
		description: {
			nl: "Een korte lijst met technologieën en tools die ik gebruik.",
			en: "A short list of technologies and tools I use.",
		},
	},
	quiz: {
		heading: { nl: "Quiz", en: "Quiz" },
		description: {
			nl: "Een leuke kleine quiz om jezelf uit te dagen.",
			en: "A fun little quiz to challenge yourself.",
		},
	},
	contact: {
		heading: { nl: "Contact", en: "Contact" },
		details: {
			nl: "Stuur me gerust een bericht als je wilt samenwerken of vragen hebt.",
			en: "Feel free to send me a message if you'd like to collaborate or have questions.",
		},
	},
};
