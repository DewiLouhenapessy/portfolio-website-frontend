"use client";

import { type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { AuthProvider, useAuth } from "@/context/AuthContext";

function AdminLayoutContent({ children }: { children: ReactNode }) {
	const { user, isLoading, logout } = useAuth();
	const router = useRouter();

	if (isLoading) {
		return (
			<div className="flex min-h-screen items-center justify-center text-sm text-slate-400">
				Bezig met laden...
			</div>
		);
	}

	return (
		<div className="min-h-screen">
			{user ? (
				<header className="flex items-center justify-between border-b px-6 py-3">
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
						Uitloggen
					</button>
				</header>
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
