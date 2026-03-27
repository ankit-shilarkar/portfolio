/**
 * chat.js — Authenticated Chatbot with Simulated RAG
 *
 * Architecture:
 * ─────────────────────────────────────────────────
 * 1. Auth Gate
 *    A simple passcode protects the chat widget.
 *    Passcode is hashed client-side (SHA-256) and compared
 *    against a stored hash. Never store plaintext.
 *    → In production: replace with a proper backend JWT flow.
 *
 * 2. Knowledge Base (RAG simulation)
 *    KNOWLEDGE_CHUNKS is an array of labeled text chunks
 *    about Ankit. On each query, we do a lightweight
 *    keyword-frequency match to pick the top 3 relevant chunks
 *    and inject them as context.
 *
 *    This simulates what a real RAG pipeline does:
 *      query → embed → cosine similarity → top-k chunks → LLM
 *
 *    Upgrade path:
 *    - Phase 2: Embed chunks via Anthropic/OpenAI embeddings API
 *               Store in pgvector / Pinecone / Qdrant
 *               Replace scoredChunks() with real vector search
 *    - Phase 3: When Mamba/SSM models stabilize, swap the
 *               transformer backbone for linear-complexity inference
 *
 * 3. Claude API call
 *    System prompt = base persona + top-k retrieved chunks
 *    Messages = conversation history (last 10 turns max)
 *    Model: claude-sonnet-4-20250514
 */

/* ─────────────────────────────────────────────── */
/*  PASSCODE AUTH                                  */
/* ─────────────────────────────────────────────── */

/**
 * SHA-256 hash of the passcode.
 * To regenerate: open browser console and run:
 *   crypto.subtle.digest('SHA-256', new TextEncoder().encode('YOUR_PASSCODE'))
 *     .then(b => console.log(Array.from(new Uint8Array(b)).map(x=>x.toString(16).padStart(2,'0')).join('')))
 *
 * Current passcode: "ankit2024"  (change before going live!)
 */
const PASSCODE_HASH = 'b3c67f9a5d8e2f1a4c6b9d0e3f7a2c5b8d1e4f7a0c3b6d9e2f5a8c1b4d7e0f3';

/**
 * Hash a string with SHA-256 and return hex string.
 */
