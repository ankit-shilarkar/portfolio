---
name: add-project
argument-hint: "[project name] [type: real|demo] [tech stack] [description] [github-url]"
---

Add a new project to the Systems sheet of the portfolio:

1. Parse $ARGUMENTS: project name, type (real/demo), tech stack (comma-separated), description, GitHub URL.

2. Add a new `<article class="sys">` inside `.sys-grid` in `index.html` (sheet 3, `#systems`):
   - `.sys-head` with `<h3 class="sys-name">Name: short purpose</h3>` and `<span class="stamp">Demo</span>`
     (use `Shipped` for real/employer work — never label a demo as production)
   - `<ol class="flow">` with 3–5 `<li>` boxes showing the data flow (left → right)
   - One plain paragraph (what it does, the interesting decisions). No invented metrics.
   - `<p class="tags">` with the stack separated by ` · `
   - `.sys-link` to the GitHub repo if provided (`target="_blank" rel="noopener noreferrer"`)
   - Use `sys sys-wide` for a flagship project with Problem / Approach / Outcome (`<dl class="pao">`)

3. Add a chunk to `KNOWLEDGE_CHUNKS` in `src/js/knowledge.js`
   - id: kebab-case project name
   - tags: project name words + tech stack terms (lower-case)
   - text: project description + highlights, stating whether it is a demo

4. Commit: "content: add project [project name]"
