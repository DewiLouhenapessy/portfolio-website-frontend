const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

export function getApiUrl(path: string): string {
	if (!API_URL) {
		throw new Error(
			"Set NEXT_PUBLIC_API_URL in .env.local to the Laravel backend URL.",
		);
	}

	return `${API_URL}${path}`;
}
