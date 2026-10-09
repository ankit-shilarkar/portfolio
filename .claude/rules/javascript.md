---
paths:
  - "src/js/*.js"
---

# JavaScript Rules

## General
- Vanilla JS only — no jQuery, no lodash, no frameworks
- Use IIFEs `(function(){})()` for modules that don't need to expose globals
- Expose only what `index.html` needs globally: `sendSuggestion()`, `sendMessage()`
- No `var` — use `const` and `let` only
- Prefer `document.addEventListener('DOMContentLoaded', ...)` over inline event handlers

## theme.js
- localStorage key is `'portfolio-theme'` — DO NOT change (breaks saved preferences)
- Default theme follows the OS (`prefers-color-scheme`); explicit choice persists
- Must run before DOMContentLoaded to prevent flash of wrong theme
- Icon: SVG sun/moon swapped by CSS from `data-theme`

## chat.js
- `KNOWLEDGE_CHUNKS` in `knowledge.js` is the source of truth for chatbot knowledge
  - Keep in sync with index.html
  - Every new project at Burger Singh needs a chunk entry
  - Every new skill cluster needs relevant tags added to existing chunks
- No passcode gate: quota is protected by the Worker's per-IP rate limit and a per-visit question cap (`maxQuestionsPerSession`)
- History is capped at `maxHistoryTurns` (10) turns — prevents context overflow
- Never log user messages to console in production
- `escapeHtml()` MUST be called on all user input before inserting into DOM
- The browser calls only the Worker (`CHAT_CONFIG.endpoint` + `/chat`); Gemini is called from `worker/src/index.js`. Keep the `__CHAT_ENDPOINT__` placeholder
- Retrieval and the system prompt live in `retrieval.js` (UMD) — change them there so page and Worker stay in sync
- `knowledge.js` must stay loadable both as a browser script and via `module.exports` (the Worker imports it)

## animations.js
- One signature moment (pencil-drawing the problem sheet); no generic scroll reveals
- Content is visible without JS; motion is skipped under `prefers-reduced-motion`
- Must be the LAST script loaded (after theme.js and chat.js)

## Error Handling
- All `fetch()` calls must have try/catch
- API errors should show a friendly message pointing to Ankit's email
- Never surface raw error messages to users

## Security
- `escapeHtml()` on all user-generated content before DOM insertion
- No `eval()`, no `innerHTML` with raw user input
- Model output is escaped before minimal formatting (bold, bullets, https links)
