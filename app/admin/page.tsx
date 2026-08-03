"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AdminLoginForm from "@/components/AdminLoginForm";

function getAdminAuthCookieValue() {
	if (typeof document === "undefined") return null;

	const cookies = document.cookie.split(";");
	const authCookie = cookies.find((cookie) =>
		cookie.trim().startsWith("admin-auth="),
	);

	if (!authCookie) return null;

	return authCookie.split("=")[1]?.trim() ?? null;
}

function hasValidAdminAuthCookie() {
	const value = getAdminAuthCookieValue();
	return value === "true";
}

function clearAdminAuthCookie() {
	document.cookie = "admin-auth=; path=/; max-age=0; SameSite=Lax";
}

export default function AdminPage() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		setIsAuthenticated(hasValidAdminAuthCookie());
		setIsReady(true);
	}, []);

	if (!isReady) {
		return (
			<main className="min-h-screen bg-background px-6 py-24 text-foreground">
				<div className="mx-auto flex max-w-2xl items-center justify-center rounded-2xl border border-border/70 bg-card/70 p-8 shadow-sm backdrop-blur-sm">
					<p className="text-sm text-muted-foreground">Bezig met laden...</p>
				</div>
			</main>
		);
	}

	if (!isAuthenticated) {
		return (
			<main className="min-h-screen bg-background px-6 py-24 text-foreground">
				<div className="mx-auto flex max-w-2xl flex-col gap-6 rounded-2xl border border-border/70 bg-card/70 p-8 shadow-sm backdrop-blur-sm">
					<div className="space-y-2">
						<p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
							Adminpagina
						</p>
						<h1 className="text-3xl font-semibold sm:text-4xl">Inloggen</h1>
					</div>

					<AdminLoginForm />
				</div>
			</main>
		);
	}

	return (
		<main className="min-h-screen bg-background px-6 py-24 text-foreground">
			<div className="mx-auto flex max-w-3xl flex-col gap-6 rounded-2xl border border-border/70 bg-card/70 p-8 shadow-sm backdrop-blur-sm">
				<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
					<div>
						<h1 className="text-3xl font-semibold sm:text-4xl">
							Welkom in het beheergedeelte
						</h1>
						<p className="mt-2 text-sm leading-6 text-muted-foreground">
							Gebruik de knop hieronder om het kanbanbord te openen.
						</p>
					</div>

					<div className="flex flex-wrap gap-3">
						<Link
							href="/admin/kanban"
							className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition hover:opacity-90"
						>
							Open kanbanbord
						</Link>
						<button
							type="button"
							onClick={() => {
								clearAdminAuthCookie();
								window.location.reload();
							}}
							className="rounded-lg border border-border px-4 py-2 text-sm font-medium transition hover:bg-muted"
						>
							Uitloggen
						</button>
					</div>
				</div>
			</div>
		</main>
	);
}
