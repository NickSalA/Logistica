# Quickstart: Validar página 404 y proveedor de temas

## Automated validation

Run:

```bash
pnpm lint
pnpm build
```

If configured:

```bash
pnpm lint:css
pnpm test
```

## Not-found scenarios

1. Open a nonexistent root route, such as `/ruta-que-no-existe`.
2. Open a nonexistent one-segment Prismic route and confirm `[uid]` resolves through `notFound()`.
3. Confirm the custom 404 view appears with the site identity and a clear recovery action.
4. Activate the recovery action with mouse, keyboard, and a mobile touch target.
5. Repeat in light and dark themes and at narrow/regular mobile widths.
6. Confirm no horizontal overflow or clipped content.
7. Confirm the floating WhatsApp access remains present only when public Settings enables it.

## Theme compatibility scenarios

1. Start `pnpm dev` with Turbopack and visit the homepage.
2. Inspect the console for the reported script warning in `ThemeProvider`.
3. Toggle light/dark/system themes and perform a full refresh in each state.
4. Visit a nonexistent route in each theme and verify there is no hydration failure or theme flash that prevents use.
5. Run `pnpm build` and `pnpm start`, then repeat the theme and 404 checks in production mode.
6. Record whether the script message occurs only in development overlay, also in production, or as a functional failure.
7. Compare the installed `next-themes` version with the project lockfile before deciding whether an upgrade is justified.

## Expected result

The site provides a branded, accessible 404 recovery path. Theme switching remains functional, `suppressHydrationWarning` is preserved, and any `next-themes` development warning is classified with evidence rather than hidden by removing required initialization behavior.

## Current implementation evidence

- A `ChunkLoadError` was previously observed during Turbopack HMR; this is separate from the `next-themes` initialization warning and should be rechecked after clearing `.next`.
- The reported `Encountered a script tag while rendering React component` message comes from the intentional `next-themes` initialization script. No production failure has been established, so the dependency remains unchanged.
