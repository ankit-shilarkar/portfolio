---
name: Ankit Shilarkar — Backend Engineer
description: A portfolio set as a worked problem on an engineer's computation pad. Given the evidence, find the hire, solution boxed in red pencil.
colors:
  paper: "#E6EFD9"
  paper-2: "#DAE7CA"
  paper-3: "#CFDFBC"
  grid: "rgba(70, 118, 64, 0.13)"
  grid-major: "rgba(70, 118, 64, 0.24)"
  margin-rule: "#7FA672"
  graphite: "#1C2A1F"
  graphite-2: "#3F5245"
  graphite-3: "#4F6354"
  red-pencil: "#B8321C"
  red-pencil-hover: "#9C2814"
  on-red: "#FFF6EE"
  select: "rgba(184, 50, 28, 0.18)"
  shadow: "rgba(28, 42, 31, 0.16)"
  night-paper: "#132019"
  night-paper-2: "#182920"
  night-paper-3: "#1F3327"
  night-grid: "rgba(160, 210, 160, 0.055)"
  night-grid-major: "rgba(160, 210, 160, 0.11)"
  night-margin-rule: "#3E6A48"
  chalk: "#E3ECDB"
  chalk-2: "#B1C2AF"
  chalk-3: "#93A692"
  night-red-pencil: "#FF7F61"
  night-red-pencil-hover: "#FF9A80"
  night-on-red: "#1A0B06"
  night-select: "rgba(255, 127, 97, 0.28)"
  night-shadow: "rgba(0, 0, 0, 0.45)"
typography:
  display:
    fontFamily: "Archivo, 'Arial Narrow', sans-serif"
    fontSize: "clamp(44px, 9.5vw, 96px)"
    fontWeight: 850
    lineHeight: 0.95
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 82"
  headline:
    fontFamily: "Archivo, 'Arial Narrow', sans-serif"
    fontSize: "clamp(34px, 5.4vw, 60px)"
    fontWeight: 850
    lineHeight: 1
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 82"
  title:
    fontFamily: "Archivo, 'Arial Narrow', sans-serif"
    fontSize: "clamp(24px, 2.6vw, 30px)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.015em"
    fontVariation: "'wdth' 90"
  title-sm:
    fontFamily: "Archivo, 'Arial Narrow', sans-serif"
    fontSize: "clamp(20px, 2vw, 24px)"
    fontWeight: 750
    lineHeight: 1.2
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 92"
  body:
    fontFamily: "Archivo, 'Arial Narrow', sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
    fontVariation: "'wdth' 100"
  body-lead:
    fontFamily: "Archivo, 'Arial Narrow', sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
  label-caps:
    fontFamily: "Archivo, 'Arial Narrow', sans-serif"
    fontSize: "13px"
    fontWeight: 800
    letterSpacing: "0.05em"
    fontVariation: "'wdth' 120"
  data:
    fontFamily: "'JetBrains Mono', ui-monospace, 'SFMono-Regular', Menlo, monospace"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.6
    fontFeature: "'tnum'"
  closing:
    fontFamily: "Archivo, 'Arial Narrow', sans-serif"
    fontSize: "clamp(38px, 6.5vw, 76px)"
    fontWeight: 850
  fact:
    fontFamily: "Archivo, 'Arial Narrow', sans-serif"
    fontSize: "clamp(16px, 1.6vw, 19px)"
    fontWeight: 400
  find:
    fontFamily: "Archivo, 'Arial Narrow', sans-serif"
    fontSize: "clamp(19px, 2.1vw, 24px)"
    fontWeight: 500
  sub:
    fontFamily: "Archivo, 'Arial Narrow', sans-serif"
    fontSize: "clamp(16px, 1.5vw, 18px)"
    fontWeight: 400
  mail:
    fontFamily: "Archivo, 'Arial Narrow', sans-serif"
    fontSize: "clamp(17px, 2vw, 22px)"
    fontWeight: 650
  heading-sm:
    fontFamily: "Archivo, 'Arial Narrow', sans-serif"
    fontSize: "19px"
    fontWeight: 650
  entry-title:
    fontFamily: "Archivo, 'Arial Narrow', sans-serif"
    fontSize: "18px"
    fontWeight: 650
  ui:
    fontFamily: "Archivo, 'Arial Narrow', sans-serif"
    fontSize: "15px"
    fontWeight: 550
  ui-sm:
    fontFamily: "Archivo, 'Arial Narrow', sans-serif"
    fontSize: "14px"
    fontWeight: 550
  data-xs:
    fontFamily: "'JetBrains Mono', ui-monospace, 'SFMono-Regular', Menlo, monospace"
    fontSize: "11px"
    fontWeight: 400
  data-2xs:
    fontFamily: "'JetBrains Mono', ui-monospace, 'SFMono-Regular', Menlo, monospace"
    fontSize: "10px"
    fontWeight: 400
  fig-label:
    fontFamily: "'JetBrains Mono', ui-monospace, 'SFMono-Regular', Menlo, monospace"
    fontSize: "10.5px"
    fontWeight: 400
  fig-label-sm:
    fontFamily: "'JetBrains Mono', ui-monospace, 'SFMono-Regular', Menlo, monospace"
    fontSize: "9.5px"
    fontWeight: 400
