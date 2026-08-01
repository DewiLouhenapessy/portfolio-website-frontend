"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
    }
  }, [isLoading, user, router]);

  // Tijdens het checken van de sessie, of net vóór de redirect: toon niets
  // inhoudelijks. Dit is de "lege shell" die we eerder bespraken.
  if (isLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-slate-400">
        Bezig met laden...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-3">
        <span className="text-sm text-slate-600">Ingelogd als {user.email}</span>
        <button
          onClick={async () => {
            await logout();
            router.replace("/login");
          }}
          className="text-sm text-slate-500 underline hover:text-slate-900"
        >
          Uitloggen
        </button>
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
}