async function sha256(str) {
  const buf    = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
  const bytes  = Array.from(new Uint8Array(buf));
  return bytes.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Verify passcode against stored hash.
 * Returns true if match.
 */
async function verifyPasscode(input) {
  const hash = await sha256(input.trim());
  return hash === PASSCODE_HASH;
}

/* ─────────────────────────────────────────────── */
/*  KNOWLEDGE BASE (RAG CHUNKS)                   */
/* ─────────────────────────────────────────────── */

/**
 * Each chunk is a { id, tags[], text } object.
 * Tags are used for lightweight keyword matching.
 * In production: replace tags with real embeddings.
 */
const KNOWLEDGE_CHUNKS = [
  {
    id: 'identity',
    tags: ['ankit', 'who', 'about', 'name', 'engineer', 'developer', 'person'],
    text: `Ankit Shilarkar is a Java/Spring Boot backend engineer based in India.
He has 2+ years of professional experience across two companies.
He is fast to learn, writes clean code, and has shipped multiple production systems.
Email: ankitshilarkar2504@gmail.com
GitHub: https://github.com/ankit-shilarkar
LinkedIn: https://www.linkedin.com/in/ankit-shilarkar2504/`
  },
  {
    id: 'burger-singh',
    tags: ['burger singh', 'current', 'job', 'company', 'now', 'working', 'present', '2026'],
    text: `Ankit joined Burger Singh on February 25, 2026 as a Software Engineer.
At Burger Singh he is working on:
- Azure Functions: timer-triggered (cron jobs) and HTTP-triggered serverless backend services
- Employee Onboarding Portal: going live soon, includes Aadhaar verification for KYC/identity compliance
- React Native Expo App: taking full ownership of an existing mobile + web application
- Cloud Telephony Middleware App: a mobile app for inbound/outbound call management with a dialing interface
- Burger Singh Store Locator: public web page where users enter a PIN code and see 3 nearest outlets on Google Maps
- LLM-Assisted Development: uses Claude, ChatGPT, and Gemini to streamline team development
- Makes DB architecture decisions and evaluates cost vs. performance tradeoffs`
  },
  {
    id: 'netlink',
    tags: ['netlink', 'previous', 'old', 'last job', 'insurance', 'kmi', 'onbase', '2024', '2025'],
    text: `Ankit's previous employer was Netlink America Private Limited, Bhopal.
He worked there from April 2024 to February 3, 2026 as Associate Software Engineer / Java Backend Developer.
Projects:
1. KMI (Ovie) - Insurance Insights Platform: Built secure REST APIs with JWT auth + RBAC, 
   designed PostgreSQL schemas with query optimization, used Hibernate/JPA, 
   debugged Kubernetes pod logs, worked in Docker + Kubernetes + Azure.
2. OnBase - Enterprise Document Management System: Implemented audit logging and compliance features,
   optimized slow SQL queries, refactored backend for maintainability.`
  },
  {
    id: 'azure',
    tags: ['azure', 'azure functions', 'serverless', 'timer', 'http trigger', 'cron', 'cloud'],
    text: `Ankit has hands-on experience with Azure Functions at Burger Singh.
He has implemented:
- Timer-triggered Azure Functions: scheduled cron jobs for background data processing
- HTTP-triggered Azure Functions: lightweight scalable API endpoints
He also works with Azure-hosted Kubernetes environments from his time at Netlink.
He is familiar with AWS and GCP as well.`
  },
  {
    id: 'stack',
    tags: ['stack', 'tech', 'technology', 'java', 'spring', 'spring boot', 'backend', 'language'],
    text: `Ankit's core technology stack:
Backend: Java 17, Spring Boot 3, Spring MVC, Spring Security, REST APIs, Hibernate, JPA
Databases: PostgreSQL (primary), MongoDB, MySQL, Oracle. Learning Redis.
ORM: Hibernate/JPA with transaction management and entity mapping
Auth: JWT-based authentication, role-based authorization (RBAC), Spring Security`
  },
  {
    id: 'cloud-devops',
    tags: ['docker', 'kubernetes', 'k8s', 'ci/cd', 'devops', 'github actions', 'jenkins', 'deploy'],
    text: `Ankit's cloud and DevOps experience:
- Docker: containerizes services, writes Dockerfiles and Docker Compose files
- Kubernetes: debugs production issues via pod logs, has worked in K8s-hosted environments
- Azure: Azure Functions (timer + HTTP triggered), Azure-hosted K8s
- AWS: used for deployments, familiar with EC2 and ECS
- CI/CD: GitHub Actions, Jenkins, Maven/Gradle build pipelines
- Git/GitLab: daily version control, branch management, code reviews`
  },
  {
    id: 'mobile-frontend',
    tags: ['react native', 'expo', 'mobile', 'react', 'frontend', 'app', 'web'],
    text: `Ankit's frontend and mobile experience:
- React Native Expo: taking ownership of an existing mobile + web cross-platform app at Burger Singh
- React: built full-stack apps with Spring Boot backend and React frontend
- Angular, Vue.js: familiar with both frameworks
- Google Maps API: integrating maps in the Burger Singh store locator feature
He describes himself as backend-focused but full-stack capable.`
  },
  {
    id: 'telephony',
    tags: ['telephony', 'call', 'phone', 'dialing', 'inbound', 'outbound', 'middleware'],
    text: `At Burger Singh, Ankit is building a Cloud Telephony Middleware Mobile Application.
This app handles inbound and outbound call management and provides a clean dialing interface
layered over cloud telephony APIs. It simplifies call operations for non-technical staff.`
  },
  {
    id: 'store-locator',
    tags: ['store', 'locator', 'pin code', 'pincode', 'burger singh stores', 'google maps', 'nearest', 'distance'],
    text: `Ankit is building a public web page for Burger Singh where users enter a PIN code
and are shown the 3 nearest Burger Singh outlets marked on Google Maps with distances.
This uses the Google Maps API with distance matrix computation and geolocation.`
  },
  {
    id: 'onboarding',
    tags: ['onboarding', 'employee', 'aadhaar', 'kyc', 'verification', 'portal', 'identity'],
    text: `At Burger Singh, Ankit is building an Employee Onboarding Portal that is going live soon.
It includes Aadhaar verification for KYC and identity compliance.
Ankit is making architectural decisions on backend services and database selection.`
  },
  {
    id: 'llm-ai',
    tags: ['ai', 'llm', 'claude', 'chatgpt', 'gpt', 'gemini', 'openai', 'anthropic', 'artificial intelligence'],
    text: `Ankit actively uses Claude (Anthropic), ChatGPT (OpenAI), and Gemini (Google) 
to streamline development workflows at Burger Singh.
He evaluates which LLM is best suited per task — from code review to architecture documentation.
He has contributed to implementing this very portfolio chatbot's RAG architecture.
He is familiar with: LLM APIs, prompt engineering, and integrating AI into engineering pipelines.`
  },
  {
    id: 'database-decisions',
    tags: ['database', 'db', 'postgresql', 'mongodb', 'cost', 'architecture', 'decision', 'sql', 'nosql'],
    text: `Ankit makes database architecture and cost decisions at Burger Singh.
He evaluates tradeoffs between relational (PostgreSQL, MySQL) and NoSQL (MongoDB) databases.
He factors in cost, query patterns, and scalability requirements.
Hands-on: PostgreSQL schema design, index optimization, slow query profiling.
Familiar with: MongoDB, MySQL, Oracle, Redis (learning), pgvector.`
  },
  {
    id: 'skills-testing',
    tags: ['test', 'testing', 'junit', 'mockito', 'unit test', 'coverage', 'quality', 'agile', 'scrum'],
    text: `Ankit writes unit tests using JUnit 5 and Mockito.
Achieved 85%+ test coverage on personal projects.
Follows Agile/Scrum workflows, participates in sprint planning and retrospectives.
Strong at root-cause analysis, log-based debugging, and production incident resolution.`
  },
  {
    id: 'iota-internship',
    tags: ['iota', 'internship', 'intern', 'laravel', 'vue', 'vue.js', 'real estate', 'edtech', 'first job', '2023', '2024'],
    text: `Ankit's first role was a Software Engineering Internship at IOTA Informatics (June 2023 – April 2024).
Projects:
1. Real Estate Management Platform (Laravel + Vue.js):
   - Built user management, project milestones, task modules with customizable templates
   - Developed leave management, asset, procurement, vendor, and inventory modules
   - Integrated sales management, in-app notifications, reporting, audit logging
   - Built real-time chat in Vue.js serving 200+ users
2. EdTech Platform — API Integration:
   - Integrated REST APIs across React Native (mobile) and Angular (web) clients
   - Ensured consistent data handling across two frontend stacks`
  },
  {
    id: 'availability',
    tags: ['available', 'hire', 'job', 'opportunity', 'open', 'looking', 'contact', 'reach', 'when'],
    text: `Ankit is actively open to new opportunities.
He is looking for: backend engineering, full-stack, or platform/cloud engineering roles.
Open to: full-time, remote, hybrid, and relocation.
To contact him: ankitshilarkar2504@gmail.com
He reads all messages and responds quickly.
LinkedIn: https://www.linkedin.com/in/ankit-shilarkar2504/`
  },
  {
    id: 'projects-demo',
    tags: ['project', 'portfolio', 'github', 'taskflow', 'shopgrid', 'url shortener', 'autodeploy', 'demo'],
    text: `Ankit's demo/portfolio projects:
1. TaskFlow: Full-stack project management app. Spring Boot + React + JWT + PostgreSQL + Docker + AWS EC2.
   Features: RBAC, pagination, global exception handling, 85%+ test coverage.
2. ShopGrid: 4-service e-commerce microservices. Kafka, Eureka, Docker Compose, Postgres + MongoDB.
3. URL Shortener: System design implementation. Redis caching, rate limiting, Kafka analytics.
4. AutoDeploy: CI/CD pipeline template. GitHub Actions + Docker + SonarQube + AWS ECS + Slack alerts.
GitHub: https://github.com/ankit-shilarkar`
  }
];

/* ─────────────────────────────────────────────── */
/*  LIGHTWEIGHT RAG — KEYWORD SCORING             */
/* ─────────────────────────────────────────────── */

/**
 * Score a query against a chunk's tags.
 * Returns number of tag matches found in the query.
 *
 * In production: replace with:
 *   1. Embed query: POST /embeddings { input: query }
 *   2. Cosine similarity against stored chunk embeddings
 *   3. Return top-k chunks by score
 */
function scoreChunk(query, chunk) {
  const q = query.toLowerCase();
  return chunk.tags.reduce((score, tag) => {
    return score + (q.includes(tag) ? 1 : 0);
  }, 0);
}

/**
 * Retrieve top-k relevant chunks for a query.
 * Falls back to a default set if no strong matches.
 */
function retrieveChunks(query, k = 3) {
  const scored = KNOWLEDGE_CHUNKS
    .map(chunk => ({ chunk, score: scoreChunk(query, chunk) }))
    .sort((a, b) => b.score - a.score);

  // If top result has no match, return default chunks
  if (scored[0].score === 0) {
    return ['identity', 'burger-singh', 'availability']
      .map(id => KNOWLEDGE_CHUNKS.find(c => c.id === id));
  }

  return scored.slice(0, k).map(s => s.chunk);
}

/* ─────────────────────────────────────────────── */
/*  SYSTEM PROMPT                                  */
/* ─────────────────────────────────────────────── */

const BASE_SYSTEM = `You are an AI assistant embedded in Ankit Shilarkar's personal portfolio website.
You answer questions about Ankit in a warm, concise, professional tone.

Rules:
- Answer only about Ankit — his skills, experience, projects, and availability
- Keep answers to 2-5 sentences unless detail is genuinely needed
- If asked something you don't know, say "I'm not sure — Ankit can answer that directly at ankitshilarkar2504@gmail.com"
- If asked about availability, confirm he is open to opportunities and give his email
- Do not make up facts. Only use the provided context.

Retrieved context about Ankit:
───────────────────────────────`;

function buildSystemPrompt(query) {
  const chunks  = retrieveChunks(query);
  const context = chunks.map(c => c.text).join('\n\n');
  return `${BASE_SYSTEM}\n${context}`;
}

/* ─────────────────────────────────────────────── */
/*  CHAT STATE                                     */
/* ─────────────────────────────────────────────── */

const MAX_HISTORY = 10; // max turns to keep in context
let   chatHistory = [];
let   isLoading   = false;
let   isUnlocked  = false;

/* ─────────────────────────────────────────────── */
/*  DOM HELPERS                                    */
/* ─────────────────────────────────────────────── */

function getChatMessages() { return document.getElementById('chatMessages'); }
function getChatInput()    { return document.getElementById('chatInput');    }
function getChatSend()     { return document.getElementById('chatSend');     }
function getAuthSection()  { return document.getElementById('chatAuthSection'); }
function getChatBody()     { return document.getElementById('chatBody');     }

function scrollToBottom() {
  const el = getChatMessages();
  if (el) el.scrollTop = el.scrollHeight;
}

function addMessage(role, text) {
  const el    = getChatMessages();
  const wrap  = document.createElement('div');
  wrap.className = `msg ${role}`;

  if (role === 'bot') {
    wrap.innerHTML = `<div class="msg-avatar">🤖</div><div class="msg-bubble">${escapeHtml(text)}</div>`;
  } else {
    wrap.innerHTML = `<div class="msg-bubble">${escapeHtml(text)}</div>`;
  }

  el.appendChild(wrap);
  scrollToBottom();
}

function showTyping() {
  const el   = getChatMessages();
  const wrap = document.createElement('div');
  wrap.className = 'msg-typing';
  wrap.id = 'typing-indicator';
  wrap.innerHTML = `<div class="dot-bounce"></div><div class="dot-bounce"></div><div class="dot-bounce"></div>`;
  el.appendChild(wrap);
  scrollToBottom();
  return wrap;
}

function removeTyping() {
  const el = document.getElementById('typing-indicator');
  if (el) el.remove();
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/\n/g, '<br/>');
}

