/**
 * chat-config.js — Chatbot runtime settings (no secrets here)
 *
 * `endpoint` is the Cloudflare Worker URL, e.g.
 *   https://portfolio-chat.<your-subdomain>.workers.dev
 * The Pages deploy (.github/workflows/deploy.yml) replaces the
 * placeholder with the CHAT_ENDPOINT repository variable. The Gemini
 * key lives only in the Worker as a Cloudflare secret.
 *
 * With no endpoint (local dev, or variable not set) the assistant still
 * works in "notes mode": it answers straight from knowledge.js.
 */
window.CHAT_CONFIG = {
  endpoint: '__CHAT_ENDPOINT__',
  maxQuestionsPerSession: 20,
  maxHistoryTurns: 10
};
