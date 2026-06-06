# API Spec

Base: `https://<worker>.workers.dev/api`
Auth: `Authorization: Bearer <jwt>` unless noted.

## Auth
- `POST /auth/register` — `{ email, password, name }` → `{ token, user }`
- `POST /auth/login` — `{ email, password }` → `{ token, user }`
- `GET  /auth/me` — current user

## Eligibility (Starter+)
- `POST /eligibility/check` — `{ answers }` → `EligibilityResult`

## Roadmap (Pro+)
- `POST /roadmap/generate` — `{ applicationId }` → `{ steps: RoadmapStep[] }`
- `GET  /roadmap/:applicationId` — steps with current status
- `PATCH /roadmap/step/:id` — `{ status }`

## Documents (Pro+)
- `POST /documents/upload` — multipart: `file`, `docType`, optional `applicationId`
- `GET  /documents` — list current user's docs
- `GET  /documents/:id` — signed download URL
- `DELETE /documents/:id`

## Application (Pro+)
- `POST /application` — create draft
- `GET  /application` — current user's application
- `PATCH /application/:id` — update wizard answers / status
- `POST /application/:id/submit` — transition draft → submitted

## Renewal (Business)
- `GET  /renewal` — days remaining, license expiry, reminders status
- `POST /renewal/mark-renewed` — `{ newExpiry }`

## Billing
- `POST /billing/checkout` — `{ plan: "starter"|"pro"|"business" }` → `{ url }`
- `POST /billing/portal` → `{ url }`
- `POST /billing/webhook` — raw Stripe event (no auth, signature-verified)

## Errors
All errors: `{ error: string, code: string }` with appropriate HTTP status.