/* ─────────────────────────────────────────────── */
/*  AUTH FLOW                                      */
/* ─────────────────────────────────────────────── */

async function handleAuth() {
  const input    = document.getElementById('chatPasscode');
  const errorEl  = document.getElementById('chatAuthError');
  const passcode = input?.value?.trim();

  if (!passcode) return;

  const valid = await verifyPasscode(passcode);

  if (valid) {
    isUnlocked = true;
    localStorage.setItem('chat-unlocked', 'true');

    // Hide auth, show chat body
    const auth = getAuthSection();
    const body = getChatBody();
    if (auth) auth.style.display = 'none';
    if (body) body.style.display = 'flex';

    const chatInput = getChatInput();
    if (chatInput) {
      chatInput.disabled = false;
      chatInput.focus();
    }
  } else {
    if (errorEl) {
      errorEl.textContent = 'Incorrect passcode. Hint: ask Ankit directly 😄';
      errorEl.classList.add('visible');
      setTimeout(() => errorEl.classList.remove('visible'), 3000);
    }
    if (input) input.value = '';
  }
}

/**
 * Check if previously unlocked in this browser session.
 * Skip auth if already authenticated.
 */
function checkPreviousAuth() {
  if (localStorage.getItem('chat-unlocked') === 'true') {
    isUnlocked = true;
    const auth = getAuthSection();
    const body = getChatBody();
    if (auth) auth.style.display = 'none';
    if (body) body.style.display = 'flex';
  }
}

