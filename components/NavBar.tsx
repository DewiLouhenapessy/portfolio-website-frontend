"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { useLanguage } from "./LanguageProvider";
import { navLabels } from "@/lib/i18n";

interface NavItemProps {
	text: string;
	href: string;
	onClick?: () => void;
}
interface NavLink {
	href: string;
	label: keyof typeof navLabels;
}
const navItems: NavLink[] = [
	{ href: "/", label: "home" },
	{ href: "/about", label: "about" },
	{ href: "/skills", label: "skills" },
	// { href: "/projects", label: "projects" },
	// { href: "/quiz", label: "quiz" },
	{ href: "/contact", label: "contact" },
];

const NavItem = ({ text, href, onClick }: NavItemProps) => {
	return (
		<Link
			className="text-xl text-foreground transition hover:-translate-x-1"
			href={href}
			onClick={onClick}
		>
			{text}
		</Link>
	);
};

const NavBar = () => {
	const [mobileOpen, setMobileOpen] = useState(false);
	const { locale } = useLanguage();

	const toggleMobile = () => setMobileOpen((state) => !state);
	const closeMobile = () => setMobileOpen(false);

	return (
		<nav className="bg-gradient-theme rounded-b-xl dark:rounded-b-s mb-8 px-4 py-3">
			<div className="flex items-center justify-between gap-4">
				<div className="gap-4">
					<Link className="text-2xl font-semibold md:text-3xl" href="/">
						DL
					</Link>
				</div>
				<div className="flex justify-between gap-4">
					<div className="hidden items-center justify-between gap-8 md:flex">
						{navItems.map((item) => (
							<NavItem
								key={item.href}
								href={item.href}
								text={navLabels[item.label][locale]}
							/>
						))}
					</div>
					<LanguageToggle />
					<ThemeToggle />
					<button
						className="inline-flex items-center justify-center rounded-lg border border-border/50 bg-background/10 p-2 text-foreground transition hover:bg-background/20 md:hidden"
						onClick={toggleMobile}
						aria-expanded={mobileOpen}
						aria-label={mobileOpen ? "Close menu" : "Open menu"}
					>
						{mobileOpen ? <X size={20} /> : <Menu size={20} />}
					</button>
				</div>
			</div>
			{mobileOpen ? (
				<div className="my-5 mx-3 flex flex-col items-end gap-3 rounded-xl border border-white/10 bg-background/40 p-4 shadow-lg backdrop-blur-md md:hidden">
					{navItems.map((item) => (
						<NavItem
							key={item.href}
							href={item.href}
							text={navLabels[item.label][locale]}
							onClick={closeMobile}
						/>
					))}
				</div>
			) : null}
		</nav>
	);
};

export default NavBar;
