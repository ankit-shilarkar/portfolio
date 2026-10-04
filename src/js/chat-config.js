/**
 * chat-config.js — Chatbot runtime settings
 *
 * The Gemini key is NEVER committed. The deploy workflow
 * (.github/workflows/deploy.yml) replaces the placeholder below
 * with the GEMINI_API_KEY repository secret at deploy time.
 *
 * Protect the key in Google Cloud Console → APIs & Services →
 * Credentials: restrict it to the "Generative Language API" and to
 * the HTTP referrer https://ankit-shilarkar.github.io/*
 *
 * With no key (local dev, or secret not set) the assistant still
 * works in "notes mode": it answers straight from knowledge.js.
 */
window.CHAT_CONFIG = {
  provider: 'gemini',
  model: 'gemini-2.5-flash',
  apiKey: '__GEMINI_API_KEY__',
  maxQuestionsPerSession: 20,
  maxHistoryTurns: 10
};
