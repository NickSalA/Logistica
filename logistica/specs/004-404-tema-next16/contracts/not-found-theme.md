# UI Contract: Not Found and Theme Provider

## Not-found behavior

- Any unresolved public route renders the custom 404 view.
- The view clearly communicates that the requested page was not found.
- The primary recovery action returns to `/`.
- The view works in light and dark themes, on mobile and desktop, without horizontal overflow.
- The view is keyboard accessible and retains the public floating WhatsApp access when the root layout provides it.

## Theme behavior

- `suppressHydrationWarning` remains on the root `<html>` element.
- The theme provider continues using the class attribute and system preference.
- Theme switching remains available from the public navigation.
- The initialization script injected by `next-themes` is not removed unless a validated compatibility fix requires it.
- Development console output is checked separately from production behavior; an intentional third-party initialization script must not be misclassified as an application-rendered script error without evidence.
