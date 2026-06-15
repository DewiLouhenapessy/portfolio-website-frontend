"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

interface NavItemProps {
	text: string;
	href: string;
	onClick?: () => void;
}

const NavItem = ({ text, href, onClick }: NavItemProps) => {
	return (
		<Link
			className="text-2xl text-foreground md:text-base hover:text-accent transition-colors"
			href={href}
			onClick={onClick}
		>
			{text}
		</Link>
	);
};

const navItems = [
	{ href: "/", text: "Home" },
	{ href: "/about", text: "About Me" },
	{ href: "/projects", text: "Projects" },
	{ href: "/skills", text: "Skills" },
	{ href: "/quiz", text: "Quiz" },
	{ href: "/contact", text: "Contact" },
];

const NavBar = () => {
	const [mobileOpen, setMobileOpen] = useState(false);

	const toggleMobile = () => setMobileOpen((state) => !state);
	const closeMobile = () => setMobileOpen(false);

	return (
		<nav className="bg-gradient-theme rounded-b-xl dark:rounded-b-xs mb-8 px-4 py-3">
			<div className="flex items-center justify-between gap-4">
				<div className="gap-4">
					<Link className="text-2xl font-semibold md:text-3xl" href="/">
						DL
					</Link>
				</div>
				<div className="md:flex justify-between gap-4">
					<div className="hidden items-center justify-between gap-8 md:flex">
						{navItems.map((item) => (
							<NavItem key={item.href} href={item.href} text={item.text} />
						))}
					</div>

					<button
						className="inline-flex items-center justify-center rounded-lg border border-border bg-background/10 p-2 text-foreground transition hover:bg-background/20 mr-2 md:hidden"
						onClick={toggleMobile}
						aria-expanded={mobileOpen}
						aria-label={mobileOpen ? "Close menu" : "Open menu"}
					>
						{mobileOpen ? <X size={20} /> : <Menu size={20} />}
					</button>
					<ThemeToggle />
				</div>
			</div>
			{mobileOpen ? (
				<div className="mt-4 flex flex-col items-end gap-3 rounded-2xl border border-white/10 bg-background/95 p-4 shadow-lg backdrop-blur-md md:hidden">
					{navItems.map((item) => (
						<NavItem
							key={item.href}
							href={item.href}
							text={item.text}
							onClick={closeMobile}
						/>
					))}
				</div>
			) : null}
		</nav>
	);
};

export default NavBar;
