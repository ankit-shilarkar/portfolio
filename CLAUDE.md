# Portfolio Brain — Ankit Shilarkar

## Project Overview
Static portfolio site for Ankit Shilarkar, a Java/Spring Boot backend engineer.
Hosted free on GitHub Pages. No build step — plain HTML/CSS/JS.

## Stack
- HTML5 + CSS3 + Vanilla JS (no frameworks, no bundler)
- Archivo (variable width) + JetBrains Mono (Google Fonts)
- Google Gemini API (chatbot, free tier) behind a Cloudflare Worker (`worker/`) that holds the key
- impeccable design context: `PRODUCT.md`, `DESIGN.md`, `.impeccable/`
- GitHub Pages (hosting)

## File Structure
```
portfolio/
├── index.html              ← Entry point, assembles all sections
├── src/
│   ├── css/
│   │   ├── base.css        ← Variables, reset, typography
│   │   ├── layout.css      ← Nav, sections, grid, footer
│   │   ├── components.css  ← Cards, badges, buttons, pills
│   │   └── chat.css        ← Chatbot widget styles
│   └── js/
│       ├── theme.js        ← Day/night pad toggle + persistence
│       ├── knowledge.js    ← Chatbot knowledge base (KNOWLEDGE_CHUNKS) — "train" the bot here
│       ├── retrieval.js    ← Shared retrieval + prompt (used by the page AND the Worker)
│       ├── chat-config.js  ← Chatbot settings; Worker URL placeholder replaced at deploy
│       ├── chat.js         ← Calls the Worker; notes-mode fallback
│       └── animations.js   ← Signature pencil drawing, nav state
├── worker/                 ← Cloudflare Worker for the chatbot (see worker/README.md)
├── PRODUCT.md              ← Product truth (impeccable)
├── DESIGN.md               ← Visual system (impeccable)
├── .claude/
│   ├── agents/             ← AI specialist agents
│   ├── commands/           ← Custom slash commands
│   ├── hooks/              ← Pre/post action rules
│   ├── rules/              ← Context-aware instructions
│   ├── skills/             ← Situational intelligence
│   └── settings.json       ← Permissions + hooks config
└── .github/
    └── workflows/
        └── deploy.yml      ← CI/CD → GitHub Pages
```

## Commands
```bash
# Local dev — open index.html in browser, no server needed
open index.html

# Or use a local server for fetch() to work (chat.js needs it)
npx serve . -p 3000
python3 -m http.server 3000

# Validate HTML
npx html-validate index.html

# Lint CSS
npx stylelint "src/css/*.css"

# Check links
npx linkinator index.html
```

## Conventions
- CSS custom properties (variables) for ALL colors and spacing — never hardcode
- Visual world is "The Computation Pad" (see DESIGN.md): green grid paper, graphite ink,
  red pencil for answers/actions. No rounded cards, gradients, glows or emoji icons.
- Theme follows the OS on first visit; choice persists. Night pad = [data-theme="dark"] on <html>
- Mobile-first: base styles for mobile, @media (min-width: 768px) for desktop; breakpoints live in layout.css
- No jQuery, no lodash — vanilla JS only
- Chatbot knowledge lives in src/js/knowledge.js → KNOWLEDGE_CHUNKS
  Update this whenever Ankit changes jobs, ships projects, or updates skills
- index.html is the single source of all section markup (one sheet per section)
- Personal projects are always labeled Demo; never invent metrics or claims
- Sheets: 1 Problem · 2 Now · 3 Work log · 4 Case studies · 5 Systems · 6 Toolkit · 7 Notes · 8 Ask · 9 Contact.
  Adding/removing a sheet means updating `data-sheet`, "Sheet n of N" in the header and the GIVEN `sh. n` cross-references

## Update cadence
- Weekly: `/update-now`, `/add-til`, review Worker `/misses` → `/update-chatbot-kb`
- Monthly: Work log status notes, demo project progress
- Quarterly: `/add-case-study`, re-rate Toolkit skills, résumé
- 6-monthly: GIVEN facts, impeccable audit, Gemini model name in worker/wrangler.toml
- Yearly: footer year, PRODUCT.md review, rotate Gemini key + Cloudflare token

## Agents (`.claude/agents/`)
| Agent | Purpose |
|-------|---------|
| `code-reviewer` | Reviews HTML/CSS/JS for bugs, accessibility, security before commits |
| `content-updater` | Updates experience, about, chatbot KB when Ankit changes jobs/ships projects |
| `debugger` | Diagnoses visual, functional, and chatbot issues with exact file+line fixes |
| `test-writer` | Generates QA checklists for features — visual, chatbot, links, responsive |
| `refactorer` | Removes duplication, enforces CSS variables, cleans up JS |
| `doc-writer` | Keeps README, CLAUDE.md, and inline comments in sync with code |
| `security-auditor` | Audits for XSS, API key exposure, auth weaknesses, unsafe deps |

## Commands (`.claude/commands/`)
| Command | Usage |
|---------|-------|
| `/update-experience` | `/update-experience "Company" "Role" "Date" "Description"` |
| `/add-project` | `/add-project "Name" "real\|demo" "stack" "desc" "github-url"` |
| `/update-chatbot-kb` | `/update-chatbot-kb "topic" "new info"` |
| `/update-now` | Weekly — refresh the Now sheet (Building / Studying / Looking for) |
| `/add-til` | Weekly — add a "Notes to self" entry |
| `/add-case-study` | Quarterly — add a Given/Find/Working/Result case study |
| `/deploy` | `/deploy "optional commit message"` |
| `/pr-review` | `/pr-review "branch-name or PR description"` |

## Chatbot Architecture (Current — keyword RAG + Gemini via Cloudflare Worker)
Browser → `POST {CHAT_ENDPOINT}/chat` → Worker scores the question against KNOWLEDGE_CHUNKS
(retrieval.js) → top-3 chunks become Gemini's system instruction → grounded answer.
No endpoint, rate limit (10/min/IP), quota or network error → "notes mode" in the browser shows
the best-matching chunk directly. 20 model questions per visit (sessionStorage).
Unanswered questions are logged to KV (`GET /misses`, admin token) so the KB keeps growing.

Setup: worker/README.md. Secrets `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, `GEMINI_API_KEY`,
optional `CHAT_ADMIN_TOKEN`; repository variable `CHAT_ENDPOINT` = the Worker URL.
The Gemini key never reaches the browser or the repo — CI fails on `AIza…` strings.

### Planned Upgrade Path:
1. NOW: Keyword retrieval → Gemini behind a Cloudflare Worker
2. NEXT: Real RAG — embed context chunks, vector search on query, pass top-k to Claude
   - Embeddings: Anthropic text-embeddings-3 or OpenAI ada-002
   - Vector DB: pgvector (cheapest), Pinecone (easiest), Qdrant (self-hosted)
   - Backend: Cloudflare Workers or Vercel Edge Functions (free tier)
3. FUTURE: When Mamba/state-space models stabilize → swap transformer backbone
   - Mamba-2 or RWKV for linear-complexity context handling
   - No attention = no quadratic scaling on long context windows

## Auth Model (Planned)
Simple JWT-based auth to protect the /admin route where Ankit can:
- Add new projects, update skills, write new experience entries
- Knowledge base auto re-embeds on save (triggers re-index webhook)

## Deployment
Push to main → GitHub Actions → GitHub Pages → live in ~60s (.github/workflows/deploy.yml)
Changes to worker/, knowledge.js or retrieval.js also redeploy the Worker (.github/workflows/worker.yml)
