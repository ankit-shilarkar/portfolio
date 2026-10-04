---
name: portfolio-design
description: Apply Ankit's exact design system ("The Computation Pad") when adding new sections, components, or visual elements to the portfolio.
user-invocable: true
---

# Portfolio Design System — "The Computation Pad"

The source of truth is `DESIGN.md` (tokens, type, components, rules) and
`.impeccable/design.json`. Read DESIGN.md before any visual change. Summary:

## World
The site is a worked engineering problem on green computation paper:
GIVEN → FIND → SOLUTION on sheet 1, then numbered sheets (Work log, Systems,
Toolkit, Ask, Contact). Graphite ink for text, **red pencil only for answers,
primary actions, status notes and cross-references**.

## Tokens (CSS variables only — hex lives in base.css)
- Ground: `--paper`, `--paper-2`, `--paper-3`, grid `--grid` / `--grid-major`, margin `--rule`
- Ink: `--ink` (primary), `--ink-2` (secondary), `--ink-3` (tertiary/meta)
- Red pencil: `--red`, `--red-hover`, `--on-red`
- Spacing: `--s1`…`--s9` (4px base), grid square `--sq` = 20px
- Night pad = `:root[data-theme="dark"]` overrides the same names

## Type
- Archivo (variable `wdth`): display 850 at wdth 80–82, tight tracking (≥ -0.04em); body 16/1.6
- JetBrains Mono: data only — dates, stack tags, diagram labels, sheet numbers. Never prose.

## Building blocks (see components.css)
- New section: `<section class="sheet" id="x" data-sheet="n">` + `.title-block` (`.tb-subject` h2 + `.tb-note`)
- Entries are ruled rows (`.log-item`, `.sys`), never rounded cards
- Status: `<span class="note">shipped</span>` (circled red pencil); demo label: `<span class="stamp">Demo</span>`
- Data flow: `<ol class="flow"><li>A</li><li>B</li></ol>` (boxes joined by arrows)
- Extra detail: `<details class="working"><summary>Show working</summary>…`
- Skills: `.k core | solid | learn` inside the `.kit` table
- Buttons: `.btn .btn-red` (primary), `.btn .btn-line` (secondary)
- Icons: inline SVG `<use href="#i-…">`, 1.75 stroke — no emoji

## Never
Rounded cards, gradients, glows, glass, emoji icons, eyebrow/kicker labels above headings,
colored thick left borders, monospace for prose, invented metrics.

## Motion
One signature moment only: pencil-drawing the problem sheet on first load.
Content is visible by default; everything is disabled under `prefers-reduced-motion`.

## Tone
Direct and factual. Bullets start with an action and name the technology; demos are labeled as demos.
