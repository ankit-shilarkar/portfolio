---
name: update-now
argument-hint: "[building: ...] [studying: ...] [looking for: ...]"
---

Refresh the **Now** sheet (`#now`, sheet 2 in `index.html`) — weekly.

1. Parse $ARGUMENTS into the three columns: Building, Studying, Looking for. Any column not mentioned stays as it is.
2. Edit the `<ul class="now-list">` of each changed column. Each item: `<li><strong>Short name.</strong> One plain sentence.</li>`. Max 5 items per column.
3. Set the date in the title block: `<time datetime="YYYY-MM-DD" class="tb-date">D Mon YYYY</time>` to today.
4. Update the `now` chunk in `src/js/knowledge.js` to match (same facts, plain text, include the date).
5. If something under Building shipped, also update its status note in the Work log (`/update-experience`).
6. Never invent facts. Commit: "content: update Now sheet (YYYY-MM-DD)".
