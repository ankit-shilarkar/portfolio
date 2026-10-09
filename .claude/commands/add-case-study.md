---
name: add-case-study
argument-hint: "[company · project] [title] [given] [find] [working] [result] [stack]"
---

Add a case study to **Problems I've worked** (`#cases`, sheet 4 in `index.html`) — quarterly.

1. Parse $ARGUMENTS. Ask Ankit for any missing part — never invent numbers, outcomes or context. Real numbers (latency, cost, incident counts) make the strongest case studies; include them only if he gives them.
2. Insert a new `<article class="case">` at the TOP of `.cases`:
   ```html
   <article class="case">
     <header class="case-head">
       <p class="case-where">Company · Project or year</p>
       <h3 class="case-title">The problem, as a plain title</h3>
     </header>
     <dl class="case-calc">
       <div><dt>Given</dt><dd>The situation and constraints.</dd></div>
       <div><dt>Find</dt><dd>What had to be true at the end.</dd></div>
       <div><dt>Working</dt><dd>What he did and why (decisions, trade-offs).</dd></div>
       <div class="case-ans"><dt>Result</dt><dd>The outcome, measured if possible.</dd></div>
     </dl>
     <p class="tags">Tech · Tech</p>
   </article>
   ```
3. Keep at most 5 case studies on the page; the oldest/weakest goes.
4. Add the case to the `case-studies` chunk in `src/js/knowledge.js`.
5. Commit: "content: case study — [title]".