rounded:
  none: "0px"
  focus: "1px"
  dot: "50%"
spacing:
  s1: "4px"
  s2: "8px"
  s3: "12px"
  s4: "16px"
  s5: "24px"
  s6: "32px"
  s7: "48px"
  s8: "64px"
  s9: "96px"
  grid-square: "20px"
  gutter-mobile: "16px"
  gutter-desktop: "40px"
  margin-mobile: "20px"
  margin-desktop: "72px"
  max-width: "1180px"
components:
  button-red:
    backgroundColor: "{colors.red-pencil}"
    textColor: "{colors.on-red}"
    rounded: "{rounded.none}"
    padding: "0 16px"
    height: "44px"
  button-red-hover:
    backgroundColor: "{colors.red-pencil-hover}"
    textColor: "{colors.on-red}"
  button-line:
    backgroundColor: "transparent"
    textColor: "{colors.graphite}"
    rounded: "{rounded.none}"
    padding: "0 16px"
    height: "44px"
  button-line-hover:
    backgroundColor: "{colors.graphite}"
    textColor: "{colors.paper}"
  button-sm:
    padding: "0 12px"
    height: "36px"
  icon-button:
    backgroundColor: "transparent"
    textColor: "{colors.graphite}"
    rounded: "{rounded.none}"
    size: "36px"
  chat-input:
    backgroundColor: "transparent"
    textColor: "{colors.graphite}"
    rounded: "{rounded.none}"
    padding: "0 16px"
    height: "48px"
  chat-send:
    backgroundColor: "{colors.red-pencil}"
    textColor: "{colors.on-red}"
    width: "52px"
  suggest-chip:
    backgroundColor: "transparent"
    textColor: "{colors.graphite}"
    rounded: "{rounded.none}"
    padding: "0 12px"
    height: "34px"
  stamp:
    backgroundColor: "transparent"
    textColor: "{colors.red-pencil}"
    typography: "{typography.data}"
    padding: "1px 6px"
  flow-box:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.graphite}"
    typography: "{typography.data}"
    rounded: "{rounded.none}"
    padding: "5px 8px"
  chat-panel:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.graphite}"
    rounded: "{rounded.none}"
  pad-header:
    backgroundColor: "{colors.paper-2}"
    textColor: "{colors.graphite}"
    height: "60px"
---

# Design System: Ankit Shilarkar — Backend Engineer

## Overview

**Creative North Star: "The Computation Pad"**

The whole site is one worked engineering problem on green computation paper. The page ground is the pad itself: pale green paper, a fine 20px grid with a darker line every fifth square, and a single darker margin rule running down the left edge. Text is graphite ink. Red pencil is reserved for the things a reviewer would mark: the answer, the primary action, annotations, cross-references and status notes. Each section is a numbered sheet ("Sheet n of 6") with a ruled title block, and the first sheet reads as GIVEN / FIND / SOLUTION, with the name set huge, double-underlined, and the contact actions boxed in red pencil.

