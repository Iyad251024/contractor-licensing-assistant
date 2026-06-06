"use client";
import { useEffect, useState } from "react";
import { api, getToken } from "../../lib/api.client";
import { openPortal } from "../../lib/stripe.client";
import { ProgressBar } from "../../components/ProgressBar";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [app, setApp] = useState<any>(null);
  const [steps, setSteps] = useState<any[]>([]);
  const [docs, setDocs] = useState<any[]>([]);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!getToken()) {
      window.location.href = "/login?next=/dashboard";
      return;
    }
    (async () => {
      try {
        const me = await api.me();
        setUser(me.user);
        try {
          const a = await api.getApplication();
          setApp(a.application);
          if (a.application?.id) {
            const r = await api.getRoadmap(a.application.id);
            setSteps(r.steps);
          }
          const d = await api.listDocuments();
          setDocs(d.documents);
        } catch {
          // pro/business gated calls may 402 on starter — ignore
        }
      } catch (e: any) {
        setErr(e?.message ?? "Failed to load");
      }
    })();
  }, []);

  if (err) return <div className="container section"><div className="alert alert-err">{err}</div></div>;
  if (!user) return <div className="container section">Loading…</div>;

  const done = steps.filter((s) => s.status === "done").length;
  const pct = steps.length ? (done / steps.length) * 100 : 0;

  return (
    <section className="section">
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 className="h2">Welcome, {user.name || user.email}</h1>
            <p style={{ color: "var(--fg-muted)" }}>
              Plan: <strong>{user.plan_type}</strong> · Status: <strong>{user.subscription_status}</strong>
            </p>
          </div>
          <button className="btn btn-ghost" onClick={() => openPortal()}>Manage billing</button>
        </div>

        <div className="grid-2" style={{ marginTop: 24 }}>
          <div className="card">
            <h3 className="h3">Your application</h3>
            {app ? (
              <>
                <p>Status: <strong>{app.status}</strong></p>
                {steps.length > 0 && (
                  <>
                    <p style={{ color: "var(--fg-muted)" }}>{done} of {steps.length} steps complete</p>
                    <ProgressBar pct={pct} />
                  </>
                )}
                <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
                  <a className="btn btn-primary" href="/roadmap">Open roadmap</a>
                  <a className="btn btn-ghost" href="/application">Application</a>
                </div>
              </>
            ) : (
              <>
                <p style={{ color: "var(--fg-muted)" }}>You haven't started an application yet.</p>
                <a className="btn btn-primary" href="/eligibility">Start with eligibility</a>
              </>
            )}
          </div>

          <div className="card">
            <h3 className="h3">Documents</h3>
            <p style={{ color: "var(--fg-muted)" }}>{docs.length} uploaded</p>
            <a className="btn btn-primary" href="/documents">Open vault</a>
          </div>
        </div>
      </div>
    </section>
  );
}