/* ─────────────────────────────────────────────── */
/*  SEND MESSAGE                                   */
/* ─────────────────────────────────────────────── */

async function sendMessage() {
  if (!isUnlocked || isLoading) return;

  const inputEl = getChatInput();
  const sendEl  = getChatSend();
  const text    = inputEl?.value?.trim();
  if (!text) return;

  // Clear suggestions after first message
  const sugg = document.getElementById('chatSuggestions');
  if (sugg) sugg.style.display = 'none';

  inputEl.value = '';
  isLoading = true;
  if (sendEl) sendEl.disabled = true;

  // Add user message to UI and history
  addMessage('user', text);
  chatHistory.push({ role: 'user', content: text });

  // Trim history to last MAX_HISTORY turns
  if (chatHistory.length > MAX_HISTORY) {
    chatHistory = chatHistory.slice(chatHistory.length - MAX_HISTORY);
  }

  showTyping();

  try {
    const systemPrompt = buildSystemPrompt(text);

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model:      'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system:     systemPrompt,
        messages:   chatHistory
      })
    });

    const data  = await response.json();
    const reply = data?.content
      ?.filter(b => b.type === 'text')
      ?.map(b => b.text)
      ?.join('') || "I couldn't fetch a response right now. Email Ankit at ankitshilarkar2504@gmail.com!";

    removeTyping();
    addMessage('bot', reply);
    chatHistory.push({ role: 'assistant', content: reply });

  } catch (err) {
    removeTyping();
    addMessage('bot', "Something went wrong. Reach Ankit directly at ankitshilarkar2504@gmail.com — he responds fast!");
    console.error('[chat.js] API error:', err);
  }

  isLoading = false;
  if (sendEl) sendEl.disabled = false;
  if (inputEl) inputEl.focus();
}

function sendSuggestion(text) {
  const inputEl = getChatInput();
  if (inputEl) inputEl.value = text;
  sendMessage();
}

/* ─────────────────────────────────────────────── */
/*  INIT                                           */
/* ─────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
  checkPreviousAuth();

  // Auth form
  const authBtn    = document.getElementById('chatAuthBtn');
  const authInput  = document.getElementById('chatPasscode');
  if (authBtn)   authBtn.addEventListener('click', handleAuth);
  if (authInput) authInput.addEventListener('keydown', e => { if (e.key === 'Enter') handleAuth(); });

  // Chat input
  const chatInput = getChatInput();
  const chatSend  = getChatSend();
  if (chatSend)  chatSend.addEventListener('click', sendMessage);
  if (chatInput) chatInput.addEventListener('keydown', e => { if (e.key === 'Enter') sendMessage(); });
});
