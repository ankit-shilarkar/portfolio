---
name: add-til
argument-hint: "[title] [what you learned, 1–3 sentences] [tags, comma-separated]"
---

Add an entry to **Notes to self** (`#notes`, sheet 7 in `index.html`) — weekly.

1. Parse $ARGUMENTS: title, body, tags.
2. Insert a new `<li class="til-item">` as the FIRST child of `<ol class="til" reversed>`:
   ```html
   <li class="til-item">
     <time class="til-date" datetime="YYYY-MM-DD">DD Mon YYYY</time>
     <div class="til-body">
       <h3 class="til-title">Title as a plain statement</h3>
       <p>1–3 sentences. Wrap code, commands and config in <code>…</code>.</p>
       <p class="tags">Tag · Tag</p>
     </div>
   </li>
   ```
3. Keep the newest 10 entries on the page; move older ones out of the HTML (they stay in git history).
4. Add a one-line bullet for it to the `til-notes` chunk in `src/js/knowledge.js` (drop bullets for entries that left the page) and add 1–2 lower-case tags.
5. Check the fact is technically correct before committing. Commit: "content: TIL — [title]".
