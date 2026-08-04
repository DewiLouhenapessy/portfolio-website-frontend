"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { navLabels } from "@/lib/i18n";
import { useLanguage } from "./LanguageProvider";
import { NavItemProps, NavLink } from "@/components/NavBar";

const adminNavItems: NavLink[] = [
	{ href: "/admin", label: "admin" },
	{ href: "/admin/kanban", label: "kanban" },
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

const AdminNavBar = () => {
	const [mobileOpen, setMobileOpen] = useState(false);
	const { locale } = useLanguage();

	const toggleMobile = () => setMobileOpen((state) => !state);
	const closeMobile = () => setMobileOpen(false);
	return (
		<nav className="rounded-xl dark:rounded-s m-4">
			<button
				className="inline-flex items-center justify-center rounded-lg border border-border/50 bg-background/10 p-2 text-foreground transition hover:bg-background/20 md:hidden"
				onClick={toggleMobile}
				aria-expanded={mobileOpen}
				aria-label={mobileOpen ? "Close menu" : "Open menu"}
			>
				{mobileOpen ? <X size={20} /> : <Menu size={20} />}
			</button>
			<div className="my-5 mx-3 flex flex-col items-end gap-3 rounded-xl border border-white/10 bg-background/40 p-4 shadow-lg backdrop-blur-md md:hidden">
				{adminNavItems.map((item) => (
					<NavItem
						key={item.href}
						href={item.href}
						text={navLabels[item.label][locale]}
						onClick={closeMobile}
					/>
				))}
			</div>
		</nav>
	);
};

export default AdminNavBar;
