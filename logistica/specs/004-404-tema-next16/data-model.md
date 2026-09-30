# Data Model: Página 404 y proveedor de temas

## Not-found view

| Property | Source | Rules |
|---|---|---|
| Status | App Router | Rendered for unresolved routes/resources via `notFound()`. |
| Recovery action | Stable UI | Must provide an accessible route back to `/`. |
| Theme | Root theme context | Must follow the active light/dark class without requiring CMS data. |
| Public global access | Root layout | Floating WhatsApp may appear when public Settings configuration is available. |

## Theme provider contract

| Property | Current source | Rule |
|---|---|---|
| Root hydration warning handling | `src/app/layout.tsx` | Preserve `suppressHydrationWarning` on `<html>`. |
| Theme attribute | `ThemeProvider` props | Preserve `attribute="class"`. |
| Initial theme | `defaultTheme="system"`, `enableSystem` | Preserve system preference behavior. |
| Theme transition | `disableTransitionOnChange` | Preserve unless compatibility research proves a safer alternative. |
| Inline initialization script | `next-themes` | Treat as intentional; validate its behavior instead of removing it blindly. |
