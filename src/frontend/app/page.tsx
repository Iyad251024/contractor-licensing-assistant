import { Hero } from "../components/Hero";
import { PricingTable } from "../components/PricingTable";
import { CTAButton } from "../components/CTAButton";

/* ────────────────────────────────────────────────── data ── */

const delayCards = [
  { icon: "📋", title: "Missing Experience Affidavits",      desc: "TDLR requires specific documentation of supervised experience. Generic references don't qualify." },
  { icon: "📄", title: "Incorrect Insurance Documentation",  desc: "Wrong coverage amounts, missing endorsements, or expired certificates cause instant rejections." },
  { icon: "🏢", title: "Missing Business Registration",      desc: "Your business entity must be properly registered before TDLR will process the application." },
  { icon: "📦", title: "Incomplete Application Packages",    desc: "One missing form sends your entire submission back. TDLR won't process partial packages." },
  { icon: "⏰", title: "Late Renewal Documentation",          desc: "Missing renewal deadlines can trigger license lapse, requiring a full re-application process." },
  { icon: "✅", title: "Licensed.tx catches all of this",    desc: "We identify these issues before you submit, so you get approved the first time.", highlight: true },
];

const features = [
  { icon: "🎯", title: "Know if you're eligible before spending time and money.",   desc: "Answer 6 questions based on actual TDLR criteria. Get a clear yes/no in under 2 minutes.",                   tag: "Eligibility Assessment" },
  { icon: "🗺️", title: "Get a personalized licensing plan.",                        desc: "We generate the exact ordered checklist for your specific situation — no generic templates.",                   tag: "Licensing Roadmap" },
  { icon: "🗂️", title: "Never lose required paperwork.",                            desc: "Secure vault for your Master Electrician license, COI, EIN letter, and all supporting docs.",                  tag: "Document Vault" },
  { icon: "📊", title: "Track every step until approval.",                          desc: "Real-time status from draft through TDLR submission. Know exactly where you stand.",                            tag: "Application Tracking" },
  { icon: "🔔", title: "Avoid accidental license expiration.",                      desc: "Automatic 60, 30, and 7-day renewal reminders. Never lose your license to a missed deadline.",                 tag: "Renewal Reminders" },
  { icon: "⚖️", title: "Built on official TDLR requirements.",                      desc: "Our rules engine reflects actual TDLR regulations — updated when requirements change, not when someone remembers.", tag: "TDLR Rules Engine" },
];

const timelineSteps = [
  { num: 1,    title: "Eligibility Check",      desc: "Answer 6 questions based on official TDLR criteria. Instantly know if you qualify and what's missing.", time: "~2 minutes",  done: true },
  { num: 2,    title: "Experience Verification", desc: "Document your electrical work history with the required affidavits and reference letters TDLR expects.",  time: "1–2 days",   done: true },
  { num: 3,    title: "Document Collection",     desc: "Gather and organize your insurance certificate, business registration, EIN letter, and supporting docs.",  time: "3–7 days",   active: true },
  { num: 4,    title: "Application Package",     desc: "Our application builder assembles your complete package. Optional expert review before submission.",         time: "1–2 days",   pending: true },
  { num: 5,    title: "TDLR Submission",         desc: "Submit your verified, complete application package to TDLR. Track status in real time.",                    time: "Same day",   pending: true },
  { num: "🏆", title: "License Approval",        desc: "TDLR reviews and approves your application. Your Texas Electrical Contractor License is issued.",           time: "Approved ✓", final: true },
];

const trustBullets = [
  { title: "Texas Electrical Contractor License workflow",  desc: "Every step matches TDLR's official licensing process." },
  { title: "Insurance requirements guidance",               desc: "Exact coverage amounts and documentation formats TDLR requires." },
  { title: "Business registration guidance",                desc: "Entity requirements before TDLR will process your application." },
  { title: "Renewal tracking",                              desc: "Automatic reminders so your license never lapses." },
  { title: "Document organization",                         desc: "Secure vault for every required document, organized by requirement." },
];

