# Ankit Shilarkar — Portfolio

> Java · Spring Boot · Azure · Microservices · React Native

Live at: **https://ankit-shilarkar.github.io/portfolio**

---

## 🗂 Structure

```
portfolio/
├── index.html                    ← Entry point
├── src/
│   ├── css/
│   │   ├── base.css              ← Variables, reset, typography, buttons
│   │   ├── layout.css            ← Nav, hero, sections, grids, footer
│   │   ├── components.css        ← Cards, timeline, skills, contact
│   │   └── chat.css              ← Chatbot widget
│   ├── js/
│   │   ├── theme.js              ← Dark/light mode toggle
│   │   ├── chat.js               ← AI chatbot + RAG knowledge base
│   │   └── animations.js         ← Scroll reveals, nav effects
│   └── components/               ← Section HTML partials (reference)
│       ├── nav.html
│       ├── hero.html
│       ├── about.html
│       ├── experience.html
│       ├── skills.html
│       ├── projects.html
│       ├── chat.html
│       └── contact.html
├── .claude/
│   ├── agents/
│   │   ├── code-reviewer.md      ← Reviews HTML/CSS/JS before commits
│   │   ├── content-updater.md    ← Updates content when experience changes
│   │   └── debugger.md           ← Debugs visual/functional issues
│   ├── commands/
│   │   ├── update-experience.md  ← /update-experience [company] [role] ...
│   │   ├── add-project.md        ← /add-project [name] [stack] [desc]
│   │   ├── update-chatbot-kb.md  ← /update-chatbot-kb [topic] [info]
│   │   └── deploy.md             ← /deploy [optional commit message]
│   ├── hooks/
│   │   ├── pre-commit.sh         ← Blocks commits with API keys, missing files
│   │   └── lint-on-save.sh       ← Warns on console.log, hardcoded colors
│   ├── rules/
│   │   ├── html.md               ← HTML standards (accessibility, links)
│   │   ├── css.md                ← CSS rules (variables, dark mode, file ownership)
│   │   └── javascript.md         ← JS rules (security, escaping, no keys)
│   ├── skills/
│   │   └── portfolio-design/
│   │       └── SKILL.md          ← Design system (colors, typography, patterns)
│   └── settings.json             ← Claude Code permissions + hooks config
├── .github/
│   └── workflows/
│       └── deploy.yml            ← CI/CD → GitHub Pages
├── CLAUDE.md                     ← Project brain (loaded every Claude session)
├── .gitignore
└── README.md
```

---

## 🚀 Deploy to GitHub Pages (free)

### One-time setup:
```bash
# 1. Create repo on GitHub: ankit-shilarkar/portfolio
git init
git remote add origin https://github.com/ankit-shilarkar/portfolio.git

# 2. Push
git add -A
git commit -m "feat: initial portfolio"
git push -u origin main

# 3. Enable GitHub Pages
# Go to: repo → Settings → Pages → Source: GitHub Actions
# Live in ~60 seconds at: https://ankit-shilarkar.github.io/portfolio
```

### Every update:
```bash
git add -A
git commit -m "content: [what you changed]"
git push origin main
# GitHub Actions handles the rest
```

---

## 🤖 Chatbot

The chatbot uses **Claude (Anthropic API) + simulated RAG**:

1. Your query is scored against labeled knowledge chunks about Ankit
2. Top-k matching chunks are injected as context into Claude's system prompt
3. Claude answers grounded in that context

### Update knowledge base:
Edit `KNOWLEDGE_CHUNKS` in `src/js/chat.js` — add/update chunks when Ankit ships new projects or changes roles.

### Change passcode:
```js
// In browser console, generate new hash:
crypto.subtle.digest('SHA-256', new TextEncoder().encode('YOUR_NEW_PASSCODE'))
  .then(b => console.log(Array.from(new Uint8Array(b)).map(x=>x.toString(16).padStart(2,'0')).join('')))
// Paste result into PASSCODE_HASH in src/js/chat.js
```

### Upgrade roadmap:
| Phase | Architecture |
|-------|-------------|
| 1 (now) | Keyword scoring → Claude API |
| 2 | Real embeddings → pgvector / Pinecone / Qdrant |
| 3 | Mamba/SSM when stable → linear-complexity retrieval |

---

## 🛠 Local Dev

```bash
# Option 1: Python server (no install needed)
python3 -m http.server 3000
# Open: http://localhost:3000

# Option 2: Node serve
npx serve . -p 3000

# Validate HTML
npx html-validate index.html

# Check for issues
npx linkinator http://localhost:3000
```

---

## 📋 Claude Code Commands

```bash
/update-experience "Company" "Role" "Start Date" "Description of work"
/add-project "Project Name" "real|demo" "stack, items" "description" "github-url"
/update-chatbot-kb "topic" "new information"
/deploy "optional commit message"
/pr-review "branch-name or PR description"
```

## 🤖 Claude Agents

| Agent | Trigger |
|-------|---------|
| `code-reviewer` | Before every commit — checks HTML, CSS, JS, security |
| `content-updater` | When experience/projects change |
| `debugger` | When something looks broken |
| `test-writer` | Before any deploy — generates QA checklist |
| `refactorer` | Periodic cleanup — removes duplication, enforces vars |
| `doc-writer` | After code changes — keeps README + CLAUDE.md in sync |
| `security-auditor` | Periodic + before major releases |

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| `--orange` | `#E8622A` — Primary accent |
| `--teal` | `#2AB8A0` — Live/active states |
| `--indigo` | `#4A5FC4` — Azure/cloud |
| `--yellow` | `#F2B227` — In-progress |
| `--rose` | `#D94F7A` — New features |
| Display font | Cabinet Grotesk 900 |
| Italic accent | Instrument Serif 400 italic |
| Body | DM Sans 400/500 |
