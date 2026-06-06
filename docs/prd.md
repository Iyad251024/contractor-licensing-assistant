# PRD — Contractor Licensing Assistant (MVP)

## Problem
Texas electricians lose 4–12 weeks and $2,000–$8,000 on consultants to navigate the Texas Department of Licensing and Regulation (TDLR) Electrical Contractor process. The work isn't technically hard — it's paperwork, ambiguous requirements, and missing documents.

## Target user
Solo or small-shop electricians in Texas who already meet the experience bar (Master Electrician on staff) but need to actually file the contractor application.

## MVP scope (Texas Electrical only)
1. **Eligibility checker** — 6-question wizard, returns pass/fail + reasons.
2. **Roadmap generator** — ordered checklist of steps (exam, insurance, fees, forms) personalized to wizard answers.
3. **Document vault** — upload Master Electrician license, insurance COI, EIN letter, etc. to R2. Validate file type + size.
4. **Application tracker** — single TX Electrical Contractor application per user, status machine (`draft → submitted → approved | rejected`).
5. **Renewal tracker** — store license expiration, send reminder 60/30/7 days out (cron in v1.1).
6. **Stripe billing** — Starter / Pro / Business with hard feature gates.

## Out of scope (v1)
- Other trades or other states
- AI document parsing
- Multi-user team accounts beyond seat count
- Native mobile
- E-filing to TDLR (we generate a packet; user submits)

## Success metrics
- 10 paying subscribers in first 30 days
- < 2 min from landing → eligibility result
- Pro conversion ≥ 8% of free eligibility checks

## Architecture
Cloudflare-only: Workers (Hono) + D1 + R2 + Pages. No microservices. All licensing logic in `docs/texas-electrical-rules.json`, evaluated by `src/backend/rules-engine/`.

## Feature gates
| Feature | Starter | Pro | Business |
|---|---|---|---|
| Eligibility check | ✓ | ✓ | ✓ |
| Roadmap | | ✓ | ✓ |
| Document vault | | ✓ | ✓ |
| Application builder | | ✓ | ✓ |
| Renewal reminders | | | ✓ |
| Additional seats | | | ✓ (up to 5) |
