import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	i18n: {
		locales: ["nl", "en"],
		defaultLocale: "nl",
		localeDetection: false,
		domains: [
			{
				domain: "project-name.nl",
				defaultLocale: "nl",
			},
			{
				domain: "project-name.com",
				defaultLocale: "en",
			},
		],
	},
};

export default nextConfig;
