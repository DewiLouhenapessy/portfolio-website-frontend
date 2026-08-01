# Laatste stap: AuthProvider koppelen in je root layout

In je bestaande `src/app/layout.tsx` moet de hele app binnen de `AuthProvider` komen te staan, zodat `useAuth()` overal werkt:

```tsx
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({ children }) {
  return (
    <html lang="nl">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
```

## Overzicht van alle bestanden uit deze stap

**Backend (Laravel — in je `api-app` map)**

| Bestand | Actie |
|---|---|
| `app/Http/Controllers/AuthController.php` | nieuw bestand |
| `routes-api-additions.php` | samenvoegen met `routes/api.php` |
| `CONFIGURATIE-INSTRUCTIES.md` | `.env`, CORS, middleware, user aanmaken |

**Frontend (Next.js — in je bestaande project)**

| Bestand | Actie |
|---|---|
| `src/lib/auth-api.ts` | nieuw bestand |
| `src/context/AuthContext.tsx` | nieuw bestand |
| `src/app/login/page.tsx` | nieuw bestand |
| `src/app/admin/layout.tsx` | beschermt alles onder `/admin/*`, dus ook je kanbanbord op `/admin/kanban` |

## Hoe het samenkomt met het kanbanbord

Omdat `admin/layout.tsx` nu alle routes eronder beschermt, hoeft de kanban-pagina zelf niets extra's te doen voor beveiliging — die zit al op het niveau van de layout. Wel moet je in `kanban-api.ts` (die we eerder maakten) de fetch-calls aanpassen naar `credentials: "include"` in plaats van de losse Authorization-header, zodat ze meeliften op dezelfde sessie-cookie als de auth-calls:

```ts
const res = await fetch(`${API_URL}${path}`, {
  ...options,
  credentials: "include",
  headers: { /* ... */ }, // XSRF-token hoeft hier niet bij GET-requests
});
```

Voor POST/PATCH/DELETE-requests naar de kanban-routes moet je ook daar de `X-XSRF-TOKEN`-header meesturen, net als in `auth-api.ts`.
