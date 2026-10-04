---
paths:
  - "src/css/*.css"
---

# CSS Rules

## Variables — ALWAYS use them
- Colors: NEVER hardcode hex values outside `base.css :root / [data-theme]` blocks
  ✅ `color: var(--red)`
  ❌ `color: #B8321C`
- Spacing: use rem for vertical rhythm, px for component internals
- Corners are square (pad world) — no rounded cards
- Transitions: `0.2s var(--ease-out)`

## Dark Mode — mandatory
- Every new color reference must work on the day pad (default `:root`) AND the night pad (`:root[data-theme="dark"]`)
- Mental test: if background were near-black, would the text still be readable?
- Test every new component by toggling the theme button

## File Ownership
- `base.css` — tokens, reset, grid-paper ground, buttons, utilities
- `layout.css` — pad header, sheets, grids, footer, ALL breakpoints
- `components.css` — GIVEN/FIND/SOLUTION, figures, work log, systems, toolkit, contact, signature motion
- `chat.css` — Q & A widget only
- Do NOT add layout rules to components.css or vice versa

## Selectors
- Class-based only — no ID selectors in CSS (IDs are for JS/anchor hooks)
- BEM-lite naming: `.block`, `.block-element`, `.block--modifier`
- No `!important` unless overriding a third-party (and document why)

## Responsive
- Mobile-first: base styles for mobile, `@media (min-width: 768px)` for desktop
- Breakpoints live in `layout.css` — don't scatter them across files
- Test grid collapsing: `.problem-grid`, `.log-co`, `.sys-grid`, `.ask-grid`, `.contact-grid` must single-column on mobile

## Performance
- Avoid `filter: blur()` on animating elements (causes repaint)
- Use `transform` and `opacity` for animations (compositor-only)
- `transition` on hover states only — not on page load
