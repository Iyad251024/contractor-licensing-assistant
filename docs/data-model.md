# Data Model

D1 (SQLite). All IDs are `TEXT` UUIDs unless noted. Timestamps stored as ISO-8601 strings.

## users
| col | type | notes |
|---|---|---|
| id | TEXT PK | uuid |
| email | TEXT UNIQUE | |
| password_hash | TEXT | PBKDF2-SHA256, 100k iters |
| name | TEXT | |
| jurisdiction | TEXT | always `TX_ELECTRICAL` in MVP |
| stripe_customer_id | TEXT | nullable |
| stripe_subscription_id | TEXT | nullable |
| subscription_status | TEXT | `none`, `active`, `past_due`, `canceled` |
| plan_type | TEXT | `starter`, `pro`, `business`, `none` |
| created_at | TEXT | |

## applications
| col | type | notes |
|---|---|---|
| id | TEXT PK | |
| user_id | TEXT FK→users | |
| jurisdiction | TEXT | |
| status | TEXT | `draft`, `ready`, `submitted`, `approved`, `rejected` |
| eligibility_result | TEXT JSON | last `EligibilityResult` |
| wizard_answers | TEXT JSON | raw wizard responses |
| submitted_at | TEXT | nullable |
| approved_at | TEXT | nullable |
| license_number | TEXT | nullable, populated on approval |
| license_expires_at | TEXT | nullable, drives renewal reminders |
| created_at | TEXT | |
| updated_at | TEXT | |

## documents
| col | type | notes |
|---|---|---|
| id | TEXT PK | |
| user_id | TEXT FK→users | |
| application_id | TEXT FK→applications | nullable |
| doc_type | TEXT | e.g. `master_electrician_license`, `coi`, `ein_letter` |
| r2_key | TEXT | object key in `DOCS` bucket |
| filename | TEXT | original name |
| mime | TEXT | |
| size_bytes | INTEGER | |
| uploaded_at | TEXT | |

## roadmap_steps
| col | type | notes |
|---|---|---|
| id | TEXT PK | |
| application_id | TEXT FK→applications | |
| step_key | TEXT | e.g. `pass_master_exam` |
| title | TEXT | |
| description | TEXT | |
| order_index | INTEGER | |
| status | TEXT | `pending`, `in_progress`, `done`, `blocked` |
| due_date | TEXT | nullable |

## billing_events
| col | type | notes |
|---|---|---|
| id | TEXT PK | |
| user_id | TEXT FK→users | nullable until matched |
| stripe_event_id | TEXT UNIQUE | for idempotency |
| event_type | TEXT | `checkout.session.completed`, etc. |
| payload | TEXT JSON | raw event |
| created_at | TEXT | |

## Indexes
- `users.email`, `users.stripe_customer_id`
- `applications.user_id`
- `documents.user_id`, `documents.application_id`
- `roadmap_steps.application_id`
- `billing_events.stripe_event_id`
