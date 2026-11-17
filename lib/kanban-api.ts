import { getApiUrl } from "@/lib/api-url";
import type { KanbanBoard, KanbanCard } from "@/lib/types";

const BOARD_SLUG = "main";

function getErrorMessage(responseBody: unknown, status: number): string {
	if (responseBody && typeof responseBody === "object") {
		if ("errors" in responseBody && responseBody.errors) {
			const errors = responseBody.errors;

			if (typeof errors === "object") {
				const message = Object.values(errors)
					.flat()
					.find((value) => typeof value === "string");
				if (typeof message === "string") return message;
			}
		}

		if (
			"message" in responseBody &&
			typeof responseBody.message === "string"
		) {
			return responseBody.message;
		}
	}

	return `Kanban request failed (${status}).`;
}

function readCookie(name: string): string | null {
	const match = document.cookie.match(
		new RegExp(`(?:^|;\\s*)${name}=([^;]+)`),
	);

	return match ? decodeURIComponent(match[1]) : null;
}

async function request<T>(
	path: string,
	options: RequestInit = {},
): Promise<T> {
	const method = options.method ?? "GET";
	const xsrfToken = readCookie("XSRF-TOKEN");
	const response = await fetch(getApiUrl(path), {
		...options,
		credentials: "include",
		headers: {
			Accept: "application/json",
			...(options.body ? { "Content-Type": "application/json" } : {}),
			...(["POST", "PATCH", "DELETE"].includes(method) && xsrfToken
				? { "X-XSRF-TOKEN": xsrfToken }
				: {}),
			...options.headers,
		},
	});

	if (response.status === 401) {
		throw new Error("Your admin session has expired. Please sign in again.");
	}

	if (!response.ok) {
		const body = await response.json().catch(() => null);
		throw new Error(getErrorMessage(body, response.status));
	}

	if (response.status === 204) return undefined as T;

	return response.json();
}

export const kanbanApi = {
	async getBoard(signal?: AbortSignal): Promise<{ board: KanbanBoard }> {
		return request(`/api/boards/${BOARD_SLUG}`, { signal });
	},

	async createColumn(name: string): Promise<void> {
		await request(`/api/boards/${BOARD_SLUG}/columns`, {
			method: "POST",
			body: JSON.stringify({ name }),
		});
	},

	async deleteColumn(columnId: number): Promise<void> {
		await request(`/api/boards/${BOARD_SLUG}/columns/${columnId}`, {
			method: "DELETE",
		});
	},

	async createCard(
		columnId: number,
		title: string,
		description: string,
	): Promise<void> {
		await request("/api/cards", {
			method: "POST",
			body: JSON.stringify({
				column_id: columnId,
				title,
				description: description || null,
			}),
		});
	},

	async moveCard(cardId: number, columnId: number): Promise<KanbanCard> {
		const { card } = await request<{ card: KanbanCard }>(
			`/api/cards/${cardId}/move`,
			{
				method: "PATCH",
				body: JSON.stringify({ column_id: columnId }),
			},
		);

		return card;
	},

	async deleteCard(cardId: number): Promise<void> {
		await request(`/api/cards/${cardId}`, { method: "DELETE" });
	},
};
