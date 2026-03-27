---
name: portfolio-design
description: Apply Ankit's exact design system when adding new sections, components, or visual elements to the portfolio.
user-invocable: true
---

# Portfolio Design System — Ankit Shilarkar

## Color Palette (CSS variables — NEVER use hex directly)
```
--orange:  #E8622A   Primary accent, CTAs, hero text
--yellow:  #F2B227   Secondary warm accent, marquee
--teal:    #2AB8A0   Success/live badges, active states
--indigo:  #4A5FC4   Azure/cloud related content
--rose:    #D94F7A   In-progress/new projects
```

## Typography
- Display headings: Cabinet Grotesk (900 weight, tight letter-spacing -1.5px)
- Italic accents: Instrument Serif (400 italic, used in `<em>` inside h2)
- Body / UI text: DM Sans (400/500 weight)
- Section titles: `clamp(30px, 4vw, 46px)` — never fixed px for headings

## Spacing Rhythm
- Section padding: `100px 5%`
- Card internal padding: `24-36px`
- Gap between grid items: `12-20px` (tight), `48-64px` (sections)
- Border radius: `var(--radius)` = 16px for cards, `var(--radius-sm)` = 8px for pills/badges

## Component Patterns

### New card (generic):
```html
<div class="[type]-card c-[color]">
  <div class="[type]-type-row">
    <span class="[type]-type">CATEGORY LABEL</span>
    <span class="badge badge-[variant]">Status</span>
  </div>
  <div class="[type]-name">Card Title</div>
  <div class="[type]-desc">Description text...</div>
</div>
```

### New section:
```html
<section id="section-id" class="section [bg-class]">
  <div class="sec-tag">Label</div>
  <h2 class="section-title">Title with<br/><em>italic accent.</em></h2>
  <!-- content -->
</section>
```

### Timeline project entry (Burger Singh style — colored left border):
```html
<div class="tl-project" style="border-left-color:var(--teal);">
  <div class="tl-project-name">
    Project Name
    <span class="badge badge-new">Status</span>
  </div>
  <ul class="tl-bullets">
    <li>Bullet with <strong>key tech</strong> bolded.</li>
  </ul>
</div>
```

### Skill pill variants:
- `.pill.core` — orange tint (primary expertise)
- `.pill.strong` — teal tint (solid, daily-use skills)
- `.pill.learning` — yellow tint (actively learning)
- `.pill` — neutral (familiar, not daily use)

## Animation Rules
- Page load: `fadeUp` (opacity 0→1, translateY 20→0), staggered 0.1s per element
- Scroll reveal: `.reveal` class added by animations.js, triggered by IntersectionObserver
- Hover: `transform: translateY(-2px)` on cards, `translateX(4px)` on contact links
- Never animate background-color (expensive repaint) — use opacity/transform only

## Dark / Light Mode
- Default theme: dark
- All new components must be tested in BOTH themes
- Use CSS variables exclusively — zero hardcoded colors in components
- Background layers: `--bg` (page) → `--bg2` (alt sections) → `--surface` (cards)

## Tone & Voice
- Section titles: bold claim + italic serif accent ("Where I've been. What I've *shipped.*")
- Badge labels: brief, factual ("Going Live", "Active", "Shipped", "In Progress")
- Bullet points: start with action, bold the technology, end with impact
  ✅ "Built <strong>JWT auth</strong> — reduced unauthorized access incidents to zero."
  ❌ "Worked on authentication using JWT."
