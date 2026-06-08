"use client";
import { startCheckout } from "../lib/stripe.client";
import { getToken } from "../lib/api.client";

const individualFeatures = [
  "Eligibility Assessment",
  "Personalized Licensing Roadmap",
  "Document Vault",
  "Application Builder",
  "Progress Tracking",
  "Texas Licensing Checklist",
  "Access until license approval",
];

const businessFeatures = [
  "Everything in Texas License Package",
  "Multiple Employee Licenses",
  "License Expiration Tracking",
  "Renewal Reminders",
  "Multi-License Dashboard",
  "Team Management",
  "Compliance Monitoring",
];

export function PricingTable() {
  async function go(plan: "starter" | "business") {
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
    <>
      {/* Comparison bar */}
      <div className="pricing-comparison-bar">
        <div className="comparison-item comparison-bad">
          <div className="comparison-label">Hiring a consultant</div>
          <div className="comparison-price">$2,000–$8,000</div>
        </div>
        <div className="comparison-vs">vs</div>
        <div className="comparison-item comparison-good">
          <div className="comparison-label">Licensed.tx</div>
          <div className="comparison-price">Starting at $299</div>
        </div>
        <div className="comparison-savings">
          <div className="savings-label">Potential savings</div>
          <div className="savings-value">Thousands of dollars</div>
        </div>
      </div>

      <div className="pricing-grid">

        {/* Individual — one-time */}
        <div className="price-card price-card-featured">
          <div className="price-tag-row">
            <span className="price-tag">For Individuals</span>
          </div>
          <h3 className="h3">Texas License Package</h3>
          <p className="price-tagline">Perfect for independent electricians getting licensed once.</p>
          <div className="price-display">
            <span className="price-amount-new">$299</span>
            <span className="price-type">one-time payment</span>
          </div>

          <ul className="price-list">
            {individualFeatures.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>

          <div className="price-addon">
            <div className="addon-header">Optional Add-on</div>
            <div className="addon-item">
              <span>Application Review</span>
              <span className="addon-price">+$99</span>
            </div>
            <p className="addon-desc">Expert review of your complete package before submission</p>
          </div>

          <button
            className="btn btn-primary"
            style={{ width: "100%" }}
            onClick={() => go("starter")}
          >
            Get Licensed →
          </button>
        </div>

        {/* Business — subscription */}
        <div className="price-card">
          <div className="price-tag-row">
            <span className="price-tag price-tag-business">For Companies</span>
          </div>
          <h3 className="h3">Business Plan</h3>
          <p className="price-tagline">Ongoing compliance for electrical companies.</p>
          <div className="price-display">
            <span className="price-amount-new">$99</span>
            <span className="price-type">/month</span>
          </div>

          <ul className="price-list">
            {businessFeatures.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>

          <button
            className="btn btn-ghost"
            style={{ width: "100%", marginTop: "auto" }}
            onClick={() => go("business")}
          >
            Start Business Plan
          </button>
        </div>

      </div>
    </>
  );
}
