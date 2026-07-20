"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { pageContent } from "@/lib/i18n";
import ContactForm from "@/components/ContactForm";

export default function Contact() {
	const { locale } = useLanguage();
	const content = pageContent.contact;

	return (
		<div className="space-y-8">
			<div>
				<h1 className="mb-4">{content.heading[locale]}</h1>
				<p className="text-gray-600 dark:text-gray-300">
					{content.details[locale]}
				</p>
			</div>
			<ContactForm />
		</div>
	);
}
