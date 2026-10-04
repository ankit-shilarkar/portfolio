# Portfolio Brain — Ankit Shilarkar

## Project Overview
Static portfolio site for Ankit Shilarkar, a Java/Spring Boot backend engineer.
Hosted free on GitHub Pages. No build step — plain HTML/CSS/JS.

## Stack
- HTML5 + CSS3 + Vanilla JS (no frameworks, no bundler)
- Archivo (variable width) + JetBrains Mono (Google Fonts)
- Google Gemini API (chatbot — free tier; key injected at deploy time from the `GEMINI_API_KEY` secret)
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
│       ├── chat-config.js  ← Chatbot settings; key placeholder replaced at deploy
│       ├── chat.js         ← Retrieval + Gemini call + notes-mode fallback
│       └── animations.js   ← Signature pencil drawing, nav state
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
| `/deploy` | `/deploy "optional commit message"` |
| `/pr-review` | `/pr-review "branch-name or PR description"` |

## Chatbot Architecture (Current — keyword RAG + Gemini)
Question → keyword/tag scoring over KNOWLEDGE_CHUNKS (knowledge.js) → top-3 chunks become
Gemini's system instruction → grounded answer. No key, quota hit or network error → "notes mode"
shows the best-matching chunk directly. 20 model questions per visit (sessionStorage).

Key setup: repo Settings → Secrets → Actions → `GEMINI_API_KEY`. In Google Cloud Console restrict
the key to the Generative Language API and the referrer `https://ankit-shilarkar.github.io/*`.
Never commit the key — CI fails on `AIza…` strings.

### Planned Upgrade Path:
1. NOW: Keyword retrieval → Gemini (works, no server needed)
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
Push to main → GitHub Actions → gh-pages branch → live in ~60s
See .github/workflows/deploy.yml
