---
paths:
  - "src/css/*.css"
---

# CSS Rules

## Variables — ALWAYS use them
- Colors: NEVER hardcode hex values outside `base.css :root / [data-theme]` blocks
  ✅ `color: var(--orange)`
  ❌ `color: #E8622A`
- Spacing: use rem for vertical rhythm, px for component internals
- Border radius: use `var(--radius)` (16px) or `var(--radius-sm)` (8px)
- Transitions: use `var(--transition)` = `0.2s ease`

## Dark Mode — mandatory
- Every new color reference must work in BOTH `[data-theme="dark"]` AND `[data-theme="light"]`
- Mental test: if background were near-black, would the text still be readable?
- Test every new component by toggling the theme button

## File Ownership
- `base.css` — variables, reset, typography, buttons, chips, badges, keyframes
- `layout.css` — nav, hero, section grids, footer, responsive breakpoints
- `components.css` — cards, timeline, skills, contact, chat info
- `chat.css` — chat widget only (messages, input, auth gate, typing indicator)
- Do NOT add layout rules to components.css or vice versa

## Selectors
- Class-based only — no ID selectors in CSS (IDs are for JS/anchor hooks)
- BEM-lite naming: `.block`, `.block-element`, `.block--modifier`
- No `!important` unless overriding a third-party (and document why)

## Responsive
- Mobile-first: base styles for mobile, `@media (min-width: 768px)` for desktop
- Breakpoints live in `layout.css` — don't scatter them across files
- Test grid collapsing: `.about-grid`, `.tl-item`, `.chatbot-grid` must single-column on mobile

## Performance
- Avoid `filter: blur()` on animating elements (causes repaint)
- Use `transform` and `opacity` for animations (compositor-only)
- `transition` on hover states only — not on page load
