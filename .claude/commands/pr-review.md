---
name: pr-review
argument-hint: "[branch-name or PR description]"
---

Review changes before merging to main:

1. Get the diff: `git diff main...$ARGUMENTS` (or `git diff HEAD~1` if on the branch)

2. Run the `code-reviewer` agent on all changed files.
   - CRITICAL findings → must fix before merge, list them explicitly
   - WARNING findings → should fix, but won't block

3. Run the `security-auditor` agent, scoped to changed files only.
   - Any CRITICAL or HIGH finding → block merge

4. Run the `test-writer` agent to generate a test checklist for the changed feature.
   - Manually verify each item before approving

5. Check content accuracy:
   - If `experience.html` changed: verify dates are correct (Burger Singh: Feb 25 2026, Netlink: Apr 2024 – Feb 3 2026)
   - If `chat.js` changed: verify KNOWLEDGE_CHUNKS covers the new content
   - If links changed: verify URLs are live (GitHub, LinkedIn, email)

6. Summary report:
   ```
   PR: [description]
   Files changed: N
   CRITICAL issues: N (list)
   Warnings: N (list)
   Test checklist: [attached]
   Decision: APPROVE / REQUEST CHANGES
   ```
