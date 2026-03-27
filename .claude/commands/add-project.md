---
name: add-project
argument-hint: "[project name] [type: real|demo] [tech stack] [description] [github-url]"
---

Add a new project card to the portfolio:

1. Parse $ARGUMENTS: project name, type (real/demo), tech stack (comma-separated), description, GitHub URL.

2. Determine card color class:
   - Backend/Java projects → c-o (orange)
   - Cloud/DevOps projects → c-t (teal)  
   - Architecture/System design → c-i (indigo)
   - Mobile/Frontend projects → c-r (rose)

3. Add new `.proj-card` to `src/components/projects.html`
   - Include proj-type-row with type badge (real = teal, demo = yellow)
   - Add tech stack pills
   - Write 3-4 bullet point highlights from the description
   - Add GitHub link if provided

4. Add a new KNOWLEDGE_CHUNK to `src/js/chat.js`
   - id: kebab-case project name
   - tags: project name words + tech stack terms
   - text: project description + highlights

5. Commit: "content: add project [project name]"
