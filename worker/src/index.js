/**
 * portfolio-chat — Cloudflare Worker behind "Ask about Ankit"
 *
 * POST /chat      { question, history? }  → { answer, grounded, sources }
 * GET  /health                            → { ok, model, kb }
 * GET  /misses    (Authorization: Bearer ADMIN_TOKEN)
 *                 → questions the knowledge base could not answer,
 *                   so Ankit knows what to add to knowledge.js next.
 *
 * Why a Worker: the Gemini key stays a Cloudflare secret (never in the
 * browser), the prompt is built here (the endpoint can't be used as a
 * free general-purpose Gemini proxy), and requests are rate-limited.
 *
 * Bindings (wrangler.toml):
 *   GEMINI_API_KEY  secret   required
 *   ADMIN_TOKEN     secret   optional, enables GET /misses
 *   ALLOWED_ORIGINS var      comma-separated CORS allow-list
 *   GEMINI_MODEL    var      default gemini-2.5-flash
 *   LIMITER         ratelimit binding, optional
 *   CHAT_LOG        KV namespace, optional (unanswered-question log)
 */

import KNOWLEDGE_CHUNKS from '../../src/js/knowledge.js';
import Retrieval from '../../src/js/retrieval.js';

const MAX_QUESTION = 300;
const MAX_TURNS = 20;          // 10 question/answer pairs
const MAX_TURN_CHARS = 2000;
const MISS_TTL = 60 * 60 * 24 * 90; // keep unanswered questions 90 days

function corsHeaders(request, env) {
  const origin = request.headers.get('Origin') || '';
  const allowed = (env.ALLOWED_ORIGINS || '').split(',').map((s) => s.trim()).filter(Boolean);
  const headers = { 'Vary': 'Origin' };
  if (allowed.includes(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
    headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS';
    headers['Access-Control-Allow-Headers'] = 'Content-Type';
    headers['Access-Control-Max-Age'] = '86400';
  }
  return headers;
}

function json(body, status, extra) {
  return new Response(JSON.stringify(body), {
    status: status || 200,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...(extra || {}) }
  });
}

function cleanHistory(history) {
  if (!Array.isArray(history)) return [];
  return history
    .filter((t) => t && (t.role === 'user' || t.role === 'model') && typeof t.text === 'string')
    .slice(-MAX_TURNS)
    .map((t) => ({ role: t.role, parts: [{ text: t.text.slice(0, MAX_TURN_CHARS) }] }));
}

async function askGemini(env, question, history, chunks) {
  const model = env.GEMINI_MODEL || 'gemini-2.5-flash';
  const res = await fetch(
    'https://generativelanguage.googleapis.com/v1beta/models/' + encodeURIComponent(model) + ':generateContent',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': env.GEMINI_API_KEY },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: Retrieval.systemPrompt(chunks) }] },
        contents: history.concat([{ role: 'user', parts: [{ text: question }] }]),
        generationConfig: { temperature: 0.3, maxOutputTokens: 600 }
      })
    }
  );
  if (!res.ok) throw Object.assign(new Error('gemini ' + res.status), { status: res.status });
  const data = await res.json();
  const parts = (data && data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) || [];
  const text = parts.map((p) => p.text || '').join('').trim();
  if (!text) throw new Error('empty');
  return text;
}

async function logMiss(env, question) {
  if (!env.CHAT_LOG) return;
  const key = 'miss:' + new Date().toISOString() + ':' + crypto.randomUUID().slice(0, 8);
  await env.CHAT_LOG.put(key, question, { expirationTtl: MISS_TTL });
}

async function handleChat(request, env, ctx, cors) {
  if (!env.GEMINI_API_KEY) return json({ error: 'not_configured' }, 503, cors);

  if (env.LIMITER) {
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    const { success } = await env.LIMITER.limit({ key: ip });
    if (!success) return json({ error: 'rate_limited' }, 429, cors);
  }

  let body;
  try { body = await request.json(); } catch (e) { return json({ error: 'bad_json' }, 400, cors); }
  const question = typeof body.question === 'string' ? body.question.trim() : '';
  if (!question || question.length > MAX_QUESTION) return json({ error: 'bad_question' }, 400, cors);

  const found = Retrieval.retrieve(question, KNOWLEDGE_CHUNKS, 3);
  if (!found.strong) ctx.waitUntil(logMiss(env, question).catch(() => {}));

  try {
    const answer = await askGemini(env, question, cleanHistory(body.history), found.chunks);
    return json({ answer, grounded: found.strong, sources: found.chunks.map((c) => c.id) }, 200, cors);
  } catch (err) {
    const status = err.status === 429 ? 429 : 502;
    return json({ error: status === 429 ? 'model_quota' : 'model_error' }, status, cors);
  }
}

async function handleMisses(request, env, cors) {
  const auth = request.headers.get('Authorization') || '';
  if (!env.ADMIN_TOKEN || auth !== 'Bearer ' + env.ADMIN_TOKEN) return json({ error: 'unauthorized' }, 401, cors);
  if (!env.CHAT_LOG) return json({ error: 'no_kv', hint: 'bind a CHAT_LOG KV namespace in wrangler.toml' }, 501, cors);
  const list = await env.CHAT_LOG.list({ prefix: 'miss:', limit: 200 });
  const items = await Promise.all(list.keys.map(async (k) => ({ at: k.name.split(':').slice(1, -1).join(':'), question: await env.CHAT_LOG.get(k.name) })));
  return json({ count: items.length, items: items.reverse() }, 200, cors);
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const cors = corsHeaders(request, env);

    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });

    if (url.pathname === '/chat' && request.method === 'POST') {
      if (!cors['Access-Control-Allow-Origin']) return json({ error: 'origin_not_allowed' }, 403);
      return handleChat(request, env, ctx, cors);
    }
    if (url.pathname === '/health' && request.method === 'GET') {
      return json({ ok: true, model: env.GEMINI_MODEL || 'gemini-2.5-flash', kb: KNOWLEDGE_CHUNKS.length, configured: !!env.GEMINI_API_KEY }, 200, cors);
    }
    if (url.pathname === '/misses' && request.method === 'GET') return handleMisses(request, env, cors);

    return json({ error: 'not_found' }, 404, cors);
  }
};
