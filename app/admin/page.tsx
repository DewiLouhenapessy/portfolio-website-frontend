import { cookies } from "next/headers";
import AdminLoginForm from "@/components/AdminLoginForm";

export default async function AdminPage() {
	const cookieStore = await cookies();
	const isAuthenticated = cookieStore.get("admin-auth")?.value === "true";

	if (!isAuthenticated) {
		return (
			<main className="min-h-screen bg-background px-6 py-24 text-foreground">
				<div className="mx-auto flex max-w-2xl flex-col gap-6 rounded-2xl border border-border/70 bg-card/70 p-8 shadow-sm backdrop-blur-sm">
					<div className="space-y-2">
						<p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
							Beveiligde adminpagina
						</p>
						<h1 className="text-3xl font-semibold sm:text-4xl">
							Log in om toegang te krijgen tot de adminomgeving
						</h1>
						<p className="text-base leading-7 text-muted-foreground">
							Deze pagina is alleen beschikbaar via de URL /admin en is
							beschermd met een gebruikersnaam en wachtwoord.
						</p>
					</div>

					<AdminLoginForm />
				</div>
			</main>
		);
	}

	return (
		<main className="min-h-screen bg-background px-6 py-24 text-foreground">
			<div className="mx-auto flex max-w-3xl flex-col gap-6 rounded-2xl border border-border/70 bg-card/70 p-8 shadow-sm backdrop-blur-sm">
				<div className="flex items-center justify-between gap-4">
					<div>
						<h1 className="text-3xl font-semibold sm:text-4xl">
							Welkom in het beheergedeelte
						</h1>
					</div>

					<form action="/api/admin/logout" method="post">
						<button
							type="submit"
							className="rounded-lg border border-border px-4 py-2 text-sm font-medium transition hover:bg-muted"
						>
							Uitloggen
						</button>
					</form>
				</div>
			</div>
		</main>
	);
}
