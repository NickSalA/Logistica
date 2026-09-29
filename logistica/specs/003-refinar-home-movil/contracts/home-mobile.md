# Responsive Contract: Homepage Mobile

## Editorial preservation

- Hero copy, CTA labels, CTA destinations, Services image/caption, Benefits content, and Footer labels/data continue to come from Prismic.
- No new permanent commercial text is introduced in React components.
- A content recommendation may be documented separately, but it must be applied through Prismic.

## Mobile visual behavior

- The hero presents a clear headline and CTA hierarchy without an oppressive overlay or excessive vertical gaps.
- Services keeps its editorial image when available, scales it appropriately for mobile, and displays `texto_imagen` when populated.
- Benefits cards remain interactive and readable, with a compact mobile height and no clipped title/description/control.
- Footer groups remain visually distinct and usable in a single-column mobile flow.
- The floating WhatsApp access has enough separation from buttons, cards, and footer content.

## Responsive and accessibility behavior

- No horizontal scrolling at narrow and regular mobile widths.
- Desktop layout remains unchanged unless a shared rule is necessary for responsive consistency.
- Links, buttons, expandable cards, carousel controls, and theme controls remain keyboard accessible with visible focus.
- Reduced motion removes or minimizes transitions without removing content or state feedback.
