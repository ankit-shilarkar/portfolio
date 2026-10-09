/**
 * chat.js — "Ask about Ankit" assistant (browser side)
 *
 * Flow
 * ─────────────────────────────────────────────────
 * 1. The question goes to the Cloudflare Worker (worker/src/index.js),
 *    which retrieves the best notes from knowledge.js, asks Gemini with
 *    a server-side key, and returns a grounded answer.
 * 2. Fallback ("notes mode"): with no Worker configured, a rate limit,
 *    or a network error, the best-matching notes are shown directly,
 *    using the same retrieval code (retrieval.js) the Worker uses.
 *
 * Config: src/js/chat-config.js (Worker URL injected at deploy time).
 */

(function () {
  'use strict';

  const CONFIG   = window.CHAT_CONFIG || {};
  const CHUNKS   = typeof KNOWLEDGE_CHUNKS !== 'undefined' ? KNOWLEDGE_CHUNKS : [];
  const R        = window.Retrieval;
  const ENDPOINT = (CONFIG.endpoint && !CONFIG.endpoint.startsWith('__')) ? CONFIG.endpoint.replace(/\/+$/, '') : '';
  const MAX_Q    = CONFIG.maxQuestionsPerSession || 20;
  const MAX_HISTORY = (CONFIG.maxHistoryTurns || 10) * 2;
  const COUNT_KEY = 'chat-questions';

  let history = [];
  let busy = false;

  /* ── GENERATION (via the Worker) ── */

  async function askWorker(question) {
    const res = await fetch(ENDPOINT + '/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, history })
    });
    if (!res.ok) throw Object.assign(new Error('worker ' + res.status), { status: res.status });
    const data = await res.json();
    if (!data || typeof data.answer !== 'string' || !data.answer.trim()) throw new Error('empty');
    return data.answer.trim();
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

    const found = R.retrieve(text, CHUNKS, 3);
    const useModel = ENDPOINT && askedCount() < MAX_Q;

    if (!useModel) {
      const limitHit = ENDPOINT && askedCount() >= MAX_Q;
      addMessage('bot', R.notesAnswer(found), limitHit ? 'from notes · question limit reached for this visit' : 'from notes');
      return;
    }

    busy = true;
    if (send) send.disabled = true;
    showTyping();

    try {
      const reply = await askWorker(text);
      bumpCount();
      history.push({ role: 'user', text }, { role: 'model', text: reply });
      if (history.length > MAX_HISTORY) history = history.slice(history.length - MAX_HISTORY);
      removeTyping();
      addMessage('bot', reply);
    } catch (err) {
      removeTyping();
      const why = err.status === 429 ? 'from notes · too many questions, try again in a minute' : 'from notes · the model is busy right now';
      addMessage('bot', R.notesAnswer(found), why);
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
      mode.textContent = ENDPOINT ? 'Gemini · grounded' : 'notes mode';
      mode.classList.toggle('is-live', !!ENDPOINT);
    }

    const form = document.getElementById('chatForm');
    if (form) form.addEventListener('submit', (e) => { e.preventDefault(); sendMessage(); });

    document.querySelectorAll('.suggest[data-q]').forEach((btn) => {
      btn.addEventListener('click', () => sendMessage(btn.dataset.q));
    });
  });
})();