const tdlrItems = [
  "Master Electrician License (active)",
  "4+ years supervised experience",
  "Business entity registration",
  "Certificate of insurance ($500K)",
  "EIN / Federal Tax ID letter",
  "Application fee payment",
  "Experience affidavits",
];

const readinessQuestions = [
  { q: "How many years of electrical experience do you have?", opts: ["Less than 2 years", "2–4 years", "4+ years ✓"], sel: 2, active: true },
  { q: "Do you hold a Master Electrician License?",           opts: ["Yes ✓", "No"],               sel: 0 },
  { q: "Is your business entity registered?",                 opts: ["Yes ✓", "No — I need help"], sel: 0 },
  { q: "Have you obtained your certificate of insurance?",    opts: ["Yes", "Not yet"],             pending: true },
  { q: "Is your EIN letter available?",                       opts: ["Yes", "No"],                  pending: true },
];

const faqItems = [
  {
    q: "Do I still need a consultant?",
    a: "No. Licensed.tx replaces the need for a licensing consultant for most Texas Electrical Contractor applications. The platform guides you through every TDLR requirement, helps you collect the right documents, and builds your application package. Consultants typically charge $2,000–$8,000 for this work.",
  },
  {
    q: "How does Licensed.tx differ from a consultant?",
    a: "A consultant handles your application manually, charges thousands of dollars, and you have no visibility into the process. Licensed.tx gives you a self-service platform built on official TDLR requirements — you stay in control, move faster, and pay a fraction of the cost.",
  },
  {
    q: "Is this an official government service?",
    a: "No. Licensed.tx is a private software platform and is not affiliated with, endorsed by, or connected to the Texas Department of Licensing and Regulation (TDLR) or any government agency. We help you organize and prepare your application using publicly available TDLR requirements.",
  },
  {
    q: "How accurate are the requirements?",
    a: "Our requirements are based on publicly available TDLR documentation. We update our rules engine when TDLR changes their requirements. You should always verify final requirements directly with TDLR before submission, as regulations can change.",
  },
  {
    q: "What if I'm not eligible?",
    a: "If the eligibility check shows you don't currently qualify, we'll tell you exactly what's missing and what steps to take. If you purchased the Texas License Package and are not eligible, contact us for a full refund.",
  },
  {
    q: "Can I cancel the Business Plan?",
    a: "Yes. The Business Plan is a monthly subscription you can cancel at any time. Your access continues through the end of your billing period. The Texas License Package is a one-time payment with lifetime access until your license is approved.",
  },
];

/* ────────────────────────────────────────────────── page ── */

