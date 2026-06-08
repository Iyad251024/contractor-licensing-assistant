import { CTAButton } from "./CTAButton";

const requirements = [
  { done: true,  text: "Experience Verified" },
  { done: true,  text: "Business Entity Created" },
  { done: true,  text: "Master Electrician License" },
  { done: false, text: "Insurance Certificate Missing" },
  { done: false, text: "EIN Letter Missing" },
];

const roadmapSteps = [
  { done: true,   active: false, label: "Step 1 — Eligibility Confirmed", num: 1 },
  { done: true,   active: false, label: "Step 2 — Business Entity",        num: 2 },
  { done: false,  active: true,  label: "Step 3 — Document Collection",    num: 3 },
  { done: false,  active: false, label: "Final Submission",                  num: 4 },
];

export function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-grid">

          {/* ── Left: copy ── */}
          <div className="hero-content">
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              Texas Electrical Contractor License
            </span>

            <h1 className="h1">
              Get Your Texas Electrical Contractor License Without Missing a Single Requirement
            </h1>

            <p className="lead">
              Stop guessing TDLR requirements and wasting weeks on paperwork.
              Licensed.tx walks you through every step — from eligibility check to approved license.
            </p>

            <div className="cta-row">
              <CTAButton href="/eligibility">Check Eligibility Free →</CTAButton>
              <CTAButton href="#how-it-works" variant="ghost">See How It Works</CTAButton>
            </div>

            <p style={{ color: "var(--fg-muted)", marginTop: 16, fontSize: 14 }}>
              No credit card required. Takes 2 minutes.
            </p>

            <div className="hero-trust">
              <span className="trust-item">
                <span className="check-icon">✓</span> Based on official TDLR requirements
              </span>
              <span className="trust-item">
                <span className="check-icon">✓</span> Replaces $2,000–$8,000 consultants
              </span>
            </div>
          </div>

          {/* ── Right: dashboard mockup ── */}
          <div className="hero-mockup">
            <div className="mockup-card">

              <div className="mockup-header">
                <div>
                  <span className="mockup-title">License Readiness</span>
                  <span className="mockup-subtitle">Texas Electrical Contractor</span>
                </div>
                <span className="badge badge-warning">In Progress</span>
              </div>

              {/* Readiness score */}
              <div className="readiness-score-block">
                <div className="readiness-score-row">
                  <span className="score-label">Readiness Score</span>
                  <span className="score-value">78%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: "78%" }} />
                </div>
              </div>

              {/* Requirements checklist */}
              <div className="mockup-section-title">Requirements</div>
              <div className="requirement-list">
                {requirements.map((r) => (
                  <div key={r.text} className={`req-item ${r.done ? "req-done" : "req-warn"}`}>
                    <span className={`req-icon${r.done ? "" : " req-icon-warn"}`}>
                      {r.done ? "✓" : "⚠"}
                    </span>
                    <span className="req-text">{r.text}</span>
                  </div>
                ))}
              </div>

              {/* Roadmap progress */}
              <div className="mockup-section-title" style={{ marginTop: 16 }}>Roadmap Progress</div>
              <div className="roadmap-list">
                {roadmapSteps.map((s) => (
                  <div
                    key={s.label}
                    className={`roadmap-step ${s.done ? "step-done" : s.active ? "step-active" : "step-pending"}`}
                  >
                    <div
                      className={`step-indicator ${
                        s.done ? "step-done-indicator" : s.active ? "step-active-indicator" : "step-pending-indicator"
                      }`}
                    >
                      {s.done ? "✓" : s.num}
                    </div>
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>

              {/* Status bar */}
              <div className="mockup-status-bar">
                <span className="status-label">Application Status</span>
                <span className="badge badge-blue">Preparing Submission</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
