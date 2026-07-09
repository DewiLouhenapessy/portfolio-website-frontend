import type { Config } from "tailwindcss";

const config: Config = {
	content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
	darkMode: "class",
	theme: {
		extend: {
			fontFamily: {
				corbel: "'Corbel', 'Corbel New', 'URW Gothic', 'Gill Sans Nova', sans-serif",
			},
		},
	},
	plugins: [],
};

export default config;