The night variant is the same pad under a desk lamp: deep green-black paper, a barely-there grid, chalk-white ink, and a brighter coral red pencil so the answer still reads as the mark. Density is that of an engineer's worksheet: ruled rows, dashed separators, numbered lines, boxes joined by arrows. Components are drawn, not manufactured. Boxes, arrows, underlines, double underlines, stamps and loosely circled notes do the work that rounded cards, gradients and glows do on a generic developer portfolio. Those are rejected by the direction contract, and the build carries none of them.

Theme selection follows the operating system on first visit and persists an explicit toggle in localStorage (`data-theme="light"` or `"dark"` on `<html>`). The day pad is the token default on `:root`; the night pad is the `[data-theme="dark"]` override.

**Key Characteristics:**
- Paper ground with a drawn 20px / 100px grid on `body`, and a fixed margin rule at the left.
- Graphite ink for content, red pencil only for answers, actions, annotations and active state.
- Archivo with its width axis doing hierarchy work: condensed (wdth 80–92) for big lettering, expanded (wdth 106–125) for caps labels and marks.
- JetBrains Mono for every piece of data: line numbers, dates, stack lines, flow boxes, sheet numbers, title-block cells.
- Square corners everywhere; hand-drawn SVG strokes (non-scaling) for the answer box and double underlines.
- Flat paper. One soft ambient shadow, only on the sticky header once scrolled.

## Colors

Two inks on green paper: graphite for everything, red pencil for the mark. Every value is a custom property in `src/css/base.css` and only there.

### Primary
- **Red Pencil** (day `red-pencil`, night `night-red-pencil`): the answer and the primary action. Fills the Email button and chat send button, strokes the pencil box and double underlines, colors GIVEN / FIND / SOLUTION labels, status notes, stamps, xrefs, log dates, the active nav underline and the focus ring. Hover deepens by day (`red-pencil-hover`) and lightens by night (`night-red-pencil-hover`). Text on a red fill uses `on-red` / `night-on-red`.
- **Red Selection** (`select`, `night-select`): text selection wash, a translucent red pencil.

### Neutral
- **Pad Green** (`paper` / `night-paper`): the page ground, flow boxes and chat panel background.
- **Header Strip Green** (`paper-2` / `night-paper-2`): the sticky pad header, chat head and scrollbar track; one step deeper than the page.
- **Deep Pad Green** (`paper-3` / `night-paper-3`): the third surface step, defined for deeper insets.
- **Grid Line** (`grid` / `night-grid`) and **Major Grid Line** (`grid-major` / `night-grid-major`): the 20px and 100px grid on the body, the ruled lines in the chat log, and the dashed separators between GIVEN lines.
- **Margin Rule Green** (`margin-rule` / `night-margin-rule`): the left margin rule, thin 1px row rules in the log, systems and toolkit, title-block cell dividers, link underlines at rest, scrollbar thumb.
- **Graphite** (`graphite` / `chalk`): primary text, 1.5px structural rules (header bottom, sheet bottoms, title blocks, chat frame), outline buttons, figure strokes.
- **Graphite Soft** (`graphite-2` / `chalk-2`): body copy in descriptions, captions, roles, tags, nav at rest.
- **Graphite Faint** (`graphite-3` / `chalk-3`): line numbers, sheet numbers in the margin, fine print, placeholders, dashed figure boundaries.
- **Paper Shadow** (`shadow` / `night-shadow`): the only shadow color, used once (header on scroll).

### Named Rules
**The Red Pencil Rule.** Red marks the answer, the action and the annotation, nothing else. Body text, headings and structure are always graphite; if a red element is not something a reviewer would circle or click, it is wrong.

