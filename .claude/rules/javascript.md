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
- Default theme is `'dark'`
- Must run before DOMContentLoaded to prevent flash of wrong theme
- Icon: dark mode → show ☀️ (to switch to light), light mode → show 🌙 (to switch to dark)

## chat.js
- `KNOWLEDGE_CHUNKS` is the source of truth for chatbot knowledge
  - Keep in sync with experience.html and about.html
  - Every new project at Burger Singh needs a chunk entry
  - Every new skill cluster needs relevant tags added to existing chunks
- `PASSCODE_HASH` — CHANGE before going live. Default is for development only.
  - Never store plaintext passcode in source code
  - To regenerate hash: see comment in chat.js header
- `chatHistory` is capped at `MAX_HISTORY` (10) turns — prevents context overflow
- Never log user messages to console in production
- `escapeHtml()` MUST be called on all user input before inserting into DOM
- API calls go to `https://api.anthropic.com/v1/messages` — never commit API keys

## animations.js
- Uses IntersectionObserver — no scroll event listeners (performance)
- Injects its own `<style>` tag for `.reveal` — keep styles minimal
- Must be the LAST script loaded (after theme.js and chat.js)

## Error Handling
- All `fetch()` calls must have try/catch
- API errors should show a friendly message pointing to Ankit's email
- Never surface raw error messages to users

## Security
- `escapeHtml()` on all user-generated content before DOM insertion
- No `eval()`, no `innerHTML` with raw user input
- Auth: passcode is hashed with SHA-256 client-side — never transmitted
