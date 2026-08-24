"use client";
import { useEffect } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { consoleGreeting } from "@/lib/i18n";

export default function ConsoleGreeting() {
	const { locale } = useLanguage();

	useEffect(() => {
		console.log(
			`%c${consoleGreeting.title[locale]}\n\n%c${consoleGreeting.message[locale]}\n\n${consoleGreeting.callToAction[locale]}\n\nhttps://github.com/DewiLouhenapessy`,
			"color: #6366f1; font-size: 20px; font-weight: bold;",
			"color: #a1a1aa; font-size: 14px;",
		);
	}, [locale]);

	return null;
}
