---
name: deploy
argument-hint: "[optional: commit message]"
---

Deploy the portfolio to GitHub Pages:

1. Run pre-commit checks via `.claude/hooks/pre-commit.sh`
   - If any check fails, STOP and report what needs fixing

2. Validate HTML: `npx html-validate index.html`
   - Fix any CRITICAL errors before proceeding

3. Check for console.log left in JS:
   - `grep -r "console.log" src/js/` → flag any found

4. Stage all changes: `git add -A`

5. Commit with message: $ARGUMENTS or "deploy: update portfolio $(date '+%Y-%m-%d')"

6. Push to main: `git push origin main`
   - GitHub Actions picks this up → deploys to gh-pages branch automatically
   - Live at: https://ankit-shilarkar.github.io/portfolio (or custom domain)

7. Confirm push succeeded and report the live URL.
