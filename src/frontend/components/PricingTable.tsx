"use client";
import { startCheckout } from "../lib/stripe.client";
import { getToken } from "../lib/api.client";

const tiers = [
  {
    plan: "starter" as const,
    name: "Starter",
    price: 29,
    tagline: "Find out if you're ready",
    features: ["Eligibility checker", "TDLR rule explanations", "Save your answers"],
  },
  {
    plan: "pro" as const,
    name: "Pro",
    price: 79,
    tagline: "Get licensed",
    popular: true,
    features: [
      "Everything in Starter",
      "Personalized roadmap",
      "Document vault (R2-backed)",
      "Application builder",
      "Status tracking",
    ],
  },
  {
    plan: "business" as const,
    name: "Business",
    price: 199,
    tagline: "Multi-license operations",
    features: [
      "Everything in Pro",
      "Up to 5 team seats",
      "Renewal reminders (60/30/7 day)",
      "Multi-license tracking",
    ],
  },
];

export function PricingTable() {
  async function go(plan: "starter" | "pro" | "business") {
    if (!getToken()) {
      window.location.href = `/login?next=/pricing&plan=${plan}`;
      return;
    }
    try {
      await startCheckout(plan);
    } catch (e: any) {
      alert(e?.message ?? "Checkout failed");
    }
  }

  return (
    <div className="pricing">
      {tiers.map((t) => (
        <div key={t.plan} className={`price-card${t.popular ? " popular" : ""}`}>
          {t.popular && <span className="price-badge">Most popular</span>}
          <h3 className="h3">{t.name}</h3>
          <p style={{ color: "var(--fg-muted)", margin: "0 0 16px" }}>{t.tagline}</p>
          <div className="price-amount">
            ${t.price}
            <small> /month</small>
          </div>
          <ul className="price-list">
            {t.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <button className="btn btn-primary" style={{ width: "100%" }} onClick={() => go(t.plan)}>
            Start {t.name}
          </button>
        </div>
      ))}
    </div>
  );
}
