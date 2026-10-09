# portfolio-chat — Cloudflare Worker

Backend for the "Ask about Ankit" assistant. The browser sends the question
here; the Worker picks the best notes from `src/js/knowledge.js` (same
`src/js/retrieval.js` the page uses), asks Gemini with a **server-side key**,
and returns a grounded answer.

| Route | What it does |
|-------|--------------|
| `POST /chat` `{ question, history? }` | Answer → `{ answer, grounded, sources }` |
| `GET /health` | `{ ok, model, kb, configured }` |
| `GET /misses` + `Authorization: Bearer <ADMIN_TOKEN>` | Questions the notes couldn't answer (needs the `CHAT_LOG` KV) |

Guards: CORS allow-list (`ALLOWED_ORIGINS`), 10 questions/min per IP
(`LIMITER`), 300-char questions, 10-turn history, and the system prompt is
built server-side, so the endpoint is useless as a general Gemini proxy.

## One-time setup (≈10 minutes, all free tier)

1. **Cloudflare account** → https://dash.cloudflare.com/sign-up (free).
   Note your **Account ID** (Workers & Pages → right sidebar).
2. **API token** → My Profile → API Tokens → Create Token →
   template **"Edit Cloudflare Workers"** → Create. Copy it.
3. **Gemini key** → https://aistudio.google.com/apikey (free tier).
   It lives only in Cloudflare now; restricting it to the Generative
   Language API is still good practice.
4. **GitHub repo → Settings → Secrets and variables → Actions → Secrets**:
   - `CLOUDFLARE_API_TOKEN` — from step 2
   - `CLOUDFLARE_ACCOUNT_ID` — from step 1
   - `GEMINI_API_KEY` — from step 3
   - `CHAT_ADMIN_TOKEN` — optional, any long random string (for `/misses`)
5. **Actions → "Deploy Chat Worker to Cloudflare" → Run workflow.**
   The log prints the URL, e.g. `https://portfolio-chat.<subdomain>.workers.dev`.
6. **Settings → Secrets and variables → Actions → Variables** → new variable
   `CHAT_ENDPOINT` = that URL. Re-run "Deploy Portfolio to GitHub Pages"
   (or push anything). The chat header switches from "notes mode" to
   "Gemini · grounded".

### Optional: learn from unanswered questions

```bash
cd worker
npx wrangler login
npx wrangler kv namespace create CHAT_LOG      # prints an id
```
Uncomment the `[[kv_namespaces]]` block in `wrangler.toml`, paste the id,
push. Then review what visitors asked that the notes couldn't answer:

```bash
curl -H "Authorization: Bearer $CHAT_ADMIN_TOKEN" https://portfolio-chat.<subdomain>.workers.dev/misses
```
Add the answers to `src/js/knowledge.js` (or run `/update-chatbot-kb`) and
push — both the site and the Worker redeploy with the new knowledge.

## Local development

```bash
cd worker
printf 'GEMINI_API_KEY=your-key\nADMIN_TOKEN=dev\n' > .dev.vars   # git-ignored
npx wrangler dev --port 8787
node --test                     # unit tests, no dependencies
```
Then serve the site (`python3 -m http.server 3000` from the repo root) and set
`endpoint: 'http://127.0.0.1:8787'` in `src/js/chat-config.js` locally
(don't commit that change).
