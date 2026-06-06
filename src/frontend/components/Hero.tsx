import { CTAButton } from "./CTAButton";

export function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <span className="eyebrow">Texas Electrical Contractor License</span>
        <h1 className="h1">
          Get your Texas Electrical Contractor License without hiring a $3,000 consultant.
        </h1>
        <p className="lead">
          Stop guessing requirements and wasting weeks on paperwork. We guide you step-by-step
          from eligibility check to TDLR approval — for less than a single consultant hour.
        </p>
        <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
          <CTAButton href="/eligibility">Check eligibility free →</CTAButton>
          <CTAButton href="/onboarding" variant="ghost">Start application</CTAButton>
        </div>
        <p style={{ color: "var(--fg-muted)", marginTop: 16, fontSize: 14 }}>
          No credit card required for the eligibility check.
        </p>
      </div>
    </section>
  );
}
