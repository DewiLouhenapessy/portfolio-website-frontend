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
	admin: { nl: "Adminpagina", en: "Admin page" },
	kanban: { nl: "Kanbanbord", en: "Kanban Board" },
};

export const footerLabels = {
	linkedin: { nl: "LinkedIn", en: "LinkedIn" },
	github: { nl: "Github", en: "Github" },
	email: { nl: "E-mail", en: "Email" },
};

export const consoleGreeting = {
	title: { nl: "Hey hallo! 👋", en: "Hi there! 👋" },
	message: {
		nl: "Wat leuk dat je nieuwsgierig bent naar mijn website!",
		en: "Great that you are curious about my website!",
	},
	callToAction: {
		nl: "Als je meer wilt weten over de code die ik schrijf, neem hier dan gerust een kijkje:",
		en: "If you would like to know more about the code I write, feel free to have a look around here:",
	},
};

export const pageContent = {
	home: {
		title: { nl: "Welkom", en: "Welcome" },
		subtitle: {
			nl: "Dit is de portfolio website van Dewi Louhenapessy.",
			en: "This is the portfolio website of Dewi Louhenapessy.",
		},
	},
	about: {
		heading: { nl: "Over mij", en: "About Me" },
		subheading: {
			nl: "Hey hallo! Wat leuk dat je er bent :)",
			en: "Hi there! Great to have you here :)",
		},
		paragraphs: {
			nl: [
				"Mijn naam is Dewi en mijn pad naar webdevelopment is niet de meest rechtlijnige. Ik begon ooit met een studie Algemene Cultuurwetenschappen, studeerde af op archeologisch erfgoed en werkte daarna in de culturele sector, onder andere als planner en producent — werk waarin nauwkeurigheid en betrouwbaarheid vanzelfsprekend waren. Drie jaar geleden was ik echter op zoek naar meer uitdaging – iets waar ik niet snel op uitgeleerd zou zijn.",
				"Een vriend vroeg of programmeren niet iets voor mij zou zijn. Eerlijk gezegd had ik geen idee of ik het leuk zou vinden of er zelfs goed in zou zijn. Toch besloot ik de sprong te wagen en begon aan een programmeer bootcamp van tien weken. En wat een verrassing: ik bleek het fantastisch te vinden! De logica achter code, de creativiteit van design en de voldoening om iets te bouwen dat mensen daadwerkelijk gebruiken – het bleek een uitstekende match te zijn.",
				"Ik ben altijd op zoek naar manieren waarop ik mezelf kan uitdagen om mijn grenzen te verleggen en nieuwe dingen te leren. Of het nu gaat om het leren van een nieuwe programmeertaal, het ontdekken van een handige JavaScript-truc of een slimme CSS-oplossing: ik ben gedreven en vastberaden om mezelf steeds verder te ontwikkelen.",
				"Deze nieuwsgierige en leergierige aard komt ook in andere aspecten van mijn leven terug. Zo leer ik graag nieuwe talen, vind ik het leuk om onbekende plekken en culturen te ontdekken en ben ik vorig jaar voor het eerst gaan snowboarden. Daarnaast worden bestaande interesses ook onderhouden en verder ontwikkeld, zoals sporten, muziek en andere hobby's. Maar er is uiteraard ook altijd ruimte om te ontspannen, waarbij een gezellige borrel met vrienden natuurlijk niet mag ontbreken!",
			],
			en: [
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
			nl: "Een overzicht van mijn projecten.",
			en: "An overview of my projects.",
		},
		featuredHeading: {
			nl: "Uitgelichte projecten",
			en: "Featured projects",
		},
		featured: {
			nl: [
				{
					name: "Control Room Search",
					subtitle: "Datapipeline in C#",
					status: "In ontwikkeling",
					description:
						"Oefenproject om C# te leren en te ontdekken hoe een datapipeline in elkaar zit. De pipeline leest open politiedata over geregistreerde overlast uit CBS StatLine in en zet de brede tabel om naar één record per regio, soort overlast en periode, met een eigen domeinmodel.",
					highlights: [
						"Elk record blijft herleidbaar tot het bronbestand en de bronregel.",
						"Volgende stappen: validatie met een foutrapport, opslag in PostgreSQL, indexering in Elasticsearch en een Docker Compose-opzet.",
					],
					technologies: ["C#", ".NET", "CsvHelper"],
					links: [
						{
							label: "Bekijk code",
							url: "https://github.com/DewiLouhenapessy/control-room-search",
						},
					],
				},
				{
					name: "VacAnalyser",
					subtitle: "RAG-tool voor vacature-matching",
					description:
						"Python-tool die je cv en een vacaturetekst vergelijkt en een match-score geeft, gebouwd met de Mistral API, Pydantic en embeddings. Je ziet direct hoe goed en waarom een vacature bij je profiel past.",
					highlights: [
						"Uitgebreid met de mogelijkheid om bij een goede match aanvullend een motivatiebrief te uploaden. Die wordt dan meegenomen in de vergelijking, waarna de tool aanvullende tips geeft om de brief te verbeteren.",
					],
					technologies: ["Python", "Mistral API", "Pydantic", "Embeddings"],
					links: [
						{
							label: "Bekijk code",
							url: "https://github.com/DewiLouhenapessy/vacanalyser",
						},
					],
				},
				{
					name: "Portfolio Admin & Kanbanbord",
					subtitle: "Beheeromgeving met een interactief Kanbanbord",
					status: "In ontwikkeling",
					description:
						"Een beveiligde adminomgeving voor het beheren van een Kanbanbord. Maak kolommen en kaarten aan, verwijder ze of verplaats kaarten via drag-and-drop of de keuzelijst. De Next.js-frontend communiceert met een Laravel-API; wijzigingen worden opgeslagen in de database.",
					highlights: [
						"Inloggen met sessie-authenticatie via Laravel Sanctum en httpOnly-cookies.",
						"De frontend en API zijn afzonderlijke projecten.",
					],
					technologies: [
						"PHP",
						"Laravel",
						"Sanctum",
						"MySQL",
						"Next.js",
						"React",
						"TypeScript",
					],
					links: [
						{
							label: "Bekijk frontend",
							url: "https://github.com/DewiLouhenapessy/portfolio-website-frontend",
						},
						{
							label: "Bekijk backend",
							url: "https://github.com/DewiLouhenapessy/portfolio-website-backend",
						},
					],
				},
			],
			en: [
				{
					name: "Control Room Search",
					subtitle: "Data pipeline in C#",
					status: "In development",
					description:
						"A practice project for learning C# and exploring how a data pipeline works. It reads open police data on registered nuisance from CBS StatLine and transforms the wide table into one record per region, type of nuisance, and period, using a custom domain model.",
					highlights: [
						"Each record remains traceable to its source file and source row.",
						"Next steps: validation with an error report, PostgreSQL storage, Elasticsearch indexing, and a Docker Compose setup.",
					],
					technologies: ["C#", ".NET", "CsvHelper"],
					links: [
						{
							label: "View code",
							url: "https://github.com/DewiLouhenapessy/control-room-search",
						},
					],
				},
				{
					name: "VacAnalyser",
					subtitle: "RAG tool for job matching",
					description:
						"A Python tool that compares your CV with a job description and provides a match score, built with the Mistral API, Pydantic, and embeddings. It immediately shows how well—and why—a role matches your profile.",
					highlights: [
						"When there is a good match, you can also upload your cover letter. The tool includes it in the comparison and then offers additional suggestions for improving it.",
					],
					technologies: ["Python", "Mistral API", "Pydantic", "Embeddings"],
					links: [
						{
							label: "View code",
							url: "https://github.com/DewiLouhenapessy/vacanalyser",
						},
					],
				},
				{
					name: "Portfolio Admin & Kanban Board",
					subtitle: "Admin area with an interactive kanban board",
					status: "In development",
					description:
						"A protected admin area for managing a kanban board. Create and delete columns and cards, or move cards with drag-and-drop or the selector. The Next.js frontend communicates with a Laravel API, and changes are stored in the database.",
					highlights: [
						"Sign-in uses Laravel Sanctum session authentication with httpOnly cookies.",
						"The frontend and API are separate projects.",
					],
					technologies: [
						"PHP",
						"Laravel",
						"Sanctum",
						"MySQL",
						"Next.js",
						"React",
						"TypeScript",
					],
					links: [
						{
							label: "View frontend",
							url: "https://github.com/DewiLouhenapessy/portfolio-website-frontend",
						},
						{
							label: "View backend",
							url: "https://github.com/DewiLouhenapessy/portfolio-website-backend",
						},
					],
				},
			],
		},
		project: {
			nl: "Nog te ontwikkelen:",
			en: "To be developed:",
		},
		items: {
			nl: [
				"Implementatie van Canvas UI componenten in portfolio website",
				"Awesome Three.js landingspagina",
			],
			en: [
				"Implementation of Canvas UI components in portfolio website",
				"Awesome Three.js landing page",
			],
		},
	},
	skills: {
		heading: { nl: "Vaardigheden", en: "Skills" },
		description: {
			nl: "Een beknopt overzicht van mijn kennis en interesses.",
			en: "A concise overview of my knowledge and interests.",
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
			nl: "Stuur me gerust een bericht als je vragen hebt, in contact wilt komen of gewoon hoi wilt zeggen!",
			en: "Feel free to send me a message if you have any questions, would like to get in touch or just want to say hi!",
		},
		formLabels: {
			name: { nl: "Naam", en: "Name" },
			email: { nl: "E-mail", en: "Email" },
			subject: { nl: "Onderwerp", en: "Subject" },
			message: { nl: "Bericht", en: "Message" },
			password: { nl: "Wachtwoord", en: "Password" },
			submit: { nl: "Verstuur", en: "Send" },
			sending: { nl: "Aan het verzenden...", en: "Sending..." },
			success: { nl: "Bericht verzonden!", en: "Message sent!" },
			error: { nl: "Er is een fout opgetreden.", en: "An error occurred." },
		},
	},
	admin: {
		login: {
			email: { nl: "E-mail", en: "Email" },
			password: { nl: "Wachtwoord", en: "Password" },
			submit: { nl: "Inloggen", en: "Log in" },
			submitting: { nl: "Inlogt...", en: "Logging in..." },
			invalidCredentials: {
				nl: "E-mailadres of wachtwoord is onjuist.",
				en: "Email or password is incorrect.",
			},
			genericError: {
				nl: "Er is een fout opgetreden tijdens het inloggen.",
				en: "An error occurred while logging in.",
			},
			loginFailed: { nl: "Admin login mislukt", en: "Admin login failed" },
		},
		layout: {
			loading: { nl: "Bezig met laden...", en: "Loading..." },
			loggedInAs: { nl: "Ingelogd als {email}", en: "Logged in as {email}" },
			logout: { nl: "Uitloggen", en: "Log out" },
		},
		page: {
			loading: { nl: "Bezig met laden...", en: "Loading..." },
			heading: { nl: "Adminpagina", en: "Admin page" },
			loginTitle: { nl: "Inloggen", en: "Log in" },
			welcomeTitle: { nl: "Welkom admin", en: "Welcome admin" },
			welcomeDescription: {
				nl: "Navigeer links naar de gewenste pagina.",
				en: "Navigate to the page you want.",
			},
		},
		kanban: {
			heading: { nl: "Admin / Kanban", en: "Admin / Kanban" },
			title: { nl: "Kanbanbord", en: "Kanban board" },
			description: {
				nl: "Beheer je kolommen en kaarten en sleep kaarten naar een andere kolom.",
				en: "Manage your columns and cards, and drag cards into another column.",
			},
			loading: { nl: "Kanbanbord laden...", en: "Loading kanban board..." },
			loadingError: {
				nl: "Het Kanbanbord kon niet worden geladen.",
				en: "Could not load the kanban board.",
			},
			refreshFailed: {
				nl: "Je wijzigingen zijn opgeslagen, maar het bord kon niet opnieuw worden geladen.",
				en: "Your changes were saved, but the board could not be refreshed.",
			},
			retry: { nl: "Opnieuw proberen", en: "Try again" },
			addColumn: { nl: "Kolom toevoegen", en: "Add column" },
			columnPlaceholder: {
				nl: "Nieuwe kolom",
				en: "New column",
			},
			addCard: { nl: "Kaart toevoegen", en: "Add card" },
			cardTitlePlaceholder: {
				nl: "Titel van de kaart",
				en: "Card title",
			},
			cardDescriptionPlaceholder: {
				nl: "Omschrijving (optioneel)",
				en: "Description (optional)",
			},
			deleteColumn: { nl: "Kolom verwijderen", en: "Delete column" },
			deleteCard: { nl: "Kaart verwijderen", en: "Delete card" },
			confirmDeleteColumn: {
				nl: 'Weet je zeker dat je de kolom "{column}" en alle kaarten erin wilt verwijderen? Dit kan niet ongedaan worden gemaakt.',
				en: 'Are you sure you want to delete the "{column}" column and all of its cards? This cannot be undone.',
			},
			confirmDeleteCard: {
				nl: 'Weet je zeker dat je de kaart "{card}" wilt verwijderen?',
				en: 'Are you sure you want to delete the "{card}" card?',
			},
			emptyColumn: {
				nl: "Sleep hier een kaart naartoe of maak een nieuwe kaart.",
				en: "Drop a card here or create a new card.",
			},
			emptyBoard: {
				nl: "Maak een kolom aan om met je Kanbanbord te beginnen.",
				en: "Create a column to get started with your kanban board.",
			},
			moveCard: {
				nl: "Verplaats kaart naar een andere kolom",
				en: "Move card to another column",
			},
			columnFormLabel: {
				nl: "Naam nieuwe kolom",
				en: "New column name",
			},
			cardTitleLabel: {
				nl: "Kaarttitel",
				en: "Card title",
			},
			cardDescriptionLabel: {
				nl: "Kaartomschrijving",
				en: "Card description",
			},
			changesFailed: {
				nl: "Je wijzigingen konden niet worden opgeslagen.",
				en: "Your changes could not be saved.",
			},
		},
	},
};
