"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { AnimatedText } from "@/components/AnimatedText";
import { TypewriterText } from "@/components/TypewriterText";
import { pageContent } from "@/lib/i18n";

export default function Home() {
	const { locale } = useLanguage();
	const content = pageContent.home;

	return (
		<div>
			<AnimatedText
				as="h1"
				text={content.title[locale]}
				className="text-6xl mb-4 md:text-8xl md:mb-12"
				delay={0}
				duration={0.3}
			/>
			<TypewriterText
				text={content.subtitle[locale]}
				className="ml-2 md:ml-4"
				delay={2.4}
				speed={0.05}
			/>
		</div>
	);
}
