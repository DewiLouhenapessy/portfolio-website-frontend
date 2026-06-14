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
			className="text-2xl md:text-base hover:underline"
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

// nog herschrijven:
// - uitlijning navitems vanaf md klopt niet meer
// - in mobile themetoggle buiten menu plaatsen
// - misschien twee aparte html maken en return ternary statement die twee functies kan returnen

const NavBar = () => {
	const [mobileOpen, setMobileOpen] = useState(false);

	const toggleMobile = () => setMobileOpen((state) => !state);
	const closeMobile = () => setMobileOpen(false);

	return (
		<nav className="bg-gradient-theme rounded-b-xl dark:rounded-b-xs mb-8 px-4 py-3">
			<div className="flex items-center justify-between gap-4">
				<div className="hidden gap-4 md:flex items-center justify-between">
					{navItems.map((item) => (
						<NavItem key={item.href} href={item.href} text={item.text} />
					))}
					<ThemeToggle />
				</div>

				<button
					className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/10 p-2 text-white transition hover:bg-white/20 md:hidden"
					onClick={toggleMobile}
					aria-expanded={mobileOpen}
					aria-label={mobileOpen ? "Close menu" : "Open menu"}
				>
					{mobileOpen ? <X size={20} /> : <Menu size={20} />}
				</button>
			</div>

			{/* {mobileOpen ? (
				<div className="mt-4 flex flex-col gap-3 rounded-2xl border border-white/10 bg-background/95 p-4 shadow-lg backdrop-blur-md md:hidden">
					{navItems.map((item) => (
						<NavItem
							key={item.href}
							href={item.href}
							text={item.text}
							onClick={closeMobile}
						/>
					))}
					<ThemeToggle />
				</div>
			) : null} */}
		</nav>
	);
};

export default NavBar;
