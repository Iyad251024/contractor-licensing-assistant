# Contractor Licensing Assistant

Replace the $3,000 licensing consultant with a guided software workflow. MVP focuses on the **Texas Electrical Contractor License**.

## Stack

- **Backend:** Cloudflare Workers (TypeScript, Hono)
- **DB:** Cloudflare D1
- **Storage:** Cloudflare R2
- **Frontend:** Cloudflare Pages (Next.js app router)
- **Billing:** Stripe Checkout + webhooks
- **Auth:** JWT (HS256) over D1-backed users

## Features

1. Eligibility checker (rules-based)
2. Personalized roadmap generator
3. Document vault (R2)
4. Application tracker
5. Renewal tracker
6. Stripe subscriptions (Starter / Pro / Business) with feature gating

All license logic is data-driven from [`docs/texas-electrical-rules.json`](docs/texas-electrical-rules.json).

## Quick Start

```bash
# 1. install
npm install

# 2. configure
cp .env.example .dev.vars
# fill JWT_SECRET, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, STRIPE_PRICE_*

# 3. create D1 + R2
wrangler d1 create contractor_licensing
wrangler r2 bucket create contractor-licensing-docs
# paste returned IDs into wrangler.toml

# 4. run migrations
wrangler d1 migrations apply contractor_licensing --local
wrangler d1 migrations apply contractor_licensing --remote

# 5. seed rules
npm run seed

# 6. dev
wrangler dev          # backend on :8787
npm run dev:frontend  # frontend on :3000
```

## Deploy

```bash
# backend
wrangler deploy

# frontend (Cloudflare Pages)
npm run build:frontend
npx wrangler pages deploy src/frontend/.next
```

Point Stripe webhook at `https://<your-worker>.workers.dev/api/billing/webhook`.

## Repo Layout

See [docs/prd.md](docs/prd.md), [docs/data-model.md](docs/data-model.md), [docs/api-spec.md](docs/api-spec.md).

## Plans

| Plan | Price | Includes |
|------|-------|----------|
| Starter | $29/mo | Eligibility checker |
| Pro | $79/mo | Roadmap + documents + application builder |
| Business | $199/mo | Multi-user + renewal tracker |

Feature gating is enforced by [src/backend/middleware/subscription.middleware.ts](src/backend/middleware/subscription.middleware.ts).
