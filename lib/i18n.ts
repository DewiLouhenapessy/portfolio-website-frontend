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
				"Hey hallo! Wat leuk dat je er bent :)",
				"Mijn naam is Dewi en mijn pad naar webdevelopment is niet de meest rechtlijnige. Ik begon ooit met een studie Algemene Cultuurwetenschappen, studeerde af op archeologisch erfgoed en werkte daarna in de culturele sector, onder andere als planner en producent — werk waarin nauwkeurigheid en betrouwbaarheid vanzelfsprekend waren. Drie jaar geleden was ik echter op zoek naar meer uitdaging – iets waar ik niet snel op uitgeleerd zou zijn.",
				"Een vriend vroeg of programmeren niet iets voor mij zou zijn. Eerlijk gezegd had ik geen idee of ik het leuk zou vinden of er zelfs goed in zou zijn. Toch besloot ik de sprong te wagen en begon aan een programmeer bootcamp van tien weken. En wat een verrassing: ik bleek het fantastisch te vinden! De logica achter code, de creativiteit van design en de voldoening om iets te bouwen dat mensen daadwerkelijk gebruiken – het bleek een uitstekende match te zijn.",
				"Ik ben altijd op zoek naar manieren waarop ik mezelf kan uitdagen om mijn grenzen te verleggen en nieuwe dingen te leren. Of het nu gaat om het leren van een nieuwe programmeertaal, het ontdekken van een handige JavaScript-truc of een slimme CSS-oplossing: ik ben gedreven en vastberaden om mezelf steeds verder te ontwikkelen.",
				"Deze nieuwsgierige en leergierige aard komt ook in andere aspecten van mijn leven terug. Zo leer ik graag nieuwe talen, vind ik het leuk om onbekende plekken en culturen te ontdekken en ben ik vorig jaar voor het eerst gaan snowboarden. Daarnaast worden bestaande interesses ook onderhouden en verder ontwikkeld, zoals sporten, muziek en andere hobby's. Maar er is uiteraard ook altijd ruimte om te ontspannen, waarbij een gezellige borrel met vrienden natuurlijk niet mag ontbreken!",
			],
			en: [
				"Hey there! Great to have you here :)",
				"My name is Dewi, and my path to web development hasn't been the most straightforward. I started out with a degree in Cultural Studies, graduated with a specialisation in archaeological heritage, and then worked in the cultural sector, among other things as a planner and producer — work in which precision and reliability were second nature. Three years ago, however, I found myself looking for more of a challenge – something I wouldn't master too quickly.",
				"A friend of mine asked whether programming might be something for me. Honestly, I had no idea whether I'd enjoy it, or even be any good at it. Still, I decided to take the leap and started a ten-week coding bootcamp. And to my amazement it turned out I loved it! The logic behind code, the creativity of design, and the satisfaction of building something people actually use – it proved to be an excellent match.",
				"I'm always looking for ways to challenge myself, push my limits, and learn new things. Whether it's picking up a new programming language, discovering a useful JavaScript trick, or finding a clever CSS solution: I'm driven and determined to keep developing myself (pun unintended).",
				"This curious and eager-to-learn nature also shows up in other areas of my life. I enjoy learning new languages, love discovering unfamiliar places and cultures, and went snowboarding for the first time last year. At the same time, I keep nurturing and developing existing interests, such as sports, music, and other hobbies. But of course, there's always room to unwind too, and a fun drink with friends is never far away!",
			],
		},
	},
	projects: {
		heading: { nl: "Projecten", en: "Projects" },
		description: {
			nl: "Een overzicht van mijn werk en projecten.",
			en: "An overview of my work and projects.",
		},
		project: { nl: "Binnenkort beschikbaar", en: "Coming soon" },
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
		formLabels: {
			name: { nl: "Naam", en: "Name" },
			email: { nl: "E-mail", en: "Email" },
			subject: { nl: "Onderwerp", en: "Subject" },
			message: { nl: "Bericht", en: "Message" },
			submit: { nl: "Verstuur", en: "Send" },
			sending: { nl: "Verzendt...", en: "Sending..." },
			success: { nl: "Bericht verzonden!", en: "Message sent!" },
			error: { nl: "Er is een fout opgetreden.", en: "An error occurred." },
		},
	},
};
