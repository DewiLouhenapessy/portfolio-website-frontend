"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Menu, PanelsTopLeft, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { navLabels } from "@/lib/i18n";
import { useLanguage } from "./LanguageProvider";
import { NavItemProps, NavLink } from "@/components/NavBar";

interface AdminNavItemProps extends NavItemProps {
	icon: LucideIcon;
	active?: boolean;
}

const adminNavItems: Array<NavLink & { icon: LucideIcon }> = [
	{ href: "/admin", label: "admin", icon: Home },
	{ href: "/admin/kanban", label: "kanban", icon: PanelsTopLeft },
];

const AdminNavItem = ({
	text,
	href,
	icon: Icon,
	active = false,
	onClick,
}: AdminNavItemProps) => {
	return (
		<Link
			className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 ${
				active
					? "bg-primary/10 text-primary shadow-sm"
					: "text-foreground/80 hover:bg-background/70 hover:text-foreground"
			}`}
			href={href}
			onClick={onClick}
		>
			<span
				className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border/40 bg-background/80 shadow-sm ${
					active ? "text-primary" : "text-foreground/80"
				}`}
			>
				<Icon size={18} />
			</span>
			<span className="overflow-hidden whitespace-nowrap text-sm font-medium transition-all duration-300 md:max-w-0 md:opacity-0 md:group-hover:max-w-40 md:group-hover:opacity-100">
				{text}
			</span>
		</Link>
	);
};

const AdminNavBar = () => {
	const [mobileOpen, setMobileOpen] = useState(false);
	const pathname = usePathname();
	const { locale } = useLanguage();

	const toggleMobile = () => setMobileOpen((state) => !state);
	const closeMobile = () => setMobileOpen(false);

	return (
		<nav className="w-full md:h-full">
			<div className="flex items-center justify-between px-3 py-3 md:hidden">
				<span className="text-sm font-semibold text-foreground/80">Admin</span>
				<button
					className="inline-flex items-center justify-center rounded-lg border border-border/50 bg-background/10 p-2 text-foreground transition hover:bg-background/20"
					onClick={toggleMobile}
					aria-expanded={mobileOpen}
					aria-label={mobileOpen ? "Close menu" : "Open menu"}
				>
					{mobileOpen ? <X size={20} /> : <Menu size={20} />}
				</button>
			</div>

			<div className="hidden md:block">
				<div className="group flex h-full min-h-[calc(100vh-4rem)] w-20 flex-col gap-3 rounded-r-2xl border-r border-border/40 bg-background/70 px-3 py-4 shadow-sm backdrop-blur transition-all duration-300 hover:w-48">
					{adminNavItems.map((item) => {
						const isActive = pathname === item.href;

						return (
							<AdminNavItem
								key={item.href}
								href={item.href}
								text={navLabels[item.label][locale]}
								icon={item.icon}
								active={isActive}
							/>
						);
					})}
				</div>
			</div>

			{mobileOpen ? (
				<div className="flex flex-col gap-2 border-t border-border/40 bg-background/80 p-3 shadow-lg backdrop-blur md:hidden">
					{adminNavItems.map((item) => (
						<AdminNavItem
							key={item.href}
							href={item.href}
							text={navLabels[item.label][locale]}
							icon={item.icon}
							active={pathname === item.href}
							onClick={closeMobile}
						/>
					))}
				</div>
			) : null}
		</nav>
	);
};

export default AdminNavBar;
