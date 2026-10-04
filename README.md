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
│       ├── chat-config.js        ← Chatbot settings (key injected at deploy)
│       ├── chat.js               ← Retrieval + Gemini + notes-mode fallback
│       └── animations.js         ← Pencil-drawing intro, nav state
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

The "Ask about Ankit" assistant uses **retrieval + Google Gemini (free tier)**:

1. The question is scored against labeled knowledge chunks in `src/js/knowledge.js`
2. The top 3 chunks become Gemini's system instruction
3. Gemini answers grounded in those notes. With no key, quota hit or an error, it answers straight from the notes ("notes mode")

### Turn on Gemini (one time):
1. Create a free key at https://aistudio.google.com/apikey
2. In Google Cloud Console → Credentials, restrict it to the **Generative Language API** and the referrer `https://ankit-shilarkar.github.io/*`
3. GitHub repo → Settings → Secrets and variables → Actions → New secret `GEMINI_API_KEY`
4. Push to `main` — the deploy job writes the key into the deployed `chat-config.js`. Never commit it.

### Teach it something new:
Add or edit a chunk in `src/js/knowledge.js` (`id`, `tags`, `text`), commit and push. Facts only.

### Upgrade roadmap:
| Phase | Architecture |
|-------|-------------|
| 1 (now) | Keyword scoring → Gemini |
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