**The One Source Rule.** Hex and rgba values live only in `base.css` custom properties. Every other stylesheet references `var(--paper)`, `var(--ink)`, `var(--red)` and friends, so both pads stay in lockstep.

**The Two Pads Rule.** Every new token gets a day value on `:root` and a night value under `[data-theme="dark"]`. The night red is brighter (coral), not the same hex, so the mark keeps its contrast on dark paper.

## Typography

**Display Font:** Archivo, variable width 62–125 and weight 300–900 (with 'Arial Narrow', sans-serif)
**Body Font:** Archivo (same family; width 100 for reading)
**Label/Mono Font:** JetBrains Mono 400 / 500 (with ui-monospace, SFMono-Regular, Menlo, monospace)

**Character:** Archivo's width axis is the engineer's lettering hand: tall condensed capitals for the answer, wide tracked caps for table headings and labels. JetBrains Mono is the calculator readout, used for anything that is a number, a date, a stack list or a node in a diagram.

### Hierarchy
- **Display** (850, clamp(44px, 9.5vw, 96px), 0.95, wdth 82, -0.035em): the SOLUTION name on sheet 1, always double-underlined in red pencil. The contact headline uses the same voice at clamp(38px, 6.5vw, 76px), wdth 80.
- **Headline** (850, clamp(34px, 5.4vw, 60px), 1, wdth 82, -0.03em): the subject line in each sheet's title block.
- **Title** (800, clamp(24px, 2.6vw, 30px), 1.1, wdth 90): company names in the work log. **Title small** (750, clamp(20px, 2vw, 24px), 1.2, wdth 92) names each demo system; log entry names sit at 650 / 18px.
- **Body** (400, 16px, 1.6): reading copy. Lead paragraphs run at 17px. Measures are capped per element between 38ch and 70ch (62–68ch for descriptions).
- **Find line** (500, clamp(19px, 2.1vw, 24px), 1.35, max 32ch, balanced): the one-line FIND statement.
- **Label caps** (800, 12–13px, 0.05–0.08em tracking, wdth 120–125, uppercase): toolkit row headings, Problem / Approach / Outcome terms, the chat title.
- **Calc label** (750 italic, 17px, red pencil, trailing period on phones): Given. / Find. / Solution. On desktop it moves into the left margin at 15px, wdth 80, rotated -4deg, as a red-pencil margin note.
- **Data** (JetBrains Mono 400–500, 10–12px, tabular numerals): line numbers, dates, tags, flow boxes, stamps, sheet numbers, title-block cells, figure labels (9.5–12.5px).

### Named Rules
**The Width Axis Rule.** Hierarchy comes from Archivo's width and weight, not from new families. Big lettering goes condensed (wdth 80–92), caps labels and marks go wide (wdth 106–125), reading copy stays at wdth 100.

**The Readout Rule.** If it is a number, date, stack list, file-like label or diagram node, it is set in JetBrains Mono. Prose is never set in mono.

## Layout

The pad is a single centered column: max content width 1180px plus the left margin and right gutter. Mobile-first, with every page breakpoint in `layout.css`.

- **Grid and rhythm:** a 4px base step (`s1`–`s9`: 4, 8, 12, 16, 24, 32, 48, 64, 96px) on top of the drawn 20px grid square. Sheets pad 64px top and bottom on phones, 96px from 768px up.
- **Margin and gutter:** the left margin is 20px on phones and 72px from 768px; the right gutter is 16px then 40px. The margin rule sits 8px inside the margin width. On desktop the margin carries each sheet's number and the rotated GIVEN / FIND / SOLUTION notes.
- **Header height:** 92px on phones (name row plus a horizontally scrolling nav row), 60px from 768px (name, centered nav, tools in one row). Anchor scrolling offsets by header height plus 16px.
- **Breakpoints:** 360px (below it the role line and header Email button hide), 560px (title blocks go side by side; answer actions stop wrapping), 768px (desktop layout: 12-column problem grid, margin notes, wide Fig. 1, sticky log company heads, two-column systems, 5/7 ask grid, 7/5 contact grid), 1100px (wider problem-grid gutter), 1280px (the PROJECT / BY / DATE title-block cells appear in the header).
- **Sheet 1:** phones stack Given, Solution, Answer, Fig. 1. From 768px it is 12 columns: Given 7 / Fig. 1 5 on the first row, Solution 7 / Answer box 5 on the second, bottom-aligned.
- **Sheets:** each sheet ends with a 1.5px graphite rule and opens with a title block (headline plus a short note, separated from content by a 1.5px rule).

