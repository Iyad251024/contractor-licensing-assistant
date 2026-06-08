export const metadata = {
  title: "Terms of Service — Licensed.tx",
  description: "Terms of Service for Licensed.tx, the Texas Electrical Contractor License platform.",
};

export default function TermsPage() {
  return (
    <div className="legal-page">
      <div className="container">
        <div className="legal-content">
          <div className="legal-header">
            <span className="section-label">Legal</span>
            <h1 className="h1" style={{ fontSize: "clamp(28px, 3vw, 40px)", marginTop: 12 }}>
              Terms of Service
            </h1>
            <p className="muted">Last updated: June 8, 2026</p>
          </div>

          <div className="legal-notice">
            <strong>Important:</strong> Licensed.tx is a software platform that helps organize the
            Texas Electrical Contractor licensing process. It is <strong>not a law firm</strong>,
            does not provide legal advice, and is <strong>not affiliated with the Texas Department
            of Licensing and Regulation (TDLR)</strong> or any government agency.
          </div>

          <section className="legal-section">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using Licensed.tx ("the Platform", "we", "us"), you agree to be
              bound by these Terms of Service. If you do not agree to these terms, do not use
              the Platform.
            </p>
          </section>

          <section className="legal-section">
            <h2>2. What Licensed.tx Is</h2>
            <p>
              Licensed.tx is a software-as-a-service (SaaS) platform designed to help Texas
              electricians organize the documentation and process required to apply for a Texas
              Electrical Contractor License through the Texas Department of Licensing and
              Regulation (TDLR).
            </p>
            <p>The Platform provides:</p>
            <ul>
              <li>An eligibility assessment tool based on publicly available TDLR requirements</li>
              <li>A personalized licensing roadmap and checklist</li>
              <li>A secure document vault for storing application-related documents</li>
              <li>An application package builder</li>
              <li>Progress tracking and renewal reminders</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>3. What Licensed.tx Is Not</h2>
            <ul>
              <li>Licensed.tx is <strong>not affiliated with TDLR</strong> or any government body</li>
              <li>Licensed.tx does <strong>not provide legal advice</strong></li>
              <li>Licensed.tx does <strong>not guarantee</strong> license approval</li>
              <li>Licensed.tx does <strong>not submit applications on your behalf</strong></li>
              <li>Licensed.tx is <strong>not a licensed contractor agency or consulting firm</strong></li>
            </ul>
            <p>
              You remain solely responsible for the accuracy of your application and compliance
              with all TDLR requirements. Always verify requirements directly with TDLR before
              submitting your application.
            </p>
          </section>

          <section className="legal-section">
            <h2>4. Plans and Payments</h2>
            <h3>Texas License Package — $299 one-time payment</h3>
            <p>
              A one-time purchase granting access to the full licensing workflow, document vault,
              application builder, and progress tracking until your license is approved or the
              account is closed.
            </p>
            <h3>Optional Application Review Add-on — $99 one-time</h3>
            <p>
              An optional add-on providing a manual review of your application package by a
              Licensed.tx team member before submission. This is not legal advice.
            </p>
            <h3>Business Plan — $99/month subscription</h3>
            <p>
              A monthly subscription for electrical companies managing multiple licenses.
              Billed monthly. Cancel at any time. Access continues until the end of the
              current billing period after cancellation.
            </p>
            <p>
              All payments are processed securely through Stripe. Licensed.tx does not store
              your payment card information.
            </p>
          </section>

          <section className="legal-section">
            <h2>5. Refund Policy</h2>
            <p>
              <strong>Texas License Package:</strong> If the eligibility check determines you
              are not currently eligible for a Texas Electrical Contractor License, you are
              entitled to a full refund within 30 days of purchase. Contact
              support@licensed.tx to request a refund.
            </p>
            <p>
              <strong>Business Plan:</strong> Subscription payments are non-refundable for
              the current billing period. You may cancel at any time to prevent future charges.
            </p>
            <p>
              <strong>Application Review Add-on:</strong> Non-refundable once the review has
              been initiated.
            </p>
          </section>

          <section className="legal-section">
            <h2>6. Accuracy of Requirements</h2>
            <p>
              The requirements and checklists provided by Licensed.tx are based on publicly
              available TDLR documentation. We make reasonable efforts to keep this information
              current, but TDLR requirements may change without notice. Licensed.tx cannot
              guarantee that all information is current or complete at all times.
            </p>
            <p>
              <strong>You are responsible for verifying all requirements directly with TDLR
              before submitting your application.</strong>
            </p>
          </section>

          <section className="legal-section">
            <h2>7. User Responsibilities</h2>
            <ul>
              <li>You must provide accurate and truthful information</li>
              <li>You must be a human individual or authorized representative of a business</li>
              <li>You may not use the Platform for any unlawful purpose</li>
              <li>You are responsible for maintaining the confidentiality of your account credentials</li>
              <li>You must be at least 18 years of age</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>8. Document Storage</h2>
            <p>
              Documents uploaded to Licensed.tx are stored securely using Cloudflare R2
              infrastructure. You retain ownership of all documents you upload. We will not
              share your documents with third parties except as required to provide the service
              (e.g., cloud storage providers). You may request deletion of your documents and
              account at any time.
            </p>
          </section>

          <section className="legal-section">
            <h2>9. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Licensed.tx and its operators shall not
              be liable for any indirect, incidental, special, consequential, or punitive
              damages, including but not limited to loss of profits, data, or business
              opportunities, arising out of or related to your use of the Platform.
            </p>
            <p>
              Our total liability to you for any claim arising from these Terms or your use
              of the Platform shall not exceed the amount you paid to Licensed.tx in the
              twelve (12) months preceding the claim.
            </p>
          </section>

          <section className="legal-section">
            <h2>10. Disclaimer of Warranties</h2>
            <p>
              The Platform is provided "as is" and "as available" without warranties of any
              kind, either express or implied, including but not limited to implied warranties
              of merchantability, fitness for a particular purpose, or non-infringement.
              We do not warrant that the Platform will be uninterrupted, error-free, or
              that any defects will be corrected.
            </p>
          </section>

          <section className="legal-section">
            <h2>11. Governing Law</h2>
            <p>
              These Terms are governed by the laws of the State of Texas, United States,
              without regard to its conflict of law provisions.
            </p>
          </section>

          <section className="legal-section">
            <h2>12. Changes to Terms</h2>
            <p>
              We may update these Terms from time to time. We will notify you of material
              changes by email or by posting a notice on the Platform. Continued use of the
              Platform after changes take effect constitutes acceptance of the updated Terms.
            </p>
          </section>

          <section className="legal-section">
            <h2>13. Contact</h2>
            <p>
              For questions about these Terms, contact us at:{" "}
              <a href="mailto:support@licensed.tx">support@licensed.tx</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
