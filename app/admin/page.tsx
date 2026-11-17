"use client";

import AdminLoginForm from "@/components/AdminLoginForm";
import { useLanguage } from "@/components/LanguageProvider";
import { useAuth } from "@/context/AuthContext";
import { pageContent } from "@/lib/i18n";

export default function AdminPage() {
	const { locale } = useLanguage();
	const { user, isLoading } = useAuth();
	const content = pageContent.admin.page;

	if (isLoading) {
		return (
			<div
				className="flex min-h-[50vh] items-center justify-center text-sm text-slate-400"
				role="status"
			>
				{content.loading[locale]}
			</div>
		);
	}

	if (!user) {
		return (
			<div className="bg-background px-6 py-24 text-foreground">
				<div className="mx-auto flex max-w-2xl flex-col gap-6 rounded-2xl border border-border/70 bg-card/70 p-8 shadow-sm backdrop-blur-sm">
					<div className="space-y-2">
						<p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
							{content.heading[locale]}
						</p>
						<h1 className="text-3xl font-semibold sm:text-4xl">
							{content.loginTitle[locale]}
						</h1>
					</div>

					<AdminLoginForm />
				</div>
			</div>
		);
	}

	return (
		<div className="bg-background px-6 py-24 text-foreground">
			<div className="mx-auto flex max-w-3xl flex-col gap-6 rounded-2xl border border-border/70 bg-card/70 p-8 shadow-sm backdrop-blur-sm">
				<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
					<div>
						<h1 className="text-2xl md:text-4xl">
							{content.welcomeTitle[locale]}
						</h1>
						<p className="mt-2 text-sm leading-6 text-muted-foreground">
							{content.welcomeDescription[locale]}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
