import { cookies } from "next/headers";

export default async function AdminPage() {
	const cookieStore = await cookies();
	const isAuthenticated = cookieStore.get("admin-auth")?.value === "true";

	if (!isAuthenticated) {
		return (
			<main className="min-h-screen bg-background px-6 py-24 text-foreground">
				<div className="mx-auto flex max-w-2xl flex-col gap-6 rounded-2xl border border-border/70 bg-card/70 p-8 shadow-sm backdrop-blur-sm">
					<p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
						Beveiligde adminpagina
					</p>
					<h1 className="text-3xl font-semibold sm:text-4xl">
						Log in om toegang te krijgen tot de adminomgeving
					</h1>
					<p className="text-base leading-7 text-muted-foreground">
						Deze pagina is alleen beschikbaar via de URL /admin en is beschermd
						met een gebruikersnaam en wachtwoord.
					</p>

					<form
						action="/api/admin/login"
						method="post"
						className="flex flex-col gap-4"
					>
						<label className="flex flex-col gap-2 text-sm font-medium text-foreground">
							<span>Gebruikersnaam</span>
							<input
								name="username"
								type="text"
								autoComplete="username"
								className="rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none ring-0 focus:border-ring"
								required
							/>
						</label>

						<label className="flex flex-col gap-2 text-sm font-medium text-foreground">
							<span>Wachtwoord</span>
							<input
								name="password"
								type="password"
								autoComplete="current-password"
								className="rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none ring-0 focus:border-ring"
								required
							/>
						</label>

						<button
							type="submit"
							className="rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
						>
							Inloggen
						</button>
					</form>
				</div>
			</main>
		);
	}

	return (
		<main className="min-h-screen bg-background px-6 py-24 text-foreground">
			<div className="mx-auto flex max-w-3xl flex-col gap-6 rounded-2xl border border-border/70 bg-card/70 p-8 shadow-sm backdrop-blur-sm">
				<div className="flex items-center justify-between gap-4">
					<div>
						<p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
							Beveiligde adminpagina
						</p>
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

				<p className="text-base leading-7 text-muted-foreground">
					Deze pagina is nu toegankelijk omdat je bent ingelogd met de juiste
					gebruikersnaam en wachtwoord.
				</p>
			</div>
		</main>
	);
}
