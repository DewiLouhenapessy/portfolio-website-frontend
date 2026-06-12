"use client";

import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

interface NavItemProps {
	text: string;
	href: string;
}

const NavItem = ({ text, href }: NavItemProps) => {
	return (
		<Link className="text-2xl" href={href}>
			{text}
		</Link>
	);
};

const NavBar = () => {
	return (
		<nav className="bg-gradient-theme rounded-b-xl dark:rounded-b-xs text-justify mb-8 flex justify-around flex-wrap items-center gap-4 px-4 py-3">
			<NavItem href="/" text="Home" />
			<NavItem href="/about" text="About Me" />
			<NavItem href="/projects" text="Projects" />
			<NavItem href="/skills" text="Skills" />
			<NavItem href="/quiz" text="Quiz" />
			<NavItem href="/contact" text="Contact" />
			<ThemeToggle />
		</nav>
	);
};

export default NavBar;
