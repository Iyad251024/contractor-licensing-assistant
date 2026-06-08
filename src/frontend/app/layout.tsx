import type { ReactNode } from "react";
import "../styles/globals.css";

export const metadata = {
  title: "Contractor Licensing Assistant — Texas Electrical",
  description:
    "Get your Texas Electrical Contractor License without hiring a $3,000 consultant. Eligibility, roadmap, document management, and renewal tracking.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* TDLR disclaimer */}
        <div className="disclaimer-bar">
          <div className="container">
            <span className="disclaimer-bar-icon">ℹ️</span>
            Licensed.tx is a <strong>private software platform</strong> — not affiliated with, endorsed by,
            or connected to the <strong>Texas Department of Licensing and Regulation (TDLR)</strong> or any government agency.
          </div>
        </div>

        <nav className="nav">
          <div className="container nav-inner">
            <a className="brand" href="/">
              Licensed<span className="brand-dot">.tx</span>
            </a>
            <div className="nav-links">
              <a href="/#how-it-works" className="nav-link">How It Works</a>
              <a href="/#pricing" className="nav-link">Pricing</a>
              <a href="/login" className="btn btn-ghost btn-sm">Sign in</a>
              <a href="/eligibility" className="btn btn-primary btn-sm">Check Eligibility Free</a>
            </div>
          </div>
        </nav>

        <main>{children}</main>

        <footer className="footer">
          <div className="container">
            <div className="footer-inner">
              <div className="footer-brand">
                <a className="brand" href="/">Licensed<span className="brand-dot">.tx</span></a>
                <p className="footer-tagline">Texas Electrical Contractor Licensing Platform</p>
                <p className="footer-disclaimer">Not affiliated with the Texas Department of Licensing and Regulation.</p>
              </div>
              <div className="footer-links">
                <div className="footer-col">
                  <div className="footer-col-title">Platform</div>
                  <a href="/eligibility">Eligibility Check</a>
                  <a href="/login">Sign In</a>
                  <a href="/#pricing">Pricing</a>
                </div>
                <div className="footer-col">
                  <div className="footer-col-title">Resources</div>
                  <a href="/#how-it-works">How It Works</a>
                  <a href="/#faq">FAQ</a>
                </div>
                <div className="footer-col">
                  <div className="footer-col-title">Legal</div>
                  <a href="/terms">Terms of Service</a>
                  <a href="/privacy">Privacy Policy</a>
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              © {new Date().getFullYear()} Licensed.tx &nbsp;·&nbsp;
              <a href="/privacy">Privacy</a> &nbsp;·&nbsp;
              <a href="/terms">Terms</a>
            </div>
          </div>
        </footer>

        {/* Floating support chat */}
        <a
          href="mailto:hammoudi.ismail@gmail.com?subject=Licensed.tx%20Support&body=Hello%2C%20I%20have%20a%20question%20about%20Licensed.tx%3A"
          className="chat-widget"
          title="Contact support"
        >
          <svg className="chat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          <span className="chat-label">Support</span>
        </a>
      </body>
    </html>
  );
}
