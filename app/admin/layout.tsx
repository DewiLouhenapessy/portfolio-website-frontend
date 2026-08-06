"use client";

import { type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import AdminNavBar from "@/components/AdminNavBar";
import { useLanguage } from "@/components/LanguageProvider";
import { pageContent } from "@/lib/i18n";

function AdminLayoutContent({ children }: { children: ReactNode }) {
	const { user, isLoading, logout } = useAuth();
	const router = useRouter();
	const { locale } = useLanguage();
	const content = pageContent.admin.layout;

	if (isLoading) {
		return (
			<div className="flex min-h-screen items-center justify-center text-sm text-slate-400">
				{content.loading[locale]}
			</div>
		);
	}

	return (
		<div className="min-h-screen">
			{user ? (
				<div className="min-h-screen bg-background">
					<div className="flex min-h-screen flex-col md:flex-row">
						<aside className="border-b border-border/40 bg-background/80 backdrop-blur md:w-20 md:border-b-0 md:border-r">
							<AdminNavBar />
						</aside>
						<div className="flex-1">
							<header className="flex items-center justify-between border-b border-border/40 px-6 py-3">
								<span className="text-sm text-slate-600">
									Ingelogd als {user.email}
								</span>
								<button
									onClick={async () => {
										await logout();
										router.replace("/admin");
									}}
									className="text-sm text-slate-500 underline hover:text-slate-900"
								>
									{content.logout[locale]}
								</button>
							</header>
						</div>
					</div>
				</div>
			) : null}
			<main className="p-6">{children}</main>
		</div>
	);
}

export default function AdminLayout({ children }: { children: ReactNode }) {
	return (
		<AuthProvider>
			<AdminLayoutContent>{children}</AdminLayoutContent>
		</AuthProvider>
	);
}
