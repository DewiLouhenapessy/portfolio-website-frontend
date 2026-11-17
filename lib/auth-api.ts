import { getApiUrl } from "@/lib/api-url";

function readCookie(name: string): string | null {
	const match = document.cookie.match(
		new RegExp(`(?:^|;\\s*)${name}=([^;]+)`),
	);
	return match ? decodeURIComponent(match[1]) : null;
}

async function ensureCsrfCookie(): Promise<void> {
	const response = await fetch(getApiUrl("/sanctum/csrf-cookie"), {
		credentials: "include",
	});

	if (!response.ok) {
		throw new Error(`Could not initialize the CSRF cookie (${response.status}).`);
	}
}

async function apiRequest<T>(path: string, options?: RequestInit): Promise<T> {
	const xsrfToken = readCookie("XSRF-TOKEN");

	const url = getApiUrl(path);

	const res = await fetch(url, {
		...options,
		credentials: "include", // stuurt en accepteert cookies cross-subdomain
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			...(xsrfToken ? { "X-XSRF-TOKEN": xsrfToken } : {}),
			...options?.headers,
		},
	});

	if (res.status === 401) {
		throw new AuthError("Niet ingelogd");
	}

	if (!res.ok) {
		const body = await res.json().catch(() => null);
		console.error("API request failed", { url, status: res.status, body });
		throw new Error(body?.message ?? `API-fout (${res.status}) ${url}`);
	}

	if (res.status === 204) return undefined as T;
	return res.json();
}

export class AuthError extends Error {}

export interface AuthUser {
	id: number;
	name: string;
	email: string;
}

export const authApi = {
	async login(email: string, password: string): Promise<AuthUser> {
		await ensureCsrfCookie(); // moet vóór elke login/logout call
		const data = await apiRequest<{ user: AuthUser }>("/api/login", {
			method: "POST",
			body: JSON.stringify({ email, password }),
		});
		return data.user;
	},

	async logout(): Promise<void> {
		await ensureCsrfCookie();
		await apiRequest<void>("/api/logout", { method: "POST" });
	},

	async getCurrentUser(): Promise<AuthUser | null> {
		try {
			const data = await apiRequest<{ user: AuthUser }>("/api/user");
			return data.user;
		} catch (err) {
			if (err instanceof AuthError) return null;
			throw err;
		}
	},
};