## Elevation & Depth

Flat paper. Depth comes from rules, surface steps (`paper` to `paper-2`) and the 1.5px graphite frame, never from lift. There is exactly one shadow in the system, and it is a state response: the sticky header gains a soft drop once the page scrolls past 8px.

### Shadow Vocabulary
- **Header lift** (`box-shadow: 0 6px 18px -10px var(--shadow)`): the sticky pad header when `.is-scrolled`. Nowhere else.

### Named Rules
**The Flat Paper Rule.** Nothing on the pad floats. Panels are framed with a 1.5px graphite line and, at most, set on the one-step-deeper header green. No card shadows, no glows, no gradients used for depth.

## Shapes

Square corners throughout: buttons, icon buttons, inputs, chat panel, flow boxes, stamps and the toolkit dashed box are all 0 radius. The only curves are things a pencil draws: hand-drawn SVG paths for the red answer box and double underlines (non-scaling stroke, round caps, 2.25px and 3px), the loosely circled status note (irregular elliptical radius, rotated -2deg), and round 9–10px legend dots. The focus outline carries a 1px radius.

Line weights are a vocabulary: 1px for row rules and grid, 1.25px for flow boxes and arrows, 1.5px for structure (header, sheets, title blocks, chat frame, buttons, stamps). Dashed lines mean "provisional" or "learning": the dashed red studying box, dashed red legend dot, dashed suggestion chips, dashed figure boundary.

### Named Rules
**The Drawn Not Rounded Rule.** Corners are square unless a pencil drew the shape. A curve must come from an SVG pencil stroke or a hand-circled note, never from `border-radius` on a container.

## Components

### Buttons
Lettered, square and firm, like a stamped action on a form.
- **Shape:** square corners (0), 1.5px border slot, 44px minimum height (36px small).
- **Primary (red pencil):** red fill with `on-red` text, Archivo 650 / 15px at wdth 106, 16px side padding, icon left with an 8px gap.
- **Line:** transparent with a 1.5px graphite border and graphite text; on hover it inverts to a graphite fill with paper text.
- **Hover / Active:** 0.2s color transitions on the `ease-out` curve; red hover deepens (day) or brightens (night); active nudges down 1px.
- **Icon button:** 36px square, 1.5px graphite border, 18px icon, same invert-on-hover. Used for the theme toggle.

### Chips
- **Suggestion chip:** 34px tall, 12px padding, Archivo 550 / 14px, 1.25px dashed graphite-soft border. Hover turns the border solid red and the text red.
- **Stamp:** rubber-stamp label, JetBrains Mono 500 / 11px uppercase, 0.12em tracking, 1.5px red border, rotated 3deg. Marks every demo system as "Demo".
- **Status note:** red-pencil margin note, Archivo 600 italic 13px, loosely circled with a 1.5px red irregular ellipse, rotated -2deg ("shipped", "in progress").

### Cards / Containers
There are no cards. Content sits on the paper between rules.
- **Log entries and systems:** rows separated by 1px margin-rule lines, 16px (log) or 32px (systems) vertical padding.
- **Chat panel:** paper background, 1.5px graphite frame, header strip on `paper-2` with a 1.5px bottom rule, ruled log lines every 28px.
- **Answer box / final box:** 24px padding (32px by 24px for the final box), outlined by a hand-drawn red SVG rectangle that overhangs by 4px.
- **Studying box:** 1.5px dashed red border, 24px padding, max 820px.

