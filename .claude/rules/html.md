---
paths:
  - "*.html"
---

# HTML Rules

## Structure
- Semantic HTML5 elements: `<section>`, `<nav>`, `<article>`, `<footer>`
- Every `<section>` must have an `id` attribute for anchor nav
- No `<div>` soup — if it's navigation, use `<nav>`; if it's a list, use `<ul>`

## Accessibility
- Every `<img>` must have a descriptive `alt` attribute
- Every `<button>` must have visible text or `aria-label`
- Interactive elements must be keyboard-reachable (no `tabindex="-1"` unless intentional)
- Color contrast: text on --bg must be readable in both themes

## Links
- External links (`target="_blank"`) MUST have `rel="noopener noreferrer"`
- Internal anchor links must point to existing `id` values
- GitHub and LinkedIn links must use Ankit's actual URLs:
  - GitHub: https://github.com/ankit-shilarkar
  - LinkedIn: https://www.linkedin.com/in/ankit-shilarkar2504/
  - Email: ankitshilarkar2504@gmail.com

## Inline Styles
- Avoid inline `style=""` except for:
  - One-off layout overrides (e.g. max-width on a single section)
- Never inline colors — use classes backed by CSS variables

## Components
- `index.html` holds all markup: one `<section class="sheet" data-sheet="n">` per section
- Icons are inline SVG `<symbol>`s referenced with `<use>` — no emoji or Unicode glyph icons
