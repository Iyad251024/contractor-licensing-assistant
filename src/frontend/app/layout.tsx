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
        <nav className="nav">
          <div className="container nav-inner">
            <a className="brand" href="/">
              Licensed<span className="brand-dot">.tx</span>
            </a>
            <div style={{ display: "flex", gap: 12 }}>
              <a href="/pricing" className="btn btn-ghost">Pricing</a>
              <a href="/login" className="btn btn-primary">Get started</a>
            </div>
          </div>
        </nav>
        <main>{children}</main>
        <footer className="footer">
          <div className="container">
            © {new Date().getFullYear()} Licensed.tx · Not affiliated with the Texas Department of Licensing and Regulation.
          </div>
        </footer>
      </body>
    </html>
  );
}
