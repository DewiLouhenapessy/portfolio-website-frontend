"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageProvider";
import { footerLabels } from "@/lib/i18n";

const Footer = () => {
	const { locale } = useLanguage();

	interface FooterItemProps {
		text: string;
		href: string;
		onClick?: () => void;
	}

	const FooterItem = ({ text, href, onClick }: FooterItemProps) => {
		return (
			<Link
				className="text-l text-foreground transition hover:-translate-x-0.5"
				href={href}
				onClick={onClick}
			>
				{text}
			</Link>
		);
	};

	const footerItems: Array<{
		href: string;
		label: keyof typeof footerLabels;
	}> = [
		{
			href: "https://www.linkedin.com/in/dewi-louhenapessy-8b0894146/",
			label: "linkedin",
		},
		{ href: "https://github.com/DewiLouhenapessy", label: "github" },
		{ href: "mailto:info@dewilouhenapessy.nl", label: "email" },
	];

	return (
		<footer className="bg-gradient-theme rounded-t-xl dark:rounded-t-xs text-justify flex flex-col items-center justify-around gap-3 px-4 py-3 bottom-0 mt-8 md:flex-row">
			{footerItems.map((item) => (
				<FooterItem
					key={item.href}
					href={item.href}
					text={footerLabels[item.label][locale]}
				/>
			))}
		</footer>
	);
};

export default Footer;
