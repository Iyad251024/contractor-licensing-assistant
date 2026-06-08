export const metadata = {
  title: "Privacy Policy — Licensed.tx",
  description: "Privacy Policy for Licensed.tx, the Texas Electrical Contractor License platform.",
};

export default function PrivacyPage() {
  return (
    <div className="legal-page">
      <div className="container">
        <div className="legal-content">
          <div className="legal-header">
            <span className="section-label">Legal</span>
            <h1 className="h1" style={{ fontSize: "clamp(28px, 3vw, 40px)", marginTop: 12 }}>
              Privacy Policy
            </h1>
            <p className="muted">Last updated: June 8, 2026</p>
          </div>

          <div className="legal-notice">
            We take your privacy seriously. This policy explains what data we collect, how
            we use it, and your rights regarding your personal information.
          </div>

          <section className="legal-section">
            <h2>1. Who We Are</h2>
            <p>
              Licensed.tx is a software platform that helps Texas electricians organize their
              Texas Electrical Contractor License application process. References to "Licensed.tx",
              "we", "us", or "our" in this policy refer to the Licensed.tx platform and its
              operators.
            </p>
            <p>
              Licensed.tx is not affiliated with the Texas Department of Licensing and
              Regulation (TDLR).
            </p>
          </section>

          <section className="legal-section">
            <h2>2. Data We Collect</h2>
            <h3>Account information</h3>
            <ul>
              <li>Email address</li>
              <li>Name (first and last)</li>
              <li>Password (stored as a hashed value — we never store your plain-text password)</li>
            </ul>
            <h3>Licensing information</h3>
            <ul>
              <li>Answers to eligibility questions</li>
              <li>Years of electrical experience</li>
              <li>Business entity information</li>
              <li>Licensing progress and application status</li>
            </ul>
            <h3>Documents</h3>
            <ul>
              <li>Files you upload to the document vault (Master Electrician license, insurance
                certificates, EIN letters, experience affidavits, etc.)</li>
            </ul>
            <h3>Payment information</h3>
            <ul>
              <li>Payment transactions are processed by Stripe. Licensed.tx does not store
                credit card numbers. We receive a Stripe customer ID and subscription/payment
                status only.</li>
            </ul>
            <h3>Usage data</h3>
            <ul>
              <li>Pages visited, features used, timestamps</li>
              <li>IP address and browser type (collected by Cloudflare infrastructure)</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>3. How We Use Your Data</h2>
            <ul>
              <li>To provide and operate the Licensed.tx platform</li>
              <li>To personalize your licensing roadmap and eligibility assessment</li>
              <li>To store and organize your licensing documents</li>
              <li>To process payments and manage your subscription</li>
              <li>To send renewal reminders and application status updates</li>
              <li>To respond to support requests</li>
              <li>To improve the platform (aggregated, anonymized analytics only)</li>
            </ul>
            <p>
              We do <strong>not</strong> sell your personal data to third parties.
              We do <strong>not</strong> use your data for advertising targeting on external platforms.
            </p>
          </section>

          <section className="legal-section">
            <h2>4. Third-Party Services</h2>
            <p>We use the following third-party services to operate the Platform:</p>
            <div className="legal-table">
              <div className="legal-table-row">
                <span className="legal-table-key">Stripe</span>
                <span className="legal-table-val">
                  Payment processing. Stripe has its own Privacy Policy at stripe.com/privacy.
                </span>
              </div>
              <div className="legal-table-row">
                <span className="legal-table-key">Cloudflare</span>
                <span className="legal-table-val">
                  Infrastructure, CDN, R2 object storage for documents, D1 database.
                  Cloudflare's Privacy Policy is available at cloudflare.com/privacypolicy.
                </span>
              </div>
            </div>
            <p>
              We do not share your personal data with any other third parties except as
              required by law.
            </p>
          </section>

          <section className="legal-section">
            <h2>5. Document Storage and Security</h2>
            <p>
              Documents you upload are stored in Cloudflare R2, a secure object storage
              service. Documents are associated with your account and are only accessible
              by you and, where necessary, Licensed.tx staff for support purposes.
            </p>
            <p>
              We use industry-standard security practices including encryption in transit
              (HTTPS/TLS) and access controls. However, no system is 100% secure, and we
              cannot guarantee absolute security of your data.
            </p>
          </section>

          <section className="legal-section">
            <h2>6. Data Retention</h2>
            <ul>
              <li>
                <strong>Active accounts:</strong> Data is retained while your account is active.
              </li>
              <li>
                <strong>After account deletion:</strong> Personal data is deleted within 30 days,
                except where we are required to retain it for legal or billing purposes (e.g.,
                transaction records retained for 7 years per tax requirements).
              </li>
              <li>
                <strong>Documents:</strong> Deleted immediately upon your request or within 30
                days of account deletion.
              </li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>7. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li><strong>Access</strong> the personal data we hold about you</li>
              <li><strong>Correct</strong> inaccurate personal data</li>
              <li><strong>Delete</strong> your account and personal data</li>
              <li><strong>Export</strong> your data in a portable format</li>
              <li><strong>Withdraw consent</strong> at any time (where processing is based on consent)</li>
            </ul>
            <p>
              To exercise any of these rights, contact us at{" "}
              <a href="mailto:support@licensed.tx">support@licensed.tx</a>. We will respond
              within 30 days.
            </p>
          </section>

          <section className="legal-section">
            <h2>8. Cookies</h2>
            <p>
              Licensed.tx uses minimal cookies necessary to operate the Platform, including
              session authentication cookies. We do not use tracking or advertising cookies.
            </p>
          </section>

          <section className="legal-section">
            <h2>9. Children's Privacy</h2>
            <p>
              The Platform is not intended for users under 18 years of age. We do not
              knowingly collect personal data from children under 18.
            </p>
          </section>

          <section className="legal-section">
            <h2>10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of
              material changes by email or by posting a notice on the Platform. Continued
              use of the Platform after changes take effect constitutes acceptance of the
              updated Privacy Policy.
            </p>
          </section>

          <section className="legal-section">
            <h2>11. Contact</h2>
            <p>
              For privacy-related questions or to exercise your rights, contact us at:{" "}
              <a href="mailto:support@licensed.tx">support@licensed.tx</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