export default function LandingPage() {
  return (
    <>
      <Hero />

      {/* ── Stats bar ──────────────────────────────── */}
      <div className="stats-bar">
        <div className="container">
          <div className="stats-inner">
            <div className="stat-item">
              <span className="stat-number">$2,000–$8,000</span>
              <span className="stat-desc">What consultants charge</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-number">4–12 weeks</span>
              <span className="stat-desc">Lost to TDLR back-and-forth</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-number">1 missing form</span>
              <span className="stat-desc">All it takes to restart the clock</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Readiness check ────────────────────────── */}
      <section className="section section-alt" id="readiness-check">
        <div className="container">
          <span className="section-label">Free Tool</span>
          <h2 className="h2 centered">
            Free Texas Electrical License<br />Readiness Check
          </h2>
          <p className="lead centered" style={{ margin: "0 auto 48px" }}>
            Answer 5 questions and instantly discover if you're eligible, what's missing, and what to do next.
          </p>

          <div className="readiness-check-layout">
            <div className="readiness-questions">
              {readinessQuestions.map((item, i) => (
                <div
                  key={i}
                  className={[
                    "check-question",
                    item.active   ? "active-question"        : "",
                    item.pending  ? "check-question-pending" : "",
                  ].join(" ").trim()}
                >
                  <div className="q-number">{i + 1}</div>
                  <div className="q-content">
                    <div className="q-text">{item.q}</div>
                    <div className="q-options">
                      {item.opts.map((o, j) => (
                        <div key={o} className={`q-option${item.sel === j ? " q-option-selected" : ""}`}>{o}</div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="readiness-output">
              <div className="output-card">
                <div className="output-score-row">
                  <div>
                    <div className="output-score-label">Your Readiness Score</div>
                    <div className="output-score-value">82%</div>
                  </div>
                  <svg viewBox="0 0 36 36" width="80" height="80">
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#2563eb" strokeWidth="3"
                      strokeDasharray="82 18" strokeDashoffset="25" strokeLinecap="round" />
                    <text x="18" y="21" textAnchor="middle" fontSize="8" fontWeight="700" fill="#0b1220">82%</text>
                  </svg>
                </div>
                <div className="output-section">
                  <div className="output-section-title missing">Missing Requirements</div>
                  <div className="output-item output-item-warn"><span>⚠</span> Insurance Certificate</div>
                  <div className="output-item output-item-warn"><span>⚠</span> EIN Letter</div>
                </div>
                <div className="output-section">
                  <div className="output-section-title next-step">Next Step</div>
                  <div className="output-next-step">
                    Obtain your certificate of insurance before submitting your application package.
                  </div>
                </div>
                <div style={{ marginTop: 20 }}>
                  <CTAButton href="/eligibility">Get My Full Readiness Report →</CTAButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why apps get delayed ────────────────────── */}
      <section className="section">
        <div className="container">
          <span className="section-label">Common Mistakes</span>
          <h2 className="h2 centered">What Delays Most License Applications?</h2>
          <p className="lead centered" style={{ margin: "0 auto 48px" }}>
            Most rejections come from avoidable paperwork errors, not qualifications.
          </p>
          <div className="grid-3">
            {delayCards.map((c) => (
              <div key={c.title} className={`card delay-card${c.highlight ? " delay-card-highlight" : ""}`}>
                <div className="delay-icon">{c.icon}</div>
                <h3 className="h3" style={c.highlight ? { color: "var(--brand)" } : undefined}>{c.title}</h3>
                <p className="muted">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features grid ──────────────────────────── */}
      <section className="section section-alt" id="features">
        <div className="container">
          <span className="section-label">Platform Features</span>
          <h2 className="h2 centered">Everything You Need to Get Licensed</h2>
          <p className="lead centered" style={{ margin: "0 auto 48px" }}>
            Built specifically around TDLR's Texas Electrical Contractor requirements.
          </p>
          <div className="grid-3">
            {features.map((f) => (
              <div key={f.tag} className="feature-card">
                <div className="feature-icon">{f.icon}</div>
                <h3 className="h3">{f.title}</h3>
                <p className="muted">{f.desc}</p>
                <span className="feature-tag">{f.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ────────────────────────────────── */}
      <section className="section" id="how-it-works">
        <div className="container">
          <span className="section-label">Step by Step</span>
          <h2 className="h2 centered">Your Licensing Journey</h2>
          <p className="lead centered" style={{ margin: "0 auto 48px" }}>
            A clear path from eligibility check to approved license — no guesswork.
          </p>
          <div className="timeline">
            {timelineSteps.map((s, i) => (
              <div key={s.title} className={`timeline-step${s.final ? " timeline-step-last" : ""}`}>
                <div className="timeline-indicator">
                  <div className={`timeline-dot ${s.done ? "timeline-dot-done" : s.active ? "timeline-dot-active" : "timeline-dot-pending"}`}>
                    {s.done ? "✓" : s.num}
                  </div>
                  {!s.final && <div className="timeline-line" />}
                </div>
                <div className="timeline-content">
                  <div className="timeline-step-number">{s.final ? "Final Step" : `Step ${s.num}`}</div>
                  <h3 className="timeline-title">{s.title}</h3>
                  <p className="timeline-desc">{s.desc}</p>
                  <span className={s.final ? "badge-success-sm" : "timeline-time"}>{s.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust section ───────────────────────────── */}
      <section className="section section-alt">
        <div className="container">
          <div className="trust-layout">
            <div className="trust-content">
              <span className="section-label">Official Requirements</span>
              <h2 className="h2">Built Around Official Texas Requirements</h2>
              <p className="lead">
                Licensed.tx is designed specifically around publicly available Texas Department of
                Licensing and Regulation (TDLR) requirements. We help organize the process,
                documentation, and milestones required to obtain a Texas Electrical Contractor License.
              </p>
              <div className="trust-bullets">
                {trustBullets.map((b) => (
                  <div key={b.title} className="trust-bullet">
                    <span className="trust-check">✓</span>
                    <div>
                      <strong>{b.title}</strong>
                      <p className="muted">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="disclaimer">
                <span>ℹ️</span>
                Licensed.tx is not affiliated with the Texas Department of Licensing and Regulation.
              </div>
            </div>

            <div className="trust-visual">
              <div className="tdlr-card">
                <div className="tdlr-header">
                  <span className="tdlr-badge">TDLR Requirements</span>
                </div>
                <div className="tdlr-checklist">
                  {tdlrItems.map((item) => (
                    <div key={item} className="tdlr-item">
                      <span className="tdlr-check">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <div className="tdlr-source">Source: TDLR Electrical Contractor requirements</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Who is this for ─────────────────────────── */}
      <section className="section">
        <div className="container">
          <span className="section-label">Who It's For</span>
          <h2 className="h2 centered">Who Uses Licensed.tx?</h2>
          <p className="lead centered" style={{ margin: "0 auto 48px" }}>
            Built for Texas electricians at every stage of their licensing journey.
          </p>
          <div className="grid-3">
            <div className="audience-card">
              <div className="audience-icon">⚡</div>
              <h3 className="h3">Independent Electricians</h3>
              <p className="muted">Get licensed without paying expensive consultants. A structured process that replaces the $2,000–$8,000 consulting fee.</p>
              <a href="/eligibility" className="audience-link">Check eligibility →</a>
            </div>
            <div className="audience-card audience-card-featured">
              <span className="audience-badge">Most Common</span>
              <div className="audience-icon">🏗️</div>
              <h3 className="h3">New Electrical Businesses</h3>
              <p className="muted">Launch your contracting business faster with a structured licensing process designed for new entrants.</p>
              <a href="/eligibility" className="audience-link">Start your process →</a>
            </div>
            <div className="audience-card">
              <div className="audience-icon">🏢</div>
              <h3 className="h3">Established Contractors</h3>
              <p className="muted">Manage renewals, compliance tracking, and multi-employee licensing from a single dashboard.</p>
              <a href="#pricing" className="audience-link">See Business plan →</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing ─────────────────────────────────── */}
      <section className="section section-alt" id="pricing">
        <div className="container">
          <span className="section-label">Pricing</span>
          <h2 className="h2 centered">Simple, Transparent Pricing</h2>
          <p className="lead centered" style={{ margin: "0 auto 40px" }}>
            No subscription required to get licensed.
          </p>
          <PricingTable />
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────── */}
      <section className="section" id="faq">
        <div className="container">
          <span className="section-label">Questions</span>
          <h2 className="h2 centered">Frequently Asked Questions</h2>
          <p className="lead centered" style={{ margin: "0 auto 48px" }}>
            Common questions about Licensed.tx and the Texas Electrical Contractor licensing process.
          </p>
          <div className="faq-list">
            {faqItems.map((item) => (
              <details key={item.q} className="faq-item">
                <summary className="faq-question">{item.q}</summary>
                <div className="faq-answer">{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ───────────────────────────────── */}
      <section className="section section-cta">
        <div className="container centered">
          <h2 className="h2">Ready to get your Texas Electrical Contractor License?</h2>
          <p className="lead" style={{ margin: "0 auto 28px" }}>
            Start with a free eligibility check. Takes 2 minutes. No credit card required.
          </p>
          <div className="cta-row" style={{ justifyContent: "center" }}>
            <CTAButton href="/eligibility">Check Eligibility Free →</CTAButton>
            <a href="#pricing" className="btn btn-ghost-light">View Pricing</a>
          </div>
          <p style={{ color: "rgba(255,255,255,0.45)", marginTop: 20, fontSize: 14 }}>
            ✓ Based on official TDLR requirements &nbsp;·&nbsp; ✓ Not a consultant &nbsp;·&nbsp; ✓ Starting at $299
          </p>
        </div>
      </section>
    </>
  );
}
