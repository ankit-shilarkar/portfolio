---
name: update-experience
argument-hint: "[company] [role] [start-date] [description of work]"
---

Add or update work experience in the portfolio:

1. Parse $ARGUMENTS to extract: company name, role, start date, list of projects/work done.

2. Run the `content-updater` agent to:
   - Update `src/components/experience.html`
   - Update `src/components/about.html`
   - Sync `src/js/chat.js` KNOWLEDGE_CHUNKS
   - Update hero section if it's a new primary employer

3. Preview all changes before committing.

4. Commit with message: "content: add experience at [company]"

Example usage: /update-experience "Burger Singh" "Software Engineer" "Feb 25 2026" "Azure Functions timer+http, Employee onboarding portal with Aadhaar, React Native Expo app handover, Cloud telephony middleware app, Store locator with Google Maps, LLM-assisted development with Claude/GPT/Gemini"
