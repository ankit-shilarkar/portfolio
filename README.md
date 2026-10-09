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
│   │   ├── base.css              ← Tokens, reset, grid-paper ground, buttons
│   │   ├── layout.css            ← Pad header, sheets, grids, footer, breakpoints
│   │   ├── components.css        ← Problem sheet, work log, systems, toolkit, contact
│   │   └── chat.css              ← Chatbot widget
│   └── js/
│       ├── theme.js              ← Day/night pad toggle
│       ├── knowledge.js          ← Chatbot knowledge base (edit to "train" it)
│       ├── retrieval.js          ← Shared retrieval (page + Worker)
│       ├── chat-config.js        ← Chatbot settings (Worker URL injected at deploy)
│       ├── chat.js               ← Calls the Worker + notes-mode fallback
│       └── animations.js         ← Pencil-drawing intro, nav state
├── worker/                       ← Cloudflare Worker for the chatbot
├── PRODUCT.md                    ← Product truth (impeccable)
├── DESIGN.md                     ← Visual system (impeccable)
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

The "Ask about Ankit" assistant = **retrieval + Google Gemini behind a Cloudflare Worker**:

1. The page sends the question to the Worker (`worker/`)
2. The Worker scores it against `src/js/knowledge.js` (shared `src/js/retrieval.js`) and passes the top 3 notes to Gemini
3. The answer comes back grounded in those notes. The Gemini key is a Cloudflare secret — never in the browser or the repo
4. No Worker configured, rate-limited or down → the page answers straight from the notes ("notes mode")

**Setup (one time, free):** follow [`worker/README.md`](worker/README.md) — Cloudflare token + Gemini key as GitHub secrets, run the Worker workflow, then set the `CHAT_ENDPOINT` repository variable.

### Teach it something new:
Add or edit a chunk in `src/js/knowledge.js` (`id`, `tags`, `text`), commit and push — the site and the Worker both redeploy. With the optional KV log, `GET /misses` lists the questions it couldn't answer so you know what to add.

### Upgrade roadmap:
| Phase | Architecture |
|-------|-------------|
| 1 (now) | Keyword scoring → Gemini via Cloudflare Worker |
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
/update-now "building: …" "studying: …"
/add-til "title" "what I learned" "tags"
/add-case-study "company · project" "title" "given" "find" "working" "result" "stack"
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

"The Computation Pad": the site is a worked engineering problem on green grid paper —
GIVEN → FIND → SOLUTION, then numbered sheets. Full tokens and rules in `DESIGN.md`.

| Token | Role |
|-------|------|
| `--paper` / `--grid` | Pad ground and 20px grid |
| `--ink` / `--ink-2` / `--ink-3` | Graphite text levels |
| `--red` | Red pencil: answers, primary actions, status notes |
| `--rule` | Margin rule and dividers |
| Lettering | Archivo (variable width) |
| Data / labels | JetBrains Mono |
