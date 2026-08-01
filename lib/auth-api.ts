const API_URL = process.env.NEXT_PUBLIC_API_URL; // bv. https://api.jouwdomein.nl

function readCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : null;
}

async function ensureCsrfCookie(): Promise<void> {
  await fetch(`${API_URL}/sanctum/csrf-cookie`, {
    credentials: "include",
  });
}

async function apiRequest<T>(path: string, options?: RequestInit): Promise<T> {
  const xsrfToken = readCookie("XSRF-TOKEN");

  const res = await fetch(`${API_URL}${path}`, {
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
    throw new Error(body?.message ?? `API-fout (${res.status})`);
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
    const data = await apiRequest<{ user: AuthUser }>("/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    return data.user;
  },

  async logout(): Promise<void> {
    await apiRequest<void>("/logout", { method: "POST" });
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
