import { Hero } from "../components/Hero";
import { PricingTable } from "../components/PricingTable";
import { CTAButton } from "../components/CTAButton";

export default function LandingPage() {
  return (
    <>
      <Hero />

      <section className="section section-alt">
        <div className="container">
          <h2 className="h2">The problem isn't your skill. It's the paperwork.</h2>
          <p className="lead">
            Getting licensed in Texas isn't hard because the work is hard — it's hard because the
            requirements are scattered, the forms ambiguous, and one missing document sends you
            back to square one.
          </p>
          <div className="grid-3" style={{ marginTop: 32 }}>
            <div className="card">
              <h3 className="h3">$2,000 – $8,000</h3>
              <p style={{ color: "var(--fg-muted)", margin: 0 }}>
                What licensing consultants charge for what's mostly checklist work.
              </p>
            </div>
            <div className="card">
              <h3 className="h3">4 – 12 weeks</h3>
              <p style={{ color: "var(--fg-muted)", margin: 0 }}>
                Typical time lost to TDLR back-and-forth when a document is missing or wrong.
              </p>
            </div>
            <div className="card">
              <h3 className="h3">1 missing form</h3>
              <p style={{ color: "var(--fg-muted)", margin: 0 }}>
                All it takes to restart the clock. We make sure that doesn't happen.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="h2">A step-by-step system that replaces the consultant.</h2>
          <p className="lead">
            Built around the actual TDLR Electrical Contractor process. No fluff, no upsells.
          </p>
          <div className="grid-2" style={{ marginTop: 32 }}>
            <div className="card">
              <h3 className="h3">1. Eligibility check</h3>
              <p style={{ color: "var(--fg-muted)" }}>
                Answer 6 questions. We tell you immediately whether you qualify under current TDLR rules.
              </p>
            </div>
            <div className="card">
              <h3 className="h3">2. Personalized roadmap</h3>
              <p style={{ color: "var(--fg-muted)" }}>
                We generate the exact ordered checklist for your situation — no generic templates.
              </p>
            </div>
            <div className="card">
              <h3 className="h3">3. Document vault</h3>
              <p style={{ color: "var(--fg-muted)" }}>
                Upload your Master Electrician license, COI, EIN letter — all stored securely.
              </p>
            </div>
            <div className="card">
              <h3 className="h3">4. Application tracking</h3>
              <p style={{ color: "var(--fg-muted)" }}>
                Track status from draft through TDLR submission and approval.
              </p>
            </div>
            <div className="card">
              <h3 className="h3">5. Renewal reminders</h3>
              <p style={{ color: "var(--fg-muted)" }}>
                Automatic 60/30/7-day reminders before your license expires. Never lose your license again.
              </p>
            </div>
            <div className="card">
              <h3 className="h3">6. Built on TDLR rules, not guesses</h3>
              <p style={{ color: "var(--fg-muted)" }}>
                Our rules engine is updated when TDLR changes the rules — not when a consultant remembers to update their template.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <h2 className="h2">Simple, honest pricing.</h2>
          <p className="lead" style={{ marginBottom: 32 }}>
            A single month costs less than 30 minutes of a licensing consultant's time.
          </p>
          <PricingTable />
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ textAlign: "center" }}>
          <h2 className="h2">Stop losing weeks on paperwork. Get licensed faster.</h2>
          <p className="lead" style={{ margin: "0 auto 28px" }}>
            Start with a free eligibility check. No credit card required.
          </p>
          <CTAButton href="/eligibility">Check eligibility →</CTAButton>
        </div>
      </section>
    </>
  );
}
