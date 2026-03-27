# Portfolio Brain — Ankit Shilarkar

## Project Overview
Static portfolio site for Ankit Shilarkar, a Java/Spring Boot backend engineer.
Hosted free on GitHub Pages. No build step — plain HTML/CSS/JS.

## Stack
- HTML5 + CSS3 + Vanilla JS (no frameworks, no bundler)
- Cabinet Grotesk + Instrument Serif + DM Sans (Google Fonts)
- Anthropic Claude API (chatbot — proxied via backend in production)
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
│   ├── js/
│   │   ├── theme.js        ← Dark/light mode toggle + persistence
│   │   ├── chat.js         ← Chatbot logic + RAG context + Claude API
│   │   └── animations.js   ← Scroll reveals, micro-interactions
│   └── components/
│       ├── nav.html        ← Navigation markup
│       ├── hero.html       ← Hero section
│       ├── about.html      ← About + mini cards
│       ├── experience.html ← Timeline (Burger Singh + Netlink)
│       ├── skills.html     ← Skill grid
│       ├── projects.html   ← Project cards
│       ├── chat.html       ← Chatbot section + widget
│       └── contact.html    ← Contact + CTA
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
- Dark mode is default; light mode is opt-in via [data-theme="light"] on <html>
- Mobile-first: base styles for mobile, @media (min-width: 768px) for desktop
- No jQuery, no lodash — vanilla JS only
- Chatbot context lives in src/js/chat.js → ANKIT_CONTEXT constant
  Update this whenever Ankit changes jobs, ships projects, or updates skills
- All section HTML is in src/components/ — index.html just includes them via fetch

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

## Chatbot Architecture (Current — RAG Simulation)
The chatbot uses a hand-crafted knowledge base (ANKIT_CONTEXT in chat.js).
This simulates RAG by pre-loading the most relevant context about Ankit.

### Planned Upgrade Path:
1. NOW: Static context string → Claude API (works, no server needed)
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
