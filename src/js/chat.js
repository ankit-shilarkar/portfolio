/**
 * chat.js — "Ask about Ankit" assistant (retrieval + Gemini)
 *
 * Flow
 * ─────────────────────────────────────────────────
 * 1. Retrieve: the question is scored against KNOWLEDGE_CHUNKS
 *    (src/js/knowledge.js) by tag and word overlap; top-k chunks win.
 * 2. Generate: those chunks become the system instruction for
 *    Google Gemini (free tier), so answers stay grounded.
 * 3. Fallback ("notes mode"): with no key configured, quota used up,
 *    or a network error, the best-matching notes are shown directly.
 *
 * Config lives in src/js/chat-config.js (key injected at deploy time).
 * Upgrade path: real embeddings + vector store behind a serverless
 * proxy (Cloudflare Workers), which also keeps the key off the client.
 */

(function () {
  'use strict';

  const CONFIG  = window.CHAT_CONFIG || {};
  const CHUNKS  = typeof KNOWLEDGE_CHUNKS !== 'undefined' ? KNOWLEDGE_CHUNKS : [];
  const API_KEY = (CONFIG.apiKey && !CONFIG.apiKey.startsWith('__')) ? CONFIG.apiKey : '';
  const MODEL   = CONFIG.model || 'gemini-2.5-flash';
  const MAX_Q   = CONFIG.maxQuestionsPerSession || 20;
  const MAX_HISTORY = (CONFIG.maxHistoryTurns || 10) * 2;
  const COUNT_KEY = 'chat-questions';
  const EMAIL = 'ankitshilarkar2504@gmail.com';

  let history = [];
  let busy = false;

  /* ── RETRIEVAL ── */

  const STOP = new Set(['the', 'a', 'an', 'is', 'are', 'was', 'he', 'his', 'him', 'does', 'did', 'do', 'what', 'about',
    'tell', 'me', 'of', 'in', 'on', 'at', 'to', 'for', 'and', 'or', 'with', 'has', 'have', 'any', 'can', 'how', 'ankit', 'ankits']);

  function words(str) {
    return str.toLowerCase().replace(/[^a-z0-9+#.\s-]/g, ' ').split(/\s+/)
      .map((w) => w.replace(/^[.-]+|[.-]+$/g, ''))
      .filter((w) => w.length > 1 && !STOP.has(w));
  }

  function scoreChunk(query, qWords, chunk) {
    const q = ' ' + query.toLowerCase() + ' ';
    let score = 0;
    chunk.tags.forEach((tag) => { if (q.includes(tag)) score += tag.includes(' ') ? 4 : 3; });
    const text = chunk.text.toLowerCase();
    qWords.forEach((w) => { if (text.includes(w)) score += 1; });
    return score;
  }

  function retrieve(query, k) {
    const qWords = words(query);
    const scored = CHUNKS
      .map((chunk) => ({ chunk, score: scoreChunk(query, qWords, chunk) }))
      .sort((a, b) => b.score - a.score);
    if (!scored.length || scored[0].score < 2) {
      return { strong: false, chunks: ['identity', 'burger-singh', 'availability'].map((id) => CHUNKS.find((c) => c.id === id)).filter(Boolean) };
    }
    return { strong: true, chunks: scored.slice(0, k).filter((s) => s.score > 0).map((s) => s.chunk) };
  }

  function systemPrompt(chunks) {
    return [
      'You are the assistant on Ankit Shilarkar\'s portfolio website. Visitors are recruiters and engineers.',
      'Rules:',
      '- Answer only about Ankit: skills, experience, projects, learning and availability.',
      '- Use ONLY the context below. Never invent facts, numbers, employers or dates.',
      '- Personal demo projects must be described as demo projects, not production work.',
      '- 2 to 5 sentences unless detail is asked for. Plain, direct, friendly. Short bullet lists are fine.',
      '- If the context does not answer the question, say you are not sure and suggest emailing ' + EMAIL + '.',
      '',
      'Context about Ankit:',
      chunks.map((c) => c.text).join('\n\n')
    ].join('\n');
  }

  /* ── GENERATION (Gemini) ── */

  async function askGemini(question, chunks) {
    const contents = history.concat([{ role: 'user', parts: [{ text: question }] }]);
    const res = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/' + encodeURIComponent(MODEL) + ':generateContent',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': API_KEY },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemPrompt(chunks) }] },
          contents,
          generationConfig: { temperature: 0.3, maxOutputTokens: 600 }
        })
      }
    );
    if (!res.ok) throw new Error('gemini ' + res.status);
    const data = await res.json();
    const text = (data && data.candidates && data.candidates[0] && data.candidates[0].content &&
      data.candidates[0].content.parts || []).map((p) => p.text || '').join('').trim();
    if (!text) throw new Error('empty');
    return text;
  }

  /* ── NOTES MODE (no model) ── */

  function notesAnswer(found) {
    if (!found.strong) {
      return 'I couldn\'t find that in my notes. Ask about his stack, current work at Burger Singh, past roles, projects or availability, or email Ankit at ' + EMAIL + '.';
    }
    const top = found.chunks[0].text.split('\n').map((l) => l.trim()).filter(Boolean);
    return top.slice(0, 9).join('\n');
  }

  /* ── RENDERING ── */

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  // Minimal, safe formatting: escape first, then **bold**, bullets, links, line breaks
  function format(text) {
    const lines = escapeHtml(text).split('\n');
    let html = '';
    let inList = false;
    lines.forEach((line) => {
      const bullet = line.match(/^\s*(?:[-*•]|\d+\.)\s+(.*)$/);
      if (bullet) {
        if (!inList) { html += '<ul>'; inList = true; }
        html += '<li>' + bullet[1] + '</li>';
      } else {
        if (inList) { html += '</ul>'; inList = false; }
        if (line.trim()) html += line + '<br>';
      }
    });
    if (inList) html += '</ul>';
    return html
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/(https:\/\/[^\s<]+[^\s<.,)])/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/(<br>)+$/, '');
  }

  function log() { return document.getElementById('chatMessages'); }

  function addMessage(role, text, source) {
    const el = log();
    if (!el) return;
    const wrap = document.createElement('div');
    wrap.className = 'msg ' + role;
    const who = document.createElement('span');
    who.className = 'msg-who';
    who.textContent = role === 'bot' ? 'A.' : 'Q.';
    const body = document.createElement('div');
    body.className = 'msg-body';
    if (role === 'bot') {
      body.innerHTML = format(text);
      if (source) {
        const src = document.createElement('span');
        src.className = 'msg-src';
        src.textContent = source;
        body.appendChild(src);
      }
    } else {
      body.textContent = text;
    }
    wrap.append(who, body);
    el.appendChild(wrap);
    el.scrollTop = el.scrollHeight;
  }

  function showTyping() {
    const el = log();
    const wrap = document.createElement('div');
    wrap.className = 'msg bot';
    wrap.id = 'typing-indicator';
    wrap.innerHTML = '<span class="msg-who">A.</span><div class="msg-body"><span class="typing">Working it out…</span></div>';
    el.appendChild(wrap);
    el.scrollTop = el.scrollHeight;
  }

  function removeTyping() {
    const el = document.getElementById('typing-indicator');
    if (el) el.remove();
  }

  /* ── SESSION LIMIT (protects the free quota) ── */

  function askedCount() {
    try { return parseInt(sessionStorage.getItem(COUNT_KEY) || '0', 10); } catch (e) { return 0; }
  }
  function bumpCount() {
    try { sessionStorage.setItem(COUNT_KEY, String(askedCount() + 1)); } catch (e) { /* ignore */ }
  }

  /* ── SEND ── */

  async function sendMessage(textArg) {
    const input = document.getElementById('chatInput');
    const send  = document.getElementById('chatSend');
    const text  = (typeof textArg === 'string' ? textArg : (input && input.value) || '').trim();
    if (!text || busy) return;

    const sugg = document.getElementById('chatSuggestions');
    if (sugg) sugg.hidden = true;
    if (input) input.value = '';

    addMessage('user', text);

    const found = retrieve(text, 3);
    const useModel = API_KEY && askedCount() < MAX_Q;

    if (!useModel) {
      const limitHit = API_KEY && askedCount() >= MAX_Q;
      addMessage('bot', notesAnswer(found), limitHit ? 'from notes · question limit reached for this visit' : 'from notes');
      return;
    }

    busy = true;
    if (send) send.disabled = true;
    showTyping();

    try {
      const reply = await askGemini(text, found.chunks);
      bumpCount();
      history.push({ role: 'user', parts: [{ text }] }, { role: 'model', parts: [{ text: reply }] });
      if (history.length > MAX_HISTORY) history = history.slice(history.length - MAX_HISTORY);
      removeTyping();
      addMessage('bot', reply);
    } catch (err) {
      removeTyping();
      addMessage('bot', notesAnswer(found), 'from notes · the model is busy right now');
    }

    busy = false;
    if (send) send.disabled = false;
    if (input) input.focus();
  }

  // kept global for compatibility with older markup / commands
  window.sendMessage = sendMessage;
  window.sendSuggestion = (q) => sendMessage(q);

  /* ── INIT ── */

  document.addEventListener('DOMContentLoaded', () => {
    const mode = document.getElementById('chatMode');
    if (mode) {
      mode.textContent = API_KEY ? 'Gemini · grounded' : 'notes mode';
      mode.classList.toggle('is-live', !!API_KEY);
    }

    const form = document.getElementById('chatForm');
    if (form) form.addEventListener('submit', (e) => { e.preventDefault(); sendMessage(); });

    document.querySelectorAll('.suggest[data-q]').forEach((btn) => {
      btn.addEventListener('click', () => sendMessage(btn.dataset.q));
    });
  });
})();
