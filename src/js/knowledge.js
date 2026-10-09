/**
 * knowledge.js — The assistant's knowledge base ("training data")
 *
 * This is how the chatbot learns. To teach it something new:
 *   1. Add or edit a chunk below: { id, tags[], text }.
 *   2. `tags` are the words a visitor might type (lower-case).
 *   3. `text` is plain facts. Never write anything that isn't true.
 *   4. Commit and push; the site redeploys in about a minute.
 *
 * Keep it in sync with index.html whenever jobs, projects or skills change.
 * Upgrade path: embed these chunks and swap keyword scoring for
 * vector search (pgvector / Qdrant) behind a small serverless proxy.
 */

const KNOWLEDGE_CHUNKS = [
  {
    id: 'identity',
    tags: ['ankit', 'who', 'about', 'name', 'engineer', 'developer', 'person'],
    text: `Ankit Shilarkar is a Java/Spring Boot backend engineer based in India.
He has 2+ years of professional experience (Netlink America, Burger Singh) after a 10-month internship at IOTA Informatics.
He works with Java, Python, JavaScript, Azure Functions, VMs and Linux.
He is fast to learn, writes clean code, and has shipped multiple production systems.
Email: ankitshilarkar2504@gmail.com
GitHub: https://github.com/ankit-shilarkar
LinkedIn: https://www.linkedin.com/in/ankit-shilarkar2504/`
  },
  {
    id: 'burger-singh',
    tags: ['burger singh', 'current', 'job', 'company', 'now', 'working', 'present', '2026', 'role', 'title', 'building'],
    text: `Ankit joined Burger Singh on February 25, 2026 as Assistant Manager – Software Development (an SDE-1 equivalent role).
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
He built this portfolio's assistant: keyword retrieval over a knowledge base, answered by Google Gemini.
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
    id: 'docmind-project',
    tags: ['docmind', 'ai', 'document', 'ocr', 'tika', 'llm', 'processing', 'invoice', 'pdf', 'extraction'],
    text: `Ankit built DocMind — an AI Document Processing System (demo project).
Problem: Enterprises spend hours manually extracting data from unstructured PDFs, invoices, contracts.
Approach: Upload PDF/image → OCR text extraction (Apache Tika/Tesseract) → LLM classification + field extraction (Claude API) → structured storage in PostgreSQL → queryable REST API.
Tech stack: Spring Boot, Claude API, Apache Tika, Kafka (async pipeline), PostgreSQL, Redis (duplicate detection), Docker, JWT auth.
Design target: ~80% less manual processing time. Handles 500+ documents/hour via Kafka async pipeline.
GitHub: https://github.com/ankit-shilarkar`
  },
  {
    id: 'learning',
    tags: ['learning', 'studying', 'growing', 'improving', 'leetcode', 'dsa', 'system design', 'kafka', 'redis', 'distributed'],
    text: `Ankit is actively learning and improving in these areas:
1. System Design: HLD/LLD, CAP theorem, database sharding, load balancing, consistent hashing.
2. Kafka & Event-Driven Architecture: Kafka internals, partitions, consumer groups, exactly-once semantics, CQRS, event sourcing.
3. Redis & Caching: Cache-aside, write-through, TTL strategies, Redis data structures, distributed locking.
4. Distributed Systems: Raft/Paxos consensus algorithms, saga patterns, 2PC, distributed transactions, failure recovery.
5. DSA & Problem Solving: LeetCode practice — graphs, dynamic programming, trees, sliding window problems.`
  },
  {
    id: 'iota',
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
  },
  {
    id: 'now',
    tags: ['now', 'this week', 'currently', 'focus', 'working on', 'right now', 'looking for', 'sde-2', 'sde2', 'next role'],
    text: `What Ankit is focused on right now (Now sheet, updated 9 Oct 2026):
Building: taking the Aadhaar-verified employee onboarding portal to go-live at Burger Singh; a cloud telephony middleware dialer for store staff; a PIN-code store locator on Google Maps.
Studying: system design, Kafka internals, Redis caching, distributed systems (Raft, sagas, 2PC), DSA on LeetCode.
Looking for: a backend role at SDE-2 level (Java, Spring Boot, distributed systems) on a team that owns production systems end to end. Full-time, remote or hybrid.`
  },
  {
    id: 'case-studies',
    tags: ['case study', 'case studies', 'problem', 'incident', 'debug', 'debugging', 'slow query', 'sql', 'performance', 'serverless', 'cost', 'root cause'],
    text: `Problems Ankit has worked (case studies on the site):
1. Burger Singh, 2026 — scheduled jobs and small APIs without running servers: timer-triggered Azure Functions (cron) for background jobs and HTTP-triggered functions for endpoints; he owns the database architecture and picks data-access patterns with cost and query load in mind.
2. Netlink America, KMI (Ovie) — recurring production incidents: traced failures through Spring Boot microservices using Kubernetes pod logs, fixed the underlying code paths in JWT/RBAC-secured REST APIs and PostgreSQL access; recurring issues went down.
3. Netlink America, OnBase — slow SQL in a compliance-critical document system: profiled slow queries, rewrote joins, added indexes, built audit logging for regulatory traceability, refactored backend components; better performance and reliability with traceability intact.`
  },
  {
    id: 'til-notes',
    tags: ['til', 'today i learned', 'notes', 'learned', 'learn about', 'kafka', 'redis', 'kafka partition', 'ordering', 'cache-aside', 'ncrontab', 'cron'],
    text: `Recent notes from Ankit's "Notes to self" log:
- Kafka only orders messages within a partition; use the same key to keep related events in sequence.
- Cache-aside: read from Redis, on a miss read the database and fill the cache; on writes update the database and delete the key.
- Timer-triggered Azure Functions use six-field NCRONTAB cron starting with seconds: "0 */5 * * * *" runs every five minutes.`
  }
];

// Shared with the Cloudflare Worker (bundled by wrangler); ignored in the browser.
if (typeof module === 'object' && module.exports) module.exports = KNOWLEDGE_CHUNKS;
