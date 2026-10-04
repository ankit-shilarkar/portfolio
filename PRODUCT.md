# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Two audiences, weighted equally:
- **Recruiters and hiring managers** screening for Java backend / SDE-2 roles. They give the page seconds: who is this, what has he shipped, how do I reach him.
- **Engineers running a technical screen.** They want depth: architecture choices, trade-offs, the stack behind each system, and code.

## Product Purpose
Personal portfolio for Ankit Shilarkar, a Java / Spring Boot backend engineer (currently Assistant Manager – Software Development at Burger Singh, SDE-1 equivalent) moving toward SDE-2. Success means a visitor contacts him (email or LinkedIn) or opens his GitHub, after understanding his level and what he has shipped.

## Positioning
A backend engineer who has run real production systems (Azure Functions, microservices, PostgreSQL, Kubernetes debugging) across three companies in about three years. He makes architecture and database cost decisions and uses LLMs in day-to-day engineering. The site's own "Ask AI" assistant is a working demo of that.

## Operating Context
Visitors arrive from LinkedIn, resumes, and job applications, on both phones and desktops. Hosted on GitHub Pages as plain static HTML/CSS/JS with no build step. Pushing to `main` deploys through GitHub Actions.

## Capabilities and Constraints
- Static site only: no server. Secrets must not be committed. The CI job fails on strings that look like API keys (`AIza`, `sk-ant-`, `AKIA`) in `src/` or `index.html`.
- Chatbot: retrieval over a hand-written knowledge base, answered by an LLM. Provider is moving to Google Gemini (free tier). The key is injected at deploy time from a GitHub Actions secret and should be HTTP-referrer-restricted. The knowledge base must be easy to grow over time ("ever evolving").
- Dark and light themes are both supported.

## Brand Commitments
- Name: Ankit Shilarkar. Links: github.com/ankit-shilarkar, linkedin.com/in/ankit-shilarkar2504, ankitshilarkar2504@gmail.com.
- Voice: direct, ownership-focused, plain ("I own outcomes", "don't break prod").

## Evidence on Hand
- Work history: Burger Singh (Feb 2026–present), Netlink America (Apr 2024–Feb 2026), IOTA Informatics internship (Jun 2023–Apr 2024), with project-level bullets in `index.html`.
- Projects on the page are labeled **Demo** (TaskFlow, ShopGrid, URL Shortener, AutoDeploy, DocMind). Their links point to the GitHub profile, not to individual repos. Don't present them as production systems and don't invent metrics beyond what is written.
- No testimonials, company logos, or headshot exist. Don't fabricate any.

## Product Principles
1. Ten-second clarity for recruiters, depth one scroll or click away for engineers.
2. Prove with shipped specifics, not adjectives.
3. Every fact stays true; demos stay labeled as demos.
4. Simple to read, distinctive to remember.

## Accessibility & Inclusion
WCAG AA contrast in both themes, keyboard-reachable navigation, `prefers-reduced-motion` respected, works down to 320px wide.