### Inputs / Fields
- **Style:** the chat input is borderless and transparent inside the panel's 1.5px top rule, 48px tall, 16px text, red caret, faint-graphite placeholder.
- **Focus:** the whole form gets an inset 2px red ring (`box-shadow: inset 0 0 0 2px var(--red)`); the input's own outline is removed.
- **Disabled:** the send button drops to 45% opacity with a not-allowed cursor.

### Navigation
- **Pad header:** sticky, `paper-2` background, 1.5px graphite bottom rule. Name in Archivo 800 / 17px at wdth 112 with a mono 11px role line beneath. On desktop the header also carries "Sheet n of 6" (mono 12px, the number in red) and, from 1280px, ruled PROJECT / BY / DATE title-block cells.
- **Links:** Archivo 550 / 14px, graphite-soft at rest, graphite on hover; the active section gets graphite text and a 2px red underline, set by IntersectionObserver with `aria-current`.
- **Mobile:** nav drops to a second row under a 1px rule and scrolls horizontally with the scrollbar hidden.

### Signature: GIVEN / FIND / SOLUTION
The first sheet is a worked problem. GIVEN is a numbered list (mono "(1)"–"(6)" line numbers, dashed major-grid separators, each line ending in a red "sh. n" cross-reference to the sheet that proves it). FIND is one balanced line. SOLUTION is the Display name with a red double underline, beside a red pencil box holding "Ans." (wdth 125, red) and the Email / GitHub / LinkedIn buttons.

### Signature: Data-flow strip
Systems and the assistant explainer show their architecture as a row of mono boxes (1.25px graphite border, paper fill, 5px by 8px padding) joined by drawn arrows; `flow-col` stacks it vertically with downward arrows. Each system follows with a Problem / Approach / Outcome definition list in label caps.

### Signature: Fig. 1 and the pencil motion
Fig. 1 is a hand-ruled SVG system diagram (graphite 1.5px strokes, mono labels, dashed Kubernetes boundary) with a wide desktop drawing and a tall phone drawing. On first load, when motion is allowed, the strokes draw in sequence (0.9s, `ease-out`, 0.09s stagger), labels ink in, then the double underline and the answer box are drawn (from 1.25s). Content is fully visible without JS and under `prefers-reduced-motion`, which also disables smooth scrolling and all transitions.

### Icons
One inline SVG symbol sprite (arrow, external, mail, sun, moon, send) on a 24px viewBox, rendered at 1.1em with no fill, a 1.75 currentColor stroke and round caps and joins. Icons inherit text color; the mail icon in the final box is red.

## Do's and Don'ts

### Do:
- **Do** take every color from the `base.css` custom properties and define both a day value and a night value for anything new.
- **Do** reserve red pencil for answers, primary actions, annotations, cross-references, status and the active or focused state.
- **Do** set numbers, dates, stack lists, diagram nodes and sheet numbers in JetBrains Mono with tabular numerals.
- **Do** build hierarchy with Archivo's width axis: condensed (wdth 80–92) for big lettering, wide (wdth 106–125) for caps labels.
- **Do** separate content with rules: 1px margin-rule lines between rows, 1.5px graphite lines for structure.
- **Do** show architecture as boxes joined by arrows, and outcomes as Problem / Approach / Outcome.
- **Do** label demo work with the red "Demo" stamp, and keep every new section a numbered sheet with a title block.
- **Do** keep content visible by default and run drawing motion only when `prefers-reduced-motion` allows it.
- **Do** keep tap targets at 44px for primary buttons and at least 32px for inline links.

### Don't:
- **Don't** add rounded cards, gradients used for depth, glows or drop shadows. The header's scroll shadow is the only shadow.
- **Don't** round container corners. Curves come only from pencil-drawn SVG strokes, circled notes and legend dots.
- **Don't** use red for body text, headings or decoration that nobody would circle or click.
- **Don't** add font families. Archivo and JetBrains Mono cover every role.
- **Don't** use icon fonts or emoji as icons. Use the inline 1.75-stroke SVG sprite.
- **Don't** hardcode hex or rgba outside `base.css`.
