---
name: update-experience
argument-hint: "[company] [role] [start-date] [description of work]"
---

Add or update work experience in the portfolio:

1. Parse $ARGUMENTS to extract: company name, role, start date, list of projects/work done.

2. Run the `content-updater` agent to:
   - Update the Work log sheet (`#work`) in `index.html` — one `<article class="log-co">` per company
   - Update the GIVEN list and the SOLUTION line on sheet 1 (`#top`) if the primary employer changed
   - Sync `KNOWLEDGE_CHUNKS` in `src/js/knowledge.js`

3. Preview all changes before committing.

4. Commit with message: "content: add experience at [company]"

Example usage: /update-experience "Burger Singh" "Principal Engineer, Software Development" "Feb 25 2026" "Azure Functions timer+http, Employee onboarding portal with Aadhaar, React Native Expo app ownership, Cloud telephony middleware app, Store locator with Google Maps, LLM-assisted development"
